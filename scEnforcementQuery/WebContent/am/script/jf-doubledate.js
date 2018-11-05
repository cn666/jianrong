/**
 * Created by Henq on 2016/5/30.
 * Update by liliang 2016-9-19
 */
(function($){
    var self,  panel,title,opt,pid;
    function create(target,opt){
    	
        var sdate='',edate='';
        if(opt.sdate!=undefined){
            sdate=opt.sdate.format('yyyy-MM-dd');
        }else{
        	opt.sdate=new Date();
        }
        if(opt.edate!=undefined){
            edate=opt.edate.format('yyyy-MM-dd');
        }else{
        	opt.edate=new Date();
        }
        var isempty=opt.empty?'':'none';
        
        if($("#"+opt.pid).length>0){
       		$("#"+opt.pid).remove();
        }
        
        panel=$('<div id="{0}" class="doubleDate"><div class="title"><input type="text" readonly="readonly"  id="{6}" value="{3}">&nbsp;至&nbsp;<input type="text" readonly="readonly" id="{7}" value="{4}"><input type="button" id="{8}" class="bt-blue-s ml5" value="确定"><input type="button" id="{9}" class="bt-gray-s ml5 {5}" value="清空">    </div> <div id="{1}"></div>    <div id="{2}" style=" border-left:1px solid #e6e6e6 "></div></div>'.format(opt.pid,opt.sid,opt.eid,sdate,edate,isempty,opt.ddsid,opt.ddeid,opt.ddbtok,opt.ddbtcancel));
        panel.appendTo('body');
        
        
        /*mindate:undefined,
            maxdate:undefined,
        */
        
        //注册起始日期
        $('#'+opt.sid).calendar({
        	width:220,
        	border:0,
        	firstDay:1,
        	current:opt.sdate,
        	validator: function(date){
        		if(opt.slock!=undefined){
        			return !opt.slock;
        		}
        		if(opt.smindate!=undefined && date<opt.smindate){
					return false;
				}
	        	if(opt.smaxdate!=undefined && date>opt.smaxdate){
					return false;
				}
	            return date<=opt.edate;
	        },
        	onSelect:function(date){
	            $('#'+opt.ddsid).val(date.format('yyyy-MM-dd'));
	            var sdate = cloneDate(date);
	            $('#'+opt.eid).calendar({
			        validator: function(date){
			        	if(opt.elock!=undefined){
		        			return !opt.elock;
		        		}
			        	if(opt.emindate!=undefined && date<opt.emindate){
							return false;
						}
			        	if(opt.emaxdate!=undefined && date>opt.emaxdate){
							return false;
						}
			        	
			        	
			            return date>=sdate;
			        }
		        });
        	}
        });
        $('#'+opt.eid).calendar({
        	width:220,
        	border:0,
        	firstDay:1,
        	current:opt.edate,
        	validator: function(date){
        		if(opt.elock!=undefined){
        			return !opt.elock;
        		}
        		if(opt.emindate!=undefined && date<opt.emindate){
					return false;
				}
	        	if(opt.emaxdate!=undefined && date>opt.emaxdate){
					return false;
				}
	            return date>=opt.sdate;
	        },
        	onSelect:function(date){
	            $('#'+opt.ddeid).val(date.format('yyyy-MM-dd'));
	            var edate=cloneDate(date);
	            $('#'+opt.sid).calendar({
			        validator: function(date){
			        	if(opt.slock!=undefined){
		        			return !opt.slock;
		        		}
			        	if(opt.smindate!=undefined && date<opt.smindate){
							return false;
						}
			        	if(opt.smaxdate!=undefined && date>opt.smaxdate){
							return false;
						}
			            return date<=edate 
			        }
		        });
        	}
        });

        //清空
        $('#'+opt.ddbtcancel).on('click',function(){
           $('#'+opt.pid).hide();
            self.val('');
            //$('#'+opt.ddsid).val('');
            //$('#'+opt.ddeid).val('');
        });
        //确定
        $('#'+opt.ddbtok).on('click',function(){
            if($('#'+opt.ddsid).val()==""|| $('#'+opt.ddeid).val()==""){
            	return;
            }
           if(opt.range!=undefined&&opt.rangeType!=undefined){
           		var sdata=$('#'+opt.ddsid).val().replace(/-/g,"/");
           		var edata=$('#'+opt.ddeid).val().replace(/-/g,"/");
        		var difference=new Date(edata)-new Date(sdata);
        		if(opt.rangeType=='Hour'){
        			var num=difference/ (1000 * 60 * 60 );
        			if(num>opt.range){ 
        				jf.sendNotice('提示', '时间范围不能超过 '+opt.range+'小时', 2, 2);
        				return;
        			}
        		}else if(opt.rangeType=='Day'){
        			var num=difference/ (1000 * 60 * 60 * 24 );
        			if(num>opt.range){
        				jf.sendNotice('提示', '时间范围不能超过 '+opt.range+'天', 2, 2);
        				return;
        			}
        		}else if(opt.rangeType=='Week'){
        			var num=difference/ (1000 * 60 * 60 * 24 * 7);
        			if(num>opt.range){
        				jf.sendNotice('提示', '时间范围不能超过 '+opt.range+'周', 2, 2);
        				return;
        			}
        		}else if(opt.rangeType=='Month'){
        			var data1=new Date(sdata);
        			var data2=cloneDate(data1).addMonths(opt.range);
        			var daynum=(data2-data1)/(1000 * 60 * 60 * 24);
        			
        			var num=difference/ (1000 * 60 * 60 * 24);
        			if(num>daynum){
        				jf.sendNotice('提示', '时间范围不能超过 '+opt.range+'个月', 2, 2);
        				return;
        			}
        		}else if(opt.rangeType=='Year'){
        			var data1=new Date(sdata);
        			var data2=cloneDate(data1).addYears(opt.range);
        			var daynum=(data2-data1)/(1000 * 60 * 60 * 24);
        			
        			var num=difference/ (1000 * 60 * 60 * 24);
        			if(num>daynum){
        				jf.sendNotice('提示', '时间范围不能超过 '+opt.range+' 年', 2, 2);
        				return;
        			}
        		}
        	}
            $('#'+opt.pid).hide();
            
            var curVal=$('#'+opt.ddsid).val()+'至'+$('#'+opt.ddeid).val();
            
            if(self.prop('tagName')=='INPUT'){
                self.val(curVal);
            }else {
                self.text(curVal);
            }
            if(opt.onChange!=undefined){
            	opt.onChange(curVal);
            }
        });
    };
    function initDoubleDate(target,cfg){
        self=$(target);
        opt= $.extend({
            id:self.attr('id'),
            pid:'doubleDate'+self.attr('id'),
            sid:'sDate'+guid(),
            eid:'eDate'+guid(),
            ddsid:'ddSdate'+guid(),
            ddeid:'ddEdate'+guid(),
            ddbtok:'ddbtOk'+guid(),
            ddbtcancel:'ddbtCancel'+guid(),
            empty:false,
            sdate:undefined,
            edate:undefined,
            smaxdate:undefined,
            smindate:undefined,
            emaxdate:undefined,
            emindate:undefined,
            slock:undefined,
            elock:undefined,
            range:undefined,
            rangeType:undefined,
            onChange:undefined
        },cfg);
        pid=opt.pid;
       /* panel=$('#'+opt.pid);
        if(panel.length==0){
            create(target,opt);
        }*/
        create(target,opt);
        self.addClass('choice').attr('readonly',true);
        if(self.hasClass('font11')){self.removeClass('font11')}
        self.on('click',function(e){
            self=$(e.target);
            var p=self.offset();
            
            if($(window).width()-p.left<460){
            	var left = p.left- (460- self.width());
            	$('#'+opt.pid).css({left:left+'px',top: p.top+32+'px'}).show();
            }else{
            	$('#'+opt.pid).css({left:p.left+'px',top: p.top+32+'px'}).show();
            }
            
            
        });
        //点击空白关闭
       $(document).on('click',function(e){
            if(!$(e.target).is(self)){
                if((!$(e.target).hasClass('calendar-day')&&$('#'+pid).find($(e.target)).length==0)){
                    $('#'+pid).fadeOut(400);
                }
            }
        }); /**/
    }
    $.fn.jfDoubleDate=function(cfg){
        initDoubleDate(this,cfg);
    }
})(jQuery)
