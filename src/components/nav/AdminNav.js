import React from "react";
import { Link } from "react-router-dom";

const AdminNav = () => {
  return (
    <>
      <nav
        className="collapse show navbar navbar-vertical navbar-light align-items-start p-0 border border-top-0 border-bottom-0"
        id="navbar-vertical"
      >
        <div
          className="navbar-nav w-100 overflow-hidden"
          style={{ height: "410px" }}
        >
          {/*  <div className="nav-item dropdown">
        <a href="#" className="nav-link" data-toggle="dropdown">
          Dresses{" "}
          <i className="fa fa-angle-down float-right mt-1"></i>
        </a>
        <div className="dropdown-menu position-absolute bg-secondary border-0 rounded-0 w-100 m-0">
          <a href="" className="dropdown-item">
            Men's Dresses
          </a>
          <a href="" className="dropdown-item">
            Women's Dresses
          </a>
          <a href="" className="dropdown-item">
            Baby's Dresses
          </a>
        </div>
  </div> */}
          <Link to="/admin/dashboard" className="nav-item nav-link">
            Dashoboard
          </Link>
          <Link to="/admin/product" className="nav-item nav-link">
            Product
          </Link>
          <Link to="/admin/products" className="nav-item nav-link">
            Products
          </Link>
          <Link to="/admin/category" className="nav-item nav-link">
            Category
          </Link>
          <Link to="/admin/sub" className="nav-item nav-link">
            Sub Category
          </Link>
          <Link to="/admin/coupon" className="nav-item nav-link">
            Coupon
          </Link>
        </div>
      </nav>
    </>
  );
};

export default AdminNav;
