import { useLocation } from 'react-router-dom';


let useGetParams = () => {
    return new URLSearchParams(useLocation().search)
}


export default useGetParams