/**
 * Created by henq on 2016/5/8.
 */
(function ($) {
    function initChoice(target, cfg) {
        var curVal;
        var panel, name;
        var self = $(target);
        var id = self.prop('id');
        if (id == undefined || id == '') {
            id = guid();
            self.prop('id', id);
        }
        curVal = self.val();
        var opt = $.extend({
            id: id,
            pid: 'jf-panel-' + id,
            sid: 'target-' + id,
            addEmpty: false,
            emptyItem: {text: '&nbsp;', value: ''},
            single: true,
            text: 'text',
            value: 'value',
            data: [],
            defaultIndex: -1,
            url: undefined,
            width: undefined,
            height: undefined,
            empty:false,
            onCheck: undefined,
            onSuccess: undefined
        }, cfg);
        if ($('#' + opt.pid).length == 0) {
            panel = $('<div id="{0}" class="jf-panel"></div>'.format(opt.pid));
            if(typeof(self.attr('name'))=='undefined'){
            	name = self.attr('id');
            }else{
            	name = self.attr('name');
            }
            var choice = $('<input type="hidden" name="{0}" id="{1}" value="{2}">'.format(name, opt.sid, curVal));
            self.attr('readonly', true).addClass('choice').attr('name', name + '_name').after(choice).after(panel);
        } else {
        	$('#' + opt.pid).empty();
            panel = $('#' + opt.pid);
        }
        if (opt.data.length == 0 && opt.url != undefined) {
        	$.ajax({
                url: opt.url,
                type: 'get',
                dataType: "json",
                cache: false,
                success: function (data2) {
                	if (data2 instanceof Array) {
                        opt.data = data2;
                    } else if (data2.rows != undefined) {
                        opt.data = data2.rows;
                    } else if (typeof data2 == 'string') {
                        opt.data = eval(data2);
                    }
                    if(opt.data.length>0){
                    	loadData();
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                	ajaxerror(XMLHttpRequest, textStatus, errorThrown,url,method,param);
                }
            });
        }
        else {
            loadData();
        }/**/
        self.on('click', function (e) {
            self = $(e.target);
            var p = self.offset();
            var width = opt.width || (self.width() + 4);
            var top = (self.height() + 2);
            var h;
            if(opt.height!=undefined){
                h=opt.height+"px";
            }else{
                h='auto';
            }
            $('#' + opt.pid).css({left: p.left + 'px', top: p.top + top + 'px', width: width + 'px',height:h}).show();
        }).on('setVal', function (e, val) {
            setVal(val);
        });
        function setVal(val) {
            setItem(getItem(val));
        };
        function setItem(index) {
            if (index == -1) {
                return;
            }
            var item = {text: opt.data[index][opt.text], value: opt.data[index][opt.value]};
            if (opt.addEmpty && index == 0) {
                if (item.text == '&nbsp;') {
                    item.text = '';
                }
            }
            self.val(item.text);
            if (self.data('valid')) {
                self.validatebox('validate');
            }
            $('#' + opt.sid).val(item.value);
            $('#' + opt.pid).find('li').removeClass('on').eq(index).addClass('on');
            if (opt.onCheck != undefined) {
                opt.onCheck(item, opt.data, index);
            }
            $('#' + opt.pid).hide();
        };

        function getItem(value) {
            var data = opt.data;
            for (var i = 0; i < data.length; i++) {
                var obj = data[i];
                if (obj[opt.value] == value) {
                    return i;
                }
            }
            return -1;
        };
        //点击空白关闭
        $(document).on('click', function (e) {
            if ($(e.target).attr('id') != self.attr('id')) {
                if (!$('#' + opt.pid).find($(e.target)).length > 0) {
                    $('#' + opt.pid).hide();
                }
            }
        });
        function loadData() {
	    	if (opt.addEmpty && opt.data instanceof Array) {
	            var item = $.extend({}, opt.data[0]);
	            item[opt.text] = opt.emptyItem.text;
	            item[opt.value] = opt.emptyItem.value;
	            opt.data.splice(0, 0, item);
	        }
        	/*if(opt.empty){
        		opt.data.unshift(eval('({"'+opt.text+'":"全部","'+opt.value+'":""})')); 
        	}*/
            var data = opt.data;
            var lis = [];
            lis.push('<ul>');
            var i = 0;
            for (; i < data.length; i++) {
                var obj = data[i];
                lis.push('<li value="{0}" title="{1}">{1}</li>'.format(obj[opt.value],obj[opt.text]));
            }
            lis.push('</ul>');
            $('#' + opt.pid).html(lis.join('')).find('li').each(function (index) {
                var li = $(this);
                li.on('click', function () {
                    setItem(index);
                })
            });
            if(curVal!=''){
                setVal(curVal);
            }
            if (curVal == '' && opt.defaultIndex != -1) {
                setItem(opt.defaultIndex);
            }
            if (opt.onSuccess != undefined) {
            	opt.onSuccess();
            }
        }
    }
    $.fn.jfchoice = function (cfg) {
        initChoice(this, cfg);
    }
})(jQuery)