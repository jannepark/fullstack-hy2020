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

  const handleNeutralClick = () => {
    const updatedNeutral = neutral +1
    setNeutral(updatedNeutral)
  }

  const handleBadClick = () => {
    const updatedGood = bad +1
    setBad(updatedGood)
  }
  const handleGoodClick = () => {
    const updatedGood = good +1
    setGood(updatedGood)
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
      </div>
    </div>
  )
}

export default App