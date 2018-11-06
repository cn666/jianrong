/**
 * Created by henq on /4/.
 */
var jf = {};
function baseUrl(url){
/*    if(Actions!=undefined&&Actions.baseUrl!=''){
        return Actions.baseUrl;
    }*/
    //获取当前网址，如： http://localhost:8083/test.aspx
    var curWwwPath=window.document.location.href;
    console.log(curWwwPath)
    //获取主机地址之后的目录，如： uimcardprj/share/meun.jsp
    var pathName=window.document.location.pathname;
    var pos=curWwwPath.indexOf(pathName);
    //获取主机地址，如： http://localhost:8083
    var localhostPaht=curWwwPath.substring(0,pos);
    //获取带"/"的项目名，如：/uimcardprj
    var projectName=pathName.substring(0,pathName.substr(1).indexOf('/')+1);
    return (localhostPaht +projectName+'/')+url;
}

(function () {
    var loader = {
        base: baseUrl(''),
        ver: new Date(),
        content: [ //定义需要加载的脚本
            'am/vendor/easyui/jquery.js',
            'am/vendor/easyui/jquery.ui.js',
            'am/vendor/jquery.json-2.2.min.js',
           // 'static/am/vendor/jquery/jquery.deserialize.js',
           // 'static/am/vendor/jquery/jquery.serialize-object.min.js',
          'am/vendor/jquery/jquery.autocompleter.min.js',
            'am/vendor/easyui/ui-lang-zh_CN.js',
           // 'static/am/vendor/my97datepicker/WdatePicker.js',
            'am/script/until.js',
            'am/script/action.js',
            'am/script/jf-doubledate.js',
            'am/script/jf-doubletime.js',
            'am/script/jf-industry.js',
            'am/script/jf-industrytree.js',
            'am/script/jf-choice.js',
            'am/script/jf-region.js',
            'am/script/jf-date.js',
            'am/script/jf-valley.js',
            'am/script/bookmark.js',
            'am/script/jf-form.js',
            'am/script/validateExtend.js',
            'am/script/common.js',
            'am/script/easyui-patch.js',
            'am/script/jf-dateformat.js',
            'am/script/jf-autocomplete.js'
        ],
        loadcss: function (cssUrl) {
            var link = document.createElement("link");
            link.rel = "stylesheet";
            link.type = "text/css";
            link.href = cssUrl;
            document.getElementsByTagName("head")[0].appendChild(link);
        },
        run: function () {
            for (var i in loader.content) {
                var c = loader.content[i];
                if (c.length <= 2) continue;
                var p = loader.base + c; //+ "?v=" + Math.random();
                var type = c.substr(c.length - 2, c.length);
                if (type === 'js') { //同步加载js文件
                    document.writeln("<script  src='" + p + "' ><\/script>");
                } else { //异步加载css文件
                    loader.loadcss(p);
                }
            }
        }
    };
    //加载js脚本
    loader.run();
})();