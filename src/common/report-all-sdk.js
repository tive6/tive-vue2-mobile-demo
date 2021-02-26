import axiosAjax from 'axios';
/* ajax */
// (function webpackUniversalModuleDefinition(root, factory) {
//     if(typeof exports === 'object' && typeof module === 'object')
//         module.exports = factory();
//     else if(typeof define === 'function' && define.amd)
//         define([], factory);
//     else if(typeof exports === 'object')
//         exports["axiosAjax"] = factory();
//     else
//         root["axiosAjax"] = factory();
// })(window,
//     function() {
//         return /******/ (function(modules) { // webpackBootstrap
//             /******/ 	// The module cache
//             /******/ 	var installedModules = {};
//             /******/
//             /******/ 	// The require function
//             /******/ 	function __webpack_require__(moduleId) {
//                 /******/
//                 /******/ 		// Check if module is in cache
//                 /******/ 		if(installedModules[moduleId])
//                     /******/ 			return installedModules[moduleId].exports;
//                 /******/
//                 /******/ 		// Create a new module (and put it into the cache)
//                 /******/ 		var module = installedModules[moduleId] = {
//                     /******/ 			exports: {},
//                     /******/ 			id: moduleId,
//                     /******/ 			loaded: false
//                     /******/ 		};
//                 /******/
//                 /******/ 		// Execute the module function
//                 /******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
//                 /******/
//                 /******/ 		// Flag the module as loaded
//                 /******/ 		module.loaded = true;
//                 /******/
//                 /******/ 		// Return the exports of the module
//                 /******/ 		return module.exports;
//                 /******/ 	}
//             /******/
//             /******/
//             /******/ 	// expose the modules object (__webpack_modules__)
//             /******/ 	__webpack_require__.m = modules;
//             /******/
//             /******/ 	// expose the module cache
//             /******/ 	__webpack_require__.c = installedModules;
//             /******/
//             /******/ 	// __webpack_public_path__
//             /******/ 	__webpack_require__.p = "";
//             /******/
//             /******/ 	// Load entry module and return exports
//             /******/ 	return __webpack_require__(0);
//             /******/ })
//             /************************************************************************/
//             /******/ ([
//                 /* 0 */
//                 /***/ (function(module, exports, __webpack_require__) {

//                     module.exports = __webpack_require__(1);

//                     /***/ }),
//                 /* 1 */
//                 /***/ (function(module, exports, __webpack_require__) {

//                     'use strict';

//                     var utils = __webpack_require__(2);
//                     var bind = __webpack_require__(3);
//                     var Axios = __webpack_require__(5);
//                     var mergeConfig = __webpack_require__(22);
//                     var defaults = __webpack_require__(11);

//                     function createInstance(defaultConfig) {
//                         var context = new Axios(defaultConfig);
//                         var instance = bind(Axios.prototype.request, context);

//                         // Copy axios.prototype to instance
//                         utils.extend(instance, Axios.prototype, context);

//                         // Copy context to instance
//                         utils.extend(instance, context);

//                         return instance;
//                     }

//                     // Create the default instance to be exported
//                     var axios = createInstance(defaults);

//                     // Expose Axios class to allow class inheritance
//                     axios.Axios = Axios;

//                     // Factory for creating new instances
//                     axios.create = function create(instanceConfig) {
//                         return createInstance(mergeConfig(axios.defaults, instanceConfig));
//                     };

//                     // Expose Cancel & CancelToken
//                     axios.Cancel = __webpack_require__(23);
//                     axios.CancelToken = __webpack_require__(24);
//                     axios.isCancel = __webpack_require__(10);

//                     // Expose all/spread
//                     axios.all = function all(promises) {
//                         return Promise.all(promises);
//                     };
//                     axios.spread = __webpack_require__(25);

//                     module.exports = axios;

//                     // Allow use of default import syntax in TypeScript
//                     module.exports.default = axios;


//                     /***/ }),
//                 /* 2 */
//                 /***/ (function(module, exports, __webpack_require__) {

//                     'use strict';

//                     var bind = __webpack_require__(3);
//                     var isBuffer = __webpack_require__(4);

//                     /*global toString:true*/

//                     var toString = Object.prototype.toString;

//                     function isArray(val) {
//                         return toString.call(val) === '[object Array]';
//                     }

//                     function isArrayBuffer(val) {
//                         return toString.call(val) === '[object ArrayBuffer]';
//                     }

//                     function isFormData(val) {
//                         return (typeof FormData !== 'undefined') && (val instanceof FormData);
//                     }

//                     function isArrayBufferView(val) {
//                         var result;
//                         if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
//                             result = ArrayBuffer.isView(val);
//                         } else {
//                             result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
//                         }
//                         return result;
//                     }

//                     function isString(val) {
//                         return typeof val === 'string';
//                     }

//                     function isNumber(val) {
//                         return typeof val === 'number';
//                     }

//                     function isUndefined(val) {
//                         return typeof val === 'undefined';
//                     }

//                     function isObject(val) {
//                         return val !== null && typeof val === 'object';
//                     }

//                     function isDate(val) {
//                         return toString.call(val) === '[object Date]';
//                     }

//                     function isFile(val) {
//                         return toString.call(val) === '[object File]';
//                     }

//                     function isBlob(val) {
//                         return toString.call(val) === '[object Blob]';
//                     }

//                     function isFunction(val) {
//                         return toString.call(val) === '[object Function]';
//                     }
//                     function isStream(val) {
//                         return isObject(val) && isFunction(val.pipe);
//                     }

//                     function isURLSearchParams(val) {
//                         return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
//                     }

//                     function trim(str) {
//                         return str.replace(/^\s*/, '').replace(/\s*$/, '');
//                     }
//                     function isStandardBrowserEnv() {
//                         if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||
//                             navigator.product === 'NativeScript' ||
//                             navigator.product === 'NS')) {
//                             return false;
//                         }
//                         return (
//                             typeof window !== 'undefined' &&
//                             typeof document !== 'undefined'
//                         );
//                     }

//                     function forEach(obj, fn) {
//                         // Don't bother if no value provided
//                         if (obj === null || typeof obj === 'undefined') {
//                             return;
//                         }

//                         // Force an array if not already something iterable
//                         if (typeof obj !== 'object') {
//                             /*eslint no-param-reassign:0*/
//                             obj = [obj];
//                         }

