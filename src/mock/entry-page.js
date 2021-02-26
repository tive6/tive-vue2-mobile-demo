/*
 * @desc: 首页参数配置
 * @author: zhangxin
 * @Date: 2020-06-13 11:36:45
 * @LastEditors: zhangxin
 * @LastEditTime: 2020-09-02 10:54:16
 */
import Mock from 'mockjs'
//首页 items 展示数量配置
Mock.mock(/listResourceByCurrentUser1111/,
  {
    code: 0,
    msg: 'OK',
    records: { "1": [1, 2, 4], "2": [3] }
  })
export default Mock;