import React, { forwardRef, useImperativeHandle, useState } from 'react';
import Product from '../models/Product';

const ProductSave = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    //상위컴포넌트에서 변경
    showProductModal() {
      setShow(true);
    },
  }));

  const [product, setProduct] = useState(new Product('', '', 0));
  const [errorMessage, setErrorMessage] = useState('');
  const [show, setShow] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const saveProduct = (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProduct((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  return (
    <Modal show={show}>
      <form noValidate onSubmit={saveProduct} className={submitted ? 'was-validated' : ''}>
        <div className="modal-header">
          <h5 className="modal-title">상품 정보</h5>
          <button type="button" className="btn-close" onClick={() => setShow(false)}></button>
        </div>

        <div className="modal-body">
          {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

          <div className="form-group">
            <label htmlFor="name">상품명: </label>
            <input
              type="text"
              name="name"
              placeholder="name"
              className="form-control"
              value={product.name}
              onChange={handleChange}
              required
            />
            <div className="invalid-feedback">Name is required.</div>
          </div>

          <div className="form-group">
            <label htmlFor="description">상품설명: </label>
            <textarea
              name="description"
              placeholder="description"
              className="form-control"
              value={product.description}
              onChange={handleChange}
              required
            />
            <div className="invalid-feedback">Description is required.</div>
          </div>

          <div className="form-group">
            <label htmlFor="price">가격: </label>
            <input
              type="number"
              min="1"
              step="any"
              name="price"
              placeholder="price"
              className="form-control"
              value={product.price}
              onChange={handleChange}
              required
            />
            <div className="invalid-feedback">Price is required and should be greater than 0.</div>
          </div>
        </div>

        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={() => setShow(false)}>
            닫기
          </button>
          <button type="submit" className="btn btn-primary">
            저장하기
          </button>
        </div>
      </form>
    </Modal>
  );
});

export default ProductSave;
