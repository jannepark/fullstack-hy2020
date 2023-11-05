import patientsData from '../../data/patients';
import { PatientEntry } from '../types';

const getNonSensitiveEntries = (): Omit<PatientEntry, 'ssn'>[] => {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

export default {
  getNonSensitiveEntries,
};
