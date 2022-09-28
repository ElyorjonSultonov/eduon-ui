import axios from 'axios'

export default axios.create({
    withCredentials : true,
    // "Access-Control-Allow-Origin": "*",
})