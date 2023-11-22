import express from 'express';
import patientsService from '../services/patientsService';
import { toNewEntry } from '../utils';

const patientsRouter = express.Router();

patientsRouter.get('/', (_req, res) => {
  res.send(patientsService.getNonSensitiveEntries());
});

patientsRouter.get('/:id', (_req, res) => {
  const patient = patientsService.getNonSensitivePatient(_req.params.id);
  if (patient === undefined) {
    res.status(404).send(`Patient with id ${_req.params.id} not found`);
    return;
  }
  res.send(patient);
});

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
patientsRouter.post('/', (_req, res) => {
  const { name, dateOfBirth, ssn, gender, occupation, entries } = _req.body;
  const addedPatient = patientsService.addPatient({
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation,
    entries,
  });

  res.send(addedPatient);
});

patientsRouter.post('/:id/entries', (_req, res) => {
  try {
    const patient = patientsService.getNonSensitivePatient(_req.params.id);
    if (patient === undefined) {
      res.status(404).send(`Patient with id ${_req.params.id} not found`);
      return;
    }

    const newEntry = toNewEntry(_req.body);
    const addedEntry = patientsService.addEntry(patient, newEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});
export default patientsRouter;
