/**
 * Created by henq on 2016/6/11.
 */
var windowWidth = $(window).width();
var windowHeight = $(window).height();

var wrapperPos = 1; //当前桌面索引
var animDone = true;//动画是否完成
//Tabs控件
var TabBoxs={
    boxs:[],
    menuId:'',
    contentId:'',
    author:'henq',
    addTab:function(title,url){
        var box={title:title,url:url};
        var cur=findOne(this.boxs,'u.title=="{0}"&&u.url=="{1}"'.format(title,url));
        if(cur==undefined){
            this._initBox(box);
        }else {
            this.setTab(cur.id);
        }
    },
    setTab : function(id){
        $('#tabBoxMenus span').removeClass('on');
        $('#tabBoxContents .tab-box-content').removeClass('on');
        $('#cid'+id).addClass('on');
        $('#mid'+id).addClass('on');
    },
    closeTab:function(id){
        $('#mid'+id).remove();
        $('#cid'+id).remove();
        $('#aid'+id).remove();
        findDelete(this.boxs,'u.id=="{0}"'.format(id));
    },
    _initBox:function(box){
        box.id='-'+guid();
        box.mid='mid'+box.id;
        box.cid='cid'+box.id;
        box.menu=$('<span id="{0}">{1}<a class="close"></a></span>'.format(box.mid,box.title));
        box.content=$('<div id="{0}" class="tab-box-content"><iframe scrolling="auto" frameborder="0" class="frameBox"  src="{1}"></iframe></div>'.format(box.cid,box.url));
        TabBoxs.boxs.push(box);
        var allTab=$('#menuAll'),contents=$('#tabBoxContents');
        allTab.before(box.menu);
        box.menu.on('click',function(){
            TabBoxs.setTab(box.id);
        });
        box.menu.find('a.close').on('click',function(){
            TabBoxs.closeTab(box.id);
        });
        contents.append(box.content);
        var tab=$('<a id="aid{0}">{1}</a>'.format(box.id,box.title));
        tab.on('click',function(){
            TabBoxs.setTab(box.id);
        }).appendTo('#tabMenus');
        TabBoxs.setTab(box.id);
    }
};