<template>
  <div class="mainContainer">
    <div class="holiday" @click="clickToggcleClass">
      <div class="user">
        <div class="user-photo animate__animated" :class="{'animate__flip':isShowAnimate}">
          <img :src="userface" alt="">
        </div>
        <span class="user-text animate__animated" :class="{'animate__zoomInDown':isShowAnimate}">{{ userName }}</span>
      </div>
      <!-- <div class="zhufu animate__animated" :class="{'animate__zoomInUp':isShowAnimate}">{{ fullTitle }}</div> -->
      <div class="zhufu animate__animated" :class="{'animate__zoomInDown':isShowAnimate}">{{ fullTitle }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, reactive, computed, nextTick } from 'vue'
import utils from './utils/utils'
import 'animate.css'
export default defineComponent({
  name: 'App',
  setup () {
    const userName = utils.getQueryParam('user') || 'HAHA' // 用户名
    const text = utils.getQueryParam('text') // 显示文字
    const userface = ref('')
    userface.value = require('./assets/1.jpg')
    // const bg1 = ref('')
    // bg1.value = require('./assets/33.jpg')
    const holiday = reactive({
      holidayName: '', // 节日名称
      holidayGreetings: '快乐!', // 祝福语
      default: {
        background: 'radial-gradient(#FFF68F, #FFD700)',
        backgroundImage: ''
      },
      pingan: {
        background: 'radial-gradient(#a8e063, #56ab2f)' // `url(${bg1.value}) no-repeat` //
      },
      shengdan: {
        background: 'radial-gradient(#F08080, #FF0000)'
      },
      yuandan: {
        background: ''
      },
      newyear: {
        background: ''
      }
    })
    var dateYMD = getDateYMD()
    const md = `${dateYMD.m}-${dateYMD.n}`
    switch (md) {
      case '12-24':
        holiday.holidayName = '平安夜'
        setStyleBackgroud(holiday.pingan.background)
        break
      case '12-25':
        holiday.holidayName = '圣诞'
        setStyleBackgroud(holiday.shengdan.background)
        break
      case '1-1':
        holiday.holidayName = '元旦'
        setStyleBackgroud(holiday.yuandan.background)
        break
      default:
        holiday.holidayName = ''
        holiday.holidayGreetings = '快乐每一天!'
        setStyleBackgroud(holiday.default.background)
        break
    }
    // 显示内容
    const fullTitle = computed(() => {
      return (
        (text || holiday.holidayName + holiday.holidayGreetings)
      )
    })

    document.title = userName + '，' + fullTitle.value

    function getDateYMD () {
      var date = new Date()
      var y = date.getFullYear()
      var m = date.getMonth() + 1
      var n = date.getDate()
      // return y + '-' + m + '-' + n
      return {
        y, m, n
      }
    }
    // 设置背景
    function setStyleBackgroud (background: string) {
      document.body.style.background = background
    }

    const isShowAnimate = ref(true)
    // 切换动画样式
    async function clickToggcleClass () {
      isShowAnimate.value = false
      await nextTick()
      setTimeout(() => {
        isShowAnimate.value = true
      }, 100)
    }
    return {
      userface,
      userName,
      fullTitle,
      isShowAnimate,
      clickToggcleClass
    }
  },
  methods: {}
})
</script>

<style lang="scss">
// @import url('https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css');
*{
  padding: 0;
  margin: 0;
}
body {
  /* background: radial-gradient(#a8e063, #56ab2f); */
  display: block;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  color: #fff;
  font-family: 'Verdana', sans-serif;
  overflow: hidden;
}
.mainContainer {
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  width: 100%;
}
.holiday {
  text-align: center;
  font-size: 46px;
}
.user{
  display: flex;
  justify-content: center;
  justify-items: center;
  padding-bottom: 20px;
  .user-photo{
    width: 80px;
    height: 80px;
    overflow: hidden;
    margin-right: 10px;
    border-radius: 50%;
    img{
      width: 100%;
    }
  }
  .user-text{
    line-height: 80px;
    color: #351c75;
    // text-shadow: 0 4px 10px rgba(0, 0, 0, 0.7);
    text-shadow: 0 -6px 4px #ff0000, /*上*/ 4px -4px 4px #46ff00, /*右上*/ 6px 0 4px #32003c, /*右*/ 4px 4px 4px #ffffff, /*右下*/ 0 6px 4px #ffd500, /*下*/ -4px 4px 4px #ee00ff, /*左下*/ -6px 0 4px #0021ff, /*左*/ -4px -4px 4px #000000;
  }
}
.zhufu{
  animation-duration: 1.5s;
  color: #ee3e3e;
  text-shadow: 0 0 4px #32003c
}
</style>
