import patientsData from '../../data/patients';
import {
  PatientEntry,
  NewPatientEntry,
  NonSensitivePatientEntry,
  // NonSensitivePatient,
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

const getNonSensitivePatient = (id: string): PatientEntry | undefined => {
  const patient = patientsData.find((patient) => patient.id === id);

  if (patient && !patient.entries) {
    patient.entries = []; // Add entries array if it does not exist
  }

  return patient;
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
  getNonSensitivePatient,
};
