<template>
    <div class="connectPage">
        <van-popup v-model="peochoshow" position="bottom">
            <h3 style="height:50px; line-height:50px; text-align:center;">请选择参加本次活动的学生</h3>
           <van-button size="large" v-for="(stu,index) in studentLists" style="margin:10px 0;" :key="index" @click="choStudent(stu.token)">{{stu.realName}}</van-button>
        </van-popup>

    </div>
</template>

<script>
export default {
    name: "ConnectPage",
    data() {
        return {
            peochoshow:false,
            formData: [],
            studentLists:[]
        };
    },
    mounted() {
        console.log("进入用户授权登录页面");
        this.setList();
    },
    methods: {
        getQueryString: function(name) {
            let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            let r = window.location.search.substr(1).match(reg);
            console.log(r);
            if (r != null) return unescape(r[2]);
            return null;
        },
        setList: function() {
            let that = this;
            let mySource = that.getQueryString("source");
            let myuId = that.getQueryString("uId");
            let mytoken = that.getQueryString("token");
            let formUrl = document.referrer;
            let dataList = new Object();
            console.log(mySource);
            if (!that.$isNull(mySource)) {
                dataList.source = mySource;
            }
            if (!that.$isNull(myuId)) {
                dataList.uId = myuId;
            }
            if (!that.$isNull(mytoken)) {
                dataList.token = mytoken;
            }
            that.formData = dataList;
            let token = dataList.token;
            console.log("开始授权登录");
            console.log(formUrl);
            that.$store.commit("saveFromUrl", formUrl); 

            if (dataList != null) {
                let urlp = "login";
                that.$api.post(urlp, dataList, res => {
                    
                    console.log(res);
                    if (res.status == "success") {
                        console.log("授权登录成功");
                        that.$store.commit("saveToken", res.result.token); //保存 token
                        // that.$store.commit("saveRole", res.result.role); //保存 role
                        // that.$store.commit("saveUid", res.result.userId);
                        if(res.result.role == "Guardian"){
                            console.log(res.result.children.length);
                            if(res.result.children.length != 1){
                                that.studentLists = res.result.children;
                                that.peochoshow =! that.peochoshow;
                            }else{
                                that.$store.commit("saveToken", res.result.children[0].token); //保存 token
                                // that.$router.push({ path: "/student/sActivityList",query:{token:res.result.children[0].token}});
                                that.$router.push({ path: "/student/sActivityList"});
                            }
                            // that.$router.push({ path: "/student/sActivityList",query:{token:res.result.token}});

                        }else if(res.result.role == "Student"){
                            //  that.$router.push({ path: "/student/sActivityList",query:{token:res.result.token}});
                             that.$router.push({ path: "/student/sActivityList"});
                        }
                        else if(res.result.role == "Teacher" || res.result.role == "ClassManager"){
                            // that.$router.push({ path: "/teacher/tActivityList",query:{token:res.result.token}});
                             that.$router.push({ path: "/teacher/tActivityList"});
                        }else if(res.result.role == "SchoolManager"){
                            //  that.$router.push({ path: "/schoolAdmin/scActivityList",query:{token:res.result.token}});
                            that.$router.push({ path: "/schoolAdmin/scActivityList"});
                        }else{
                            // that.$router.push({ path: "/areaAdmin/arActivityList",query:{token:res.result.token}});
                            that.$router.push({ path: "/areaAdmin/arActivityList"});
                        }
                        // if (res.role < 4) {
                        //     that.$router.push({ path: "/myLesson"});
                        // } else {
                        //     that.$router.push({ path: "/shareCounty" });
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
        choStudent:function(yhtoken){
            let that = this;
            that.$router.push({ path: "/student/sActivityList",query:{token:yhtoken}});
        }
    }
};
</script>

<style>
</style>