//                         if (isArray(obj)) {
//                             // Iterate over array values
//                             for (var i = 0, l = obj.length; i < l; i++) {
//                                 fn.call(null, obj[i], i, obj);
//                             }
//                         } else {
//                             // Iterate over object keys
//                             for (var key in obj) {
//                                 if (Object.prototype.hasOwnProperty.call(obj, key)) {
//                                     fn.call(null, obj[key], key, obj);
//                                 }
//                             }
//                         }
//                     }
//                     function merge(/* obj1, obj2, obj3, ... */) {
//                         var result = {};
//                         function assignValue(val, key) {
//                             if (typeof result[key] === 'object' && typeof val === 'object') {
//                                 result[key] = merge(result[key], val);
//                             } else {
//                                 result[key] = val;
//                             }
//                         }

//                         for (var i = 0, l = arguments.length; i < l; i++) {
//                             forEach(arguments[i], assignValue);
//                         }
//                         return result;
//                     }
//                     function deepMerge(/* obj1, obj2, obj3, ... */) {
//                         var result = {};
//                         function assignValue(val, key) {
//                             if (typeof result[key] === 'object' && typeof val === 'object') {
//                                 result[key] = deepMerge(result[key], val);
//                             } else if (typeof val === 'object') {
//                                 result[key] = deepMerge({}, val);
//                             } else {
//                                 result[key] = val;
//                             }
//                         }

//                         for (var i = 0, l = arguments.length; i < l; i++) {
//                             forEach(arguments[i], assignValue);
//                         }
//                         return result;
//                     }
//                     function extend(a, b, thisArg) {
//                         forEach(b, function assignValue(val, key) {
//                             if (thisArg && typeof val === 'function') {
//                                 a[key] = bind(val, thisArg);
//                             } else {
//                                 a[key] = val;
//                             }
//                         });
//                         return a;
//                     }

//                     module.exports = {
//                         isArray: isArray,
//                         isArrayBuffer: isArrayBuffer,
//                         isBuffer: isBuffer,
//                         isFormData: isFormData,
//                         isArrayBufferView: isArrayBufferView,
//                         isString: isString,
//                         isNumber: isNumber,
//                         isObject: isObject,
//                         isUndefined: isUndefined,
//                         isDate: isDate,
//                         isFile: isFile,
//                         isBlob: isBlob,
//                         isFunction: isFunction,
//                         isStream: isStream,
//                         isURLSearchParams: isURLSearchParams,
//                         isStandardBrowserEnv: isStandardBrowserEnv,
//                         forEach: forEach,
//                         merge: merge,
//                         deepMerge: deepMerge,
//                         extend: extend,
//                         trim: trim
//                     };


//                     /***/ }),
//                 /* 3 */
//                 /***/ (function(module, exports) {

//                     'use strict';

//                     module.exports = function bind(fn, thisArg) {
//                         return function wrap() {
//                             var args = new Array(arguments.length);
//                             for (var i = 0; i < args.length; i++) {
//                                 args[i] = arguments[i];
//                             }
//                             return fn.apply(thisArg, args);
//                         };
//                     };


//                     /***/ }),
//                 /* 4 */
//                 /***/ (function(module, exports) {

//                     module.exports = function isBuffer (obj) {
//                         return obj != null && obj.constructor != null &&
//                             typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
//                     }


//                     /***/ }),
//                 /* 5 */
//                 /***/ (function(module, exports, __webpack_require__) {

//                     'use strict';

//                     var utils = __webpack_require__(2);
//                     var buildURL = __webpack_require__(6);
//                     var InterceptorManager = __webpack_require__(7);
//                     var dispatchRequest = __webpack_require__(8);
//                     var mergeConfig = __webpack_require__(22);

//                     function Axios(instanceConfig) {
//                         this.defaults = instanceConfig;
//                         this.interceptors = {
//                             request: new InterceptorManager(),
//                             response: new InterceptorManager()
//                         };
//                     }

//                     Axios.prototype.request = function request(config) {
//                         /*eslint no-param-reassign:0*/
//                         // Allow for axios('example/url'[, config]) a la fetch API
//                         if (typeof config === 'string') {
//                             config = arguments[1] || {};
//                             config.url = arguments[0];
//                         } else {
//                             config = config || {};
//                         }

//                         config = mergeConfig(this.defaults, config);
//                         config.method = config.method ? config.method.toLowerCase() : 'get';

//                         // Hook up interceptors middleware
//                         var chain = [dispatchRequest, undefined];
//                         var promise = Promise.resolve(config);

//                         this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
//                             chain.unshift(interceptor.fulfilled, interceptor.rejected);
//                         });

//                         this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
//                             chain.push(interceptor.fulfilled, interceptor.rejected);
//                         });

//                         while (chain.length) {
//                             promise = promise.then(chain.shift(), chain.shift());
//                         }

//                         return promise;
//                     };

//                     Axios.prototype.getUri = function getUri(config) {
//                         config = mergeConfig(this.defaults, config);
//                         return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
//                     };

//                     // Provide aliases for supported request methods
//                     utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
//                         /*eslint func-names:0*/
//                         Axios.prototype[method] = function(url, config) {
//                             return this.request(utils.merge(config || {}, {
//                                 method: method,
//                                 url: url
//                             }));
//                         };
//                     });

//                     utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
//                         /*eslint func-names:0*/
//                         Axios.prototype[method] = function(url, data, config) {
//                             return this.request(utils.merge(config || {}, {
//                                 method: method,
//                                 url: url,
//                                 data: data
//                             }));
//                         };
//                     });

//                     module.exports = Axios;


//                     /***/ }),
//                 /* 6 */
//                 /***/ (function(module, exports, __webpack_require__) {

//                     'use strict';

//                     var utils = __webpack_require__(2);

//                     function encode(val) {
//                         return encodeURIComponent(val).
//                         replace(/%40/gi, '@').
//                         replace(/%3A/gi, ':').
//                         replace(/%24/g, '$').
//                         replace(/%2C/gi, ',').
//                         replace(/%20/g, '+').
//                         replace(/%5B/gi, '[').
//                         replace(/%5D/gi, ']');
//                     }

//                     module.exports = function buildURL(url, params, paramsSerializer) {
//                         /*eslint no-param-reassign:0*/
//                         if (!params) {
//                             return url;
//                         }

//                         var serializedParams;
//                         if (paramsSerializer) {
//                             serializedParams = paramsSerializer(params);
//                         } else if (utils.isURLSearchParams(params)) {
//                             serializedParams = params.toString();
//                         } else {
//                             var parts = [];

//                             utils.forEach(params, function serialize(val, key) {
//                                 if (val === null || typeof val === 'undefined') {
//                                     return;
//                                 }

//                                 if (utils.isArray(val)) {
//                                     key = key + '[]';
//                                 } else {
//                                     val = [val];
//                                 }

