//加载图表
function loadHistoryData() {
	Loading();
	var time = $('#historyTime').text().split('至');
	var startTime='';
	var endTime='';
	if(time[0].length==10){
		startTime=time[0]+' 00:00:00.000';
		endTime=time[1]+' 23:59:59.999';
		if(time[1]==new Date().format('yyyy-MM-dd')){
			endTime=new Date().format('yyyy-MM-dd hh:mm:ss');
		}
	}else{
		startTime=time[0];
		endTime=time[1];
	}
	var param={
		PageNo:1,
		PageSize:10000000,
		search_mpId:_mpselect.data[_mpselect.index].id,
		search_mpType:_mpselect.data[_mpselect.index].type,
		search_psID:_psid,
		search_regionCode:_regionCode,
		search_startTime:startTime,
		search_endTime:endTime,
		search_dataType:$(".timeTab span.on").attr('tag')*1,	//1小时数据，2日数据，3分钟数据，4实时数据
		search_pollutants:_MpPollutants, 
		search_incineratorFlag:_mpselect.data[_mpselect.index].incinerator_flag 
	};
	JqAjax(Actions.histroy.getHistData,'get',param,function(data1){
		
		if(data1.result=='failed'){
			jf.sendNotice('提示', data1.msg, 0, 5);
			hideLoading();
			return;
		}
		
		_historydata=data1;
		
		if(isEmptyObject(data1)||data1.total==0){
			hideLoading();
			return;
		}
		 
		$('.chartWapper span.t-time').removeClass("none");
		//是否烧结
		var clotting_flag = true;
		if(_mpselect.data[_mpselect.index].type ==5){
			clotting_flag = _mpselect.data[_mpselect.index].clotting_flag;
		}
		
		//渲染Chart
		loadChartView(data1,clotting_flag,param.search_dataType);
		
		//绑定历史数据grid
		setTimeout(function(){
			historydataList(data1,clotting_flag,param.search_dataType);
		},100);
		
		hideLoading();
	});
}
//加载图形
function loadChartView(data,clotting_flag,dataType){
		if(isEmptyObject(data)||data.total==0){
			hideLoading();
			return;
		}
		if (data.originalRows!=undefined){
			data.rows = (data.originalRows);
	    }
		//监控数据
		monitor_data =[];
		//Chart 线名称
		itmes_data = [];
		//x轴数据
		xaxis_data = [];
		//监控点状态 /x轴对应的状态 
		mp_status = [];
		
		//X轴（时间轴）
		for(var i = 0; i<data.rows.length;i++){
			xaxis_data.push(data.rows[i].dataTime);
			mp_status.push(data.rows[i].sStatus);
		}
		
		var pollutant_codes='';//没有排放量的污染物
		if(_mpselect.data[_mpselect.index].type==5){
			pollutant_codes='B02,S01,037';
		}else{
			pollutant_codes='B01,001,002,092,550,551,570,571';
		}
		
		//遍历加载污染物数据
		for(var i = 0; i<data.columns.length;i++){
			var column = data.columns[i];
				if(column.field.indexOf('S')==-1||column.field.indexOf('S01')!=-1){
					var title='';
					if(clotting_flag==false && pollutant_codes.indexOf(column.field)==-1){//折算
						title=column.title+"【折算】";
					}else{
						title=column.title;
					}
					itmes_data.push(title);
					monitor_data.push({
						name: title,
						field:column.field,
						type: 'line',
						data: [],
						data_AvgValue: [],
						data_AvgRevised: [],
						data_ZsValue:[],
						data_ZsRevised: [],
						data_standard: [],
						data_status:[],
						data_alarmstatus:[],
						data_cou:[],
						data_keyi:[],
						data_keyitip:[]
					});
				}
		}
		
		//给污染物加载监控数据
		//循环行污染物
		for(var j = 0; j<monitor_data.length;j++){
			var plo = monitor_data[j].field;
			//循环行
			for(var i = 0; i<data.rows.length;i++){
				var row = data.rows[i];
				//循环列
				for(var field in row){
					if(field==('AvgValue'+plo)||field==('flowValue'+plo)){
						if(field.indexOf('S01')!=-1){//O2含量
							if(ValueOrRevised=="Value"){
								monitor_data[j].data.push(row['AvgValue'+plo]==null?'-':row['AvgValue'+plo]);//实测原始值
							}else{
								monitor_data[j].data.push((row['AvgRevised'+plo]==null||row['AvgRevised'+plo]=='-')?row['AvgValue'+plo]:row['AvgRevised'+plo]);//实测修正值
							}
						}else if(field.indexOf('flow')!=-1){//流量
							if(ValueOrRevised=="Value"){
								monitor_data[j].data.push(row['flowValue'+plo]==null?'-':row['flowValue'+plo]);//实测原始值
							}else{
								monitor_data[j].data.push((row['flowRevised'+plo]==null||row['flowRevised'+plo]=='-')?row['flowValue'+plo]:row['flowRevised'+plo]);//实测修正值
							}
						}else{
							if(_mpselect.data[_mpselect.index].type==5 && clotting_flag==false){// 气：非烧结污染物显示折算
								if(ValueOrRevised=="Value"){
									monitor_data[j].data.push(row['ZsValue'+plo]==null?'-':row['ZsValue'+plo]);//折算原始值
								}else{
									monitor_data[j].data.push((row['ZsRevised'+plo]==null||row['ZsRevised'+plo]=='-')?row['ZsValue'+plo]:row['ZsRevised'+plo]);//折算修正值
								}
							}else{//水：显示实测值  气：烧结污染物显示实测值
								if(ValueOrRevised=="Value"){
									monitor_data[j].data.push(row['AvgValue'+plo]==null?'-':row['AvgValue'+plo]);//实测原始值
								}else{
									monitor_data[j].data.push((row['AvgRevised'+plo]==null||row['AvgRevised'+plo]=='-')?row['AvgValue'+plo]:row['AvgRevised'+plo]);//实测修正值
								}
							}
						}
						monitor_data[j].data_status.push(row['eStatus'+plo]==null?'-':row['eStatus'+plo]);//验收 审核状态
						monitor_data[j].data_alarmstatus.push(row['aStatus'+plo]==null?'-':row['aStatus'+plo]);//报警状态
					}
					
					if(field==('StandardValue'+plo)){
						monitor_data[j].data_standard.push(row['StandardValue'+plo]==null?'-':row['StandardValue'+plo]);//标准值
					}
					
					if(field==('AvgValue'+plo)){
						monitor_data[j].data_AvgValue.push(row['AvgValue'+plo]==null?'-':row['AvgValue'+plo]);//原始值
						monitor_data[j].data_AvgRevised.push((row['AvgRevised'+plo]==null||row['AvgRevised'+plo]=='-')?row['AvgValue'+plo]:row['AvgRevised'+plo]);//修正值
					}
					if(field==('flowValue'+plo)){
						monitor_data[j].data_AvgValue.push(row['flowValue'+plo]==null?'-':row['flowValue'+plo]);//流量原始值
						monitor_data[j].data_AvgRevised.push((row['flowRevised'+plo]==null||row['flowRevised'+plo]=='-')?row['flowValue'+plo]:row['flowRevised'+plo]);//流量修正值
					}
					
					if(field=='ZsValue'+plo){
						monitor_data[j].data_ZsValue.push(row['ZsValue'+plo]==null?'-':row['ZsValue'+plo]);//折算原始值
						monitor_data[j].data_ZsRevised.push((row['ZsRevised'+plo]==null||row['ZsRevised'+plo]=='-')?row['ZsValue'+plo]:row['ZsRevised'+plo]);//折算修正值
					}
					
					if(field=='cou'+plo){
						monitor_data[j].data_cou.push(row['cou'+plo]==null?'-':row['cou'+plo]);//排放量
					}
					
					if(field=='yStatus'+plo){
						monitor_data[j].data_keyi.push(row['yStatus'+plo]==null?'-':row['yStatus'+plo]);//可疑
						monitor_data[j].data_keyitip.push(row['yStatusTip'+plo]==null?'-':row['yStatusTip'+plo]);//可疑提示语
					}
				}
			}
		}
		
		// 路径配置
        require.config({
            paths: {
                'echarts': '../../static/am/vendor/echarts/dist'
            }
        });
        // 使用
        require(
            [
                'echarts',
                'echarts/chart/line',
				'echarts/theme/macarons'
            ],
            function (ec) {
                // 基于准备好的dom，初始化echarts图表
                _myChart = ec.init(document.getElementById('monitorChart'),'macarons');
				
				//配置事件
				var ec_config = require('echarts/config'); 
        		_myChart.on(ec_config.EVENT.CLICK, clickline);
				_myChart.on(ec_config.EVENT.DATA_ZOOM, eConsole);
				_myChart.on(ec_config.EVENT.LEGEND_SELECTED, eConsole);
			
				option = {
					tooltip: {trigger:'axis',formatter: function(params) {
						var tip='';
						var flagname=false;
						for(var i = 0; i<params.length;i++){
							if(params[i].seriesName.indexOf("标准线")!=-1){
								flagname=true;
								break;
							}
						}
						for(var i = 0; i<params.length;i++){
							if(params[i].seriesName.indexOf("【可疑】")!=-1){
								flagname=true;
								break;
							}
						}
						if(params.length==1||
							(params.length==2 && (params[1].seriesName.indexOf("【实测】")!=-1 
									|| params[0].seriesName.indexOf("【可疑】")!=-1))
									||flagname==true){
							//排放量
							var ploCode='';
							for(var i = 0; i<data.columns.length;i++){
								if(params[0].seriesName.indexOf(data.columns[i].title)!=-1){
									ploCode = data.columns[i].field;
									break;
								}
							}
							var item;
							var kytip='';
							if(params[0].seriesName.indexOf("【可疑】")!=-1 && params[0].data=='-'){
								item=params[1];
							}else if(params[0].seriesName.indexOf("【可疑】")!=-1){
								item=params[1];
								var keyiNum = item.series.data_keyi[item.dataIndex].split(';');
								var keyiTip = item.series.data_keyitip[item.dataIndex].split(';');
								var tip2='';
								for(var i=0;i<keyiNum.length;i++){
									if(keyiNum[i]!='16' && keyiNum[i]!='17'){
										tip2+=keyiTip[i];
									}
								}
								kytip='<br />'+tip2.replace(/\n/g, "<br />").replace(/;/g, "<br />");
							}else{
								item=params[0];
							}
							tip=item.name +'<br />'+item.seriesName+kytip;
							
							if(item.series.data_AvgValue[item.dataIndex]!=undefined){
								tip+='<br />实测原始值：'+item.series.data_AvgValue[item.dataIndex]
							}
							
							if($(".timeTab span.on").attr('tag')*1<=2 && item.series.data_AvgRevised[item.dataIndex]!=undefined){
								tip+='<br />实测修正后：'+item.series.data_AvgRevised[item.dataIndex]
							}
							//0 折算 false / 1 非折算 true  //因子没有折算
							if(clotting_flag==false && ploCode.indexOf('S')==-1){
								if(item.series.data_ZsValue[item.dataIndex]!=undefined){
									tip+='<br />折算原始值：'+item.series.data_ZsValue[item.dataIndex]
								}
								if($(".timeTab span.on").attr('tag')*1<=2 && item.series.data_ZsRevised[item.dataIndex]!=undefined){
									tip+='<br />折算修正后：'+item.series.data_ZsRevised[item.dataIndex]
								}
							}
							if(item.series.data_standard[item.dataIndex]!=undefined 
									&& ploCode.indexOf('B')==-1 //不包含流量
									&& ploCode.indexOf('S')==-1 //不包含因子
									&& _mpselect.data[_mpselect.index].type!=6){ //不包含进水口
								tip+='<br />标准值：'+item.series.data_standard[item.dataIndex];
							}
							if(pollutant_codes.indexOf(ploCode)==-1&& dataType!=4 ){
								if(item.series.data_cou[item.dataIndex]!=undefined){
									tip+='<br />排放量：'+item.series.data_cou[item.dataIndex]
								}
							}
							return tip.replace(/<br \/><br \/>/g , '<br />').replace(/【折算】/g, '');
						}else{
							tip=params[0][1]+'<br />';
							for(var i=0;i<params.length;i++){
								var itme = params[i];
								tip+=itme[0]+':'+itme[2]+'<br />'
							}
							return tip.replace(/<br \/><br \/>/g , '<br />');
						}
						
					}},
					toolbox: {
						show: true,
						feature: {
							saveAsImage : {
								show: false
							},
				            duiOrValue : {
				                show : true,
				                title : '显示值坐标',
				                icon : 'image://../../static/am/vendor/echarts/dist/icon/value.png',
				                onclick : function (){
		                		   if(option.yAxis[0].type=='log'){
		                			   	option.yAxis[0].type='value';
		                			   	option.toolbox.feature.duiOrValue.title='显示对数坐标';
		                		   		option.toolbox.feature.duiOrValue.icon='image://../../static/am/vendor/echarts/dist/icon/log.png';  
		                		   }else{
		                			   	option.yAxis[0].type='log';
		                			   	option.toolbox.feature.duiOrValue.title='显示值坐标';
		                		   		option.toolbox.feature.duiOrValue.icon='image://../../static/am/vendor/echarts/dist/icon/value.png';
		                		   }
			                	   _myChart.setOption(option, false);
				                }
				            }
						}
					},
					legend: {
						data:itmes_data,
						selected:pl_selected
					},
					xAxis: [{
						type : 'category',
			            boundaryGap : false,
			            axisTick: {onGap:false},
			            splitLine: {show:false},
			            data: xaxis_data
			        }], 
					yAxis: [{ 
						type:'log'
						}],
					series: monitor_data,
					noDataLoadingOption :{
					    text: '暂无数据',
					    effect:'bubble',
					    effectOption : {
					        effect: {
					            n: 0 //气泡个数为0 
					        }
					    }
					}
				}
                // 为echarts对象加载数据 
                _myChart.setOption(option, false);
            }
        ); 
		 
        if (typeof(_myChart1) != "undefined") { 
		   _myChart1.clear(); 
		}
		
		// 事件的参数中包括：数据在序列中的下标dataIndex，数据的值value，x轴上的名称name
		function eConsole(param) {
			
			if(param.type=='dataZoom'){
				if(param.zoom.seriesIndex.length>1){
					$(".bar a.mutual").addClass("disable");
				}
				setTimeout(function(){
					if(typeof(option)!='undefined' && typeof(option.legend)!='undefined' && option.legend.data.length>0){
						var param2={ seriesName:option.legend.data[0] };  
						clickline(param2);
					}
				},1000);
			}else if(param.type=='legendSelected'){
				//改变现实的污染物
				pl_selected=param.selected;
				
				$('#bar_stop').removeClass('on');
				$('#bar_biao').removeClass('on');
				$('#bar_yan').removeClass('on');  
				
				//移除标准线
				removeStandard();
				
				delChartYiLine();
				delChartbg('all');
				delChartIcon('all');
				
				//移除实测线
				removeValueline();
				
				//点击图表项显示和隐藏排放量图表
				if(typeof(option2.legend) != "undefined" && param.target==option2.legend.data[0]){
					if(!param.selected[param.target]) {
						if (typeof(_myChart1) != "undefined") { 
						   _myChart1.clear();
						}
					}else{
						if (typeof(_myChart1) != "undefined") { 
							_myChart1.setOption(option2, false);
						}
					}
				}
			}
			
			if(pl_selected!=undefined){
				var pnum=0;
				var itme_name='';
				for(var item in pl_selected){
					if(pl_selected[item]==true && item.indexOf('【实测】')==-1){
						itme_name=item;
						pnum++;
					}
				}
				if(pnum==1&&itme_name.indexOf('流量')!=-1){
					$(".bar a.mutual").removeClass("disable");
					$("#bar_biao").addClass("disable");
				}else if(pnum==1&&itme_name.indexOf('O2')!=-1){
					$(".bar a.mutual").removeClass("disable");
					$("#bar_biao").addClass("disable");
				}else if(pnum==1){
					$(".bar a.mutual").removeClass("disable");
					
					//增加实测线
					if(clotting_flag==false){
						setTimeout(function(){
							addValueline();
							
						},10);
					}
					
				}else{
					$(".bar a.mutual").addClass("disable");
				}
			}
			
		}
		//chart线的点击事件
		function clickline(param){
			
			if (typeof(_myChart1) != "undefined") {
			   _myChart1.clear();
			}
			
			//实时数据没有排放量
			if($(".timeTab span.on").attr('tag')*1==4){
				return;
			}
			
			if(param.seriesName.indexOf('标准线')!=-1){
				return;
			}
			
			var seriesName='';
			var seriesIndex=0;
			//选中的线变粗
			$.each(option.series,function(index,item){
	            if(param.seriesName.indexOf(item.name)!=-1){
	            	seriesName=item.name;
	            	seriesIndex=index;
	       	        option.series[index].itemStyle={normal: {lineStyle: {width:3,shadowColor : 'rgba(0,0,0,0.5)',shadowBlur: 4,shadowOffsetX: 3,shadowOffsetY: 3}}}//,shadowColor: 'red',shadowBlur: 5
				}else{
					if(option.series[index].name.indexOf('【可疑】')==-1){//除可疑线之外
						option.series[index].itemStyle={normal: {lineStyle: {width:2,shadowColor : '#fff',shadowBlur:0,shadowOffsetX: 0,shadowOffsetY: 0}}}
					}
				}
		   	});
		   	_myChart.setOption(option, false);
			
			if(param.seriesName.indexOf('流量(')!=-1){
				return;
			}
			
			//实测值取折算值下面其他的参数
			if(param.seriesName.indexOf('【实测】')!=-1){
				var name = param.seriesName.replace('【实测】','【折算】')
				$.each(option.series,function(index,item){
		            if(name.indexOf(item.name)!=-1){
		            	seriesName=item.name;
		            	seriesIndex=index;
					}
			   	});
			}
			
		   	for(var n =0;n<data.columns.length;n++){
		   		if(param.seriesName.indexOf(data.columns[n].title)!=-1){
		   			if(pollutant_codes.indexOf(data.columns[n].field)!=-1){
		   				return;
		   			}
		   		}
		   	}
		   	
		   	var unit='(千克)';
		  
		   	seriesName=seriesName.substr(0,seriesName.lastIndexOf('('))+unit;
		   	
		  	//排放量
			var data2= cloneArray(monitor_data[seriesIndex].data_cou);
		   	
		  	
		  	if(data2==null || data2== undefined || data2.length==0){
		  		jf.sendNotice("提示","暂无排放量数据",2,2);
		  		return;
		  	}
		  	
			//排放量Chart
        	require(
	            [
	                'echarts',
	                'echarts/chart/bar',
	                'echarts/chart/line',
					'echarts/theme/macarons'
	            ],
	            function (ec) {
	            	_myChart1 = ec.init(document.getElementById('pollutantChart'),'macarons');
	            	
	    			option2 = {
	    			    title : {
	    			        text: '    排放量'
	    			    },
	    			    tooltip : {
	    			        trigger: 'axis'
	    			    },
	    			    legend: {
	    			        data:[seriesName]
	    			    },
	    			    toolbox: {
	    			        show : false,
	    			        feature : {
	    			            saveAsImage : {show: true}
	    			        }
	    			    },
	    			    xAxis : [
	    			        {
	    			            type : 'category',
	    			            boundaryGap : true,
	    			            data : xaxis_data
	    			        }
	    			    ],
	    			    yAxis : [
	    			        {
	    			            type : 'value'
	    			        }
	    			    ],
	    			    series : [
	    			        {
	    			            name:seriesName,
	    			            type:'bar',
	    			            itemStyle:{normal: {color: '#1A94E6',lineStyle: {width: 2}}},
	    			            data:data2
	    			        }
	    			    ],
	    			    noDataLoadingOption :{
	    				    text: '暂无数据',
	    				    effect:'bubble',
	    				    effectOption : {
	    				        effect: {
	    				            n: 0 //气泡个数为0 
	    				        }
	    				    }
	    				}
	    			};
	    			//调用显示
	            	_myChart1.setOption(option2, false);
	            }
           );
		}
	}
	
	


