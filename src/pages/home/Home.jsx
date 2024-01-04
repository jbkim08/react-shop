import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import productService from '../../services/Product.service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import './Home.css';

const Home = () => {
  const [productList, setProductList] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [infoMessage, setInfoMessage] = useState('');

  const currentUser = useSelector((state) => state.user);

  const purchase = (product) => {
    if (!currentUser?.id) {
      setErrorMessage('로그인하셔야 구매할수 있습니다.');
      return;
    }
  };

  useEffect(() => {
    //시작시 제품리스트를 가져와 스테이트에 저장
    productService.getAllProducts().then((response) => {
      setProductList(response.data);
    });
  }, []);

  return (
    <div className="mt-3">
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      {infoMessage && <div className="alert alert-success">{infoMessage}</div>}

      <div className="d-flex justify-content-around flex-wrap gap-3">
        {productList.map((item) => (
          <div key={item.id} className="card home-card">
            <div className="card-body">
              <div className="card-title text-uppercase">{item.name}</div>
              <div className="card-subtitle text-muted">{item.description}</div>
            </div>

            <FontAwesomeIcon icon={faCartPlus} className="ms-auto me-auto product-icon" />

            <div className="row mt-2 p-3">
              <div className="col-6 mt-2 ps-3">{`${item.price}원`}</div>
              <div className="col-6">
                <button className="btn btn-outline-success w-100" onClick={() => purchase(item)}>
                  구매
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Home;
