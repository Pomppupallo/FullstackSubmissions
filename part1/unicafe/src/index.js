import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Statistics = (props) => {
  return (
    <div>
      <h1>Statistics</h1>
      <p>good {props.good} </p>
      <p>neutral {props.neutral} </p>
      <p>bad {props.bad} </p>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const giveGood = () => setGood(good + 1)
  const giveNeutral = () => setNeutral(neutral + 1)
  const giveBad = () => setBad(bad + 1)

  return (
    <div>
      <h2>give feedback</h2>
      <Button handleClick={() => giveGood()} text="good" />
      <Button handleClick={() => giveNeutral()} text="neutral" />
      <Button handleClick={() => giveBad()} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} /> 
    </div>
  )
}

ReactDOM.render(
    <App />,
  document.getElementById('root')
);

