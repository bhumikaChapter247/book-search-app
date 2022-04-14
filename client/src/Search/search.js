import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SearchResult from './SearchResult';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [results, setResult] = useState([]);
  const [savedTitles, setsavedTitles] = useState([]);
  const [title, setTitle] = useState('');
  useEffect(() => {
    getSavedSearch();
    // eslint-disable-next-line
  }, []);

  const handleInputChange = (event) => {
    const { value } = event.target;
    setTitle(value);
  };
  const getSavedSearch = async () => {
    await axios
      .get(
        `http://localhost:5000/api/user/savedtitles?id=${localStorage.getItem(
          'id'
        )}`
      )
      .then(async (res) => {
        setsavedTitles(res.data.data);
      })
      .catch(async (err) => {});
  };
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    await axios
      .get(`https://www.googleapis.com/books/v1/volumes?q=${title}`)
      .then(async (res) => {
        setResult(res.data.items);
        await axios
          .post('http://localhost:5000/api/user/savedsearch', {
            title: title,
            id: localStorage.getItem('id'),
          })
          .then(async (res) => {})
          .catch(async (err) => {});
      })
      .catch((err) => {
        throw err;
      });
  };
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    navigate('/');
  };
  console.log('savedTitles', savedTitles);
  return (
    <div>
      <div className='jumbotron jumbotron-fluid bg-secondary text-white'>
        <span className='display-2'>Google Book Search</span>
        <span className='lead'>Find your favorite books</span>
        <Button className='float-right' onClick={logout}>
          Logout
        </Button>
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
            {/* <div>
              {savedTitles?.length
                ? savedTitles.map((item) => {
                    return (
                      <span key={item.id}>
                        {item.title}
                        <br />
                      </span>
                    );
                  })
                : null}
            </div> */}
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
