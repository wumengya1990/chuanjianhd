<template>
    <div class="charts">
            <div id="myChart" :style="{width: '100%', height: '300px'}"></div>
    </div>
</template>


<script>
export default {
  name: 'hello',
  data () {
    return {
        wupin:["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"],
        shuju:[5, 20, 36, 10, 10, 20]
    }
  },
  mounted(){
    this.drawLine();
  },
  methods: {
    drawLine(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'))
        // 绘制图表
        var option=({
            title: {
                text: '世界人口总量',
                subtext:'数据来自网络'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            legend: {
                data: ['2011年', '2012年']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'value',
                boundaryGap: [0, 0.01]
            },
            yAxis: {
                type: 'category',
                data: ['巴西','印尼','美国','印度','中国','世界人口(万)']
            },
            series: [
                {
                    name: '2011年',
                    type: 'bar',
                    data: [18203, 23489, 29034, 104970, 131744, 630230]
                },
                {
                    name: '2012年',
                    type: 'bar',
                    data: [19325, 23438, 31000, 121594, 134141, 681807]
                }
            ]
            }
        )
        
        // for(var i=0; i<this.wupin.length;i++){
        //      option.xAxis.data[i] = this.wupin[i]
        //      option.series[0].data[i]  =   this.shuju[i]
        // }
       

        myChart.setOption(option);

    }
  }
}

</script>

<style>

</style>
