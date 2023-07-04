import { useState } from 'react'

const Button = ({ handleClick,text}) => 
  (
    <button onClick={handleClick}>
      {text}
    </button>
  )
const Statistics = ({good,neutral,bad}) => {

  const total = good+neutral+bad
  const average = ((good*1)+(bad*-1)+(neutral*0))/total
  const positive = (good/total)*100
  if (!total){
    return(
    <><p>No feedback given</p></>
    )
  } else{
  return (
    <div>
      <p>Good {good}</p>
      <p>Neutral {neutral}</p>
      <p>Bad {bad}</p>
      <p>Total {total}</p>
      <p>Average {average}</p>
      <p>Positive {positive} %</p>
    </div>
  )}
}
const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  const handleNeutralClick = () => {
    setNeutral(neutral +1)
  }

  const handleBadClick = () => {
    setBad(bad +1)
  }
  const handleGoodClick = () => {
    setGood(good +1)
  }
  return (
    <div>
      <div>
        <h1>
          Give feedback
        </h1>
        <Button handleClick={handleGoodClick} text='good'/>

        <Button handleClick={handleNeutralClick} text='neutral' />

        <Button handleClick={handleBadClick} text='bad' />

        <h1>Statistics</h1>
        <Statistics good={good} neutral={neutral} bad={bad} />
      </div>
    </div>
  )
}

export default App