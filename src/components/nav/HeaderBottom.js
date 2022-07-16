import React from 'react';
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import Search from "../forms/search";

const HeaderBottom = () => {
    let history = useHistory();
    let dispatch = useDispatch();
    let { user } = useSelector((state) => ({ ...state }));
    const logout = () => {
      signOut(auth)
        .then(() => {
          console.log("Sign-out successful.");
        })
        .catch((error) => {
          console.log(error.message);
        });
      dispatch({
        type: "LOGOUT",
        payload: null,
      });
      history.push("/login");
    };
    return (
        <>
        <div className="container-fluid mb-5">
          <div className="row border-top px-xl-5">
            <div className="col-lg-3 d-none d-lg-block">
             <Link
                className="btn shadow-none d-flex align-items-center justify-content-between bg-primary text-white w-100"
                data-toggle="collapse"
                to="#navbar-vertical"
                style={{ height: "65px", marginTop: "-1px", padding: "0 30px" }}
              >
                <h6 className="m-0">Categories</h6>
                <i className="fa fa-angle-down text-dark"></i>
             </Link>
            </div>
            <div className="col-lg-9">
              <nav className="navbar navbar-expand-lg bg-light navbar-light py-3 py-lg-0 px-0">
               <Link to="" className="text-decoration-none d-block d-lg-none">
                  <h1 className="m-0 display-5 font-weight-semi-bold">
                    <span className="text-primary font-weight-bold border px-3 mr-1">
                      E
                    </span>
                    Shopper
                  </h1>
               </Link>
                <button
                  type="button"
                  className="navbar-toggler"
                  data-toggle="collapse"
                  data-target="#navbarCollapse"
                >
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div
                  className="collapse navbar-collapse justify-content-between"
                  id="navbarCollapse"
                >
                  <div className="navbar-nav mr-auto py-0">
                   <Link to="/" className="nav-item nav-link active">
                      Home
                   </Link>
                   <Link to="shop.html" className="nav-item nav-link">
                      Shop
                   </Link>
                   <Link to="detail.html" className="nav-item nav-link">
                      Shop Detail
                   </Link>
                    <div className="nav-item dropdown">
                     <Link
                        to="#"
                        className="nav-link dropdown-toggle"
                        data-toggle="dropdown"
                      >
                        Pages
                     </Link>
                      <div className="dropdown-menu rounded-0 m-0">
                       <Link to="cart.html" className="dropdown-item">
                          Shopping Cart
                       </Link>
                       <Link to="checkout.html" className="dropdown-item">
                          Checkout
                       </Link>
                      </div>
                    </div>
                   <Link to="contact.html" className="nav-item nav-link">
                      Contact
                   </Link>
                  </div>
                  {!user && (
                  <div className="navbar-nav ml-auto py-0">
                    <Link to="/login"  className="nav-item nav-link">Login</Link>
                    <Link to="/register"  className="nav-item nav-link">Register</Link>
                  </div>
                  )}
                </div>
              </nav>
            </div>
          </div>
        </div>
      </>
    );
}

export default HeaderBottom;
