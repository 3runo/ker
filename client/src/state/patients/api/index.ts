import { formatPatientsResponse, handlePostResponse } from '../model';
import { deleteJson, getJson, postJson } from '../../../helpers/api';

type TPromise = Promise<any>;

export function getPatients(token: string) {
  return getJson('/patients', token).then(formatPatientsResponse);
}

export function postPatient(
  token: string,
  payload: Record<string, string>
): TPromise {
  return postJson('/patient', token, payload).then(handlePostResponse);
}

export function deletePatient(token: string, uuid: string): TPromise {
  return deleteJson(`/patient/${uuid}`, token).then(handlePostResponse);
}
