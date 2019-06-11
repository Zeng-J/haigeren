<template>
    <div>
        <van-nav-bar
        title="海阁人"
        />

        <!-- 子路由的坑 -->
        <router-view></router-view>

        <!-- 发布动态的输入框 默认隐藏-->
        <van-popup v-model="show" position="bottom">
          <van-nav-bar title="发布动态">
            <van-icon name="cross" slot="left" @click="show=!show"/>
            <van-icon name="success" slot="right" @click="onClickRight"/>
          </van-nav-bar>
            <van-field
            v-model="message"
            type="textarea"
            placeholder="请输入内容"
            rows="6"
            autosize
            />
        </van-popup>

        <van-tabbar v-model="active">
            <van-tabbar-item icon="home-o" to="/home/bbs">
                首页
            </van-tabbar-item>
            <van-tabbar-item icon="friends-o" dot to="/home/schoolmate">
                同窗
            </van-tabbar-item>
            <van-tabbar-item icon="records" @click="show=!show"> 
                发布
            </van-tabbar-item>
            <van-tabbar-item icon="newspaper-o" info="2" to="/home/achievement">
                成就
            </van-tabbar-item>
            <van-tabbar-item icon="user-o" to="/home/user">
                我
            </van-tabbar-item>
        </van-tabbar>
    </div>
</template>
<script>
import {postDynamic} from '@/http/api.js'
export default {
    data() {
    return {
        active: 0,        
        show: false,     //展示发布弹窗
        message:''
    };
    },
    methods: {
    // 发布动态的函数
    onClickRight:function() {     
        // console.log('发布动态内容');
        this.show=!this.show;
        // console.log(this.message);
        if(!this.message) return;
        postDynamic({
            "user_id":localStorage.getItem('id'),
            "content":this.message,
            "city":"somewhere",
            "good":0
        })
        .then( res =>{
            // console.log(res);
            location.reload("/home/bbs");
        })
        .catch(res =>{

        })
    }
    }
};
</script>

<style scoped>

</style>
