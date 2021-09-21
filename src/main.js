import * as echarts from 'echarts';

const main = document.getElementById('main');
const loadMoreButton = document.getElementById('loadMore');

const width = document.documentElement.clientWidth;
main.style.width = `${width}px`;
main.style.height = `${width*1.2}px`

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
    baseOption:{
        title:{
            show:true,
            text:'bug数',
            right:20,
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
                name:'bug数',
                data: values,
                type: 'line',
                lineStyle:{
                    color:'red',
                },
            }
        ]
    },
    media:[{
        query:{
            maxWidth:500,
        },
        option:{
            series: [
                {
                   itemStyle:{
                       borderWidth:30
                   }
                }
            ]
        }

    }]

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
myChart.on('click',(e)=>{
    console.log(e.name); //x轴
    console.log(e.data); //y轴
    console.log(e.dataIndex);//y轴下标
    window.open(`http://www.baidu.com/?time=${e.name}`);//打开另一个窗口


})