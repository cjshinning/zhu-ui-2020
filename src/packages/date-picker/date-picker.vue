<template>
  <div class="zh-date-picker" v-click-outside="handleBlur">
    <zh-input
      suffix-icon="calendar"
      @focus="handleFocus"
      :value="formatDate"
    ></zh-input>
    <div class="zh-date-content" v-if="isVisible">
      <div class="zh-date-picker-header">
        <zh-icon icon="back_android"></zh-icon>
        <zh-icon icon="back"></zh-icon>
        <span>{{ tempTime.year }}年 {{ tempTime.month + 1 }}月</span>
        <zh-icon icon="right"></zh-icon>
        <zh-icon icon="play_forward_fill"></zh-icon>
      </div>
      <div class="zh-date-picker-content">
        <template v-if="mode === 'dates'">
          <div>
            <span v-for="week in weeks" class="cell" :key="week">
              {{ week }}
            </span>
          </div>
          <div v-for="i in 6" :key="`row_${i}`">
            <span v-for="j in 7" :key="`col_${j}`" class="cell"> 1 </span>
          </div>
        </template>

        <template v-if="mode === 'years'"> years </template>
        <template v-if="mode === 'months'"> months </template>

        {{ visibleData }}
      </div>
    </div>
  </div>
</template>

<script>
function getYearMonthDay(date) {
  let year = date.getFullYear();
  let month = date.getMonth();
  let day = date.getDate();
  return [year, month, day];
}

// 这个可以判断点击的是否是自己内部的元素
import clickOutside from "v-click-outside";
export default {
  name: "zh-date-picker",
  directives: {
    clickOutside: clickOutside.directive,
  },
  props: {
    value: {
      //显示的日期
      type: [String, Date],
      default: () => new Date(),
    },
  },
  computed: {
    visibleData() {
      // <!-- 第一种方案 -->
      // <!-- 先算当前月有多少天 找到下一个月1号的前一天 总天数 -->
      // <!-- 再去获取当前1号 是星期几 在前面 再加上那几天 -->
      // <!-- 42 - 刚才加的 + 月的总天数 = 剩下的 -->
      // <!-- 第二种方案 -->
      // <!-- 直接将自己向前移动多少天后 开始循环42天 -->
      let firstDay = new Date(this.tempTime.year, this.tempTime.month, 1);
      let weekDay = firstDay.getDay(); //周日0 周六6
      weekDay = weekDay === 0 ? 7 : weekDay;
      let start = firstDay - weekDay * 60 * 60 * 24 * 1000; //移动当前是星期几
      let arr = [];
      //   循环42个
      for (let i = 0; i < 42; i++) {
        arr.push(new Date(start + i * 60 * 60 * 24 * 1000));
      }
      return arr;
    },
    formatDate() {
      //根据当前的time对象算出一个日期格式
      if (this.value) {
        //控制输入框的内容
        let { year, month, day } = this.time;
        return `${year}-${month + 1}-${day}`;
      }
    },
  },
  data() {
    // 通过用户传入的value算出年月日来 2012-10-04
    let [year, month, day] = getYearMonthDay(this.value || new Date()); //根据当前时间算出一个年月日
    return {
      isVisible: false,
      weeks: ["日", "一", "二", "三", "四", "五", "六"],
      months: [
        "一月",
        "二月",
        "三月",
        "四月",
        "五月",
        "六月",
        "七月",
        "八月",
        "九月",
        "十月",
        "十一月",
        "十二月",
      ],
      mode: "dates", //years months
      time: {
        year,
        month,
        day,
      },
      tempTime: {
        //操作的是这个时间，上面的只是用来显示
        year,
        month,
        day,
      },
    };
  },
  methods: {
    handleFocus() {
      //当点击的是输入框的时候，就让当前的浮层显示出来
      this.isVisible = true;
    },
    handleBlur() {
      //当点击整个div外侧时，需要隐藏弹层
      this.isVisible = false;
    },
  },
};
</script>

<style lang="scss">
@import "@/styles/_var.scss";
.zh-date-picker {
  border: 1px solid red;
  display: inline-block;
  .zh-date-picker-header {
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .zh-date-content {
    position: absolute;
    z-index: 10;
    user-select: none;
    width: 280px;
    background: #fff;
    box-shadow: 1px 1px 2px $primary, -1px -1px 2px $primary;
  }
  .cell {
    width: 40px;
    height: 40px;
    display: inline-block;
    text-align: center;
    line-height: 40px;
  }
}
</style>