//监控点历史数据
function historydataList(data,clotting_flag,dataType){
	if(isEmptyObject(data)){
		return;
	}
	var columns=[];
	var frozenColumn=[];
	if(data.columns.length>0 && data.rows.length>0){
		
		var columns1 =[];
		var columns2=[];
		var frozenColumn1=[];
		var frozenColumn2=[];
		var unit='千克';
		var flowunit='';
		var pollutant_codes='';//没有排放量的污染物
		var mptype=_mpselect.data[_mpselect.index].type;
		if(mptype==5){
			//气
			flowunit='(立方米)';
			pollutant_codes='B02,S01,037';
		}else{
			//水
			flowunit='(吨)';
			pollutant_codes='B01,001,002,092,550,551,570,571';
		}
		if(dataType==1 || dataType==2){//小时 、日
			frozenColumn1.push({field:'dataTime',title:'监控时间',align:'center',rowspan:2,formatter:formatMonitorData,width:160});
			for(var i=0; i<data.columns.length;i++){
				var column =data.columns[i]; 
				if(column.field.indexOf('S')>-1){
					//折算因子
					if(column.field=='S01'){
						columns1.push({title:column.title,align:'center',colspan:2,formatter:formatMonitorData,width:200});
						
						columns2.push({field:'AvgValue'+column.field,title:'原始值',colspan:1,formatter:formatMonitorData,width:120});
						columns2.push({field:'AvgRevised'+column.field,title:'修正值',colspan:1,formatter:formatMonitorData,width:120});
					}else{
						columns1.push({field:'AvgValue'+column.field,title:column.title.replace('(', "<br />("),align:'center',formatter:formatMonitorData,rowspan:2,colspan:1,width:100});
					}
				}else if(column.field.indexOf('B')!=-1){
					//流量
					frozenColumn1.push({title:column.title,align:'center',colspan:2,width:200});
					
					frozenColumn2.push({field:'flowValue'+column.field,title:'原始值',align:'center',formatter:formatMonitorData,width:120});
					frozenColumn2.push({field:'flowRevised'+column.field,title:'修正值',align:'center',formatter:formatMonitorData,width:120});
				}else{
					var colspan=0;
					//浓度
					if(clotting_flag==false){//烧结有折算
						colspan=4;
						columns2.push({field:'AvgValue'+column.field,title:'实测原始值',colspan:1,formatter:formatMonitorData,width:120}); 
						columns2.push({field:'AvgRevised'+column.field,title:'实测修正值',colspan:1,formatter:formatMonitorData,width:120});
						columns2.push({field:'ZsValue'+column.field,title:'折算原始值',colspan:1,formatter:formatMonitorData,width:120}); 
						columns2.push({field:'ZsRevised'+column.field,title:'折算修正值',colspan:1,formatter:formatMonitorData,width:120});
					}else{
						colspan=2;
						columns2.push({field:'AvgValue'+column.field,title:'原始值',colspan:1,formatter:formatMonitorData,width:100}); 
						columns2.push({field:'AvgRevised'+column.field,title:'修正值',colspan:1,formatter:formatMonitorData,width:100});
					}
					
					//进水口没有标准值
					if(mptype!=6){
						columns2.push({field:'StandardValue'+column.field,title:'标准值',colspan:1,width:100});
						colspan++;
					}
					//排放量
					if(pollutant_codes.indexOf(column.field)==-1){
						columns2.push({field:'cou'+column.field,title:'排放量(千克)',formatter:formatCount,colspan:1,width:100});
						colspan++;
					}
					columns1.push({title:column.title,align:'center',colspan:colspan,width:colspan*100});
				}
			}
		}else if(dataType==3 ){//分钟
			frozenColumn1.push({field:'dataTime',title:'监控时间',align:'center',rowspan:2,formatter:formatMonitorData,width:160});
			for(var i=0; i<data.columns.length;i++){
				var column =data.columns[i];
				
				if(column.field.indexOf('S')>-1){
					//折算因子
					columns1.push({field:'AvgValue'+column.field,title:column.title.replace('(','<br />('),align:'center',formatter:formatMonitorData,rowspan:2,colspan:1,width:100});
				}else if(column.field.indexOf('B')!=-1){
					//流量
					frozenColumn1.push({title:column.title,field:'flowValue'+column.field,align:'center',formatter:formatMonitorData,rowspan:2,colspan:1,width:120});
				}else{
					var colspan=0;
					//浓度
					if(clotting_flag==false){
						colspan=2;
						//烧结有折算
						columns2.push({field:'AvgValue'+column.field,title:'实测值',colspan:1,formatter:formatMonitorData,width:120});
						columns2.push({field:'ZsValue'+column.field,title:'折算值',colspan:1,formatter:formatMonitorData,width:120});
						
					}else{//烧结无折算
						colspan=1;
						columns2.push({field:'AvgValue'+column.field,title:'原始值',colspan:1,formatter:formatMonitorData,width:100});
					}
					
					//进水口没有标准值
					if(mptype!=6){
						columns2.push({field:'StandardValue'+column.field,title:'标准值',colspan:1,width:100});
						colspan++;
					}
					//排放量
					if(pollutant_codes.indexOf(column.field)==-1){
						columns2.push({field:'cou'+column.field,title:'排放量(千克)',formatter:formatCount,colspan:1,width:100});
						colspan++;
					}
					columns1.push({title:column.title,align:'center',colspan:colspan,width:colspan*100});
				}
			}
		}else if(dataType==4 ){//实时
			frozenColumn1.push({field:'dataTime',title:'监控时间',align:'center',rowspan:2,formatter:formatMonitorData,width:160});
			for(var i=0; i<data.columns.length;i++){
				var column =data.columns[i];
				
				if(column.field.indexOf('S')>-1){
					//折算因子
					columns1.push({field:'AvgValue'+column.field,title:column.title.replace('(','<br />('),align:'center',formatter:formatMonitorData,rowspan:2,colspan:1,width:100});
				}else if(column.field.indexOf('B')!=-1){
					//流量
					frozenColumn1.push({title:column.title,field:'flowValue'+column.field,align:'center',formatter:formatMonitorData,rowspan:2,colspan:1,width:100});
				}else{
					//浓度
					if(clotting_flag==false){
						//烧结有折算
						columns1.push({title:column.title,align:'center',colspan:2,width:300});
						columns2.push({field:'AvgValue'+column.field,title:'实测值',colspan:1,formatter:formatMonitorData,width:150});
						columns2.push({field:'ZsValue'+column.field,title:'折算值',colspan:1,formatter:formatMonitorData,width:150});
					}else{//烧结无折算
						columns1.push({field:'AvgValue'+column.field,title:column.title,rowspan:2,colspan:1,formatter:formatMonitorData,width:150});
					}
				}
			}
		}
		frozenColumn.push(frozenColumn1);
		frozenColumn.push(frozenColumn2);
		
		columns.push(columns1);
		columns.push(columns2);
	}
	//绑定监控列表数据
	_historyDataGrid=$('#historydataList').datagrid({
		data:data,
		singleSelect: true,
		nowrap: true,
		striped:true,
		pagination: true,
		scrollbarSize:0,
		fit:true,
		frozenColumns:frozenColumn,
		columns:columns,
		pagination:true,
		pageNumber:1,
		pageSize:_pagesize,
		loadFilter:pagerFilter
	});
}
	
	
//表格-监控点
function formatMonitorData(val, row, index) {
	var html='';
	if(val==undefined||val=='-'){
		html='-';
	}else{
		
		if(val.indexOf('-')==-1 && val*1!=NaN){
			val=val*1;
		}
		
		var field = $(this)[0].field;
		//污染物编号
		var plo = field.replace('AvgValue','').replace('AvgRevised','').replace('ZsValue','').replace('ZsRevised','').replace('flowValue','').replace('flowRevised','').replace('cou','');
		
		var dataTime= row['dataTime'];
		
		var ZsRevised= row['ZsRevised'+plo];
		var ZsValue= row['ZsValue'+plo];
		
		var AvgRevised= row['AvgRevised'+plo];
		var AvgValue= row['AvgValue'+plo];
		
		var flowValue= row['flowValue'+plo];
		var flowRevised= row['flowRevised'+plo];
		
		var yStatus= row['yStatus'+plo];
		var yStatusTip= row['yStatusTip'+plo];
		
		if(field=='dataTime'){
			if(row.sStatus==7){
				html='<a><span class=" pointer">'+val+'</span></a><i><span class="tips ting" title="停运">停</span></i>';
			}else{
				html='<a><span class=" pointer">'+val+'</span></a>';
			}
		}else if(_mpselect.data[_mpselect.index].type==6){
			html= val;
		}else{
			var ishaveicon=false
			var displayVal=false;
			if(plo.indexOf('B')!=-1){
				if(field=='flowValue'+plo && (flowRevised==undefined || flowRevised=='-')){
					displayVal=true;
				}else if(field=='flowRevised'+plo){
					displayVal=true;
				}
			}else{
				
				//是否烧结无折算
				var mp=_mpselect.data[_mpselect.index];
				if(mp.type==5 && mp.clotting_flag==1 && field=='AvgValue'+plo ){
					displayVal=true;
				}else{
					if(field=='AvgValue'+plo && (ZsRevised==undefined || ZsRevised=='-')  && (ZsValue==undefined || ZsValue=='-') && (AvgRevised==undefined || AvgRevised=='-')){
						displayVal=true;
					}else if(field=='AvgRevised'+plo && (ZsRevised==undefined || ZsRevised=='-')  && (ZsValue==undefined || ZsValue=='-')){
						displayVal=true;
					}else if(field=='ZsValue'+plo && (ZsRevised==undefined || ZsRevised=='-')){
						displayVal=true;
					}else  if(field=='ZsRevised'+plo){
						displayVal=true;
					}
				}
			}
			
			
			if(displayVal){
				var astatus = row['aStatus'+plo]; //报警状态
				if(row.sStatus==7){//监控点状态为停运其他污染不显示任何状态
					html= val;
				}
				else if(astatus==0){
					html= val;
				}
				else if(astatus==1){
					ishaveicon=true;
					html=' <a><span class="red pointer">'+val+'</span></a><i><span class="tips chao" title="超标">超</span></i>';
				}
				else if(astatus==2){
					ishaveicon=true;
					html='<a><span class="orange pointer">'+val+'</span></a><i><span class="tips yichang" title="异常">异</span></i>';
				}
				else if(astatus==3){
					ishaveicon=true;
					html='<a><span class="red pointer">'+val+'</span></a><i><span class="tips chao"  title="超标">超</span><span class="tips yichang" title="异常">异</span></i>';
				}
				else{
					html=val;
				}
			}else{
				html=val;
			}
		}
		 
		//判断是否添加可疑图标
		if($(".timeTab span.on").attr('tag')*1 <=2 && yStatusTip!=undefined && yStatusTip!='-'&& yStatusTip!=null && yStatusTip!=''){
			if($(".timeTab span.on").attr('tag')*1 ==2){
				yStatusTip=yStatusTip.replace(/ 00/g, '');
			}
			var keyiNum = yStatus.split(';');
			var keyiTip = yStatusTip.split(';');
			var displayVal2=false;
			var tip='';
			for(var i=0;i<keyiNum.length;i++){
				if(keyiNum[i]!='16' && keyiNum[i]!='17'){
					//可疑数据值给原始数据标记 
					if(plo.indexOf('B')!=-1 && field=='flowValue'+plo){
						displayVal2=true;
					}else if(field=='AvgValue'+plo){
						displayVal2=true;
					}
					tip+=keyiTip[i];
				}
			}
			
			if(displayVal2==true&&tip.length>0){
				if(ishaveicon){
					html.replace('</i>','');
					html+='<span class="tips keyi" title="'+tip+'">疑</span>';
					html+='</i>';
					ishaveicon=true;
				}else{
					html='<a><span class="blue pointer">'+val+'</span></a><i><span class="tips keyi" title="'+tip+'">疑</span></i>';
				}
			}
		}
	}
	return '<span class="hisData">'+html+'</span>';
}

