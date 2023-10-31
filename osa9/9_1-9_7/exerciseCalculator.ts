interface exerciseResult {
  periodLength: number;
  trainingDays: number;
  target: number;
  average: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
}

interface Args {
  argsTarget: number;
  argsHours: number[];
}

const parseArguments = (args: string[]): Args => {
  if (args.length < 4) throw new Error('Not enough arguments');

  const argsHours: number[] = [];

  for (let i = 3; i < args.length; i++) {
    if (isNaN(Number(args[i]))) {
      throw new Error('args not numbers');
    } else {
      argsHours.push(Number(args[i]));
    }
  }

  return {
    argsTarget: Number(args[2]),
    argsHours: argsHours,
  };
};

const exerciseCalculator = (
  trainingHours: number[],
  targetHours: number
): exerciseResult => {
  const periodLength = trainingHours.length;
  const trainingDays = trainingHours.filter(
    (trainingHours) => trainingHours > 0
  ).length;
  const target = targetHours;
  const average =
    trainingHours.reduce((acc, current) => acc + current, 0) /
    trainingHours.length;
  const success = average >= 2 ? true : false;
  const rating = average >= 3 ? 3 : average >= 2 && average < 3 ? 2 : 1;
  const ratingDescription =
    rating == 3
      ? 'Good!'
      : rating == 2
      ? 'Not too bad but could be better'
      : 'You failed';
  return {
    periodLength: periodLength,
    trainingDays: trainingDays,
    success: success,
    rating: rating,
    ratingDescription: ratingDescription,
    target: target,
    average: average,
  };
};

if (require.main === module) {
  try {
    const { argsTarget, argsHours } = parseArguments(process.argv);
    console.log(exerciseCalculator(argsHours, argsTarget));
  } catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
  }
}

export default exerciseCalculator;
