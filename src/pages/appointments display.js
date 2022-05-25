import { useState, useEffect }  from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { getAllAppointments, deleteAppointment } from '../redux/appointments reducer';
import { VscTrash } from "react-icons/vsc";
import { useNavigate, Link } from 'react-router-dom';
import { edit } from '../redux/appointments reducer';


let viewType = ['Grid', 'List'];
let stat = ['All', 'Pending', 'Completed', 'Cancelled'];


let HomePage = () => {

    let navigate = useNavigate()
    let dispatch = useDispatch()
    let { appointments, isLoading } = useSelector(state => state.aR)

    let [status, setStatus] = useState('')
    let [view, setView] = useState('')

    useEffect(() => {
        dispatch(getAllAppointments())
    }, [dispatch])

    let handleStatus = (e) => {
        setStatus(e.target.value)
        dispatch(getAllAppointments(e.target.value))
    }

    let handleView = (e) => {
        setView(e.target.value)
    }

    let deleteApp = (id) => {
        dispatch(deleteAppointment(id))
        setTimeout(() => {
            dispatch(getAllAppointments())
        }, 2000)
    }

    let editApp = (id) => {
        dispatch(edit(true))
        navigate(`/addAppointments/?id=${id}`)
    }


    return (
        <Wrapper>
            <div className='container'>
                <div className='sub_wrapper'>
                <div className='filters_holder'>
                    <select typeof='text' className='select' value={status} 
                    name='filter' onChange={handleStatus}>
                        {
                            stat.map((stat, index) => {
                                return (
                                    <option className='options' key={index}>
                                        {stat}
                                    </option>
                                )
                            })
                        }
                    </select>
                    <select typeof='text' className='select extra' value={view}
                    name='view' onChange={handleView}>
                        {
                            viewType.map((view, index) => {
                                return (
                                    <option className='options' key={index}>
                                        {view}
                                    </option>
                                )
                            })
                        }
                    </select>
                </div>
                <div className='graph_holder'>
                </div>
                </div>
                <div className='apps_holder'>
                    <div className='head_holder'>
                        <p className='header'>Your appointments</p>
                    </div>
                    { isLoading ? 
                    ( <div className='apps_subholder centered'>
                        <p id='loading_para'>loading . . .</p>
                    </div> ) 
                    :
                    ((appointments.length < 1) ? 
                    (<div className='apps_subholder'>
                        <p className='not_found'>
                            No appointments found. 
                            <Link to='/addAppointments' id='link'> Make a new one</Link>
                        </p>
                    </div>) 
                    :
                     (<div className={`${view === 'List' ? 'apps_subholder flex' : 'apps_subholder'}`}>
                        { 
                            appointments.map((app, index) => {
                                let { title, details, companyOf, time, location, status, _id } = app

                                return (
                                    <div className={`${view === 'List' ? 'each_app modified_each' : 'each_app'}`}
                                     key={index}>
                                        <div className={`${view === 'List' ? 'title_holder time_holder holders increase_height' : 'title_holder time_holder holders'}`}>
                                            <p id='title_para'>{title}</p>
                                            <span className='edit_span'>
                                            <p id='edit_para' onClick={() => editApp(_id)}>
                                                Edit
                                            </p>   
                                            <VscTrash className='delete' onClick={() => deleteApp(_id)} />
                                            </span>                             
                                        </div>
                                        <div className={`${view === 'List' ? 'time_holder holders closer add_height' : 'time_holder holders'}`}>
                                            <p>Time : {time} <br/>
                                                Location : {location}
                                            </p>
                                            <p>With : {companyOf}</p>
                                        </div>
                                        <div className={`${view === 'List' ? 'details_holder holders hide_holder' : 'details_holder holders'}`}>
                                            <p>{details}</p>
                                        </div>
                                        <div className={`${view === 'List' ? 'time_holder holders add_height' : 'time_holder holders'}`}>
                                            <p>Status : {status}</p>
                                            <p onClick={() => navigate(`/appointment/${_id}`)}
                                            style={{cursor:'pointer'}}>
                                                View card
                                            </p>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>) )
                    }
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
        overflow-y: scroll;
    }
    .container::-webkit-scrollbar{
        display: none;
    }
    .sub_wrapper{
        width: 100%;
        max-width: 100%;
        height: 20vh;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }
    .filters_holder{
        width: 100%;
        max-width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        padding-left: 80px;
        gap: 20px;
    }
    .graph_holder{
        display: none;
    }
    .select{
        width: 130px;
        height: 35px;
        border: 0.1px solid var(--border_color);
        outline: none;
        background: none;
        border-radius: 3px;
        font-size: 14px;
        font-family: var(--main_font);
        color: white;
        padding: 0 10px;
        cursor: pointer;
    }
    .options{
        border: 0.1px solid var(--border_color);
        outline: none;
        background: black;
        border-radius: 3px;
        font-size: 14px;
        font-family: var(--main_font);
        color: white;
        padding:10px 0;
    }
    .extra{
        display: none;
    } 
    .apps_holder{
        width: 100%;
        max-width: 100%;
    }
    .head_holder{
        width: 100vw;
        max-width: 100vw;
        height: 6vh;
    }
    .header{
        color: white;
        padding-left: 80px;
        font-size: 20px;
        font-weight: bold;
    }
    .apps_subholder{
        width: 100vw;
        max-width: 100vw;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        gap: 20px;
        position: relative;
        padding: 40px 0;
        padding-left: 80px;
    }
    .centered{
        align-items: center;
        padding: 0;
    }
    #loading_para{
        font-size: 20px;
        color: white;
        padding-top: 130px;
    }
    .not_found{
        font-size: 20px;
        color: white;
        padding-top: 130px;
    }
    #link{
        color: var(--blue_main);
        cursor: pointer;
    }
    .each_app{
        width: calc(100vw - 160px);
        max-width: calc(100vw - 160px);
        height: 25vh;
        border: 0.1px solid var(--border_color);
        border-radius: 5px;
        cursor: pointer;
    }
    .holders{
        width: 100%;
        height: 25%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        padding:0 20px;
        border-top-right-radius: 5px;
        border-top-left-radius: 5px;
    }
    .title_holder{
        background: var(--blue_main);
    }
    .time_holder{
        justify-content: space-between;
        align-items: flex-start;
        padding: 10px 20px;
        padding-bottom:10px;
    }
    .details_holder{
        border-bottom: 0.1px solid var(--border_color);
    }
    p{
        font-size: 14px;
        color:white;
    }
    #title_para{
        font-size: 18px;
        color:white;
        font-weight: bold;
    }
    .edit_span{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: 10px;
    }
    #edit_para{
        font-weight: bold;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: 10px;
    }
    .delete{
        color: rgb(157, 11, 11);
        font-size: 17px;
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
    .sub_wrapper{
        width: 100%;
        max-width: 100%;
        height: 30vh;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }
    .filters_holder{
        width: 50%;
        max-width: 50%;
        height: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        padding-left: 80px;
        gap: 20px;
    }
    .graph_holder{
        display: block;
        width: 50%;
        max-width: 50%;
        height: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-end;
        padding-right: 80px;
    }
    .select{
        width: 150px;
        height: 35px;
        border: 0.1px solid var(--border_color);
        outline: none;
        background: none;
        border-radius: 3px;
        font-size: 14px;
        font-family: var(--main_font);
        color: white;
        padding: 0 10px;
    }
    .options{
        border: 0.1px solid var(--border_color);
        outline: none;
        background: black;
        border-radius: 3px;
        font-size: 14px;
        font-family: var(--main_font);
        color: white;
        padding:10px 0;
    }
    .extra{
        display: block;
    } 
    .apps_holder{
        width: 100%;
        max-width: 100%;
        // height: 68vh; 
    }
    .head_holder{
        width: 100vw;
        max-width: 100vw;
        height: 6vh;
    }
    .header{
        color: white;
        padding-left: 80px;
        font-size: 22px;
        font-weight: bold;
    }
    .apps_subholder{
        width: 81vw;
        max-width: 81vw;
        padding: 40px 80px;
        display: grid;
        grid-template-columns: repeat(2, auto);
        grid-gap: 60px;
    }
    .centered{
        align-items: center;
        padding: 0;
    }
    #loading_para{
        font-size: 24px;
        color: white;
        padding-top: 130px;
    }
    .not_found{
        font-size: 24px;
        color: white;
        padding-top: 130px;
    }
    #link{
        color: var(--blue_main);
        cursor: pointer;
    }
    .flex{
        display:flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        gap: 30px;
    }
    .each_app{
        width: calc(40.5vw - 110px);
        height: 28vh;
        border: 0.1px solid var(--border_color);
        border-radius: 5px;
        cursor: pointer;
    }
    .modified_each{
        width: 50vw;
        height: 15vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        /* gap: 7%; */
    }
    .holders{
        width: 100%;
        height: 25%;
        /* border-bottom: 1px solid gray; */
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        padding:0 20px;
        border-top-right-radius: 5px;
        border-top-left-radius: 5px;
    }
    .increase_height{
        height: 40%;
    }
    .hide_holder{
        display: none;
    }
    .title_holder{
        background: var(--blue_main);
    }
    .time_holder{
        justify-content: space-between;
        align-items: flex-start;
        padding: 10px 20px;
    }
    .closer{
        justify-content: flex-start;
        gap: 50px;
    }
    .details_holder{
        border-bottom: 0.1px solid var(--border_color);
    }
    .add_height{
        height:30%;
    }
    p{
        font-size: 14px;
        color:white;
    }
    #title_para{
        font-size: 18px;
        color:white;
        font-weight: bold;
    }
    #edit_para{
        font-weight: bold;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: 10px;
    }
    .delete{
        color: rgb(157, 11, 11);
        font-size: 17px;
    }
    }
`


export default HomePage;