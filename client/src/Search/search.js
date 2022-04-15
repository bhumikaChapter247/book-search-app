import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SearchResult from './SearchResult';
import { Form } from 'react-bootstrap';
import ApiRoutes from '../config/apiRoutes';
import { AppConfig } from '../config/appConfig';
import Header from '../Header';

const Home = () => {
  const [results, setResult] = useState([]);
  const [savedTitles, setsavedTitles] = useState([]);
  const [title, setTitle] = useState('');
  let user_id = localStorage.getItem('id');
  useEffect(() => {
    getSavedSearch();
    // eslint-disable-next-line
  }, []);

  const handleInputChange = (event) => {
    const { value } = event.target;
    setTitle(value);
  };

  const getSavedSearch = async () => {
    // call api to get saved titles
    await axios
      .get(`${AppConfig.API_ENDPOINT}${ApiRoutes.savedTitles}?id=${user_id}`)
      .then(async (res) => {
        setsavedTitles(res.data.data);
      })
      .catch(async (err) => {});
  };

  // Get book from google search
  const searchBooks = async () => {
    await axios
      .get(`${ApiRoutes.googleSearchBooks}?q=${title}`)
      .then(async (res) => {
        setResult(res.data.items);
        await axios
          .post(`${AppConfig.API_ENDPOINT}${ApiRoutes.savedSearch}`, {
            title: title,
            id: user_id,
          })
          .then(async (res) => {})
          .catch(async (err) => {});
      })
      .catch((err) => {
        throw err;
      });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    getSavedSearch();
    console.log(savedTitles);
    // navigate(`${AppRoutes.SEARCH}?title=${title}`);
    searchBooks();
  };

  return (
    <div>
      <Header />
      <div className='book-text'>
        <h3>Find your favorite books</h3>
      </div>
      <div className='container '>
        <div className='container search-card'>
          {' '}
          <Form onSubmit={handleFormSubmit} className='form-wrapper'>
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
                <i className='fa fa-search' /> Search
              </button>
            </div>
          </Form>
        </div>

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
