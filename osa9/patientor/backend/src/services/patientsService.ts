import patientsData from '../../data/patients-full';
import {
  PatientEntry,
  NonSensitivePatient,
  NewPatient,
  NewEntry,
  Entry,
} from '../types';
import { v1 as uuid } from 'uuid';

const getNonSensitiveEntries = (): NonSensitivePatient[] => {
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
    patient.entries = [];
  }

  return patient;
};

const addPatient = (entry: NewPatient): PatientEntry => {
  const NewPatientEntry = {
    id: uuid(),
    ...entry,
  };

  patientsData.push(NewPatientEntry);
  return NewPatientEntry;
};
const addEntry = (patient: PatientEntry, entry: NewEntry): Entry => {
  const newEntry = {
    id: uuid(),
    ...entry,
  };

  patient.entries.push(newEntry);
  return newEntry;
};

export default {
  getNonSensitiveEntries,
  addPatient,
  getNonSensitivePatient,
  addEntry,
};
