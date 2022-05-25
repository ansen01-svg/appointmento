import styled from 'styled-components';
import links from '../utils/links';
import { NavLink } from 'react-router-dom';


let BigSidebar = () => {
    return (
        <Wrapper>
            <div className='container'>
                { links.map((eachLink, index) => {
                    let { link, linkTo, Icon } = eachLink

                    return (
                        <div className='link_holder' key={index}> 
                            <Icon id='icon' />          
                            <NavLink to={linkTo} id='link'
                            className={({isActive}) => isActive ? 'link highlight' : 'link'}>
                                {link}
                            </NavLink>
                        </div>
                    )
                }) }
            </div>
        </Wrapper>
    )
}


let Wrapper = styled.div`
    .container{
        width: 19vw;
        max-width: 19vw;
        height: 88vh;
        background: black;
        border-right: 0.1px solid var(--border_color);
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        justify-content: flex-start;
        padding-top: 30px;
        gap: 10px;
        position: fixed;
        top: 12vh;
        left: 0;
    }
    .link_holder{
        width: 75%;
        height: 10%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        gap: 20px;
        padding-left: 24px;
    }
    #icon{
        font-size: 28px;
        color: var(--blue_main);
    }
    .link{
        font-size: 17px;
        color: white;
    }
    .highlight{
        color: var(--blue_main);
        font-weight: bold;
        font-size: 19px;

    }

    @media screen and (max-width:900px) {
        .container{
            display: none;
        }
    }
`


export default BigSidebar