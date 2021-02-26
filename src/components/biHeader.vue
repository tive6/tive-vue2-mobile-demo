<template>
  <div class="bi-header">
    <div class="bi-header-content" :class="{'navTop':showNavBar}">
      <div v-show="isMocard" class="bi-nav-head">
        <div class="bi-nav-outer">
          <div class="bi-nav-left">
            <!-- <div class="bi-nav-right-home" @click="urlTo('/clue/index')"></div> -->
          </div>
          <!-- <div class="bi-nav-left" @click="navShow=true">
              {{ navTitle }}
              <img src="./../assets/img/icon/icon-nav-select.png" alt="" class="bi-nav-left-icon">
          </div> -->
          <!-- <div v-show="!isMocard" class="clue-date"> -->
          <!-- <div class="clue-date-select" @click="showDatePicker">
              {{ getAtStr }}
              <div class="clue-date-icon"></div>
          </div> -->
          <!-- <div class="bi-nav-title">{{ navTitle }}</div>
     </div> -->
          <div v-show="isMocard" class="bi-nav-middle">更新时间：{{ realTime }}</div>
          <div class="bi-nav-right">
            <!--<div class="bi-nav-right-home" @click="urlTo('/clue/index')"></div>-->
            <!--<div class="bi-nav-right-wrap">-->
            <!--     <img src="./../assets/img/icon/bar-icon-msg-01.png" alt="" class="bi-nav-right-icon">-->
            <!--     <div class="bi-nav-right-msg">5</div>-->
            <!--</div>-->
          </div>
        </div>
      </div>

      <div v-show="isMocard" class="mo-tabs">
        <div @click="mocTabsChange('0')" class="mo-tabs-item"
             :class="{'mo-tabs-item-active':mocTabsIndex===0}">今日
        </div>
        <div @click="mocTabsChange('1')" class="mo-tabs-item"
             :class="{'mo-tabs-item-active':mocTabsIndex===1}">累计
        </div>
      </div>

      <!-- 流量模块头部tab切换 -->
      <div ref="flowHeadTab" v-if="isFlow" class="flow-head">
        <div class="flow-head-inner">
          <div class="flow-head-li"
               v-for="(item, i) in flowTabs"
               :key="i"
               :class="{'flow-head-li-active':flowParent.flowTabsIndex===item.code}"
               @click="flowTabsChange(item.code, {index:i, ...item})">
            {{ item.name }}
            <img v-if="item.name==='月报' && newOnlineShow"
                 src="@/assets/img/clue/clue-icon-03.png" class="tabs-item-icon">
          </div>
        </div>
      </div>

    </div>

    <date-picker ref="datePicker" :isHead="true" @on-date-change="onDatePickerChange"/>

  </div>
</template>

<script>
import {findIndex} from 'lodash';
import Utils from '@/common/utils';
import datePicker from '@/components/datePicker';
import {mapGetters} from "vuex";

