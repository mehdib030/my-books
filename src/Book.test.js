import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Book from './Book'

const mockBook = {
  id: '1',
  title: 'Test Book',
  authors: ['Author One'],
  imageLinks: { thumbnail: 'http://example.com/thumb.jpg' },
  shelf: 'currentlyReading',
}

const mockBookNoImage = {
  id: '2',
  title: 'No Image Book',
  authors: ['Author Two'],
  shelf: 'read',
}

describe('Book', () => {
  it('renders book title and authors', () => {
    const updateBookShelf = jest.fn()
    const { getByText } = render(
      <Book book={mockBook} shelfType="currentlyReading" updateBookShelf={updateBookShelf} />
    )
    expect(getByText('Test Book')).toBeTruthy()
    expect(getByText('Author One')).toBeTruthy()
  })

  it('renders without crashing when book has no imageLinks', () => {
    const updateBookShelf = jest.fn()
    const { getByText } = render(
      <Book book={mockBookNoImage} shelfType="read" updateBookShelf={updateBookShelf} />
    )
    expect(getByText('No Image Book')).toBeTruthy()
  })

  it('calls updateBookShelf when shelf selection changes', () => {
    const updateBookShelf = jest.fn()
    const { container } = render(
      <Book book={mockBook} shelfType="currentlyReading" updateBookShelf={updateBookShelf} />
    )
    const select = container.querySelector('select')
    fireEvent.change(select, { target: { value: 'wantToRead' } })
    expect(updateBookShelf).toHaveBeenCalledWith('wantToRead', mockBook)
  })

  it('has the correct select value matching shelfType', () => {
    const updateBookShelf = jest.fn()
    const { container } = render(
      <Book book={mockBook} shelfType="currentlyReading" updateBookShelf={updateBookShelf} />
    )
    const select = container.querySelector('select')
    expect(select.value).toBe('currentlyReading')
  })
})
