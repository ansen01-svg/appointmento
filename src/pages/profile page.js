import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import LabelInput from '../components/label input pair';
import { updateUser, getUser } from '../redux/user reducers';


let ProfilePage = () => {

    let dispatch = useDispatch()
    let user = useSelector(state => state.uR.user)

    let [edit, setEdit] = useState(false)
    let [disable, setDisable] = useState(true)
    let [isEditing, setIsEditing] = useState(false)
    let [profile, setProfile] = useState({
        age: '',
        occupation: '',
        city: ''
    })

    useEffect(() => {
        if (user.age || user.occupation || user.city) {
            setDisable(false)
            setIsEditing(true)
            return;
        }
        setDisable(true)
    }, [user.age, user.occupation, user.city])

    let handleChange = (e) => {
        if (profile.age || profile.city || profile.occupation) {
            setDisable(false)
        }

        setProfile({
            ...profile, [e.target.name]: e.target.value
        })
    }

    let handleSubmit = (e) => {
        e.preventDefault()

        if (isEditing) {
            let editedValues = {
                age: profile.age ? profile.age : user.age,
                occupation: profile.occupation ? profile.occupation : user.occupation,
                city: profile.city ? profile.city : user.city
            }
            dispatch(updateUser(editedValues))
            setProfile({
                age: '',
                occupation: '',
                city: ''
            })
            setEdit(false)
            setIsEditing(false)
            setTimeout(() => {
                dispatch(getUser())
            }, 2000)
            return;
        }

        let final = {
            age: Number(profile.age),
            occupation: profile.occupation,
            city: profile.city
        }
        dispatch(updateUser(final))
        setProfile({
            age: '',
            occupation: '',
            city: ''
        })
        setEdit(false)
        setTimeout(() => {
            dispatch(getUser())
        }, 2000)
    }

    return (
        <Wrapper>
            <div className='container'>
                <form onSubmit={handleSubmit}>
                    <p id='name_para'>Hello {user.username}</p>
                    <div className='sub_contain'>
                        <LabelInput div_class={'divs'} input_class={'inputs age'}
                            type={'text'} name={'age'} value={profile.age}
                            placeholder={`${user.age ? `${user.age} years` : 'Age'}`}
                            handleChange={handleChange} labelFor={'age'} labelText={'Age'}
                            label_class={'labels'} />
                        <LabelInput div_class={'divs'} input_class={'inputs'}
                            type={'text'} name={'occupation'} value={profile.occupation}
                            placeholder={`${user.occupation ? user.occupation : 'Occupation'}`}
                            handleChange={handleChange} labelFor={'occupation'} labelText={'Occupation'}
                            label_class={'labels'} />
                        <LabelInput div_class={'divs'} input_class={'inputs'}
                            type={'text'} name={'city'} value={profile.city}
                            placeholder={`${user.city ? user.city : 'City'}`}
                            handleChange={handleChange} labelFor={'city'} labelText={'City'}
                            label_class={'labels'} />
                    </div>
                    <div className='edit_div'>
                        <p id='edit_para' onClick={() => setEdit(!edit)}>
                            Edit profile ?
                        </p>
                        {edit && (<button disabled={disable}>Save</button>)}
                    </div>
                </form>
            </div>
        </Wrapper>
    )
}


let Wrapper = styled.div` 
    .container{
        width: 100vw;
        max-width: 100vw;
        height:88vh;
    }
    form{
        width: 100vw;
        max-width: 100vw;
        height: 88vh;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        gap: 10px; 
        padding-top: 50px;
    }
    #name_para{
        color: white;
        padding-left:80px; 
        font-weight: bold;
        font-size: 20px;
        margin-bottom: 30px;
    }
    .sub_contain{
        width: 100vw;
        max-width: 100vw;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        gap: 30px;
    }
    .divs{
        width: 100%;
        max-width: 100vw;
        height: 10vh;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        gap: 10px;
        padding-left: 80px;
    }
    .labels{
        color: white;
        font-size: 16px;
        font-family: var(--main_font);
    }
    .inputs{
        width: 60%;
        height: 45px;
        border: 0.1px solid var(--border_color);
        outline: none;
        background: none;
        border-radius: 3px;
        padding-left: 10px;
        color: white;
        font-size: 16px;
        font-family: var(--main_font);
    }
    .age{
        width: 40%;
    }
    .edit_div{
        width: 100%;
        max-width: 100vw;
        height: 10vh;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        gap: 50px;
        padding-left: 80px;
    }
    #edit_para{
        font-size: 16px;
        color: white;
        cursor: pointer;
    }
    button{
        padding: 6px 20px;
        border: none;
        outline: none;
        background: var(--blue_main);
        font-size: 16px;
        font-family: var(--main_font);
        font-weight: bold;
        border-radius: 3px;
        color:white;
        cursor: pointer;
    }

    @media screen and (min-width: 900px) {
    .container{
        width: 81vw;
        max-width: 81vw;
        height:88vh;
        position: absolute;
        top: 12vh;
        left: 19vw;
        overflow-y: scroll;
    }     
    .container::-webkit-scrollbar{
        display: none;
    }  
    form{
        width: 81vw;
        max-width: 81vw;
        padding-top: 50px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        gap: 10px; 
    }
    #name_para{
        color: white;
        padding-left:120px;
        font-weight: bold;
        font-size: 25px;
        margin-bottom: 30px;
    }
    .sub_contain{
        width: 81vw;
        max-width: 81vw;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        gap: 30px;
    }
    .divs{
        width: 81vw;
        max-width: 81vw;
        height: 12vh;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        gap: 10px;
        padding-left: 120px;
    }
    .labels{
        color: white;
        font-size: 16px;
        font-family: var(--main_font);
    }
    .inputs{
        width: 30%;
        height: 45px;
        border: 0.1px solid var(--border_color);
        outline: none;
        background: none;
        border-radius: 3px;
        padding-left: 10px;
        color: white;
        font-size: 16px;
        font-family: var(--main_font);
    }
    .age{
        width: 15%;
    }
    .edit_div{
        width: 100%;
        max-width: 100vw;
        height: 10vh;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        gap: 50px;
        padding-left: 120px;
    }
    #edit_para{
        font-size: 16px;
        color: white;
        cursor: pointer;
    }
    button{
        padding: 6px 30px;
        border: none;
        outline: none;
        background: var(--blue_main);
        font-size: 16px;
        font-family: var(--main_font);
        font-weight: bold;
        border-radius: 3px;
        color:white;
        cursor: pointer;
    }
    }
`


export default ProfilePage;