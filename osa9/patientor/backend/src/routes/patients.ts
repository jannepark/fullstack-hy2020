import express from 'express';
import patientsService from '../services/patientsService';

const patientsRouter = express.Router();

patientsRouter.get('/', (_req, res) => {
  res.send(patientsService.getNonSensitiveEntries());
});
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
patientsRouter.post('/', (_req, res) => {
  const { name, dateOfBirth, ssn, gender, occupation } = _req.body;
  const addedPatient = patientsService.addPatient({
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation,
  });
  res.send(addedPatient);
});

export default patientsRouter;
