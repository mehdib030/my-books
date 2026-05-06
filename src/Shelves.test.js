import React from 'react'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Shelves from './Shelves'

const mockBooks = [
  {
    id: '1',
    title: 'Test Book',
    authors: ['Author'],
    imageLinks: { thumbnail: 'http://example.com/1.jpg' },
    shelf: 'currentlyReading',
  },
]

describe('Shelves', () => {
  const defaultProps = {
    allBooks: mockBooks,
    currentlyReadingBooks: mockBooks,
    wantToReadBooks: [],
    readBoooks: [],
    onUpdateBookShelf: jest.fn(),
    onUpdateShowSearchPageState: jest.fn(),
  }

  it('renders without crashing', () => {
    const { container } = render(
      <MemoryRouter>
        <Shelves {...defaultProps} />
      </MemoryRouter>
    )
    expect(container).toBeTruthy()
  })

  it('renders the MyReads title', () => {
    const { getByText } = render(
      <MemoryRouter>
        <Shelves {...defaultProps} />
      </MemoryRouter>
    )
    expect(getByText('MyReads')).toBeTruthy()
  })

  it('renders all three shelf sections', () => {
    const { container } = render(
      <MemoryRouter>
        <Shelves {...defaultProps} />
      </MemoryRouter>
    )
    const shelfTitles = container.querySelectorAll('.bookshelf-title')
    const titleTexts = Array.from(shelfTitles).map(el => el.textContent.trim())
    expect(titleTexts).toContain('Currently Reading')
    expect(titleTexts).toContain('Want to Read')
    expect(titleTexts).toContain('Read')
  })

  it('renders the Add a book link', () => {
    const { getByText } = render(
      <MemoryRouter>
        <Shelves {...defaultProps} />
      </MemoryRouter>
    )
    expect(getByText('Add a book')).toBeTruthy()
  })
})
