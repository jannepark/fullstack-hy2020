import { useState, useEffect } from 'react';
import { Diagnosis, Entry, Patient, PatientPageParams } from '../../types';
import patientService from '../../services/patients';
import { useParams } from 'react-router-dom';
import { Gender } from '../../types';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';
import diagnosesService from '../../services/diagnoses';
import {
  HealthCheckEntryDetails,
  HospitalEntryDetails,
  OccupationalHealthcareEntryDetails,
} from './EntryDetails';
import { DiagnosesContext } from '../../DiagnosisContext';
import { Divider } from '@mui/material';
import React from 'react';

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case 'Hospital':
      return <HospitalEntryDetails entry={entry} />;
    case 'OccupationalHealthcare':
      return <OccupationalHealthcareEntryDetails entry={entry} />;
    case 'HealthCheck':
      return <HealthCheckEntryDetails entry={entry} />;
    default:
      return assertNever(entry);
  }
};

const PatientInfoPage = () => {
  const { id } = useParams<PatientPageParams>();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDiagnoses = async () => {
      const diagnoses = await diagnosesService.getAll();
      setDiagnoses(diagnoses);
    };
    void fetchDiagnoses();
  }, []);

  useEffect(() => {
    const fetchPatient = async () => {
      if (id === undefined) return;
      try {
        const patient = await patientService.getPatient(id);
        setPatient(patient);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      void fetchPatient();
    } else {
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return <div>Loading patient information...</div>;
  }

  if (!patient) {
    return <div>Patient not found</div>;
  }

  const getGenderIcon = () => {
    switch (patient.gender) {
      case Gender.Male:
        return <MaleIcon></MaleIcon>;
      case Gender.Female:
        return <FemaleIcon></FemaleIcon>;
      case Gender.Other:
        return <TransgenderIcon></TransgenderIcon>;
      default:
        return '';
    }
  };

  return (
    <DiagnosesContext.Provider value={diagnoses}>
      <div className="patient">
        <h2>
          {patient.name} {getGenderIcon()}
        </h2>
        <div>ssn: {patient.ssn}</div>
        <div>occupation: {patient.occupation}</div>
        <h3>entries</h3>
        <Divider />
        {patient.entries.map((entry) => (
          <React.Fragment key={entry.id}>
            <EntryDetails entry={entry} />
            <Divider />
          </React.Fragment>
        ))}
      </div>
    </DiagnosesContext.Provider>
  );
};

export default PatientInfoPage;
function assertNever(_entry: never): import('react').ReactNode {
  throw new Error('Function not implemented.');
}
