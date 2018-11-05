/**
 * Created by henq on 2016/4/24.
 */
Date.prototype.format = function (para) { //author: meizz
    var fmt;
    if(para==undefined){
        fmt='yyyy-MM-dd';
    }else if(para==0){
        fmt='yyyy-MM-dd hh:mm:ss S'
    }else{
        fmt=para;
    }
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))        {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    return fmt;
}
String.prototype.format=function()
{
    if(arguments.length==0) return this;
    for(var s=this, i=0; i<arguments.length; i++)
        s=s.replace(new RegExp("\\{"+i+"\\}","g"), arguments[i]);
    return s;
};
String.prototype.append=function(str){

    return this+str;
}
function repeater(data,tpl){
    var list=[],len=data.length;
    var i = 0;
    var temp=tpl.replace(/\{([a-zA-Z0-9-.]+)\}/gi,'+'+$1+'+')
    for (; i < len; i++) {
        var u = len[i];
    }
    return list.join('');
}
String.prototype.gblen = function() {
    var len = 0;
    for (var i=0; i<this.length; i++) {
        if (this.charCodeAt(i)>127 || this.charCodeAt(i)==94) {
            len += 2;
        } else {
            len ++;
        }
    }
    return len;
}
function guid(){
    return randomWord(false,32);
}
/*
 ** randomWord 产生任意长度随机字母数字组合
 ** randomFlag-是否任意长度 min-任意长度最小位[固定位数] max-任意长度最大位
 ** xuanfeng 2014-08-28
 */

function randomWord(randomFlag, min, max){
    var str = "",
        range = min,
        arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    // 随机产生
    if(randomFlag){
        range = Math.round(Math.random() * (max-min)) + min;
    }
    for(var i=0; i<range; i++){
      var  pos = Math.round(Math.random() * (arr.length-1));
        str += arr[pos];
    }
    return str;
}
function getEvent(){
    if(window.event)    {return window.event;}
    func=getEvent.caller;
    while(func!=null){
        var arg0=func.arguments[0];
        if(arg0){
            if((arg0.constructor==Event || arg0.constructor ==MouseEvent
                || arg0.constructor==KeyboardEvent)
                ||(typeof(arg0)=="object" && arg0.preventDefault
                && arg0.stopPropagation)){
                return arg0;
            }
        }
        func=func.caller;
    }
    return null;
}
//阻止冒泡
function cancelBubble(){
    var e=getEvent();
    if(window.event){
        //e.returnValue=false;//阻止自身行为
        e.cancelBubble=true;//阻止冒泡
    }else if(e.preventDefault){
        //e.preventDefault();//阻止自身行为
        e.stopPropagation();//阻止冒泡
    }
}
//json数据检索
function jsonObjectById(obj,Id){
    var _type=typeof obj;
    if(_type=='object'){
        if((obj.Id!=undefined&&obj.Id==Id)||(obj.id!=undefined&&obj.id==Id)||(obj.ID!=undefined&&obj.ID==Id)){
            var  result=obj;
            return result;
        } else if (obj instanceof Array)
        {
            for(field in obj){
                var result=  jsonObjectById(obj[field],Id);
                if(result!=undefined){
                    return result;
                }
            }
        } else {
            for(field in obj){
                var result=  jsonObjectById(obj[field],Id);
                if(result!=undefined){
                    return result;
                }
            }
        }
    }
}
function findOne(arrs,where){
    var len=arrs.length;
    for (var i = 0; i < len; i++) {
        var u = arrs[i];
        var flag=eval(where);
        if(flag){
            return u;
        }
    }
    return undefined;
}
function findDelete(arrs,where){
    var len=arrs.length,num=0;
    if(len==0){return; }
    for (var i = 0,n=0; i < len; i++) {
        var u = arrs[i];
        var flag=eval(where);
        if(!flag){
            arrs[n++]=arrs[i];
        }
    }
    arrs.length=n;
}
if (!Array.prototype.forEach) {
    Array.prototype.forEach = function(callback, thisArg) {
        var T, k;
        if (this == null) {
            throw new TypeError(" this is null or not defined");
        }
        var O = Object(this);
        var len = O.length >>> 0; // Hack to convert O.length to a UInt32
        if ({}.toString.call(callback) != "[object Function]") {
            throw new TypeError(callback + " is not a function");
        }
        if (thisArg) {
            T = thisArg;
        }
        k = 0;
        while (k < len) {
            var kValue;
            if (k in O) {
                kValue = O[k];
                callback.call(T, kValue, k, O);
            }
            k++;
        }
    };
}


