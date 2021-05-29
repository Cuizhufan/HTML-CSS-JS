var a = [],c;
//var b= function(){console.log("czf");};//函数表达式定义函数
function sayhi()
{
    console.log("hello"+arguments[0]+arguments[1]);
}
for (let i = 0; i < 10; i++) {
    a[i] = function () {
        console.log("czf");
        //使用let定义，每个循环都新定义一个i，因此a[]的成员中i指向不同的i。
        //使用var定义，每个a[]的成员中i指向相同的i，且i在递增，最后调用函数的时候，i已经变成了10
        console.log(i); 
    };
}
sayhi("ni","hao");