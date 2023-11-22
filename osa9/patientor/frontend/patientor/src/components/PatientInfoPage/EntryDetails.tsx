import MedicalInformationSharpIcon from '@mui/icons-material/MedicalInformationSharp';
import LocalHospitalSharpIcon from '@mui/icons-material/LocalHospitalSharp';
import WorkIcon from '@mui/icons-material/Work';
import FavoriteIcon from '@mui/icons-material/Favorite';
import WarningOutlinedIcon from '@mui/icons-material/WarningOutlined';
import {
  HealthCheckRating,
  HospitalEntry,
  OccupationalHealthcareEntry,
  HealthCheckEntry,
  Diagnosis,
} from '../../types';
import { useContext } from 'react';
import { DiagnosesContext } from '../.././DiagnosisContext';

const HealthCheckRatingIcon = ({ rating }: { rating: HealthCheckRating }) => {
  switch (rating) {
    case HealthCheckRating.Healthy:
      return <FavoriteIcon sx={{ color: 'green' }} />;
    case HealthCheckRating.LowRisk:
      return <FavoriteIcon sx={{ color: 'gold' }} />;
    case HealthCheckRating.HighRisk:
      return <FavoriteIcon sx={{ color: 'red' }} />;
    case HealthCheckRating.CriticalRisk:
      return <WarningOutlinedIcon sx={{ color: 'red' }} />;
    default:
      return assertNever(rating);
  }
};
const RenderDiagnosisCodes: React.FC<{ codes: Array<Diagnosis['code']> }> = ({
  codes,
}) => {
  const diagnoses = useContext(DiagnosesContext); // Use context here

  if (!codes) return null;

  return (
    <ul>
      {codes.map((code) => (
        <li key={code}>
          {code}{' '}
          {diagnoses.find((diagnosis) => diagnosis.code === code)?.name ||
            'Unknown diagnosis'}
        </li>
      ))}
    </ul>
  );
};

export const HospitalEntryDetails = ({ entry }: { entry: HospitalEntry }) => (
  <div>
    {entry.date} <LocalHospitalSharpIcon /> <br />
    <i>{entry.description}</i> <br />
    Discharged {entry.discharge.date}: {entry.discharge.criteria}
    {entry.diagnosisCodes && (
      <RenderDiagnosisCodes codes={entry.diagnosisCodes} />
    )}
  </div>
);
export const OccupationalHealthcareEntryDetails = ({
  entry,
}: {
  entry: OccupationalHealthcareEntry;
}) => (
  <div>
    {entry.date} <WorkIcon /> ({entry.employerName}) <br />
    <i>{entry.description}</i> <br />
    {entry.sickLeave && entry.sickLeave.startDate && entry.sickLeave.endDate
      ? `Sickleave from ${entry.sickLeave.startDate} to ${entry.sickLeave.endDate}`
      : 'No sick leave'}
    {entry.diagnosisCodes && (
      <RenderDiagnosisCodes codes={entry.diagnosisCodes} />
    )}
  </div>
);
export const HealthCheckEntryDetails = ({
  entry,
}: {
  entry: HealthCheckEntry;
}) => (
  <div>
    {entry.date} <MedicalInformationSharpIcon /> <br />
    <i>{entry.description}</i> <br />
    Health Check Rating:
    <HealthCheckRatingIcon rating={entry.healthCheckRating} /> <br />
    {entry.diagnosisCodes && (
      <RenderDiagnosisCodes codes={entry.diagnosisCodes} />
    )}
  </div>
);
function assertNever(value: never): never {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
}
