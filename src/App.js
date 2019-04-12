import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Book from './Book'
import Shelf from './Shelf'
import {BrowserRouter,Route} from 'react-router-dom'
import Shelves from './Shelves'
import Search from './Search'

class BooksApp extends React.Component {
  
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    books:[],
    currentlyReadingBooks:[],
    wantToReadBooks:[],
    readBoooks:[]
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState({
          books:books
        })
        books.map((book)=>{
            switch(book.shelf){
              case 'currentlyReading':{
                this.setState({
                  currentlyReadingBooks: this.state.currentlyReadingBooks.concat([book])
                })
                break;
              }
              case 'wantToRead':{
                this.setState( {
                  wantToReadBooks: this.state.wantToReadBooks.concat([book])
                })
                break;
              }
              case 'read': {
                this.setState({
                  readBoooks: this.state.readBoooks.concat([book])
                })
                break;
              }
            }
        })
      })
      
  }

  updateBookShelf = (type,book) => {

      if (type === 'currentlyReading'){
        BooksAPI.update(book,'currentlyReading').then((data) => {
          console.log("UPDATED currentlyReading book = ",data)
          BooksAPI.getAll()
          .then((books) => {
            this.setState({
              books:books
            })
          })
        })

        if(!this.isBookInShelf(this.state.currentlyReadingBooks,book)){
            console.log('Updated : currentlyReading')
            book.shelf='currentlyReadingBooks'
            this.setState((currentState) => ({
            currentlyReadingBooks: currentState.currentlyReadingBooks.concat([book]),
            wantToReadBooks: currentState.wantToReadBooks.filter((b) => {
              return b.id != book.id
            }),
            readBoooks: currentState.readBoooks.filter((b) => {
              return b.id != book.id
            })
          }))
        }
      } else if(type === 'wantToRead'){
        BooksAPI.update(book,'wantToRead').then((data) => {
          console.log("UPDATED wantToRead book = ",data)
          BooksAPI.getAll()
          .then((books) => {
            this.setState({
              books:books
            })
          })
        })
        if(!this.isBookInShelf(this.state.wantToReadBooks,book)){
          console.log('Updated : wantToRead')
          book.shelf='wantToRead'
        this.setState((currentState) => ({
          wantToReadBooks: currentState.wantToReadBooks.concat([book]),
          currentlyReadingBooks: currentState.currentlyReadingBooks.filter((b) => {
            return b.id != book.id
          }),
          readBoooks: currentState.readBoooks.filter((b) => {
            return b.id != book.id
          })
        }))
      }
      } else if (type === 'read'){
        BooksAPI.update(book,'read').then((data) => {
          console.log("UPDATED read book = ",data)
          BooksAPI.getAll()
          .then((books) => {
            this.setState({
              books:books
            })
          })
        })
        if(!this.isBookInShelf(this.state.readBoooks,book)){
          console.log('Updated : read')
          book.shelf='read'
        this.setState((currentState) => ({
          readBoooks: currentState.readBoooks.concat([book]),
          currentlyReadingBooks: currentState.currentlyReadingBooks.filter((b) => {

            return b.id != book.id
          }),
          wantToReadBooks: currentState.wantToReadBooks.filter((b) => {
            return b.id != book.id
          })
        }))
      }
      } else if (type === 'none') {
        BooksAPI.update(book,'none').then((data) => {
          console.log("UPDATED read book = ",data)
          BooksAPI.getAll()
          .then((books) => {
            this.setState({
              books:books
            })
          })
        })
        book.shelf='none'
        this.setState((currentState) => ({
          readBoooks: currentState.readBoooks.filter((b) => {
            return b.id != book.id
          }),
          currentlyReadingBooks: currentState.currentlyReadingBooks.filter((b) => {

            return b.id != book.id
          }),
          wantToReadBooks: currentState.wantToReadBooks.filter((b) => {
            return b.id != book.id
          })
        }))
      }
      
  }

  isBookInShelf = (books,book) => {
      let isBookInShelf=false
      books.forEach((b) => {
        if (b.id === book.id){
          isBookInShelf=true
      }
      })
      return isBookInShelf
  }

  updateShowSearchPageState = (state) => {
      this.setState(() => ({
        showSearchPage:state
      }))
  }

  render() {
    return (
      <BrowserRouter>
      <div className="app" >
        {this.state.showSearchPage ? (
           <Route exact path='/search' render={()=>(
          <Search 
             onUpdateBookShelf={this.updateBookShelf} allBooks={this.state.books}
            onUpdateShowSearchPageState={this.updateShowSearchPageState} 
            />
            )} /> 
        ) : (
            <div>
              <Route exact path='/' render={()=>(<Shelves 
                 allBooks={this.state.books}
                 currentlyReadingBooks={this.state.currentlyReadingBooks} 
                 wantToReadBooks={this.state.wantToReadBooks} 
                 readBoooks={this.state.readBoooks}
                 onUpdateBookShelf={this.updateBookShelf}
                 onUpdateShowSearchPageState={this.updateShowSearchPageState}
                 />
              )} />
              </div>
          )}
          
      </div>
      </BrowserRouter>
    )
  }
}

export default BooksApp
