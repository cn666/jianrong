var CreatedOKLodop7766 = null;

//====判断是否需要安装CLodop云打印服务器:====
function needCLodop() {
	try {
		var ua = navigator.userAgent;
		if(ua.match(/Windows\sPhone/i) != null) return true;
		if(ua.match(/iPhone|iPod/i) != null) return true;
		if(ua.match(/Android/i) != null) return true;
		if(ua.match(/Edge\D?\d+/i) != null) return true;
		if(ua.match(/QQBrowser/i) != null) return false;
		var verTrident = ua.match(/Trident\D?\d+/i);
		var verIE = ua.match(/MSIE\D?\d+/i);
		var verOPR = ua.match(/OPR\D?\d+/i);
		var verFF = ua.match(/Firefox\D?\d+/i);
		var x64 = ua.match(/x64/i);
		if((verTrident == null) && (verIE == null) && (x64 !== null))
			return true;
		else
		if(verFF !== null) {
			verFF = verFF[0].match(/\d+/);
			if(verFF[0] >= 42) return true;
		} else
		if(verOPR !== null) {
			verOPR = verOPR[0].match(/\d+/);
			if(verOPR[0] >= 32) return true;
		} else
		if((verTrident == null) && (verIE == null)) {
			var verChrome = ua.match(/Chrome\D?\d+/i);
			if(verChrome !== null) {
				verChrome = verChrome[0].match(/\d+/);
				if(verChrome[0] >= 42) return true;
			};
		};
		return false;
	} catch(err) {
		return true;
	};
};

//====页面引用CLodop云打印必须的JS文件：====
if(needCLodop()) {
	var head = document.head || document.getElementsByTagName("head")[0] || document.documentElement;
	var oscript = document.createElement("script");
	oscript.src = "http://localhost:8000/CLodopfuncs.js?priority=1";
	head.insertBefore(oscript, head.firstChild);
	//本机云打印的后补端口8001：
	oscript = document.createElement("script");
	oscript.src = "http://localhost:8001/CLodopfuncs.js?priority=2";
	head.insertBefore(oscript, head.firstChild);
};

