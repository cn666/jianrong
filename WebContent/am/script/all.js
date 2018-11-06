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
            'WebContent/am/vendor/easyui/jquery.js',
            'WebContent/am/vendor/easyui/jquery.ui.js',
            'WebContent/am/vendor/jquery.json-2.2.min.js',
           // 'static/am/vendor/jquery/jquery.deserialize.js',
           // 'static/am/vendor/jquery/jquery.serialize-object.min.js',
          'am/vendor/jquery/jquery.autocompleter.min.js',
            'am/vendor/easyui/ui-lang-zh_CN.js',
           // 'static/am/vendor/my97datepicker/WdatePicker.js',
            'WebContent/am/script/until.js',
            'WebContent/am/script/action.js',
            'WebContent/am/script/jf-doubledate.js',
            'WebContent/am/script/jf-doubletime.js',
            'WebContent/am/script/jf-industry.js',
            'WebContent/am/script/jf-industrytree.js',
            'WebContent/am/script/jf-choice.js',
            'WebContent/am/script/jf-region.js',
            'WebContent/am/script/jf-date.js',
            'WebContent/am/script/jf-valley.js',
            'WebContent/am/script/bookmark.js',
            'WebContent/am/script/jf-form.js',
            'WebContent/am/script/validateExtend.js',
            'WebContent/am/script/common.js',
            'WebContent/am/script/easyui-patch.js',
            'WebContent/am/script/jf-dateformat.js',
            'WebContent/am/script/jf-autocomplete.js'
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