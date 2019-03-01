<template>
<div>
    <!-- 弹窗 -->
    <van-popup v-model="show" class="popup">
        <!-- 头像 -->
        <div class="avatar">
            <img :src="logoAddress" alt="" class="logo">
        </div>
        <van-cell-group>
            <van-field v-model="username"  label="昵称" disabled  />
            <van-field v-model="mobile"  label="手机号码" disabled  />
            <van-field v-model="email"  label="邮编" disabled  />
            <van-field v-model="address"  label="地址" disabled  />
        </van-cell-group>
    </van-popup>

    <!-- 同窗列表 -->
    <van-row>
        <van-col span="6" v-for="(item) in list" :key="item.objectId">
            <img :src="item.logo" alt="" srcset="" class="Logo" @click="getPersonalMsg(item.objectId)">
        </van-col>
    </van-row>
</div>
</template>

<script>
    //  导入api的函数，使用getUserMsgById函数
    import {getUserMsgById} from "../../http/api.js"
    //  导入api的函数，使用GetAllUser函数 
    import {GetAllUser} from "../../http/api.js"
    export default {
        data(){
            return {
                // list:[{mobile:1356,objectId:4646},{mobile:13556,objectId:665},{mobile:1356,objectId:465}]   //获取所用用户信息
                 list:null,
                 show:false,  //同窗详细信息
                 username:'',
                 mobile:null,
                 email:'',
                 address:'',
                 logoAddress:''
            };
        },
        created(){
            this.GetAll();
        },
        methods:{
            // 获得所有同窗列表
            GetAll(){
                GetAllUser()
                .then( res => {
                    if(res.results.length!=0){
                        //  成功后的跳转和状态保存
                        // console.log(res);
                        // console.log(res.results);
                        // console.log(res.results[0]);
                        this.list=res.results;
                    }
                    else{
                        console.log('获取失败');
                    }
                })
                .catch( err =>{
                    console.log(err);
                })
            },
            // 获得个人信息
            getPersonalMsg:function(objectId){
                this.show=!this.show;
                console.log('获取同窗信息');
                console.log(objectId);
                        getUserMsgById(objectId)
                        .then( res => {
                            // console.log(res);
                            if(res.objectId){
                                console.log(res);
                                //  成功后的跳转和状态保存
                                this.username=res.nick;
                                this.mobile=res.mobile;
                                this.email=res.email;
                                this.address=res.address;
                                this.logoAddress=res.logo;
                            }
                            else{
                                alert("获取个人信息错误！")
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
/* 弹层大小 */
.popup{
    width: 100%;
    height: 60%;
}

/* 详细信息中的头像 */
.avatar {
    margin:2px auto;
    width: 120px;
    height: 120px;
    /* background: #7fee1d; */

    /* 为兼容一些浏览器，防止不能实现border-radius */
    -moz-border-radius: 60px;
    -webkit-border-radius: 60px;
    border-radius: 60px;
} 
.avatar .logo{
     margin:0 auto;
    width: 120px;
    height: 120px;

    border-radius: 60px;
}



 /* Logo头像 */
.Logo{
    width: 100%;
    height: 70px;
}
</style>
