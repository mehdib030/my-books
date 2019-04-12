import React, {Component} from 'react'
import Shelf from './Shelf'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

class Shelves extends Component {

  static propTypes = {
        allBooks:PropTypes.array.isRequired,
        currentlyReadingBooks:PropTypes.array.isRequired,
        wantToReadBooks:PropTypes.array.isRequired,
        readBoooks:PropTypes.array.isRequired,
        onUpdateBookShelf:PropTypes.func.isRequired,
        onUpdateShowSearchPageState:PropTypes.func.isRequired
  }
    
    render(){
      const {currentlyReadingBooks,wantToReadBooks,readBoooks,allBooks,
        onUpdateBookShelf,onUpdateShowSearchPageState} = this.props
      return (

          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
          <div className="list-books-content">
            
              <Shelf type='currentlyReading' books={currentlyReadingBooks} allBooks={allBooks}onUpdateBookShelf={onUpdateBookShelf}/>
              <Shelf type='wantToRead' books={wantToReadBooks} allBooks={allBooks} onUpdateBookShelf={onUpdateBookShelf}/>
              <Shelf type='read' books={readBoooks} allBooks={allBooks} onUpdateBookShelf={onUpdateBookShelf} />
          
              
             <div className="open-search">  
                <Link   onClick={() => {
                        onUpdateShowSearchPageState(true)}}
                        to='/search' className="search-button"
                        >Add a book</Link>
              </div>
          </div>
          
        </div>


      )
  }
}
export default Shelves