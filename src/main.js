import * as echarts from 'echarts';

const main = document.getElementById('main');
const loadMoreButton = document.getElementById('loadMore');

const myChart = echarts.init(main,'default');
let n = 0;
let m=0;
function createKey(){
    n+=1;
    return `2021-1-${n}`;
}
function createValue(){
    m+=1;
    return m;
}
let xData = [createKey(),createKey(),createKey(),createKey(),createKey(),createKey(),createKey(),createKey()];
let values = [createValue(),createValue(),createValue(),createValue(),createValue(),createValue(),createValue()]
// 使用刚指定的配置项和数据显示图表。
myChart.setOption({
    title:{
        show:true,
        text:'bug数',
        right:0,
    },
    legend: {
        data:['bug数']
    },
    xAxis: {
        type: 'category',
        data: xData,
    },
    yAxis: {
        type: 'value'
    },
    tooltip:{
        show:true,
    },
    series: [
        {
            lineStyle:{
                color:'red',
            },
            itemStyle:{
                color:"blue",
            },
            name:'bug数',
            data: values,
            type: 'line'
        }
    ]
});
let isLoading = false;
loadMoreButton.addEventListener('click',()=>{
    if(isLoading===true){return}
    myChart.showLoading()
    isLoading=true
    setTimeout(()=>{
        const key=createKey();
        const value = createValue();
        xData = [...xData,key];
        values = [...values,value];
        myChart.setOption({
            xAxis: {
                data: xData,
            },
            series: [
                {
                    data: values
                }
            ]
        })
        myChart.hideLoading();
        isLoading=false;
    },3000);

})