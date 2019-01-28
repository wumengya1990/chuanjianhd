<template>
    <div class="errorPage bgmain mianScroll">
        <dl>
            <dt><img :src="cuowuImg"></dt>
            <dd>服务器异常，<br />请尝试重新登录！</dd>
        </dl>
    </div>
</template>

<script>
export default {
    name:'errorPage',
    data(){
        return{
            cuowuImg:require("./../assets/images/loginNotice.png")
        }
    }
}
</script>

<style>

</style>