// js 时间加减
Date.prototype.Format = function(fmt) {
    return this.format(fmt);
}

Date.prototype.addHours = function(h) {
    this.setHours(this.getHours() + h);
    return this;
};

Date.prototype.addDays = function(d) {
    this.setDate(this.getDate() + d);
    return this;
};

Date.prototype.addWeeks = function(w) {
    this.addDays(w * 7);
    return this;
};

Date.prototype.addMonths = function(m) {
    var d = this.getDate();
    this.setMonth(this.getMonth() + m);
    if (this.getDate() < d) this.setDate(0);
    return this;
};

Date.prototype.addYears = function(y) {
    var m = this.getMonth();
    this.setFullYear(this.getFullYear() + y);

    if (m < this.getMonth()) {
        this.setDate(0);
    };
    return this;
};

//var now = new Date();
//now.addDays(1); //加减日期操作
//alert(now.Format("yyyy-MM-dd"));


//判断对象是否为空
function isEmptyObject(e) {
    var t;
    for (t in e)
        return !1;
    return !0
}


//第一个参数是被克隆的对象，第二个参数是需要克隆的属性列表
function cloneOwn() {
  
  var obj = arguments[0];
  if (typeof obj === 'undefined' || obj === null)
      return {};

  if (typeof obj !== 'object')
      return obj;
  
  //第二个参数是属性名称列表，就采用该列表进行刷选
  //否则就克隆所有属性
  var attrs = arguments[1];
  var enable_spec_attr = true;
  if (!(attrs instanceof Array)) {
      //console.log(attrs);
      attrs = obj;
      enable_spec_attr = false;
  }

  var result = {};
  var i;
  for (i in attrs) {
      attr = enable_spec_attr? attrs[i]: i;
      //console.log(attr);
      if (obj.hasOwnProperty(attr)) {
          if (obj[attr] instanceof Array) {
              result[attr] = cloneArray(obj[attr]);
          }
          else if (typeof obj[attr] === 'object') {
              result[attr] = cloneOwn(obj[attr]);
          } else {
              result[attr] = obj[attr];
          }
      }
  }

  return result;
}


//克隆数组
function cloneArray(array) {
  if (typeof array === 'undefined' || array === null)
    return [];

  if (!(array instanceof Array))
    return [];

  result = [];

  var i;
  for(i in array) {
    if (typeof array[i] !== 'object') {
      result[i] = array[i];
      continue;
    }

    //clone object
    result[i] = cloneOwn(array[i]);
  }

  return result;
}


function cloneDate(obj) {
	var copy = new Date();
    copy.setTime(obj.getTime());
    return copy;
  /*// Handle the 3 simple types, and null or undefined
  if (null == obj || "object" != typeof obj) return obj;
 
  // Handle Date
  if (obj instanceof Date) {
    var copy = new Date();
    copy.setTime(obj.getTime());
    return copy;
  }
 
  // Handle Array
  if (obj instanceof Array) {
    var copy = [];
    for (var i = 0, var len = obj.length; i < len; ++i) {
      copy[i] = clone(obj[i]);
    }
    return copy;
  }
 
  // Handle Object
  if (obj instanceof Object) {
    var copy = {};
    for (var attr in obj) {
      if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
    }
    return copy;
  }
 
  throw new Error("Unable to copy obj! Its type isn't supported.");*/
}