/**
 * Created by henq on 2016/6/5.
 */
(function ($) {
    $.fn.setForm = function (data/*data,可以是query字符串，也可以是object*/) {
        var self=$(this);
        if(typeof data=='string'){
            data.split('&').forEach(function(paras){
                /*param = paras.split('=');
                var name = param[0],
                    val = param[1];
                self.find('[name=' + name + ']').val(val);*/
            	param = paras.split('=');
                var name = param[0];
                var val = param[1];
                
                var type = $('input[name="'+name+'"]').attr('type')
                if(type=='checkbox'&&val=='true'){
                	$('input[name="'+name+'"]').attr("checked",true);
                }else if(type=='radio'&&val!=''){
                	$("input[name='"+name+"'][value="+val+"]").attr("checked",true); 
                }else{
                	self.find('[name=' + name + ']').val(val);
                	//$('input[name="' + name + '"]').val(val);
                }
            })
        }else if(typeof  data=='object'){
            self.find('input,textarea').each(function(){
                var ol=$(this);
                var li={name:ol.attr('name'),value:ol.val(),tag:ol.attr('type'),checked:ol.prop('checked')};
                if(li.tag!=undefined){
                    li.tag=li.tag.toLowerCase();
                }
                if(li.tag=='checkbox'){
                    var flag=false;
                    if(data.hasOwnProperty(li.name)){
                        if(li.value!=undefined&&li.value!=''){
                            var arrs=data[li.name];
                            if(arrs instanceof Array){
                                if($.inArray(li.value,arrs)>-1){
                                    flag=true;
                                }
                            }else if(typeof data[li.name] =='string'){
                                arrs=arrs.split(',');
                                if($.inArray(li.value,arrs)>-1){
                                    flag=true;
                                }
                            }else{
                                if(arrs){
                                    flag=true;
                                }
                            }
                        }
                    }
                    ol.prop('checked',flag);
                }else if(li.tag=='radio'){
                    var flag=false;
                    if(data.hasOwnProperty(li.name)){
                        if(data[li.name]==li.value){
                            flag=true;
                        }
                    }
                    ol.prop('checked',flag);
                }else  {
                    if(data.hasOwnProperty(li.name)){
                        ol.val(data[li.name]);
                    }
                }
            })
        }
    };
    $.fn.getForm = function (t/*无参数，返回query字符串。0 返回object，1，返回json字符串*/)
   {
        var self=$(this);
        var obj={};
        $('input[name],textarea[name]',self).each(function(index,item){
            var ol=$(item);
            var li={name:ol.attr('name'),value:ol.val(),tag:ol.attr('type'),checked:ol.prop('checked')};
            if(li.tag!=undefined){
                li.tag=li.tag.toLowerCase();
            }
                var curval='';
                if(li.tag=='checkbox'){
                    if(li.checked){
                        curval=li.value;
                    }
                }else if(li.tag=='radio'){
                    if(li.checked){
                        curval=li.value;
                    }
                }else {
                    curval=li.value;
                }
                if(!obj.hasOwnProperty(li.name)){
                    obj[li.name]=curval;
                }else{
                    if(li.tag=='checkbox'&&li.checked){
                        obj[li.name]+=(obj[li.name]==''?'':',')+curval;
                    } else if(li.tag='radio'&&li.checked){
                       obj[li.name]=curval;
                    }
                }

        })
        if(t==undefined){
            var result='';
            for(o in obj){
                result+='&'+o+'='+obj[o];
            }
            return result.substr(1);
        }else if(t==0){
            return obj;
        }else{
            return JSON.stringify(obj);
        }
    };
})(jQuery)