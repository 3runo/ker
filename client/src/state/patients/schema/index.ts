import compose from 'lodash/fp/compose';
import map from 'lodash/fp/map';
import sortBy from 'lodash/fp/sortBy';
import { hasError } from '../../../helpers/core';
import { errorWithCode } from '../../../helpers/schema';
import { Patient } from '../../../types/patients';

const sortByName = sortBy(['name']);
const patientMapper = (patient: Patient) => {
  return {
    address: patient.address,
    birthday: patient.birthday,
    created: new Date(patient.created),
    email: patient.email,
    firstContact: patient.firstContact,
    name: patient.name,
    notes: patient.notes,
    phone: patient.phone,
    uuid: patient.uuid,
  };
};

export function handlePostResponse(payload: any): Promise<never> | any {
  return hasError(payload)
    ? Promise.reject(errorWithCode('message', payload))
    : payload;
}

export function formatPatientResponse(payload: any): Promise<never> | any {
  return hasError(payload)
    ? Promise.reject(errorWithCode('patient', payload))
    : patientMapper(payload.Item);
}

export function formatPatientsResponse(payload: any): Promise<never> | any {
  const mapAndSortPatients = compose([sortByName, map(patientMapper)]);

  return hasError(payload)
    ? Promise.reject(errorWithCode('patients', payload))
    : mapAndSortPatients(payload.Items);
}
