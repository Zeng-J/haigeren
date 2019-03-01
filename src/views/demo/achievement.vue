<template>
    <div>
        <van-collapse v-model="activeNames">
            <van-collapse-item v-for="(item) in list" :key="item.objectId">
                <div slot="title">
                    <span>{{item.createdAt}}</span>
                    {{item.title}}
                </div>
                {{item.content}}
            </van-collapse-item>
        </van-collapse>
    </div>
</template>

<script>
 //  导入api的函数，使用GetAchieveByParam函数 
    import {GetAchieveByParam} from "../../http/api.js"

    export default {
        data(){
            return {
                 activeNames: ['1'],
                 list:null
            }
        },
        created(){
            this.GetAchievement();
        },
        methods:{
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

            }
        }
    }
</script>