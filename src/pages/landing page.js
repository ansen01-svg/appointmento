import styled from 'styled-components';  
import wallpaper from '../data/wallpaper.svg';
import logo from '../data/logo.png';
import { Link } from 'react-router-dom';

let LandingPage = () => {
    return (
        <Wrapper className='main_wrapper'>
            <div className='holder_div'>
                <img src={logo} alt='logo' id='logo' />
                <div className='details_holder'>
                    <p id='para'>Manage your meetings and <br/> appointments  efficiently.</p>
                    <Link to='/signup' id='button'>Sign up</Link>
                </div>
                <div className='wallpaper_holder'>
                    <img src={wallpaper} id='wallpaper' alt='wallpaper' />
                </div>
            </div>
        </Wrapper>
    )
}


let Wrapper = styled.div`
    .holder_div{
        width: 100vw;
        max-width: 100vw;
        height: 100vh;
        position: relative;
    };
    #logo{
        position: absolute;
        top:30px;
        left:30px;
        width:35px;
        height:35px;
        border-radius: 3px;
        box-shadow: 4px 4px 2px var(--blue_main_shadow);
    }
    .wallpaper_holder{
        display: none;
    }
    .details_holder{
        width: 100%;
        max-width: 100vw;
        height: 100%;
        display:flex;
        flex-direction:column;
        align-items:center;
        justify-content:center;
        gap: 50px;
        padding: 0 45px;
    }
    #para{
        font-size: 38px;
        font-weight: bold;
        text-align:center;
        line-height: 50px;
    }
    #button{
        width:150px;
        height:45px;
        border:0.1px solid black;
        outline:none;
        background:none;
        border-radius: 3px;
        font-style: var(--main_font);
        font-weight: bold;
        display:flex;
        align-items:center;
        justify-content:center;
    }

    @media screen and (min-width:900px) {
    .holder_div{
        width:100vw;
        max-width:100vw;
        height:100vh;
        max-height: 100vh;
        display:flex;
        flex-direction:row;
        align-items:center;
        justify-content:center;
        overflow: hidden;
        position: relative;
    };
    #logo{
        position: absolute;
        top:30px;
        left:150px;
        width:50px;
        height:50px;
        border-radius: 3px;
        box-shadow: 4px 4px 2px var(--blue_main_shadow);
    }
    .details_holder{
        width: 55vw;
        height:100vh;
        display:flex;
        flex-direction:column;
        align-items:center;
        justify-content:center;
        gap:50px;
    }
    .wallpaper_holder{
        width:45vw;
        max-width:45vw;
        height:100vh;
        display:flex;
        flex-direction:row;
        align-items:center;
        justify-content:center;
    };
    #wallpaper{
        width:90%;
        height:100%;
        object-position: center;
    }
    #para{
        font-size:38px;
        font-weight: bold;
    }
    #button{
        width:150px;
        height:45px;
        border:0.1px solid black;
        outline:none;
        background:none;
        border-radius: 3px;
        font-style: var(--main_font);
        font-weight: bold;
        display:flex;
        align-items:center;
        justify-content:center;
    }
    }
`


export default LandingPage