import React from 'react';

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

  export default Course