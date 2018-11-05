/**
 * Created by Liliang on 2016/5/11.
 * Edit by Henq on 2016/05/18;
 */
var jfregiondata,jfregionsitems=[],userRegionCode;
(function($){
    var panel,opt,self,pid='jfRegionSelect',sid;
    function create(target,curval){
            if(opt.data.length==0){
                $.get(opt.url).done(function(data){
                    jfregiondata=data;
                    jfregionsitems.forEach(function(li){
                        var curItem=jsonObjectById(data,li.val());
                        if(curItem!=undefined){
                            li.val(curItem[opt.text]);
                        }
                    });
                    opt.data=jsonObjectById(data,opt.region);
                    var curdata=opt.data.children;
                    var olen=0;
                    if(curdata!=undefined){
                        olen=curdata.length;
                    };
                    var regions=[];
                    regions.push('<ul class="province">');
                    //regions.push('<li class="title"><span id="jfRegionCur" class="all"  data-value="{1}">{0}</span><span class="clear" id="jfRegionClear">清空</span></li>'.format(opt.data.text,opt.data.id));
                    regions.push('<li class="title"><span id="jfRegionCur" class="all"  data-value="{1}">{0}</span></li>'.format(opt.data[opt.text],opt.data[opt.value]));
                    for(var i=0;i<olen;i++){
                        var province=curdata[i];
                        regions.push('<li><a id="{0}" title="{1}">{1}</a>'.format(pid+province[opt.value],province[opt.text]));
                        if(province.children!=undefined&&province.children.length>0){
                            regions.push('<ul class="city">');
                            var k = 0;
                            for (; k < province.children.length; k++) {
                                var city = province.children[k];
                                regions.push('<li><a id="{0}" title="{1}">{1}</a>'.format(pid+city[opt.value],city[opt.text]));
                                if(city.children!=undefined&&city.children.length>0){
                                    regions.push('<ul class="county">');
                                    var j = 0;
                                    for (;j < city.children.length; j++) {
                                        var county = city.children[j];
                                        regions.push('<li><a id="{0}" title="{1}">{1}</a></li>'.format(pid+county[opt.value],county[opt.text]));
                                    }
                                    regions.push('</ul></li>');
                                }else{
                                    regions.push('</li>');
                                }
                            }
                            regions.push('</ul></li>');
                        }else{
                            regions.push('</li>');
                        }
                    }
                    regions.push('</ul>');
                  /*  var hstr=regions.join('').replace('</li><//li>','');
                    panel.append(regions.join(hstr));*/
                    panel.append(regions.join(''));

                    panel.find('li>a').each(function(){
                        var li=$(this);
                        li.on('click',function(){
                            var v=li.attr('id').substr(pid.length);
                            self.val(li.text());
                            $('#'+sid).val(v);
                            panel.fadeOut(400);
                        })
                    });
                   /* panel.find('#jfRegionClear').on('click',function(){
                        self.val('');
                        $('#'+sid).val('');
                        panel.fadeOut(400);
                    });*/
                    panel.find('#jfRegionCur').on('click',function(){
                        var cur=$(this);
                        self.val(cur.text());
                        $('#'+sid).val(cur.data('value'));
                        panel.fadeOut(400);
                    });
                });
            }
    }
    
    
    
    function initRegion(target,cfg){
    	//alert(cfg);
        self=$(target);
        var curVal=self.val();
        opt= $.extend({
            id:self.attr('id'),
            sid:'target'+guid(),
            text:'short_name',
            value:'id',
            region:cfg,
            data:[],
            url:Actions.common.region
        },cfg);
        panel=$('#'+pid);
        var name=self.attr('name');
        var region=$('<input type="hidden" name="{0}" id="{1}" value="{2}">'.format(name,opt.sid,curVal));
        self.attr('readonly',true).data('sid',opt.sid).addClass('choice').attr('name',name+'_name').after(region);
        if(panel.length==0){
            panel=$('<div id="{0}"  class="jf-region"></div>'.format(pid));
            panel.appendTo('body');
            create(target,curVal);
        }
        else if(jfregiondata!=undefined){
            if(curVal!=''){
                var curItem=jsonObjectById(jfregiondata,curVal);
                if(curItem!=undefined){
                    self.val(curItem[opt.text]);
                }
            }
        }/**/
        jfregionsitems.push(self);
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
                    $('#'+pid).fadeOut(400);
                }
            }
        });
    }
    $.fn.jfRegion=function(cfg){
    	//获取当前登录用户的行政区划
    	var target=this;
    	//userRegionCode=0;
		initRegion(target,cfg);
    }
})(jQuery)
