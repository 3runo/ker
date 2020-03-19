import { handlePostResponse } from '../../../helpers/schema';
import { postJson, getJson } from '../../../helpers/api';

// login
export function postLogin(payload: any): Promise<any> {
  return postJson('/login', payload).then(handlePostResponse);
}

export function postSignup(payload: any): Promise<any> {
  return postJson('/signup', payload).then(handlePostResponse);
}

export function getValidateToken(token: string): Promise<any> {
  return getJson(`/validate-token/${token}`).then(handlePostResponse);
}
