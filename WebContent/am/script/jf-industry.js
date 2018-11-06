/**
 * Created by Henq on 2016/5/10.
 */
(function($){
    var body,cid,self,key,industryTree,curVal;
    function create(target){
        body=$('<div id="industrySelect" class="industrySelect"> <p class="iS_search"> <input type="text" id="industrySearchKey" class="iS_text w250" value=""/> <a class="iS_bt" id="bt_industrySearch"></a> <span class="clear">全部</span></p> <div> <ul class="lr_tab"> <li class="on roundLeft">国民经济行业</li> <li class="roundRight">环保重点行业</li> </ul> </div> <div class="lr_content  lr_on "> <ul id="industryTree"></ul> </div> <div class="lr_content "> <div class="iS_keyIndustry"> <ul id="iS_keyIndustry"></ul> </div> </div></div>');
        var focusIndustry=body.find('#iS_keyIndustry');
        $.get(Actions.common.industry_emphasis).done(function(data){
            jfindustry_emphasisdata=data;
            if(curVal!=''){
                var item=jsonObjectById(jfindustry_emphasisdata,curVal);
                if(item!=undefined){
                    self.val(item.text);
                }
            }
            var fhtml=[];
            for (var i = 0; i < data.length; i++) {
                fhtml.push('<li>{1}</li>'.format(data[i].value,data[i].text));
            }
            focusIndustry.html(fhtml.join(''));
            //重点行业点击事件处理
            focusIndustry.find('li').each(function(index){
                var li=$(this);
                li.on('click',function(){
                    var item=data[index];
                    self.val(item.text+'(环重)');
                    $('#'+cid).val(item.value);
                    $('#'+self.attr('id')+'_focus').val(item.value);
                    focusIndustry.find('li').removeClass('on');
                    li.addClass('on');
                    body.hide();
                    
                    industryFocus=item.value;//表示该行业是环保重点行业
                })
            });
        });
        $('body').append(body);
        $.get(Actions.common.industry).done(function(data){
            jfindustrydata=data;
            if(curVal!=''){
                    var li=jsonObjectById(jfindustrydata,curVal);
                    if(li!=undefined){
                        self.val(li.text);
                    }
            }
            //国民经济行业树
            industryTree=$('#industryTree').tree({
                data:data,
                editable: false,
                onSelect:function(node){
                    self.val(node.text);
                    $('#'+cid).val(node.id);
                    body.hide();
                    
                	if(typeof(node.focus)!='undefined'){
                		self.val(node.text+'(环重)');
                    	$('#'+self.attr('id')+'_focus').val(node.focus);
                    	industryFocus=node.focus;//表示该行业是环保重点行业
                	}else{
                		$('#'+self.attr('id')+'_focus').val('');
                    	industryFocus='';//表示该行业是环保重点行业
                	}
                   /*
                    //使用时industryFocus不等于undefined并且为true表示该行业是环保重点行业
                    if(industryFocus!=undefined&&industryFocus){
                    	//表示该行业是环保重点行业
                    }*/
                },
                formatter:function(node){
                    if(typeof(node.focus)!='undefined'){
                        return node.text+'<span focus="'+node.focus+'" style="color: red; margin-left: 10px;display: inline-block">环重</span>';
                    }
                    return node.text;
                }
            });
        });


        //tab切换效果;
        $("#industrySelect .lr_tab li").each(function(index){
           var item= $(this);
            item.on('click',function(){
                $("#industrySelect .lr_content").removeClass('lr_on');
                $("#industrySelect .lr_tab li").removeClass('on');
                item.addClass('on');
                $("#industrySelect .lr_content").eq(index).addClass('lr_on');
            });
        })
        //搜索事件注册;
        $('#bt_industrySearch').on('click',function(){
            industryTree.tree('doFilter',$('#industrySearchKey').val());
        });
        //注册清空事件
        $('.clear','#industrySelect').on('click',function(){
            self.val('全部');
            $('#'+cid).val('');
            $("#industrySelect").hide();
        })
        //点击空白关闭
        $(document).on('click',function(e){
            if(!$(e.target).is(self)){
                if(($("#industrySelect").find($(e.target)).length==0)){
                    $("#industrySelect").hide();
                }
            }
        })
    }
    function init(target){
        self=$(target);
        curVal=self.val();
        if($('#industrySelect').length==0){
            create(target);
        }else{
            if(curVal!=''){
                var item=jsonObjectById(jfindustry_emphasisdata,curVal);
                if(item!=undefined){
                    self.val(item.text);
                }else{
                    var li=jsonObjectById(jfindustrydata,curVal);
                    if(li!=undefined){
                        self.val(li.text);
                    }
                }
            }
        }
        body=$('#industrySelect');
        var tname= $(target).attr('name');
        cid="industry"+guid();
        var hid=$('<input type="hidden" id="{1}" name="{0}" value="{2}">'.format(tname,cid,curVal));
        self.attr('name',tname+"_name").attr('readonly',true).data('sid',cid).addClass('choice').after(hid);
        if(curVal==''){
        	self.val('全部');
        }
        self.on('click',function(e){
            self=$(e.target);
            cid=self.data('sid');
            var p=self.offset();
            body.css({left:p.left+'px',top: p.top+self.height()+5+'px'}).show();
            
            $("#industrySearchKey").val('');
        });
    }
    $.fn.jfIndustry=function(){
        init(this);
    }
})(jQuery);