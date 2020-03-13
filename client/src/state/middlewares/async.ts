export default function dispatchAsyncAction({ dispatch }: any) {
  return function nextClosure(nextMiddleware: Function) {
    return function actionClosure(action: any) {
      const { payload, type, ...rest } = action;

      if (!action.payload || !action.payload.then) {
        return nextMiddleware(action);
      }

      payload
        .then((successResponse: any) => {
          dispatch({
            ...rest,
            type: type + '_SUCCESS',
            payload: successResponse,
          });
        })
        .catch((errorResponse: any) => {
          console.error(type + '_FAIL', errorResponse);

          dispatch({
            ...rest,
            type: type + '_FAIL',
            payload: errorResponse.message,
          });

          return Promise.reject(errorResponse);
        });
    };
  };
}