//移除标准线
function removeStandard(){
	if(isEmptyObject(option)){
		return;
	}
	for(var i=0;i<option.series.length;i++){
		if(option.series[i].name.indexOf('标准线')!=-1){
			option.series.splice(i,1);
			break;
		}
	}
	for(var i=0;i<option.series.length;i++){
		if(option.series[i].name.indexOf('标准线')!=-1){
			option.series.splice(i,1);
			break;
		}
	}
   _myChart.setOption(option, true);
   standard_flag=true;
}

//移除实测线 （非烧结）
function removeValueline(){
	if(isEmptyObject(option)){
		return;
	}
	for(var i=0;i<option.series.length;i++){
		if(option.series[i].name.indexOf('【实测】')!=-1){
			option.series.splice(i,1);
		}
	}
	$.each(option.series,function(index,item){
        if(item.name.indexOf('【实测】')!=-1){
   	        option.series.splice(index,1);
	    }
   	});
	
	for(var i=0;i<option.legend.data.length;i++){
		if(option.legend.data[i].indexOf('【实测】')!=-1){
			option.legend.data.splice(i,1);
		}
	}
	$.each(option.legend.data,function(index,item){
        if(item.indexOf('【实测】')!=-1){
   	        option.legend.data.splice(index,1);
	    }
   	});
	
   _myChart.setOption(option, true);
}

