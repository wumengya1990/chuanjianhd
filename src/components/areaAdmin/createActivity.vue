<template>
    <div class="creatActivity mianScroll">
        <div class="creatActivityM">
            <ul>
                <li>
                    <em>活动名称<i>*</i></em>
                    <div><van-field v-model="formList.name" placeholder="请输入活动名称" /></div>
                </li>
                <li>
                    <em>活动开始时间<i>*</i></em>
                    <div><van-field v-model="beginDate" placeholder="请输入活动开始时间" icon="clock-o" @click="beiginTimeShow=true" /></div>
                </li>
                <li>
                    <em>活动截止时间<i>*</i></em>
                    <div><van-field v-model="endDate" placeholder="请输入活动截止时间" icon="clock-o" @click="endTimeShow=true" /></div>
                </li>
                <li>
                    <em>输入各学校推荐作品数量<i>*</i></em>
                    <div><van-stepper v-model="formList.schoolRecommendCount" style="margin:5px 10px 0" /></div>
                </li>
                <li>
                    <em>输入各班级推荐作品数量<i>*</i></em>
                    <div><van-stepper v-model="formList.classRecommendCount" style="margin:5px 10px 0" /></div>
                </li>
                <li>
                    <em>输入活动内容<i>*</i></em>
                    <div> <van-field v-model="formList.content" type="textarea" placeholder="请输入活动内容" rows="1" autosize /></div>
                </li>
                <li>
                    <em>输入活动要求<i>*</i></em>
                    <div><van-field v-model="formList.require" placeholder="请输入活动要求" /></div>
                </li>
                <li>
                    <em>备注</em>
                    <div><van-field v-model="formList.remark" placeholder="请输入备注" /></div>
                </li>
                <li>
                    <em>封面图</em>
                    <div>
                        <el-upload
                                class="upload-demo"
                                action="/activity/cover/upload"
                                :loadingTxt="loadTxt"
                                :http-request="pmUpload"
                                :on-success="handleSuccess"
                                :on-error="handleError"
                                :on-preview="handlePreview"
                                :on-remove="handleRemove"
                                :on-change="pmfileChange"
                                :before-upload="beforeUpload"
                                :file-list="pmfiles"
                                list-type="picture"
                                style="margin:5px 10px 0"
                                accept=".jpg, .jpeg, .png, .gif, .bmp, .JPG, .JPEG, .PBG, .GIF, .BMP"
                            >
                                <el-button size="mini" type="primary">上传素材</el-button>
                                <div slot="tip" class="el-upload__tip">只能上传图片文件，且不超过10MB</div>
                            </el-upload>
                        
                    </div>
                </li>
            </ul>
            <div class="bts">
                <van-button type="primary" size="large" @click="submitForm()">创建活动</van-button>
                <van-button type="danger" size="large" @click="backPage()" style="margin:10px 0 0;">返回</van-button>
            </div>
        </div>

        <!-- 开始时间选择 -->
        <van-popup v-model="beiginTimeShow" position="bottom">
            <van-datetime-picker
            title="请选择开始时间"
            :show-toolbar="true"
            v-model="formList.selBeginDate"
            type="date"
            :min-date="minDate"
            @confirm="confirmBegin"
            @cancel="beiginTimeShow =! beiginTimeShow"
            />

        </van-popup>

        <!-- 结束时间选择 -->
        <van-popup v-model="endTimeShow" position="bottom">
            <van-datetime-picker
            title="请选择结束时间"
            :show-toolbar="true"
            v-model="formList.selEndDate"
            type="date"
            :min-date="minDate1"
            @confirm="confirmEnd"
            @cancel="endTimeShow =! endTimeShow"
            />

        </van-popup>

    </div>
</template>

