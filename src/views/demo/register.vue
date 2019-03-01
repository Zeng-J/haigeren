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
                v-model="username"
                required
                clearable
                label="手机号码"
                placeholder="请输入您常用的手机号码"
            />

            <van-field
                v-model="password"
                type="password"
                label="设置密码"
                placeholder="输入6-20位字符"
                required
            />
            
            <van-field
                v-model="repassword"
                type="password"
                label="确认密码"
                placeholder="再次输入设置的密码"
                required
            />
        </van-cell-group>
        <van-checkbox v-model="checked">我同意用户服务协议</van-checkbox>
        <van-button type="primary" size="large">注册</van-button>
    </div>
</template>

<script>
export default {
  data() {
    return {
      checked: true,
      username:'',
      password:'',
      repassword:''
    }
  },
  methods:{
    onClickLeft(){
        this.$router.push({"path":"/index"})
    },
  }
};
</script>

<style scoped>
.filed{
    margin: 20px 0;
}
</style>
