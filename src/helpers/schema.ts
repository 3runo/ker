import getOr from "lodash/fp/getOr";
import { Patient } from "../types/patients";
import { hasError } from "./core";

type TReject = Promise<never>;
type TStringResponse = string | TReject;
type TErrorDetail = {
  code: string;
  info: Object;
  message: string;
  path: string;
};

const getErrorMessage: any = getOr("Unknown error", "message");
const getErrorDetails: any = getOr(undefined, "details");
const getErrorCode: any = getOr(undefined, "code");

function errorWithCode(prop: string, payload: Object) {
  return {
    code: getErrorCode(payload),
    [prop]: getErrorMessage(payload)
  };
}

function errorDetailReducer(acc: Record<any, any>, detail: TErrorDetail) {
  acc[String(detail.path).replace(".", "")] = detail.message;
  return acc;
}

export function formatPatientsResponse(payload: any): Promise<never> | any {
  return hasError(payload)
    ? Promise.reject(errorWithCode("patients", payload))
    : payload.Items.map((patient: Patient) => {
        return {
          address: patient.address,
          birthday: patient.birthday,
          created: new Date(patient.created),
          email: patient.email,
          firstContact: patient.firstContact,
          name: patient.name,
          notes: patient.notes,
          phone: patient.phone,
          uuid: patient.uuid
        };
      });
}

export function getDomainCashBackSchema(payload: any): TReject | any {
  return !Boolean(payload) || hasError(payload)
    ? Promise.reject({})
    : {
        activationToken: payload.activation_token,
        activationUrl: payload.activation_url,
        alreadyActivated: payload.already_activated,
        description: payload.description,
        image: payload.image,
        name: payload.name,
        offLabel: payload.off_label,
        productsCount: payload.products_count,
        terms: payload.terms,
        url: payload.url
      };
}

export function getMeSchema(payload: any): TReject | any {
  return hasError(payload) // TODO: CHECK FOR 401 RESPONSES HERE
    ? Promise.reject(errorWithCode("me", payload))
    : {
        country: payload.data.country,
        email: payload.data.email,
        isTfaEnabled: payload.data.is_tfa_enabled,
        locale: payload.data.locale,
        name: payload.data.name,
        picture: payload.data.picture,
        timezone: payload.data.timezone
      };
}

export function getSettingsSchema(payload: any): any {
  return hasError(payload)
    ? Promise.reject({
        activationUrl: null,
        myAccountUrl: null,
        withdrawalUrl: null
      })
    : {
        activationUrl: payload.activation_url,
        myAccountUrl: payload.my_account_url,
        withdrawalUrl: payload.withdrawal_url
      };
}

export function getStoresSchema(payload: any): any {
  return hasError(payload)
    ? { stores: [], storesTotal: 0 }
    : {
        stores: payload.data.stores.map((store: any) => ({
          activationToken: store.activation_token,
          activationUrl: store.activation_url,
          alreadyActivated: store.already_activated,
          description: store.description,
          image: store.image,
          name: store.name,
          offLabel: store.off_label,
          productsCount: store.products_count,
          terms: store.terms,
          url: store.url
        })),
        storesTotal: payload.data.total
      };
}

export function postAuthErrorSchema(payload: any): TReject {
  if (hasError(payload)) {
    const detailList = getErrorDetails(payload);

    if (Array.isArray(detailList)) {
      return Promise.reject(detailList.reduce(errorDetailReducer, {}));
    }
  }

  return Promise.reject(errorWithCode("password", payload));
}

export function postAuthSchema(payload: any): TStringResponse {
  return hasError(payload)
    ? Promise.reject(payload)
    : getOr(undefined, "data.token", payload);
}

export function postLogoutErrorSchema(payload: any): TReject {
  return hasError(payload)
    ? Promise.reject(errorWithCode("password", payload))
    : Promise.reject({});
}

export function postPasswordRecoveryErrorSchema(payload: any): TReject {
  return hasError(payload)
    ? Promise.reject(errorWithCode("passwordRecovery", payload))
    : Promise.reject({});
}