//增加标准线
function addStandard(){
	var itme_name='';
	for(var item in pl_selected){
		if(pl_selected[item]==true&&item.indexOf('【实测】')==-1){
			itme_name=item;
		}
	}
	
	var data_standard=[];
	var plocode='';
	for(var i=0;i<option.series.length;i++){
		if(option.series[i].name.indexOf(itme_name)!=-1&&option.series[i].name.indexOf('【可疑】')==-1){
			data_standard=option.series[i].data_standard;
			plocode=option.series[i].field;
			break;
		}
	}
			
	if(data_standard.length==0){
		standard_flag=false;
		return;
	}
	
	if(_mpselect.data[_mpselect.index].type !=5 && plocode.indexOf('001')!=-1){
		//PH 标准线
		var standard1=[];
		var standard2=[];
		for(var i=0;i<data_standard.length;i++){
			if(data_standard[i]=='-'){
				standard1.push('-');
				standard2.push('-');
			}else{
				standard1.push(data_standard[i].split('-')[0]);
				standard2.push(data_standard[i].split('-')[1]);
			}
		}
		option.series.push({
            name:'标准线下',
            type:'line',
            itemStyle: {normal: {lineStyle: {color: 'red',type: 'solid'}}},
            data:standard1
		});
		option.series.push({
            name:'标准线上',
            type:'line',
            itemStyle: {normal: {lineStyle: {color: 'red',type: 'solid'}}},
            data:standard2
		});
	}else{
		option.series.push({
            name:'标准线',
            type:'line',
            itemStyle: {normal: {lineStyle: {color: 'red',type: 'solid'}}},
            data:data_standard
		});
	}
	
	_myChart.setOption(option, false);
	standard_flag=false;
}


