<template>
    <div>
        <van-nav-bar
        title="注册"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
        />
        <van-cell-group class="filed">
            <van-field
                v-model="usermoblie"
                required
                clearable
                label="手机号码"
                placeholder="请输入您常用的手机号码"
                :error-message="errMobile"
            />

            <van-field
                v-model="password"
                type="password"
                label="设置密码"
                placeholder="输入6-20位字符"
                :error-message="errPsw"
                required
            />
            
            <van-field
                v-model="repassword"
                type="password"
                label="确认密码"
                placeholder="再次输入设置的密码"
                required
                :error-message="errRePsw"
            />
        </van-cell-group>
        <van-checkbox v-model="checked" style="padding:8px;">我同意用户服务协议</van-checkbox>
        <van-button type="primary" size="large" :disabled="disabled" @click="reg">注册</van-button>
    </div>
</template>

<script>
import { register } from "../../http/api.js"
export default {
  data() {
    return {
      checked: false,
      usermoblie: '',
      password: '',
      repassword: '',
      errMobile: '',
      errPsw: '',
      errRePsw: '',
      disabled: true
    }
  },
  watch: {
    checked(val) {
      this.disabled = !val 
    },
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
    password(curVal,oldVal){
        let psw=curVal;
        if(!/^(\w){6,20}$/.test(psw)){
            this.errPsw="密码由6-20个字母、数字、下划线构成";
              return false;
        }
        this.errPsw="";

    },
    repassword(val) {
      let repsw=val;
      if(repsw !== this.password){
        this.errRePsw="两次密码不一致";
        return false;
      }
        this.errRePsw="";
    }
  },
  methods:{
    onClickLeft(){
        this.$router.push({"path":"/index"})
    },
    reg() {
      if (this.errMobile || this.errPsw || this.errRePsw || !this.usermoblie || !this.password || !this.repassword) {
        return this.$toast('手机号或密码输入错误');
      }
      register({
        mobile: this.usermoblie,
        psw: this.password
      }).then(res => {
        console.log('注册', res)
        localStorage.setItem("id",res.objectId);
        this.$router.push({"path":'/home'});
      })
    }
  }
};
</script>

<style scoped>
.filed{
    margin: 20px 0;
}
</style>
