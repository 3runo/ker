import curry from 'lodash/fp/curry';

type ButtonEvent = React.MouseEvent<HTMLButtonElement>;

function hasFetchError(payload: any) {
  return /[45]0[0-9]/.exec(String(payload.statusCode)) ? true : false;
}

export function hasFalseProperty(obj: Object): boolean {
  return Object.entries(obj).some(([key, value]) => value === false);
}

export function isString(item: any): boolean {
  return typeof item === 'string';
}

export function isEmptyObj(obj?: Object) {
  return obj && obj.constructor === Object && Object.keys(obj).length === 0;
}

export function getElementDataset(e: React.SyntheticEvent<HTMLElement>) {
  return e.currentTarget.dataset;
}

export function nodeListToArray(nodeList: NodeList) {
  return Array.prototype.slice.call(nodeList);
}

export function domSelector(selector: string, element: HTMLElement) {
  return element.querySelectorAll(selector);
}

export function getInputValues(inputs: Array<HTMLInputElement>) {
  return inputs.map((i: HTMLInputElement) => i.value);
}

export function appendTimestamp(obj: Object) {
  return { ...obj, timestamp: Date.now() };
}

export function isMoreThanOneHour({ timestamp }: { timestamp: number }) {
  const oneHour = 60 * 60 * 1000;
  return Number.isInteger(timestamp)
    ? Date.now() - Number(timestamp) > oneHour
    : true;
}

export function optimizeStringList(thing: string | Array<string | any>) {
  return Array.isArray(thing) && thing.every(isString)
    ? thing.join(' ')
    : thing;
}

export function setInputState(setter: Function, callback?: Function) {
  return function getPropertyClosure(prop: string) {
    return function onInputClick(e: React.FormEvent<HTMLInputElement>) {
      setter({ [prop]: e.currentTarget.value }, callback);
    };
  };
}

export function numberFormatter(
  locale: string,
  isBitcoin: boolean = false,
  config: Intl.NumberFormatOptions | undefined = {}
) {
  const currency = locale === 'pt-BR' ? 'BRL' : 'USD'; // ToDo: Currency must come from API
  const baseConfig = { style: isBitcoin ? 'decimal' : 'currency', currency };
  const formatter = new Intl.NumberFormat(locale, { ...baseConfig, ...config });

  return function formatNumber(n: number) {
    return formatter.format(n);
  };
}

export const hasError = curry(hasFetchError);
