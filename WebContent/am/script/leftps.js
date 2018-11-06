	$(function(){
		//引用左侧列表
		$("#leftpage").load(baseUrl('static/am/template/psinfo/opt/leftps.html'),function(){
			var _changeflag=true;
			$(function(){
				initData(1,'');//加载污染源列表
				loadcustomtag();//加载自定义标签
			});
			/* tab样式处理*/
			$(".bartype").each(function (i) {
				var a = $(this);
				a.on("click", function () {
					$(".bartype").removeClass("on");
					a.addClass("on");
				});
			});
			//全程和简称切换
			$('#namechange').on('click',function(){
				$("#pslist li a").each(function (i) {
					var aps = $(this);
					var name1 = aps.attr('title');
					var name2 = aps.text();
					aps.attr('title',name2);
					aps.text(name1);
				});
			});
			$('#labelsetting').on('click',function(){
				labelCustomSet();
			});
		});
	});
	
	//自定义标签管理
	function labelCustomSet(){
		jf.loadWindow('自定义标签管理',baseUrl('static/am/template/psinfo/customTags.html'),980,560); 
	}
	
	//加载自定义标签
	function loadcustomtag(){
		JqAjax(baseUrl('static/am/data/customtag.json'),'get',{},function(data){
			if(data&&data.total>0){
				var rows = data.rows;
				var html=[];
				for (var i = 0; i < rows.length; i++) {
					html.push('<a><span>'+rows[i].labelName+'</span></a>');
	          	}
				$('#label').html(html.join(''));
				$('#label a').on('click',function(){
					initData(1,$(this).attr('customtagId'));
				});
			}
		});
	}

	//查询左侧污染源列表
	function initData(pageNo,customtId){
				var pageSize=20;
				var param ={
					pageSize:pageSize,
					pageNo:pageNo,
					search_customtag:customtId,
					search_monitorType :$('.bar').find('.on').attr('monitor')
				};
				JqAjax(baseUrl('static/am/data/psinfo.json'),'get',param,function(data){
					var rows=data.rows;
					total=data.total;
					var str ='';
					for(var i=0;i<rows.length;i++){
						 var icon='';
						if($.isFunction(window.appendicon)){
							icon=appendicon(rows[i]);
						}
						str+='<Li psid="{0}" ><a title="{1}">{2}</a>{3}</Li>'.format(rows[i].id,rows[i].ps_name,rows[i].short_name==''?rows[i].ps_name:rows[i].short_name,icon);
					}
					$("#pslist").html(str);
					
					$('#pslist li').on('click',function(){
						if($.isFunction(window.psclick)){
							psclick($(this).attr('psid'),$(this).find('a').text());
						}
					});
					
					$('#viewpage').pagination({
					    total:total,
					    pageNo:pageNo,
					    pageSize:pageSize,
					    onSelectPage:function(pageNumber, pageSize){
							$(this).pagination('loading');
							initData(pageNumber,'');
							$(this).pagination('loaded');
						},
						onChangePageSize:function(pageNumber, pageSize){
							$(this).pagination('loading');
							initData(pageNumber,'');
							$(this).pagination('loaded');
						}
					});
				});
			}
	