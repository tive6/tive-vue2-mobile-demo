/*
 * @desc:
 * @author: zhangxin
 * @Date: 2020-11-05 14:19:54
 * @LastEditors: zhangxin
 * @LastEditTime: 2020-11-06 18:04:07
 */


export default {
  /**
   * @name: 二级页面浏览
   * @param {pageId} 
   * @return {type} 
   * @msg: 1_2_3中的3称为二级页面
   * @Author: zhangxin
   */
  topDefaultPage (pageId) {
    try {
      $SDK_ALL.sendPage({
        event_id: '',
        data: {
          eventName: 'PageView',
          codeid: pageId,//2-3-4
        }
      })
    } catch (error) { }
  },
  /**
   * @name: 二级页面浏览
   * @param {pageId} 
   * @return {pageId:'必填',event:'必填'} 
   * @msg: 
   * @Author: zhangxin
   */
  topClickPage (pageId, event) {
    try {
      $SDK_ALL.sendPageEvent({
        event_id: '',
        data: {
          eventName: 'PageClick',
          codeid: pageId,
          elna: event,
        }
      })
    } catch (error) { }
  },
  /**
  * @name: 页面条件级浏览
  * @param {pageId,condition} 
  * @return {type} 
  * @msg: 
  * @Author: zhangxin
  */
  middleDefaultPage (pageId, condition) {
    try {
      $SDK_ALL.sendPage({
        event_id: '',
        data: {
          eventName: 'PageView',
          codeid: pageId,//2-3-4,
          selcri: condition,
        }
      })
    } catch (error) { }
  },
  /**
    * @name: 页面条件级点击
    * @param {pageId,condition} 
    * @return {type} 
    * @msg: 
    * @Author: zhangxin
    */
  middleClickPage (pageId, condition, event) {
    try {
      $SDK_ALL.sendPageEvent({
        event_id: '',
        data: {
          eventName: 'PageClick',
          codeid: pageId,//2-3-4,
          selcri: condition,
          elna: event,
        }
      })
    } catch (error) { }
  },
  /**
    * @name: 页面刷新
    * @param {pageId,condition} 
    * @return {type} 
    * @msg: 
    * @Author: zhangxin
    */
  refreshPage (pageId, condition) {
    try {
      $SDK_ALL.sendPageEvent({
        event_id: '',
        data: {
          eventName: 'PageRefresh',
          codeid: pageId,//2-3-4,
          selcri: condition,
        }
      })
    } catch (error) { }
  },
  /**
  * @name: 页面条件卡片点击
  * @param {pageId,condition} 
  * @return {type} 
  * @msg: 
  * @Author: zhangxin
  */
  cardClick (cardId, condition, event) {
    try {
      $SDK_ALL.sendPageEvent({
        event_id: '',
        data: {
          eventName: 'PageClick',
          codeid: cardId,//2-3-4,
          selcri: condition,
          elna: event,
        }
      })
    } catch (error) { }
  },
  /**
    * @name: 页面加载时间
    * @param {pageId,condition} 
    * @return {type} 
    * @msg: 
    * @Author: zhangxin
    */
  pageLoad (pageId, time) {
    try {
      $SDK_ALL.sendPage({
        event_id: '',
        data: {
          eventName: 'plTime',
          codeid: pageId,//2-3-4,
          anchorTime: time,
        }
      })
    } catch (error) { }
  },
}