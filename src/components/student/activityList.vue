<template>
    <div class="activityList bgmain mianScroll">
        <div class="activityListM">
            <!-- <van-pull-refresh v-model="isRefresh" @refresh="onRefresh" class="activityListM">
                <van-list v-model="loading" :finished="finished" finished-text="没有更多了" :offset="100" @load="loadList"> -->
                <div class="activity" v-for="act in activityLists" :key="act.activityID">
                <div class="activityLImg" >
                    <img :src="act.imageUrl">
                </div>
                <div class="activityContent" @click="intoDetails(act.id)">
                    <h3>
                        {{act.name}}
                        <van-tag v-if="act.level==1" color="#07c160">班级</van-tag>
                        <van-tag v-else-if="act.level==2" color="#0bcbdc">区级</van-tag>
                        <van-tag v-else color="#1989fa">校级</van-tag>
                    </h3>
                    <ul>
                        <li><em>活动日期：</em><div><p>{{act.startTime}}~{{act.entTime}}</p></div></li>
                        <li><em>据活动结束时间：</em><div><p>天</p></div></li>
                        <li><div><p><span>内容摘要：</span>{{act.content}}</p></div></li>
                    </ul>
                </div>
            </div>
                
                <!-- </van-list>
            </van-pull-refresh> -->
        </div>
        <van-popup v-model="peochoshow" position="bottom">
            <h3 style="height:50px; line-height:50px; text-align:center;">请选择参加本次活动的学生</h3>
           <van-button size="large" @click="loadList(stu.studentID)" v-for="stu in studentList">{{stu.studentName}}</van-button>
        </van-popup>
       
    </div>
</template>

<script>
import { Popup } from 'vant';

export default {
name:'activityList',
components:{
    "van-popup":Popup
},
data(){
    return{
        isLoading: false, //列表数据加载中
        isRefresh: false, //正在刷新数据
        loading: false, //列表加载数据
        finished: false, //列表中是否加载了所有数据
        peochoshow:false,
        studentList:[
            {studentID:20181001,studentName:"张洋"},
            {studentID:20181002,studentName:"张扬"},
        ],
        studentLists:[],
        // activityList:[
        //     { 
        //         activityID:20190101,
        //         title:"云龙区演讲大赛云龙区演讲大赛云龙区演讲大赛",
        //         hdImg:require('./../../assets/images/huodongImg.jpg'),
        //         activityLevel:3, 
        //         activityStartDate:"2019.01.10",
        //         activityEndDate:"2019.02.10",
        //         content:"活动内容活动内容活动内容活动内容活动内容活动内容活动内容活动内容活动内容活动内容活动内容活动内容"
        //     },
        //      { 
        //         activityID:20190102,
        //         title:"云龙区演讲大赛",
        //         hdImg:require('./../../assets/images/huodongImg.jpg'),
        //         activityLevel:3, 
        //         activityStartDate:"2019.01.10",
        //         activityEndDate:"2019.02.10",
        //         content:"活动内容活动内容活动内容活动内容活动内容活动内容活动内容活动内容活动内容活动内容活动内容活动内容"
        //     }
        // ],
        activityLists:[]
    }
},
mounted(){
    this.loadList(true)
},
methods:{
    huoqurenuw:function(){
         let urlp = "/api/login";
         if (dataList != null) {
                let urlp = "/api/login";
                that.$api.post(urlp, dataList, res => {
                    console.log(res);
                    if (res.status == "success") {
                        console.log("授权登录成功");
                        that.$store.commit("saveToken", res.result.token); //保存 token
                        thism
                        // if(res.result.role == "Guardian"||res.result.role == "Student"){
                        //     that.$router.push({ path: "/student/sActivityList",query:{token:res.result.token}});
                        // }else if(res.result.role == "Teacher" || res.result.role == "ClassManager"){
                        //     that.$router.push({ path: "/teacher/tActivityList",query:{token:res.result.token}});
                        // }else if(res.result.role == "SchoolManager"){
                        //      that.$router.push({ path: "/schoolAdmin/scActivityList",query:{token:res.result.token}});
                        // }else{
                        //     that.$router.push({ path: "/areaAdmin/arActivityList",query:{token:res.result.token}});
                        // }
                    } else {
                        console.log("授权登录失败");
                        that.$vnotify(res.errorMessage);
                        that.$router.push({ path: "/errorPage" });
                    }
                });
            } else {
                that.$vnotify("参数传递不完整");
                that.$router.push({ path: "/errorPage" });
            }
    },
    intoDetails:function(artid){                //进入到活
         var _this = this;
        _this.$router.push({path:'/student/sActivityContent',query:{hdid:artId}});
    },
    loadstuList:function(){
        this.peochoshow = true;
    },
    loadList:function(stuid){
        this.peochoshow = false;
    },
    onRefresh:function(){
         this.loading = false;
        this.loadList(true);
    },
    //加载活动列表(isInit:是否清空后重新加载数据)
        loadList: function(isInit) {
            let that = this;
            //判断是否正在加载数据
            if (that.isLoading == false) {
                that.isLoading = true;
            } else {
                return false;
            }
            if (isInit == true) {
                that.finished = false;
                that.pageIndex = 1;
                that.myPlanList = [];
            }
            let url = "/api/activity/list";
            // let token = that.$route.query.token;
            let token = that.$store.state.token;
            let param = { token:token};
            let mes = that.receive;
            if (that.$isNull(mes) == false) {
                for (const key in mes) {
                    if (mes[key] == null || mes[key] == "") {
                        continue;
                    } else if (mes.hasOwnProperty(key)) {
                        param[key] = mes[key];
                    }
                }
            }
            that.$api.post(url, param, res => {
                console.log(res);
                that.activityLists = res.result;
                console.log(that.activityLists);
                let resCount = res.result.length;
                console.log("成功加载:" + resCount);
                // console.log(res);
                if (isInit == true) {
                    that.activityLists = res;
                } else {
                    that.activityLists = that.activityLists.concat(res.result);
                }
                that.pageIndex++;
                // 加载状态结束
                that.loading = false;
                that.isLoading = false;
                that.isRefresh = false;
                if (resCount < 10) {
                    that.finished = true;
                }
            });
        }
}
}
</script>

<style>

</style>
