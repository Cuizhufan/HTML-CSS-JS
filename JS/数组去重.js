function unque(arr) {
    var newarr = [];
    for (let i = 0; i < arr.length; i++) {
        if(newarr.indexOf(arr[i])==-1)
        newarr.push(arr[i]);

    }
    return newarr;
}
var input=prompt("请输入数组，以逗号隔开");
var arr=input.split(",");
console.log(unque(arr));