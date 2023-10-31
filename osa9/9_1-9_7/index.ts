import express from 'express';
import calculateBmi from './bmicalculator';
import exerciseCalculator from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

interface BmiResponse {
  Height: number;
  Weight: number;
  bmi: string;
}
interface ExerciseData {
  daily_exercises: number[];
  target: number;
}

app.get('/bmi', (_req, res) => {
  try {
    const height = Number(_req.query.height);
    const weight = Number(_req.query.weight);

    if (isNaN(height) || isNaN(weight)) {
      res.status(400).json({ error: '"malformatted parameters"' });
      return;
    }

    const bmi: string = calculateBmi(height, weight);
    const response: BmiResponse = { Height: height, Weight: weight, bmi: bmi };

    res.json(response);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
      res.status(500).json({ error: 'Something bad happened.' });
    }
  }
});

app.post('/exercises', (req, res) => {
  const data = req.body as ExerciseData;

  if (!data.daily_exercises || !data.target) {
    return res.status(400).json({ error: 'parameters missing' });
  }

  if (!Array.isArray(data.daily_exercises) || isNaN(Number(data.target))) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }

  if (data.daily_exercises.some((hours) => isNaN(Number(hours)))) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }

  const result = exerciseCalculator(data.daily_exercises, Number(data.target));
  return res.json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
