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
            'static/am/vendor/easyui/jquery.js',
            'static/am/vendor/easyui/jquery.ui.js',
            'static/am/vendor/json2.js',
            'static/am/vendor/jquery/jquery.deserialize.js',
            'static/am/vendor/jquery/jquery.serialize-object.min.js',
            'static/am/vendor/jquery/unslider.min.js',
            'static/am/vendor/jquery/jquery.mousewheel.min.js',
            'static/am/vendor/jquery/jquery.animation.easing.js',
            'static/am/vendor/easyui/ui-lang-zh_CN.js',
            'static/am/script/until.js',
            'static/am/script/action.js',
            'static/am/script/jf-tree.js',
            'static/am/script/bookmark.js',
            'static/am/script/jf-tree.js',
            'static/am/script/tabboxs.js',
            'static/am/script/common.js'
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
                    document.writeln("<script src='" + p + "' ><\/script>");
                } else { //异步加载css文件
                    loader.loadcss(p);
                }
            }
        }
    };
    //加载js脚本
    loader.run();
})();
function loadDesktop(userRegionCode,userRegionName){
    $.get(baseUrl('static/am/data/desktop.json')).done(function(data){
        //获取登录用户的行政区划
    	{
    		  data[0].items[3].note='传输有效率-'+userRegionName;
    	      data[0].items[3].data.title='传输有效率-'+userRegionName;
    	      data[0].items[4].data.content=userRegionName;
    	}
    	
    	
        var place=$('#place');
        var fires=[];
        for (var i = 0; i < data.length; i++) {
            var row = data[i];
            var li=$('<li id="li-{0}"></li>'.format(row.id));
            //var head=$('<div class="desktop-head">{0}</div>'.format(row.title));
            var head=$('<div class="desktop-head"></div>');
            var body=$('<div class="desktop-body"></div>');
            for (var j = 0; j < row.items.length; j++) {
                var item = row.items[j];
                if(item.data.url.indexOf('http://')==-1){
                    item.data.url=baseUrl(item.data.url);
                }
                item.data.icon=baseUrl('static/am/themes/default/')+item.data.icon;
                var book=new BookMark(item);
                body.append(book.html());
                fires.push(book);
            }
            li.append(head).append(body).appendTo(place);
        }
        for(t in fires){
            fires[t].bind();
        }
        loadAnimate();
    }).fail(function(e){
        jf.confirm('出错了', e.status);
    });
    function loadAnimate(){
        var slidey = slidey || {};
        var slide = $('#desktop').unslider({
            speed: 500,               //  滚动速度
            delay: false,              //  动画延迟
            complete: function () {
            },  //  动画完成的回调函数
            keys: true,               //  启动键盘导航
            dots: true,               //  显示点导航
            fluid: false              //  支持响应式设计
        });
        slidey = slide.data('unslider');
        $(document).mousewheel(function (event, delta) {
            if (delta > 0 && animDone) {
                slidey.prev();
            }
            else if (delta < 0 && animDone) {
                slidey.next();
            }
            event.preventDefault();
        });
        var myar = setInterval(function () {
            $('.bookmark-content').animate({ marginLeft: 30 });
            $('.bookmark-content').animate({ marginLeft: 0 });
            var firstLi = $('.bookmark-items>li:first');
            $('.bookmark-items').append(firstLi);
            firstLi.remove();
        }, 3000);
        
         
        
    }
}


function JqAjax_Index(url, method, param, callback) {
    $.ajax({
        url: url,
        type: method,
        data: param,
        dataType: "json",
        cache: false,
        global: false,
        success: function (data) {
        	if (typeof callback == "function") {
                callback.call(this, data);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
        	return;
        }
    });
}