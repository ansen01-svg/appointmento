import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import logo from '../data/logo.png';
import { HiMenu } from "react-icons/hi";
import { toggleSidebar } from '../redux/appointments reducer';
import { HiOutlineChevronDown } from "react-icons/hi";
import { getUser, logoutUser } from '../redux/user reducers';


let Nav = () => {

    let dispatch = useDispatch()
    let navigate = useNavigate()
    let user = useSelector(state => state.uR.user)
    let [toggleDropdown, setToggle] = useState(false)

    useEffect(() => {
        dispatch(getUser())
    }, [dispatch])

    let openSidebar = () => {
        dispatch(toggleSidebar(true))

        document.body.style.height = `100vh`
        document.body.style.overflowY = `hidden`
    }

    let logout = () => {
        dispatch(logoutUser())
        setToggle(false)
        navigate('/welcome')
    }

    return (
        <Wrapper>
            <div className='container'>
                <div className='logo_holder'>
                    <img src={logo} id='logo' alt='logo' />
                    <p id='brand_para'>Appointmento</p>
                </div>
                <div className='menu_holder'>
                    <div className='welcome_div'>
                        <p id='welcome_para'>
                            welcome { user.username }
                        </p>
                        <HiOutlineChevronDown id='down' 
                        onClick={() => setToggle(!toggleDropdown)} />
                    </div>
                    <div className={`${toggleDropdown ? 'dropdown_div show' : 'dropdown_div'}`}>
                        <p id='logout_para' onClick={logout}>
                            Logout
                        </p>
                    </div>
                    <HiMenu id='menu' onClick={ openSidebar } />
                </div>
            </div>
        </Wrapper>
    )
}


let Wrapper = styled.nav`
    .container{
        width: 100vw;
        max-width: 100vw;
        height: 12vh;
        border-bottom: 0.1px solid var(--border_color);
        background: black;
        display: flex;
        flex-direction:row;
        align-items: center;
        justify-content: center; 
    }
    .logo_holder{
        width: 50%;
        max-width: 50vw;
        height: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        padding-left: 40px;
        gap: 20px;
    }
    #logo{
        width: 35px;
        height: 35px;
        border-radius: 3px;
    }
    .brand_para{
        font-size: 22px;
        font-weight: bold;
        color: white;
    }
    .menu_holder{
        width: 50%;
        max-width: 50vw;
        height: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-end;
        padding-right: 40px;
    }
    #menu{
        width: 25px;
        height: 25px;
        color: white;
        cursor: pointer;
    }
    .welcome_div{
        display: none;
    }

    @media screen and (min-width: 900px) {
    .container{
        position: fixed;
        top: 0;
        left: 0;
    }
    .logo_holder{
        width: 50%;
        max-width: 50vw;
        height: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        padding-left: 80px;
        gap: 20px;
    }
    #logo{
        width: 35px;
        height: 35px;
        border-radius: 3px;
    }
    #brand_para{
        font-size: 22px;
        font-weight: bold;
        color: white;
    }
    .menu_holder{
        width: 50%;
        max-width: 50vw;
        height: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-end;
        padding-right: 80px;
        position: relative;
    }
    #menu{
        display: none;
    }
    .welcome_div{
        padding: 10px;
        border: 0.1px solid var(--border_color);
        border-radius: 3px;
        display: block;
        display:flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: 20px;
    }
    #welcome_para{
        color: white;
    }
    #down{
        color: white;
        font-size: 16px;
        display: block;
        cursor: pointer;
    }
    .dropdown_div{
        padding: 10px 89px;
        position: absolute;
        right: 80px;
        top: 10vh;
        background: white;
        border-radius: 3px;
        padding-left: 10px;
        display: none;
        z-index: 5;
    }
    #logout_para{
        font-weight: bold;
        cursor: pointer;
    }
    .show{
        display: block;
        display:flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        gap: 10px;
    }
    }
`


export default Nav