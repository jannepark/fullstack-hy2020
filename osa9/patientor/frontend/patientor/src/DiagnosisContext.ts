import React from 'react';
import { Diagnosis } from './types';

export const DiagnosesContext = React.createContext<Diagnosis[]>([]);
