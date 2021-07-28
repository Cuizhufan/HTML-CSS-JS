const { request, response } = require('express');
const express = require('express');
const app = express();
app.get('/server',(request,response)=>{
    //设置响应头 设置允许跨域 
    response.setHeader('Access-Control-Allow-Origin','*');
    response.send('HELLO');
});
app.all('/server',(request,response)=>{
    //设置响应头 设置允许跨域 
    response.setHeader('Access-Control-Allow-Origin','*');
    response.setHeader('Access-Control-Allow-Headers','*');
    var data={
        name:'cuizhufan',
        age:'18'
    };
    let str=JSON.stringify(data);//json转字符串
    //response.send只能传送字符串
    //response.send(str);
    setTimeout(()=>{response.send(str);},3000);
});
app.listen(8000,()=>{
    console.log("服务已启动");
})