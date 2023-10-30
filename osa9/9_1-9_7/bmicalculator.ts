export const calculateBmi = (height: number, weight: number) => {
  const bmi = weight / ((height / 100) * (height / 100));
  let category;
  console.log(bmi);
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

const height: number = Number(process.argv[2]);
const weight: number = Number(process.argv[3]);
console.log(calculateBmi(height, weight));
