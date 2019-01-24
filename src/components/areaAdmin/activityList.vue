<template>
    <div class="activityList bgmain mianScroll">
        <!-- <div class="activityListM"> -->
        <div class="fixedBut">
            <van-button round type="primary" @click="creatNew()"><van-icon name="add-square" /></van-button>
        </div>
        <div class="activityListM">
        <!-- <van-pull-refresh v-model="isRefresh" @refresh="onRefresh" class="activityListM">
            <van-list v-model="loading" :finished="finished" finished-text="没有更多了" :offset="100" @load="loadList"> -->
            <div class="activity" v-for="act in activityLists" :key="act.activityID">
                <div v-if="act.imageUrl==null" class="activityLImg" >
                    <img :src="activity.hdimg">
                </div>
                <div v-else class="activityLImg" >
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
                        <li><em>活动日期：</em><div><p>{{act.startTime}}~{{act.endTime}}</p></div></li>
                        <li v-if="act.shijianzt.zt==0"><em>据活动结束时间：</em><div><p style="color:#999999">{{act.shijianzt.tianshuyu}}</p></div></li>
                        <li v-else-if="act.shijianzt.zt==1"><em>据活动结束时间：</em><div><p style="color:#07c160">{{act.shijianzt.xiangchatian}}天</p></div></li>
                        <li v-else><em>据活动结束时间：</em><div><p style="color:#999999">{{act.shijianzt.tianshuyu}}</p></div></li>
                        <li><div><p><span>内容摘要：</span>{{act.content}}</p></div></li>
                    </ul>
                </div>
            </div>
            <!-- </van-list>
        </van-pull-refresh> -->
        </div>


       
    </div>
</template>

<script>

export default {
name:'activityList',
data(){
    return{
        isLoading: false, //列表数据加载中
        isRefresh: false, //正在刷新数据
        loading: false, //列表加载数据
        finished: false, //列表中是否加载了所有数据
        xiangchatian:0,
        tianshuyu:'',
        hdzt:0,                     //0未开始1进行中3已结束
        activityLists:[],
        activity:{                      //活动介绍
            title:"云龙区演讲大赛云龙区演讲大赛云龙区演讲大赛",
            activityLevel:3,
            hdimg:require('./../../assets/images/huodongImg.jpg'),
            startTime:"2019.01.16",
            endTime:"2019.01.20",
            activityCon:"内容内容内容内容内容内容内容内容内容内容内容",
            activityRequire:"要求要求要求要求要求要求要求要求要求要求要求",
            activityRemark:"备注备注备注备注备注备注备注备注备注备注备注备注"
        },
        huodongshijian:[],
    }
},
mounted(){
     this.loadList(true)
},
methods:{
    creatNew:function(){
        var _this = this;
        _this.$router.push({path:'/areaAdmin/createActivity'});
    },
    intoDetails:function(artid){                //进入到活
         var _this = this;
        _this.$router.push({path:'/areaAdmin/arActivityContent',query:{hdid:artid}});
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
            let url = "/activity/list";
            // let token = that.$route.query.token;
            let token = that.$store.state.token;
            let param = {token:token};            //获取传参
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
            console.log(param);
            that.$api.post(url, param, res => {            
                console.log(res);
                that.activityLists = res.result;
                // that.timeFn(that.activityLists.startTime,that.activityLists.entTime);      
                console.log(that.activityLists);
                let resCount = res.result.length;
                console.log("成功加载:" + resCount);
                that.shicha();
                console.log(that.activityLists);

                if (isInit == true) {
                    that.myPlanList = res;
                } else {
                    that.myPlanList = that.myPlanList.concat(res);
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
        },
        shicha:function(){
            for(var i = 0; i<this.activityLists.length;i++){
                this.activityLists[i].shijianzt = this.timeFn(this.activityLists[i].startTime,this.activityLists[i].endTime);
            }
        },
        timeFn(ktian,etian){
            //如果时间格式是正确的，那下面这一步转化时间格式就可以不用了
                let dateBegin = new Date(ktian);//将-转化为/，使用new Date
                let dateEnd = new Date(etian);
                let dateNow = new Date();//获取当前时间
                let weikaishi = dateBegin.getTime() - dateNow.getTime();
                let weijiesu = dateEnd.getTime() - dateNow.getTime();
                let weikaishid = Math.floor(weikaishi / (24 * 3600 * 1000));
                let weijiesud = Math.floor(weijiesu / (24 * 3600 * 1000));
                
                let shijian = new Object();
                // tianshuyu:'',
                if(weikaishid > 0){
                    shijian.xiangchatian = weikaishid;
                    shijian.tianshuyu = "活动暂未开始";
                    shijian.zt = 0;
                }else{
                    if(weijiesud < 0){
                        shijian.xiangchatian = weijiesud;
                        shijian.tianshuyu = "活动已结束";
                        shijian.zt = 2;
                    }else{
                        shijian.xiangchatian = weijiesud;
                        shijian.tianshuyu = "活动进行中";
                        shijian.zt = 1;
                    }
                }
                // console.log(this.xiangchatian);
                console.log(shijian);
                return shijian;

        }
    
}
}
</script>

<style>

</style>
