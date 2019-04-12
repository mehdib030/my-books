import React, {Component} from 'react'
import propTypes from 'prop-types'
import Shelf from './Shelf'

class BookShelfChanger extends Component{

    static propTypes = {
        type:PropType.string.isRequired,
        books:PropTypes.array.isRequired,
        onUpdateBookShelf:PropTypes.func.isRequired
    }

    state ={
      value:''
    }

 

  updateShelf = (svalue)=>{

    if (type === 'currentlyReading'){

    } else if(type === 'wantToRead'){

    } else if (type === 'read'){

    } else if (type === 'none') {

    }

     this.setState((currentState) => ({
        value: svalue
      }))
  }


  render() {

    return (

        <div className="book-shelf-changer">
            <select onChange={(event) => this.props.onUpdateBookShelf(event.target.value)} value={this.state.value}>
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
            </select>
        </div>
    )
  }




}