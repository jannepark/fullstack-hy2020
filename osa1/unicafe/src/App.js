import { useState } from 'react'

const Button = ({ handleClick,text}) => 
  (
    <button onClick={handleClick}>
      {text}
    </button>
  )
const StatisticLine = ({text,value}) => {
  return (
    <tr>
      <td>
        {text}
      </td>
      <td>
        {value}
      </td>
    </tr>
  )
}
const Statistics = ({good,neutral,bad}) => {

  const total = good+neutral+bad
  if (!total){
    return(
    <>
      <p>No feedback given</p>
    </>
    )
  } else {
    const average = ((good*1)+(bad*-1)+(neutral*0))/total
    const positive = (good/total)*100
    return (
      <table>
        <tbody>
            <StatisticLine text='good' value={good} />
            <StatisticLine text='neutral' value={neutral} />
            <StatisticLine text='bad' value={bad} />
            <StatisticLine text='total' value={total} />
            <StatisticLine text='average' value={average.toFixed(1)} />
            <StatisticLine text='positive' value={positive.toFixed(1)+' %'} />
        </tbody>
      </table>
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
        <h1>Give feedback</h1>
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