<script>
export default {
name:'creatActivity',
data(){
    return{
        beiginTimeShow:false,
        endTimeShow:false,
        loadTxt: "文件上传中....",
        pmfiles:[],
        formList:{
            token:'',
            name:'',
            startTime:this.getBeginTime(),
            endTime:this.getEndTime(),
            schoolRecommendCount:0,
            classRecommendCount:0,
            content:'',
            require:'',
            remark:'',
            imageUrl:''
        },
        //时间内容
        minDate: new Date(),
        minDate1:new Date(
            (new Date() / 1000 + 86400) * 1000
        ),
        beginDate: new Date().toLocaleDateString(),
        endDate: new Date(
            (new Date() / 1000 + 86400) * 1000
        ).toLocaleDateString(),
    }
},
methods:{
        backPage:function(){
            this.$router.back(-1);
        },
         /////开始附件上传相关功能
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        ///on-change钩子，文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用。
        pdfileChange: function(file, fileList) {
            this.pdfiles = fileList;
        },
        ///文件上传之前的验证操作
        beforeUpload: function(file) {
            const isJPG = file.type === "image/jpeg";
            const isGIF = file.type === "image/gif";
            const isPNG = file.type === "image/png";
            const isBMP = file.type === "image/bmp";
            const isLt2M = file.size / 1024 / 1024 < 10;

            if (!isJPG && !isGIF && !isPNG && !isBMP) {
                this.$vnotify("上传图片必须是JPG/GIF/PNG/BMP 格式");
            }
            if (!isLt2M) {
                vmstu.$vnotify("上传Excel大小不能超过10MB");
            }

            let isPass = (isJPG || isGIF || isPNG || isBMP) && isLt2M;
            if (isPass) {
                this.importLoading = this.$loading({
                    lock: true,
                    text: "正在上传图片....."
                });
            }
            return isPass;
        },
        ///on-change钩子，文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用。
        pmfileChange: function(file, fileList) {
            this.pmfiles = fileList;
        },
        //axios自定义上传(课堂素材)
        pmUpload(obj) {
            let the = this;
            let token = the.$store.state.token;
            // let fOrder = the.formList.PlanMatList.length + 1;
            let param = { file: obj.file, token:token, project:'hjhd', appid:'oss33qcoy', appsecret:'kc05iq63'};
            the.$api.uploadFile("http://58.218.201.43:18000/oss/material/hjhd/uploadMaterial", param, res => {
                the.importLoading.close();
                console.log(res.data);
                console.log(res.data[0].url);
                if (!res.message=="Success") {
                    the.$vnotify("图片上传失败");
                } else {
                    // the.formList.PlanMatList.push(data.planfile);
                    the.formList.imageUrl = res.data[0].url;
                    console.log(the.formList.imageUrl);
                }
            });
        },
        ///on-error钩子，上传失败时的钩子
        handleError: function(err, file, fileList) {
            console.log(err);
            this.importLoading.close();
        },
        ///文件上传成功时的钩子
        handleSuccess: function(response, file, fileList) {
            this.importLoading.close();
            if (!response.success) {
                this.$vnotify("图片上传失败");
            } else {
                this.teachPlan.PlanFileList.push(file);
            }
        },
    
    //确认开始时间并查询课时定位
    confirmBegin: function(value) {
        console.log(value);
        this.formList.startTime = value;
        if (this.formList.startTime > this.formList.entTime) {
            this.$vnotify("开始日期不能大于结束日期");
            return false;
        }
        this.beginDate = value.toLocaleDateString();
        this.beiginTimeShow = !this.beiginTimeShow;
        //this.getOrientation(true);
    },
    //确认结束时间并查询课时定位
    confirmEnd: function(value) {
        typeof(value);
        this.formList.entTime = value;
        if (this.formList.startTime > this.formList.entTime) {
            this.$vnotify("开始日期不能大于结束日期");
            return false;
        }
        this.endDate = value.toLocaleDateString();
        console.log(this.endDate);
        this.endTimeShow = !this.endTimeShow;
       // this.getOrientation(true);
    },
    getBeginTime:function(){
        let date = new Date();
        var myDate = date.getFullYear() + '/' + this.newNum((date.getMonth() + 1)) + '/' + this.newNum(date.getDate());
        return myDate;
    },
    getEndTime:function(){
        let date = new Date();
        var myDate = date.getFullYear() + '/' + this.newNum((date.getMonth() + 1)) + '/' + this.newNum((date.getDate()+1));
        return myDate;
    },
    newNum:function(time){
        let newTime = "";
        if( time < 10){
            newTime='0'+time;
        }else{
            newTime = time;
        }
        return newTime;
    },
    //保存创建活动
    submitForm: function() {
        let the = this;
        let errMsg = "";
        if (the.formList.name == "") {
            errMsg += "请输入活动名称";
        }
        if (the.formList.startTime == "") {
            errMsg += "请输入活动开始日期";
        }
        if (the.formList.entTime == "") {
            errMsg += "请输入活动结束日期";
        }
        if (the.formList.schoolRecommendCount == "") {
            errMsg += "请输入学校推荐作品";
        }
        if (the.formList.classRecommendCount == "") {
            errMsg += "请输入班级推荐作品";
        }
        if (the.formList.content == "") {
            errMsg += "请输入活动内容";
        }
        if (the.formList.require == "") {
            errMsg += "请输入活动要求";
        }
        if (errMsg != "") {
            this.$message({
                dangerouslyUseHTMLString: true,
                showClose: true,
                type: "warning",
                duration: 5000,
                message: errMsg
            });
            return false;
        }
        // const vd = the.$vloading("保存中...");
        // let token = the.$route.query.token;
        let token = the.$store.state.token;
            the.formList.token = token;
        let url = "/activity/race/create";
        let activityInfoJson = JSON.stringify(the.formList);
        let param = { activityInfoJson:activityInfoJson, token:token};
        console.log(param);
        the.$api.post(url, param, data => {
            // vd.clear();
            console.log(data.result);
            the.$vnotify(data.result);
            if (data.status == "success") {
                this.$router.push({path:'/areaAdmin/arActivityList'});
            }else{
                the.$vnotify("创建失败");
            }
        });
    }
}
}
</script>

<style scoped>
.creatActivityM >>> .van-field__icon .van-icon{ font-size:22px;}
.van-field__control::-webkit-input-placeholder{ color: #999999;}
</style>
