/**
 * Created by Henq on 2016/5/30.
 * Update by liliang 2016-9-19
 */
(function($){
    var self,  panel,title,opt,sdate,edate,pid;
    function create(target,opt){
        var sdate='',shour='00:00',edate='',ehour='00:00';
        if(opt.sdate!=undefined){
            sdate=opt.sdate.format('yyyy-MM-dd');
            shour=opt.sdate.format('hh:00');
        }else{
        	opt.sdate=new Date();
        }
        if(opt.edate!=undefined){
            edate=opt.edate.format('yyyy-MM-dd');
            ehour=opt.edate.format('hh:00');
        }else{
        	opt.edate=new Date();
        }
        var isempty=opt.empty?'':'none';
        
        if($("#"+opt.pid).length>0){
       		$("#"+opt.pid).remove();
        }
        
        panel=$('<div id="{0}" class="doubleDate"><div class="title"><input type="text" id="{8}"  readonly="readonly" value="{5}"><span id="{9}" class="ddhour {15}">{3}</span>&nbsp;至&nbsp;<input type="text" id="{10}"  readonly="readonly" value="{6}"><span id="{11}"  class="ddhour {15}">{4}</span> <input type="button" id="{12}" class="bt-blue-s ml5" value="确定"><input type="button" id="{13}" class="bt-gray-s ml5 {7}" value="清空">    </div> <div id="{1}"></div>    <div id="{2}" style=" border-left:1px solid #e6e6e6 "></div><div class="hourSelect" id="{14}"></div></div>'.format(opt.pid,opt.sid,opt.eid,shour,ehour,sdate,edate,isempty,opt.ddStime,opt.ddSHour,opt.ddEtime,opt.ddEHour,opt.dtbtOk,opt.dtbtCancel,opt.hourSelect,opt.ddhour));
        panel.appendTo('body');
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
	            $('#'+opt.hourSelect).hide();
	            $('#'+opt.ddStime).val(date.format('yyyy-MM-dd'));
	            var sdate=cloneDate(date);
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
        		//date=date.addDays(1);
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
	            $('#'+opt.hourSelect).hide();
	            $('#'+opt.ddEtime).val(date.format('yyyy-MM-dd'));
	            var edate=cloneDate(date);
	            $('#'+opt.sid).calendar({
			        validator: function(date){
			        	//date=date.addDays(-1);
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
        var arrs=[];
        for (var i = 0; i < 24; i++) {
            arrs.push('<button>{0}:00</button>'.format(i<10?'0'+i:i));
        }
        $('#'+opt.hourSelect).append(arrs.join(''));
        
        $('#'+opt.hourSelect+' button').each(function(){
            var self=$(this);
            self.on('click',function(){
                $('#'+$('#'+opt.hourSelect).data('target')).text($(this).text());
                $('#'+opt.hourSelect).hide();
            })
        });
        
        
        $('.'+opt.ddhour).on('click',function(){
            var self=$(this)
            $('#'+opt.hourSelect).data('target',self.attr('id'));
            var left=16;
            if(self.attr('id').indexOf('ddEHour')!=-1){
                left=96;
            }
            
            if(self.attr('id').indexOf('ddSHour')!=-1&& opt.slock!=undefined){
    			return false; 
            }
             	
         	if(self.attr('id').indexOf('ddEHour')!=-1&& opt.elock!=undefined){
				 return false; 
         	}
            
            
            $('#'+opt.hourSelect+' button').removeAttr("disabled").css('color',"black"); //移除disabled属性
            if($('#'+opt.ddEtime).val()==$('#'+opt.ddStime).val()){
             	
             	if(self.attr('id').indexOf('ddSHour')!=-1){
    				var enumber = $('#'+opt.ddEHour).text().substr(0,2)*1;
             		$('#'+opt.hourSelect+' button').each(function(index,element){
	            		var a=$(element);
	            		if(index>enumber){
	             			a.attr('disabled',"true").css('color',"#C1C1C1"); //添加disabled属性 
	             		}
             		});
             	}
             	
             	if(self.attr('id').indexOf('ddEHour')!=-1){
    				var snum = $('#'+opt.ddSHour).text().substr(0,2)*1;
             		$('#'+opt.hourSelect+' button').each(function(index,element){
	            		var a=$(element);
	            		if(index<snum){
	             			a.attr('disabled',"true").css('color',"#C1C1C1"); //添加disabled属性
	             		}
             		});
             	}
            }
            
            $('#'+opt.hourSelect).css('left',left+'px').show();
        });
        
         //点击空白关闭时间选择
        $(document).on('click', function (e) {
        	var id=$(e.target).attr('id');
        	if(id==undefined){id=''}
            if (id.indexOf('ddEHour')==0&&id.indexOf('ddSHour')==0) {
                $('#'+opt.hourSelect).hide();
            }
        });
        
        
        //清空
        $('#'+opt.dtbtCancel).on('click',function(){
            $('#'+opt.pid).hide();
            self.val('');
            //$('#'+opt.ddStime).val('');
            //$('#'+opt.ddEtime).val('');
        });
        //确定
        $('#'+opt.dtbtOk).on('click',function(){
            
            if($('#'+opt.ddStime).val()==""|| $('#'+opt.ddEtime).val()==""){
            	return;
            }
            var ddstime=$('#'+opt.ddStime).val()+' '+$('#'+opt.ddSHour).text();
            var ddetime=$('#'+opt.ddEtime).val()+' '+$('#'+opt.ddEHour).text();
            
            if(opt.range!=undefined&&opt.rangeType!=undefined){
            	var difference=new Date(ddetime.replace(/-/g,"/"))-new Date(ddstime.replace(/-/g,"/"));
        		if(opt.rangeType=='Hour'){
        			var num=difference/ (1000 * 60 * 60 );
        			if(num>opt.range){
        				jf.sendNotice('提示','时间范围不能超过 '+opt.range+'小时', 2, 2);
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
        				jf.sendNotice('提示','时间范围不能超过 '+opt.range+'周', 2, 2);
        				return;
        			}
        		}else if(opt.rangeType=='Month'){
        			var data1=new Date(ddstime);
        			var data2=cloneDate(data1).addMonths(opt.range);
        			var daynum=(data2-data1)/(1000 * 60 * 60 * 24);
        			
        			var num=difference/ (1000 * 60 * 60 * 24  );
        			if(num>daynum){
        				jf.sendNotice('提示','时间范围不能超过 '+opt.range+'个月', 2, 2);
        				return;
        			}
        		}else if(opt.rangeType=='Year'){
        			var data1=new Date(ddstime);
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
            
            var curVal=('{0}至{1}').format(ddstime,ddetime);
            
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
    function initDoubleTime(target,cfg){
        self=$(target);
        opt= $.extend({
            id:self.attr('id'),
            pid:'doubleTime'+self.attr('id'),
            sid:'sTime'+guid(),
            eid:'eTime'+guid(),
            ddStime:'ddStime'+guid(),
            ddSHour:'ddSHour'+guid(),
            ddEtime:'ddEtime'+guid(),
            ddEHour:'ddEHour'+guid(),
            dtbtOk:'dtbtOk'+guid(),
            dtbtCancel:'dtbtCancel'+guid(),
            hourSelect:'hourSelect'+guid(),
            ddhour:'ddhour'+guid(),
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
        /*panel=$('#'+opt.pid);
        if(panel.length==0){
            
        }*/
        create(target,opt);
        self.addClass('choice').attr('readonly',true);
        if(!self.hasClass('font11')){self.addClass('font11')}
        self.on('click',function(e){
            self=$(e.target);
            var p=self.offset();
            //$('#'+opt.pid).css({left:p.left+'px',top: p.top+32+'px'}).show();
            
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
        });
    }
    $.fn.jfDoubleTime=function(cfg){
        initDoubleTime(this,cfg);
    }
})(jQuery)
