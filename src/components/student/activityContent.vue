<template>
    <div class="activityContent">
        <van-tabs v-model="active" swipeable animated>
            <van-tab title="活动须知">
                <div class="activityAbout">
                    <h2>{{activityNew.name}}</h2>
                    <div class="activityImg"><img :src="activityNew.imageUrl"></div>
                    <ul>
                        <li><em>活动时间</em><div><p>{{activityNew.startTime}}~{{activityNew.endTime}}</p></div></li>
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
               <div class="myActivityList">
                   <div class="worksBox">
                       <div class="worksBoxVideo">
                       <video-player class="video-player vjs-custom-skin"
                            ref="videoPlayer"
                            :playsinline="true"
                            :options="playerOptions"
                        >
                        </video-player>
                        </div>
                        <div class="worksBoxAbout">
                            <p><span>上传时间：</span></p>
                            <p><span>状态：</span></p>
                            <van-button round type="danger" class="drop"><van-icon name="delete" /></van-button>
                        </div>
                   </div>
               </div>

               <div class="xbts">
                   <!-- <van-button round onclick="window.Android.setFlag(2)"><van-icon name="video" /><input type="file" accept="video/*" capture="camera"></van-button> -->
                   <van-button round @click="chuandi()"><van-icon name="video" /><input type="file" accept="video/*" capture="camera"></van-button>
                   <!-- <van-button round onclick="window.Android.getActivityId('123','nihao')"><van-icon name="video" /><input type="file" accept="video/*" capture="camera"></van-button> -->
                   <!-- <van-button round @click="window.Android.getActivityId($route.query.hdid,$store.state.token)"><van-icon name="video" /><input type="file" accept="video/*" capture="camera"></van-button> -->

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
            active: 2,
            activityNew:{},
            activity:{
                title:"云龙区演讲大赛云龙区演讲大赛云龙区演讲大赛",
                activityLevel:3,
                hdimg:require('./../../assets/images/huodongImg.jpg'),
                startTime:"2019.01.16",
                endTime:"2019.01.20",
                activityCon:"内容内容内容内容内容内容内容内容内容内容内容",
                activityRequire:"要求要求要求要求要求要求要求要求要求要求要求",
                activityRemark:"备注备注备注备注备注备注备注备注备注备注备注备注"
                
                
            },
            playerOptions : {
                playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
                autoplay: false, //如果true,浏览器准备好时开始回放。
                muted: false, // 默认情况下将会消除任何音频。
                loop: false, // 导致视频一结束就重新开始。
                preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
                language: 'zh-CN',
                aspectRatio: '4:3', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                fluid: false, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                sources: [{
                    type: "",
                    src:require("./../../assets/video/mov_bbb.mp4") //url地址
                }],
                poster:require("./../../assets/images/huodongImg.jpg"), //你的封面地址
                // width: document.documentElement.clientWidth,
                notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
                controlBar: {
                timeDivider: true,
                durationDisplay: true,
                remainingTimeDisplay: false,
                fullscreenToggle: true  //全屏按钮
                }
            },
            videoList:[]
        }
    },
    mounted(){
        this.loadxiangqing();
    },
    methods:{
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
        loadList: function(isInit) {
            let that = this;
            let token = that.$store.state.token;
            let url = "/production/list";
            let param = {token:token};            //获取传参
            that.$api.post(url, param, res => {
                let resCount = res.result.length;
                console.log("成功加载推荐活动:" + resCount);
                that.videoList = res.result;
            });
        },
        chuandi:function(){
            // let that = this;
            // let wzid = that.$route.query.hdid;
            // let token = that.$store.state.token;
            // wzid = wzid.toString(); 
            // token = token.toString();
            // window.Android.getActivityId(wzid,token);
            
            var u = navigator.userAgent;
            var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
            var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
            // alert('是否是Android：'+isAndroid);
            // alert('是否是iOS：'+isiOS);
            if(isAndroid){
                // alert("我这边是安卓");
                let that = this;
                let wzid = that.$route.query.hdid;
                let token = that.$store.state.token;
                wzid = wzid.toString(); 
                token = token.toString();
                window.Android.getActivityId(wzid,token);
            }else{
                // alert("我这边是IOS");
            }
        },
    }
}
</script>

<style>

</style>