//增加实测线 （非烧结）
function addValueline(){
	var pnum=0;
	var itme_name='';
	for(var item in pl_selected){
		if(pl_selected[item]==true && item.indexOf('【实测】')==-1){
			itme_name=item;
			pnum++;
		}
	}
	if(pnum!=1){
		return;
	}
	
	var itme_name='';
	var index=1;
	for(var item in pl_selected){
		if(item.indexOf('02')!=-1 || item.indexOf('流量')!=-1){
			return;
		}
		if(pl_selected[item]==true && item.indexOf('【实测】')==-1){
			itme_name=item;
		 	break;
		}
		index++;
	}
	
	var data_zs=[];
	for(var i=0;i<option.series.length;i++){
		if(option.series[i].name==itme_name){
			if(ValueOrRevised=='Value'){
				data_zs=option.series[i].data_AvgValue;
			}else{
				data_zs=option.series[i].data_AvgRevised;
			}
			break;
		}
	}

	if(data_zs.length==0){
		return;
	}
	
	var zsname= itme_name.replace("【折算】","【实测】");
	option.legend.data.splice(index, 0, zsname);
	option.series.push({
        name:zsname,
        type:'line',
        itemStyle: {normal: {lineStyle: {type: 'solid'}}},
        data:data_zs
	});
	_myChart.setOption(option, false);
}

//添加停用Chart图标
function addChartStopIcon(){
	if(typeof(zr)=='undefined'||zr.painter ==null || zr.storage==null ){
		zr = _myChart.getZrender();  //获取zrender示例
	}
	var width = Math.ceil(zr.getWidth())-160;
	var height = Math.ceil(zr.getHeight())-120;
	var RectangleShape = require('zrender/shape/Rectangle');
	//停运图标背景色
	var bgcolor='rgba(255,0,0,0.2)';
	//单位宽度
	var itemWidth = width/(xaxis_data.length-1);
	
	var time = $('#historyTime').text().split('至');
	var param={
		search_mpID:_mpselect.data[_mpselect.index].id,
		search_beginTime:time[0]+' 00:00:00.000',
		search_endTime:time[1]+' 23:59:59.999'
	};
	JqAjax(Actions.histroy.getMPStopInfo,'get',param,function(stopdata){
		if(stopdata.length ==0){
			$('#bar_stop').removeClass("on");
			jf.sendNotice('提示', '这段时间内没有停运数据！', 2, 2);
			return;
		}
		//
		var errormsg='';
		for(var i=0;i<stopdata.length;i++){
			//stopdata[i].stopBeginTime;
			//stopdata[i].stopEndTime;
			var startLocation=0;//开始位置
			var endLocation=0;//结束位置
			var startflag=true;
			var endflag=true;
			for(var j=0;j<xaxis_data.length;j++){
				if(xaxis_data[j]==stopdata[i].stopBeginTime.substr(0,13)){
					//开始位置
					startLocation=itemWidth*j;
					startflag=false;
				}else if(stopdata[i].stopBeginTime.substr(0,13)<xaxis_data[0] && xaxis_data[0]<stopdata[stopdata.length-1].stopEndTime.substr(0,13))
				{
					//开始位置
					startLocation=0;
					startflag=false;
				}

				if(xaxis_data[j]==stopdata[i].stopEndTime.substr(0,13)){
					//结束位置
					endLocation=itemWidth*(j+1);
					endflag=false;
				}else if(xaxis_data[xaxis_data.length-1]<stopdata[i].stopEndTime.substr(0,13)){
					//结束位置
					endLocation=itemWidth*(xaxis_data.length-1);
					endflag=false;
				}
			}
			//如果结束或开始只为0
			if(startflag||endflag){
				errormsg+=stopdata[i].stopBeginTime+'<br/>'+stopdata[i].stopEndTime+'<br />这段时间内有停用记录没有对应的监控数据！<hr /><br />';
				break;
			}
			
			//备注信息
			var remark='停运<br />开始时间：'+stopdata[i].stopBeginTime.substr(0,16)+'<br />结束时间：'+stopdata[i].stopEndTime.substr(0,16)+'<br />'+stopdata[i].remark+'';
			//背景宽度
			var areaWidth = endLocation-startLocation;
			//图标位置
			var iconLocation=80+startLocation+areaWidth/2-12;
			//图标id
			var iconId='stop'+i;
			//绘制图标
			var rectangle = new RectangleShape({
				id:iconId,
			    style : {
			        x : iconLocation,
			        y : 28,
			        width : 24,
			        height: 24,
			        brushType : 'both',
			        color : bgcolor,
			        strokeColor : bgcolor.replace(',0.2)',',1)'),
			        lineWidth : 1,
			        lineJoin : 'square',
			        textPosition :'inside',
			        radius: [4, 4],
			        text : '停',
			        textFont : 'normal 14px verdana',
			        textAlign : 'center',
			        textColor : bgcolor.replace(',0.2)',',1)')
			    },
			    _x:80+startLocation,
			    _width :areaWidth,
			    _content:remark,
			    hoverable: false,
			 	clickable : true,
			    onclick: function(params){
			    	if(params.target.style.color.indexOf(',0.2)')!=-1){
			    		zr.modShape(params.target.id, {style: {color:bgcolor.replace(',0.2)',',1)'),textColor : '#fff'}});
			    		//jf.sendNotice('提示', params.target._content, 2, 2);
			    		addChartbg(7,'bg'+params.target.id, params.target._x, params.target._width,'rgba(69,69,70,0.3)');
			    	}else{
			    		zr.modShape(params.target.id, {style: {color:bgcolor.replace(',1)',',0.2)'),textColor : bgcolor.replace(',0.2)',',1)')}});
			    		delChartbg('bg'+params.target.id);
			    	}
	        		zr.refresh();
			    },
			    onmouseover: function(params){
			    	 $('#IconText').html(params.target._content).show()
			    	 if($(window).width()-params.event.clientX<$('#IconText').width()){
			    	 	$('#IconText').css({left:params.event.clientX-$('#IconText').width(),top:params.event.clientY+20});
			    	 }else{
			    	 	$('#IconText').css({left:params.event.clientX,top:params.event.clientY+20});
			    	 }
			    },
				onmouseout: function(e){
					$('#IconText').hide();
				}
			});
			zr.addShape(rectangle);
			_ShapeIconIds.push(iconId);
		}
		if(errormsg.length>0){
			$('#bar_stop').removeClass("on");
			jf.sendNotice('提示', errormsg, 0, 0);
			return;
		}
	});
}
	

