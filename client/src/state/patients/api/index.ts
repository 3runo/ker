import { formatPatientResponse, formatPatientsResponse } from '../schema';
import { handlePostResponse } from '../../../helpers/schema';
import { deleteJson, getJson, postJson, putJson } from '../../../helpers/api';

type TPromise = Promise<any>;

// patients
export function getPatients() {
  return getJson('/patients').then(formatPatientsResponse);
}

// patient
export function getPatient(uuid: string) {
  return getJson(`/patient/${uuid}`).then(formatPatientResponse);
}

export function postPatient(payload: any): TPromise {
  return postJson('/patient', payload).then(handlePostResponse);
}

export function putPatient(payload: any): TPromise {
  const { id, ...rest } = payload;
  return putJson(`/patient/${id}`, rest).then(handlePostResponse);
}

export function deletePatient(uuid: string): TPromise {
  return deleteJson(`/patient/${uuid}`).then(handlePostResponse);
}
