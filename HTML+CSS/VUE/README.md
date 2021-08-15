# VUE学习笔记

## vue指令：

1 v-text 关联data中的数据 可以用   {{   }}代替

```HTML
<div id="app">
        <h2 v-text="message+'!'">深圳</h2>
        <h2>{{ message +'!'}}深圳</h2>
    </div>
```

2 v-html 设置标签的inner HTML，但是能够识别内容中的标签，而v-text不行

3 v-on 为元素绑定事件 例如点击鼠标，按键等。语法有两种如下

```HTML
<button v-on:click='function'> 按键</button>
<button @click='function'> 按键</button>

```

并在vue中定义对应的methods    ‘function’

可以为方法传递参数：

```javascript
<button v-on:click='function（p,p1）'> 按键</button>
```

同样的在vue中定义方法的时候也要有参数

在事件后边还可以加上修饰符例如：

@keyup.enter 时间修饰符enter指的是回车键，所以当回车键被按下时触发事件。

4 v-show 根据表达值的真假，切换元素的显示与隐藏（改变的是元素的display属性）

```HTML
<img v-show="isShow" src="./img/monkey.gif" alt="">
<img v-show="age>=18" src="./img/monkey.gif" alt="">
```

```javascript
var app = new Vue({
        el:"#app",
        data:{
          isShow:false,
          age:17
        }
       }
      )
```

5 v-if 根据表达值的真假，切换元素的显示和隐藏（通过操纵dom元素，直接删除元素），用法与v-show同

6 v-bind 设置元素的属性（例如 src，title，class）

根据条件来改变属性时可以选择三元表达式或者对象的形式：

v-bind可以省略

```HTML
<div id="app">
    <img v-bind:src="imgSrc" alt="">
    <br>
    <img :src="imgSrc" alt="三元表达式" :title="imgTitle+'!!!'" :class="isActive?'active':''" > 
    <br>
    <img :src="imgSrc" alt="对象形式" :title="imgTitle+'!!!'" :class="{active:isActive}">
    </div>
```

```JavaScript
 var app = new Vue({
            el:"#app",
            data:{
                imgSrc:"http://www.itheima.com/images/logo.png",
                imgTitle:"黑马程序员",
                isActive:false
            },
        })
```

7 v-for 结构化生成数据，与数组搭配使用

```HTML
<li v-for="(items,index) in arr">
    {{index+1}}姓名：{{items}}
</li>
```

```javascript
 var app = new Vue({
            el:"#app",
            data:{
                arr:["张三","李四","王五"],
               
            }
            })
```

效果：

![image-20210724170628377](C:\Users\agent\AppData\Roaming\Typora\typora-user-images\image-20210724170628377.png)



8 v-mode 双向数据绑定（表单元素），绑定后的值会相互同步 

```HTML
<div id="app">
        <input type="text" v-model="message" @keyup.enter="getM">
    </div>
```

```javascript
 var app = new Vue({
            el:"#app",
            data:{
                message:"黑马程序员"
            },
            methods: {
                getM:function(){
                    alert(this.message);
                } 
            }
        })
```

## vue+axios

## axios是使用promise异步的方式封装了ajax

添加axios

```HTML
<!-- 官网提供的 axios 在线地址 -->
  <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
```

get方法：

```JavaScript
btn.onclick=function(){
          axios.get('https://autumnfish.cn/api/joke/list?num=3')
          .then(function(response){
              console.log(response);
          })
      }
```

post方法：

```JavaScript
btn2.onclick=function(){
          axios.post('https://autumnfish.cn/api/user/reg',{username:'czf'})
          .then(function(response){
              console.log(response);
          })
      }
```

注意在axios的.then方法中使用this时的作用域问题，例如：

```javascript
<script>
        var app=new Vue({
                el:".app",
                data:{
                    message:"你好！"
                },
                methods: {
                    getjokes:function(){
                        console.log(this.message);
                        //这里将this赋值给that，因为this在作用域变化时会改变，下面使用that.message来访问massage变量
                        var that=this;
                        axios.get('https://autumnfish.cn/api/joke')
                        .then(function(response){
                            console.log(response.data);
                            that.message=response.data;
                            //this.message == undefine 原因是内部函数的this不能访问外部的this 
                        })
                    }
                }
            })
    </script>
```

## 组件

1注册组件：

```javascript
 //1注册组件
        Vue.component('ButtonClick',{
            //组件的结构
            template:`<button @click='btn_count'>点击了{{count}}次</button>`,
           //因为组件会复用，所用数据写成函数的形式，函数返回包含数据的对象，每一次调用都是一个新的数据
            data(){
                return{
                    count:0
                }   
            },
            methods: {
                btn_count(){
                    this.count++;
                }
            }
        })
```

2使用组件

```javascript
<!--2 使用组件   -->
        <button-click></button-click>
        <ButtonClick />
        <!--组件和组件之间的数据是分离的-->
```

注意：

组件模板定义中只能有一个根节点，可以套一个div标签

组件名称定义用大驼峰法，但是在html里调用时，HTML不会识别大写，都会转成小写。因此要转成小写短横线形式。或者使用<templatename />

避免使用全局组件，而是用局部组件

### 组件通信

props

子组件内定义props形参，在子组件模板内使用形参，父组件在调用子组件时给出实际的参数值（有一点类似函数）

