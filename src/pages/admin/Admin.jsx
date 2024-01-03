import React, { useEffect, useState } from 'react';
import productService from '../../services/Product.service';

const Admin = () => {
  const [productList, setProductList] = useState([]);
  useEffect(() => {
    productService.getAllProducts().then((response) => {
      setProductList(response.data);
    });
  }, []);
  return (
    <div className="container">
      <div className="card mt-5">
        <div className="card-header">
          <div className="row">
            <div className="col-6">
              <h3>모든 제품들</h3>
            </div>

            <div className="col-6 text-end">
              <button className="btn btn-primary">새 제품</button>
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
                <tr>
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
    </div>
  );
};

export default Admin;
