import { compose, reduce } from 'lodash/fp';
import { nodeListToArray } from "./core";

type StringObj = Record<string, string>;

function formElementReducer(obj: StringObj, e: HTMLInputElement) {
  obj[e.name.replace('input-', '')] = e.value;
  return obj;
}


const createFormPayload: (list: NodeListOf<Element>) => StringObj = compose([
  reduce(formElementReducer, {}),
  nodeListToArray,
]);


export { createFormPayload };