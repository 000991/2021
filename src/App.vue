<template>
  <div class="mainContainer">
    <div class="holiday">
      <div
        class="user animate__animated animate__infinite"
        :class="{ animate__pulse: isShowAnimate }"
      >
        <!-- animate__flip , animate__zoomInUp-->
        <div
          class="user-photo animate__animated"
          :class="{
            animate__flip: isShowAnimate
          }"
        >
          <img :src="userface" alt="" />
        </div>
        <span
          class="user-text animate__animated"
          :class="{ animate__zoomInDown: isShowAnimate }"
          >{{ userName }}</span
        >
      </div>
      <!-- <div class="zhufu animate__animated" :class="{'animate__zoomInUp':isShowAnimate}">{{ fullTitle }}</div> -->
      <div
        class="zhufu animate__animated"
        :class="{ animate__zoomInDown: isShowAnimate }"
      >
        <div
          class="animate__animated animate__infinite animate__delay-2s"
          :class="{ animate__swing: isShowAnimate }"
        >
          {{ fullTitle }}
        </div>
      </div>
    </div>
  </div>
  <div class="texiao">
    <div
      class="texiao-item animate__animated animate__fadeOutDownBig"
      :style="{ top: item.positionTop + 'px', left: item.positionLeft + 'px' }"
      v-for="(item, i) in texiaoList"
      :key="i"
    >
      <div class="texiao-text animate__animated animate__rotateOut">
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  ref,
  defineComponent,
  reactive,
  computed,
  nextTick,
  onMounted
} from 'vue'
import utils from './utils/utils'
import 'animate.css'
export default defineComponent({
  name: 'App',
  setup() {
    const userName = utils.getQueryParam('user') || '王依寒' // 用户名
    const text = utils.getQueryParam('text') // 从地址栏参数覆盖文字
    const userface = ref('')
    userface.value = require('./assets/1.jpg')
    // const bg1 = ref('')
    // bg1.value = require('./assets/33.jpg')
    // 节日信息配置
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
    var dateYMD = utils.getDateYMD()
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
      // return text || holiday.holidayName + holiday.holidayGreetings
      if (holiday.holidayName === '圣诞') {
        return '🎅' + holiday.holidayName + holiday.holidayGreetings + '🤶'
      } else {
        return holiday.holidayName + holiday.holidayGreetings
      }
    })
    const emotions = utils.emotions()
    function setPageTitle() {
      const a = utils.randomNum(0, emotions.length - 1)
      const b = utils.randomNum(0, emotions.length - 1)
      const c = utils.randomNum(0, emotions.length - 1)
      const d = utils.randomNum(0, emotions.length - 1)
      // document.title = `${emotions[a]}${userName}，${fullTitle.value}${emotions[b]}`
      document.title = `${emotions[a]}${userName}${emotions[c]}${holiday.holidayName}${emotions[d]}${holiday.holidayGreetings}${emotions[b]}`
      setTimeout(() => {
        setPageTitle()
      }, 1000)
    }
    setPageTitle()

    interface toxiao {
      name: string
      positionTop: number
      positionLeft: number
    }
    type toxiaoArray = toxiao[]
    const texiaoList = ref<toxiaoArray>([])
    function setTexiao() {
      // 如果数量超过,就移除
      if (texiaoList.value.length > 100) {
        texiaoList.value = texiaoList.value.slice(80)
      }
      const a = utils.randomNum(0, emotions.length - 1)
      texiaoList.value.push({
        name: emotions[a],
        positionTop: utils.randomNum(-30, 0),
        positionLeft: utils.randomNum(0, window.innerWidth - 50)
      })

      setTimeout(() => {
        setTexiao()
      }, 500)
    }
    setTexiao()

    // 设置背景
    function setStyleBackgroud(background: string) {
      document.body.style.background = background
    }

    const isShowAnimate = ref(true)
    // 切换动画样式
    async function clickToggcleClass() {
      isShowAnimate.value = false
      await nextTick()
      setTimeout(() => {
        isShowAnimate.value = true
      }, 100)
    }

    onMounted(() => {
      // 禁用右键
      // window.oncontextmenu = function (e: Event) {
      //   e.preventDefault()
      // }
      document.body.addEventListener('click', clickToggcleClass, true)
    })
    return {
      userface,
      userName,
      fullTitle,
      isShowAnimate,
      texiaoList,
      clickToggcleClass
    }
  },
  methods: {}
})
</script>

<style lang="scss">
// @import url('https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css');
* {
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
  font-size: 80px;
}
.user {
  display: flex;
  justify-content: center;
  justify-items: center;
  padding-bottom: 20px;
  .user-photo {
    width: 160px;
    height: 160px;
    overflow: hidden;
    margin-right: 30px;
    border-radius: 50%;
    img {
      width: 100%;
    }
  }
  .user-text {
    line-height: 160px;
    color: #351c75;
    // text-shadow: 0 4px 10px rgba(0, 0, 0, 0.7);
    text-shadow: 0 -6px 4px #ff0000, /*上*/ 4px -4px 4px #46ff00,
      /*右上*/ 6px 0 4px #32003c, /*右*/ 4px 4px 4px #ffffff,
      /*右下*/ 0 6px 4px #ffd500, /*下*/ -4px 4px 4px #ee00ff,
      /*左下*/ -6px 0 4px #0021ff, /*左*/ -4px -4px 4px #000000;
  }
}
.zhufu {
  --animate-duration: 3s;
  color: #ee3e3e;
  // text-shadow: 0 0 4px #32003c;
  text-shadow: 0 0 10px #efebf0;
}
.texiao {
  position: absolute;
  top: 0;
  left: 10px;
  .texiao-item {
    position: absolute;
    top: 0;
    // width: 50px;
    // height: 50px;
    font-size: 130px;
    --animate-duration: 10s;

    .texiao-text {
    }
  }
}
</style>
