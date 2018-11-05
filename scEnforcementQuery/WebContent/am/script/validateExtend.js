/**
 * 扩展easyui的验证
 */
var rulesConfig = {
    idcard: {// 验证身份证
        validator: function (value) {
            return /^\d{15}(\d{2}[A-Za-z0-9])?$/i.test(value);
        },
        message: '身份证号码格式不正确'
    },
    minLength: {
        validator: function (value, param) {
            return value.length >= param[0];
        },
        message: '请输入至少{0}个字符.'
    },
    len: {
    	validator: function (value, param) {
            var len = 0;
	        for (var i = 0; i < value.length; i++) {
	            var c = value.charCodeAt(i);
	            //单字节加1 
	            if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
	                len++;
	            }
	            else {
	                len += 2;
	            }
	        }
            
            return len >= param[0] && len <= param[1];
        },
        message: "长度必须为：{0}~{1}字符之间({2}个汉字)"
    },
    phone: {// 验证电话号码
        validator: function (value) {
            return /^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/i.test(value);
        },
        message: '格式不正确,请使用下面格式:020-88888888'
    },
    mobile: {// 验证手机号码
        validator: function (value) {
            return /^(13|14|15|17|18|19)\d{9}$/i.test(value);
        },
        message: '手机号码格式不正确'
    },
    currency: {// 验证货币
        validator: function (value) {
            return /^\d+(\.\d+)?$/i.test(value);
        },
        message: '货币格式不正确'
    },
    decimal: {
        validator: function (value, param) {
            var regStr = "^\\d+(\\.\\d+)?$";
            if (param)
                regStr = "^\\+?(\\d*\\.\\d{" + param[0] + "})$";
            var reg = new RegExp(regStr);
            return reg.test(value);
        },
        message: '输入的数据格式不正确'
    },
    double: {// 验证小数
        validator: function (value, param) {
            var pattStr = "^\\d+(\\.\\d+)?$";
            if (param) {
                pattStr = "^\\d+(\\.\\d{0," + param[0] + "})?$";
            }
            return (new RegExp(pattStr)).test(value);
            //如果有参数则验证小数的保留位数,下面是原正则表达式
            //return /^\d+(\.\d+)?$/i.test(value);
        },
        message: '请输入数字，并确保格式正确'
    },
    intOrFloat: {// 验证整数或小数
        validator: function (value, param) {
            var pattStr = "^\\d+(\\.\\d+)?$";
            if (param) {
                pattStr = "^\\d+(\\.\\d{0," + param[0] + "})?$";
            }
            return (new RegExp(pattStr)).test(value);
            //如果有参数则验证小数的保留位数,下面是原正则表达式
            //return /^\d+(\.\d+)?$/i.test(value);
        },
        message: '请输入数字，并确保格式正确'
    },
    int: {// 验证整数
        validator: function (value, param) {
            var pattern = /^[+]?[0-9]+\d*$/i;
            if (param)
                pattern = new RegExp("^[0-9]\d{" + param[0] + "}$");
            return pattern.test(value);
        },
        message: '请输入整数'
    },
    integer: {// 验证整数
        validator: function (value, param) {
            var pattern = /^[+]?[0-9]+\d*$/i;
            if (param)
                pattern = new RegExp("^[0-9]\d{" + param[0] + "}$");
            return pattern.test(value);
        },
        message: '请输入整数'
    },
    rang: {
        validator: function (value, param) {
            var v1 = parseFloat(param[0]), v2 = parseFloat(value), v3 = parseFloat(param[1]);
            if (isNaN(v1) || isNaN(v2) || isNaN(v3)) {
                return false;
            }
            return (v1 <= v2 && v2 <= v3);
        },
        message: '请输入{0}到{1}之间的数字'
    },
    range: {
        validator: function (value, param) {
            var v1 = parseFloat(param[0]), v2 = parseFloat(value), v3 = parseFloat(param[1]);
            if (isNaN(v1) || isNaN(v2) || isNaN(v3)) {
                return false;
            }
            return (v1 <= v2 && v2 <= v3);
        },
        message: '请输入{0}到{1}之间的数字'
    },
