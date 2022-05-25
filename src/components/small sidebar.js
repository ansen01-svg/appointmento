import styled from 'styled-components';
import { MdClose } from "react-icons/md";
import { useDispatch } from 'react-redux';
import { toggleSidebar } from '../redux/appointments reducer';
import { NavLink } from 'react-router-dom';
import links from '../utils/links';
import { AiOutlinePoweroff } from "react-icons/ai";
import { logoutUser } from '../redux/user reducers';
import { useNavigate } from 'react-router-dom';


let SmallSidebar = () => {

    let dispatch = useDispatch()
    let navigate = useNavigate()

    let closeSidebar = () => {
        dispatch(toggleSidebar(false))

        document.body.style.height = `initial`
        document.body.style.overflowY = `initial`
    }

    let autoClose = () => {
        dispatch(toggleSidebar(false))

        document.body.style.height = `initial`
        document.body.style.overflowY = `initial`
    }

    let logout = () => {
        dispatch(logoutUser())
        navigate('/welcome')
        autoClose()
    }


    return (
        <Wrapper>
            <div className='container'>
                <div className='small_sidebar'>
                    <MdClose id='close' onClick={ closeSidebar } />
                    { links.map((eachLink, index) => {
                        let { link, linkTo, Icon } = eachLink

                        return (
                            <div className='link_holder' key={index}> 
                                <Icon id='icon' />          
                                <NavLink to={linkTo} id='link'
                                className={({isActive}) => isActive ? 'highlight' : ''}
                                onClick={ autoClose } >
                                    {link}
                                </NavLink>
                            </div>
                        )
                    }) }
                    <div className='logout_holder'>
                        <AiOutlinePoweroff id='icon' />
                        <p id='link' onClick={logout}
                        style={{cursor:'pointer'}}>
                            Logout
                        </p>
                    </div>
                </div>
            </div>
        </Wrapper>
    )
}


let Wrapper = styled.div`
    .container{
        width: 100vw;
        max-width: 100vw;
        height: 100vh;
        background: rgba(0,0,0,0.8);
        position: absolute;
        top:0;
        left: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index:5;
    }
    .small_sidebar{
        width: 70%;
        height: 70%;
        background: white;
        border-radius: 8px;
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 10px;
    }
    #close{
        font-size: 25px;
        position: absolute;
        top: 20px;
        left: 20px;
        cursor: pointer;
    }
    .link_holder{
        width: 70%;
        height: 10%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        gap: 20px;
        padding-left: 15px;
    }
    #icon{
        font-size: 22px;
        color: var(--blue_main);
    }
    #link{
        font-weight: bold;
        font-size: 16px;
    }
    .highlight{
        color: var(--blue_main);
    }
    .logout_holder{
        width: 70%;
        height: 10%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        gap: 20px;
        padding-left: 15px;
    }

    @media screen and (min-width: 900px) {
        .container{
            display: none;
        }
    }
`


export default SmallSidebar