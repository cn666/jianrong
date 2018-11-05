//easyui公共样式更改--begin--
$(function () {
   // $('.ui-validatebox').css({"width":"196","height":"29"});
   // $('.ui-numberbox').css({"width":"196","height":"29","border":"1px solid #D3D3D3"});
   // $('.calendar').css({"width":"230","height":"245"});/!*--单个日历-整体宽、高--*!/
   // $('.calendar-body').css({"height":"200"});/!*--单个日历-日期内容高度--*!/
   // $('.datebox-calendar-inner ').parent().removeClass('combo-panel').removeClass('panel-body ').width(230).addClass('datePanel');//下拉日历宽度
   // $('.combo-p').removeClass('panel');/!*--下拉面板-添加阴影--*!/


    $('.comboBox').combobox({
        height: 32
    });

    $('.combo-panel').css({"cursor":"pointer"});

});
//easyui公共样式更改--end--

//客户端分页
function pagerFilter(data){
	if (typeof data.length == 'number' && typeof data.splice == 'function'){    // 判断数据是否是数组
		data = {
            total: data.length,
            rows: data
        }
    }else{
    	data=data
    }
    var dg = $(this);
    var opts = dg.datagrid('options');
    var pager = dg.datagrid('getPager');
    pager.pagination({
        onSelectPage:function(pageNum, pageSize){
        	pager.pagination('loading');
            opts.pageNumber = pageNum;
            opts.pageSize = pageSize;
            pager.pagination('refresh',{
                pageNumber:pageNum,
                pageSize:pageSize
            });
            dg.datagrid('loadData',data);
            pager.pagination('loaded');
        }
    });
    if (!data.originalRows){
    	data.originalRows = (data.rows);
    }
    var start = (opts.pageNumber-1)*parseInt(opts.pageSize);
    var end = start + parseInt(opts.pageSize);
    data.rows = (data.originalRows.slice(start, end));
    return data;
}