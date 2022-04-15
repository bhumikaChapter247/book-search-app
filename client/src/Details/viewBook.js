import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import ApiRoutes from '../config/apiRoutes';
import Header from '../Header';

const ViewBook = () => {
  const param = useParams();
  const [result, setResult] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getBookDetails();
    // eslint-disable-next-line
  }, []);

  const getBookDetails = async () => {
    // call api to get all books
    await axios
      .get(`${ApiRoutes.googleSearchBooks}/${param.id}`)
      .then((res) => {
        setResult(res.data);
      })
      .catch((err) => {
        throw err;
      });
  };

  const { volumeInfo } = result;

  return (
    <div id='result-card'>
      <Header />
      {/* View Book info */}

      <div className='row text-center mt-3' id='result-header'>
        <div className='d-flex flex-row-reverse'>
          <Button className='p-2' onClick={() => navigate(-1)}>
            Back to search
          </Button>
        </div>
        <h4>{volumeInfo?.title}</h4>
        <p>{volumeInfo?.subtitle}</p>
        <small>
          <br />
          Written By:
          <br />
          {volumeInfo?.authors}
        </small>
      </div>
      <div className='row'>
        <hr />
      </div>
      <div className='row col-wrapper'>
        <div className='col-3 p-4'>
          <img
            src={volumeInfo?.imageLinks?.thumbnail}
            alt={volumeInfo?.title}
          />
        </div>
        <div className='col-9'>
          <p className='head font-size-15'>Description: </p>
          <span
            dangerouslySetInnerHTML={{
              __html: volumeInfo?.description,
            }}
          />
        </div>
        <div className='col-4'>
          <p className='head'>Publisher: </p>
          {volumeInfo?.publisher}
        </div>
        <div className='col-4'>
          <p className='head'>Date of Publish: </p>
          {volumeInfo?.publishedDate}
        </div>
        <div className='col-4'>
          <p className='head'>No. of pages: </p>
          {volumeInfo?.pageCount}
        </div>
      </div>
    </div>
  );
};

export default ViewBook;
