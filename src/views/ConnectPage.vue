<template>
    <div class="connectPage"></div>
</template>

<script>
export default {
    name: "ConnectPage",
    data() {
        return {
            formData: []
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
            if (r != null) return unescape(r[2]);
            return null;
        },
        setList: function() {
            let that = this;
            // let mySource = that.getQueryString("source");
            // let myuId = that.getQueryString("uId");
            // let mytoken = that.getQueryString("token");
            let dataList = new Object();
            // if (!that.$isNull(mySource)) {
            //     dataList.source = mySource;
            // }
            // if (!that.$isNull(myuId)) {
                dataList.type = 1;
            // }
            // if (!that.$isNull(mytoken)) {
            //     dataList.token = mytoken;
            // }
            // that.formData = dataList;
            // let token = dataList.token;
            // console.log("开始授权登录");

            if (dataList != null) {
                let urlp = "/api/musicRankingsDetails";
                that.$api.get(urlp, dataList, res => {
                    console.log(res);
                    if (res.status == "success") {
                        console.log("授权登录成功");
                        // that.$store.commit("saveToken", res.token); //保存 token
                        // that.$store.commit("saveRole", res.role); //保存 role
                        if(res.result.length != 1){
                            that.$router.push({ path: "/student/sActivityList",query:{uid:res.result}});
                        }else{
                            
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
        }
    }
};
</script>

<style>
</style>
