import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import LabelInput from '../components/label input pair';
import { useSelector, useDispatch } from 'react-redux';
import useGetParams from '../utils/get params';
import { getSingleAppointment, editAppointment, addAppointment } from '../redux/appointments reducer';
import status from '../utils/status';
import { edit } from '../redux/appointments reducer';


let initialState = {
        title : '',
        details : '',
        companyOf : '',
        location : '',
        status : '',
        feedback : ''
    }

let initialTime = {
        hrs : '',
        mns : '',
        date : ''
    }


let AddPage = () => {

    let dispatch = useDispatch()
    let { isEditing, singleAppointment } = useSelector(state => state.aR)
    let params = useGetParams()
    let id = params.get('id')

    let [hours, setHours] = useState([])
    let [mins, setMins] = useState([])
    let [zone, setZone] = useState([])
    let [appointment, setAppointment] = useState(initialState)
    let [timeHandler, setTimeHandler] = useState(initialTime)
    let [disable, setDisable] = useState(true)

    let getTime = useCallback(() => {
        for(let i=1; i < 25; i++) {
            setHours(hours => [...hours,i])
        }

        for(let i=0; i < 60; i++) {
            setMins(mins => [...mins,i])
        }
    },[])

    useEffect(() => {
        getTime()
    }, [getTime])

    useEffect(() => {
        if (id) {
            dispatch(getSingleAppointment(id))
            setDisable(false)
            dispatch(edit(true))
            return;
        }
    }, [id, dispatch, isEditing])

    let handleDate = (e) => {
        setTimeHandler({
            ...timeHandler, [e.target.name] : e.target.value
        })

        if (timeHandler.hrs > 12) {
            setZone('P.M')
        }else{
            setZone('A.M')
        }
    }

    let handleChange = (e) => {
        setAppointment({
            ...appointment, [e.target.name] : e.target.value
        })

        if (appointment.companyOf || appointment.location ) {
            setDisable(false)
            return;
        }
    }

    let handleSubmit = (e) => {
        e.preventDefault()

        if (isEditing) {
            let editedData = {
                id : id,
                title : appointment.title ? appointment.title : singleAppointment.title,
                details : appointment.details ? appointment.details : singleAppointment.details,
                companyOf : appointment.companyOf ? appointment.companyOf : singleAppointment.companyOf,
                location : appointment.location ? appointment.location : singleAppointment.location,
                status : appointment.status,
                feedback : appointment.feedback,
                time : ( (timeHandler.hrs || timeHandler.mns || timeHandler.date) ?
                 `${timeHandler.hrs} : ${timeHandler.mns} ${zone} ${timeHandler.date}`
                 :
                 singleAppointment.time
                )
            }
            dispatch(editAppointment(editedData))
            setAppointment(initialState)
            setTimeHandler(initialTime)
            setDisable(true)
            setTimeout(() => {
                dispatch(getSingleAppointment(id))
            }, 2000)
            return;
        }

        let finalData = {
            id : id,
            title : appointment.title,
            details : appointment.details,
            companyOf : appointment.companyOf,
            location : appointment.location,
            time : `${timeHandler.hrs}:${timeHandler.mns} ${zone} ${timeHandler.date}`
        }  
        dispatch(addAppointment(finalData))
        setAppointment(initialState)
        setTimeHandler(initialTime)
        setDisable(true)
    }


    return (
        <Wrapper>
            <div className='container'>
                <form onSubmit={handleSubmit}>
                <header>
                    <p>{ isEditing ? 'Edit appointment' : 'Add a new appointment' }</p>
                </header>
                <LabelInput div_class={'divs'} label_class={'labels'} input_class={'inputs'}
                labelText={'Title'} type={'text'} name={'title'} value={appointment.title}
                htmlFor={'title'} handleChange={handleChange}
                placeholder={`${singleAppointment ? singleAppointment.title : ''}`} />
                 <div className='text_holder'>
                    <label htmlFor='details' id='extra_label'>Details</label>
                    <textarea name='details' id='details' value={appointment.details}
                    placeholder={`${singleAppointment ? singleAppointment.details : ''}`}
                    onChange={handleChange} />
                 </div>
                <LabelInput div_class={'divs'} label_class={'labels'} input_class={'inputs'}
                labelText={'With'} type={'text'} name={'companyOf'} value={appointment.companyOf}
                htmlFor={'companyOf'} handleChange={handleChange}
                placeholder={`${singleAppointment ? singleAppointment.companyOf : ''}`}
                 />
                 <div className='date_time_holder'>
                     <div className='time_holder'>
                         <div className='time_label_span'>
                            <label htmlFor='hrs' id='extra_label'>Time</label>
                         </div>
                         <div className='time_input_span'>
                            <select typeof='number' name='hrs' id='hrs' className='time_input'
                            value={timeHandler.hrs} onChange={handleDate}>
                                 {
                                     hours.map((hour, index) => {
                                         return (
                                             <option id='options' key={index}>{hour}</option>
                                         )
                                     }).slice(0,24)
                                 }
                            </select>
                            <select typeof='number' className='time_input' name='mns'
                            value={timeHandler.mns} onChange={handleDate} >
                                 {
                                     mins.map((min, index) => {
                                         return (
                                             <option id='options' key={index}>{min}</option>
                                         )
                                     }).slice(0,59)
                                 }
                             </select>
                         </div>
                     </div>
                     <div className='date_holder'>
                        <label htmlFor='date' id='extra_label'>Date</label>
                        <input type='date' className='time_input' name='date' id='date'
                        value={timeHandler.date} onChange={handleDate} />
                     </div>
                 </div>
                <LabelInput div_class={'divs'} label_class={'labels'} input_class={'inputs'}
                labelText={'Place of meeting/appointment'} type={'text'} name={'location'} value={appointment.location}
                htmlFor={'location'} handleChange={handleChange}
                placeholder={`${singleAppointment ? singleAppointment.location : ''}`}
                 /> 
                { isEditing && ( <div className='divs'>
                    <label id='extra_label' htmlFor='status'>Status</label>
                    <select typeof='text' name='status' id='status' className='select'
                    value={appointment.status} onChange={handleChange}>
                        {
                            status.map((status, index) => {
                                return (
                                    <option id='options' key={index}>{status}</option>
                                )
                            })
                        }
                    </select>
                </div> ) }
                { appointment.status === 'Completed' && <LabelInput div_class={'divs'} label_class={'labels'} input_class={'inputs'}
                labelText={'Feedback'} type={'text'} name={'feedback'} value={appointment.feedback}
                htmlFor={'feedback'} handleChange={handleChange}
                /> }
                <div className='button_holder'>
                    <button className='add' disabled={disable}>
                        { isEditing ? 'Edit appointment' : 'Add appointment' }
                    </button>
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
        height: 100vh;
        overflow-y: scroll;
    }
    .container::-webkit-scrollbar{
        display: none;
    }
    form{
        width: 100vw;
        max-width: 100vw;
        padding: 20px 0; 
    }
    header{
        width: 100vw;
        max-width: 100vw;
        height: 10vh;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        padding-left: 100px;
    }
    p{
        font-size: 18px;
        font-weight: bold;
        color: white;
    }
    .divs{
        width: 100vw;
        max-width: 100vw;
        height: 13vh;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        padding-left: 100px;
        gap: 15px;
    }
    .labels{
        color: white;
        font-family: var(--main_font);
        font-size: 16px;
    }
    .inputs{
        width: 70%;
        height: 35px;
        border-radius: 3px;
        border: 0.1px solid var(--border_color);
        outline: none;
        background: none;
        padding-left: 10px;
        color: white;
        font-size: 14px;
        font-family: var(--main_font);
    }
    .text_holder{
        width: 100vw;
        max-width: 100vw;
        height: 20vh;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        padding-left: 100px;
        gap: 15px;
    }
    #extra_label{
        color: white;
        font-family: var(--main_font);
        font-size: 16px;
    }
    textarea{
        width: 70%;
        height: 50%;
        border-radius: 3px;
        border: 0.1px solid var(--border_color);
        outline: none;
        background: none;
        padding: 10px 0 10px 10px;
        color: white;
        font-size: 14px;
        font-family: var(--main_font); 
    }
    .date_time_holder{
         width: 100vw;
        max-width: 100vw;
        height: 13vh;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }
    .time_holder{
        width: 50vw;
        height: 13vh;
    }
    .time_label_span{
        width: 100%;
        height: 6.5vh;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        padding-left: 100px;
    }
    .time_input_span{
        width: 100%;
        height: 6.5vh;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        padding-left: 100px;
        gap: 10px;
    }
    .time_input{
        width: 40%;
        height: 35px;
        border-radius: 3px;
        border: 0.1px solid var(--border_color);
        outline: none;
        background: none;
        padding-left: 10px;
        color: white;
        font-size: 14px;
        font-family: var(--main_font);
    }
    .date_holder{
        width: 50vw;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        gap: 24px;
        padding-top: 7px;
    }
    #date{
        width: 52%;
        height: 35px;
        border-radius: 3px;
        border: 0.1px solid var(--border_color);
        outline: none;
        padding-left: 10px;
        color: white;
        font-size: 14px;
        background-color: var(--blue_main);
        font-family: var(--main_font);
    }
    #options{
        border: 0.1px solid var(--border_color);
        outline: none;
        background-color: black;
        color: white;
        height: 20px;
        font-size: 16px;
        font-family: var(--main_font);
    }
    .select{
        width: 40%;
        height: 35px;
        border-radius: 3px;
        border: 0.1px solid var(--border_color);
        outline: none;
        background: none;
        padding-left: 10px;
        color: white;
        font-size: 14px;
        font-family: var(--main_font);
    }
    .button_holder{
        width: 100vw;
        max-width: 100vw;
        height: 13vh;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        padding-left: 160px;
    }
    .add{
        width: 50%;
        height: 35px;
        border-radius: 3px;
        border: 0.1px solid var(--border_color);
        outline: none;
        background: var(--blue_main);
        color: white;
        font-size: 16px;
        font-weight: bold;
        font-family: var(--main_font);
        cursor: pointer;
    }


    @media screen and (min-width: 900px) {
    .container{
        width: 81vw;
        max-width: 81vw;
        height: 88vh;
        position: absolute;
        top: 12vh;
        left: 19vw;
        overflow-y: scroll;
    }
    .container::-webkit-scrollbar{
        display: none;
    }
    form{
        padding: 20px 0;
    }
    p{
        font-size: 25px;
        font-weight: bold;
        color: white;
    }
    .divs{
        width: 81vw;
        max-width: 81vw;
        height: 15vh;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        padding-left: 100px;
        gap: 15px;
    }
    .labels{
        color: white;
        font-family: var(--main_font);
        font-size: 16px;
    }
    .inputs{
        width: 40%;
        height: 40px;
        border-radius: 3px;
        border: 0.1px solid var(--border_color);
        outline: none;
        background: none;
        padding-left: 10px;
        color: white;
        font-size: 14px;
        font-family: var(--main_font);
    }
    .text_holder{
        width: 81vw;
        max-width: 81vw;
        height: 20vh;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        padding-left: 100px;
        gap: 15px;
    }
    #extra_label{
        color: white;
        font-family: var(--main_font);
        font-size: 16px;
    }
    textarea{
        width: 40%;
        height: 50%;
        border-radius: 3px;
        border: 0.1px solid var(--border_color);
        outline: none;
        background: none;
        padding: 10px 0 10px 10px;
        color: white;
        font-size: 14px;
        font-family: var(--main_font); 
    }
    .date_time_holder{
         width: 81vw;
        max-width: 81vw;
        height: 13vh;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }
    .time_holder{
        width: 45%;
        height: 13vh;
    }
    .time_label_span{
        width: 100%;
        height: 6.5vh;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        padding-left: 100px;
    }
    .time_input_span{
        width: 100%;
        height: 6.5vh;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        padding-left: 100px;
        gap: 50px;
    }
    .time_input{
        width: 25%;
        height: 35px;
        border-radius: 3px;
        border: 0.1px solid var(--border_color);
        outline: none;
        background: none;
        padding-left: 10px;
        color: white;
        font-size: 14px;
        font-family: var(--main_font);
    }
    .date_holder{
        width: 55%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        gap: 24px;
        padding-left: 20px;
    }
    #date{
        width: 25%;
        height: 35px;
        border-radius: 3px;
        border: 0.1px solid var(--border_color);
        outline: none;
        background-color: var(--blue_main);
        padding-left: 10px;
        color: white;
        font-size: 14px;
        font-family: var(--main_font);
    }
    #options{
        border: 0.1px solid var(--border_color);
        outline: none;
        background-color: black;
        color: white;
        height: 20px;
        font-size: 16px;
        font-family: var(--main_font);
    }
    .select{
        width: 15%;
        height: 40px;
        border-radius: 3px;
        border: 0.1px solid var(--border_color);
        outline: none;
        background: none;
        padding-left: 10px;
        color: white;
        font-size: 14px;
        font-family: var(--main_font);
    }
    .button_holder{
        width: 81vw;
        max-width: 81vw;
        height: 15vh;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        padding-left: 225px;
        gap: 15px;
    }
    .add{
        width: 20%;
        height: 40px;
        border-radius: 3px;
        border: 0.1px solid var(--border_color);
        outline: none;
        background:var(--blue_main);
        color: white;
        font-size: 16px;
        font-weight: bold;
        font-family: var(--main_font);
        cursor: pointer;
    }
    }

`


export default AddPage;