//                                 utils.forEach(val, function parseValue(v) {
//                                     if (utils.isDate(v)) {
//                                         v = v.toISOString();
//                                     } else if (utils.isObject(v)) {
//                                         v = JSON.stringify(v);
//                                     }
//                                     parts.push(encode(key) + '=' + encode(v));
//                                 });
//                             });

//                             serializedParams = parts.join('&');
//                         }

//                         if (serializedParams) {
//                             url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
//                         }

//                         return url;
//                     };


//                     /***/ }),
//                 /* 7 */
//                 /***/ (function(module, exports, __webpack_require__) {

//                     'use strict';

//                     var utils = __webpack_require__(2);

//                     function InterceptorManager() {
//                         this.handlers = [];
//                     }

//                     InterceptorManager.prototype.use = function use(fulfilled, rejected) {
//                         this.handlers.push({
//                             fulfilled: fulfilled,
//                             rejected: rejected
//                         });
//                         return this.handlers.length - 1;
//                     };
//                     InterceptorManager.prototype.eject = function eject(id) {
//                         if (this.handlers[id]) {
//                             this.handlers[id] = null;
//                         }
//                     };
//                     InterceptorManager.prototype.forEach = function forEach(fn) {
//                         utils.forEach(this.handlers, function forEachHandler(h) {
//                             if (h !== null) {
//                                 fn(h);
//                             }
//                         });
//                     };

//                     module.exports = InterceptorManager;


//                     /***/ }),
//                 /* 8 */
//                 /***/ (function(module, exports, __webpack_require__) {

//                     'use strict';

//                     var utils = __webpack_require__(2);
//                     var transformData = __webpack_require__(9);
//                     var isCancel = __webpack_require__(10);
//                     var defaults = __webpack_require__(11);
//                     var isAbsoluteURL = __webpack_require__(20);
//                     var combineURLs = __webpack_require__(21);

//                     function throwIfCancellationRequested(config) {
//                         if (config.cancelToken) {
//                             config.cancelToken.throwIfRequested();
//                         }
//                     }

//                     module.exports = function dispatchRequest(config) {
//                         throwIfCancellationRequested(config);

//                         // Support baseURL config
//                         if (config.baseURL && !isAbsoluteURL(config.url)) {
//                             config.url = combineURLs(config.baseURL, config.url);
//                         }

//                         // Ensure headers exist
//                         config.headers = config.headers || {};

//                         // Transform request data
//                         config.data = transformData(
//                             config.data,
//                             config.headers,
//                             config.transformRequest
//                         );

//                         // Flatten headers
//                         config.headers = utils.merge(
//                             config.headers.common || {},
//                             config.headers[config.method] || {},
//                             config.headers || {}
//                         );

//                         utils.forEach(
//                             ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
//                             function cleanHeaderConfig(method) {
//                                 delete config.headers[method];
//                             }
//                         );

//                         var adapter = config.adapter || defaults.adapter;

//                         return adapter(config).then(function onAdapterResolution(response) {
//                             throwIfCancellationRequested(config);

//                             // Transform response data
//                             response.data = transformData(
//                                 response.data,
//                                 response.headers,
//                                 config.transformResponse
//                             );

//                             return response;
//                         }, function onAdapterRejection(reason) {
//                             if (!isCancel(reason)) {
//                                 throwIfCancellationRequested(config);

//                                 // Transform response data
//                                 if (reason && reason.response) {
//                                     reason.response.data = transformData(
//                                         reason.response.data,
//                                         reason.response.headers,
//                                         config.transformResponse
//                                     );
//                                 }
//                             }

//                             return Promise.reject(reason);
//                         });
//                     };


//                     /***/ }),
//                 /* 9 */
//                 /***/ (function(module, exports, __webpack_require__) {

//                     'use strict';

//                     var utils = __webpack_require__(2);

//                     module.exports = function transformData(data, headers, fns) {
//                         /*eslint no-param-reassign:0*/
//                         utils.forEach(fns, function transform(fn) {
//                             data = fn(data, headers);
//                         });

//                         return data;
//                     };


//                     /***/ }),
//                 /* 10 */
//                 /***/ (function(module, exports) {

//                     'use strict';

//                     module.exports = function isCancel(value) {
//                         return !!(value && value.__CANCEL__);
//                     };


//                     /***/ }),
//                 /* 11 */
//                 /***/ (function(module, exports, __webpack_require__) {

//                     'use strict';

//                     var utils = __webpack_require__(2);
//                     var normalizeHeaderName = __webpack_require__(12);

//                     var DEFAULT_CONTENT_TYPE = {
//                         'Content-Type': 'application/x-www-form-urlencoded'
//                     };

//                     function setContentTypeIfUnset(headers, value) {
//                         if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
//                             headers['Content-Type'] = value;
//                         }
//                     }

//                     function getDefaultAdapter() {
//                         var adapter;
//                         // Only Node.JS has a process variable that is of [[Class]] process
//                         if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
//                             // For node use HTTP adapter
//                             adapter = __webpack_require__(13);
//                         } else if (typeof XMLHttpRequest !== 'undefined') {
//                             // For browsers use XHR adapter
//                             adapter = __webpack_require__(13);
//                         }
//                         return adapter;
//                     }

//                     var defaults = {
//                         adapter: getDefaultAdapter(),

//                         transformRequest: [function transformRequest(data, headers) {
//                             normalizeHeaderName(headers, 'Accept');
//                             normalizeHeaderName(headers, 'Content-Type');
//                             if (utils.isFormData(data) ||
//                                 utils.isArrayBuffer(data) ||
//                                 utils.isBuffer(data) ||
//                                 utils.isStream(data) ||
//                                 utils.isFile(data) ||
//                                 utils.isBlob(data)
//                             ) {
//                                 return data;
//                             }
//                             if (utils.isArrayBufferView(data)) {
//                                 return data.buffer;
//                             }
//                             if (utils.isURLSearchParams(data)) {
//                                 setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
//                                 return data.toString();
//                             }
//                             if (utils.isObject(data)) {
//                                 setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
//                                 return JSON.stringify(data);
//                             }
//                             return data;
//                         }],

//                         transformResponse: [function transformResponse(data) {
//                             /*eslint no-param-reassign:0*/
//                             if (typeof data === 'string') {
//                                 try {
//                                     data = JSON.parse(data);
//                                 } catch (e) { /* Ignore */ }
//                             }
//                             return data;
//                         }],

//                         timeout: 0,

//                         xsrfCookieName: 'XSRF-TOKEN',
//                         xsrfHeaderName: 'X-XSRF-TOKEN',

//                         maxContentLength: -1,

//                         validateStatus: function validateStatus(status) {
//                             return status >= 200 && status < 300;
//                         }
//                     };

