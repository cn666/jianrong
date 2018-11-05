(function($){
 	$.fn.jfAutocomplete=function(cfg){
        var self=$(this);
        var opt= $.extend({
            id:self.attr('id'),
            url:'',
            pid:'ac-panel',
            limit: 10,
            key:'key',
            text:'text',
            value:'value',
        	width:250,
            autoload:false,
            onSelect:undefined,
            onBlur:undefined
        },cfg);
        var panel='<div id="'+opt.pid+'" class="ac-panel"></div>';
        $(panel).appendTo('body');
       
        self.on('focus',function(e){
            var p=$(e.target).offset();
            if($('#'+opt.pid).html()!=''){
          		$('#'+opt.pid).css({width:opt.width,left:p.left+'px',top: p.top+32+'px','height':'200px'}).show();
          	}
        });
        
        self.on('blur',function(e){
             if(opt.onBlur!=undefined){
             	opt.onBlur();
             }
        });
        
        self.bind('keyup',function(e){
            loaddata(self.val());
            var p=$(e.target).offset();
            if($('#'+opt.pid).html()!=''){
          		$('#'+opt.pid).css({width:opt.width,left:p.left+'px',top: p.top+32+'px','height':'200px'}).show();
          	}
        });
        
        //初始化加载数据
        if(opt.autoload){
        	loaddata('');
        }
        $('#'+opt.pid+' i').each(function(){
        	var i =$(this);
        	i.on('click',function(){
        		opt.onSelect(i.text(),i.attr('value'));
        	});
        });
        
        function loaddata(key){
        	var param ='({"'+opt.key+'":"'+key+'","size":'+opt.limit+'})';
        	$.ajax({
		        url: opt.url,
		        type: 'post',
		        data: eval(param),
		        dataType: "json",
		        cache: false,
		        success: function(data){
		        	if(data!=null && data.length>0){
		        		var html="";
			        	for(var i=0;i<data.length;i++){
			        		html+='<lable title="'+data[i][opt.text]+'"><i value="'+data[i][opt.value]+'">'+data[i][opt.text]+'</i></lable>';
			        	}
			        	$('#'+opt.pid).html(html);
			        	$('#'+opt.pid+' i').each(function(){
				        	var i =$(this);
				        	i.on('click',function(){
				        		if(opt.onSelect!=undefined){
				        			opt.onSelect(i.text(),i.attr('value'));
				        		}
				        		$('#'+opt.pid).hide();
				        	});
				        });
		        	}else{
		        		$('#'+opt.pid).html('');
		        	}
		        },
		        error: function (XMLHttpRequest, textStatus, errorThrown) {
		        	ajaxerror(XMLHttpRequest, textStatus, errorThrown,url,'post',param);
		        }
		    });
        }
        
        //点击空白关闭
        $(document).on('click',function(e){
           if(!$(e.target).is(self)){
                $('#'+opt.pid).hide();
            }
        });
    }
})(jQuery)