<template>
    <div class="date-picker">
        <popup v-model="dateShow"
               position="top"
               :close-on-popstate="true">

            <inlineCalendar :mode="mode"
                            format="yyyy-MM-dd"
                            :closeByClickMask="true"
                            :minDate="getMinDate"
                            :maxDate="getMaxDate"
                            @change="onDateChange"
                            :defaultDate="getMaxDate"/>

            <div v-if="!isHead" class="head-calendar-handle">
                <div class="head-calendar-hd"
                     v-for="(item, index) in rangeList" :key="index"
                     @click="dateChangeFast(item.day)">{{item.text}}</div>
            </div>

            <div class="head-calendar-wrap">
                <div class="head-calendar-cancel" @click="dateShow=false">取消</div>
                <div class="head-calendar-confirm" @click="dateChangeOk">确认</div>
            </div>

        </popup>
    </div>
</template>

<script>
    import { Popup } from 'vant'
    import Utils from '@/common/utils'

    export default {
        components: {
            Popup,
        },
        props: {
            isHead: {
                type: Boolean,
                default: false,
            },
        },
        data () {
            let { oneTimes, yesterday } = Utils.getDateTime()
            let dateArr = null
            let mode = ''
            if (this.isHead) {
                dateArr = new Date(yesterday)
                mode = 'single'
            } else {
                dateArr = []
                mode = 'during'
            }
            return {
                dateShow: false,
                minDate: '2019-01-01',
                maxDate: yesterday,
                defaultDate: dateArr,
                tempDate: dateArr,
                oneDate: oneTimes,
                mode: mode,
                rangeList: [
                    {
                        day: 180,
                        text: '180天',
                    },
                    {
                        day: 180*2,
                        text: '360天',
                    },
                    {
                        day: 180*3,
                        text: '540天',
                    },
                    {
                        day: 180*4,
                        text: '720天',
                    },
                ],
                keepList: [
                    {
                        day: 30,
                        text: '30天',
                    },
                    {
                        day: 30 * 2,
                        text: '60天',
                    },
                    {
                        day: 30 * 3,
                        text: '90天',
                    },
                ],
            }
        },
        computed: {
            getMaxDate () {
                return new Date(this.maxDate);
            },
            getMinDate () {
                return new Date(this.minDate);
            },
        },
        methods: {
            onDateChange (arr) {
                if (this.isHead) {
                    // console.log(arr['$d'])
                    let ms = new Date(arr['$d']).getTime() - this.oneDate * 29
                    this.tempDate = [
                        new Date(ms),
                        arr['$d']
                    ]
                } else {
                    if (arr.length !== 2) {
                        this.tempDate = []
                        return false
                    }
                    this.tempDate = [
                        arr[0]['$d'],
                        arr[1]['$d'],
                    ]
                }
                // console.log(this.tempDate)
            },
            dateChangeOk () {
                if (this.isHead) {
                    this.$emit('on-date-change', this.tempDate)
                } else {
                    if (this.tempDate.length === 2) {
                        this.defaultDate = [...this.tempDate]
                        // console.log(this.defaultDate)
                        console.log(this.defaultDate.map(d => Utils.formatFixedDate(d, 'MM-dd')))
                        this.$emit('on-date-change', this.defaultDate)
                        // this.tempDate = []
                        // !this.isHead && (this.tempDate = [])
                    }
                }
                this.dateShow = false
            },
            dateChangeFast (day) {
                let ms = new Date().getTime() - this.oneDate * day
                let arr = [
                    new Date(ms),
                    new Date(this.maxDate),
                ]
                this.$emit('on-date-change', arr)
                this.dateShow = false
            },
        }
    }
</script>