//                     defaults.headers = {
//                         common: {
//                             'Accept': 'application/json, text/plain, */*'
//                         }
//                     };

//                     utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
//                         defaults.headers[method] = {};
//                     });

//                     utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
//                         defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
//                     });

//                     module.exports = defaults;


//                     /***/ }),
//                 /* 12 */
//                 /***/ (function(module, exports, __webpack_require__) {

//                     'use strict';

//                     var utils = __webpack_require__(2);

//                     module.exports = function normalizeHeaderName(headers, normalizedName) {
//                         utils.forEach(headers, function processHeader(value, name) {
//                             if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
//                                 headers[normalizedName] = value;
//                                 delete headers[name];
//                             }
//                         });
//                     };


//                     /***/ }),
//                 /* 13 */
//                 /***/ (function(module, exports, __webpack_require__) {

//                     'use strict';

//                     var utils = __webpack_require__(2);
//                     var settle = __webpack_require__(14);
//                     var buildURL = __webpack_require__(6);
//                     var parseHeaders = __webpack_require__(17);
//                     var isURLSameOrigin = __webpack_require__(18);
//                     var createError = __webpack_require__(15);

//                     module.exports = function xhrAdapter(config) {
//                         return new Promise(function dispatchXhrRequest(resolve, reject) {
//                             var requestData = config.data;
//                             var requestHeaders = config.headers;

//                             if (utils.isFormData(requestData)) {
//                                 delete requestHeaders['Content-Type']; // Let the browser set it
//                             }

//                             var request = new XMLHttpRequest();

//                             // HTTP basic authentication
//                             if (config.auth) {
//                                 var username = config.auth.username || '';
//                                 var password = config.auth.password || '';
//                                 requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
//                             }

//                             request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);

//                             // Set the request timeout in MS
//                             request.timeout = config.timeout;

//                             // Listen for ready state
//                             request.onreadystatechange = function handleLoad() {
//                                 if (!request || request.readyState !== 4) {
//                                     return;
//                                 }
//                                 if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
//                                     return;
//                                 }

//                                 // Prepare the response
//                                 var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
//                                 var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
//                                 var response = {
//                                     data: responseData,
//                                     status: request.status,
//                                     statusText: request.statusText,
//                                     headers: responseHeaders,
//                                     config: config,
//                                     request: request
//                                 };

//                                 settle(resolve, reject, response);

//                                 // Clean up request
//                                 request = null;
//                             };

//                             request.onabort = function handleAbort() {
//                                 if (!request) {
//                                     return;
//                                 }

//                                 reject(createError('Request aborted', config, 'ECONNABORTED', request));

//                                 // Clean up request
//                                 request = null;
//                             };

//                             // Handle low level network errors
//                             request.onerror = function handleError() {
//                                 // Real errors are hidden from us by the browser
//                                 // onerror should only fire if it's a network error
//                                 reject(createError('Network Error', config, null, request));

//                                 // Clean up request
//                                 request = null;
//                             };

//                             // Handle timeout
//                             request.ontimeout = function handleTimeout() {
//                                 reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED',
//                                     request));

//                                 // Clean up request
//                                 request = null;
//                             };
//                             if (utils.isStandardBrowserEnv()) {
//                                 var cookies = __webpack_require__(19);

//                                 // Add xsrf header
//                                 var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ?
//                                     cookies.read(config.xsrfCookieName) :
//                                     undefined;

//                                 if (xsrfValue) {
//                                     requestHeaders[config.xsrfHeaderName] = xsrfValue;
//                                 }
//                             }

//                             // Add headers to the request
//                             if ('setRequestHeader' in request) {
//                                 utils.forEach(requestHeaders, function setRequestHeader(val, key) {
//                                     if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
//                                         // Remove Content-Type if data is undefined
//                                         delete requestHeaders[key];
//                                     } else {
//                                         // Otherwise add header to the request
//                                         request.setRequestHeader(key, val);
//                                     }
//                                 });
//                             }

//                             // Add withCredentials to request if needed
//                             if (config.withCredentials) {
//                                 request.withCredentials = true;
//                             }

//                             // Add responseType to request if needed
//                             if (config.responseType) {
//                                 try {
//                                     request.responseType = config.responseType;
//                                 } catch (e) {
//                                     if (config.responseType !== 'json') {
//                                         throw e;
//                                     }
//                                 }
//                             }

//                             // Handle progress if needed
//                             if (typeof config.onDownloadProgress === 'function') {
//                                 request.addEventListener('progress', config.onDownloadProgress);
//                             }

//                             // Not all browsers support upload events
//                             if (typeof config.onUploadProgress === 'function' && request.upload) {
//                                 request.upload.addEventListener('progress', config.onUploadProgress);
//                             }

//                             if (config.cancelToken) {
//                                 // Handle cancellation
//                                 config.cancelToken.promise.then(function onCanceled(cancel) {
//                                     if (!request) {
//                                         return;
//                                     }

//                                     request.abort();
//                                     reject(cancel);
//                                     // Clean up request
//                                     request = null;
//                                 });
//                             }

//                             if (requestData === undefined) {
//                                 requestData = null;
//                             }

//                             // Send the request
//                             request.send(requestData);
//                         });
//                     };


//                     /***/ }),
//                 /* 14 */
//                 /***/ (function(module, exports, __webpack_require__) {

//                     'use strict';

//                     var createError = __webpack_require__(15);

//                     module.exports = function settle(resolve, reject, response) {
//                         var validateStatus = response.config.validateStatus;
//                         if (!validateStatus || validateStatus(response.status)) {
//                             resolve(response);
//                         } else {
//                             reject(createError(
//                                 'Request failed with status code ' + response.status,
//                                 response.config,
//                                 null,
//                                 response.request,
//                                 response
//                             ));
//                         }
//                     };


//                     /***/ }),
//                 /* 15 */
//                 /***/ (function(module, exports, __webpack_require__) {

//                     'use strict';

//                     var enhanceError = __webpack_require__(16);
//                     module.exports = function createError(message, config, code, request, response) {
//                         var error = new Error(message);
//                         return enhanceError(error, config, code, request, response);
//                     };


//                     /***/ }),
//                 /* 16 */
//                 /***/ (function(module, exports) {

//                     'use strict';

