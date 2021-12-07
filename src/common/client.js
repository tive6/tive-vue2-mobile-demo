import JSBridge from 'h5-jsbridge';

export default {
  callHandler(params, cb) {
    try {
      JSBridge.callHandler(
        params.funName,
        params.data,
        (data) => {
          cb && cb(data);
        },
      );
    } catch (e) {
      console.log(`Params：${JSON.stringify(params)} \nError：${e}`);
    }
  },
  registerHandler(params, cb) {
    this.setupWebViewJavascriptBridge(bridge => {
      bridge.registerHandler(
        params.funName,
        params.data,
        (data) => {
          cb && cb(data);
        });
    });
  },
  // 关闭webview
  closeWebView() {
    this.callHandler({
      funName: 'ToNative',
      data: { 'type': 'CloseView', 'params': { 'type': 'close' } },
    });
  },
  // 客户端埋点事件
  viewLoadReport(data) {
    this.callHandler({
      funName: 'ToNative',
      data: { 'type': 'ViewLoadFinish', 'params': data },
    });
  },
};