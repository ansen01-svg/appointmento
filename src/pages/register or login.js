import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import FormRow from '../components/form row';
import logo from '../data/logo.png';
import { register, login } from '../redux/user reducers';
import { useNavigate } from 'react-router-dom';


let RegisterAndLoginPage = () => {

    let cookie = document.cookie
    let dispatch = useDispatch()
    let navigate = useNavigate()
    let isLoading = useSelector(state => state.uR.isLoading)

    let [values, setValues] = useState({
        username : '',
        email : '',
        password : '',
        isUser : false
    })

    let handleSubmit = (e) => {
        e.preventDefault()

        if (!values.isUser) {
            let user = { username : values.username, email : values.email, password : values.password }
            dispatch(register(user))
            setValues({
                username : '',
                email : '',
                password : ''
            })
            return;
        }

        let user = { email : values.email, password : values.password }
        dispatch(login(user))
        setValues({
            username : '',
            email : '',
            password : ''
        })        
    }

    let handleChange = (e) => {
        let value = e.target.value
        let name = e.target.name

        setValues({...values, [name] : value})
    }

    useEffect(() => {
        if (!cookie) return;
        navigate('/')
    }, [cookie, navigate])


    return (
        <Wrapper className='main_div'>
            <div className='form_holder'>
                <form onSubmit={handleSubmit}>
                    <nav>
                        <img src={logo} id='logo' alt='logo' />
                        <p id='reg'>Get started</p>
                    </nav>
                    { !values.isUser && <FormRow input_class={'inputs'} div_class={'input_holder'}
                    placeholder={'Username'} type={'text'} name={'username'} value={values.username}
                    handleChange={handleChange} />}
                    <FormRow input_class={'inputs'} div_class={'input_holder'}
                    placeholder={'Email'} type={'email'} name={'email'} value={values.email}
                    handleChange={handleChange} />
                    <FormRow input_class={'inputs'} div_class={'input_holder'}
                    placeholder={'Password'} type={'password'} name={'password'} value={values.password}
                    handleChange={handleChange} />
                    <div className='button_holder'>
                        <button disabled={isLoading}>
                            { values.isUser ? 'Sign in' : 'Sign up' }
                        </button>
                        <p id='question'>{ values.isUser ? 'Not' : 'Already' } a user? <span onClick={() => setValues(
                            {...values, isUser : !values.isUser}
                        )}>
                            { values.isUser ? 'Sign up' : 'Sign in' }
                            </span>
                        </p>
                    </div>
                </form>
            </div>
            { isLoading && (
                <div className='loading_div'>
                    <p id='loading_para'>loading . . .</p>
                </div>
            ) }
        </Wrapper>
    )
}


let Wrapper = styled.div`
    .form_holder{
        width: 75vw;
        height: 70vh;
    }
    form{
        width: 75vw;
        height: 70vh;
        border: 0.1px solid gray;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        border-radius: 8px;
    }
    nav{
        width: 100%;
        height: 20%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        padding-left: 40px;
        gap: 50px;
    }
    #logo{
        width: 40px;
        height: 40px;
        border-radius: 3px;
    }
    #reg{
        font-size: 28px;
        font-weight: bold;
    }
    .input_holder{
        width: 100%;
        height: 18%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .inputs{
        width: 80%;
        height: 50%;
        border:0.1px solid gray;
        outline:none;
        border-radius: 3px;
        font-size: 16px;
        font-family: var(--main_font);
        color: black;
        padding-left: 10px;
    }
    .button_holder{
        width: 100%;
        height: 26%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start; 
        gap: 10px;
        padding-top: 20px;
    }
    button{
        width: 80%;
        height: 40px;
        border:none;
        outline:none;
        background:var(--blue_main);
        color: white;
        border-radius: 3px;
        font-size: 16px;
        font-family: var(--main_font);
        font-weight: bold;
        cursor: pointer;
    }
    #question{
        font-size: 13px;
    }
    span{
        cursor: pointer;
        color: var(--blue_main_dark);
    }
    .loading_div{
        width: 100vw;
        max-width: 100vw;
        height: 100vh;
        position: absolute;
        top: 0;
        left: 0;
        background: rgba(0,0,0,0.5);
        display: flex;
        align-items: center;
        justify-content: center;
    }
    #loading_para{
        color: white;
        font-size: 20px;
    }

    @media screen and (min-width: 900px) {
        .form_holder{
        width: 28vw;
        height: 70vh;
    }
    form{
        width: 28vw;
        height: 70vh;
        border: 0.1px solid gray;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        border-radius: 8px;
    }
    button{
        width: 80%;
        height: 40px;
        border:none;
        outline:none;
        background:var(--blue_main);
        color: white;
        border-radius: 3px;
        font-size: 16px;
        font-family: var(--main_font);
        font-weight: bold;
    }
    #question{
        font-size: 13px;
    }
    #loading_para{
        font-size: 25px;
    }
    }
`


export default RegisterAndLoginPage