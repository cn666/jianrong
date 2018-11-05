/**
 * 西安交大长天软件股份有限公司
 */
var _modal,_child,_url='',urlParas={};
 jf={
    init:function(){
        initValid();
        initTag();
        bindTabs();
        if(this.initPage&&typeof this.initPage =="function"){
            this.initPage();
        }
    },
    //initTag:function(){
    //    initTag();
    //},
    initPage:undefined,
    Get:function(){
        return $.ajaxGet();
    },
    Post:function(){
        return $.post();
    },
    Delete:function(){

    },
    Submit:function(){

    },
     _initWindow:function(){
         var pop;
         if( $('#popwindow').length==0){
             pop=$("<div id='popwindow'></div>");
             pop.append('body');
         }else{
             pop= $('#popwindow');
         } ;
         return pop;
     },
     datagrid:function(id,url,para,opt){
         var config= $.extend({
             method: 'post',
            // width: '100%',
             queryParams:para,
             singleSelect: true,
            // nowrap: true,
             pagination: true,
             selectOnCheck:false,
             checkOnSelect:false,
             scrollbarSize: 0
           , fit:true
         },opt);
         if(typeof url=='string'){
             config.url=url;
         }else {
             config.data=url;
         }
       return  $(id).datagrid(config);
     },
    loadWindow:function(title,url,width,height,opt){
    	_url=url;
        initUrlParas(url);
        _modal=this._initWindow();
        var width=width||800;
        var height=height||400;
        var config=$.extend({
            width: width,
            height: height,
            top: ($(window).height() - height) * 0.5,
    		left: ($(window).width()- width) * 0.5,
            title: title,
            collapsible: false,
            draggable:true,
            resizable:false,
            minimizable: false,
            maximizable: false,
            modal: true,
            closed: true ,
            onClose:function(){
            	closecontrol();
            	try{
            		_child.remove();
            	}catch(e){}
            	
                $('#popwindow').empty();
            },
            onOpen:function(){
            }
        },opt);
        _modal.window(config).window('open').window('refresh', url);
        $('.window .panel-title').css('overflow','hidden').css('white-space','nowrap').css('text-overflow','ellipsis').css('width',width-50);
        
        $('.window .panel-title').empty();
        $('.window .panel-title').append('<span  style="overflow: hidden; display: block; text-overflow: ellipsis; max-width: {1}px" title="{0}">{0}</span>'.format(title,(width-50)));
    },
     iframeWindow:function(title,url,width,height,opt){
         initUrlParas(url);
         _modal=this._initWindow();
         var width=width||800;
         var height=height||400;
         var config=$.extend({
            width: width,
            height: height,
            title: title,
            collapsible: false,
             draggable:true,
             minimizable: false,
             maximizable: false,
             modal: true,
             closed: true,
             onClose:function(){
                 _modal.remove();
             }
         },opt);
         var content='<iframe  src="{0}" style="width:100%;height: 100%; border: 0; " id="iframePop">'.format(url);
         _modal.html(content);
         _modal.window(config).window('open');
         $('.window .panel-title').css('overflow','hidden').css('white-space','nowrap').css('text-overflow','ellipsis').css('width',width-50).attr('title',title);
     },
    loadChildWindow:function(url,width,height,opt){
         _child=$("#childWindow")
        var closeBtn,body;
        if(_child.length==0){
            _child=$('<div class="jf-childWindow" id="childWindow"></div>');
            _child.append('<a id="childWindowClose" class="close"></a><div id="childWindowBody" class="jf-body"></div>');
            _child.appendTo($('body'));
            $('#childWindowClose').on('click',function(){
                _child.remove();
                closecontrol();
                $('#childWindowBody').empty();
            });
        }
        body=$('#childWindowBody');
        body.load(url).parent().css({width:width+'px',height:height+'px',marginLeft:(-width/2)+'px',marginTop:(-height/2)+'px'}).append(closeBtn).show();

    },
     iframeChildWindow:function(url,width,height,opt){
         _child=$("#childWindow");
         var closeBtn,body;
         var width=width||800;
         var height=height||400;
         if(_child.length==0){
             _child=$('<div class="jf-childWindow" id="childWindow"></div>');
             _child.append('<a id="childWindowClose" class="close"></a><div id="childWindowBody" class="jf-body"></div>');
             _child.appendTo($('body'));
             $('#childWindowClose').on('click',function(){
                 _child.detach();
             });
         }
         body=$('#childWindowBody');
         var content='<iframe  src="{0}" style="width:100%;height: 100%; border: 0; " id="iframeChildPop"/>'.format(url);
         body.html(content);
         _child.css({width:width+'px',height:height+'px',marginLeft:(-width/2)+'px',marginTop:(-height/2)+'px'}).show();
     },
    closeWindow:function(){
        _modal.window('close');
        _modal.remove();
    },
     closeChild:function(){
         _child.remove();
     },
     /*
     * title,标题
     * content,内容
     * okFn,确定后的回调函数
     * */
    confirm:function(title,content,okFn,noFn) {
        var _html = '<div id="{2}" class="jf-confirm">'
        	+'<div class="face1" style="width:100%;height:240px;background:#ffffff;z-index:9999;"> '
        	+'<iframe id="iframebar" src="about:blank" frameBorder=0  marginHeight=0 marginWidth=0 style="position:absolute;visibility:inherit; top:0px;left:0px;height:240px;width:100%;z-index:-1;background:#ffffff;filter=\'progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=0)\'"></iframe>'
        	+'<div class="head">{0}</div><a class="close"></a><div class="body"><span class="icon icon-opt-ask-color"></span><div class="content">{1}?</div></div><div class="foot"><input type="button" class="bt_blue" value="是"/><input type="button" class="bt_gray  ml10" value="否"/></div></div></div>';
        var id = 'confirm' + guid();
        var _confirm = $(_html.format(title, content, id));
        _confirm.appendTo('body');
        _confirm.find('.bt_gray,.close').on('click',function(){
        	if(noFn!=undefined&&typeof noFn=='function'){
				noFn();
			}
            confirmClose();
        });
        _confirm.find('.bt_blue').on('click',function(){
            if(okFn!=undefined&&typeof okFn=='function'){
            	 try {
            		 okFn();
                     confirmClose();
                 } catch (e) {

                 }
            }
        });
        function confirmClose(){
            $('#'+id).fadeOut(600).remove();
        }
    }
    ,
     //
     /*
      * type=0 失败,1,成功,2,警告
      * closeTime=0 代表需要手动关闭，单位为秒
     * */
    sendNotice:function(title,content,type,closeTime){
        var _html='<div id="{3}" class="jf-notice">'
        	+'<div class="shadow" style="width:100%;z-index:9999;"> '
        	+'<iframe id="iframebar" class="jf-notice" src="about:blank" frameBorder=0  marginHeight=0 marginWidth=0 style="position:absolute;visibility:inherit; top:0px;left:0px;height:50px;width:100%;z-index:-1;background:transparent;filter=\'progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=0)\'"></iframe>'
        	+'<div class="shadow"></div><a class="close"></a>	<span class="resultIcon {4}"></span><div class="content"><span class="title">{0}</span><span class="detail" style="word-warp:break-word;word-break:break-all">{1}</span><span class="time">{2}</span></div></div></div>';
        var container=$("#jfNoticeContainer");
        if(container.length==0){
            container=$('<div id="jfNoticeContainer"></div>');
            container.appendTo('body');
        }
        var icon='',closeMsg='';
        var id='notice'+guid();
//        if(closeTime!=0){
//            closeMsg=closeTime+'秒后关闭';
//        }
        icon=['icon-opt-fail','icon-opt-ok','icon-opt-empty'][type];
        var notice=$(_html.format(title,content,closeMsg,id,icon));
        notice.find('.close').on('click',function(){
            $('#'+id).fadeOut(600,function(){
                $('#'+id).remove();
            });
        });
        notice.appendTo(container);
        var interval;
        if(closeTime!=0){
        	$('#'+id).find('span.time').text(closeTime+'秒后关闭');
            interval=setInterval(function(){
            	closeTime--;
            	$('#'+id).find('span.time').text(closeTime+'秒后关闭');
            	if(closeTime==0){
            		if( $('#'+id).length>0){
	                    $('#'+id).fadeOut(600,function(){
	                        $('#'+id).remove();
	                    });
	                }
            		window.clearInterval(interval);
            	}
            },1000);
        }
        $('#'+id).find('span.time').on('mouseover',function(){
        	window.clearInterval(interval);
        	$('#'+id).find('span.time').text('停止计时关闭');
        });
    }
};
var jfUser={
    userName:'test',
    name:'henq',
    region:'0'
}
$(document).ready(function(){
    jf.init();
})
/*初始化验证*/
function initForm(){
    if(_url.indexOf('?')!=-1){
        var str = _url.substring(_url.indexOf('?')+1);
        //console.log(str);
        $('#addForm').setForm(str);
    }
    bindTabs();//tab页头效果设置
   initValid();//绑定验证
   initTag();//绑定控件
}
function initValid(){
    if($('.addForm,.standard').length>0){
        $('.addForm [data-valid]').each(function(){
            var self=$(this);
            var cfg={};
            var rules=self.data('valid');
            rules=rules.replace('(','[').replace(')',']');
            var config=rules.split(' '),clen=config.length;
            var types=[];
            for (var i = 0; i < clen; i++) {
                var obj = $.trim(config[i]);
                if(obj=='required'){
                    cfg.required=true;
                }else if(obj!=''){
                    types.push(obj);
                }
            }
            if(types.length>0){
                cfg.validType=types;
            }
            var tip=self.data('tip');
            if(tip!=undefined){
                cfg.missingMessage=tip;
                cfg.invalidMessage=tip;
            }
            cfg.tipPosition='bottom';

            self.removeData("validatebox");
            self.validatebox(cfg).removeClass('validatebox-invalid');
        })
    }
    if($('.stantdard').length>0){
        $('.stantdard [data-valid]').each(function(){
            var self=$(this);
            var cfg={};
            var rules=self.data('valid');
            rules=rules.replace('(','[').replace(')',']');
            var config=rules.split(' '),clen=config.length;
            var types=[];
            for (var i = 0; i < clen; i++) {
                var obj = $.trim(config[i]);
                if(obj=='required'){
                    cfg.required=true;
                }else if(obj!=''){
                    types.push(obj);
                }
            }
            if(types.length>0){
                cfg.validType=types;
            }
            var tip=self.data('tip');
            if(tip!=undefined){
                cfg.missingMessage=tip;
                cfg.invalidMessage=tip;
            }
            cfg.tipPosition='bottom';

            self.removeData("validatebox");
            self.validatebox(cfg);//.removeClass('validatebox-invalid');
        })
    }
}
function bindTabs(){
    if($("#tabs li").length>1){
        var tabs = $("#tabs li");
        var contents = $(".tab-content");
        tabs.each(function(i) {
            var obj = $(this);
            if (obj.hasClass("on")) {
                contents.eq(i).show();
            } else {
                contents.eq(i).hide();
            }
            obj.on("click", function() {
                tabs.each(function() {
                    $(this).removeClass("on");
                });
                contents.each(function() {
                    $(this).hide();
                });
                tabs.eq(i).addClass("on");
                contents.eq(i).show();
            });
        });
    }
}
function initTag(){
    $('input').each(function(){
        var self = $(this);
        var type = self.data('tag');
        if(!type){
            return;
        }
        self.removeData("tag");
        self.removeAttr("data-tag");
      /*  if(type=='edate'){
            self.addClass('Wdate').on('click',function(){WdatePicker()})
        }else */
        if(type=='date'){
            var curVal=self.val();
            if(curVal!=''&&curVal>1000){
                self.val((new Date(parseFloat(curVal))).format('yyyy-MM-dd'));
            }
            self.jfDate();
        }else if(type=='doubledate'){
            self.jfDoubleDate();
        }else if(type=='doubletime'){
            self.jfDoubleTime();
        }else if(type=='industry'){
            self.jfIndustry();
        }else if(type=='industryTree'){
            self.jfIndustryTree();
        }else if(type=='region'){//地区编码
           self.jfRegion();
        }else if(type=='valley'){//流域
            self.jfValley();
        }else if(type.indexOf('choice')==0){
            var cfg=type.substr(7);
            var opt= $.extend({},eval('Actions.'+cfg));
            self.jfchoice(opt);
        }
    });
};
function initUrlParas(url){
    var para= {};
    if(url.indexOf('?')>0){
        var strs = (url.substring(url.indexOf('?')+1)).split("&");
        for(var i = 0; i < strs.length; i ++) {
            para[strs[i].split("=")[0]]=strs[i].split("=")[1];
        }
        //urlParas= $.extend({},urlParas,para);
    }
    urlParas= $.extend({},para);
}
/**
 * 开始一个ajax请求
 * @param 请求路径
 * @param 请求方式POST GET
 * @param 请求数据(object){}
 * @param 请求回调
 * @constructor
 */
