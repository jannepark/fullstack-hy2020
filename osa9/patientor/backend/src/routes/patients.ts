import express from 'express';
import patientsService from '../services/patientsService';

const patientsRouter = express.Router();

patientsRouter.get('/', (_req, res) => {
  res.send(patientsService.getNonSensitiveEntries());
});

patientsRouter.post('/', (_req, res) => {
  res.send('Saving a patient!');
});

export default patientsRouter;