//                     module.exports = function enhanceError(error, config, code, request, response) {
//                         error.config = config;
//                         if (code) {
//                             error.code = code;
//                         }
//                         error.request = request;
//                         error.response = response;
//                         error.toJSON = function() {
//                             return {
//                                 // Standard
//                                 message: this.message,
//                                 name: this.name,
//                                 // Microsoft
//                                 description: this.description,
//                                 number: this.number,
//                                 // Mozilla
//                                 fileName: this.fileName,
//                                 lineNumber: this.lineNumber,
//                                 columnNumber: this.columnNumber,
//                                 stack: this.stack,
//                                 // Axios
//                                 config: this.config,
//                                 code: this.code
//                             };
//                         };
//                         return error;
//                     };


//                     /***/ }),
//                 /* 17 */
//                 /***/ (function(module, exports, __webpack_require__) {

//                     'use strict';

//                     var utils = __webpack_require__(2);

//                     var ignoreDuplicateOf = [
//                         'age', 'authorization', 'content-length', 'content-type', 'etag',
//                         'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
//                         'last-modified', 'location', 'max-forwards', 'proxy-authorization',
//                         'referer', 'retry-after', 'user-agent'
//                     ];

//                     module.exports = function parseHeaders(headers) {
//                         var parsed = {};
//                         var key;
//                         var val;
//                         var i;

//                         if (!headers) { return parsed; }

//                         utils.forEach(headers.split('\n'), function parser(line) {
//                             i = line.indexOf(':');
//                             key = utils.trim(line.substr(0, i)).toLowerCase();
//                             val = utils.trim(line.substr(i + 1));

//                             if (key) {
//                                 if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
//                                     return;
//                                 }
//                                 if (key === 'set-cookie') {
//                                     parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
//                                 } else {
//                                     parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
//                                 }
//                             }
//                         });

//                         return parsed;
//                     };


//                     /***/ }),
//                 /* 18 */
//                 /***/ (function(module, exports, __webpack_require__) {

//                     'use strict';

//                     var utils = __webpack_require__(2);

//                     module.exports = (
//                         utils.isStandardBrowserEnv() ?

//                             (function standardBrowserEnv() {
//                                 var msie = /(msie|trident)/i.test(navigator.userAgent);
//                                 var urlParsingNode = document.createElement('a');
//                                 var originURL;

//                                 function resolveURL(url) {
//                                     var href = url;

//                                     if (msie) {
//                                         // IE needs attribute set twice to normalize properties
//                                         urlParsingNode.setAttribute('href', href);
//                                         href = urlParsingNode.href;
//                                     }

//                                     urlParsingNode.setAttribute('href', href);

//                                     // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
//                                     return {
//                                         href: urlParsingNode.href,
//                                         protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
//                                         host: urlParsingNode.host,
//                                         search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
//                                         hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
//                                         hostname: urlParsingNode.hostname,
//                                         port: urlParsingNode.port,
//                                         pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
//                                             urlParsingNode.pathname :
//                                             '/' + urlParsingNode.pathname
//                                     };
//                                 }

//                                 originURL = resolveURL(window.location.href);

//                                 return function isURLSameOrigin(requestURL) {
//                                     var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
//                                     return (parsed.protocol === originURL.protocol &&
//                                         parsed.host === originURL.host);
//                                 };
//                             })() :

//                             // Non standard browser envs (web workers, react-native) lack needed support.
//                             (function nonStandardBrowserEnv() {
//                                 return function isURLSameOrigin() {
//                                     return true;
//                                 };
//                             })()
//                     );


//                     /***/ }),
//                 /* 19 */
//                 /***/ (function(module, exports, __webpack_require__) {

//                     'use strict';

//                     var utils = __webpack_require__(2);

//                     module.exports = (
//                         utils.isStandardBrowserEnv() ?

//                             // Standard browser envs support document.cookie
//                             (function standardBrowserEnv() {
//                                 return {
//                                     write: function write(name, value, expires, path, domain, secure) {
//                                         var cookie = [];
//                                         cookie.push(name + '=' + encodeURIComponent(value));

//                                         if (utils.isNumber(expires)) {
//                                             cookie.push('expires=' + new Date(expires).toGMTString());
//                                         }

//                                         if (utils.isString(path)) {
//                                             cookie.push('path=' + path);
//                                         }

//                                         if (utils.isString(domain)) {
//                                             cookie.push('domain=' + domain);
//                                         }

//                                         if (secure === true) {
//                                             cookie.push('secure');
//                                         }

//                                         document.cookie = cookie.join('; ');
//                                     },

//                                     read: function read(name) {
//                                         var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
//                                         return (match ? decodeURIComponent(match[3]) : null);
//                                     },

//                                     remove: function remove(name) {
//                                         this.write(name, '', Date.now() - 86400000);
//                                     }
//                                 };
//                             })() :

//                             // Non standard browser env (web workers, react-native) lack needed support.
//                             (function nonStandardBrowserEnv() {
//                                 return {
//                                     write: function write() {},
//                                     read: function read() { return null; },
//                                     remove: function remove() {}
//                                 };
//                             })()
//                     );


//                     /***/ }),
//                 /* 20 */
//                 /***/ (function(module, exports) {

//                     'use strict';

//                     module.exports = function isAbsoluteURL(url) {
//                         return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
//                     };


//                     /***/ }),
//                 /* 21 */
//                 /***/ (function(module, exports) {

//                     'use strict';

//                     module.exports = function combineURLs(baseURL, relativeURL) {
//                         return relativeURL
//                             ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
//                             : baseURL;
//                     };


//                     /***/ }),
//                 /* 22 */
//                 /***/ (function(module, exports, __webpack_require__) {

//                     'use strict';

//                     var utils = __webpack_require__(2);
//                     module.exports = function mergeConfig(config1, config2) {
//                         // eslint-disable-next-line no-param-reassign
//                         config2 = config2 || {};
//                         var config = {};

//                         utils.forEach(['url', 'method', 'params', 'data'], function valueFromConfig2(prop) {
//                             if (typeof config2[prop] !== 'undefined') {
//                                 config[prop] = config2[prop];
//                             }
//                         });

//                         utils.forEach(['headers', 'auth', 'proxy'], function mergeDeepProperties(prop) {
//                             if (utils.isObject(config2[prop])) {
//                                 config[prop] = utils.deepMerge(config1[prop], config2[prop]);
//                             } else if (typeof config2[prop] !== 'undefined') {
//                                 config[prop] = config2[prop];
//                             } else if (utils.isObject(config1[prop])) {
//                                 config[prop] = utils.deepMerge(config1[prop]);
//                             } else if (typeof config1[prop] !== 'undefined') {
//                                 config[prop] = config1[prop];
//                             }
//                         });

