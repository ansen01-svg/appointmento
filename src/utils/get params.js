import { useLocation } from 'react-router-dom';


let useGetParams = () => {
    return new URLSearchParams(useLocation('/addAppointments').search)
}


export default useGetParams