//    qq: {// 验证QQ,从10000开始
//        validator: function (value) {
//            return /^[1-9]\d{4,9}$/i.test(value);
//        },
//        message: 'QQ号码格式不正确'
//    },
    age: {// 验证年龄
        validator: function (value) {
            return /^(?:[1-9][0-9]?|1[01][0-9]|120)$/i.test(value);
        },
        message: '年龄必须是0到120之间的整数'
    },
    numberstr: {// 验证数字
        validator: function (value) {
            var pattern = new RegExp("^[0-9]{1,10}$");
            return pattern.test(value);
        },
        message: '只能输入数字，长度为10'
    },
    mn: {// 验证mn
        validator: function (value) {
            //var pattern = new RegExp("^[a-zA-Z0-9]{14}$");
            //return pattern.test(value);
        	return /^[a-zA-Z0-9]{14}$/i.test(value) | /^[a-zA-Z0-9]{24}$/i.test(value);
        },
        message: '只能输入数字和字母，长度为14或24'
    },
    numorpoint: {// 验证数字小数
    	validator: function (value) {
            var reg = /^[\+|-]?[0-9]{1,3}((\,[0-9]{3})*|[0-9]*)(\.[0-9]{0,6})?$/;
            if (reg.test(value)) {
                if (0 <= value &&value<1000000)
                    return true;
                else
                    return false;
            }
        },
        message: '大小范围为：0～999999.999999之间。'
    },
    chinese: {// 验证中文
        validator: function (value, param) {

            var pattern = new RegExp("^[\u4e00-\u9fa5]{" + param[0] + "," + param[1] + "}$");
            return pattern.test(value);
            //return /^[\Α-\￥]+$/i.test(value);
        },
        message: '请输入中文'
    },
    english: {// 验证英语
        validator: function (value) {
            return /^[A-Za-z]+$/i.test(value);
        },
        message: '请输入英文'
    },
    namestr: {//输入内容必须为数字、字母、括号、中文、#号或者下划线
        validator: function (value) {
            return /^[a-zA-Z0-9０-９_\u4E00-\u9FA5\()（）#\-]*$/i.test(value);
        },
        message: '输入内容必须为数字、字母、括号、中文、#号或者下划线'
    },
    aptitudeNum: {//输入内容必须为数字、字母、括号、中文、连接号或者下划线
        validator: function (value) {
            return /^[a-zA-Z0-9０-９_\u4E00-\u9FA5\()（）\-]*$/i.test(value);
        },
        message: '输入内容必须为数字、字母、括号、中文、连接号或者下划线'
    },
    unnormal: {// 验证是否包含空格和非法字符
        validator: function (value) {
            return /.+/i.test(value);
        },
        message: '输入值不能为空和包含其他非法字符'
    },
    username: {// 验证用户名
        validator: function (value) {
            return /^[a-zA-Z][a-zA-Z0-9_]{5,15}$/i.test(value);
        },
        message: '用户名不合法（字母开头，允许6-16字节，允许字母数字下划线）'
    },
    address: {
        validator: function (value) {
            var reg = /^[< >]+$/;
            return !reg.test(value);//匹配是否含有特殊的字符
        },
        message: '只能输入包括汉字、字母、数字、符号'
    },
    faxno: {// 验证传真
        validator: function (value) {
//            return /^[+]{0,1}(\d){1,3}[ ]?([-]?((\d)|[ ]){1,12})+$/i.test(value);
            return /^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/i.test(value);
        },
        message: '传真号码不正确'
    },
    zip: {// 验证邮政编码
        validator: function (value) {
            return /^[0-9]\d{5}$/i.test(value);
        },
        message: '邮政编码格式不正确'
    },
    ip: {// 验证IP地址
        validator: function (value) {
            return /^((\d|\d\d|[0-1]\d\d|2[0-4]\d|25[0-5])\.(\d|\d\d|[0-1]\d\d|2[0-4]\d|25[0-5])\.(\d|\d\d|[0-1]\d\d|2[0-4]\d|25[0-5])\.(\d|\d\d|[0-1]\d\d|2[0-4]\d|25[0-5]))$/i.test(value);
        },
        message: 'IP格式校验'
    },
    name: {// 验证姓名，可以是中文或英文
        validator: function (value) {
            return /^[\Α-\￥]+$/i.test(value) | /^\w+[\w\s]+\w+$/i.test(value);
        },
        message: '请输入姓名'
    },
    date: {// 验证姓名，可以是中文或英文
        validator: function (value) {
            //格式yyyy-MM-dd或yyyy-M-d
            return /^(?:(?!0000)[0-9]{4}([-]?)(?:(?:0?[1-9]|1[0-2])\1(?:0?[1-9]|1[0-9]|2[0-8])|(?:0?[13-9]|1[0-2])\1(?:29|30)|(?:0?[13578]|1[02])\1(?:31))|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)([-]?)0?2\2(?:29))$/i.test(value);
        },
        message: '清输入合适的日期格式'
    },
    msn: {
        validator: function (value) {
            return /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value);
        },
        message: '请输入有效的msn账号(例：abc@hotnail(msn/live).com)'
    },
    equals: {
        validator: function (value, param) {
            if ($("#" + param[0]).val() != "" && value != "") {
                return $("#" + param[0]).val() == value;
            } else {
                return true;
            }
        },
        message: '两次输入的密码不一致！'
    },
    compareDate: {
        validator: function (value, param) {
            return dateCompare($(param[0]).datetimebox('getValue'), value); //注意easyui 时间控制获取值的方式
        },
        message: '开始日期不能大于结束日期'
    },
    linkMan: {
        validator: function (value, param) {
            var pattern = /^[\u4e00-\u9fa5]{2,4}$|^[a-zA-Z]{2,20}$/gi;
            return pattern.test(value);
        },
        message: "请输入2-4个汉字或者20个字母"
    },
    phoneMobile: {//手机或者固话
        validator: function (value, param) {
            var pattern = /(^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$)|(^((\(\d{3}\))|(\d{3}\-))?(1[34578]\d{9})$)/;
            return pattern.test(value);
        },
        message: "请输入固话或者手机号"
    },
    postCode: {
        validator: function (value, param) {
            //var pattern = /^[1-9]\d{5}$/;
            var pattern = /^[0-9]\d{5}$/;
            return pattern.test(value);
        },
        message: "请输入邮编"
    },
    product: {
        validator: function (value, param) {
            var pattern = new RegExp("^([\u4e00-\u9fa5]|[,]|[，]|[“]|[”]|[\"]|[\"]){" + param[0] + "," + param[1] + "}$");
            return pattern.test(value);
        },
        message: "请输入主要产品"
    },
    companyCode: {
        validator: function (value, param) {
            var pattern = new RegExp("[a-zA-Z0-9]{8}-[a-zA-Z0-9]");
            return pattern.test(value);
        },
        message: "请输入组织机构代码证"
    },
    LicenseNumber: {
    	 validator: function (value, param) {
             var pattern = new RegExp("^[0-9a-zA-Z]{9,25}?$");
             return pattern.test(value);
    	 },
    	 message: "输入正确的工商执照号(9到25位数字或字母)"
    },
    CorporationCodeSmall: {
        validator: function (value, param) {
        	//var pattern =/^[0-9a-zA-Z]{8}-[0-9a-zA-Z](\((\d{1,2})\))?$|^[0-9a-zA-Z]{18}?(\((\d{1,2})\))$/;
        	//var pattern = new RegExp("^([A-Za-z0-9]{8}-[A-Za-z0-9]{1})$|^([A-Za-z0-9]{8}-(\\(|()[0-9]{1,2}(\\)|)))$|^([A-Za-z0-9]{8}-[A-Za-z0-9]{1}(\\(|()[0-9]{1,2}(\\)|)))$|[a-zA-z0-9]{2}[0-9]{6}[a-zA-z0-9]{10}$|^[a-zA-z0-9]{2}[0-9]{6}[a-zA-z0-9]{10}(\\(|()[0-9]{1,2}(\\)|)))");
            //修改这里这个是正则表达式。完了不用重启，直接刷新浏览器即可。
        	var pattern=/^([A-Za-z0-9]{8}-[A-Za-z0-9]{1})$|^([A-Za-z0-9]{8}-(\(|（)[0-9]{1,2}(\)|）))$|^([A-Za-z0-9]{8}-[A-Za-z0-9]{1}(\(|（)[0-9]{1,2}(\)|）))$|[a-zA-z0-9]{2}[0-9]{6}[a-zA-z0-9]{10}$|^[a-zA-z0-9]{2}[0-9]{6}[a-zA-z0-9]{10}(\(|（)[0-9]{1,2}(\)|）)$/;
        	return pattern.test(value);
        },
        message: "输入正确的法人代码或社会信用代码"
    },
    flEmpty: {
        validator: function (value, param) {
            /* var reg = /^[ ]|[ ]$/gi;
             return !reg.test(value);*/
            //return !(/^\s+|\s+$/.test(value));
            return true;
        },
        message: "首尾不能有空格"
    },
    timeDiff: {//时间范围验证
        validator: function (value, param) {
            //validType:'timeDiff[]'
            if (param != undefined && param.length == 2) {
                try {
                    var d1 = null,
                        date = new Date(value.replace(/-/g, "/")),
                        d3 = null;
                    if (param[0] == 0) {//第一个参数=0 那么必须小于等于第二个参数

                        d3 = new Date(param[1].replace(/-/g, "/"));

                        rulesConfig.timeDiff.message = "您选择的时间必须大于等于{1}。";
                        return (date <= d3);
                    } else if (param[1] == 0) {//第二个参数=0 那么必须大于等于第一个参数

                        d1 = new Date(param[0].replace(/-/g, "/"));

                        rulesConfig.timeDiff.message = "您选择的时间必须大于等于{0}。";
                        return (date >= d1);
                    } else {
                        d1 = new Date(param[0].replace(/-/g, "/"));
                        d3 = new Date(param[1].replace(/-/g, "/"));
                        rulesConfig.timeDiff.message = "您选择的时间必须在{0}和{1}之间。";
                        return d1 <= date && date <= d2
                    }
                } catch (e) {
                    rulesConfig.timeDiff.message = "您选择的时间不正确。";
                    return false;

                }

                return false;
            }
            return true;
        },
        message: "时间范围选择有误{0}{1}"
    },
    less: {
        //验证当前项小于等于前几项的差
        validator: function (value, param) {
            if (param.length > 1) {
                //验证当前项小于等于前几项的差
                var total = 0;

                $.each(param, function (k, p) {
                    if (k == 0) {
                        total = Number($(p).val());
                    } else {
                        total = total - Number($(p).val());
                    }
                });
                return (total - Number(value)) > 0;
            }
            return Number(value) < Number($(param[0]).val());
        },
        message: "填写的数值必须小于{0}"
    },
    lessXx: {
        //验证当前项小于等于前项
        validator: function (value, param) {
            if($(param[0]).val().indexOf('-')>-1){
                var val=$(param[0]).val().split('-');
                return Number(value) < Number(val[0]);
            }
            return Number(value) < Number($(param[0]).val());
        },
        message: "填写的数值必须小于{1}"
    },
    dtparmertMax: {
        //验证当前项小于等于前项
        validator: function (value, param) {
        	if(Number($(param).val())<Number(value)){
                return true;
             }else{
               return false;
             }
        },
        message: "填写的数值必须小于正常上限"
    },
    dtparmertsMin: {
        //验证当前项小于等于前项
        validator: function (value, param) {
            if(Number($(param).val())>Number(value)){
               return true;
            }else{
              return false;
            }
             
        },
        message: "填写的数值必须大于正常下限"
    },
    moreXx: {
        //验证当前项小于等于前项
        validator: function (value, param) {
            if($(param[0]).val().indexOf('-')>-1){
                var val=$(param[0]).val().split('-');
                return Number(value) > Number(val[1]);
            }
            return Number(value) > Number($(param[0]).val());
        },
        message: "填写的数值必须大于{1}"
    },
    lessEq: {
        //验证当前项小于等于前几项的差
        validator: function (value, param) {
            if (param.length > 1) {
                //验证当前项小于等于前几项的差
                var total = 0;

                $.each(param, function (k, p) {
                    if (k == 0) {
                        total = Number($(p).val());
                    } else {
                        total = total - Number($(p).val());
                    }
                });
                return (total - Number(value)) >= 0;
            }
            return Number(value) <= Number($(param[0]).val());
        },
        message: "填写的数值必须小于{0}"
    },
    lessSum: {
        //验证当前项小于等于前几项的合
        validator: function (value, param) {
            if (param.length > 1) {
                //验证一项大于等其他几项
                var total = 0;

                $.each(param, function (k, p) {
                    total += Number($(p).val());
                });
                return Number(value) <= total;
            }
            return Number(value) <= Number($(param[0]).val());
        },
        message: "填写的数值必须小于{0}"
    },
    md: {
        validator: function (value, param) {
            var startTime2 = $(param[0]).datebox('getValue');
            var d1 = $.fn.datebox.defaults.parser(startTime2);
            var d2 = $.fn.datebox.defaults.parser(value);
            if (param[1] == 1)
                return d2 >= d1;
            return d2 > d1;

        },
        message: '结束时间要大于开始时间！'
    },
    code: {
        validator: function (value, param) {
            var reg = new RegExp("<.*?script[^>]*?>.*?(<\/.*?script.*?>)*", "ig");
            return !reg.test(value);
        },
        message: "您输入了非法危险字符"
    },
    bfbNum: {//百分比 只允许输入0或者1-100之间的数字
        validator: function (value, param) {
            if (param == undefined)
                param = [2];
            //先验证是否是浮点型
            if (rulesConfig.intOrFloat.validator(value, param)) {
                var n = parseFloat(value);
                if (n == 0 || (1 <= n && n <= 100))
                    return true;
                else
                    return false;
            }
            return false;
        },
        message: "请输入0或者1-100之间的数字"
    },
    mstEmpty: {
        validator: function (value, param) {
            //验证必须为空
            return value == "";
        },
        message: "不能输入"
    },
    longitude:{
    	validator: function (value) {
    		 var reg = /^((\d|[1-9]\d|1[0-7]\d)[°](\d|[0-5]\d)[′](\d|[0-5]\d)(\.\d{1,2})?[\″]?[E]|[W]$)|(180[°]0[′]0[\″]?[E]|[W]$)/;
            return !reg.test(value);
        },
        message: "不能大于180°或小于180°"
    },
    latitude:{
    	validator: function (value) {
    		 var reg = /^((\d|[1-8]\d)[°](\d|[0-5]\d)[′](\d|[0-5]\d)(\.\d{1,2})?[\″]?[N]|[S]$)|(90[°]0[′]0[\″]?[N]|[S]$)/;
            return !reg.test(value);
        },
        message: "不能大于90°或小于90°"
    },
    equipname: {//输入数字、字母、中文或者下划线
        validator: function (value) {
            return /^[a-zA-Z0-9０-９_\u4E00-\u9FA5]*$/i.test(value);
        },
        message: '输入数字、字母、中文或者下划线。'
    },
    equiptype: {//输入内容必须为数字、字母、括号、中文、#号或者下划线
        validator: function (value) {
            return /^[a-zA-Z0-9０-９_\u4E00-\u9FA5-]*$/i.test(value);
        },
        message: '输入数字、字母、中文、减号或者下划线。'
    },
    doubleLength: {// 小数位数
        validator: function (value) {
            var reg = /^[\+|-]?[0-9]{1,3}((\,[0-9]{3})*|[0-9]*)(\.[0-9]{0,6})?$/;
            if (reg.test(value)) {
                if (0 <= value && value <= 1000)
                    return true;
                else
                    return false;
            }
        },
        message: '只能输入数字(0-1000)，最多只能含6位小数'
    },
    treatCapacity: {
        validator: function (value, param) {
            var v1 = parseFloat(param[0]), v2 = parseFloat(value), v3 = parseFloat(param[1]);
            if (isNaN(v1) || isNaN(v2) || isNaN(v3)) {
                return false;
            }
            return (v1 <= v2 && v2 <= v3);
        },
        message: '大小范围为：{0}～{1}之间'
    },
    naturalNum: {// 验证整数包含0
        validator: function (value) {
            if (/^[0-9]+$/.test( value ) && (value >= 0))
            {
            	if (0 <= value && value <= 9)
            		return true;
            	else 
            		return false;
            }
            else
            {
                return false;
            }
        },
        message: '必须输入0-9的自然数'
    },
    regrange: {//只能输入数字，最多只能含6位小数
        validator: function (value) {
            var reg = /^[\+|-]?[0-9]{1,3}((\,[0-9]{3})*|[0-9]*)(\.[0-9]{0,6})?$/;
            if (reg.test(value)) {
               /* if (0 <= value )
                    return true;
                else
                    return false;*/
            	return true;
            }
        },
        message: '只能输入数字，最多只能含6位小数。'
    },
    strLength: {//字符串长度
        validator: function (value, param) {
            var len = 0;
            for (var i = 0; i < value.length; i++) {
                var c = value.charCodeAt(i);
                //单字节加1
                if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
                    len++;
                }
                else {
                    len += 2;
                }
            }

            return len >= param[0] && len <= param[1];
        },
        message: "输入文本{0}-{1}字符"
    },
    integerRange: {// 验证整数
        validator: function (value, param) {
            var pattern = /^[+]?[0-9]+\d*$/i;
            if (pattern.test( value ) && (value >= param[0]) && (value <= param[1]))
            {
                return true;
            }
            else
            {
                return false;
            }
        },
        message: '输入整数（大小范围在{0}~{1}之间）'
    },
    zilishs: {// 验证整数
        validator: function (value, param) {
            var pattern = /^[+]?[0-9]+\d*$/i;
            if (pattern.test( value ) && (value >= param[0]) && (value <= param[1]))
            {
                return true;
            }
            else
            {
                return false;
            }
        },
        message: '请输入0到9之间的数字'
    },
    intNum: {// 验证整数包含0
        validator: function (value) {
            if (/^[0-9]+$/.test( value ) && (value >= 0))
            {
                return true;
            }
            else
            {
                return false;
            }
        },
        message: '只能输入正整数'
    },
    lenStr: {
    	validator: function (value, param) {
            var len = 0;
	        for (var i = 0; i < value.length; i++) {
	            var c = value.charCodeAt(i);
	            //单字节加1 
	            if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
	                len++;
	            }
	            else {
	                len += 2;
	            }
	        }
            
            return len >= param[0] && len <= param[1];
        },
        message: "长度必须为：{0}~{1}字符之间"
    },
    Latitude_du:{
    	validator: function (value) {
    		var reg = /^([1-8][0-9]|[0]?[0-9]{1})$/;
    		if(reg.test(value)){
    			if(value<4||value>53){
    				return false;
    			}
    		}
            return reg.test(value);
        },
        message: "度必须为0(包含0)~90之间的整数"
    },
    Latitude_fen:{
    	validator: function (value) {
    		 var reg = /^([0-9]|[0-5][0-9])$/;
            return reg.test(value);
        },
        message: "分必须为0(包含0)~60之间的整数"
    },
    Latitude_miao:{
    	validator: function (value) {
    		var reg = /^([0-9]|[0-5][0-9])(\.[0-9]{0,2})?$/;
            return reg.test(value);
        },
        message: "秒必须为0(包含0)~60之间的整数或2位小数"
    },
    // data-tip="所输入经度不在中国陆地范围内（东经73度40分0秒~东经135度2分30秒）"
    Longitude_du:{
    	validator: function (value) {
    		var reg = /^(1[0-7][0-9]|[0]?[0-9]{1,2})$/;
    		if(reg.test(value)){
    			if(value<73||value>135){
    				return false;
    			}
    		}
            return reg.test(value);
        },
        message: "度必须为0(包含0)~180之间的整数"
    },
    Longitude_fen:{
    	validator: function (value) {
    		 var reg = /^([0-9]|[0-5][0-9])$/;
            return reg.test(value);
        },
        message: "分必须为0(包含0)~60之间的整数"
    },
    Longitude_miao:{
    	validator: function (value) {
    		var reg = /^([0-9]|[0-5][0-9])(\.[0-9]{0,2})?$/;
            return reg.test(value);
        },
        message: "秒必须为0(包含0)~60之间的整数或2位小数"
    },
    phoutlutStandard: {
        validator: function (value) {
           if(value.indexOf('-')>-1){
               var val=value.split('-');
               var reg = /^\d{1,2}$/;
               if(reg.test(val[0]) && reg.test(val[1])){
            	   var ph1=val[0]*1;
                   var ph2=val[1]*1;
                   if ((0 <=ph1 && ph1<=14)&&(0 <= ph2 && ph2<=14)&& ph1<=ph2) 
                	   return true;
                   else
                       return false;
               } 
               /*var reg = /^[\+|-]?[0-9]{1,3}((\,[0-9]{3})*|[0-9]*)(\.[0-9]{0,6})?$/;
               if (reg.test(val[0])&&reg.test(val[1])) {
                   if ((0 <=val[0] &&val[0]<=14)&&(0 <= val[1] &&val[1]<=14)&&val[0]<=val[1])
                       return true;
                   else
                       return false;
               }*/
           }
           return false;
        },
        message: "大小范围为：0~14之间(格式：6-9或0-12)"
    },
    phreg: {
        validator: function (value) {
            if (0 <= value &&value<=14)
                return true;
            else
                return false;
        },
        message: "大小范围为：0~14之间"
    },
    outletdiameter: {// 小数位数
        validator: function (value,param) {
            var reg = /^[\+|-]?[0-9]{1,3}((\,[0-9]{3})*|[0-9]*)(\.[0-9]{0,6})?$/;
            if (reg.test(value)) {
                if (value >= param[0] && value <= param[1])
                    return true;
                else
                    return false;
            }
        },
        message: '只能输入数字({0}-{1})，最多只能含6位小数.'
    },
    codLessXx: {
        //验证当前项小于等于前项
        validator: function (value, param) {
            var val=Number(value);
        	var summerVal=Number($(param[0]).val());
        	var winterVal=Number($(param[1]).val());
        	if((val<summerVal)&&(val<winterVal))
        		return true;
        	return false;
        },
        message: "填写的数值必须小于{2}"
    },
    codMoreXx: {
        //验证当前项小于等于前项
        validator: function (value, param) {
        	var val=Number(value);
        	var summerVal=Number($(param[0]).val());
        	var winterVal=Number($(param[1]).val());
        	if((val>summerVal)&&(val>winterVal))
        		return true;
        	return false;
        },
        message: "填写的数值必须大于{2}"
    },
    lenMax: {
        validator: function (value) {
            var len = 0;
            for (var i = 0; i < value.length; i++) {
                var c = value.charCodeAt(i);
                //单字节加1
                if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
                    len++;
                }
                else {
                    len += 2;
                }
            }

            return len <= 50;
        },
        message: "字符50以内"
    },
    dataroundLen: {// 小数位数
        validator: function (value,param) {
            var reg = /^[\+|-]?[0-9]{1,3}((\,[0-9]{3})*|[0-9]*)(\.[0-9]{0,6})?$/;
            if (reg.test(value)) {
                if (param[0] <= value && value <= param[1])
                    return true;
                else
                    return false;
            }
        },
        message: '只能输入数字({0}-{1})，最多只能含6位小数'
    },
    dataroundLenddt: {// 小数位数(用于动态管控)
        validator: function (value,param) {
            var reg = /^[\+|-]?[0-9]{1,3}((\,[0-9]{3})*|[0-9]*)(\.[0-9]{0,5})?$/;
            if (reg.test(value)) {
                if (param[0] <= value && value <= param[1])
                    return true;
                else
                    return false;
            }
        },
        message: '只能输入数字({0}-{1})，最多只能含5位小数'
    }
};


