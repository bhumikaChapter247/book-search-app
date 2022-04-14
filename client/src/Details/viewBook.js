import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

const ViewBook = () => {
  const param = useParams();
  const [result, setResult] = useState([]);
  console.log('param', param);
  useEffect(() => {
    getBookDetails();
    // eslint-disable-next-line
  }, []);
  const getBookDetails = async () => {
    await axios
      .get(`https://www.googleapis.com/books/v1/volumes/${param.id}`)
      .then((res) => {
        console.log('res-----', res);
        setResult(res.data);
      })
      .catch((err) => {
        throw err;
      });
  };
  console.log('result----', result);
  const { volumeInfo } = result;
  // const
  return (
    <div id='result-card '>
      <div className='row text-center mt-5' id='result-header'>
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
      <div className='row'>
        <div className='col-3'>
          <img
            src={volumeInfo?.imageLinks?.thumbnail}
            alt={volumeInfo?.title}
          />
        </div>
        <div className='col-9'>
          <p className='lead font-size-15'>Description: </p>
          <span
            dangerouslySetInnerHTML={{
              __html: volumeInfo?.description,
            }}
          />
        </div>
        <div className='col-6'>
          <p className='lead'>Publisher: </p>
          {volumeInfo?.publisher}
        </div>
        <div className='col-6'>
          <p className='lead'>Date of Publish: </p>
          {volumeInfo?.publishedDate}
        </div>
        <div className='col-6'>
          <p className='lead'>No. of pages: </p>
          {volumeInfo?.pageCount}
        </div>
      </div>
    </div>
  );
};

export default ViewBook;
