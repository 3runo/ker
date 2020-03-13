export default function actionLogger({ getState }: any) {
  return function nextClosure(next: Function) {
    return function actionClosure(action: any) {
      console.log('will dispatch', action);

      const returnValue = next(action);

      console.log('state after dispatch', getState());

      return returnValue;
    };
  };
}
