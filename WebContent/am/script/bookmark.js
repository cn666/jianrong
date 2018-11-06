/**
 * Created by henq on 2016/6/2.
 */

    var themes=[
        {id:0,css:'bmt-0 bg-orange',title:1,content:1,icon:1,items:0},
        {id:1,css:'bmt-1 bg-green',title:1,content:0,icon:1,items:0},
        {id:2,css:'bmt-2 bg-blue',title:1,content:0,icon:1,items:0},
        {id:3,css:'bmt-0 bg-purple',title:1,content:1,icon:1,items:0},
        {id:4,css:'bmt-3 bg-Bblue',title:1,content:1,icon:1,items:1},
        {id:5,css:'bmt-3 bg-Bgreen',title:1,content:1,icon:1,items:1},
        {id:6,css:'bmt-2 bg-yellow',title:1,content:0,icon:1,items:0},
        {id:7,css:'bmt-2 bg-yellow',title:1,content:0,icon:1,items:0}
    ];
    function BookMark(item){
        var theme=themes[item.theme];
        this.data=item.data;
        var id='bookmark-'+item.id;
        this.html=function(){
            var html='';
            html+=('<div id="{0}" class="bookmark {1}">'.format(id,theme.css));
            theme.title&&(html+='<div class="bookmark-title"></div>');
            theme.content&&(html+='<div class="bookmark-content"></div>');
            theme.icon&&(html+='<img src="images/m-icon1.png" class="bookmark-icon"/>');
            theme.items&&(html+='<ul class="bookmark-items"></ul>');
            html+='<div class="bookmark-cover">加载中..</div></div>';
            return html;
        };
        this.bind=function(){
            if(item.data==undefined||typeof  item.data!='object'){
                $.get(item.url).done(function(res){
                    _bind(res);
                }).fail(function(){
                    $('.bookmark-cover','#'+id).text('加载失败..');
                })
            }else{
                _bind(item.data);
            }
        }
        function _bind(data){
            theme.title&&$('.bookmark-title','#'+id).html(data.title);
            theme.content&&$('.bookmark-content','#'+id).html(data.content);
            theme.icon&&$('.bookmark-icon','#'+id).attr('src',data.icon)
            if(theme.items){
                if(data.items instanceof Array){
                    var html='';
                    var i = 0,len=data.items.length;
                    for (; i < len; i++) {
                        html+='<li>{0}</li>'.format(data.items[i].title);
                    }
                    $('.bookmark-items','#'+id).html(html);
                }
            }
            $('.bookmark-cover','#'+id).empty().unbind( "click" ).on('click',function(){
                TabBoxs.addTab(data.title,data.url);
            });
        }
    }
