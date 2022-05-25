import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleAppointment } from '../redux/appointments reducer';
import styled from 'styled-components';


let PLaceholder = () => {

    let { appId } = useParams()
    let dispatch = useDispatch()
    let navigate = useNavigate()
    let { isLoading, singleAppointment } = useSelector(state => state.aR)

    useEffect(() => {
        dispatch(getSingleAppointment(appId))
    }, [appId, dispatch])


    if (isLoading) {
        return (
            <Wrapper>
                <div className='container'>
                    <p id='loading_para'>loading . . .</p>
                </div>
            </Wrapper>
        )
    }
    

    return (
        <Wrapper>
            <div className='container'>
                <div className='each_app'>
                    <div className='title_holder holders extra_holder'>
                        <p id='title_para'>{singleAppointment ? singleAppointment.title : ''}</p>
                        <span className='edit_span'>
                        <p id='edit_para' 
                        onClick={() => navigate(`/addAppointments?id=${singleAppointment?._id}`)}>
                            Edit
                        </p>   
                        </span>                             
                    </div>
                    <div className='time_holder holders extra_holder'>
                        <p>Time : {singleAppointment ? singleAppointment.time : ''} <br/>
                            Location : {singleAppointment ? singleAppointment.location : ''}
                        </p>
                        <p>With : {singleAppointment ? singleAppointment.companyOf : ''}</p>
                    </div>
                    <div className='details_holder holders'>
                        <p>{singleAppointment ? singleAppointment.details : ''}</p>
                    </div>
                    <div className='details_holder holders feedback'>
                        <p>Feedback :</p>
                        {singleAppointment && ( <p> { singleAppointment.takeaway[0] ? singleAppointment.takeaway[0].feedback : '' } </p>)}
                    </div>
                    <div className='holders extra_holder'>
                        <p>Status : {singleAppointment ? singleAppointment.status : ''}</p>
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
        height: 88vh;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    #loading_para{
        font-size: 18px;
        color: white;
    }
    .each_app{
        width:calc(100vw - 80px);
        max-width:calc(100vw - 80px);
        height: 50vh;
        border:0.1px solid var(--border_color);
        border-radius: 5px;
    }
    .holders{
        width: 100%;
        max-width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding: 0 20px;
        /* border-bottom: 1px solid gray; */
    }
    .extra_holder{
        height: 13.33%;
    }
    .title_holder{
        background: var(--blue_main);
        border-top-right-radius: 5px;
        border-top-left-radius: 5px;
    }
    p{
        color: white;
        font-size: 16px;
    }
    #title_para{
        color: white;
        font-size: 20px;
        font-weight: bold;
    }
    .edit_span{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: 20px;
    }
    #edit_para{
        color: white;
        cursor: pointer;
    }
    .delete{
        color: rgb(157, 11, 11);
        font-size: 17px;
    }
    .details_holder{
        height: 30%;
    }
    .feedback{
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        /* padding-left: 20px; */
        gap: 10px;
        border-bottom: 0.1px solid var(--border_color);
    }

    @media screen and (min-width: 900px) {
        .container{
            width: 81vw;
            max-width: 81vw;
            height: 88vh;
            position: absolute;
            top: 12vh;
            left: 19vw;
            align-items: flex-start;
            padding-top: 40px;
        }
        #loading_para{
        font-size: 25px;
        color: white;
        padding-top: 250px;
    }
    .each_app{
        width:calc(81vw - 120px);
        max-width:calc(100vw - 80px);
        height: 50vh;
        border:none;
        border-radius: 5px;
    }
    .holders{
        width: 100%;
        max-width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding: 0 20px;
        /* border-bottom: 1px solid gray; */
    }
    .extra_holder{
        height: 20%;
    }
    .title_holder{
        background: none;
    }
    p{
        color: white;
        font-size: 16px;
    }
    #title_para{
        color: var(--blue_main);
        font-size: 23px;
        font-weight: bold;
    }
    .time_holder{
        justify-content: flex-start;
        align-items: flex-start;
        gap: 50px;
    }
    .edit_span{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;    
        gap: 20px;
    }
    #edit_para{
        color: white;
        cursor: pointer;
        padding: 7px 20px;
        border-radius: 3px;
        background: var(--blue_main);
        font-size: 16px;
        font-weight:bold;
    }
    .delete{
        color: rgb(157, 11, 11);
        font-size: 17px;
    }
    .details_holder{
        height: 20%;
    }
    .feedback{
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        /* padding-left: 20px; */
        gap: 10px;
        border-bottom: none;
    }
    }
`


export default PLaceholder;