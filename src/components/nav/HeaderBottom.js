import React from "react";
import {
  HomeOutlined,
  ShoppingOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import Search from "../forms/search";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

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
    <div class="header-middle">
      <div class="container">
        <div class="row">
          <div class="col-sm-4">
            <div class="logo pull-left item">
              <a href="#">
                <h1>
                  <span>NSM</span>-SHOP
                </h1>
              </a>
            </div>
          </div>
          <div class="col-sm-8">
            <div class="shop-menu pull-right">
              <ul class="nav navbar-nav">
                <li>
                  <Link to="/" class="active">
                    <HomeOutlined /> Home
                  </Link>
                </li>
                {/* <li>
                  <a href="#">
                    <i class="fa fa-user"></i> Account
                  </a>
                </li> */}
                <li class="dropdown">
                  <Link to="/shop">
                    <ShoppingOutlined /> Shop
                  </Link>
                </li>
                <li>
                  <Link to="">
                    <i class="fa fa-star"></i> Wishlist
                  </Link>
                </li>
                {/* <li>
                  <a href="#">
                    <i class="fa fa-crosshairs"></i> Checkout
                  </a>
                </li> 
                <ul role="menu" class="sub-menu">
                                          <li><a href="#">Products</a></li>
                      <li><a href="#">Product Details</a></li> 
                      <li><a href="#">Checkout</a></li> 
                      <li><a href="#">Cart</a></li> 
                      <li><a href="#">Login</a></li> 
                                      </ul>
              
              */}
                <li>
                  <Link>
                    <i class="fa fa-shopping-cart"></i> Cart
                  </Link>
                </li>
                {!user && (
                  <li>
                    <Link to="/login">
                      <i class="fa fa-lock"></i> Login
                    </Link>
                  </li>
                )}
                {!user && (
                  <li>
                    <Link to="/register">
                      <UserAddOutlined /> Register
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
          <div class="col-sm-12">
            <div class=" pull-right">
              <Search />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderBottom;
