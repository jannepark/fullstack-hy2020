import express from 'express';
import patientsService from '../services/patientsService';

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

export default patientsRouter;
