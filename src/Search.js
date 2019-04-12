import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Shelf from './Shelf'
import {Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'



class Search extends Component {

    static propTypes = {
        allBooks:PropTypes.array.isRequired,
        onUpdateBookShelf:PropTypes.func.isRequired,
        onUpdateShowSearchPageState:PropTypes.func.isRequired
    }

    state ={
        searchString:'',
        books:[]
    }
    
    search = (searchString) => {
        if(searchString){
          this.setState({searchString:searchString})
          BooksAPI.search(searchString).then((books) => {
            if(searchString === this.state.searchString) {
                books && books.length > 0 && books.map((book)=>{
                  book.shelf='none'
                    this.props.allBooks.map((libraryBook)=>{
                      if(book.id === libraryBook.id){
                          book.shelf=libraryBook.shelf
                      } 
                    })
                })
                this.setState({
                      books:books
                  })
                }
              }
            )
        }
    }

    render(){
        const {onUpdateBookShelf,onUpdateShowSearchPageState,allBooks} = this.props
        return(
            <div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to='/' onClick={() => onUpdateShowSearchPageState(false)}>Close</Link>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author" 
                    onChange={(event) => this.search(event.target.value)}/>
              </div>
            </div>
              <div className="search-books-results">
              <div className="list-books-title">
                      <h1>Search Books</h1>
                </div>
                {this.state.books && this.state.books.length >0 &&
                    <Shelf type='search' books={this.state.books} allBooks={allBooks} onUpdateBookShelf={onUpdateBookShelf} />
                }
                
              </div>
            </div>
        )

    }
}
export default Search