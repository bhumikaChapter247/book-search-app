import React, { Component } from 'react';
import axios from 'axios';
import SearchResult from './SearchReuslt';
// import API from '../../utils/api';
// import ResultCard from '../ResultCard';
// import SearchForm from '../SearchForm';

class Home extends Component {
  state = {
    books: [],
    results: [],
    title: '',
  };

  //   componentDidMount() {
  //     API.getBooks()
  //       .then((res) => {
  //         this.setState({ books: res.data });
  //         console.log('books:', this.state.books);
  //       })
  //       .catch((err) => {
  //         throw err;
  //       });
  //   }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    axios
      .get(`https://www.googleapis.com/books/v1/volumes?q=${this.state.title}`)
      //   API.getGoogleSearchBooks(this.state.title)
      .then((res) => {
        this.setState({
          results: res.data.items,
        });
      })
      .catch((err) => {
        throw err;
      });
  };

  handleSaveBook = (event) => {
    event.preventDefault();

    const bookID = event.target.getAttribute('data-id');
    // console.log("Book ID:", bookID )

    const newState = { ...this.state };
    // console.log(this.state.results)

    let targetBook = this.state.results.filter((book) => book.id === bookID);
    // Parses out book data from results by book id

    const newBook = {
      title: targetBook[0].volumeInfo.title,
      authors: targetBook[0].volumeInfo.authors,
      description: targetBook[0].volumeInfo.description,
      image: targetBook[0].volumeInfo.imageLinks.thumbnail,
      link: targetBook[0].volumeInfo.infoLink,
    };
    // Instantiates new object formatted per the db schema.

    if (this.state.books[bookID]) {
      console.log(`You've already saved that book.`);
      return;
    } else {
      newState.books[bookID] = newBook;
      // console.log('Target:', targetBook[0])

      this.setState(newState);
      // Mutates state to now hold saved books in this.state.books
      console.log('Updated this.state:', this.state.books);

      //   API.saveBook({
      //     title: targetBook[0].volumeInfo.title,
      //     authors: targetBook[0].volumeInfo.authors,
      //     description: targetBook[0].volumeInfo.description,
      //     image: targetBook[0].volumeInfo.imageLinks.thumbnail,
      //     link: targetBook[0].volumeInfo.infoLink,
      //   });

      // console.log(newState.books)
    }
  };

  render() {
    const { results } = this.state;
    return (
      <div>
        <div className='jumbotron jumbotron-fluid bg-secondary text-white'>
          <span className='display-2'>Google Book Search</span>
          <span className='lead'>Find your favorite books</span>
        </div>
        <div className='container'>
          <div id='search-form' className='text-center'>
            <input
              className='form-control'
              name='title'
              placeholder='Search for a book...'
              type='text'
              onChange={this.handleInputChange}
            ></input>
            <br />
            <button
              className='btn btn-block btn-primary'
              onClick={this.handleFormSubmit}
              type='submit'
            >
              {' '}
              Search
            </button>
          </div>

          <div className='container-fluid' id='main-content'>
            {console.log('results---------', results)}
            {results.map((book) => {
              const { id, volumeInfo } = book;
              const { title, infoLink, authors, description, imageLinks } =
                volumeInfo;
              const { thumbnail } = imageLinks;
              return (
                <SearchResult
                  key={id}
                  title={title}
                  id={id}
                  link={infoLink}
                  author={authors}
                  image={thumbnail}
                  description={description}
                  //   saveBook={this.handleSaveBook}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
