<template>
    <div class="activityList bgmain mianScroll">
        <div class="activityListM">
        <div class="activity" v-for="act in activityList" :key="act.activityID">
            <div class="activityLImg" >
                <img :src="act.hdImg">
            </div>
            <div class="activityContent" @click="intoDetails(act.activityID)">
                <h3>
                    {{act.title}}
                    <van-tag v-if="act.activityLevel==1" color="#07c160">班级</van-tag>
                    <van-tag v-else-if="act.activityLevel==2" color="#0bcbdc">区级</van-tag>
                    <van-tag v-else color="#1989fa">校级</van-tag>
                </h3>
                <ul>
                    <li><em>活动日期：</em><div><p>{{act.activityStartDate}}~{{act.activityEndDate}}</p></div></li>
                    <li><em>据活动结束时间：</em><div><p>天</p></div></li>
                    <li><div><p><span>内容摘要：</span>{{act.content}}</p></div></li>
                </ul>
            </div>
        </div>
        </div>

        <!-- <van-popup v-model="peochoshow" position="bottom">
            <h3 style="height:50px; line-height:50px; text-align:center;">请选择参加本次活动的学生</h3>
           <van-button size="large" @click="loadList(stu.studentID)" v-for="stu in studentList">{{stu.studentName}}</van-button>
        </van-popup> -->
       
    </div>
</template>

<script>

export default {
name:'activityList',
data(){
    return{
        peochoshow:false,
        studentList:[
            {studentID:20181001,studentName:"张洋"},
            {studentID:20181002,studentName:"张扬"},
        ],
        activityList:[
            { 
                activityID:20190101,
                title:"云龙区演讲大赛云龙区演讲大赛云龙区演讲大赛",
                hdImg:require('./../../assets/images/huodongImg.jpg'),
                activityLevel:3, 
                activityStartDate:"2019.01.10",
                activityEndDate:"2019.02.10",
                content:"活动内容活动内容活动内容活动内容活动内容活动内容活动内容活动内容活动内容活动内容活动内容活动内容"
            },
             { 
                activityID:20190102,
                title:"云龙区演讲大赛",
                hdImg:require('./../../assets/images/huodongImg.jpg'),
                activityLevel:3, 
                activityStartDate:"2019.01.10",
                activityEndDate:"2019.02.10",
                content:"活动内容活动内容活动内容活动内容活动内容活动内容活动内容活动内容活动内容活动内容活动内容活动内容"
            }
        ]
    }
},
mounted(){
    // this.loadstuList()
},
methods:{
    intoDetails:function(artid){                //进入到活
        var _this = this;
        _this.$router.push({path:'/schoolAdmin/scActivityContent'});
    },
    loadstuList:function(){
        this.peochoshow = true;
    },
    loadList:function(stuid){
        this.peochoshow = false;
    }
}
}
</script>

<style>

</style>
