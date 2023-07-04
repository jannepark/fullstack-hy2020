import { useState } from 'react'

const Button = ({ handleClick,text}) => 
  (
    <button onClick={handleClick}>
      {text}
    </button>
  )

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  const handleNeutralClick = () => {
    const updatedNeutral = neutral +1
    const updatedTotal = good+bad+updatedNeutral
    setNeutral(updatedNeutral)
    setTotal(updatedTotal)
    setAverage(((good*1)+(bad*-1)+(updatedNeutral*0))/updatedTotal)
    setPositive((good/updatedTotal)*100)
  }

  const handleBadClick = () => {
    const updatedBad = bad +1
    const updatedTotal = good+updatedBad+neutral
    setBad(updatedBad)
    setTotal(updatedTotal)
    setAverage(((good*1)+(updatedBad*-1)+(neutral*0))/updatedTotal)
    setPositive((good/updatedTotal)*100)
  }
  const handleGoodClick = () => {
    const updatedGood = good +1
    const updatedTotal = updatedGood+bad+neutral
    setGood(updatedGood)
    setTotal(updatedTotal)
    setAverage(((updatedGood*1)+(bad*-1)+(neutral*0))/updatedTotal)
    setPositive((updatedGood/updatedTotal)*100)
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
        <p>Good {good}</p>
        <p>Neutral {neutral}</p>
        <p>Bad {bad}</p>
        <p>Total {total}</p>
        <p>Average {average}</p>
        <p>Positive {positive} %</p>
      </div>
    </div>
  )
}

export default App