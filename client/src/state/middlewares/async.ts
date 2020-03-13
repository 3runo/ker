import { isPromise } from '../../helpers/core';

export default function dispatchAsyncAction({ dispatch }: any) {
  return function nextClosure(next: Function) {
    return function actionClosure(action: any) {
      const { payload, type, ...rest } = action;

      if (isPromise(payload)) {
        dispatch({ ...rest, type });

        return payload
          .then((result: any) => {
            dispatch({ ...rest, type: type + '_SUCCESS', payload: result });
          })
          .catch((err: any) => {
            console.error(type + '_FAIL', err);
            dispatch({ ...rest, type: type + '_FAIL', payload: err.message });
            return Promise.reject(err);
          });
      }

      return next(action);
    };
  };
}
