<template>
    <div class="activityContent">
        <van-tabs v-model="active" swipeable animated>
            <van-tab title="活动须知">
                <div class="activityAbout">
                    <h2>{{activity.title}}</h2>
                    <div class="activityImg"><img :src="activity.hdimg"></div>
                    <ul>
                        <li><em>活动时间</em><div><p>{{activity.startTime}}~{{activity.endTime}}</p></div></li>
                        <li><em>活动级别</em><div>
                            <p v-if="activity.activityLevel==1">班级活动</p>
                            <p v-else-if="activity.activityLevel==2">校级活动</p>
                            <p v-else>区级活动</p>
                        </div></li>
                        <li><em>活动内容</em><div><p>{{activity.activityCon}}</p></div></li>
                        <li><em>活动要求</em><div><p>{{activity.activityRequire}}</p></div></li>
                        <li><em>活动备注</em><div><p>{{activity.activityRemark}}</p></div></li>
                    </ul>
                </div>
            </van-tab>
            <van-tab title="互动参与">
                <van-list
                    v-model="loading"
                    :finished="finished"
                    finished-text="没有更多了"
                    @load="onLoad"
                >
               <div class="myActivityList">
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
               </div>

              </van-list>
            </van-tab>
        <van-tab title="活动统计">
            <div class="statisticsList">
                <ul>
                    <li v-for="statistics in myClassstatStatistics">
                        <h3><em>{{statistics.nianji}}{{statistics.banji}}</em>上传作品<span>{{statistics.zuopinNum}}</span>个</h3>
                        <div class="">
                            <em>推荐作品</em>
                            <p>
                                <span v-for="zp in statistics.zuopingList">{{zp}}</span>
                            </p>
                        </div>
                    </li>
                </ul>
            </div>
        </van-tab>
        </van-tabs>
    </div>
</template>

<script>



export default {
    name:'activityContent',
    data(){
        return{
            active: 0,                      //默认TBA标签选中
            loading: false,
            finished: false,
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
            ]
        }
    },
    methods:{
        onLoad(){
        // 异步更新数据
        setTimeout(() => {
            for (let i = 0; i < 10; i++) {
            this.studentworks.push(this.studentworks.length + 1);
            }
            // 加载状态结束
            this.loading = false;

            // 数据全部加载完成
            if (this.studentworks.length >= 10) {
            this.finished = true;
            }
        }, 500);
        }
    }
}
</script>

<style>

</style>