export default {
  components: {
    datePicker,
  },
  props: {
    isMocard: {
      type: Boolean,
      default: false,
    },
    realTime: {
      type: String,
      default: '',
    },
    isFlow: {
      type: Boolean,
      default: false,
    },
  },
  inject: {
    flowParent: {
      // type: Number,
      default: () => ({}),
    },
  },
  data() {
    let {oneTimes, yesterday, defaultSNDate} = Utils.getDateTime();
    let that = this;
    return {
      showNavBar: this.$store.getters['User/getUserShowNavBar'],
      dateShow: false,
      datePrevHide: false,
      dateNextHide: true,
      currentDate: new Date(yesterday),
      selectDate: Utils.formatFixedDate(yesterday, 'yyyy-MM-dd'),
      oneDate: oneTimes,
      maxDate: yesterday,
      minDate: new Date('2019-11-01').setHours(0, 0, 0, 0),
      isLight: true,
      chartOpts: {},
      chartObjs: {},
      userToken: '',
      allRes: {},
      textColor: '#333',
      ptArr: [],
      navShow: false,
      navTitle: that.$route.meta.title,
      mocTabsIndex: 0,
      flowTabs: [
        // {
        //     name: '总概览',
        //     code: 0,
        // },
        // {
        //     name: '月报',
        //     code: 6,
        //     codeId: '1_2_7',
        // },
        // {
        //     name: '易车APP',
        //     code: 1,
        // },
        // {
        //     name: '易车极速版',
        //     code: 4,
        // },
        // {
        //     name: '报价大全',
        //     code: 2,
        // },
        // {
        //     name: '小程序',
        //     code: 5,
        // },
        // {
        //     name: 'PCWAP',
        //     code: 3,
        // },
      ],
      tabIdMap: {
        '3.12.66': {
          name: '总概览',
          code: 0,
          codeId: '1_2_1',
        },
        '3.12.67': {
          name: '月报',
          code: 6,
          codeId: '1_2_7',
        },
        '3.12.68': {
          name: '易车APP',
          code: 1,
          codeId: '1_2_2',
        },
        '3.12.69': {
          name: '易车极速版',
          code: 4,
          codeId: '1_2_3',
        },
        '3.12.70': {
          name: '报价大全',
          code: 2,
          codeId: '1_2_4',
        },
        '3.12.71': {
          name: '小程序',
          code: 5,
          codeId: '1_2_5',
        },
        '3.12.72': {
          name: 'PCWAP',
          code: 3,
          codeId: '1_2_6',
        },
      },
      // flowTabsIndex: 0,
      defaultDate: [
        ...defaultSNDate
      ],
      flowPvMap: {
        0: '友盟口径',
        1: '友盟口径',
        4: '友盟口径',
        2: '友盟口径',
        5: '微信百度统计',
        3: '通天晓口径',
        6: '友盟口径',
      },
      sdkData: {
        fcutl: '流量总览',
        index: 1,
      },
      scrollLeft: 0,
      rafObj: null,
      pageCodeId: '1_2_2',
      onlineShow: true,
      isBefore: true,
    };
  },
  computed: {
    ...mapGetters('User', {
      currentUser: 'getCurrentUsers'
    }),
    getMaxDate() {
      return new Date(this.maxDate);
    },
    getMinDate() {
      return new Date('2019-01-01');
    },
    getAtStr() {
      return `${Utils.formatFixedDate(this.defaultDate[1], 'yyyy-MM-dd')}`;
    },
    newOnlineShow() {
      return this.onlineShow && this.isBefore;
    },
  },
  async mounted() {
    this.getHideState();
    // console.log(this.flowParent)
    this.isFlow && this.setTabId();
    // this.flowParent.flowTabsIndex = 0
  },
  methods: {
    sendPvEvent() {
      // 页面PV
      // console.log(this.sdkData)
      let {code} = this.sdkData;
      this.$SDK_ALL.sendPage({
        event_id: '',
        data: {
          eventName: 'PageView',
          codeid: this.pageCodeId,
          selcri: this.flowPvMap[code],
        },
      });
    },
    sendClickEvent() {
      // 点击事件
      let {name} = this.sdkData;
      this.$SDK_ALL.sendPageEvent({
        event_id: '',
        data: {
          eventName: 'PageClick',
          codeid: this.pageCodeId,
          elna: name,
        },
      });
    },
    getHideState() {
      this.isBefore = this.moment().isBefore('2020-12-17');
      this.onlineShow = window.localStorage.getItem('flow-new-online') !== 'click';
    },
    showDatePicker() {
      this.$refs.datePicker.dateShow = true;
    },
    onDatePickerChange(arr) {
      // console.log(arr)
      this.defaultDate = [...arr];
      this.$emit('on-date-change', arr);
    },
    mocTabsChange(index) {
      this.mocTabsIndex = +index;
      // console.log(this.$store)
      this.$store.commit('Mocard/GET_MOTS_INDEX', +index);
    },
    flowTabsChange(index, data) {
      if (this.flowParent.flowTabsIndex === index) return;
      window.scrollTo(0, 0);
      this.flowParent.flowTabsIndex = +index;
      this.flowParent.initProps();
      this.sdkData = {...this.sdkData, ...data};
      console.log(this.sdkData);
      this.pageCodeId = data.codeId;
      this.$store.commit('Flow/GET_PAGE_ID', data.codeId);
      this.sendPvEvent();
      // this.sendClickEvent()
      this.scrollLeft = 0;
      if (data.index > 2) {
        this.scrollLeft = 200;
      } else {
        this.scrollLeft = 0;
      }
      let timer = setTimeout(() => {
        // this.scrollLeftHandle()
        this.$refs.flowHeadTab.scrollLeft = this.scrollLeft;
        clearTimeout(timer);
      }, 1000);
      if (data.index === 1) {
        window.localStorage.setItem('flow-new-online', 'click');
        this.onlineShow = false;
      }
    },
    scrollLeftHandle() {
      this.rafObj = window.requestAnimationFrame(() => {
        if (this.scrollLeft > 100) {
          window.cancelAnimationFrame(this.rafObj);
        } else {
          this.scrollLeft += 6;
          // this.$refs.flowHeadTab.scrollLeft = this.scrollLeft
          this.scrollLeftHandle();
        }
      });
    },
    urlTo(url) {
      this.$router.push({
        path: url,
      });
    },
    findFirstAvailable() {
      const map = [
        '3.12.68',
        '3.12.69',
        '3.12.70',
        '3.12.71',
        '3.12.72',
        '3.12.66',
        '3.12.67',
      ];
      for (let i = 0; i<map.length;i++) {
        const index = findIndex(this.flowTabs, item=> item.permission===map[i]);
        if (index>-1) {
          return index;
        }
        console.log('index: ', findIndex(this.flowTabs, item=> item.permission===map[i]));
      }
    },
    async setTabId() {
      const res = await this.$http.ajax({
        url: 'nbi/uc/uResource/permission',
        params: {resourceId: '3.12'}
      });
      if (res && res.length > 0) {
        this.flowParent.mdAuthList = [...res];
        Object.keys(this.tabIdMap).map(id => {
          if (res.includes(id)) {
            this.flowTabs.push({...this.tabIdMap[id], permission: id});
          }
        });
        console.log('flow tabs: ', this.flowTabs);
        let index = 0;
        index = this.findFirstAvailable();
        // if (res.includes('3.12.68')) {
        //   index = 2;
        // }
        console.log('tabs: ', this.flowTabs);
        let {code, name, codeId} = this.flowTabs[index];
        this.flowParent.flowTabsIndex = code;
        this.pageCodeId = codeId;
        this.$store.commit('Flow/GET_PAGE_ID', codeId);
        this.sdkData = {...this.sdkData, index, code, name};
        this.sendPvEvent();
      } else {
        this.flowParent.flowTabsIndex = -1;
        this.flowParent.mdAuthList = [];
      }
      let timer = setTimeout(() => {
        this.$refs.flowHeadTab.scrollLeft = 1;
        clearTimeout(timer);
      }, 1000);
    },
  }
};
</script>
