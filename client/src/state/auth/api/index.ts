import { handlePostResponse } from '../../../helpers/schema';
import { postJson } from '../../../helpers/api';

// login
export function postLogin(payload: any): Promise<any> {
  return postJson('/login', payload).then(handlePostResponse);
}

export function postSignup(payload: any): Promise<any> {
  return postJson('/signup', payload).then(handlePostResponse);
}