//                         utils.forEach([
//                             'baseURL', 'transformRequest', 'transformResponse', 'paramsSerializer',
//                             'timeout', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName',
//                             'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress', 'maxContentLength',
//                             'validateStatus', 'maxRedirects', 'httpAgent', 'httpsAgent', 'cancelToken',
//                             'socketPath'
//                         ], function defaultToConfig2(prop) {
//                             if (typeof config2[prop] !== 'undefined') {
//                                 config[prop] = config2[prop];
//                             } else if (typeof config1[prop] !== 'undefined') {
//                                 config[prop] = config1[prop];
//                             }
//                         });

//                         return config;
//                     };


//                     /***/ }),
//                 /* 23 */
//                 /***/ (function(module, exports) {

//                     'use strict';

//                     function Cancel(message) {
//                         this.message = message;
//                     }

//                     Cancel.prototype.toString = function toString() {
//                         return 'Cancel' + (this.message ? ': ' + this.message : '');
//                     };

//                     Cancel.prototype.__CANCEL__ = true;

//                     module.exports = Cancel;


//                     /***/ }),
//                 /* 24 */
//                 /***/ (function(module, exports, __webpack_require__) {

//                     'use strict';

//                     var Cancel = __webpack_require__(23);

//                     function CancelToken(executor) {
//                         if (typeof executor !== 'function') {
//                             throw new TypeError('executor must be a function.');
//                         }

//                         var resolvePromise;
//                         this.promise = new Promise(function promiseExecutor(resolve) {
//                             resolvePromise = resolve;
//                         });

//                         var token = this;
//                         executor(function cancel(message) {
//                             if (token.reason) {
//                                 // Cancellation has already been requested
//                                 return;
//                             }

//                             token.reason = new Cancel(message);
//                             resolvePromise(token.reason);
//                         });
//                     }

//                     /**
//                      * Throws a `Cancel` if cancellation has been requested.
//                      */
//                     CancelToken.prototype.throwIfRequested = function throwIfRequested() {
//                         if (this.reason) {
//                             throw this.reason;
//                         }
//                     };

//                     CancelToken.source = function source() {
//                         var cancel;
//                         var token = new CancelToken(function executor(c) {
//                             cancel = c;
//                         });
//                         return {
//                             token: token,
//                             cancel: cancel
//                         };
//                     };

//                     module.exports = CancelToken;


//                     /***/ }),
//                 /* 25 */
//                 /***/ (function(module, exports) {