$.extend($.fn.validatebox.defaults.rules, rulesConfig);


var errconfig = {
    lenEmpty: function () {
        //必填非空且有长度限制的
        return "请输入{0}个以内的长度（包括汉字、字母、数字、空格、符号）".format(arguments[0]);
    },
    rangeFloat: function () {
        if (arguments.length == 0)
            "请输入数字，有小数保留{0}位".format(arguments[0]);
        //浮点型必填提示
        return "请输入{0}-{1}之间的数字，有小数保留{2}位".format(arguments[0], arguments[1], (arguments[2] == undefined ? 2 : arguments[2]));
    },
    rangeInteger: function () {
        //整形范围必填提示
        return "请输入{0}-{1}以内的整数".format(arguments[0], arguments[1]);
    },
    Integer: "请输入整数",
    phoneMobile: "请输入联系方式(手机或者固话)",
    comboMsg: function () {
        //选择下拉框
        return "请您选择一项{0}。".format(arguments[0]);
    },
    datebox: function () {
        //时间控件必选提示
        return "请您选择{0}。".format(arguments[0]);
    },
    tipMsg: function () {
        //普通的必填提示
        return "请输入{0}".format(arguments[0])
    },
    listGtValMsg: function () {
        //列表数据超过了规定的值
        return "{0}列表中的有效数据超过了{1}填写的<font color='red' size='+2'>{2}</font>,请您核对数据后再保存。".format(arguments[0], arguments[1], arguments[2])
    },
    bfbNum: function () {
        //百分比
        if (arguments.length == 0)
            return "请输入0或者1-100之间的数字,有小数保留两位。";
        return "请输入0或者1-100之间的数字,有小数保留{0}位。".format(arguments[0]);
    }
    
   
}
