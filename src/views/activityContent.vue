<template>
    <div class="activityContent">
        <van-tabs v-model="active">
            <van-tab title="活动须知">活动须知</van-tab>
            <van-tab title="互动参与">
                <van-list v-model="loading" :finished="finished"  finished-text="没有更多了">
                    <ul>
                        <li>a</li>
                    </ul>
                </van-list>
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
            list:[
                {}
            ],
            loading: false,
            finished: false
        }
    },
    methods:{
        // onLoad(){
        // // 异步更新数据
        // setTimeout(() => {
        //     for (let i = 0; i < 10; i++) {
        //     this.list.push(this.list.length + 1);
        //     }
        //     // 加载状态结束
        //     this.loading = false;

        //     // 数据全部加载完成
        //     if (this.list.length >= 40) {
        //     this.finished = true;
        //     }
        // }, 500);
        // }
    }
}
</script>

<style>

</style>
