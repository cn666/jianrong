/**
 * create2d by Henq on 2016/5/23.
 */
(function($){
    var panel2;
    var opt2;
    var self2;
    var pid2;
    var sid2;
    function create2(target,cfg){
    	$('#'+cfg.pid2).remove();
        panel2=$('<div id="{0}"  class="jf-date"><div id="{1}"></div></div>'.format(cfg.pid2,cfg.cid));
        panel2.appendTo('body');
       $('#'+cfg.cid).calendar({
           onSelect:function(date){
               self2.val(date.format('yyyy-MM-dd'));
               $('#'+cfg.pid2).hide();
               if(cfg.callBack!=undefined){
            	   cfg.callBack();
               }
           },
           validator: function(date){
           		//console.log(date);
           		if(cfg.mindate!=undefined && cfg.maxdate!=undefined){
           			return cfg.mindate<=date && date<=cfg.maxdate;
           		}else if(cfg.mindate!=undefined){
           			return cfg.mindate<=date;
           		}else if(cfg.maxdate!=undefined){
           			return date<=cfg.maxdate;
           		}else{
           			return true;
           		}
	       },
           width:230,
           firstDay:1
       }).css({height:210+'px'}).append($('<div class="foot"><span class="clear">清空</span>  <span class="today">今天</span> <span class="ensure">确定</span>  </div>'));
        $('.clear','#'+cfg.cid).on('click',function(){
            self2.val('');
            $('#'+cfg.pid2).hide();
        });
        $('.today','#'+cfg.pid2).on('click',function(){
        	if(cfg.untoDay!=undefined){
        		 jf.sendNotice('提示','有效期不能等于审核日期',2,2);
        	}else{
            self2.val((new Date()).format('yyyy-MM-dd'));
            $('#'+cfg.pid2).hide();
            if(cfg.callBack!=undefined){
         	   cfg.callBack();
            }
        	}
        });
        $('.ensure','#'+cfg.cid).on('click',function(){
        	self.val($('#'+cfg.cid).calendar('options').current.format('yyyy-MM-dd'));
            $('#'+cfg.pid2).hide();
        });
    }
    function initDate2(target,cfg){
        self2=$(target);
        opt2= $.extend({
            id:self2.attr('id'),
            sid2:'target'+self2.attr('id'),
            pid2:'jfdate'+self2.attr('id'),
            cid:'jfcale'+self2.attr('id'),
            format:undefined,   //格式化日期类型
            mindate:undefined,
            maxdate:undefined,
            untoDay: undefined,  //有效性审核禁用“今天”功能
            callBack: undefined    
        },cfg);
        pid2=opt2.pid2;
        panel2=$('#'+pid2);
      //  if(panel2.length==0){
            create2(target,opt2);
      //  }
        self2.attr('readonly',true).addClass('choice');
        self2.on('click',function(e){
            self2=$(e.target);
            sid2=self2.data('sid2');
            var p=self2.offset();
            $('#'+pid2).css({left:p.left+'px',top: p.top+32+'px'}).show();
        });
        //点击空白关闭
        $(document).on('click',function(e){
            if(!$(e.target).is(self2)){
                if(( $('#'+pid2).find($(e.target)).length==0)){
                    $('#'+pid2).hide();
                }
            }
        })
    }
    $.fn.jfDate2=function(cfg){
        initDate2(this,cfg);
    }
})(jQuery)
