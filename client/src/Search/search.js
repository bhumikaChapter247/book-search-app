import React, { useState } from 'react';
import axios from 'axios';
import SearchResult from './SearchResult';
import { Form } from 'react-bootstrap';

const Home = () => {
  const [results, setResult] = useState([]);
  const [title, setTitle] = useState('');
  const handleInputChange = (event) => {
    const { value } = event.target;
    setTitle(value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    axios
      .get(`https://www.googleapis.com/books/v1/volumes?q=${title}`)
      .then((res) => {
        setResult(res.data.items);
      })
      .catch((err) => {
        throw err;
      });
  };
  return (
    <div>
      <div className='jumbotron jumbotron-fluid bg-secondary text-white'>
        <span className='display-2'>Google Book Search</span>
        <span className='lead'>Find your favorite books</span>
      </div>
      <div className='container'>
        <Form onSubmit={handleFormSubmit}>
          <div id='search-form' className='text-center'>
            <input
              className='form-control'
              name='title'
              placeholder='Search for a book...'
              type='text'
              value={title}
              onChange={handleInputChange}
            ></input>
            <br />
            <button className='btn btn-block btn-primary' type='submit'>
              {' '}
              Search
            </button>
          </div>
        </Form>

        <div className='container-fluid' id='main-content'>
          {results && results.length
            ? results.map((book) => {
                const { id, volumeInfo } = book;
                const { title, infoLink, authors, description, imageLinks } =
                  volumeInfo;
                return (
                  <SearchResult
                    key={id}
                    title={title}
                    id={id}
                    link={infoLink}
                    author={authors}
                    image={imageLinks?.thumbnail}
                    description={description}
                    results={results}
                  />
                );
              })
            : null}
        </div>
      </div>
    </div>
  );
};
export default Home;
