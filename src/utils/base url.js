import axios from 'axios';


let baseUrl = axios.create({
    baseURL : 'https://appointmento.herokuapp.com'
})


export default baseUrl;