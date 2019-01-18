<template>
    <div class="links">
        <router-link to="/student/sActivityList">学生活动列表</router-link>
        <router-link to="/student/sActivityContent">学生活动详情</router-link>
        <router-link to="/teacher/tActivityList">教师活动列表</router-link>
        <router-link to="/teacher/tActivityContent">教师活动详情</router-link>
         <router-link to="/schoolAdmin/scActivityList">教师活动列表</router-link>
        <router-link to="/schoolAdmin/scActivityContent">教师活动详情</router-link>
    </div>
</template>

<script>
export default {
name:'links'
}
</script>

<style>
.links a{ display: block; height:40px; line-height: 40px; background: #F00; color: #FFF; text-align: center; margin: 10px; border-radius: 50px;}
</style>
