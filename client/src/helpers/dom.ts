import compose from 'lodash/fp/compose';
import reduce from 'lodash/fp/reduce';
import { nodeListToArray } from './core';

type StringObj = Record<string, string>;

function formElementReducer(obj: StringObj, e: HTMLInputElement) {
  obj[e.name.replace('input-', '')] = e.value;
  return obj;
}

function serializeFormValues(e: React.FormEvent<HTMLFormElement>): StringObj {
  const form = e.currentTarget;
  return createFormPayload(form.querySelectorAll('[name*="input"]'));
}

const createFormPayload: (list: NodeListOf<Element>) => StringObj = compose([
  reduce(formElementReducer, {}),
  nodeListToArray,
]);

export { createFormPayload, serializeFormValues };
