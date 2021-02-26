<template>
    <van-popup v-model="popupShow"
               lock-scroll
               position="bottom">
        <div class="custom-calendar-wrap">
            <div class="calendar-header">
                <van-icon @click="closePopup" name="arrow-left" size="24px"/>
                <div class="back-title">
                    选择日期
                </div>
            </div>
            <div class="custom-calendar-single">
                <van-calendar ref="calendar"
                              type="single"
                              :poppable="false"
                              color='#5086FF'
                              :show-confirm="false"
                              :default-date="null"
                              :min-date='minDate'
                              :max-date='maxDate'
                              :show-title='false'
                              :show-subtitle='false'
                              @select="handleDayClick"/>
            </div>
        </div>
    </van-popup>
</template>
<script>
    import { Calendar } from 'vant';
    import moment from 'moment';

    export default {
        components: {
            'van-calendar': Calendar,
        },
        props: {
            minDate: {
                default: () => {
                    return new Date(moment('2019-01-01').format('YYYY-MM-DD'))
                }
            },
            maxDate: {
                default: () => {
                    return new Date(moment().format('YYYY-MM-DD'))
                }
            },
        },
        data () {
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
                currentDate: '',
            };
        },
        created () {
            this.popupShow = true;
        },
        mounted () {
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
        beforeDestroy () {
            // this.
        },
        methods: {
            handleDayClick (value) {
                // console.log(value)
                this.currentDate = this.moment(value).format('YYYY-MM-DD')
                this.$emit('chooseDate', this.currentDate);
                this.popupShow = false;
            },
            closePopup () {
                this.currentDate = ''
                this.$emit('chooseDate', this.currentDate);
                this.popupShow = false;
            },
        }
    };
</script>
<style lang="scss" scoped>
    .calendar-header {
        padding-left: 30px;
        flex: 0 0 88px;
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
    .custom-calendar-single {
        flex: 1;
        padding: 40px;
        overflow: hidden;

    }

    .van-calendar__day {
        -webkit-tap-highlight-color: rgba(40, 119, 255, .2);
    }

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

    .custom-calendar-wrap {
        height: 100vh;
        overflow: hidden;
        display: flex;
        flex-direction: column;
    }

</style>

<style lang="scss">
    .custom-calendar-single {
        .van-calendar__day {
            -webkit-tap-highlight-color: rgba(40, 119, 255, .2);
        }
    }
</style>