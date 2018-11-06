/**
 * Created by Henq on 2016/5/23.
 */
(function($){
    var panel,opt,self,pid,sid;
    function create(target,cfg){
        panel=$('<div id="{0}"  class="jf-date"><div id="{1}"></div></div>'.format(cfg.pid,cfg.cid));
        panel.appendTo('body');
       $('#'+cfg.cid).calendar({
           onSelect:function(date){
               self.val(date.format('yyyy-MM-dd'));
               $('#'+cfg.pid).hide();
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
            self.val('');
            $('#'+cfg.pid).hide();
        });
        $('.today','#'+cfg.pid).on('click',function(){
        	if(cfg.untoDay!=undefined){
        		 jf.sendNotice('提示','有效期不能等于审核日期',2,2);
        	}else{
            self.val((new Date()).format('yyyy-MM-dd'));
            $('#'+cfg.pid).hide();
            if(cfg.callBack!=undefined){
         	   cfg.callBack();
            }
        	}
        });
        $('.ensure','#'+cfg.cid).on('click',function(){
        	self.val($('#'+cfg.cid).calendar('options').current.format('yyyy-MM-dd'));
            $('#'+cfg.pid).hide();
        });
    }
    function initDate(target,cfg){
        self=$(target);
        opt= $.extend({
            id:self.attr('id'),
            sid:'target'+guid(),
            pid:'jfdate'+guid(),
            cid:'jfcale'+guid(),
            format:undefined,   //格式化日期类型
            mindate:undefined,
            maxdate:undefined,
            untoDay: undefined,  //有效性审核禁用“今天”功能
            callBack: undefined    
        },cfg);
        pid=opt.pid;
        panel=$('#'+pid);
        if(panel.length==0){
            create(target,opt);
        }
        self.attr('readonly',true).addClass('choice');
        self.on('click',function(e){
            self=$(e.target);
            sid=self.data('sid');
            var p=self.offset();
            $('#'+pid).css({left:p.left+'px',top: p.top+32+'px'}).show();
        });
        //点击空白关闭
        $(document).on('click',function(e){
            if(!$(e.target).is(self)){
                if(( $('#'+pid).find($(e.target)).length==0)){
                    $('#'+pid).hide();
                }
            }
        })
    }
    $.fn.jfDate=function(cfg){
        initDate(this,cfg);
    }
})(jQuery)
