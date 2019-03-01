import axios from 'axios';
import { resolve } from 'path';
import { rejects } from 'assert';
// 全局设置超时时间
axios.defaults.timeout=10000;
//步骤1 添加baseURL，baseURL会在传入网址没有开头时，自动加入baseURL进行拼接
axios.defaults.baseURL='https://api2.bmob.cn/1/classes';
// 步骤2 进行头部设置
axios.defaults.headers['X-Bmob-Application-Id']='c44e5ea0c62e3fb6ebd7b5d515631c35';
axios.defaults.headers['X-Bmob-REST-API-Key']='21db9fb15bbc3eb865404812122c69e2';
axios.defaults.headers['Content-Type']='application/json;charset=UTF-8';

// 步骤3 新建两个函数getInfoByWhere，getAllInfo给api.js调用方法

// getInfoByWhere用于根据where查找后端
export function getInfoByWhere(url,params){
    return new Promise(
        (resolve,reject) => {
            // 总url=baseURL+url+"?where="+encodeURI(JSON.stringfy(params)) 用于根据where查找后端 encodeURI
            // encodeURI() 函数可把字符串作为 URI 进行编码。
            axios.get(url+"?where="+encodeURI(JSON.stringify(params)))
                .then(res => {resolve(res.data)},
                    err => {
                        reject(err.data)
                    }
                )
                .catch( err => {
                    reject(err.data)
                })
        }
    )
}

// getAllInfo用于根据url查找后端，查找整个url表的数据
export function getAllInfo(url){
    return new Promise(
        (resolve,reject) => {
            axios.get(url)
                .then(res => {resolve(res.data)},
                    err => {
                        reject(err.data)
                    }
                )
                .catch(err => {
                    reject(err.data)
                })
        }
    )
}

// getMsgById用于根据objectId查找后端，获取对应id的数据 。 其实这个方法可以用上面的getInfoByWhere代替
export function getMsgById(url,id){
    return new Promise(
        (resolve,reject) => {
            axios.get(url+"/"+id)
                .then(res => {resolve(res.data)},
                    err => {
                        reject(err.data)
                    }
                )
                .catch(err => {
                    reject(err.data)
                })
        }
    )
}

// putMsg用于修改后端数据库表中某行的数据
export function putMsg(url,id,params){
    return new Promise(
        (resolve,reject) =>{
            axios.put(url+"/"+id,params)
            .then(
                res => {resolve(res.data)},
                err =>{reject(err.data)}
            )
            .catch(err =>{reject(err.data)})
        }
    )
}

// postMsg用于后端数据库表中增加一行数据
export function postMsg(url,params){
    return new Promise(
        (resolve,reject) => {
            axios.post(url,params)
            .then(
                res => {resolve(res.data)},
                err =>{reject(err.data)}
            )
            .catch(err =>{reject(err.data)})
        }
    )
}



