import React from 'react';
import ReactDOM from 'react-dom';

const Header = ( {header} ) => {
  return(
    <div>
      <h2>{header}</h2>
    </div>
  )
}

const Part = ( {part} ) => {
  return (
    <p>{part.name} {part.exercises}</p>
  )
}


const Content = ( {parts}) => {

  return(
    <div>
        {parts.map(part =>
          <Part key={part.id} part={part} />
        )}
    </div>
  )
}

const Course = ( {course} ) => {
  const exercises = course.parts.map(part => part.exercises)
  const total = exercises.reduce( (acc, cur) => acc + cur, 0)
  return (
    <div>
      <Header header={course.name} />
      <Content parts={course.parts} />
      <b>total of {total} exercises</b>
    </div>
  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
        <h1>Web development curriculum</h1>
        {courses.map(course =>
          <Course key={course.id} course={course} />
        )}
    </div>
  )
}

ReactDOM.render(
    <App />,
  document.getElementById('root')
);