function JqAjax(url, method, param, callback) {
	Loading();
    $.ajax({
        url: url,
        type: method,
        data: param,
        dataType: "json",
        cache: false,
        global: false,
        success: function (data) {
        	if (typeof callback == "function") {
                callback.call(this, data);
        	hideLoading();
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
        	ajaxerror(XMLHttpRequest, textStatus, errorThrown,url,method,param);
        }
    });
}
function ajaxerror(XMLHttpRequest, textStatus, errorThrown,url,method,param){
	var error={
			url:url,
			method:method,
			param:param,
			XMLHttpRequest:XMLHttpRequest,
			textStatus:textStatus,
			errorThrown:errorThrown
    	}
	var msg = '错误：'+JSON.stringify(error);
	if(textStatus=='parsererror' && typeof(XMLHttpRequest.responseText)=="string"&&XMLHttpRequest.responseText.indexOf('登录')!=-1){
	jf.sendNotice('登录状态过期或在其他地方登录此账户','请重新登录，点击<a href="javascript:;" onclick="ReLogin()"> 重新登录 </a>系统。',2,0);
	}else{
		alert(msg);
    	console.log(msg);
    	hideLoading();
	}
}
function ReLogin(){
	if(typeof(window.top.location.href) =="string"){
		window.top.location.href=window.top.location.href;
		window.top.location.reload();
	}
}
function Loading() {
    $("<div class=\"datagrid-mask loading\"></div>").css({ display: "block", width: "100%",'z-index':88888888, height: $(window).height() }).appendTo("body");
    $("<div class=\"datagrid-mask-msg loadingmsg\"></div>").html($.fn.datagrid.defaults.loadMsg).appendTo("body").css({'z-index':99999999, display: "block", left: ($(document.body).outerWidth(true) - 190) / 2, top: ($(window).height() - 45) / 2 });
}
function hideLoading() {
    $(".loading").remove();
    $(".loadingmsg").remove();
}
/**
 * description:获取URL的参数的value
 *@name：参数名称
 */
function GetUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg); //匹配目标参数
    if (r != null) return unescape(r[2]);
    return null; //返回参数值
}
//关闭窗口并更新雪花图
function wclose(){
	if($.isFunction(window.initLeftPsInfoList)){
		var pageOptions=$('#viewpage').pagination("options");
		var pageNo;
		if(pageOptions)
			pageNo=pageOptions.pageNumber;
		else
			pageNo=1;

		if($.isFunction(window.setmap)&&$.isFunction(window.loadAttention)){ //当编辑页面为企业信息编辑页面时候，当前页为第一页
			pageNo=1;
			$('#viewpage').pagination("refresh",{ pageNumber:pageNo  })
		}
		initLeftPsInfoList(pageNo);
	}
	jf.closeWindow();   //窗体关闭事件
	if($.isFunction(window.load)){
		load(_viewpsid);
	}
	if($.isFunction(window.unRelationEquip)){
    	unRelationEquip(_viewpsid);//未关联监测设备
	}
	if($.isFunction(window.unRelationMp)){
		unRelationMp(_viewpsid);//未关联监控点
	}
}

