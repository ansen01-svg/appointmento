import { Outlet } from 'react-router-dom';
import styled from 'styled-components'; 
import Nav from '../components/navbar';
import BigSidebar from '../components/big sidebar';
import SmallSidebar from '../components/small sidebar';
import { useSelector } from 'react-redux';


let SharedLayout = () => {

    let showSmallSidebar = useSelector(state => state.aR.showSmallSidebar)

    return (
        <Wrapper className='main_wrapper'>
            <Nav/>
            <div className='sub_container'>
                <BigSidebar />
                { showSmallSidebar && <SmallSidebar /> }
                <Outlet />
            </div>
        </Wrapper>
    )
}


let Wrapper = styled.main`
    .sub_container{
        width: 100vw;
        max-width: 100vw;
        height: 100vh;
        background-color: black;
    }

    @media screen and (min-width: 900px) {
    .sub_container{
        width: 100vw;
        max-width: 100vw;
        background-color: black;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }
    }
`


export default SharedLayout;