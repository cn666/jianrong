/**
 * Created by Henq on 2016/5/26.
 */
(function($){
    var body,opt,cid,self,key,valleyTree;
    function create(target){
        body=$('<div id="valleySelect" class="industrySelect"> <p class="iS_search"> <input type="text" id="valleySearchKey" class="iS_text w250" value=""/> <a class="iS_bt" id="bt_valleySearch"></a> <span class="clear">清空</span></p><div class="lr_content  lr_on "> <ul id="valleyTree"></ul> </div> </div>');
        $('body').append(body);
        //国民经济行业树

        $.get(Actions.common.valley).done(function(data){
            jfvalleydata=data;
            if(self.val()!=''){
                var item=jsonObjectById(data,self.val());
                if(item!=undefined){
                    self.val(item.text);
                }
            }
            valleyTree=$('#valleyTree').tree({
               data:data,
                editable: false,
                onSelect:function(node){
                    self.val(node.text);
                    $('#'+cid).val(node.id);
                    body.hide();
                }
            });
        })
        //搜索事件注册;
        $('#bt_valleySearch').on('click',function(){
           valleyTree.tree('doFilter',$('#valleySearchKey').val());
        });
        //注册清空事件
        $('.clear','#valleySelect').on('click',function(){
            self.val('');
            $('#'+cid).val('');
            $("#valleySelect").hide();
        })
        //点击空白关闭
        $(document).on('click',function(e){
            if(!$(e.target).is(self)){
                if(($("#valleySelect").find($(e.target)).length==0)){
                    $("#valleySelect").hide();
                }
            }
        })
    }
    function init(target,cfg){
        opt= $.extend({
            data:[]

        },cfg);
        body=$('#valleySelect');
        self=$(target);
        var tname= $(target).attr('name');
        cid="valley"+guid();
        var hid=$('<input type="hidden" id="{1}" name="{0}" value="{2}">'.format(tname,cid,self.val()));
        self.attr('name',tname+"_name").attr('readonly',true).data('sid',cid).addClass('choice').after(hid);
        if($('#valleySelect').length==0){
            create(target);
        }else{
            if(self.val()!=''){
                var item=jsonObjectById(jfvalleydata,self.val());
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
    $.fn.jfValley=function(config){
        init(this,config);
    }
})(jQuery);