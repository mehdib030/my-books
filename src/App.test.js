import React from 'react'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from './App'

jest.mock('./BooksAPI', () => ({
  getAll: jest.fn(() => Promise.resolve([])),
  update: jest.fn(() => Promise.resolve({})),
  search: jest.fn(() => Promise.resolve([])),
}))

describe('App', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    )
    expect(container).toBeTruthy()
  })

  it('renders the MyReads title', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    )
    expect(getByText('MyReads')).toBeTruthy()
  })
})
