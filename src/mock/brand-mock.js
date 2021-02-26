/*
 * @desc: 
 * @author: zhangxin
 * @Date: 2020-06-13 11:36:45
 * @LastEditors: zhangxin
 * @LastEditTime: 2020-06-29 18:12:07
 */
import Mock from 'mockjs'
import moment from 'moment'
var RandomDate = Mock.Random.date()
let dataNum = 0,
  secondNum = 0,
  third = 0,
  fourth = 0;

//汽车品牌名随机
Mock.Random.extend({
  brandname: function (date) {
    var constellations = ['奔驰', '宝马', '玛莎拉蒂', 'Vega Innovations', '宾尼法利纳', '比亚迪', '卡迪拉克', '雷克萨斯', '揽胜极光', '捷豹']
    return this.pick(constellations)
  }
})
//大区名随机
Mock.Random.extend({
  areaName: function (date) {
    var constellations = ['东北', '西北', '晋西北', '模拟四字', '华中', '华南']
    return this.pick(constellations)
  }
})
//省份名随机
Mock.Random.extend({
  province: function (date) {
    var constellations = ['河北省', '山西省', '辽宁省', '吉林省', '黑龙江省', '江苏省']
    return this.pick(constellations)
  }
})
//经销商等级随机
Mock.Random.extend({
  dealerlevel: function (date) {
    var constellations = ['会员', '待确认', '普通版', '高级版', '高级版']
    return this.pick(constellations)
  }
})
//城市名随机
Mock.Random.extend({
  city: function (date) {
    var constellations = ['大连市', '楚雄彝族自治州', '北京市', '吉林市', '杭州市', '承德市']
    return this.pick(constellations)
  }
})
//经销商名随机
Mock.Random.extend({
  dealer: function (date) {
    var constellations = ['4S-北京海联力捷', '4S-北京国服信', '4S-东风南方亮马桥水电费水电费水电费',
      '4S-九年老店长阿萨德撒旦法撒旦法', '4S-东风南方亮马', '4S-东风南方亮马韦尔奇翁群二']
    return this.pick(constellations)
  }
})

// //首页 图表数据|二级图表
// Mock.mock(/brandTapeStatistics|brandStatistics|regionStatistics|provinceStatistics|cityStatistics/, {
//   "code": 0,
//   "msg": "OK",
//   "records": {
//     "uvRatio|0.2": 1,
//     "leadsRatio|0.2": 1,
//     "data|15": [
//       {
//         "uv|10000-50000": 1,
//         "lead_num|3265-8000": 1,
//         "report_dt": (item) => {
//           dataNum++;
//           return moment(RandomDate).subtract(dataNum, 'days').format("YYYY-MM-DD")
//         }
//       }
//     ]
//   }
// })

// //首页 card 数据
// Mock.mock(/brandDiagnoseStatistics|dealerClueStatistics|clueSourceStatistics/, {
//   "code": 0,
//   "msg": "OK",
//   "records|15": [
//     {
//       "brand_count|3265-8000": 1,
//       "report_dt": (item) => {
//         secondNum++;
//         return moment(RandomDate).subtract(secondNum, 'days').format("YYYY-MM-DD")
//       }
//     }
//   ]
// })
// //首页 list 数据
// Mock.mock(/brandDiagnoseList|regionList|provinceList|provinceCityList/, {
//   "code": 0,
//   "msg": "OK",
//   "records|60": [
//     {
//       "health|0.1": 1,//健康值
//       "leads_num|10000-50000": 1,//线索数
//       //"leads_num": 200000,//线索数
//       "member_brand_name": '@BRANDNAME',//名字
//       "region_name": '@AREANAME',//区域名
//       "regionId|10000-50000": 1,//区域ID
//       "province_name": '@PROVINCE',//省名
//       "province_id|10000-50000": 1,//省ID
//       "city_name": '@CITY',//市名
//       "city_id|10000-50000": 1,//市ID
//       "complete_scale|0.2": 1,//完成度
//       "member_brand_id|10000-50000": 1,//品牌id
//       "is_new_brand|0-1": "1",//是不是新的
//       //"is_new_brand": 0,//是不是新的
//       "report_dt": (item) => {//日期
//         third++;
//         return moment(RandomDate).subtract(third, 'days').format("YYYY-MM-DD")
//       }
//     }
//   ]
// })
// //首页 汽车品牌
// Mock.mock(/listMemberBrand/, {
//   "code": 0,
//   "msg": "OK",
//   "records|40": [
//     {
//       "member_brand_name": '@BRANDNAME',//名字
//       "member_brand_id|10000-50000": 1,//品牌id
//     }
//   ]
// })
// //经销商 list 数据
// Mock.mock(/regionDealerList|provinceDealerList|cityDealerList|seriesDistribute/, {
//   "code": 0,
//   "msg": "OK",
//   "records|60": [
//     {
//       "leads_num|10000-50000": 1,//线索数
//       "dealer_name": '@DEALER',//名字
//       "dealer_type": '@DEALERLEVEL',//经销商等级
//       "regionId|10000-50000": 1,//区域ID
//       "report_dt": (item) => {//日期
//         fourth++;
//         return moment(RandomDate).subtract(fourth, 'days').format("YYYY-MM-DD")
//       }
//     }
//   ]
// })
//首页二期数据
Mock.mock(/dealConvertRatio/, {
  "code": 0,
  "msg": "OK",
  "records": {
    "Member020": [
      {
        "member_brand_id": "Member020",
        "member_brand_name": "沃尔沃",
        "sell": 1101,
        "clue_num": 103947,
        "media": "B",
        "ratio": 0.0106
      },
      {
        "member_brand_id": "Member020",
        "member_brand_name": "沃尔沃",
        "sell": 1167,
        "clue_num": 107856,
        "media": "A",
        "ratio": 0.0108
      },
      {
        "member_brand_id": "Member020",
        "member_brand_name": "沃尔沃",
        "sell": 1233,
        "clue_num": 111765,
        "media": "D",
        "ratio": 0.0110
      }
    ],
    "Member009": [
      {
        "member_brand_id": "Member009",
        "member_brand_name": "福特",
        "sell": 111,
        "clue_num": 45312,
        "media": "B",
        "ratio": 0.0024
      },
      {
        "member_brand_id": "Member009",
        "member_brand_name": "福特",
        "sell": 177,
        "clue_num": 49221,
        "media": "A",
        "ratio": 0.0036
      },
      {
        "member_brand_id": "Member009",
        "member_brand_name": "福特",
        "sell": 243,
        "clue_num": 53130,
        "media": "D",
        "ratio": 0.0046
      }
    ],
    "Member116": [
      {
        "member_brand_id": "Member116",
        "member_brand_name": "东风日产",
        "sell": 2091,
        "clue_num": 162582,
        "media": "B",
        "ratio": 0.0129
      },
      {
        "member_brand_id": "Member116",
        "member_brand_name": "东风日产",
        "sell": 2157,
        "clue_num": 166491,
        "media": "A",
        "ratio": 0.0130
      },
      {
        "member_brand_id": "Member116",
        "member_brand_name": "东风日产",
        "sell": 2223,
        "clue_num": 170400,
        "media": "D",
        "ratio": 0.0130
      }
    ]
  }
})
export default Mock;