//====获取LODOP对象的主过程：====
function getLodop(oOBJECT, oEMBED) {
	
	var install_lodop32=baseUrl('static/am/vendor/lodop/install_lodop32.exe');
	var install_lodop64=baseUrl('static/am/vendor/lodop/install_lodop64.exe');
	var CLodop_Setup_for_Win32NT=baseUrl('static/am/vendor/lodop/CLodop_Setup_for_Win32NT.exe');
	
	var strHtmInstall = "<br>点击这里<a style='color: #fff;font-weight: 500;'  href='"+install_lodop32+"' target='_self'> <b> <u>执行安装</u> </b> </a>,安装后请刷新页面或重新进入。";
	var strHtmUpdate = "<br>点击这里<a style='color: #fff;font-weight: 500;' href='"+install_lodop32+"' target='_self'> <b> <u>执行升级</u> </b> </a>,升级后请重新进入。";
	var strHtm64_Install = "<br>点击这里<a style='color: #fff;font-weight: 500;' href='"+install_lodop64+"' target='_self'> <b> <u>执行安装</u> </b> </a>,安装后请刷新页面或重新进入。";
	var strHtm64_Update = "<br>点击这里<a style='color: #fff;font-weight: 500;' href='"+install_lodop64+"' target='_self'> <b> <u>执行升级</u> </b> </a>,升级后请重新进入。";

	var strHtmFireFox = "<br><br>（注意：如曾安装过Lodop旧版附件npActiveXPLugin,请在【工具】->【附加组件】->【扩展】中先卸它）";
	var strHtmChrome = "<br><br>(如果此前正常，仅因浏览器升级或重安装而出问题，需重新执行以上安装）";
	var strCLodopInstall = "<br>CLodop云打印服务(localhost本地)未安装启动!点击这里<a  style='color: wheat;'  href='"+CLodop_Setup_for_Win32NT+"' target='_self'>执行安装</a>,安装后请刷新页面。";
	var strCLodopUpdate = "<br>CLodop云打印服务需升级!点击这里<a  style='color: wheat;' href='"+CLodop_Setup_for_Win32NT+"' target='_self'>执行升级</a>,升级后请刷新页面。";
	var LODOP;
	try {
		var isIE = (navigator.userAgent.indexOf('MSIE') >= 0) || (navigator.userAgent.indexOf('Trident') >= 0);
		if(needCLodop()) {
			try {
				LODOP = getCLodop();
			} catch(err) {};
			if(!LODOP && document.readyState !== "complete") {
				alert("C-Lodop没准备好，请稍后再试！");
				return;
			};
			if(!LODOP) {
				if(isIE) {
					//document.write(strCLodopInstall);
					jf.sendNotice('提示', strCLodopInstall, 2, 0);
				}
				else {
					jf.sendNotice('提示', strCLodopInstall, 2, 0);
					//document.documentElement.innerHTML=strCLodopInstall+document.documentElement.innerHTML;
				}
				return;
			} else {

				if(CLODOP.CVERSION < "2.0.6.2") {
					if(isIE) {
						//document.write(strCLodopUpdate);
						jf.sendNotice('提示', strCLodopUpdate, 2, 0);
					}
					else{
						//document.documentElement.innerHTML = strCLodopUpdate + document.documentElement.innerHTML;
						jf.sendNotice('提示', strCLodopUpdate, 2, 0);
					}
				};
				if(oEMBED && oEMBED.parentNode) oEMBED.parentNode.removeChild(oEMBED);
				if(oOBJECT && oOBJECT.parentNode) oOBJECT.parentNode.removeChild(oOBJECT);
			};
		} else {
			var is64IE = isIE && (navigator.userAgent.indexOf('x64') >= 0);
			//=====如果页面有Lodop就直接使用，没有则新建:==========
			if(oOBJECT != undefined || oEMBED != undefined) {
				if(isIE) LODOP = oOBJECT;
				else LODOP = oEMBED;
			} else if(CreatedOKLodop7766 == null) {
				LODOP = document.createElement("object");
				LODOP.setAttribute("width", 0);
				LODOP.setAttribute("height", 0);
				LODOP.setAttribute("style", "position:absolute;left:0px;top:-100px;width:0px;height:0px;");
				if(isIE) LODOP.setAttribute("classid", "clsid:2105C259-1E0C-4534-8141-A753534CB4CA");
				else LODOP.setAttribute("type", "application/x-print-lodop");
				document.documentElement.appendChild(LODOP);
				CreatedOKLodop7766 = LODOP;
			} else LODOP = CreatedOKLodop7766;
			//=====Lodop插件未安装时提示下载地址:==========
			if((LODOP == null) || (typeof(LODOP.VERSION) == "undefined")) {
				if(navigator.userAgent.indexOf('Chrome') >= 0) {
					jf.sendNotice('打印控件未安装', strHtmChrome, 2, 0);
					//document.documentElement.innerHTML=strHtmChrome+document.documentElement.innerHTML;
				}
				if(navigator.userAgent.indexOf('Firefox') >= 0) {
					jf.sendNotice('打印控件未安装', strHtmFireFox, 2, 0);
					//document.documentElement.innerHTML=strHtmFireFox+document.documentElement.innerHTML;
				}
				if(is64IE) {
					jf.sendNotice('打印控件未安装', strHtm64_Install, 2, 0);
					//document.write(strHtm64_Install);
				} else if(isIE) {
					jf.sendNotice('打印控件未安装', strHtmInstall, 2, 0);
					//document.write(strHtmInstall); 
				} else {
					jf.sendNotice('打印控件未安装', strHtmInstall, 2, 0);
					//document.documentElement.innerHTML=strHtmInstall+document.documentElement.innerHTML;

				}
				return LODOP;
			};
		};
		if(LODOP.VERSION < "6.2.0.5") {
			if(needCLodop()){
				//document.documentElement.innerHTML = strCLodopUpdate + document.documentElement.innerHTML;
				jf.sendNotice('提示', strCLodopUpdate, 2, 0);
			}
			else if(is64IE) {
				//document.write(strHtm64_Update);
				jf.sendNotice('提示', strHtm64_Update, 2, 0);
			}
			else if(isIE) {
				jf.sendNotice('提示', strHtmUpdate, 2, 0);
				//document.write(strHtmUpdate);
			}
			else{
				jf.sendNotice('提示', strHtmUpdate, 2, 0);
				//document.documentElement.innerHTML = strHtmUpdate + document.documentElement.innerHTML;
			}
			return LODOP;
		};
		//===如下空白位置适合调用统一功能(如注册语句、语言选择等):===
		LODOP.SET_LICENSES("西安交大长天软件股份有限公司", "747606062808075747594958093190", "", "");
		//LODOP.SET_LICENSES (strCompanyName, strLicense, '','')
		//===========================================================
		return LODOP;
	} catch(err) {
		alert("getLodop出错:" + err);
	};
};

//打印Web
function PrintHtml(title,html,preview){
	LODOP = getLodop();
	if ((LODOP!=null)&&(typeof(LODOP.VERSION)!="undefined")) {
		LODOP.PRINT_INIT(title);
		//LODOP.SET_PRINT_PAGESIZE(2,0,0,"A4");//横向打印
		LODOP.ADD_PRINT_HTM("4%","4%","92%","90%",html); 
		if(preview){
			LODOP.PREVIEW();
		}else{
			LODOP.PRINT();
		}
	}
}



//打印表格
function PrintTable(title,columns,rows,preview){
	LODOP = getLodop();
	if ((LODOP!=null)&&(typeof(LODOP.VERSION)!="undefined")) {
		
		var html = jsonToTable(title,columns,rows,'print');
		
		LODOP.PRINT_INIT(title);
		LODOP.SET_PRINT_PAGESIZE(2,0,0,"A4");//横向打印
		LODOP.ADD_PRINT_TABLE("4%","4%","92%","90%",html);
		LODOP.SET_PREVIEW_WINDOW(0,0,0,800,600,"");
		if(preview){
			LODOP.PREVIEW();
		}else{
			LODOP.PRINT();
		}
	}
}

