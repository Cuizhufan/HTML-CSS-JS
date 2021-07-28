![image-20210723094225809](C:\Users\agent\AppData\Roaming\Typora\typora-user-images\image-20210723094225809.png)

设置get的请求参数，直接在url后面 用？好分隔。

![image-20210723094340181](C:\Users\agent\AppData\Roaming\Typora\typora-user-images\image-20210723094340181.png)

响应函数，处理结果。

readystate时XHR对象的一个属性，表示当前处在请求的哪一个阶段：

0：未初始化 uninitialized  尚未调用open

1：一打开 open 以调用open 未调用send

2：已发送 send  以调用send 未响应

3：接受中 receiving 已接受到部分响应

4：完成 complete 已接受到所以响应

readystate的值发生变化时都会调用onreadystatechange事件。



![image-20210723095059889](C:\Users\agent\AppData\Roaming\Typora\typora-user-images\image-20210723095059889.png)

设置请求头：

```javascript
xhr.setRequestHeader('Content-Type','application/x-form-urlencoded'）;
```



传输json数据类型

服务端：定义对象>json转字符串>发送

![image-20210723120529726](C:\Users\agent\AppData\Roaming\Typora\typora-user-images\image-20210723120529726.png)

客户端：设置响应体数据类型为JSON>接收

```javascript
xhr.responseType='Json';
```

请求中加上一个时间的参数，用于解决ie浏览器会缓存ajax请求的数据的问题

![image-20210723130133512](C:\Users\agent\AppData\Roaming\Typora\typora-user-images\image-20210723130133512.png)

设置请求超时时间，超过时间就终止请求，并调用回调函数

![image-20210723135838967](C:\Users\agent\AppData\Roaming\Typora\typora-user-images\image-20210723135838967.png)

xhr.abort() 取消请求。

实现跨域的方式：

1.JSONP(JSON with padding)原理：
 	利用html里面script标签可以加载其他域下的js这一特性，使用script src的形式来获取其他域下的数据，但是因为是通过标签引入的，所以会将请求到的JSON格式的数据作为js去运行处理，显然这样运行是不行的，所以就需要提前将返回的数据包装一下，封装成函数进行运行处理，函数名通过接口传参的方式传给后台，后台解析到函数名后在原始数据上「包裹」这个函数名，发送给前端。（JSONP 需要对应接口的后端的配合才能实现）只支持get请求

2 CORS 跨域资源共享（Cross-Origin Resource Sharing） 官方的解决跨域的方案

​	特点：不需要在客户端做任何操作，完全在服务器中处理，实现跨域。支持get，post等其他请求。当使用 XMLHttpRequest 发送请求时，浏览器发现该请求不符合同源策略，会给该请求加一个HTTP请求头：Origin。后台进行一系列处理，如果确定接受请求则在返回结果中加入一个响应头：Access-Control-Allow-Origin，值为相同的源，或者”*“。

jsonp：

客户端：

```javascript
<script>
       function handlefunction(data){
            var result=document.getElementById('result');
            result.innerHTML=data.name;
       } 
    </script>
    <!--jsonp 的实现：
        利用script的跨域特性，传输的数据必须包含在服务端响应的返回函数中，
        因为只有函数或者代码才能被script标签解析，
        这里设置了回调函数为handlefunction，传递的参数是一个对象，
        在页面内定义的回调函数内可以执行操作-->
    <script src='http://localhost:9000/jsonp'></script>
```

服务端：

```javascript
app.all('/jsonp',(request,response)=>{
    var data={
        name:'cuizhufan'
    }
    var str=JSON.stringify(data);
    response.end(`handlefunction(${str})`);
});
```

