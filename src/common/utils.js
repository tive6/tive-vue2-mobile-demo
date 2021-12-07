const numToFixed = (num, n) => {
  var symbol = 1;
  if (num < 0) {
    // 符号为负
    symbol = -1;
    num *= -1;
  }
  var num2 = (Math.round(num * Math.pow(10, n)) / Math.pow(10, n) + Math.pow(10, -(n + 1))).toString().slice(0, -1);
  return parseFloat(num2 * symbol).toFixed(n);
};

export default {
  /* 设置 cookie */
  setCookie(name, value, params = {}) {
    var stringifiedAttributes = '';

    // 过期时间
    if (typeof params.expires === 'number') {
      var date = new Date();
      date.setDate(date.getDate() + params.expires);
      stringifiedAttributes += ';expires=' + date;
    }

    // path
    var path = params.path ? params.path : '/';
    stringifiedAttributes += ';path=' + path;

    // domain
    if (params.domain) {
      stringifiedAttributes += ';domain=' + params.domain;
    }

    document.cookie = name + '=' + value + stringifiedAttributes;
  },
  /* 获取 cookie */
  getCookie(name) {
    var arr = document.cookie.replace(/\s/g, '').split(';');
    for (var i = 0; i < arr.length; i++) {
      var tempArr = arr[i].split('=');
      if (tempArr[0] === name) {
        return decodeURIComponent(tempArr[1]);
      }
    }
    return '';
  },
  /* 删除 cookie */
  removeCookie(name, params = {}) {
    // 设置已过期，系统会立刻删除cookie
    params.expires = -1;
    this.setCookie(name, '', params);
  },
  /* 时间格式化 */
  formatFixedDate(date, fmt) {
    if (typeof date === 'number') {
      date = new Date(date);
    }
    if (!(date instanceof Date)) {
      return '';
    }
    if (typeof date === 'string') {
      date = date.includes('0+0000') ? date.substr(0, 19) : date;
    }
    var o = {
      'M+': date.getMonth() + 1, //月份
      'd+': date.getDate(), //日
      'h+': date.getHours() % 12 === 0 ? 12 : date.getHours() % 12, //小时
      'H+': date.getHours(), //小时
      'm+': date.getMinutes(), //分
      's+': date.getSeconds(), //秒
      'q+': Math.floor((date.getMonth() + 3) / 3), //季度
      'S': date.getMilliseconds(), //毫秒
    };
    var week = {
      '0': '日',
      '1': '一',
      '2': '二',
      '3': '三',
      '4': '四',
      '5': '五',
      '6': '六',
    };
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    if (/(E+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? '星期' : '周') : '') + week[date.getDay() + '']);
    }
    for (var k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
      }
    }
    return fmt;
  },
  /* 生成随机颜色 */
  getRandomColors() {
    let r = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);
    return `rgba(${r},${g},${b},1)`;
  },
  /* 数字格式化 */
  numberFormat(n) {
    return (n + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
  },
  numToFixed,
  getDateTime() {
    let oneDayMs = 24 * 60 * 60 * 1000;
    let today = new Date().setHours(0, 0, 0, 0);
    let defaultStartDate = today - oneDayMs * 30;
    return {
      oneTimes: oneDayMs,
      today,
      defaultStartDate,
      // yesterday: today,
      yesterday: new Date(today).getTime() - oneDayMs,
      defaultSNDate: [
        new Date(defaultStartDate),
        new Date(new Date(today).getTime() - oneDayMs),
      ],
    };
  },
  getUrlParams(key) {
    let search = window.location.search.slice(1);
    let arr = search.split('&');
    let obj = {};
    arr.map(item => {
      let [k, v] = item.split('=');
      obj[k] = v;
    });
    return obj[key] || '';
  },
  compareVersion(v1, v2) {
    v1 = v1.split('.');
    v2 = v2.split('.');
    const len = Math.max(v1.length, v2.length);
    while (v1.length < len) {
      v1.push('0');
    }
    while (v2.length < len) {
      v2.push('0');
    }
    for (let i = 0; i < len; i++) {
      const num1 = parseInt(v1[i]);
      const num2 = parseInt(v2[i]);
      if (num1 > num2) {
        return 1;
      } else if (num1 < num2) {
        return -1;
      }
    }
    return 0;
  },
  objectToQueryString(obj) {
    return Object.keys(obj).map(function(key) {
      return ''.concat(encodeURIComponent(key), '=').concat(encodeURIComponent(obj[key]));
    }).join('&');
  },
  getCharLength(str) {
    //先把中文替换成两个字节的英文，在计算长度
    return str.replace(/[\u0391-\uFFE5]/g, 'aa').length;
  },
  formatNum(num) {
    let formattingNum = 0;
    formattingNum = (num * 100).toFixed(1);

    if (formattingNum > 0) {
      return `+${formattingNum}%`;
    } else if (formattingNum < 0) {
      return `${formattingNum}%`;
    } else {
      return '0';
    }
  },
  toDecimal(x) {
    var f = parseFloat(x);
    if (isNaN(f)) {
      return false;
    }
    var f = Math.round(x * 100) / 100;
    var s = f.toString();
    var rs = s.indexOf('.');
    if (rs < 0) {
      rs = s.length;
      s += '.';
    }
    while (s.length <= rs + 2) {
      s += '0';
    }
    return s;
  },
  getRangeDate(day) {
    let { oneTimes, today, yesterday } = this.getDateTime();
    let ms = today - oneTimes * day;
    return [
      new Date(ms),
      new Date(yesterday),
    ];
  },
  // 生成一个随机数组
  getRandomArr(len = 10, max = 1000, min = 0) {
    let arr = new Array(len).fill(1);
    return arr.map(n => {
      return n * Math.floor(Math.random() * (max - min)) + min;
    });
  },
  // 时分秒格式化
  formatFixedSecond(s) {
    let str = '';
    if (s <= 60) {
      str = `${s.toFixed()}秒`;
    } else if (s > 60 && s <= 60 * 60) {
      let m = parseInt(s / 60);
      let ss = (s % 60).toFixed();
      str = `${m}分${ss}秒`;
    } else if (s > 60 * 60) {
      let h = parseInt(s / 3600);
      let m = parseInt((s % 3600) / 60);
      let ss = (s % 60).toFixed();
      str = `${h}小时${m}分${ss}秒`;
    }
    return str;
  },
};