//导出Excel
function SaveAsFile(title,columns,rows,preview){
	LODOP=getLodop();
	if ((LODOP!=null)&&(typeof(LODOP.VERSION)!="undefined")) {
		
		var html = jsonToTable(title,columns,rows,'excel');
		
		LODOP.PRINT_INIT(""); 
		LODOP.ADD_PRINT_TABLE(100,20,500,80,html); 
		LODOP.SET_SAVE_MODE("Orientation",2); //Excel文件的页面设置：横向打印   1-纵向,2-横向;
		LODOP.SET_SAVE_MODE("PaperSize",9);  //Excel文件的页面设置：纸张大小   9-对应A4
		LODOP.SET_SAVE_MODE("Zoom",90);       //Excel文件的页面设置：缩放比例
		LODOP.SET_SAVE_MODE("CenterHorizontally",true);//Excel文件的页面设置：页面水平居中
		LODOP.SET_SAVE_MODE("CenterVertically",true); //Excel文件的页面设置：页面垂直居中
		LODOP.SET_SAVE_MODE("QUICK_SAVE",false);//快速生成（无表格样式,数据量较大时或许用到） 
		LODOP.SAVE_TO_FILE(title+".xls");
	}
};	 

//Json转Table
function jsonToTable(title,columns,rows,type){
	var table = [];
	//表头
	table.push('<style>table{border:none;height:16px} th,td{border: 1px solid #000;min-width:120px;height:25px}</style>');
	table.push('<table border=0 cellSpacing=0 cellPadding=0 width="100%" height="200" bordercolor="#000000" style="border-collapse:collapse">');
	
	//打印标题
	if(type=='print'){
		table.push('<caption><b><font face="黑体" size="4">'+title+'</font></b></caption>');
	}
	table.push('<thead>');
	//slx标题
	var countcolspan=0;
	if(type=='excel'){
		table.push('	<tr><th colspan="countcolspan">'+title+'</th></tr>');
	}
	
	//单表头
	if(columns.constructor==Array ){
		table.push('	<tr>');
		for(var i =0;i<columns.length;i++){
			table.push('		<th><b>'+columns[i].text+'</b></th>');
		}
		table.push('	</tr>');
	}
	
	//两行表头
	if(columns.constructor==Object ){
		table.push('	<tr>');
		for(var i =0;i<columns.row1.length;i++){
			table.push('		<th rowspan="'+columns.row1[i].rowspan+'" colspan="'+columns.row1[i].colspan+'"><b>'+columns.row1[i].text+'</b></th>');
		}
		table.push('	</tr>');
		table.push('	<tr>');
		for(var i =0;i<columns.row2.length;i++){
			table.push('		<th rowspan="'+columns.row2[i].rowspan+'" colspan="'+columns.row2[i].colspan+'"><b>'+columns.row2[i].text+'</b></th>');
		}
		table.push('	</tr>');
	}
	table.push('</thead>');
	
	//数据行
	table.push('<tbody>');
	if(columns.constructor== Array ){
		countcolspan=columns.length;
		for(var i =0;i<rows.length;i++){
			var row = rows[i];
			table.push('		<tr>');
			for(var j =0;j<columns.length;j++){
				var align = columns[j].align!=undefined?columns[j].align:'center';
				table.push('		<td align="'+align+'">'+(row[columns[j].column]==undefined?"":row[columns[j].column])+'</td>');
			}
			table.push('		</tr>');
		}
	}
	 
	if(columns.constructor==Object ){
		for(var i =0;i<rows.length;i++){
			var row = rows[i];
			table.push('		<tr>');
			for(var j =0;j<columns.row1.length;j++){
				if(columns.row1[j].rowspan>1){
					var align = columns.row1[j].align!=undefined?columns.row1[j].align:'center';
					table.push('		<td align="'+align+'">'+(row[columns.row1[j].column]==undefined?"":row[columns.row1[j].column])+'</td>');
				}
			}
			for(var j =0;j<columns.row2.length;j++){
				var align = columns.row2[j].align!=undefined?columns.row2[j].align:'center';
				table.push('		<td align="'+align+'">'+(row[columns.row2[j].column]==undefined?"":row[columns.row2[j].column])+'</td>');
			}
			table.push('		</tr>');
		}
		for(var j =0;j<columns.row1.length;j++){
			if(columns.row1[j].rowspan>1){
					countcolspan++
			}
		}
		countcolspan+=columns.row2.length;
		
	}
	table.push('	</tbody>');
	/*
	//页脚 
	html.push('	<tfoot>');
	html.push('		<tr>');
	html.push('			<th width="100%" colspan="5"><b>合计：</b></th>');
	html.push('		</tr>');
	html.push('		<tr>');
	html.push('			<th width="100%" colspan="5">　</th>');
	html.push('		</tr>');
	html.push('		<tr>');
	html.push('			<td width="100%" colspan="5"><b>带格线的每页备注：</b></td>');
	html.push('		</tr>');
	html.push('	</tfoot>');*/
	
	table.push('</table>');
	return table.join('').replace('countcolspan',countcolspan);
}
