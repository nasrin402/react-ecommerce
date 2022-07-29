import React from "react";
import { Link, NavLink } from "react-router-dom";

const AdminNav = () => {
  return (
   
      <nav
        className="  navbar navbar-vertical navbar-light bg-secondary align-items-start p-0 border border-top-0 border-bottom-0"
        
       
      >
        <div
          className="navbar-nav w-100 overflow-hidden"
          style={{ height: "410px" }}
        >
          <NavLink to="/admin/dashboard" className="nav-item nav-link">
            Dashoboard
          </NavLink>
          <NavLink to="/admin/product" className="nav-item nav-link">
            Add Product
          </NavLink>
          <NavLink to="/admin/products" className="nav-item nav-link">
            Products
          </NavLink>
          <NavLink to="/admin/category" className="nav-item nav-link">
            Category
          </NavLink>
          <NavLink to="/admin/sub" className="nav-item nav-link">
            Sub Category
          </NavLink>
          {/*  <NavLink to="/admin/coupon" className="nav-item nav-link">
            Coupon
  </NavLink> */}
        </div>
      </nav>

  );
};

export default AdminNav;
