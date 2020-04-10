import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './styles.css';

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>  
      <td>{props.value}</td>
    </tr>
  )
}

const Statistics = (props) => {
  if (props.all < 1) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }

  return (
    <>
      <h2>statistics</h2>
      <table>
        <tbody>
        <StatisticLine text='good' value={props.good} />
        <StatisticLine text='neutral' value={props.neutral} />
        <StatisticLine text='bad' value={props.bad} />
        <StatisticLine text='all' value={props.all} />
        <StatisticLine text='average' value={props.average / props.all} />
        <StatisticLine text='positive' value={100 * (props.good / props.all) +" %"} />
        </tbody>
      </table>
    </>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)

  const giveGood = () => {
    setGood(good + 1)
    setAll(all + 1)
    setAverage(average + 1)
  }
  const giveNeutral = () => {
    setNeutral(neutral + 1)
    setAll(all + 1)
  }

  const giveBad = () => {
    setBad(bad + 1)
    setAll(all + 1)
    setAverage(average - 1)
  }

  return (
    <div>
      <h2>give feedback</h2>
      <Button handleClick={() => giveGood()} text="good" />
      <Button handleClick={() => giveNeutral()} text="neutral" />
      <Button handleClick={() => giveBad()} text="bad" />
      <Statistics good={good} 
        neutral={neutral} 
        bad={bad} 
        all={all}
        average={average}/> 
    </div>
  )
}

ReactDOM.render(
    <App />,
  document.getElementById('root')
);

