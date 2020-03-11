import { hasError } from "../../../helpers/core";
import { errorWithCode } from "../../../helpers/schema";
import { Patient } from "../../../types/patients";

export function handlePostResponse(payload: any): Promise<never> | any {
  return hasError(payload)
    ? Promise.reject(errorWithCode("message", payload))
    : payload;
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

