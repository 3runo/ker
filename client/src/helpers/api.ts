import compose from "lodash/fp/compose";
import { formatPatientsResponse } from "./schema";

type TFetchInit = RequestInit & { url: string };
type TDefineFetch = (url: string, token?: string, payload?: any) => TFetchInit;
type TFetch = (url: string, token?: string, payload?: any) => Promise<any>;
type TPromise = Promise<any>;

const getJson: TFetch = compose([mergeFetchConfig, defineFetch("GET")]);
const postJson: TFetch = compose([mergeFetchConfig, defineFetch("POST")]);
const deleteJson: TFetch = compose([mergeFetchConfig, defineFetch("DELETE")]);

function toJson(response: Response) {
  return response.status === 204 ? "" : response.json();
}

function defineFetch(method?: string): TDefineFetch {
  return function make(url: string, token?: string, payload?: any): TFetchInit {
    return {
      url,
      body: payload != null ? JSON.stringify(payload) : undefined,
      method: typeof method === "string" ? method : undefined,
      headers:
        token != null && token.trim().length > 0
          ? { Authorization: `Bearer ${token}` }
          : {}
    };
  };
}

function mergeFetchConfig({ url, headers, ...rest }: TFetchInit) {
  return fetch(`/api${url}`, {
    cache: "no-cache",
    credentials: "same-origin",
    headers: { "Content-Type": "application/json", ...headers },
    mode: "cors",
    redirect: "follow",
    referrer: "no-referrer",
    ...rest
  }).then(toJson);
}

// API calls
export function getPatients(token: string) {
  return getJson("/patients", token).then(formatPatientsResponse);
}

export function postPatient(token: string, payload: Record<string, string>): TPromise {
  return postJson("/patient", token, payload)
    .then(console.log)
    .catch(console.error);
}

export function deletePatient(token: string, uuid: string): TPromise {
  return deleteJson(`/patient/${uuid}`, token)
    .then(console.log)
    .catch(console.error);
}