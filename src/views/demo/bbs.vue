<template>
<div>
  <!-- 注意这个list不是后端那个动态表了，而是自己自定义拼接 -->
  <van-row class="bbs" v-for="(item,i) in list" :key="item.dynamic_id">   
      <van-col span="6">
            <img :src="item.logo" alt="" class="logo">
      </van-col>
      <van-col span="18">
        <van-row>
          <van-col span='24'><p>{{item.nick}}</p></van-col>
        </van-row>
        <van-row>
          <van-col span='9'><p>{{item.createdAt|currentTime()}}</p></van-col>
          <van-col span='8'><p>{{item.city}}</p></van-col>
          <van-col span='6' style=" text-align: right;">{{item.good}}<van-icon :name="item.name" @click="addGood(item.dynamic_id,item.good,i)"/></van-col>
        </van-row>
        <van-field v-model="item.content" type="textarea" rows="2" autosize/>
      </van-col>
  </van-row>
  <div class="gap">
        <p>没有更多了，亲！</p>
  </div>
  


</div>
</template>

<script>
//  导入api的函数
import {GetAllDynamic,getUserMsgById,putDynamic} from "../../http/api.js"
export default {
    data(){
      return{
        list:[]
      }
    },
    created(){
      this.getInfo();
    },
    methods:{
      // 初始化所有动态
      getInfo:function(){
        console.log('获取所有动态');
        GetAllDynamic()
        .then( res_dynamic => {
          let oldthis=this;      //因为下面set.forEach函数里直接用this.list用不到，必须提前把this保存下来
            if(res_dynamic.results.length!=0){
                // console.log('this',oldthis);
                
                //  成功后的跳转和状态保存
        // =======================================================
                // 用set来保存user_id原因是：不重复保存user_id（因为一个可能发了很多条动态，他的动态的user_id是相同的），减少根据user_id访问后端用户表的次数
                let set=new Set();
                for(var i=0;i<res_dynamic.results.length;i++){
                  set.add(res_dynamic.results[i].user_id);
                }
                // console.log('set',set);
                var map=new Map();
                var num=0;
                
                // 根据user_id遍历访问后端用户表
                set.forEach(
                  function(value){                     //这里是有三个默认参数的，但这里只用到第一个参数
                          getUserMsgById(value)
                          .then( res => {
                            if(res.objectId){
                            // ---------------------------------------------
                                map.set(value,res)       //每个user_id对应一个对象， 如 "Tmqw555c" => {"objectId": "Tmqw555c","createdAt": "2019-02-22 17:31:26","mobile": "13430200124","nick": "曾杰"...}
                                num++;
                                if(num==set.size){
                                  for(var i=0;i<res_dynamic.results.length;i++){
                                    oldthis.list.push({
                                      'dynamic_id':res_dynamic.results[i].objectId,
                                      'user_id':res_dynamic.results[i].user_id,
                                      'good':res_dynamic.results[i].good,
                                      'createdAt':res_dynamic.results[i].createdAt,
                                      'content':res_dynamic.results[i].content,
                                      'city':res_dynamic.results[i].city,
                                      'nick':map.get(res_dynamic.results[i].user_id).nick,
                                      'logo':map.get(res_dynamic.results[i].user_id).logo,
                                      'name':'like-o'                               //这是用点赞图标显示样式用的
                                    });
                                  }
                                }

                            // ---------------------------------------------  
                            }
                            else{
                                console.log('获取失败');
                            }
                          })
                          .catch( err =>{
                              console.log(err);
                          })
                  }
                );
            }
        // =======================================================
            else{
                console.log('获取失败');
            }
        })
        .catch( err =>{
            console.log(err);
        })
      },




      // ==============增加点赞数=====================================================================================================
      addGood:function(dynamic_id,good,i){
        if(this.list[i].name=='like'){
        // ------------------取消点赞-start---------------------------------------------------------
        putDynamic(dynamic_id,{
              "good":(good-1)
        })
        .then( res => {
                // console.log(res);
                if(res.updatedAt){
                    this.list[i].good-=1;                    //使点赞数+1
                    this.list[i].name='like-o'; 
                }
                else{
                    console.log("点赞失败");
                }
            })
        .catch( err =>{
                console.log(err);
        })
        // ------------------取消点赞-end---------------------------------------------------------
          return;
        }
        console.log('点赞');
        console.log(dynamic_id);
        putDynamic(dynamic_id,{
              "good":(good+1)
        })
        .then( res => {
                // console.log(res);
                if(res.updatedAt){
                    // console.log('bbs.vue',res);
                    // window.location.reload();
                    // console.log(i);
                    // console.log(this.list[i].good);
                    this.list[i].good+=1;                    //使点赞数+1
                    this.list[i].name='like'; 
                }
                else{
                    console.log("点赞失败");
                }
            })
        .catch( err =>{
                console.log(err);
        })
      }
    },

    filters:{
      currentTime:function(createdTime){
        var myDate = new Date();
        // return myDate.toLocaleString();          //2019/2/25 上午 11:08:33 
        // return myDate.toLocaleTimeString();   //上午 11:08:33
        // console.log(createdTime.substr(0,4));
        //  console.log(createdTime.substr(5,2));
        // console.log(myDate.getMonth()+1+'');
        if(!(myDate.getFullYear()-createdTime.substr(0,4))){
            if(!(myDate.getMonth()+1-createdTime.substr(5,2))){
              if(!(myDate.getDate()-createdTime.substr(8,2))){
                      return "今天"+createdTime.substr(11,5);
              }
            }
        }
        // console.log(myDate.getMonth()+1-createdTime.substr(5,2))
        return createdTime.substr(0,10);
      }
    }
}
</script>

<style scoped>
.bbs{
  border-bottom: 1.5px inset ;
  border-block-end-color:ghostwhite;
}

 /* Logo头像 */
.logo{
    width: 60%;
    height: 60%;
    border-radius: 50%;
}

.gap{
  height: 90px;
  text-align: center;
  font-size: 100%;
  color:olive;
}
</style>
