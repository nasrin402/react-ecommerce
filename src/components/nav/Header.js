import React from "react";
import { Menu } from 'antd';
import {  signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { HomeOutlined,UserAddOutlined, MailOutlined, AppstoreOutlined, SettingOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';
import {Link} from "react-router-dom"



const Header = () => { 
  const {Item, SubMenu} = Menu;
  let history = useHistory();
  let dispatch = useDispatch();
  let {user} = useSelector((state) => ({...state}))
  const logout = () =>{
    signOut(auth).then(() => {
      console.log('Sign-out successful.')
    }).catch((error) => {
      console.log(error.message) 
    });
    dispatch({
      type:"LOGOUT",
      payload:null
    });
    history.push("/login");

  }
  const items = [
    { label: 'Home', key: 'home' }, // remember to pass the key prop
     // which is required
    {
      
      key: 'SubMenu',
      children: [{ label: 'Item-1', key: 'two' },
      { label: 'Item-2', key: 'three' },
      { label: 'Logout', key: 'logout' }],
    },
    { label: 'Login', key:"login" },
    { label: 'Register', key:"register" },
  ];
  return( 
  <Menu  mode="horizontal" defaultSelectedKeys={["home"]} >
    <Item  icon={<HomeOutlined/> }>
     <Link to="/"> Home</Link>
    </Item>
    {user && <SubMenu
      title = {user.email.split('@')[0]}
      icon={<AppstoreOutlined />}
      style={{marginLeft:"auto"}}
      
    >
      <Menu.Item  icon={<AppstoreOutlined />}>
        Item-1
      </Menu.Item>
      <Menu.Item  icon={<AppstoreOutlined />}>
        Item-2
      </Menu.Item>
      <Menu.Item  icon={<LogoutOutlined/>} onClick={logout}>
        Logout
      </Menu.Item>
      </SubMenu>}
    
      {!user && <Item  icon={<UserOutlined/> }  style={{marginLeft:"auto"}}>
        <Link to="/login">Login</Link>
      </Item>}
      
    {!user && <Item  icon={<UserAddOutlined/> }  >
      <Link to="/register">Register</Link>
    </Item>}
      
  </Menu>
  )};
export default Header;