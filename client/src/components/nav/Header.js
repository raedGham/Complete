import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import { Menu , Badge} from 'antd';
import { UserOutlined, SettingOutlined, WindowsOutlined, LogoutOutlined , ShoppingOutlined, ShoppingCartOutlined} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import Search from '../forms/Search';




const { SubMenu, Item } = Menu

const Header = () => {

    let navigate = useNavigate();

    const dispatch = useDispatch();

    const { user, cart } = useSelector((state) => ({...state}));


    const [current, setCurrent] = useState("home");

    const handleClick = (e) => {
        setCurrent(e.key);
    }

    const logout = () => {
        auth.signOut();
        dispatch({ type: "LOGOUT", payload: null });
        // redirect
        navigate("/login");
    }

    return (
        <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal" >
            <Item key="home" icon={<WindowsOutlined />} >
                <Link to="/"> Home </Link>
            </Item>

            <Item key="shop" icon={<ShoppingOutlined />} >
                <Link to="/shop"> Shop </Link>
            </Item>

            <Item key="cart" icon={<ShoppingCartOutlined />} >
                <Link to="/cart"> 
                   <Badge count={cart.length} offset={[9,0]}>Cart</Badge>
                </Link>
            </Item>

            {user && (
                <SubMenu key="SubMenu" icon={<SettingOutlined />} title={user.email && user.email.split('@')[0]} >
                    {user && user.role === "subscriber" && <Item><Link to="/user/history">Dashboard </Link></Item>}
                    {user && user.role === "admin" && <Item><Link to="/admin/dashboard">Dashboard </Link></Item>}

                    <Item icon={<LogoutOutlined />} onClick={logout}>Logout</Item>

                </SubMenu>

            )}

            {!user && (<Item key="register" icon={<UserOutlined />} >
                <Link to="/register"> Register </Link>
            </Item>

            )}

           

            {!user && (
                <Item key="login" icon={<UserOutlined />}>
                    <Link to="/login"> Login </Link>
                </Item>
            )}
        
           <Item key="search" className='p-1'>
           
               <Search  /> 
           </Item>

       
        </Menu >
        
    );
}



export default Header;