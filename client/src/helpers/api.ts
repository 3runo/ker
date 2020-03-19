import compose from 'lodash/fp/compose';

type TFetchInit = RequestInit & { url: string };
type TDefineFetch = (url: string, token?: string, payload?: any) => TFetchInit;
type TFetch = (url: string, token?: string, payload?: any) => Promise<any>;

function mergeFetchConfig({ url, headers, ...rest }: TFetchInit) {
  return fetch(`/api${url}`, {
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json', ...headers },
    mode: 'cors',
    redirect: 'follow',
    referrer: 'no-referrer',
    ...rest,
  }).then(formatFetchResponse);
}

function formatFetchResponse(response: Response) {
  const contentType = response?.headers.get('content-type');
  return contentType && contentType.indexOf('application/json') !== -1
    ? response.json()
    : response.text();
}

function defineFetch(method?: string): TDefineFetch {
  return function caller(url: string, payload?: any): TFetchInit {
    const token = window.localStorage.getItem('ker_token');
    return {
      url,
      body: payload != null ? JSON.stringify(payload) : undefined,
      method: typeof method === 'string' ? method : undefined,
      headers:
        token != null && token.trim().length > 0
          ? { authorization: token }
          : {},
    };
  };
}

const deleteJson: TFetch = compose([mergeFetchConfig, defineFetch('DELETE')]);
const getJson: TFetch = compose([mergeFetchConfig, defineFetch('GET')]);
const postJson: TFetch = compose([mergeFetchConfig, defineFetch('POST')]);
const putJson: TFetch = compose([mergeFetchConfig, defineFetch('PUT')]);

export { deleteJson, getJson, postJson, putJson };
