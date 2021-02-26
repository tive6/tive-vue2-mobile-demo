<template>
  <van-popup v-model="popupShow"
             lock-scroll
             position="bottom">
    <div class="custom-calendar-wrap">
      <div class="calendar-header">
        <van-icon name="arrow-left"
                  size="24px"
                  @click="closePopup" />
        <div class="back-title">
          选择日期
        </div>
      </div>
      <div v-if="quickSelect"
           class="custom-quick-wrap">
        <div v-for="(item, index) in quickList"
             :key="index"
             class="custom-quick-date"
             :class="{'custom-quick-active': index===quickIndex}"
             @click="quickChange(item, index)">
          {{ item.text }}
        </div>
      </div>
      <div class="popupShowContainer">
        <van-tabs v-model="activeTab"
                  color="#5086FF"
                  offset-top="10"
                  @click="handleClick">
          <van-tab title="按日"
                   :name="1"
                   :disabled="disableTab===1">
            <div v-if="activeTab===1"
                 class="dateWrapper">
              <van-calendar ref="calendar"
                            style="height:100%;"
                            :type="mode"
                            :allow-same-day="true"
                            :poppable="false"
                            color="#5086FF"
                            :show-confirm="false"
                            :default-date="null"
                            :min-date="minDate"
                            :max-date="maxDate"
                            :show-title="false"
                            :show-subtitle="false"
                            @select="handleDayClick" />
            </div>
          </van-tab>
          <van-tab title="按月"
                   :name="3"
                   :disabled="disableTab===3">
            <div v-if="activeTab===3"
                 ref="monthBody"
                 class="dateWrapper">
              <div v-for="(year, index) in yearList"
                   :key="index">
                <div class="yearName">{{ year }}</div>
                <div class="monthContainer">
                  <div v-for="(month, i) in monthList"
                       :key="i"
                       class="monthName"
                       @click="monthClick({year, index}, {month,i})">
                    <div class="monthTouch"
                         :class="{
                           'monthTouch-action':monthColor(index,i),
                           'disabled': monthDisabled(year, month),
                           'startMonthStyle': showStartTag(index, i),
                           'endMonthStyle': showEndTag(index, i)
                         }">
                      {{ month }}月
                      <div style="margin-top: 8px;">
                        <span v-if="showStartTag(index, i)"
                              class="monthTag">
                          开始
                        </span>
                        <span v-if="showSlash(year, month)">/</span>
                        <span v-if="showEndTag(index,i)"
                              class="monthTag">
                          结束
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <span ref="monthBottom" />
            </div>
          </van-tab>
        </van-tabs>
      </div>
      <div class="chosen-date">
        <div class="show-date">
          <div><span class="date-title">开始时间:</span>{{ startDate }}</div>
          <div><span class="date-title">结束时间:</span>{{ endDate }}</div>
        </div>
        <div class="date-confirm"
             :class="{'disable-confirm': !(startDate&&endDate)}"
             @click="handleConfirm">
          确定
        </div>
      </div>
    </div>
  </van-popup>
</template>
<script>
import { Calendar, Tab, Tabs } from 'vant';
import moment from 'moment';