```javascript
/*子组件定义形参*/
components:{
                ArticleList:{
                    template:"#box",
                    props:['boxTitle','imgSrc','articleTitle','articleContent']
                }
            }
```

```html
<!--子组件模板内使用形参-->
<template id="box">
        <div>
            <h3>{{boxTitle}}</h3>
            <div>
                <img :src="imgSrc" alt="">
                <div>
                    <h4>{{articleTitle}}</h4>
                    <p>{{articleContent}}</p>
                </div>
            </div>
        </div>
    </template>
```

```HTML
<!--父组件调用子组件，并赋值实参-->
<div id="app">
        <article-list
        img-src="../../image/1.png"
        article-title="你的暴饮暴食是因为？"
        article-content="在一项调查中发现人们暴饮暴食的习惯不是因为饿了"
        >
    </article-list>
    </div>
```

### 组件插槽

在同样的结构中使用插槽，可以实现结构差异。特点，允许在组件内再定义HTML标签。

使用<slot>,在组件模板中定义插槽，用v-slot来关联插槽和HTML内容（具名插槽）。

```html
 <div id="app">
        <section-head>
            <h3>这是一个插槽</h3>
            <template v-slot:title>
                <p>这是一个具名插槽</p>
            </template>
        </section-head>
    </div>

    <template id="head">
        <div>
            <slot name="title"></slot><!--具名插槽-->
            <slot></slot> <!--公共插槽-->

        </div>
    </template>
```



### 动态组件

可以切换不同的组件，可以实现选项卡的效果。渲染一个元组件，依靠 :is的值决定是渲染哪个组件。

## vue生命周期

![img](https://images2015.cnblogs.com/blog/1150551/201706/1150551-20170628102525977-193670332.jpg)

创建阶段：

​	new vue之后先进行初始化实例，接着调用beforecreate函数。然后在初始化实例自身定义的选项如date methods等，完成后调用created函数，代表实例被创建完成，但还未被渲染到页面中。

beforecreate : 可以在这加个loading事件，在加载实例时触发 

created : 初始化完成时的事件写在这里，如在这结束loading事件，异步请求数据也适宜在这里调用



进入第二阶段前还要先满段是否有“el”选项（或者看有没有mount方法）（否则生命周期结束），再看是否有“template选项”，然后编译模板



挂载阶段：

beforemount函数，模板编译完成，准备挂载前调用。beforemount函数调用后，接着会创建实例的一个$el属性，用编译好的html替换el属性指向的dom对象。完成挂载到页面后调用mounted函数。该函数里可以发数据请求。



更新阶段：

这个阶段数据发生了修改更新，更新前调用beforeupdate函数，更新完成后调用updated函数

销毁阶段：

当.$destory()方法被主动调用时，实例就要销毁。beforedestory函数销毁前调用,destoryed函数销毁后调用。此阶段可以删除初始化定义的定时器

## SPA单页面应用

单页Web应用（single page web application，SPA）

- 很多页面存在很多重复的代码，比如页面公共部分，页头页脚等，虽然可以写成模板避免重复，但是浏览器每次都会请求重复的资源，浪费了网络资源

- 一些公共的样式文件，js脚本文件也会被重复请求

  为了解决上面的一些问题，有经验的开发者提出了一种解决方案---SPA，即把页面内容和逻辑都放到一个web页面中，根据路由的变化替换对应的内容和逻辑。在传统的web项目中，路由往往是由服务器端控制，所以SPA的实现基础就是路由逻辑前端化，由前端代码在浏览器中控制。

  优点

  交互体验好

  减轻服务器压力

  更好实现响应式

  缺点

  seo（搜索引擎优化）难度大

  初次加载时间长

  

## 路由

根据不同的url地址展现不同的页面。前端路由的核心，就在于 —— 改变视图的同时不会向后端发出请求。

history，hashhttps://blog.csdn.net/weixin_43392489/article/details/108441429

1定义路由组件

2引入路由组件

3配置路由routes

4实例化路由router

5把路由挂载到vue实例上（new vue）

6使用<router-link>组件给标签添加导航

7使用<router-view>给组件定义出口

### 动态路由

把某种模式匹配到的所有路由，全都映射到同个组件

```javascript
const User = {
  template: '<div>User {{ $route.params.id }}</div>'
}

const router = new VueRouter({
  routes: [
    // 动态路径参数 以冒号开头
    { path: '/user/:id', component: User }
  ]
})
```



### 嵌套路由

二级导航实现

子路由路径不要加“/”，router-link标签中 to=“加上根目录的路径”

```javascript
const router = new VueRouter({
  routes: [
    {
      path: '/user/:id',
      component: User,
      children: [
        {
          // 当 /user/:id/profile 匹配成功，
          // UserProfile 会被渲染在 User 的 <router-view> 中
          path: 'profile',
          component: UserProfile
        },
        {
          // 当 /user/:id/posts 匹配成功
          // UserPosts 会被渲染在 User 的 <router-view> 中
          path: 'posts',
          component: UserPosts
        }
      ]
    }
  ]
})
```

### 重定向

把当前的路由重定向到别的路由下。

### 导航守卫

导航守卫的用途主要是在用户离开页面前提醒用户，和页面访问前先登录。共有7个钩子，其中全局钩子有3个，组件钩子有3个，路由管道钩子有1个。