function wload(){
	if($.isFunction(window.initLeftPsInfoList)){
		var pageOptions=$('#viewpage').pagination("options");
		var pageNo;
		if(pageOptions)
			pageNo=pageOptions.pageNumber;
		else
			pageNo=1;
		
		if($.isFunction(window.setmap)&&$.isFunction(window.loadAttention)){ //当编辑页面为企业信息编辑页面时候，当前页为第一页
			pageNo=1;
			$('#viewpage').pagination("refresh",{ pageNumber:pageNo  })
		}
		
		initLeftPsInfoList(pageNo);
	}
	if($.isFunction(window.load)){
		load(_viewpsid);
	}
	if($.isFunction(window.unRelationEquip)){
    	unRelationEquip(_viewpsid);//未关联监测设备
	}
	if($.isFunction(window.unRelationMp)){
		unRelationMp(_viewpsid);//未关联监控点
	}
}
//tabs-lr--begin--
$(function(){
    $("#lr_tab li").click(function(){
        $("#lr_tab li").eq($(this).index()).addClass("on").siblings().removeClass('on');
        $(".tab-content").addClass('h0').eq($(this).index()).removeClass('h0');
    });
    texttip();
});
//tabs-lr--end--


function texttip(){
	//text-autocomplete焦点事件
	$(".textTip").each(function(){
		var input_Tip = $(this);
	    if(input_Tip.val().length==0){
	    	input_Tip.css('color','#b6b6b6').val(input_Tip.attr('placeholder'));
	    }else if(input_Tip.val()==input_Tip.attr('placeholder')){
	    	input_Tip.css('color','#b6b6b6');
	    }else{
	    	input_Tip.css('color','#5b5b5b');
	    }
	    input_Tip.focus(function(e){
		   if(this.value==$(this).attr('placeholder')){
			   this.value='';
			   this.style.color = '#5b5b5b';
		   }
		}).blur(function(){
		   if(this.value==''){
			   this.value=$(this).attr('placeholder');
			   this.style.color = '#b6b6b6';
		   }
		}).on('keyup change',function(e){
			var ps_name =$(e.target);
			if(ps_name.val()==ps_name.attr('placeholder')||ps_name.val()==''){
				ps_name.css('color','#b6b6b6');
			}else{
				ps_name.css('color','#000');
			}
		});
	});
}


