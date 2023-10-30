import express from 'express';
import calculateBmi from './bmicalculator';

const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

interface BmiResponse {
  Height: number;
  Weight: number;
  bmi: string;
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

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
