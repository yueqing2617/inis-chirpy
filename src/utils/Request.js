import axios from 'axios';
import qs from "qs";
import router from '../router';
const token = window.inzj.site_token || ''
const service = axios.create({
    baseURL:window.inzj.api_url,
    timeout:window.inzj.timeout
})

// http request 拦截器
service.interceptors.request.use(
    config => {
        // 定义请求头
        config.headers = {
            'Content-Type':'application/x-www-form-urlencoded',
            'token': token
        }
        return config;
    },
    error => {
        console.log(error)
    }
)
// http response 拦截器
service.interceptors.response.use(
    response => {
        if(response.data.code != 200){
            router.push({path:'/404'})
            console.log(response.data.msg);
            return [];
        }else{
            return response.data;
        }
    },
    error => {
        console.log(error)
    }
)
//http GET请求
export function GET(url, params = null){
    return service.get(url, params);
}
//http POST请求
export function POST(url, params = null){
    return service.post(url, qs.stringify({...params}));
}