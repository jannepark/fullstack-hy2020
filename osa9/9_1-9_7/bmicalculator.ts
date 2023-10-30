const calculateBmi = (height: number, weight: number) => {
  const bmi = weight / ((height / 100) * (height / 100));
  let category;

  if (bmi < 18.5) {
    category = 'Underweight';
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    category = 'Normal (healthy weight)';
  } else if (bmi >= 25 && bmi <= 29.9) {
    category = 'Overweight';
  } else if (bmi >= 30) {
    category = 'Obese';
  } else {
    category = 'Invalid BMI'; // for negative or undefined values
  }

  return category;
};

interface BmiInputs {
  height: number;
  weight: number;
}

const parseBmiArguments = (args: string[]): BmiInputs => {
  if (args.length < 4) throw new Error('Missing arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error('args not numbers');
  }
};
if (require.main === module) {
  try {
    const { height, weight } = parseBmiArguments(process.argv);
    console.log(calculateBmi(height, weight), 'calculateBmi');
  } catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
  }
}
export default calculateBmi;
