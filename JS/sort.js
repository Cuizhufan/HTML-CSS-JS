var arr=new Array;
arr=[1,32,24,5,4,6,15,3,8,55,44,52,334,21];
function sort(arr){
    var len=arr.length;
    var min_index=0;
    var temp=0;
    for(let i=0;i<len-1;i++)
    {
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
sort(arr);