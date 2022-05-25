import axios from "axios";


let testUrl = axios.create({
    baseURL : 'http://localhost:3000'
})


export default testUrl;