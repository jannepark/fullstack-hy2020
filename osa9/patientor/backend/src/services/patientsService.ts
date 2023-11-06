import patientsData from '../../data/patients';
import {
  PatientEntry,
  NewPatientEntry,
  NonSensitivePatientEntry,
} from '../types';
import { v1 as uuid } from 'uuid';

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (entry: NewPatientEntry): PatientEntry => {
  const NewPatientEntry = {
    id: uuid(),
    ...entry,
  };

  patientsData.push(NewPatientEntry);
  return NewPatientEntry;
};

export default {
  getNonSensitiveEntries,
  addPatient,
};