export default {
  components: {
    'van-tab': Tab,
    'van-tabs': Tabs,
    'van-calendar': Calendar,
  },
  props: {
    disableTab: {
      type: Number,
    },
    defaultTab: {
      default: 1,
      validate(value) {
        return [1, 3].includes(value);
      },
    },
    monthRange: {
      type: Boolean,
      default: false,
    },
    minDate: {
      default: () => new Date('2019-01-01'),
    },
    maxDate: {
      default: () => new Date(moment().format('YYYY-MM-DD')),
    },
    availableDate: {
      type: Array,
      default: () => [],
    },
    mode: {
      type: String,
      default: 'range',
    },
    quickSelect: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      activeTab: '',
      startDate: '',
      endDate: '',
      // minDate: new Date(2019, 0, 1),
      defaultWeek: [],
      popupShow: false,
      showDay: false,
      showWeek: true,
      yearList: [],
      monthList: [],
      startMonth: {
        year: '',
        month: '',
        exist: false,
        yearIndex: undefined,
        monthIndex: undefined,
      },
      endMonth: {
        year: '',
        month: '',
        exist: false,
        yearIndex: undefined,
        monthIndex: undefined,
      },
      quickDayList: [
        {
          text: '近30日',
          data: 30,
        },
        {
          text: '近60日',
          data: 60,
        },
        {
          text: '近90日',
          data: 90,
        },
      ],
      quickMonthList: [
        {
          text: '近6个月',
          data: 6,
        },
        {
          text: '近12个月',
          data: 12,
        },
        {
          text: '近24个月',
          data: 24,
        },
      ],
      quickIndex: null,
      quickList: [],
    };
  },
  computed: {
  },
  created() {
    if (this.defaultTab) {
      this.activeTab = this.defaultTab;
    }
    const all = [];
    const month = [];
    for (let i = 0; i < this.moment().format('YYYY') - 2019 + 1; i += 1) {
      all.push(this.moment().subtract(i, 'years').format('YYYY'));
    }
    for (let i = 0; i < 12; i += 1) {
      month[i] = i + 1;
    }
    this.yearList = all.reverse();
    this.monthList = month;
    this.popupShow = true;

    if (this.disableTab === 3) {
      this.quickList = this.quickDayList;
    } else {
      this.quickList = this.quickMonthList;
    }
  },
  mounted() {
    if (this.activeTab === 1) {
      this.$nextTick(() => {
        // 日历定位到最底部
        const element = document.getElementsByClassName('van-calendar__body');
        if (element[0]) {
          element[0].scrollTop = element[0].scrollHeight;
        }
      });
    }
    if (this.disableTab) {
      const element = document.getElementsByClassName('van-tabs__wrap');
      if (element[0]) {
        element[0].style.display = 'none';
      }
    }
  },
  methods: {
    quickChange(item, index) {
      this.quickIndex = index;
      console.log(item);
      // return false
      const { data } = item;
      let startDate = '';
      let endDate = '';
      if (this.disableTab === 1) {
        // 月
        startDate = this.moment(this.maxDate).subtract(data - 1, 'months').format('YYYY-MM');
        endDate = this.moment(this.maxDate).format('YYYY-MM');
        if (this.moment(startDate).isBefore('2019-01')) {
          startDate = '2019-01';
        }
      } else {
        // 日
        startDate = this.moment(this.maxDate).subtract(data - 1, 'days').format('YYYY-MM-DD');
        endDate = this.moment(this.maxDate).format('YYYY-MM-DD');
      }
      this.$emit('chooseDate', {
        date: [startDate, endDate],
        type: this.activeTab,
      });
      this.popupShow = false;
    },
    handleConfirm() {
      if (!(this.startDate && this.endDate)) {
        return;
      }
      this.$emit('chooseDate', {
        date: [this.startDate, this.endDate],
        type: this.activeTab,
      });
      this.popupShow = false;
    },
    closePopup() {
      this.$emit('chooseDate', {
        date: ['', ''],
        type: this.activeTab,
      });
      this.popupShow = false;
    },
    handleFormatter(day) {
      day.type = 'disabled';
      return day;
    },
    handleClick(name, title) {
      if (title === '按日') {
        this.showWeek = false;
        this.showDay = true;
        this.$nextTick(() => {
          // 日历定位到最底部
          const element = document.getElementsByClassName('van-calendar__body');
          if (element[0]) {
            element[0].scrollTop = element[0].scrollHeight;
          }
        });
      } else if (title === '周') {
        this.showDay = false;
        this.showWeek = true;
      } else if (title === '月') {
        this.showWeek = false;
        this.showDay = false;
        const { $refs: { monthBottom } } = this;
        this.$nextTick(() => {
          monthBottom.scrollIntoView(true);
        });
      }
      this.startDate = '';
      this.endDate = '';

      // 清空月视图已选值
      this.startMonth = {};
      this.endMonth = {};
    },
    handleSelect(value) {
      const { $refs: { weekView } } = this;
      if (value[0]) {
        const weekOfDay = this.moment(value[0]).format('E'); // 计算指定日期是这周第几天
        const lastMonday = this.moment(value[0]).subtract(weekOfDay - 1, 'days').format('YYYY/MM/DD');// 周一日期
        this.defaultWeek = [new Date(lastMonday)];
      }
      if (value[1]) {
        const weekOfDay = this.moment(value[1]).format('E'); // 计算指定日期是这周第几天
        const lastSunday = this.moment(value[1]).add(7 - weekOfDay, 'days').format('YYYY/MM/DD');// 周日日期
        this.defaultWeek = [...this.defaultWeek, new Date(lastSunday)];
      }
      weekView.reset();
      weekView.init();
    },
    handleDayClick(value) {
      console.log('value: ', value);
      this.startDate = value[0] ? this.moment(value[0]).format('YYYY-MM-DD') : '';
      this.endDate = value[1] ? this.moment(value[1]).format('YYYY-MM-DD') : '';
    },
    changePopupShow(state) {
      this.popupShow = state;
      console.log('state', state);
    },
    // 月份点击
    monthClick({ year, index }, { month, i }) {
      if (this.monthDisabled(year, month)) {
        return;
      }

      if (this.startMonth.exist && this.endMonth.exist) {
        this.startMonth = {};
        this.endMonth = {};
      }
      if (!this.startMonth.exist && !this.endMonth.exist) {
        this.startMonth = {
          year,
          month,
          yearIndex: index,
          monthIndex: i,
          exist: true,
        };
      } else if (this.startMonth.exist && !this.endMonth.exist) {
        if (this.startMonth.yearIndex < index) { // 后选年比先选大
          this.endMonth = {
            year,
            month,
            yearIndex: index,
            monthIndex: i,
            exist: true,
          };
        }
        if (this.startMonth.yearIndex == index) { // 后选年等于先选年
          if (this.startMonth.monthIndex <= i) { // 后选月小于前选
            this.endMonth = {
              year,
              month,
              yearIndex: index,
              monthIndex: i,
              exist: true,
            };
          } else {
            this.startMonth = {
              year,
              month,
              yearIndex: index,
              monthIndex: i,
              exist: true,
            };
            this.endMonth = {
              year: '',
              month: '',
              exist: false,
              yearIndex: undefined,
              monthIndex: undefined,
            };
          }
        }
        if (this.startMonth.yearIndex > index) { // 后选年小于先选年
          this.startMonth = {
            year,
            month,
            yearIndex: index,
            monthIndex: i,
            exist: true,
          };
          this.endMonth = {
            year: '',
            month: '',
            exist: false,
            yearIndex: undefined,
            monthIndex: undefined,
          };
        }
      }

      // 设置底部展示时间
      const { year: startYear, month: startMonth } = this.startMonth;
      const { year: endYear, month: endMonth } = this.endMonth;
      if (startYear && startMonth) {
        const startDate = this.moment(startYear).add(startMonth - 1, 'months').format('YYYY-MM');
        this.startDate = startDate;
      } else {
        this.startDate = '';
      }
      if (endYear && endMonth) {
        const endDate = this.moment(endYear).add(endMonth - 1, 'months').format('YYYY-MM');
        this.endDate = endDate;
      } else {
        this.endDate = '';
      }
    },
    // 样式展示
    monthColor(year, month) {
      const { yearIndex: startYear, monthIndex: startMonth } = this.startMonth;
      const { yearIndex: endYear } = this.endMonth;
      if (startYear === undefined && endYear === undefined) {
        return false;
      }
      if (startYear !== undefined && endYear === undefined) {
        return startMonth === month && startYear === year;
      }
      if (startYear !== undefined && endYear !== undefined) {
        const range = this.dateRange();
        return range.some((item) => item[0] === year && item[1] === month);
      }
      return false;
    },
    dateRange() {
      const { yearIndex: startYear, monthIndex: startMonth } = this.startMonth;
      const { yearIndex: endYear, monthIndex: endMonth } = this.endMonth;
      const temp = [];
      // 在同一年中
      if (startYear === endYear) {
        for (let month = startMonth; month <= endMonth; month += 1) {
          temp.push([startYear, month]);
        }
        return temp;
      }
      // 跨年选择
      for (let year = startYear; year <= endYear; year += 1) {
        if (year < endYear) {
          for (let month = startMonth; month <= 11; month += 1) {
            temp.push([year, month]);
          }
        } else {
          for (let month = 0; month <= endMonth; month += 1) {
            temp.push([year, month]);
          }
        }
      }
      return temp;
    },
    showSlash(year, month) {
      return ((this.startMonth.year === year && this.startMonth.month === month)
       && (this.endMonth.year === year && this.endMonth.month === month));
    },
    showStartTag(yearIndex, monthIndex) {
      return this.startMonth.yearIndex === yearIndex && this.startMonth.monthIndex === monthIndex;
    },
    showEndTag(yearIndex, monthIndex) {
      return this.endMonth.yearIndex === yearIndex && this.endMonth.monthIndex === monthIndex;
    },
    futureDate(year, month) {
      const currentYear = this.moment(this.maxDate).year();
      const currentMonth = this.moment(this.maxDate).month() + 1;

      // 上面yearList中都是字符串形式'2020',不能用===
      return currentYear == year && currentMonth < month;
    },
    monthDisabled(year, month) {
      if (this.availableDate.length) {
        const monthStr = month < 10 ? `0${month}` : month;
        const temp = `${year}-${monthStr}`;
        for (let i = 0; i < this.availableDate.length; i += 1) {
          return !this.availableDate.includes(temp);
        }
      } else {
        return this.futureDate(year, month);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.popupShowContainer {
  flex: 1;
  //width: 100vh;
  position: relative;
  /*height: calc(100vh - 128px - 88px);*/
  padding: 40px;
  overflow: hidden;

  //日历控制
  .van-calendar__header-title {
    display: none;
  }

  .van-calendar__day--start {
    border-radius: 24px 0 0 24px;
  }
  .van-calendar__day--end {
    border-radius: 0 24px 24px 0;
  }

  .popupShowContainer-name {
    display: inline-flex;
    align-items: center;
    margin: 8px * 2 0;

    > b {
      max-width: 200px * 2;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      line-height: 48px;
      font-size: 34px;
      font-weight: bold;
      color: #333333;
    }

    .popupShowContainer-name-tap {
      font-size: 20px;
      line-height: 24px;
      padding: 4px;
      color: #2877ff;
      margin-left: 24px;
      background: #e1ecff;
      border-radius: 4px;
    }
  }

  .popupShowContainer-address {
    font-size: 12px;
    color: #666666;
    line-height: 17px * 2;
    margin: 8px * 2 0;
    width: 400px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .popupShowContainer-des {
    margin-bottom: 25px * 2;
    line-height: 17px * 2;
    color: #666666;

    span {
      color: #999;
    }
  }

  .popup-charts-1 {
    margin-bottom: 40px * 2;
    width: 90vw;
  }

  .popup-charts-2 {
    height: 400px;
    width: 90vw;
  }

  .popup-brand-list {
    margin: 20px * 3 0;
  }

  .popupShowContainer-clone {
    position: absolute;
    top: 40px;
    right: 40px;
    width: 40px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    border-radius: 50%;
    background: #f2f2f2;
    color: #888888;
    font-size: 16px * 2;
  }
}

.custom-calendar-wrap {
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.dateWrapper {
  //height: 900px;
  height: calc(100vh - 128px - 88px - 88px - 100px);
  width: 100%;
  margin-top: 20px;
  overflow-y: scroll;

  .yearName {
    font-size: 17px * 2;
    line-height: 24px * 2;
    text-align: center;
    color: #000000;
    margin: 20px * 2 0 20px 0;
  }

  .monthName {
    //width: 25%;
    //height: 80px * 2;
    display: flex;
    align-items: center;
  }

  .monthContainer {
    display: flex;
    flex-wrap: wrap;
    text-align: center;
  }

  .monthTouch {
    display: flex;
    flex-direction: column;
    justify-content: center;
    //border-radius: 4px * 2;
    font-size: 16px * 2;
    color: #666666;
    width: 64px * 2;
    height: 56px * 2;
    margin: auto;

    .monthTag {
      font-size: 20px;
    }
  }

  .startMonthStyle {
    background: #5086ff !important;
    color: #ffffff !important;
    border-top-left-radius: 24px;
    border-bottom-left-radius: 24px;
  }

  .endMonthStyle {
    background: #5086ff !important;
    color: #ffffff !important;
    border-top-right-radius: 24px;
    border-bottom-right-radius: 24px;
  }

  .monthTouch-action {
    background: #edf3ff;
    color: rgb(80, 134, 255);
  }

  .disabled {
    color: #c8c9cc;
    cursor: default;
  }
}

.calendar-header {
  padding-left: 30px;
  height: 88px;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  .back-title {
    margin-left: -30px;
    flex-grow: 1;
    font-size: 30px;
    color: #333333;
    text-align: center;
  }
}

.chosen-date {
  padding: 0 30px;
  height: 128px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .show-date {
    height: 50%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    color: #666666;

    .date-title {
      color: #999999;
    }
  }

  .date-confirm {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: blue;
    width: 180px;
    height: 72px;
    background-image: linear-gradient(90deg, #4599ff 0%, #2877ff 66%);
    border-radius: 38px;
    font-size: 30px;
    color: #ffffff;
  }

  .disable-confirm {
    cursor: not-allowed;
    opacity: 0.5;
  }
}

.custom-quick-wrap {
  display: flex;
  align-items: center;
  padding: 20px 30px 0;
}
.custom-quick-date {
  height: 64px;
  line-height: 66px;
  padding: 0 30px;
  text-align: center;
  background-color: #f4f4f4;
  color: #666;
  font-size: 28px;
  border-radius: 32px;
  margin-right: 20px;
  /*cursor: pointer;*/
  /*user-select: none;*/
  /*-webkit-tap-highlight-color: rgba(40, 119, 255, .2);*/
  &.custom-quick-active {
    background-color: #2877ff;
    color: #fff;
  }
}
</style>