//添加验收Chart图标
function addChartYanIcon(){
	if(typeof(zr)=='undefined'||zr.painter ==null || zr.storage==null ){
		zr = _myChart.getZrender();  //获取zrender示例
	}
	var width = Math.ceil(zr.getWidth())-160;
	var height = Math.ceil(zr.getHeight())-120;
	var RectangleShape = require('zrender/shape/Rectangle');
	
	//停运图标背景色
	var iconColor='rgba(67,110,238,0.2)';
	//单位宽度
	var itemWidth = width/(xaxis_data.length-1);
	
	var itme_name='';
	for(var item in pl_selected){
		if(pl_selected[item]==true){
			itme_name=item;
			break;
		}
	}
	
	//遍历加载污染物数据
	var pollutantCode='';
	for(var i = 0; i<_historydata.columns.length;i++){
		var column = _historydata.columns[i];
		if(itme_name.indexOf(column.title)!=-1){
			pollutantCode=column.field;
			break;
		}
	}
	
	var time = $('#historyTime').text().split('至');
	var param={
		search_mpID:_mpselect.data[_mpselect.index].id,
		search_pollutantCode:pollutantCode,
		search_beginTime:time[0]+' 00:00:00.000',
		search_endTime:time[1]+' 23:59:59.999'
	};
	
	JqAjax(Actions.histroy.getMpPollutantAccept,'get',param,function(acceptdata){
		if(acceptdata.length==0){
			$('#bar_yan').removeClass("on");
			jf.sendNotice('提示', '这段时间内没有验收数据！', 2, 2);
			return;
		}
		
		for(var i=0;i<acceptdata.length;i++){
			var startLocation=0;//开始位置
			for(var j=0;j<xaxis_data.length;j++){
				if(xaxis_data[j]==acceptdata[i].acceptDate.substr(0,13)){
					//开始位置
					startLocation=itemWidth*j;
				}
			}
			
			var bgcolor='';
			var tiptext='';
			if(acceptdata[i].acceptStatus*1==0){
				bgcolor='red';
				tiptext='未通过'
			}else{
				bgcolor='green';
				tiptext='通过'
			}
			
			//备注信息
			var remark='验收'+tiptext+'<br />时间：'+acceptdata[i].acceptDate.substr(0,10)+'<br />'+acceptdata[i].remark;
			//背景宽度
			var areaWidth = 2;
			//图标位置
			var iconLocation=80+startLocation+areaWidth/2-12;
			//图标id
			var iconId='yan'+i;
			//绘制图标
			var rectangle = new RectangleShape({
				id:iconId,
			    style : {
			        x : iconLocation,
			        y : 28,
			        width : 24,
			        height: 24,
			        brushType : 'both',
			        color : iconColor,
			        strokeColor : iconColor.replace(',0.2)',',1)'),
			        lineWidth : 1,
			        lineJoin : 'square',
			        textPosition :'inside',
			        radius: [4, 4],
			        text : '验',
			        textFont : 'normal 14px verdana',
			        textAlign : 'center',
			        textColor : iconColor.replace(',0.2)',',1)')
			    },
			    _x:80+startLocation,
			    _width :areaWidth,
			    _content:remark,
			    _bgcolor:bgcolor,
			    hoverable: false,
			 	clickable : true,
			    onclick: function(params){
			    	if(params.target.style.color.indexOf(',0.2)')!=-1){
			    		zr.modShape(params.target.id, {style: {color:iconColor.replace(',0.2)',',1)'),textColor : '#fff'}});
			    		//jf.sendNotice('提示', params.target._content, 2, 2);
			    		addChartbg(4,'bg'+params.target.id, params.target._x, params.target._width,params.target._bgcolor);
			    	}else{
			    		zr.modShape(params.target.id, {style: {color:iconColor.replace(',1)',',0.2)'),textColor : iconColor.replace(',0.2)',',1)')}});
			    		delChartbg('bg'+params.target.id);
			    	}
	        		zr.refresh();
			    },
			    onmouseover: function(params){
			    	 $('#IconText').html(params.target._content).show()
			    	 if($(window).width()-params.event.clientX<$('#IconText').width()){
			    	 	$('#IconText').css({left:params.event.clientX-$('#IconText').width(),top:params.event.clientY+20});
			    	 }else{
			    	 	$('#IconText').css({left:params.event.clientX,top:params.event.clientY+20});
			    	 }
			    },
				onmouseout: function(e){
					$('#IconText').hide();
				}
			});
			zr.addShape(rectangle);
			_ShapeIconIds.push(iconId);
		}
	});
	
}




function delChartYiLine(){
	if(isEmptyObject(option)){
		return;
	}
	for(var i=0;i<option.series.length;i++){
		if(option.series[i].flag=='yi'){
			option.series.splice(i,1);
		}
	}
	$.each(option.series,function(index,item){
        if(item.flag=='yi'){
   	        option.series.splice(index,1);
	    }
   	});
   _myChart.setOption(option, true);
   standard_flag=true;
}


//删除Chart图标
var _ShapeIconIds=[];
function delChartIcon(id){
	if(typeof(zr)=='undefined'||zr.painter ==null || zr.storage==null ){
		if(_myChart==undefined){
			return;
		}
		zr = _myChart.getZrender();  //获取zrender示例
	}
	if(id=='all'){
		for(var i=0;i<_ShapeIconIds.length;i++){
			zr.delShape(_ShapeIconIds[i]);
		}
		_ShapeIconIds=[];
	}else{
		for(var i=0;i<_ShapeIconIds.length;i++){
			if(_ShapeIconIds[i].indexOf(id)!=-1){
				zr.delShape(_ShapeIconIds[i]);
			}
		}
		zr.delShape(id);
	}
	_myChart.refresh();
}




//添加Chart背景
function addChartbg(type,id,x,itemWidth,bgcolor){
	if(typeof(zr)=='undefined'||zr.painter ==null || zr.storage==null ){
		zr = _myChart.getZrender();  //获取zrender示例
	}
	var height = Math.ceil(zr.getHeight())-120;
	var RectangleShape = require('zrender/shape/Rectangle');
	var rectangle = new RectangleShape({
		id:id,
		z: -1,
		hoverable: false,
	    style : {
	        x : x,
	        y : 60,
	        width : itemWidth,
	        height: height,
	        color : bgcolor
	    }
	});
	zr.addShape(rectangle);
	_ShapeIds.push(id);
	_myChart.refresh();
}

/*	1超标
	2异常
	3超标异常 
	6掉线
	7停运
	12-18可疑*/
function formatCount(val, row, index) {
	var html='';
	if(val==undefined||val=='-'){
		html='-';
	}else if(_mpselect.data[_mpselect.index].type==6){
		html= val;
	}else{
		var field = $(this)[0].field;
		//污染物编号
		var plo = field.replace('cou','');
		var yStatus= row['yStatus'+plo];
		var yStatusTip= row['yStatusTip'+plo];
		if($(".timeTab span.on").attr('tag')*1 ==2){
			yStatusTip=yStatusTip.replace(/ 00/g, '');
		}
		if(yStatus!='-' && (yStatus.indexOf('16')!=-1||yStatus.indexOf('17')!=-1)){
			var keyiNum = yStatus.split(';');
			var keyiTip = yStatusTip.split(';');
			
			var tip='';
			for(var i=0;i<keyiNum.length;i++){
				if(keyiNum[i]=='16' || keyiNum[i]=='17'){
					tip+=keyiTip[i]
				}
			}
			if(tip.length>0){
				html='<a><span class="blue pointer">'+val+'</span></a><i><span class="tips keyi" title="'+tip+'">疑</span></i>';
			}
		}else{
			html=val;
		}
	}
	return '<span class="hisData">'+html+'</span>';
} 

/*	1超标
2异常
3超标异常 
6掉线
7停运
12-18可疑*/



//删除Chart背景
var _ShapeIds=[];
function delChartbg(id){
	if(typeof(zr)=='undefined'||zr.painter ==null || zr.storage==null ){
		if(_myChart==undefined){
			return;
		}
		zr = _myChart.getZrender();  //获取zrender示例
	}
	if(id=='all'){
		for(var i=0;i<_ShapeIds.length;i++){
			zr.delShape(_ShapeIds[i]);
		}
		_ShapeIds=[];
	}else{
		for(var i=0;i<_ShapeIds.length;i++){
			if(_ShapeIds[i].indexOf(id)!=-1){
				zr.delShape(_ShapeIds[i]);
			}
		}
		zr.delShape(id);
	}
	_myChart.refresh();
}

//验收按钮
$('#bar_yan').on('click',function(){
	
	var a = $(this);
	if(a.hasClass('disable')){return;}
	
	if(!a.hasClass('on')){
		a.addClass("on");
		addChartYanIcon();
	}else{
		a.removeClass("on");
		delChartbg('yan');
		delChartIcon('yan');
	}
});

//修正值按钮
$('#bar_xiu').on('click',function(){
	if(isEmptyObject(option)){
		return;
	}
	var a = $(this);
	if(a.hasClass('disable')){return;}
	$("#chartview a.mval").removeClass("on");
	a.addClass("on");
	ValueOrRevised='Revised';
	
	//var len=0;
	for(var i =0;i<option.series.length;i++){
		if(option.series[i].name.indexOf("标准线")==-1 && option.series[i].name.indexOf("【实测】")==-1&& option.series[i].name.indexOf("【可疑】")==-1){
			//len++;
			if(option.series[i].field !=undefined &&_mpselect.data[_mpselect.index].type==5 && _mpselect.data[_mpselect.index].clotting_flag==false){
				if(option.series[i].field.indexOf('B')!=-1 || option.series[i].field.indexOf('S')!=-1){
					option.series[i].data = option.series[i].data_AvgRevised;
				}else{
					option.series[i].data = option.series[i].data_ZsRevised;
				}
			}else{
				option.series[i].data = option.series[i].data_AvgRevised;
			}
		}
	}
	 
	_myChart.setOption(option, false);
	 
	delChartYiLine();
	//移除实测线
	removeValueline();
 
	//是否烧结
	if(_mpselect.data[_mpselect.index].type==5 && !_mpselect.data[_mpselect.index].clotting_flag){
		//增加实测线
		addValueline();
	}
});


