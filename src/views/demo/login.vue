<template>
    <div>
       <van-nav-bar
        title="登录"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
        />

        <van-cell-group class="account">
            <van-field
                v-model="usermoblie"
                placeholder="手机/13430200124" 
                label="用户名"
                left-icon="contact"
                :error-message="errMobile"
                
            />
            <van-field
                v-model="psw"
                left-icon="lock"
                type="password"
                label="密码"
                placeholder="请输入密码/123456"
                :error-message="errPsw"
               
            />
        </van-cell-group>
        <van-button type="primary" size="large" @click="onLogin">登录</van-button>
        <span @click="onRegister">立即注册</span>
    </div>
</template>

<script>
    // 步骤1 导入api的函数，使用GetUserByParam函数
    import {GetUserByParam} from "../../http/api.js"
    export default{
        data(){
            return{
                "usermoblie":"",
                "psw":"",
                "errMobile":"",
                "errPsw":""
            }
        },
        watch:{
            //验证手机号
            usermoblie(curVal,oldVal){
                let phone=curVal;
                if(!(/^1[34578]\d{9}$/.test(phone))){ 
                    this.errMobile="手机格式错误";
                    return false; 
                } 
                this.errMobile="";
            },
            //验证密码
            psw(curVal,oldVal){
                let psw=curVal;
                if(!psw){
                    this.errPsw="密码不能为空！";
                     return false;
                }
                this.errPsw="";

            }
        },
        methods:{
            onClickLeft(){
                this.$router.push({"path":"/index"})
            },
            onRegister(){
                this.$router.push({"path":"/register"})
            },
    
    // 步骤2 链接接口
            onLogin(){
                if(this.errPsw || this.errMobile || !this.usermoblie || !this.psw){
                    return;
                }
                GetUserByParam({
                    "mobile":this.usermoblie,
                    "psw":this.psw
                })
                .then( res => {
                    if(res.results.length!=0){
                         console.log(res.results);
                        //  成功后的跳转和状态保存

                        localStorage.setItem("id",res.results[0].objectId);
                        this.$router.push({"path":'/home'});
                    }
                    else{
                         this.errPsw="手机或密码错误！";
                    }
                })
                .catch( err =>{
                    console.log(err);
                })

            }
        }
    }
</script>

<style scoped>
.account{
    margin: 50px 0;
}
</style>

