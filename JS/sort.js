var arr=new Array;
arr=[1,32,24,5,4,6,15,3,8,55,44,52,334,21];
/*x选择排序 */
function sort(arr){
    var len=arr.length;
    var min_index=0;
    var temp=0;
    for(let i=0;i<len-1;i++)
    {
        //容易遗忘
        min_index=i;
        for(let j=i;j<len;j++)
        {
            if(arr[min_index]>arr[j])
            {
                min_index=j;
            }
        }
        temp=arr[i];
        arr[i]=arr[min_index];
        arr[min_index]=temp;
    }
    console.log(arr);
}
/**
 * 插入排序
 * @param  arr 数组
 */
function sort2(arr){
    var len=arr.length;
    for(let i=1;i<len;i++)
    {
        var temp=arr[i];
        let j=i-1;
        for(;j>0&&temp<arr[j];j--)
        {
            arr[j+1]=arr[j];
        }
        arr[j+1]=temp;
    }
    console.log(arr);
}
sort2(arr);
for(let i=0;i<10;i++){
    if(i<5)
    {
        console.log("www")

    }
    else{
        break;
    }
}