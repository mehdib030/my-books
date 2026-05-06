import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Search from './Search'

jest.mock('./BooksAPI', () => ({
  search: jest.fn(() => Promise.resolve([])),
}))

describe('Search', () => {
  const defaultProps = {
    allBooks: [],
    onUpdateBookShelf: jest.fn(),
    onUpdateShowSearchPageState: jest.fn(),
  }

  it('renders without crashing', () => {
    const { container } = render(
      <MemoryRouter>
        <Search {...defaultProps} />
      </MemoryRouter>
    )
    expect(container).toBeTruthy()
  })

  it('renders the search input', () => {
    const { getByPlaceholderText } = render(
      <MemoryRouter>
        <Search {...defaultProps} />
      </MemoryRouter>
    )
    expect(getByPlaceholderText('Search by title or author')).toBeTruthy()
  })

  it('renders the Search Books heading', () => {
    const { getByText } = render(
      <MemoryRouter>
        <Search {...defaultProps} />
      </MemoryRouter>
    )
    expect(getByText('Search Books')).toBeTruthy()
  })

  it('renders the Close link', () => {
    const { getByText } = render(
      <MemoryRouter>
        <Search {...defaultProps} />
      </MemoryRouter>
    )
    expect(getByText('Close')).toBeTruthy()
  })

  it('calls onUpdateShowSearchPageState when Close link is clicked', () => {
    const onUpdateShowSearchPageState = jest.fn()
    const { getByText } = render(
      <MemoryRouter>
        <Search {...defaultProps} onUpdateShowSearchPageState={onUpdateShowSearchPageState} />
      </MemoryRouter>
    )
    fireEvent.click(getByText('Close'))
    expect(onUpdateShowSearchPageState).toHaveBeenCalledWith(false)
  })
})
