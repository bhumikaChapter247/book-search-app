import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import ApiRoutes from '../config/apiRoutes';
import Header from '../Header';

const ViewBook = () => {
  const param = useParams();
  const [result, setResult] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
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
        setIsLoading(false);
        setResult(res.data);
      })
      .catch((err) => {
        throw err;
      });
  };

  const { volumeInfo, saleInfo } = result;
  return (
    <div id='result-card'>
      <Header />
      {/* View Book info */}
      {isLoading ? (
        <i className='fa fa-spinner fa-spin loader' />
      ) : (
        <>
          <div className='row text-center mt-3' id='result-header'>
            <div className='d-flex flex-row-reverse'>
              <Button className='' onClick={() => navigate(-1)}>
                <i className='fa fa-chevron-circle-left' /> Back
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
              {volumeInfo.description ? (
                <span
                  dangerouslySetInnerHTML={{
                    __html: volumeInfo?.description,
                  }}
                />
              ) : (
                "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book. It usually begins with: “Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.” The purpose of lorem ipsum is to create a natural looking block of  text (sentence, paragraph, page, etc.) that doesn't distract from  the layout. A practice not without controversy, laying out pages  with meaningless filler text can be very useful when the focus is meant to be on design, not content. The passage experienced a surge in popularity during the 1960s when Letraset used it on  their dry-transfer sheets, and again during the 90s as desktop  publishers bundled the text with their software. "
              )}
            </div>
            <br />

            {saleInfo?.saleability === 'NOT_FOR_SALE' ? (
              <div className='col-3 '>
                <img
                  src='/image/not-for-sale.webp'
                  width='55%'
                  alt='not for sale'
                />
              </div>
            ) : null}
            <div className='col-3 p-4'>
              <p className='head font-size-15'>Publisher: </p>
              {volumeInfo?.publisher}
            </div>
            <div className='col-2'>
              <p className='head font-size-15'>Date of Publish: </p>
              {volumeInfo?.publishedDate}
            </div>
            <div className='col-2'>
              <p className='head font-size-15'>No. of pages: </p>
              {volumeInfo?.pageCount}
            </div>
            {saleInfo?.saleability === 'FOR_SALE' ? (
              <>
                <div className='col-2'>
                  <p className='head font-size-15'>Price: </p>
                  {saleInfo?.listPrice?.currencyCode}{' '}
                  {saleInfo?.listPrice?.amount}
                </div>
                <div className='col-3'>
                  <p className='head font-size-15'>Buy Link: </p>
                  <span className='link'>
                    <a href={saleInfo?.buyLink}>Click here to buy</a>
                  </span>
                </div>
              </>
            ) : null}
          </div>
        </>
      )}
    </div>
  );
};

export default ViewBook;