//原始值按钮
$('#bar_yuan').on('click',function(){
	if(isEmptyObject(option)){
		return;
	}
	var a = $(this);
	if(a.hasClass('disable')){return;}
	$("#chartview a.mval").removeClass("on");
	a.addClass("on");
	ValueOrRevised='Value';
	
	//var len=0;
	for(var i =0;i<option.series.length;i++){
		if(option.series[i].name.indexOf("标准线")==-1 && option.series[i].name.indexOf("【实测】")==-1&& option.series[i].name.indexOf("【可疑】")==-1){
			//len++;
			if(option.series[i].field !=undefined &&_mpselect.data[_mpselect.index].type==5 && _mpselect.data[_mpselect.index].clotting_flag==false){
				if(option.series[i].field.indexOf('B')!=-1 || option.series[i].field.indexOf('S')!=-1){
					option.series[i].data = option.series[i].data_AvgValue;
				}else{
					option.series[i].data = option.series[i].data_ZsValue;
				}
						
			}else{
				option.series[i].data = option.series[i].data_AvgValue;
			}
		}
	}
	 
	_myChart.setOption(option, false);
	
	 
	delChartYiLine();
	
	//移除实测线
	removeValueline();
	
	//是否烧结
	if(_mpselect.data[_mpselect.index].type==5 && !_mpselect.data[_mpselect.index].clotting_flag){
		//增加实测线
		addValueline();
	}
	
});

//标准值按钮
$('#bar_biao').on('click',function(){
	
	if(_mpselect.data[_mpselect.index].type==6){
		jf.sendNotice('提示', '进水口没有标准值！', 2, 2);
		return;
	}
	
	var a = $(this);
	if(a.hasClass('disable')){return;}
	
	if(standard_flag){
		//标准线 图标样式切换
		a.addClass("on");
		//增加标准线
		addStandard();
	}else{
		//标准线 图标样式切换
		a.removeClass("on");
		//移除标准线
		removeStandard();
	}
});

//停用按钮
$('#bar_stop').on('click',function(){
	var a = $(this);
	if(!a.hasClass('on')){
		a.addClass("on");
		addChartStopIcon();
		
	}else{
		a.removeClass("on");
		delChartbg('stop');
		delChartIcon('stop');
	}
});

//添加双日期控件
function initJfDate(){
	var sdate = new Date().addDays(-6);
	var edate=  new Date();
	var statr = sdate.Format("yyyy-MM-dd");
	var end = edate.Format("yyyy-MM-dd");
	$('#historyTime').text(statr+'至'+end).jfDoubleDate({
		sdate:sdate,
		edate:edate,
		range:10,
        rangeType:'Day',
        smaxdate:new Date(),
		emaxdate:new Date(),
		onChange:function(){
			ValueOrRevised='Revised';
			$('#bar_xiu').addClass('on');
			$('#bar_yuan').removeClass('on');
			load_Data(); 
		}
	});
	
	$('#bar_biao').show();
	$('#bar_stop').show();
	$('#bar_xiu').show();
	$('#bar_yan').show();  
	
	delChartbg('all');
	delChartIcon('all');
	delChartYiLine();
	removeStandard();
}


//时间切换
$(".timeTab span").each(function(i) {
	var li = $(this);
	li.on("click", function() {
		$(".timeTab span").removeClass("on");
		li.addClass("on");
		$('.doubleDate').remove();
		
		var time = $('#historyTime').text().split('至');
		var sdate =new Date(time[0].replace(/-/g,"/"));
		var edate =new Date(time[1].replace(/-/g,"/"));
		var difference = new Date(edate)-new Date(sdate);
		var daynum=difference/ (1000 * 60 * 60 * 24 );
		
		if($(".timeTab span.on").attr('tag')*1>=3){
			
			var statr;
			var end;
			
			var range=0;
			var rangetypy='';
			if($(".timeTab span.on").attr('tag')*1==3){
				//分钟
				range=1;
				rangetypy='Week';
				
				if(daynum>7){
					sdate=new Date();
					edate=new Date();
					
					statr = sdate.Format("yyyy-MM-dd 00:00");
					end = edate.Format("yyyy-MM-dd hh:00");
					
				}else{
					if(sdate.Format("yyyy-MM-dd hh:00")==edate.Format("yyyy-MM-dd hh:00")){
						statr = sdate.Format("yyyy-MM-dd 00:00");
						end = edate.Format("yyyy-MM-dd")+new Date().Format(" hh:00");
					}else{
						statr = sdate.Format("yyyy-MM-dd hh:00");
						end = edate.Format("yyyy-MM-dd hh:00");
					}
				}
			}else{
				//实时
				range=1;
				rangetypy='Day';
				
				if(daynum>1){
					sdate=new Date();
					edate=new Date();
					
					statr = sdate.Format("yyyy-MM-dd 00:00");
					end = edate.Format("yyyy-MM-dd hh:00");

					end =new Date(end.replace(/-/g,"/")).addHours(1).Format("yyyy-MM-dd hh:00");
				}else{
					if(sdate.Format("yyyy-MM-dd hh:00")==edate.Format("yyyy-MM-dd hh:00")){
						statr = sdate.Format("yyyy-MM-dd 00:00");
						end = edate.Format("yyyy-MM-dd")+new Date().addHours(1).Format(" hh:00");
					}else{
						statr = sdate.Format("yyyy-MM-dd hh:00");
						end = edate.Format("yyyy-MM-dd hh:00");
					}
				}
			}
			
			sdate =new Date(statr.replace(/-/g,"/"));
			edate =new Date(end.replace(/-/g,"/"));
			
			
			//添加双日期控件
			$('#historyTime').text(statr+'至'+end).jfDoubleTime({
				sdate:sdate,
				edate:edate,
				range:range,
    			rangeType:rangetypy,
    			smaxdate:new Date(),
    			emaxdate:new Date(),
				onChange:function(){
					ValueOrRevised='Value';
					$('#bar_xiu').removeClass('on');
					$('#bar_yuan').addClass('on');
					load_Data();
				}
			});
			
			$('#bar_biao').hide().removeClass('on');
			$('#bar_stop').hide().removeClass('on');
			$('#bar_xiu').hide().removeClass('on');
			$('#bar_yan').hide().removeClass('on');  
			
			ValueOrRevised='Value';
			$('#bar_xiu').removeClass('on');
			$('#bar_yuan').addClass('on');
			
			delChartbg('all');
			delChartIcon('all');
			delChartYiLine();
			removeStandard();
			
		}else if($(".timeTab span.on").attr('tag')*1==1){ 
			//小时数据
			//var data2=cloneDate(edate).addMonths(-3);
			var data2=cloneDate(edate).addDays(-10);
			var daynum2=(edate-data2)/(1000 * 60 * 60 * 24);
			if(daynum>daynum2){
				edate=new Date();
				sdate=cloneDate(edate).addDays(-6);
			}
			
			//添加双日期控件
			var statr = sdate.Format("yyyy-MM-dd");
			var end = edate.Format("yyyy-MM-dd");
			$('#historyTime').text(statr+'至'+end).jfDoubleDate({
				sdate:sdate,
				edate:edate,
				range:10,
    			rangeType:'Day',
    			smaxdate:new Date(),
    			emaxdate:new Date(),
				onChange:function(){
					load_Data();
				}
			});
			
			$('#bar_biao').show();
			$('#bar_stop').show();
			$('#bar_xiu').show();
			$('#bar_yan').show();  
			
			delChartbg('all');
			delChartIcon('all');
			delChartYiLine();
			removeStandard();
			
		}else if($(".timeTab span.on").attr('tag')*1==2){
			//日 数据
			var data2=cloneDate(edate).addYears(-1);
			var daynum2=(edate-data2)/(1000 * 60 * 60 * 24);
			if(daynum>daynum2){
				edate=new Date();
				sdate=cloneDate(edate).addMonths(-1);
			}
			//添加双日期控件
			var statr = sdate.Format("yyyy-MM-dd");
			var end = edate.Format("yyyy-MM-dd");
			 
			
			$('#historyTime').text(statr+'至'+end).jfDoubleDate({
				sdate:sdate,
				edate:edate,
				range:1,
    			rangeType:'Month',
    			smaxdate:new Date(),
    			emaxdate:new Date(),
				onChange:function(){
					load_Data();
				}
			});
			
			$('#bar_biao').hide().removeClass('on');
			$('#bar_stop').hide().removeClass('on');
			$('#bar_xiu').show();
			$('#bar_yan').hide().removeClass('on');  
			
			delChartbg('all');
			delChartIcon('all');
			delChartYiLine();
			removeStandard();
		}
		load_Data();
	});
});

