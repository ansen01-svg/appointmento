import styled from 'styled-components';
import { AiOutlineInstagram, AiOutlineTwitter } from "react-icons/ai";


let About = () => {
    return (
        <Wrapper>
            <div className='container'>
                <div className='hldrs'>
                    <p id='big_para'>
                        About the app
                    </p>
                    <p id='small_para'>
                        This app is built for personal use, to manage daily meetings <br/> and appointments efficiently.
                    </p>
                </div>
                <div className='hldrs'>
                    <p id='big_para'>
                        Credentials
                    </p>
                    <p id='small_para'>
                        Development team : Ansen Bey. <br/>
                        Author : Ansen Bey.
                    </p>
                </div>
                <div className='hldrs'>
                    <p id='big_para'>
                        Contact
                    </p>
                    <p id='small_para' className='spread'>
                        <a href='https://www.instagram.com/ansenbey/' id='link'>
                            <AiOutlineInstagram id='icon' />
                        </a>
                        <a href='https://twitter.com/bey_ansen' id='link'>
                            <AiOutlineTwitter id='icon' />
                        </a>
                    </p>
                    <p id='small_para'>
                        email : ansenbey@gmail.com
                    </p>
                </div>
            </div>
        </Wrapper>
    )
}


let Wrapper = styled.div`
    .container{
        width: 100vw;
        max-width: 100vw;
        height:88vh;
        padding-top: 50px;
    }
    .hldrs{
        width: 100%;
        max-width: 100vw;
        height: 20vh;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        gap: 30px;
        padding-left: 40px;
        /* border: 1px solid gray; */
    }
    #big_para{
        font-size: 23px;
        font-weight: bold;
        color:var(--blue_main);    
    }
    #small_para{
        font-size: 16px;
        color: white;
    }
    #icon{
        font-size: 20px;
    }
    #link{
        color: white;
    }
    .spread{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: 10px;
    }

    @media screen and (min-width: 900px) {
        .container{
            width: 81vw;
            max-width: 81vw;
            height: 88vh;
            position: absolute;
            top: 12vh;
            left: 19vw;
            /* padding-top: 50px; */
        }
        .hldrs{
        width: 100%;
        max-width: 100vw;
        height: 20vh;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        gap: 30px;
        padding-left: 80px;
        /* border: 1px solid gray; */
    }
    #big_para{
        font-size: 25px;
        font-weight: bold;
        color:var(--blue_main);    
    }
    #small_para{
        font-size: 16px;
        color: white;
    }
    #icon{
        font-size: 20px;
    }
    #link{
        color: white;
    }
    .spread{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: 10px;
    }
    }
`


export default About;