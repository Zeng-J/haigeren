<template>
    <div>
        <!-- 发布成就的输入框 默认隐藏-->
        <van-popup v-model="show" position="bottom">
          <van-nav-bar title="添加成就">
            <van-icon name="cross" slot="left" @click="show=!show"/>
            <van-icon name="success" slot="right" @click="addAch()"/>
          </van-nav-bar>
            <van-field
            v-model="title"
            type="text"
            placeholder="请输入标题"
            />
            <van-field
            v-model="content"
            type="textarea"
            placeholder="请输入内容"
            rows="6"
            autosize
            />
        </van-popup>

        <van-collapse v-model="activeNames">
            <van-collapse-item v-for="(item) in list" :key="item.objectId">
                <div slot="title">
                    <span>{{item.createdAt}}</span>
                    {{item.title}}
                </div>
                {{item.content}}
            </van-collapse-item>
        </van-collapse>
        <van-button round type="default" @click="show=!show">添加成就</van-button>
    </div>
</template>

<script>
 //  导入api的函数，使用GetAchieveByParam函数 
    import {GetAchieveByParam,postAch} from "../../http/api.js"

    export default {
        data(){
            return {
                 activeNames: ['1'],
                 list:null,
                 show:false,
                 content:"",
                 title:""
            }
        },
        created(){
            this.GetAchievement();
        },
        methods:{
            // 初始化成就
            GetAchievement(){
                // console.log(localStorage.getItem('id'));
                GetAchieveByParam({
                    user_id:localStorage.getItem('id')
                })
                .then( res => {
                    //  console.log(res);
                    if(res.results.length!=0){
                        //  成功后的跳转和状态保存
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
            // 增加成就
            addAch(){
                if(!this.title || !this.content)  return;
                postAch({
                    user_id:localStorage.getItem("id"),
                    title:this.title,
                    content:this.content
                })
                .then(res =>{
                    // console.log(res);
                    this.show=!this.show;
                    this.list.push({
                        user_id:localStorage.getItem("id"),
                        title:this.title,
                        content:this.content,
                        createdAt:res.createdAt
                    });
                })
                .catch(err => {
                    console.log(err);
                })
            }
        }
    }
</script>