import diagnosesData from '../../data/diagnoses';
import { DiagnoseEntry } from '../types';

const getEntries = (): DiagnoseEntry[] => {
  return diagnosesData;
};

export default {
  getEntries,
};
