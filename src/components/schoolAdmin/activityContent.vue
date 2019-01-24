<template>
    <div class="activityContent mianScroll" ref="winHeight">
        <van-tabs v-model="active" swipeable animated>
            <van-tab title="活动须知">
                <div class="activityAbout">
                    <h2>{{activityNew.name}}</h2>
                    <div class="activityImg"><img :src="activity.hdimg"></div>
                    <ul>
                        <li><em>活动时间</em><div><p>{{activityNew.startTime}}~{{activityNew.entTime}}</p></div></li>
                        <li><em>活动级别</em><div>
                            <p v-if="activityNew.level==1">班级活动</p>
                            <p v-else-if="activityNew.level==2">校级活动</p>
                            <p v-else>区级活动</p>
                        </div></li>
                        <li><em>活动内容</em><div><p>{{activityNew.content}}</p></div></li>
                        <li><em>活动要求</em><div><p>{{activityNew.require}}</p></div></li>
                        <li><em>活动备注</em><div><p>{{activityNew.remark}}</p></div></li>
                    </ul>
                </div>
            </van-tab>
            <van-tab title="互动参与">
                <div class="myActivityList" :style="{height:boxheight}">
                 <van-pull-refresh v-model="isRefresh" @refresh="onRefresh" class="activityListM">
                     <van-list v-model="loading" :finished="finished" finished-text="没有更多了" :offset="100" @load="loadList" >
              
                   <div class="worksBox" v-for="zp in studentworks" >
                       <div class="worksBoxVideo">
                       <!-- <video-player class="video-player vjs-custom-skin"
                            ref="videoPlayer"
                            :playsinline="true"
                            :options="playerOptions"
                        >
                        <source :src="zp.sources.src" :type="zp.sources.type">
                        </video-player> -->
                        <video :src="zp.isrc" preload="auto" controls="controls" poster="./../../assets/images/huodongImg.jpg" >
                        Your browser does not support the video tag.
                        </video>
                        </div>
                        <div class="worksBoxAbout">
                            <div class="userImg"><img src="./../../assets/images/userImg.png"></div>
                            <div class="rightCon">
                            <p><em>{{zp.nianji}}{{zp.banji}}</em>{{zp.studentName}}</p>
                            <p>{{zp.schoolName}}</p>
                            </div>
                            <van-button v-if="zp.zpstate" size="small" type="danger" @click="unrecommend()">取消推荐</van-button>
                            <van-button v-else size="small" type="primary" @click="recommend()">推荐</van-button>
                        </div>
                   </div>

                </van-list>
              </van-pull-refresh>
              </div>
            </van-tab>
        <van-tab title="活动统计">
            <van-field v-model="screen1" input-align="right" label="年级" placeholder="请选择年级" @click="" />
            <van-field v-model="screen2" input-align="right" label="班级" placeholder="请选择班级" />
            <char v-bind:wuping="wupinList" v-bind:shunu="shujuList"></char>
            
        </van-tab>
        </van-tabs>
    </div>
</template>

<script>
import chart from './../../views/charts'
export default {
    name:'activityContent',
    components:{
        "char":chart
    },
    data(){
        return{
            screen1:'321',
            screen2:'3121',
            wupinList:["一年级","二年级","三年级","四年级","五年级","六年级"],
            shujuList:[5, 20, 36, 10, 10, 200],
            active: 0,                      //默认TBA标签选中
            isLoading: false, //列表数据加载中
            isRefresh: false, //正在刷新数据
            loading: false, //列表加载数据
            finished: false, //列表中是否加载了所有数据
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
            activityNew:{},
            myClassstatStatistics:[
                { nianji:"三年级", banji:"(1)班", zuopinNum:38, zuopingList:["张洋","张洋","张洋","张洋","张洋","张洋"]},
                { nianji:"三年级", banji:"(2)班", zuopinNum:33, zuopingList:["张洋","张洋","张洋","张洋","张洋","张洋"]},
                { nianji:"三年级", banji:"(3)班", zuopinNum:32, zuopingList:["张洋","张洋","张洋","张洋","张洋","张洋"]},
                { nianji:"三年级", banji:"(4)班", zuopinNum:36, zuopingList:["张洋","张洋","张洋","张洋","张洋","张洋"]}
            ],
            studentworks:[
                {  
                    nianji:"三年级", 
                    banji:"(1)班",
                    studentName:"王帅",
                    schoolName:"大马路小学",
                    hdimg:require('./../../assets/images/huodongImg.jpg'),      //视频封面图
                    isrc:require("./../../assets/video/mov_bbb.mp4"),        //url地址    
                    uploadTime:"2019-01-18",
                    zpstate:true
                },{
                    nianji:"三年级", 
                    banji:"(2)班",
                    studentName:"张洋",
                    schoolName:"大马路小学",
                    hdimg:require('./../../assets/images/huodongImg.jpg'),   //视频封面图
                    isrc:"http://www.w3school.com.cn/i/movie.ogg",         //url地址       
                    uploadTime:"2019-01-18",
                    zpstate:false
                }
            ],
            boxheight:''
        }
    },
    mounted(){
        this.loadxiangqing();
        this.setheight();
    },
    methods:{
        setnianji:function(){
            
        },
        setheight:function(){
            let newheight= this.$refs.winHeight.offsetHeight;
            console.log(newheight)
            this.boxheight = newheight-44+"px";
        },
        loadxiangqing:function(){
            let that = this;
            // let token = that.$route.query.token;
            let wzid = that.$route.query.hdid;
            let token = that.$store.state.token;
             let url = "/activity/detail";
             let param = { token:token,id:wzid};
             that.$api.post(url, param, res => {
                 that.activityNew = res.result;
                 console.log(that.activityNew);
            });
        },
        onRefresh:function(){
         this.loading = false;
        this.loadList(true);
    },
    //加载活动列表(isInit:是否清空后重新加载数据)
        loadList: function(isInit) {
            let that = this;
            let token = that.$store.state.token;
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
            let url = "/production/list";
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
            that.$api.post(url, param, res => {
                let resCount = res.result.length;
                console.log("成功加载推荐活动:" + resCount);
                // console.log(res);
                if (isInit == true) {
                    that.videoList = res.result;
                } else {
                    that.videoList = that.myPlanList.concat(res.result);
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
#test {
  width: 400px;
  height: 400px;
  margin: 40px auto;
}
</style>
