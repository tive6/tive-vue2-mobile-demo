import BiHeader from '@/components/biHeader';
import Utils from '@/common/utils';

export default {
  components: {
    BiHeader,
  },
  data() {
    return {
      chartOpts: {},
      chartObjs: {},
      list: {},
      allRes: {},
      lineStyle: {
        lineStyle: {
          color: 'rgba(222,222,222,0.2)',
          width: 1,
          type: 'solid'
        },
      },
      lineDark: {
        lineStyle: {
          color: '#2E4466',
          width: 1,
          type: 'solid'
        },
      },
      textStyle: {
        textStyle: {
          color: '#333',
          fontSize: 10,
        },
      },
      linesStyle: {
        lineStyle: {
          width: 2,
        }
      },
      axisPointer: {
        axisPointer: {
          lineStyle: {
            color: '#D5DFFF',
            type: 'dashed',
          },
        },
      },
      flowDataZoom: [
        {
          type: 'inside',
          start: 50,
          end: 100,
        },
        {
          // show: false,
          type: 'slider',
          bottom: 10,
          backgroundColor: '#fff',
          dataBackground: {
            lineStyle: {
              color: '#2f4554',
              width: 0,
            },
            areaStyle: {
              color: '#F1F4FF',
              opacity: 1,
            },
          },
          // fillerColor: '#D3DCFB',
          fillerColor: 'rgba(211,220,251,0.3)',
          borderColor: '#F1F4FF',
          handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
          handleStyle: {
            // color: '#2F54EB',
            color: 'rgba(62,100,255, 0.3)',
            // handleSize: '80%',
            // width: 20,
            // borderColor: '#2F54EB',
          },
          // showDataShadow: false,
        },
      ],
    };
  },
  mounted() {
    // 获取 chart 实例
    this.getChartsObj();
    // 获取 chart option 对象
    if (this.setOptions) {
      this.setOptions();
    }

    // 初始化 chart
    if (this.notNeedInit) return;
    this.initCharts();

  },
  destroyed() {
    this.els.map(id => {
      if (this.chartObjs[id]) {
        this.chartObjs[id].clear();
        this.chartObjs[id].dispose();
      }
    });
    this.chartObjs = [];
  },
  methods: {
    getChartsObj() {
      // echarts 实例化
      /*
      下载或复制以下的主题保存至 *.json 文件；
      读取该 JSON 文件，并使用 obj = JSON.parse(data) 将其转换成对象；
      调用 echarts.registerTheme('walden', obj) 注册主题；
      使用 echarts.init(dom, 'walden') 创建图表，第二个参数即为刚才注册的主题名字。
      */
      // let theme = JSON.stringify(walden)
      // console.log(theme)
      // this.$echarts.registerTheme('walden', waldenTheme)
      this.els.map(id => {
        let item = `${this.chartsIdPrefix}${id}`;
        const chartDom = document.getElementById(item);
        if (chartDom) {
          this.chartObjs[id] = this.$echarts.init(chartDom);
        }
        // this.chartObjs[i+1+''] = this.$echarts.init(document.getElementById(item), 'walden')
      });
    },
    initCharts() {
      console.log('id: ', this.els);
      this.els.map(id => {
        this.chartObjs[id].setOption(this.chartOpts[id]);
      });
    },
    /**
     * @name: 修改图表数据
     * @param {type}
     * @return:
     * @msg:
     * @Author: zhangxin
     * @LastEditors: zhangxin
     * @LastEditTime: Do not Edit
     */
    setChartsOptions(idArr) {
      idArr.map((item, index) => {
        if (this.chartObjs[item]) {
          this.chartObjs[item].clear();
          this.chartObjs[item].setOption(this.chartOpts[item]);
        }
      });
    },
    //     /**
    //  * @name: 修改图表大小
    //  * @param {type} 
    //  * @return: 
    //  * @msg: 
    //  * @Author: zhangxin
    //  * @LastEditors: zhangxin
    //  * @LastEditTime: Do not Edit
    //  */
    // setChartsOptions (id) {
    //   idArr.map((item, index) => {
    //     this.chartObjs[item].clear()
    //     this.chartObjs[item].setOption(this.chartOpts[item])
    //   })
    // },
    initChartsOption() { // 初始化更新
      this.els.map(id => {
        let charts = this.chartObjs[id];
        try {
          charts.clear();
          charts.setOption(this.chartOpts[id]);
          //console.log('charts.getOption()', charts.getOption())
        } catch (e) {
          console.log(`错误：init--id：${id}：${e}`);
        }
      });
    },
    numFormat(val) {
      return (val / 10000).toFixed(1);
    },
    numberFormat(n) {
      return Utils.numberFormat(n);
    },
    formatter(val, index) {
      // console.log(val)
      let date = new Date(val);
      let day = date.getDate();
      let month = date.getMonth() + 1;
      // console.log(day)
      if (+day === 1 || index === 0) {
        return `${month}/${day}`;
      } else {
        return `${day}`;
      }
    },
    yAxisFormat(n) {
      return +n === 0 ? 0 : (+n / 10000).toFixed(1) + '万';
    },
    yAxisWanFormat(n) {
      return +n >= 10000 && (+n / 10000).toFixed(2) + '万' || this.numberFormat(+n);
    },

  }
};

