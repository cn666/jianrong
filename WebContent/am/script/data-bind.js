/***
 *  2016/4/24.
 * 西安交大长天软件股份有限公司
 */
function initTag(){
	$('input').each(function(){
		var self = this;
		var type = $(self).data('tag');
		if(!type){
			return;
		}
		if(type=='datebox'){
			$(self).datebox({});
		}
		else if(type=='textbox'){
			$(self).textbox({
			    buttonText:'查找',
			    iconCls:'icon-man',
			    iconAlign:'left'
		    });
		}
		else if(type=='combobox'){
			$(self).combobox({
				method:'get',
				url: Ations.common.combox,
				valueField: 'value',
				textField: 'text'
			});
		}
		else if(type=='filebox'){
			$(self).filebox({
			    buttonText: '选择文件',
			    buttonAlign: 'right'
			});
		}
		else if(type=='region'){//地区编码 
			var region=$(self);
			var Rand  = (Math.random()+'').replace('.','');
			var _display_id = '_displaytext'+Rand;
			var _jf_region = '_jf_region'+Rand;
			region.hide().after('<input type="text" id="'+_display_id+'"  readonly="readonly" /><div id="'+_jf_region+'" class="jf-region"></div>');
     		var displaytext=$('#'+_display_id);
     		var jf_region=$('#'+_jf_region);
     		displaytext.addClass(region.attr('class')!=''?region.attr('class'):'');
     		var regioncode = region.val();
     		var parent = region.attr('parent');
			$.ajax({
				type: 'GET',
				async: false,
				url: Ations.common.region,
				success: function(data){
					if(parent){
						for (var i = 0; i < data.length; i++) {
							if(data[i].id==parent){
								data=data[i].children;
								break;
							}
						}
					}
					if(data){
						//_html+='<ul><li><a class="clear">清空</a></li></ul>';
						var _html=' <ul class="province"><li class="clear">清空</li>';
						for (var i = 0; i < data.length; i++) {
							var province = data[i];
						    _html+='<li><a href="javascript:;" region="'+province.id+'">'+province.text+'</a>';
							if(regioncode==province.id){
								displaytext.val(province.text);
							}
						    if(province.children){//市
						    	_html+='<ul class="city">';
						    	for (var j = 0; j < province.children.length; j++) {
							    	var city=province.children[j];
							    	_html+='<li><a href="javascript:;" region="'+city.id+'">'+city.text+'</a>';
							    		if(regioncode==city.id){
											displaytext.val(city.text);
										}
							    		if(city.children){//县区
									    	_html+='<ul class="county">';
									    	for (var k = 0; k< city.children.length; k++) {
										    	var county=city.children[k];
										    	_html+='<li><a href="javascript:;" region="'+county.id+'">'+county.text+'</a></li>';
										    	if(regioncode==county.id){
													displaytext.val(county.text);
												}
									    	}
									    	_html+='</ul>';
									    }
							    	_html+='</li>';
						    	}
						    	_html+='</ul>';
						    }
						    _html+='</li>';
						}
						_html+='</ul>';
						jf_region.html(_html);
					}
				}
			});
			
			displaytext.focus(function() {
				$('.jf-region').hide();
				jf_region.show().css("top", displaytext.offset().top+21).css("left", displaytext.offset().left);
			});
			
			jf_region.on("click", ".province li.clear", function () {
	            displaytext.val('');
	            region.val('');
	            jf_region.hide();
	        });
			jf_region.on("click", ".province li>a", function () {
	            displaytext.val($(this).html());
	            region.val($(this).attr("region"));
	            jf_region.hide();
	        });
	        //点击空白关闭浮层
	        document.onclick = function(){
				if(document.activeElement.id.indexOf('_displaytext')==-1){
					$('.jf-region').hide();
				}
			}
		}
	});
};
