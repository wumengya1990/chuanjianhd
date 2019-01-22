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
        
    }
  },
  props:{
      wuping:{
          type:Array,
          required:true
      },
      shunu:{
          type:Array,
          required:true
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
                text: '作品上传情况',
                subtext:'',
                x:'center',
                y:'10px',
                textAlign:'left'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            legend: {
                orient: 'horizontal',
                data: ['作品数量'],
                x:'center',
                y:'bottom',
                bottom:'20px'
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '10%',
                top:'15%',
                containLabel: true
            },
            xAxis: {
                type: 'value',
                boundaryGap: [0, 0.01]
            },
            yAxis: {
                type: 'category',
                data: []
            },
            series: [
                {
                    name: '作品数量',
                    type: 'bar',
                    data: []
                }
            ]
            }
        )
        
        for(var i=0; i<this.wuping.length;i++){
             option.yAxis.data[i] = this.wuping[i]
             option.series[0].data[i]  = this.shunu[i]
        }
       

        myChart.setOption(option);

    }
  }
}

</script>

<style>

</style>
