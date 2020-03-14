import {
  formatPatientResponse,
  formatPatientsResponse,
  handlePostResponse,
} from '../schema';
import { deleteJson, getJson, postJson, putJson } from '../../../helpers/api';

type TPromise = Promise<any>;
type StringObj = Record<string, string>;

// patients
export function getPatients(token: string) {
  return getJson('/patients', token).then(formatPatientsResponse);
}

// patient
export function getPatient(token: string, uuid: string) {
  return getJson(`/patient/${uuid}`, token).then(formatPatientResponse);
}

export function postPatient(token: string, payload: StringObj): TPromise {
  return postJson('/patient', token, payload).then(handlePostResponse);
}

export function putPatient(token: string, payload: StringObj): TPromise {
  const { id, ...rest } = payload;
  return putJson(`/patient/${id}`, token, rest).then(handlePostResponse);
}

export function deletePatient(token: string, uuid: string): TPromise {
  return deleteJson(`/patient/${uuid}`, token).then(handlePostResponse);
}
