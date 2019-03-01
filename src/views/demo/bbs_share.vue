<template>
    <div>
      分享
      <van-button type="primary" @click="show=!show">主要按钮</van-button>

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

    </div>
</template>

<script>

export default {
  data() {
    return {
      show: false,
      message:''
    }
  },
  methods: {
    onClickRight() {
     console.log('发布动态内容')
    }
  }
}
</script>