/**
 * 过滤字符串中的特殊符号(%、_)
 */
function filterStrSign(str){
	str=str.replace("%","");
	str=str.replace("_","");
	return str;
}

/**
 * 获取汉字和字母混合长度 汉字算2个字符
 * @param value
 * @returns length
 */
function HanZiLength(value){
    var len = 0;
    for (var i = 0; i < value.length; i++) {
        var c = value.charCodeAt(i);
        //单字节加1 
        if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
            len++;
        }
        else {
            len += 2;
        }
    }
    return len ;
}
/**
 * 关闭控件弹出框
 */
function closecontrol(){
	$('#industrySelect').hide();
  	$('#industryTreeSelect').hide();
  	$('#valleySelect').hide();
  	$('.jf-date').hide();
  	$('.doubleDate').hide();
	$('.jf-region').hide();
	$('.ac-panel').hide();
}
//Flash播放器检查是否安装
function flashChecker() {
  var hasFlash = 0; //是否安装了flash
  var flashVersion = 0; //flash版本
  if (document.all) {
    var swf = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
    if (swf) {
      hasFlash = 1;
      VSwf = swf.GetVariable("$version");
      flashVersion = parseInt(VSwf.split(" ")[1].split(",")[0]);
    }
  } else {
    if (navigator.plugins && navigator.plugins.length > 0) {
      var swf = navigator.plugins["Shockwave Flash"];
      if (swf) {
        hasFlash = 1;
        var words = swf.description.split(" ");
        for (var i = 0; i < words.length; ++i) {
          if (isNaN(parseInt(words[i]))) continue;
          flashVersion = parseInt(words[i]);
        }
      }
    }
  }
  return { f: hasFlash, v: flashVersion };
}



/*清除数据表格中的数据*/  
function clearDataGrid(id){  
	//获取当前页的记录数
	var item = $('#'+id).datagrid('getRows');    
	for (var i = item.length - 1; i >= 0; i--) {    
    	var index = $('#'+id).datagrid('getRowIndex', item[i]);    
    	$('#'+id).datagrid('deleteRow', index);
	}
}
//在需要调试的窗口页面中添加debug() 
function debug(){
	var debug=1;
}

