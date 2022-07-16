import React from "react";
import { Menu } from "antd";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  HomeOutlined,
  UserAddOutlined,
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
  LogoutOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import Search from "../forms/search";


const Header = () => {
  const { Item, SubMenu } = Menu;
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
    <div class="header-bottom">
    <div class="container">
      <div class="row">
      <div class="col-sm-2">
        logo
      </div>
        <div class="col-sm-7">
          <div class="mainmenu pull-center">
          <Menu mode="horizontal" defaultSelectedKeys={["home"]}>
          <Item icon={<HomeOutlined />}>
            <Link to="/"> Home</Link>
          </Item>
          <Item icon={<ShoppingOutlined />}>
            <Link to="/shop"> Shop</Link>
          </Item>
          <Item>
            <Link to="/shop">
              {" "}
              <ShoppingCartOutlined />
            </Link>
          </Item>
          <Item>
            <Link to="/shop">
              {" "}
              <HeartOutlined />
            </Link>
          </Item>

          {user && (
            <SubMenu
              title={user.email.split("@")[0]}
              icon={<AppstoreOutlined />}
              key="SubMenu"
            >
              {user && user.role === "subscriber" && (
                <Menu.Item icon={<AppstoreOutlined />}>
                  <Link to="/user/history">Dashboard</Link>
                </Menu.Item>
              )}
              {user && user.role === "admin" && (
                <Menu.Item icon={<AppstoreOutlined />} key="dashboard">
                  <Link to="/admin/dashboard">Dashboard</Link>
                </Menu.Item>
              )}

              <Menu.Item
                key="logout"
                icon={<LogoutOutlined />}
                onClick={logout}
              >
                Logout
              </Menu.Item>
            </SubMenu>
          )}
          {!user && (
            <SubMenu icon={<UserOutlined />} key="SubMenu">
              <Item icon={<UserOutlined />} key="login">
                <Link to="/login">Login</Link>
              </Item>
              <Item icon={<UserAddOutlined />} key="register">
                <Link to="/register">Register</Link>
              </Item>
            </SubMenu>
          )}
        </Menu>
          </div>
        </div>
        <div class="col-sm-3">
          <div class=" pull-right">
            <Search />
          </div>
        </div>
      </div>
    </div>
  </div>
          
     
    </>
  );
};
export default Header;
