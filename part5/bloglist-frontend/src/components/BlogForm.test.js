import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

test('<BlogForm /> is called with correct input fields', () => {
  const createBlog = jest.fn()

  const component = render(<BlogForm createBlog={createBlog}/>)

  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')
  const form = component.container.querySelector('#blogForm')

  fireEvent.change(title, {
    target: { value: 'Testaaminen on tärkeää'}
  })
  fireEvent.change(author, {
    target: { value: 'Toni'}
  })
  fireEvent.change(url, {
    target: { value: 'www.testi.fi'}
  })
  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('Testaaminen on tärkeää')
  expect(createBlog.mock.calls[0][0].author).toBe('Toni')
  expect(createBlog.mock.calls[0][0].url).toBe('www.testi.fi')
})