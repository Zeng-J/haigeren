<template>
    <div>
        <!-- 弹窗 个人信息-->
        <van-popup v-model="show_uerMsg" class="popup" >
            <!-- 头像 -->
            <div class="avatar">
                <img :src="logoAddress" alt="" class="logo">
                <div class="u-upload">
                    <button type="button"><van-icon name="records" /></button>
                    <input type="file"/>
            </div>
            </div>
            <van-cell-group>
                <van-field v-model="user_name"  label="昵称" />
                <van-field v-model="mobile"  label="手机号码" disabled  />
                <van-field v-model="email"  label="邮编" />
                <van-field v-model="address"  label="地址" />
            </van-cell-group>
           
            <van-row>
                <van-col span="24"> 
                    <van-button type="default"  size="large" @click="saveUserMsg()">保存</van-button>
                </van-col>
                <van-col span="24">
                     <van-button type="default"  size="large" @click="show_uerMsg=!show_uerMsg">关闭</van-button>
                </van-col>
            </van-row>
        </van-popup>

        <!-- 弹窗 确认退出登录 -->
        <!-- <van-popup v-model="show_logout">
            <van-button type="default"  size="large" @click="show_logout=!show_logout">关闭</van-button>
        </van-popup> -->
        <van-actionsheet v-model="show_logout" title='确认退出'>
            <van-button type="primary"  size="large" @click="logout()">退出</van-button>
            <van-button type="default"  size="large" @click="show_logout=!show_logout">取消</van-button>
        </van-actionsheet>
                    

        <!-- 以下为基础显示 -->
        <div class="avatar">
            <!-- 更改头像按钮 -->
            <img :src="logoAddress" alt="" class="logo">
            <div class="u-upload">
                <button type="button"><van-icon name="records" /></button>
                <input type="file"/>
            </div>
        </div>
        <div class="account">
            <ul>
                <li>{{user_name}}</li>
                <li>{{mobile}}</li>
            </ul>
        </div>
        <van-cell title="个人信息" icon="contact" is-link @click="toUserMsg()"/>
        <van-cell title="账户密码" icon="bag-o" is-link />
        <van-cell title="关于海阁人" icon="info-o" is-link />
        <van-cell title="退出登录" icon="close" is-link @click="show_logout=!show_logout"/>


    </div>
</template>

<script>
    import {getUserMsgById} from "../../http/api.js"
export default {
    data(){
        return {
            show_uerMsg:false,
            show_logout:false,
            user_name:'',
            mobile:null,
            logoAddress:'',
            email:'',
            address:''
            
        }
    },
    created(){
        this.getUserMsg();
    },
    methods:{
        // 初始化获得个人信息
        getUserMsg(){
            // console.log(localStorage.getItem('id'));
            getUserMsgById(localStorage.getItem('id'))
            .then( res => {
                // console.log(res);
                if(res.objectId){
                    console.log('uesr.vue',res);
                    //  成功后的跳转和状态保存
                    this.user_name = res.nick ? res.nick : '游客';
                    this.mobile = res.mobile;
                    this.logoAddress = res.logo ? res.logo : 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=188149577,2949073731&fm=27&gp=0.jpg' ;
                }
                else{
                    alert("获取个人信息错误！")
                }
            })
            .catch( err =>{
                console.log(err);
            })
        },
        // 前往个人详细信息
        toUserMsg(){
            this.show_uerMsg=!this.show_uerMsg;
            getUserMsgById(localStorage.getItem('id'))
            .then( res => {
                // console.log(res);
                if(res.objectId){
                    console.log(res);
                    //  成功后的跳转和状态保存
                    this.user_name = res.nick ? res.nick : '游客';
                    this.mobile=res.mobile;
                    this.email=res.email;
                    this.address=res.address;
                    this.logoAddress = res.logo ? res.logo : 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=188149577,2949073731&fm=27&gp=0.jpg' ;
                }
                else{
                    alert("获取个人信息错误！")
                }
            })
            .catch( err =>{
                console.log(err);
            })
        },
        // 保存更改个人信息
        saveUserMsg(){
            // 修改接口未接
             console.log("保存个人详细信息");
             this.show_uerMsg=!this.show_uerMsg;
        },

        // 注销登录
        logout(){
            this.$router.push({"path":'/index'});
        }
    }
}
</script>

<style scoped>
/* 头像 */
.avatar {
    margin:0 auto;
    width: 120px;
    height: 120px;
    /* background: #7fee1d; */

    /* 为兼容一些浏览器，防止不能实现border-radius */
    -moz-border-radius: 60px;
    -webkit-border-radius: 60px;
    border-radius: 60px;

     position:relative;
} 

.logo{
     margin:0 auto;
    width: 120px;
    height: 120px;

    border-radius: 60px;
}



.account{
    text-align: center;
}

.u-upload{
    height: 28px;
    width: 28px;
    /* background-color: antiquewhite; */
    border-radius: 50%;
    position: absolute;
    right: 2px;
    bottom: 0;

}


.u-upload button{
    height:24px;
    width:24px;
    border-radius: 50%;
    overflow:visible;
    border: cornflowerblue;
    font-size:14px;
    color:white;
    background-color: cornflowerblue;
}
.u-upload input{position:absolute;top:0;right:-1px;font-size:100px;cursor:pointer;opacity:0;filter:alpha(opacity=0);}


/* 弹层大小 */
.popup{
    width: 100%;
    height: 60%;
}
</style>

