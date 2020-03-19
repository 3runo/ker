import getOr from 'lodash/fp/getOr';
import { hasError } from './core';

const getErrorMessage: any = getOr('Unknown error', 'message');
const getErrorCode: any = getOr(undefined, 'statusCode');

export function errorWithCode(prop: string, payload: Object) {
  return {
    code: getErrorCode(payload),
    [prop]: getErrorMessage(payload),
  };
}

export function handlePostResponse(payload: any): Promise<never> | any {
  return hasError(payload)
    ? Promise.reject(errorWithCode('message', payload))
    : payload;
}
