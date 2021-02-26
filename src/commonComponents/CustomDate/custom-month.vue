<template>
  <div>
    <template v-if="monthRange">
      <div v-for="(year, index) in yearList"
           :key="index">
        <div class="yearName">{{ year }}</div>
        <div class="monthContainer">
          <div v-for="(month, i) in monthList"
               :key="i"
               class="monthName"
               @click="monthRangeClick({year, index}, {month,i})">
            <div class="monthTouch"
                 :class="{
                   'monthTouch-action':monthColor(index,i),
                   'disabled': monthDisabled(year, month),
                   'startMonthStyle': showStartTag(index, i),
                   'endMonthStyle': showEndTag(index, i)
                 }">
              {{ month }}月
              <span v-if="showStartTag(index, i)"
                    class="monthTag">
                开始
              </span>
              <span v-if="showEndTag(index,i)"
                    class="monthTag">
                结束
              </span>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <div v-for="(year, index) in yearList"
           :key="index">
        <div class="yearName">{{ year }}</div>
        <div class="monthContainer">
          <div v-for="(month, i) in monthList"
               :key="i"
               class="monthName"
               @click="monthClick({year, index}, {month,i})">
            <div class="monthTouch"
                 :class="{'endMonthStyle':singleMonthColor(index,i)||defaultDateActive(index, i),
                          'disabled': monthDisabled(year, month),
                 }">
              {{ month }}月
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
<script>
export default {
  props: {
    monthRange: {
      type: Boolean,
      default: true,
    },
    date: {
      type: Array,
      default: () => [],
    },
    availableDate: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
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
      singleMonth: {
        yearIndex: undefined,
        monthIndex: undefined,
      },
      defaultDate: {
        yearIndex: undefined,
        monthIndex: undefined,
      },
    };
  },
  created() {
    const all = [];
    const month = [];
    for (let i = 0; i < this.moment().format('YYYY') - 2019 + 1; i++) {
      all.push(this.moment().subtract(i, 'years').format('YYYY'));
    }
    for (let i = 0; i < 12; i++) {
      month[i] = i + 1;
    }
    this.yearList = all.reverse();
    this.monthList = month;
  },
  mounted() {
    if (this.date[0]) {
      const [year, month] = this.date[0].split('-');
      this.defaultDate.yearIndex = this.yearList.indexOf(year);
      this.defaultDate.monthIndex = this.monthList.indexOf(Number(month));
    }
  },
  methods: {
    defaultDateActive(index, i) {
      return this.defaultDate.yearIndex === index && this.defaultDate.monthIndex === i;
    },
    singleMonthColor(index, i) {
      return this.singleMonth.yearIndex === index && this.singleMonth.monthIndex === i;
    },
    monthClick({ year, index }, { month, i }) {
      if (this.monthDisabled(year, month) || this.pmMonthDisabled(year, month)) {
        return;
      }
      this.singleMonth = {
        yearIndex: index,
        monthIndex: i,
      };
      const startDate = this.moment(year).add(month - 1, 'months').format('YYYY-MM');
      const dateArr = [startDate];
      this.$emit('chooseDate', {
        date: dateArr,
        type: 3,
      });
    },
    monthRangeClick({ year, index }, { month, i }) {
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
        if (this.startMonth.yearIndex >= index && this.startMonth.monthIndex > i) {
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
        } else {
          this.endMonth = {
            year,
            month,
            yearIndex: index,
            monthIndex: i,
            exist: true,
          };
        }
      }
      if (this.startMonth.exist && this.endMonth.exist) {
        const { year: startYear, month: startMonth } = this.startMonth;
        const { year: endYear, month: endMonth } = this.endMonth;
        const startDate = this.moment(startYear).add(startMonth - 1, 'months').format('YYYY-MM-DD');
        const endDate = this.moment(endYear).add(endMonth - 1, 'months').format('YYYY-MM-DD');
        const dateArr = [startDate, endDate];
        this.$emit('chooseDate', {
          date: dateArr,
          type: 3,
        });
        // this.popupShow = false;
      }
    },
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
    },
    dateRange() {
      const { yearIndex: startYear, monthIndex: startMonth } = this.startMonth;
      const { yearIndex: endYear, monthIndex: endMonth } = this.endMonth;
      const temp = [];
      // 在同一年中
      if (startYear === endYear) {
        for (let month = startMonth; month <= endMonth; month++) {
          temp.push([startYear, month]);
        }
        return temp;
      }
      // 跨年选择
      for (let year = startYear; year <= endYear; year++) {
        if (year < endYear) {
          for (let month = startMonth; month <= 11; month++) {
            temp.push([year, month]);
          }
        } else {
          for (let month = 0; month <= endMonth; month++) {
            temp.push([year, month]);
          }
        }
      }
      return temp;
    },
    futureDate(year, month) {
      const currentYear = this.moment().year();
      const currentMonth = this.moment().month() + 1;

      // 上面yearList中都是字符串形式'2020',不能用===
      return currentYear == year && currentMonth < month;
    },
    monthDisabled(year, month) {
      if (this.availableDate.length) {
        const monthStr = month < 10 ? `0${month}` : month;
        const temp = `${year}-${monthStr}`;
        for (let i = 0; i < this.availableDate.length; i++) {
          return !this.availableDate.includes(temp);
        }
      } else {
        return this.futureDate(year, month) || this.pmMonthDisabled(year, month);
      }
    },
    // 产品经理要求的无数据的月不可点，硬编码
    // 9月4号新增无数据月份
    pmMonthDisabled(year, month) {
      return year === '2019' && [1, 2, 3, 4, 5, 6, 7, 8, 9].includes(month);
    },
    showStartTag(yearIndex, monthIndex) {
      return this.startMonth.yearIndex === yearIndex && this.startMonth.monthIndex === monthIndex;
    },
    showEndTag(yearIndex, monthIndex) {
      return this.endMonth.yearIndex === yearIndex && this.endMonth.monthIndex === monthIndex;
    },
  },
};
</script>
<style lang="scss" scoped>
.yearName {
  font-size: 17px * 2;
  line-height: 24px * 2;
  text-align: center;
  color: #000000;
  margin: 20px * 2 0 20px 0;
}
.monthName {
  width: 25%;
  height: 80px * 2;
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
  border-radius: 4px * 2;
  font-size: 16px * 2;
  color: #666666;
  width: 64px * 2;
  height: 56px * 2;
  margin: auto;
  .monthTag {
    margin-top: 16px;
    font-size: 20px;
  }
}
.startMonthStyle,
.endMonthStyle {
  background: #5086ff !important;
  color: #ffffff !important;
}
.monthTouch-action {
  background: #edf3ff;
  color: rgb(80, 134, 255);
}
.disabled {
  color: #c8c9cc;
  cursor: default;
}
</style>
