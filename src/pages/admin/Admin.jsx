import React, { useEffect, useRef, useState } from 'react';
import productService from '../../services/Product.service';
import ProductSave from '../../components/ProductSave';

const Admin = () => {
  const [productList, setProductList] = useState([]);
  const saveComponent = useRef();
  useEffect(() => {
    productService.getAllProducts().then((response) => {
      setProductList(response.data);
    });
  }, []);
  const createProductRequest = () => {
    saveComponent.current?.showProductModal(); //모달 보이게 됨
  };
  return (
    <div className="container">
      <div className="card mt-5">
        <div className="card-header">
          <div className="row">
            <div className="col-6">
              <h3>모든 제품들</h3>
            </div>

            <div className="col-6 text-end">
              <button onClick={createProductRequest} className="btn btn-primary">
                새 제품
              </button>
            </div>
          </div>
        </div>
        <div className="card-body">
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Price</th>
                <th scope="col">Date</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {productList.map((item, index) => (
                <tr key={index}>
                  <th scope="col">{index + 1}</th>
                  <td>{item.name}</td>
                  <td>{item.price} 원</td>
                  <td>{new Date(item.createTime).toLocaleString()}</td>
                  <td>
                    <button className="btn btn-primary me-1">수 정</button>
                    <button className="btn btn-danger">삭 제</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ProductSave ref={saveComponent} />
    </div>
  );
};

export default Admin;
