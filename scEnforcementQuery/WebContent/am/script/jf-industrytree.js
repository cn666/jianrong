/**
 * Created by Henq on 2016/5/26.
 */
(function($){
    var body,opt,cid,self,key,industryTreeTree;
    function create(target){
        body=$('<div id="industryTreeSelect" class="industrySelect"> <p class="iS_search"> <input type="text" id="industryTreeSearchKey" class="iS_text w250" value=""/> <a class="iS_bt" id="bt_industryTreeSearch"></a> <span class="clear">清空</span></p><div class="lr_content  lr_on "> <ul id="industryTreeTree"></ul> </div> </div>');
        $('body').append(body);
        //国民经济行业树

        $.get(Actions.common.industry).done(function(data){
            jfindustryTreedata=data;
            if(self.val()!=''){
                var item=jsonObjectById(data,self.val());
                if(item!=undefined){
                    self.val(item.text);
                }
            }
            industryTreeTree=$('#industryTreeTree').tree({
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
                },
                formatter:function(node){
                    if(typeof(node.focus)!='undefined'){
                        return node.text+'<span focus="'+node.focus+'" style="color: red; margin-left: 30px;display: inline-block">环重</span>';
                    }
                    return node.text;
                }
            });
        });
        //搜索事件注册;
        $('#bt_industryTreeSearch').on('click',function(){
           industryTreeTree.tree('doFilter',$('#industryTreeSearchKey').val());
        });
        //注册清空事件
        $('.clear','#industryTreeSelect').on('click',function(){
            self.val('');
            $('#'+cid).val('');
            $("#industryTreeSelect").hide();
        });
        //点击空白关闭
        $(document).on('click',function(e){
            if(!$(e.target).is(self)){
                if(($("#industryTreeSelect").find($(e.target)).length==0)){
                    $("#industryTreeSelect").hide();
                }
            }
        });
    }
    function init(target,cfg){
        opt= $.extend({
            data:[]
        },cfg);
        body=$('#industryTreeSelect');
        self=$(target);
        var tname= $(target).attr('name');
        cid="industryTree"+guid();
        var hid=$('<input type="hidden" id="{1}" name="{0}" value="{2}">'.format(tname,cid,self.val()));
        self.attr('name',tname+"_name").attr('readonly',true).data('sid',cid).addClass('choice').after(hid);
        if($('#industryTreeSelect').length==0){
            create(target);
        }else{
            if(self.val()!=''){
                var item=jsonObjectById(jfindustryTreedata,self.val());
                if(item!=undefined){
                    self.val(item.text);
                }
            }
        }
        self.on('click',function(e){
            self=$(e.target);
            cid=self.data('sid');
            var p=self.offset();
            body.css({left:p.left+'px',top: p.top+self.height()+5+'px'}).show();
        });
    }
    $.fn.jfIndustryTree=function(config){
        init(this,config);
    }
})(jQuery);