//                     'use strict';
//                     module.exports = function spread(callback) {
//                         return function wrap(arr) {
//                             return callback.apply(null, arr);
//                         };
//                     };
//                     /***/ })
//                 /******/ ])
//     });
/* SDK */
const SDK = {
    /* 公共属性 */
    sdkVer: '1.0.0',
    reportUrl: 'https://twl.yccdn.com',
    sdkType: '2',
    businessType: 'mocard',
    sourceInfo: '',
    osType: '',
    deviceModel: '',
    deviceBrand: '',
    containerType: '',
    pageUrl: '',
    prevPage: '',
    userId: '',
    openId: '',
    unionId: '',
    sessionId: '',
    abTest: '',
    userFrom: '0',
    maxReportCount: 100,
    rFailList: [],
    /* 接口区分 */
    reportUrlMap: {
        dev: 'https://twl.yccdn.com',
        prod: 'https://wl.yccdn.com',
    },
    /* 固定key值 */
    keysMap: {
        rFailList: 'report-fail-list',
        rCookieId: 'report-cookie-id',
        rSourceId: 'report-source-id',
        rDeviceId: 'report-device-id',
        rUserinfoId: 'report-userinfo-id',
        rRoutesId: 'report-routes-id',
        rInitId: 'report-init-id',
        rSourceUrlKey: 'source',
        rUserFromId: 'report-user-from-id',
    },
    /* 初始化之前 */
    beforeInit(params={}){
        let key = this.keysMap.rInitId
        window.localStorage.setItem(key, JSON.stringify(params))
        // this.buisType = params.businessType || ''
    },
    /* 初始化方法 */
    init(){
        console.log(`【SDK_ALL版本】 ${this.sdkVer}`)
        // console.log(axios)
        // console.log(this)
        this.setPageRoutes()
        // this.listenPageRoutes()
        this.getLocalCookies()
        this.getSourceByUrlParams()
        this.getUserFrom()
        let filter = {
            domain:window.location.host,
            title:document.title,
            path:window.location.pathname,
            xpath:'',
            url:window.location.href,
        };
        this.sendPage({
            filter:filter
        })
        this.pageUrl = window.location.href
        window.onload = ()=>{
            this.addElementEvent()
        }
        //url变化监听器
        // if( ('onhashchange' in window) && ((typeof document.documentMode==='undefined') || document.documentMode==8)) {
        //     // 浏览器支持onhashchange事件
        //     window.addEventListener("hashchange", this.sendPage);  // TODO，对应新的hash执行的操作函数
        //     // alert(32)
        // } else {
            // 不支持则用定时器检测的办法
            var that = this
            // setInterval(function() {
                // 检测hash值或其中某一段是否更改的函数， 在低版本的iE浏览器中通过window.location.hash取出的指和其它的浏览器不同，要注意
                // var ischanged = that.isHashChanged();
                // that.setPageRoutes();
                // if(ischanged) {
                //     that.sendPage();  // TODO，对应新的hash执行的操作函数
                // }
            // }, 150);
        // }
        // this.onAppUnload()
    },
    isHashChanged(){
        var lasturl = this.getPageRoutes();
        var cururl=window.location.href;
       if(lasturl ==cururl ){
          return false;
      }
     return true;
    },
    //监听触发操作
    //页面上报
    sendPage(params={}){
        this.getAllData(Object.assign({}, params, {
           type: '1',
        }))
    },
    /* 页面事件上报 */
    sendPageEvent(params={}){
        this.getAllData(Object.assign({}, params, {
             type: '2',
        }))
    },
    /* 用户行为上报 */
    // sendCommonEvent(params={}){
    //     this.getAllData(Object.assign({}, params, {
    //         event_type: '2',
    //     }))
    // },
    /* 卡片展现上报 */
    // sendShowEvent(params={}){
    //     this.getAllData(Object.assign({}, params, {
    //         event_type: '3',
    //     }))
    // },
    /* 数据整合处理 */
    getAllData(p){
        this.getInitData()
        this.setPageRoutes()
        this.getUserInfo()
        this.getDeviceInfo()
        let time = this.getTimeMs()+''
        new Promise(((resolve, reject) => {
            let data = JSON.stringify(p.data || {})
            let cookies = this.getLocalCookies()
            this.sourceInfo = this.getSourceByUrlParams()
            this.osType = this.getOsType()
            this.prevPage = this.getPageRoutes()
            let params = {
                filter:p.filter,
                event_id: p.event_id, // 唯一的事件ID
                type:p.type,
                event_type: p.event_type, // 事件类型 1页面 2操作行为
                user_id: this.userId, // 注册并登录过的用户，用户唯一标识（可能为 手机号）
                cookie: cookies, // 用户本地模拟的cookie，不清除一直存在且不变
                sdk_type: this.sdkType, // 使用SDK的端
                create_at: time, // 上报的时间戳
                source_extend_para: this.sourceInfo, // 来源信息 从 url 中获取（一个字符串）
                busi_extend_para: data, // 预留字段，业务参数（json字符串）
                busi_type: this.businessType, // 预留字段，业务类型
                abtest: this.abTest, // 预留字段，A/B测试
                data: JSON.stringify({
                    sdk_ver: this.sdkVer, // SDK版本
                    platform: this.osType, // 平台系统，Android、 IOS
                    page_url: window.location.href, // 页面完整路径
                    open_id: this.openId, // 预留字段，针对于能获取到 openId 的微信用户
                    unionid: this.unionId, // 预留字段，针对于能获取到 unionid 的微信用户
                    model: this.deviceModel, // 预留字段，设备型号
                    brand: this.deviceBrand, // 预留字段，设备品牌
                    // container_platform: this.containerType, // 预留字段，H5所在的容器
                    page_prev: this.prevPage, // 预留字段，上一页面 url
                    user_from: this.userFrom, // 用户会员类型
                })
            }
            resolve(params)
        })).then(res=>{
            this.reportData(res);
            if( this.reportUrl == this.reportUrlMap['dev']){
                this.reportInitElm(res);
            }            
        }).catch(e=>{
            console.log(e);
        })
    },
    //元素配置列表初始化
    reportInitElm(data){
        let list = data
        list.filter.busi_type  = data.busi_type;
        list.filter.cookie  = data.cookie;
        list.filter.url = window.location.href,
        this.ajax({
            url: `${this.reportUrl}/initializa`,
            // url: '/api/initializa',
            data: list.filter,
        }).then(res=>{
            // console.log(res)
            if (res.status === 200) {
                console.log('元素上传成功');
            } else {
                console.log('元素上传失败1');
                // this.setReportFailData(data)
            }
        }).catch(err=>{
            console.log(err)
            console.log('元素上传失败2')
            // this.setReportFailData(data);
        })
    },
    /* 上报ajax */
    reportData(data){
        let list = Array.isArray(data) ? data: [data];
        this.ajax({
            url: `${this.reportUrl}/treport`,
            // url: '/api/treport',
            data: list,
        }).then(res=>{
            // console.log(res);
            if (res.status === 200) {
                console.log('上报成功');
            } else {
                console.log('上报失败1')
                this.setReportFailData(data)
            }
        }).catch(err=>{
            console.log(err)
            console.log('上报失败2')
            this.setReportFailData(data)
        })
    },
    /* 生成 cookies */
    createCookies(){
        let key = this.keysMap.rCookieId
        let random = Math.floor(Math.random()*900000000)+100000000
        let time = this.getTimeMs()
        let cookies = `${random}_${time}`
        // console.log(cookies);
        window.localStorage.setItem(key, cookies);
        this.setCookie(key, cookies);
        return cookies
    },
    /* 获取本地唯一的 cookies */
    getLocalCookies(){
        let key = this.keysMap.rCookieId
        return window.localStorage.getItem(key) || this.createCookies()
    },
    /* 从 url 中获取来源信息 */
    getSourceByUrlParams(){
        let k1 = this.keysMap.rSourceUrlKey
        let k2 = this.keysMap.rSourceId
        let source = this.getSearchParams(k1) || ''
        if (source.trim()==='') {
            source = window.sessionStorage.getItem(k2) || ''
        }
        window.sessionStorage.setItem(k2, source)
        // console.log('source:',source)
        return source
    },
    /* ajax封装 */
    ajax(opts={}){
        return new Promise((resolve, reject) => {
            // if(axios){
            axiosAjax({
                    url: opts.url,
                    method: opts.method || 'POST',
                    headers: Object.assign({},
                        // { 'content-type': 'application/json' },
                        opts.headers
                    ),
                    data: opts.data,
                    params: opts.params,
                }).then( res =>{
                    // console.log(res)
                    resolve(res)
                }).catch(e => {
                    console.log(e)
                    reject(e)
                })
        })
    },
    /* 上报失败记录本地 */
    setReportFailData(data){
        let key = this.keysMap.rFailList
        let li = window.localStorage.getItem(key)
        let list = li && JSON.parse(li) || []
        list = [data, ...list]
        window.localStorage.setItem(key, JSON.stringify(list))
    },
    /* 时间格式化 */
    formatFixedDate(date, fmt){
        if(typeof date === 'number') {
            date = new Date(date)
        }
        if(!date instanceof Date) {
            return ''
        }
        var o = {
            "M+" : date.getMonth()+1, //月份
            "d+" : date.getDate(), //日
            "h+" : date.getHours()%12 === 0 ? 12 : date.getHours()%12, //小时
            "H+" : date.getHours(), //小时
            "m+" : date.getMinutes(), //分
            "s+" : date.getSeconds(), //秒
            "q+" : Math.floor((date.getMonth()+3)/3), //季度
            "S" : date.getMilliseconds() //毫秒
        }
        var week = {
            "0" : "日",
            "1" : "一",
            "2" : "二",
            "3" : "三",
            "4" : "四",
            "5" : "五",
            "6" : "六"
        }
        if(/(y+)/.test(fmt)){
            fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length))
        }
        if(/(E+)/.test(fmt)){
            fmt=fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "星期" : "周") : "")+week[date.getDay()+""])
        }
        for(var k in o){
            if(new RegExp("("+ k +")").test(fmt)){
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length===1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)))
            }
        }
        return fmt
    },
    /* 获取当前时间ms */
    getTimeMs(){
        return new Date().getTime();
    },
    /* 设置 cookie */
    setCookie(name, value, params={}) {
        var stringifiedAttributes = '';
        // 过期时间
        if (typeof params.expires === 'number') {
            var date = new Date();
            date.setDate(date.getDate() + params.expires);
            stringifiedAttributes +=';expires=' + date;
        }
        // path
        var path = params.path ? params.path : '/';
        stringifiedAttributes +=';path=' + path;
        // domain
        if (params.domain) {
            stringifiedAttributes +=';domain=' + params.domain;
        }
        document.cookie = name + '=' + value + stringifiedAttributes;
    },
    /* 获取 cookie */
    getCookie(name) {
        var arr = document.cookie.replace(/\s/g, "").split(';');
        for (var i = 0; i < arr.length; i++) {
            var tempArr = arr[i].split('=');
            if (tempArr[0] === name) {
                return decodeURIComponent(tempArr[1]);
            }
        }
        return '';
    },
    /* 删除 cookie */
    removeCookie(name, params={}) {
        // 设置已过期，系统会立刻删除cookie
        params.expires = -1;
        this.setCookie(name, '', params);
    },
    /* url--search参数解析 */
    getSearchParams(key){
        let search = window.location.search.substr(1)
        if (search.trim()==='') {
            let str = window.location.hash.substr(1)
            search = str.indexOf('?')>-1?str.match(/\?(\S*)/)[1]:''
        }
        // console.log(search)
        let obj = {}
        let pArr = search.split('&')
        pArr.forEach(item=>{
            let kv = item.split('=')
            obj[kv[0]] = kv[1]
        })
        return decodeURIComponent(obj[key] || '')
    },
    /* 获取平台系统 */
    getOsType(){
        let ua = window.navigator.userAgent
        return /(iPhone|iPad)/.test(ua)?'ios':'android'
    },
    /* 设置保存设备相关信息 */
    setDeviceInfo(info={}){
        let key = this.keysMap.rDeviceId
        window.localStorage.setItem(key, JSON.stringify(info))
    },
    getDeviceInfo(){
        let key = this.keysMap.rDeviceId
        let info = window.localStorage.getItem(key) || {}
        this.deviceModel = info.model || ''
        this.deviceBrand = info.brand || ''
        // this.containerType = info.container || ''
    },
    /* 监听页面是否切换 */
    listenPageRoutes(){
        setInterval(()=>{
            this.setPageRoutes();
        }, 100)
    },
    /* 记录设置页面url */
    setPageRoutes(){
        let key = this.keysMap.rRoutesId
        let url = window.location.href
        let localRs = window.sessionStorage.getItem(key) || ''
        let routes = localRs && JSON.parse(localRs) || {}
        if (localRs==='') {
            routes = {
                0: '',
                1: url,
            }
        } else {
            if (routes['1']!==url) {
                let oldRs = Object.assign({}, routes)
                routes = {
                    0: oldRs['1'],
                    1: url
                }
            }
        }
        window.sessionStorage.setItem(key, JSON.stringify(routes))
    },
    /* 获取页面url */
    getPageRoutes(p='0'){
        let key = this.keysMap.rRoutesId;
        return JSON.parse(window.sessionStorage.getItem(key))[p]
    },
    /* 设置用户信息 */
    setUserInfo(info={}){
        let key = this.keysMap.rUserinfoId
        window.localStorage.setItem(key, JSON.stringify(info))
    },
    /* 获取用户信息 */
    getUserInfo(){
        let key = this.keysMap.rUserinfoId
        let info = JSON.parse(window.localStorage.getItem(key) || '{}')
        // console.log(info)
        this.userId = info.userId || ''
        this.openId = info.openId || ''
        this.unionId = info.unionId || ''
    },
    /* 上报接口区分 */
    setReportUrlForProd(){
        this.reportUrl = this.reportUrlMap['prod']
        console.log('Prod环境接口', this.reportUrl);
    },
    /* 获取服务环境 */
    getInitData(){
        let key = this.keysMap.rInitId
        let params = JSON.parse(window.localStorage.getItem(key) || '{}')
        // console.log(params)
        this.reportUrl = params.envType === 'prod' ? this.reportUrlMap['prod'] : this.reportUrlMap['dev']
        // console.log(this.reportUrl)
    },

    /* 离开H5应用监听 */
    onAppUnload(){
        window.onbeforeunload = (e)=>{
            window.localStorage.setItem('app-leave-time',new Date().toLocaleString());
            this.sendFailList();
        }
    },
    /* 批量上报 failList */
    sendFailList(){
        let key = this.keysMap.rFailList
        this.rFailList = JSON.parse(window.localStorage.getItem(key) || '[]')
        let list = this.rFailList.slice(0, this.maxReportCount)
        if (list && list.length>0) {
            this.ajax({
                url: this.reportUrl,
                data: list,
            }).then(res=>{
                // console.log(res)
                if (res.status === 200) {
                    console.log('上报成功')
                    let newList = this.rFailList.slice(this.maxReportCount)
                    window.localStorage.getItem(key, JSON.stringify(newList))
                } else {
                    console.log('上报失败1')
                    // this.setReportFailData(data);
                }
            }).catch(err=>{
                console.log(err)
                console.log('上报失败2')
                // this.setReportFailData(data);
            })
        }
    },
    setUserFrom(p='0'){
        p = p+''
        let key = this.keysMap.rUserFromId;
        window.localStorage.setItem(key, p)
        this.userFrom = p
    },
    getUserFrom(){
        let p = window.localStorage.getItem(this.keysMap.rUserFromId);
        this.userFrom = p || '0'
    },
    addElementEvent(){
        document.body.addEventListener('click', (e)=>{
            //判断是否跳转页面
            let url = window.location.href
            if(this.pageUrl != url ){
                this.pageUrl = url
                this.sendPage({
                    filter:filter
                })
            }
            console.log(e,1)
            let ev = e || window.event
            let target = ev.target || ev.srcElement
            let index = target.dataset.index || ''
            //拼装过滤参数
            let filter = {};
            console.log(ev,444)
            if(ev){
               filter = this.filterParams(ev);
            }
            console.log(filter);
            this.sendPageEvent({
                filter:filter
            })
            
        }, false)
    },
    filterParams(element){
        console.log(element)
        let target = element.target;
        let xpath = this.readXPath(element);
        let index = this.getIndex(target);
        return {
                tagName:target.tagName,
                text:target.innerText,
                domain:window.location.host,
                index:index,
                title:document.title,
                path:window.location.pathname,
                xpath:xpath,
        }
    },
    getIndex(target){
        let Rindex = 0;
        if(target.parentNode&&target.parentNode.children!=null){
            [].forEach.call(target.parentNode.children,(item,index)=>{
                if(target == item){
                    return Rindex = index
                }
            })
        }
        return Rindex
    },
    //xpath路径拼接
    readXPath(element) {
        let paths = element.path || (element.composedPath && element.composedPath());
        let htmlStr = ''
        paths.forEach((item, index)=>{
            if(item!=window&&item.nodeName!='#document'&&item.nodeName!='HTML'&&item.nodeName!='BODY'){
                htmlStr+=`/${item.nodeName.toLowerCase()}${item.id?'#'+item.id:item.className?'.'+item.className:''}`
            }
        })
        return htmlStr;
        
    },
};
SDK.init();
export const $SDK_ALL = SDK;

