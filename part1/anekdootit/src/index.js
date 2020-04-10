import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)


const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [best, setBest] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))

  const selectRandom = () => {
    let random = Math.floor(Math.random() * (anecdotes.length - 1))
    setSelected(random)
  }

  const voteAnecdote = () => {
    const copy = {...votes }
    copy[selected] += 1
    setVotes(copy)

    if (copy[best] < copy[selected]) {
      setBest(selected)
    }
  }

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <p>{props.anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <Button handleClick={voteAnecdote} text="vote" />
      <Button handleClick={selectRandom} text="next anecdote" />
      <h2>Anecdote with most votes</h2>
      <p>{props.anecdotes[best]}</p>
      <p>has {votes[best]} votes</p>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]


ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