//时间加减
$('.chartWapper span.t-time').click(function(){
	var span =$(this);
	var time = $('#historyTime').text().split('至');
	var statr =new Date(time[0].replace(/-/g,"/"));
	var end =new Date(time[1].replace(/-/g,"/"));
	var difference = new Date(end)-new Date(statr);
	var difference1 = new Date()-new Date(statr);
	
	if(span.attr('tag')=='before'){
		
		
		
		if($(".timeTab span.on").attr('tag')*1==1){
			if((new Date()-end)/ (1000 * 60 * 60 * 24)<=1){
				jf.sendNotice('提示', '    不能选择将来时间(+1天)', 2, 2);
				return;
			}
			var data1=cloneDate(end);
			//var data2=cloneDate(data1).addMonths(-3);
			var data2=cloneDate(data1).addDays(-10);
			var daynum=(data1-data2)/(1000 * 60 * 60 * 24);//10天数
			var num=difference/ (1000 * 60 * 60 * 24);//结束时间和开始时间 差 天数 
			if(num>=daynum){
				statr.addDays(1);
			}
			end.addDays(1);//跨度一天
			$('#historyTime').text(statr.Format("yyyy-MM-dd")+'至'+end.Format("yyyy-MM-dd"));
		}else if($(".timeTab span.on").attr('tag')*1==2){
			
			if((new Date()-end)/ (1000 * 60 * 60 * 24)<=7){
				jf.sendNotice('提示', '    不能选择将来时间 (+7天)', 2, 2);
				return;
			}
			end.addDays(7);//跨度一周
			if(end>new Date()){
				end=new Date();
			}
			var data1=new Date(end);
			//var data2=cloneDate(data1).addYears(-1);
			var data2=cloneDate(data1).addMonths(-1);
			var daynum=(data2-data1)/(1000 * 60 * 60 * 24);
			var num=difference/ (1000 * 60 * 60 * 24);
			if(num>=daynum){
				statr.addDays(7);//跨度一周
			}
			$('#historyTime').text(statr.Format("yyyy-MM-dd")+'至'+end.Format("yyyy-MM-dd"));
			
		}else if($(".timeTab span.on").attr('tag')*1==3){
			if((new Date()-end)/ (1000 * 60 * 60 )<=1){
				jf.sendNotice('提示', '    不能选择将来时间 (+1小时)', 2, 2);
				return;
			}
			var num=difference/ (1000 * 60 * 60 * 24 * 7);
			if(num>=1){
				statr.addHours(1);
			}
			end.addHours(1);//跨度一小时
			$('#historyTime').text(statr.Format("yyyy-MM-dd hh:00")+'至'+end.Format("yyyy-MM-dd hh:00"));
		}else if($(".timeTab span.on").attr('tag')*1==4){
			if((new Date()-end)/ (1000 * 60 * 60 )<=1){
				jf.sendNotice('提示', '    不能选择将来时间 (+1小时)', 2, 2);
				return;
			}
			var num=difference/ (1000 * 60 * 60 * 24 );
			if(num>=1){
				statr.addHours(1);
			}
			end.addHours(1);//跨度一小时
			$('#historyTime').text(statr.Format("yyyy-MM-dd hh:00")+'至'+end.Format("yyyy-MM-dd hh:00"));
		}
	}else{
	
		if($(".timeTab span.on").attr('tag')*1==1){//小时 
			var difference = new Date(end)-new Date(statr);
			var data1=new Date(statr);
			//var data2=cloneDate(data1).addMonths(3);
			var data2=cloneDate(data1).addDays(10);
			var daynum=(data2-data1)/(1000 * 60 * 60 * 24);//三个月的天数
			var num=difference/ (1000 * 60 * 60 * 24);//结束时间和开始时间 差 天数 
			if(num>=daynum){
				end.addDays(-1);
			}
			statr.addDays(-1);//跨度一天
			$('#historyTime').text(statr.Format("yyyy-MM-dd")+'至'+end.Format("yyyy-MM-dd"));
		}else if($(".timeTab span.on").attr('tag')*1==2){//日
			statr.addDays(-7);//跨度一周
			difference = new Date(end)-new Date(statr);
			var data1=new Date(statr);
			//var data2=cloneDate(data1).addYears(1);
			var data2=cloneDate(data1).addMonths(1);
			var daynum=(data2-data1)/(1000 * 60 * 60 * 24);
			var num=difference/ (1000 * 60 * 60 * 24);
			if(num>=daynum){
				end.addDays(-7);
			}
			$('#historyTime').text(statr.Format("yyyy-MM-dd")+'至'+end.Format("yyyy-MM-dd"));
		}else if($(".timeTab span.on").attr('tag')*1==3){//分钟
			var num=difference/ (1000 * 60 * 60 * 24 * 7);
			if(num>=1){
				end.addHours(-1);
			}					
			statr.addHours(-1);//跨度一小时
			$('#historyTime').text(statr.Format("yyyy-MM-dd hh:00")+'至'+end.Format("yyyy-MM-dd hh:00"));
		}else if($(".timeTab span.on").attr('tag')*1==4){//实时
			var num=difference/ (1000 * 60 * 60 * 24 );
			if(num>=1){
				end.addHours(-1);
			}
			statr.addHours(-1);//跨度一小时
			$('#historyTime').text(statr.Format("yyyy-MM-dd hh:00")+'至'+end.Format("yyyy-MM-dd hh:00"));
		}
	}
 
	$('#bar_stop').removeClass('on');
	load_Data();
});

/*
4未审核 5:审核不通过  8:未验收 0正常
*/
//导出excel
$('.icon-down').parent().on('click',function(){
	var time = $('#historyTime').text().split('至');
	var startTime='';
	var endTime='';
	if(time[0].length==10){
		startTime=time[0]+' 00:00:00.000';
		endTime=time[1]+' 23:59:59.999';
		if(time[1]==new Date().format('yyyy-MM-dd')){
			endTime=new Date().format('yyyy-MM-dd hh:mm:ss');
		}
	}else{
		startTime=time[0];
		endTime=time[1];
	}
	var myfla = true;
	if(_mpselect.data[_mpselect.index].type==5){
		myfla = _mpselect.data[_mpselect.index].clotting_flag;
	}
	var exportEecelparam={
			PageNo:1,
			PageSize:10000000,
			search_clotting_flag:myfla,
			search_mpId:_mpselect.data[_mpselect.index].id,
			search_mpType:_mpselect.data[_mpselect.index].type,
			search_startTime:startTime,
			search_endTime:endTime,
			search_dataType:$(".timeTab span.on").attr('tag')*1	//1小时数据，2日数据，3分钟数据，4实时数据
		};
	var myparam= $.param(exportEecelparam);
	location.href="onlineAction!exportExcel.page?"+myparam;
});


//视图切换
$('.listView a').each(function(i) {
	var a = $(this);
	a.on('click', function() {
		$('.listView a').removeClass('on');
		a.addClass('on');
		if(a.attr('id')=='iconlist'){ 
			$("#chartlist").hide();
			$('#iconlist>span').attr('class','icon-curve-on');
			$('#iconview>span').attr('class','icon-grid');
		}else{ 
			$("#chartlist").show();
			$('#iconlist>span').attr('class','icon-curve');
			$('#iconview>span').attr('class','icon-grid-on');
			$("#historydataList").datagrid("resize");
		}
	});
});

window.onresize = function(){
	if (typeof(_myChart) != "undefined") {
		_myChart.resize();
	}
	if (typeof(_myChart1) != "undefined") {
		_myChart1.resize();
	}
}


$('#historydataList').datagrid({
	singleSelect: true,
	nowrap: true,
	pagination: true,
	scrollbarSize:0,
	fit:true,
    pagination:true
});

function toggle(id){
	$('#'+id).toggle();
}
function cleardata(){
	if (typeof(_myChart) != "undefined") { 
		   _myChart.clear();
	}
	if (typeof(_myChart1) != "undefined") { 
	   _myChart1.clear(); 
	}
	
	$('#bar_stop').removeClass('on');
	$('#bar_biao').removeClass('on'); 
	$('#bar_yan').removeClass('on');  
	
	pl_selected={};
	option={};
	
	//监控数据
	monitor_data =[];
	//Chart 线名称
	itmes_data = [];
	//x轴数据
	xaxis_data = [];
	//监控点状态 /x轴对应的状态 
	mp_status = [];
	
	_historydata={};
	
	if(_historyDataGrid){
		_historyDataGrid.datagrid('loadData', { total: 0, rows: [],columns:[],frozenColumns:[]});
		$('#historydataList').html('');
	}
	 
}

function load_Data(){
	if(typeof(_mpselect)=='undefined' || isEmptyObject(_mpselect)){
		return;
	}
	
	cleardata();
	//加载图表
	loadHistoryData();
	 
}
  