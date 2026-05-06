import React from 'react'
import { render } from '@testing-library/react'
import Shelf from './Shelf'

const mockBooks = [
  {
    id: '1',
    title: 'Book One',
    authors: ['Author A'],
    imageLinks: { thumbnail: 'http://example.com/1.jpg' },
    shelf: 'currentlyReading',
  },
  {
    id: '2',
    title: 'Book Two',
    authors: ['Author B'],
    imageLinks: { thumbnail: 'http://example.com/2.jpg' },
    shelf: 'currentlyReading',
  },
]

describe('Shelf', () => {
  it('renders Currently Reading shelf title in the heading', () => {
    const onUpdateBookShelf = jest.fn()
    const { container } = render(
      <Shelf type="currentlyReading" books={mockBooks} allBooks={mockBooks} onUpdateBookShelf={onUpdateBookShelf} />
    )
    const title = container.querySelector('.bookshelf-title')
    expect(title.textContent).toContain('Currently Reading')
  })

  it('renders Want to Read shelf title in the heading', () => {
    const onUpdateBookShelf = jest.fn()
    const { container } = render(
      <Shelf type="wantToRead" books={[]} allBooks={mockBooks} onUpdateBookShelf={onUpdateBookShelf} />
    )
    const title = container.querySelector('.bookshelf-title')
    expect(title.textContent).toContain('Want to Read')
  })

  it('renders Read shelf title in the heading', () => {
    const onUpdateBookShelf = jest.fn()
    const { container } = render(
      <Shelf type="read" books={[]} allBooks={mockBooks} onUpdateBookShelf={onUpdateBookShelf} />
    )
    const title = container.querySelector('.bookshelf-title')
    expect(title.textContent).toContain('Read')
  })

  it('renders all books in the shelf', () => {
    const onUpdateBookShelf = jest.fn()
    const { getByText } = render(
      <Shelf type="currentlyReading" books={mockBooks} allBooks={mockBooks} onUpdateBookShelf={onUpdateBookShelf} />
    )
    expect(getByText('Book One')).toBeTruthy()
    expect(getByText('Book Two')).toBeTruthy()
  })

  it('does not display shelf title for search type', () => {
    const onUpdateBookShelf = jest.fn()
    const { container } = render(
      <Shelf type="search" books={mockBooks} allBooks={mockBooks} onUpdateBookShelf={onUpdateBookShelf} />
    )
    const title = container.querySelector('.bookshelf-title')
    expect(title.textContent.trim()).toBe('')
  })
})
