import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

let typeString='';

class Shelf extends Component {

    static propTypes ={
        type:PropTypes.string.isRequired,
        books:PropTypes.array.isRequired,
        allBooks:PropTypes.array.isRequired,
        onUpdateBookShelf:PropTypes.func.isRequired
    }

   state = {
       shelfType:''
   }

    displayShelfTitle = () => {
        if(this.props.type != 'search'){
            return this.typeString;
        }
    }

    shelfType = (book) => {
          console.log("~~~~ All Books = ",this.props.allBooks)
         console.log("+++ Book = ",book)
        
        this.props.allBooks.map((shelfBook) => {
           
            if(shelfBook.id === book.id){
                    console.log('#### ID = ',book.id)
                    console.log('#### TYPE = ',shelfBook.shelf)
                return shelfBook.shelf
            } else {
                return 'None'
            }
            
        })
    }

    render() {

        const {books,allBooks,type,onUpdateBookShelf}=this.props

        if(type === 'currentlyReading' ){
            this.typeString='Currently Reading'
        } else if (type == 'wantToRead'){
            this.typeString='Want to Read'
        } else if (type === 'read'){
            this.typeString='Read'
        } else if(type === 'search'){
            this.typeString='Search Results'
        }

        return(  
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.displayShelfTitle()}  
                    </h2>
                <div className="bookshelf-books">
                    <ol> 
                        <li className="books-grid">
                            {books.length > 0 && books.map((book) => (
                                <Book key={book.id} book={book} 
                                    updateBookShelf={onUpdateBookShelf} 
                                    shelfType={book.shelf} allBooks={this.props.allBooks}/>

                            ))}
                        </li>
                    </ol>
                </div>
            </div>
        )
    }
}
export default Shelf