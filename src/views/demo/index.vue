<template>
    <div>
        <div class="main">
            <div class="head">
                <div class="g-bd">
                    <div class="g-mn2">
                        <div class="g-mnc2">
                            <p>海阁人</p>
                        </div>
                    </div>
                    <div class="g-sd2">
                        <span>OO I CC</span><br>
                        <span style="background-color:blue;color:white;">海阁科技</span>
                    </div>
                    <div style="clear:both;"></div>
                         <p>我们有着一致的目标：成长为一名软件精英人才！</p>
                </div>
            </div>
            <div class="bottom">
                <ul>
                    <li>
                            <van-button type="primary" size="large" @click="toLogin">登录</van-button>
                    </li>
                    <li>
                            <van-button type="primary" size="large" @click="toRegister">注册</van-button>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    methods:{
        toLogin(){
            this.$router.push({"path":'/login'})
        },
        toRegister(){
            this.$router.push({"path":'/register'})
        }
    }
}
</script>
<style scoped>

.main{
    text-align: center;
    width: 100%;
    height: 100%;
    background-image: url(../../assets/background.jpg);
    position: absolute;
    top: 0;
}

.head{
    margin: 0;
    height: 60%;
    position: relative;
    top: 0;
    /* background-color: antiquewhite; */
    
}

.g-bd{
    margin: 120px 30px;
    height: 120px;
    font-size: 12px;
    /* background-color: burlywood; */
    /* position: relative; */
}
/* 两栏布局  主栏右 侧栏左*/
.g-mn2{float:right;width:100%;margin-left:-130px;}
 .g-mnc2{margin-left:120px;}
.g-sd2{float:left;width:120px;} 


.g-mnc2{
    /* background-color: aqua; */
    /* position: absolute; */
    /* top: 0; */
    font-size: 40px;
    line-height: 45px;
    letter-spacing: 5px;
    font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
  
    text-align: left;
}
.g-sd2{
    /* background-color: blue; */
    text-align: right;
    font-size: 16px;
}


li{
    padding:1% 0;
}
</style>
