import getOr from 'lodash/fp/getOr';

const getErrorMessage: any = getOr('Unknown error', 'message');
const getErrorCode: any = getOr(undefined, 'statusCode');

export function errorWithCode(prop: string, payload: Object) {
  return {
    code: getErrorCode(payload),
    [prop]: getErrorMessage(payload),
  };
}
