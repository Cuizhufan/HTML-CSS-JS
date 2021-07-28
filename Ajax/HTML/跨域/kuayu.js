const { request, response, json } = require('express');
const express=require('express');
const app=express();
app.get('/home',(request,response)=>{

        response.sendFile(__dirname+'/index.html');
});
app.get('/data',(request,response)=>{
    response.send('用户数据');
});
//jsonp服务
app.all('/jsonp',(request,response)=>{
    response.setHeader('Access-Control-Allow-Origin','*');
    var data={
        name:'cuizhufan'
    }
    var str=JSON.stringify(data);
    response.end(`handlefunction(${str})`);
});
app.listen(9000,()=>{
    console.log('服务已启动');
});