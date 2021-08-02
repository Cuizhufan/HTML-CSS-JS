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
