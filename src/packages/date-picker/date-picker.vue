<template>
  <div class="zh-date-picker" v-click-outside="handleBlur">
    <zh-input
      suffix-icon="calendar"
      @focus="handleFocus"
      :value="formatDate"
      @change="handleChange"
    ></zh-input>
    <div class="zh-date-content" v-if="isVisible">
      <div class="zh-date-picker-content">
        <template v-if="mode === 'dates'">
          <div class="zh-date-picker-header">
            <zh-icon icon="back_android" @click="changeYear(-1)"></zh-icon>
            <zh-icon icon="back" @click="changeMonth(-1)"></zh-icon>
            <span
              ><b @click="mode = 'years'">{{ tempTime.year }}</b> 年
              <b @click="mode = 'months'">{{ tempTime.month + 1 }}</b> 月</span
            >
            <zh-icon icon="right" @click="changeMonth(1)"></zh-icon>
            <zh-icon icon="play_forward_fill" @click="changeYear(1)"></zh-icon>
          </div>
          <div>
            <span v-for="week in weeks" class="cell" :key="week">
              {{ week }}
            </span>
          </div>
          <div v-for="i in 6" :key="`row_${i}`">
            <span
              v-for="j in 7"
              :key="`col_${j}`"
              class="cell cell-date"
              :class="{
                isNotCurrentMonth: !isCurrentMonth(getCurrentDate(i, j)),
                isToday: isToday(getCurrentDate(i, j)),
                isSelect: isSelect(getCurrentDate(i, j)),
              }"
              @click="selectDate(getCurrentDate(i, j))"
            >
              <!-- 九九乘法表 -->
              {{ getCurrentDate(i, j).getDate() }}
            </span>
          </div>
        </template>

        <template v-if="mode === 'years'">
          <div class="zh-date-picker-header">
            <zh-icon icon="back_android" @click="changeYear(-10)"></zh-icon>
            <span
              ><b @click="mode = 'years'"
                >{{ startYear }}年{{ startYear + 9 }}年</b
              ></span
            >
            <zh-icon icon="play_forward_fill" @click="changeYear(10)"></zh-icon>
          </div>
        </template>

        <template v-if="mode === 'months'">
          <div class="zh-date-picker-header">
            <zh-icon icon="back" @click="changeYear(-1)"></zh-icon>
            <span
              ><b @click="mode = 'years'">{{ this.tempTime.year }}年</b></span
            >
            <zh-icon icon="right" @click="changeYear(1)"></zh-icon>
          </div>
        </template>
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
  watch: {
    value(newValue) {
      //监控value值变化 重新渲染页面
      // 根据最新的value来更新 this.time / this.tempTime
      let [year, month, day] = getYearMonthDay(newValue);
      this.time = {
        year,
        month,
        day,
      };
      this.tempTime = { ...this.time }; //拷贝一个time用于后续选择的更新
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
        return `${year}-${(month + 1 + "").padStart(2, 0)}-${(
          day + ""
        ).padStart(2, 0)}`;
      }
    },
    startYear() {
      return this.tempTime.year - (this.tempTime.year % 10);
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
      this.mode = "dates";
    },
    getCurrentDate(i, j) {
      return this.visibleData[(i - 1) * 7 + (j - 1)];
    },
    isCurrentMonth(date) {
      let { year, month } = this.tempTime; //取出来当前用户选的是哪年哪月
      let [y, m] = getYearMonthDay(date);
      return year === y && m === month; //判断当前年月是否相等
    },
    isToday(date) {
      let [y, m, d] = getYearMonthDay(date);
      let [year, month, day] = getYearMonthDay(new Date());
      return year === y && month === m && day === d;
    },
    selectDate(date) {
      //选择日期
      this.$emit("input", date); //更改日期
      this.handleBlur(); //隐藏面板
    },
    isSelect(date) {
      //判断当前是否选择
      let { year, month, day } = this.time; //当前选中的年月日
      let [y, m, d] = getYearMonthDay(date);
      return year === y && month === m && day === d;
    },
    // 更改年月，让系统计算，不要自己考虑边界
    changeYear(count) {
      const oldDate = new Date(this.tempTime.year, this.tempTime.month);
      const newDate = oldDate.setFullYear(oldDate.getFullYear() + count);
      let [year] = getYearMonthDay(new Date(newDate));
      this.tempTime.year = year;
    },
    changeMonth(count) {
      // 更改月不要直接+-
      const oldDate = new Date(this.tempTime.year, this.tempTime.month);
      const newDate = oldDate.setMonth(oldDate.getMonth() + count);
      let [year, month] = getYearMonthDay(new Date(newDate));
      this.tempTime.year = year;
      this.tempTime.month = month;
    },
    handleChange(e) {
      //失去焦点时更新用户输入
      let newValue = e.target.value;
      let regExp = /^(\d{4})-(\d{1,2})-(\d{1,2})$/;
      if (newValue.match(regExp)) {
        //更新输入框内容
        // 自己兼容 不用额外算 情况太多容易考虑不全
        this.$emit("input", new Date(RegExp.$1, RegExp.$2 - 1, RegExp.$3));
      } else {
        e.target.value = this.formatDate; //将原来的值赋回去，不用了
      }
      this.handleBlur();
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
.cell {
  font-weight: 400;
}
.cell-date:hover:not(.isNotCurrentMonth):not(.isSelect) {
  color: $primary;
}
.isNotCurrentMonth {
  color: #ccc;
}
.isSelect {
  color: #fff;
  background: $primary;
  border-radius: 50%;
}
.isToday {
  color: $primary;
  font-weight: bold;
  background: #fff;
}
</style>
