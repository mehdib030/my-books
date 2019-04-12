# MyReads Library Project

This project is an implementation of a library that allows a user to maitain the status of books that they are
either currently reading, want to read, or have already read. The user can search a book by various criteria, title ,description and author among others. In the search screen, the search results will display a maximum of 20 books. Each book has a state changer that displays the user's reading state. The state can be changed to either one of four states: currently reading, want to read, read or none. If 'None' is selected, the book should be removed from the shelf. The state of the books is the main page should reflect the state of the books in the search page.


## TL;DR

## Installation and start

* install all project dependencies with `npm install`
* start the development server with `npm start`

## Backend Server

BookAPI.js

* [`getAll`](#getall)
* [`update`](#update)
* [`search`](#search)

### `getAll`

Method Signature:

```js
getAll()
```

* Returns a Promise which resolves to a JSON object containing a collection of book objects.
* This collection represents the books currently in the bookshelves in your app.

### `update`

Method Signature:

```js
update(book, shelf)
```

* book: `<Object>` containing at minimum an `id` attribute
* shelf: `<String>` contains one of ["wantToRead", "currentlyReading", "read"]  
* Returns a Promise which resolves to a JSON object containing the response data of the POST request

### `search`

Method Signature:

```js
search(query)
```

* query: `<String>`
* Returns a Promise which resolves to a JSON object containing a collection of a maximum of 20 book objects.
* These books do not know which shelf they are on. They are raw results only. You'll need to make sure that books have the correct state while on the search page.

## Important
The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md)

## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). You can find more information on how to perform common tasks [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

## Contributing

For details, check out [CONTRIBUTING.md](CONTRIBUTING.md).
