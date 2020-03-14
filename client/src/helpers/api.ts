import compose from 'lodash/fp/compose';

type TFetchInit = RequestInit & { url: string };
type TDefineFetch = (url: string, token?: string, payload?: any) => TFetchInit;
type TFetch = (url: string, token?: string, payload?: any) => Promise<any>;

const deleteJson: TFetch = compose([mergeFetchConfig, defineFetch('DELETE')]);
const getJson: TFetch = compose([mergeFetchConfig, defineFetch('GET')]);
const postJson: TFetch = compose([mergeFetchConfig, defineFetch('POST')]);
const putJson: TFetch = compose([mergeFetchConfig, defineFetch('PUT')]);

function toJson(response: Response) {
  return response.status === 204 ? '' : response.json();
}

function defineFetch(method?: string): TDefineFetch {
  return function make(url: string, token?: string, payload?: any): TFetchInit {
    return {
      url,
      body: payload != null ? JSON.stringify(payload) : undefined,
      method: typeof method === 'string' ? method : undefined,
      headers:
        token != null && token.trim().length > 0
          ? { Authorization: `Bearer ${token}` }
          : {},
    };
  };
}

function mergeFetchConfig({ url, headers, ...rest }: TFetchInit) {
  return fetch(`/api${url}`, {
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json', ...headers },
    mode: 'cors',
    redirect: 'follow',
    referrer: 'no-referrer',
    ...rest,
  }).then(toJson);
}

export { deleteJson, getJson, postJson, putJson };
