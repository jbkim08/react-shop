import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import purchaseService from '../../services/purchase.service';
import { Role } from '../../models/Role';
import userService from '../../services/user.service';
import { clearCurrentUser } from '../../store/actions/user';

const Profile = () => {
  const [purchaseList, setPurchaseList] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const currentUser = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const changeRole = () => {
    //현재 유저의 role이 ADMIN이면 유저로 아니면 ADMIN으로 newRole를 만듬
    const newRole = currentUser.role === Role.ADMIN ? Role.USER : Role.ADMIN;

    userService
      .changeRole(newRole)
      .then(() => {
        dispatch(clearCurrentUser()); //유저를 클리어
        window.location.href = '/login';
      })
      .catch((err) => {
        setErrorMessage('예기치 않은 에러가 발생했습니다.');
        console.log(err);
      });
  };

  useEffect(() => {
    purchaseService.getAllPurchases().then((response) => {
      setPurchaseList(response.data);
    });
  }, []);

  return (
    <div className="mt-5">
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

      <div className="card">
        <div className="card-header">
          <div className="row">
            <div className="col-6">
              <h3>구매한 상품들</h3>
            </div>
            <div className="col-6 text-end">
              현재 유저의 권한은 <strong>{currentUser?.role} </strong> 입니다.
              <button onClick={changeRole} className="btn btn-primary ms-3">
                권한 변경
              </button>
            </div>
          </div>
        </div>
        <div className="card-body">
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">상품명</th>
                <th scope="col">가격</th>
                <th scope="col">구매일자</th>
              </tr>
            </thead>
            <tbody>
              {purchaseList.map((item, ind) => (
                <tr key={ind}>
                  <th scope="row">{ind + 1}</th>
                  <td>{item.name}</td>
                  <td>{`${item.price} 원`}</td>
                  <td>{new Date(item.purchaseTime).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Profile;
