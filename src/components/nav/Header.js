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
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import Search from "../forms/search";
import HeaderTop from "./HeaderTop";
import HeaderBottom from "./HeaderBottom";

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
    <header id="header">
      <HeaderTop />
      <HeaderBottom />
    { /*  <Menu mode="horizontal" defaultSelectedKeys={["home"]}>
        <Item icon={<HomeOutlined />}>
          <Link to="/"> Home</Link>
        </Item>
        <Item style={{ marginRight: "auto" }} icon={<ShoppingOutlined />}>
          <Link to="/shop"> Shop</Link>
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

            <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={logout}>
              Logout
            </Menu.Item>
          </SubMenu>
        )}
        {!user && (
          <Item icon={<UserOutlined />} key="login">
            <Link to="/login">Login</Link>
          </Item>
        )}

        {!user && (
          <Item icon={<UserAddOutlined />} key="register">
            <Link to="/register">Register</Link>
          </Item>
        )}
        <Item>
          <span>
            <Search />
          </span>
        </Item>
      </Menu> */}
      </header>
    </>
  );
};
export default Header;
