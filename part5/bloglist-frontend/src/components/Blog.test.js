import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('renders content with "hide" enabled', () => {
  const blog = {
    title: 'Mikä makkarassa maksaa?',
    author: 'Toni Virtanen',
    url: 'www.netti.fi',
    likes: 10,
  }

  const component = render(<Blog blog={blog} viewAll={false} />)

  expect(component.container).toHaveTextContent('Mikä makkarassa maksaa? Toni Virtanen view')
})

test('renders content with "view" enabled', async () => {
  const user = {
    name: 'Test User',
    username: 'test',
    password: '123456',
  }

  const blog = {
    title: 'Mikä makkarassa maksaa?',
    author: 'Toni Virtanen',
    url: 'www.netti.fi',
    likes: 10,
    user: user,
  }

  const mockHandler = jest.fn()

  const component = render(<Blog blog={blog} toggleView={mockHandler} />)

  const button = component.getByText('view')
  fireEvent.click(button)

  expect(component.container).toHaveTextContent('www.netti.fi')
  expect(component.container).toHaveTextContent('likes 10')
})

test('like button pushed twice - function called twice', async () => {
  const user = {
    name: 'Test User',
    username: 'test',
    password: '123456',
  }

  const blog = {
    title: 'Mikä makkarassa maksaa?',
    author: 'Toni Virtanen',
    url: 'www.netti.fi',
    likes: 10,
    user: user
  }

  //Click view button to render all of the content
  const mockHandler = jest.fn()
  const component = render(<Blog blog={blog} viewAll={true} changeBlog={mockHandler} />)
  const buttonView = component.getByText('view')
  fireEvent.click(buttonView)

  //Click add like button and check that correct amount of function calls are made
  const button = component.getByText('add like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)
})
