<template>
  <div>
    <span class="downLoadIco"
          @click="downloadImg"></span>
    <!-- 下载图片预览 -->
    <div v-if="previewFlag"
         class="previewWrap">
      <div class="imgWrap">
        <p>长按下方图片分享或保存！</p>
        <img :src=imgUrl>
      </div>
      <div class="cancelIco"
           @click="cancelDownload">轻触取消</div>
    </div>
  </div>
</template>

<script>
import html2canvas from 'html2canvas'
//import { Toast } from 'mint-ui';
export default {
  data () {
    return {
      imgUrl: '',
      previewFlag: false,
      scrollTop: 0,
      titleFlag: true,
      nowTime: ''
    }
  },
  props: ['pageTitle', 'queryDate'],
  watch: {
    previewFlag (val) {
      if (!val) {
        document.getElementsByTagName("body")[0].style.position = 'relative'
        document.body.scrollTop = this.scrollTop
        document.documentElement.scrollTop = this.scrollTop
      }
    }
  },
  methods: {
    downloadImg () {
      this.nowTime = this.getTime();
      this.titleFlag = true
      // 先获取滚动条位置
      this.scrollTop = document.body.scrollTop
      if (!this.scrollTop) {
        this.scrollTop = document.documentElement.scrollTop
      }
      document.getElementsByTagName("body")[0].style.position = 'fixed'
      //this.$indicator.open();
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
      setTimeout(() => {
        console.log('执行');
        (window.html2canvas || html2canvas)(document.getElementsByTagName('body')[0], {
          allowTaint: false,
          useCORS: true,
        }).then(canvas => {
          console.log('完成', canvas)

          let imgUrl = canvas.toDataURL("image/jpeg");
          //console.log('完成2', imgUrl)
          this.imgUrl = imgUrl
          this.previewFlag = true
          //this.$indicator.close();
        }).catch(error => {
          console.log('失败', error)
          //this.$indicator.close();
          //Toast('图片生成失败！');
        })
      }, 800)
    },
    cancelDownload () {
      this.previewFlag = false
      this.titleFlag = false
    },
    // 获取当前时间
    getTime () {
      let date = new Date();
      let year = date.getFullYear();
      // let month = this.dateAddZero(date.getMonth() + 1);
      // let day = this.dateAddZero(date.getDate());
      // let hour = this.dateAddZero(date.getHours());
      // let minute = this.dateAddZero(date.getMinutes());
      // let nowTime = year + '-' + month + '-' + day + ' ' + hour + ':' + minute
      return '2020-01-02'
    }
  },
}
</script>

<style scoped>
.downLoadIco {
  width: 20px;
  height: 20px;
  margin-top: 10px;
  /* background: url(../../../assets/images/cfoDownload.png) no-repeat center; */
  background-size: contain;
  display: block;
}
.previewWrap {
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: rgba(8, 8, 8, 0.4);
  z-index: 99999;
  position: fixed;
}
.imgWrap {
  background: #fff;
  margin: 40px 40px 0 40px;
  border-radius: 10px 10px 0 0;
  border: solid 5px #e5e5e5;
  height: 80%;
  overflow: scroll;
  border-bottom: 0;
  -webkit-overflow-scrolling: touch;
}
.imgWrap p {
  font-size: 13px;
  color: #2d8cf0;
  height: 35px;
  line-height: 35px;
  padding-left: 10px;
  font-weight: 600;
}
.imgWrap img {
  width: 100%;
  -webkit-touch-callout: none;
}
.cancelIco {
  height: 40px;
  background: rgba(0, 0, 0, 0.4);
  color: #fff;
  margin: 0 40px;
  font-size: 16px;
  font-weight: 600;
  text-align: center;
  border-radius: 0 0 10px 10px;
  letter-spacing: 3px;
  line-height: 40px;
}
.titleWrap {
  height: 40px;
  background: #f7f7f9;
  padding: 0 10px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 11;
  width: 100%;
  box-sizing: border-box;
  line-height: 40px;
}
.titleWrap p {
  display: inline-block;
}
.title_p {
  color: #333;
  font-weight: 600;
  font-size: 14px;
}
.date_p {
  color: #808082;
  font-size: 13px;
}
</style>