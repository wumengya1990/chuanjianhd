<template>
    <div class="creatActivity mianScroll">
        <div class="creatActivityM">
            <ul>
                <li>
                    <em>活动名称</em>
                    <div><van-field v-model="formList.useid" placeholder="请输入用户名" /></div>
                </li>
                <li>
                    <em>活动开始时间</em>
                    <div><van-field v-model="formList.beiginTime" placeholder="请输入活动开始时间" icon="clock-o" @click="beiginTimeShow=true" /></div>
                </li>
                <li>
                    <em>活动截止时间</em>
                    <div><van-field v-model="formList.endTime" placeholder="请输入活动截止时间" icon="clock-o" @click="endTimeShow=true" /></div>
                </li>
                <li>
                    <em>输入各学校推荐作品数量</em>
                    <div><van-field v-model="formList.schoolWorkNum" placeholder="请输入用户名" /></div>
                </li>
                <li>
                    <em>输入各班级推荐作品数量</em>
                    <div><van-field v-model="formList.classWorkNum" placeholder="请输入用户名" /></div>
                </li>
                <li>
                    <em>输入活动内容</em>
                    <div> <van-field v-model="formList.hdnr" type="textarea" placeholder="请输入活动内容" rows="1" autosize /></div>
                </li>
                <li>
                    <em>输入活动要求</em>
                    <div><van-field v-model="formList.hdyq" placeholder="请输入活动要求" /></div>
                </li>
                <li>
                    <em>备注</em>
                    <div><van-field v-model="formList.hdbz" placeholder="请输入备注" /></div>
                </li>
                <li>
                    <em>封面图</em>
                    <div><van-field v-model="formList.useid" placeholder="请输入用户名" /></div>
                </li>
            </ul>
            <div class="bts">
                <van-button type="primary" size="large" @click="submitForm()">大号按钮</van-button>
            </div>
        </div>

        <!-- 开始时间选择 -->
        <van-popup v-model="beiginTimeShow" position="bottom">
            <van-datetime-picker
            title="请选择开始时间"
            :show-toolbar="true"
            v-model="currentDate"
            type="date"
            @change="onChangeB"
            @confirm="onConfirmB"
            @cancel="onCancelB"
            />

        </van-popup>

        <!-- 结束时间选择 -->
        <van-popup v-model="endTimeShow" position="bottom">
            <van-datetime-picker
            title="请选择结束时间"
            :show-toolbar="true"
            v-model="currentDate"
            type="date"
            @change="onChangeE"
            @confirm="onConfirmE"
            @cancel="onCancelE"
            />

        </van-popup>

    </div>
</template>

<script>
export default {
name:'creatActivity',
data(){
    return{
        currentDate: new Date(),
        beiginTimeShow:false,
        endTimeShow:false,
        formList:{
            useid:201801,
            beiginTime:{},
            endTime:'',
            schoolWorkNum:0,
            classWorkNum:0,
            hdnr:'',
            hdyq:'',
            hdbz:''
        }
    }
},
methods:{
    submitForm:function(){
        console.log(123);
    },
    onChangeB:function(value,index){
        this.formList.beiginTime = value
        console.log(value)
    },
    onConfirmB:function(){
        this.beiginTimeShow=false
    },
    onCancelB:function(){
        this.beiginTimeShow=false
    },
    onChangeE:function(value){
        this.formList.endTime = value
    },
    onConfirmE:function(){
        this.endTimeShow=false
    },
    onCancelE:function(){
         this.endTimeShow=false
    }
}
}
</script>

<style scoped>
.creatActivityM >>> .van-field__icon .van-icon{ font-size:22px;}
.van-field__control::-webkit-input-placeholder{ color: #999999;}
</style>
