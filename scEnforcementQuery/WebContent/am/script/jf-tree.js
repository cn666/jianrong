/**
 * Created by henq on 2016/6/10.
 */
(function($){
    function init(target,cfg){
         var opt= $.extend({
            url:undefined,
            data:undefined,
            treeData:undefined,
            id:'id',
            pid:'pid',
            text:'text',
            fid:'-99',
            icon:'',
            img:'img',
            lays:0,
            async:false,
            onShow:undefined,
            onCheck:undefined
        },cfg);
        var  self=$(target);
        if(opt.treeData==undefined){
            if(opt.data==undefined){
                $.get(opt.url).done(function(d){
                    if(opt.fid=='-99'){
                        opt.treeData==d;
                    }else{
                        opt.data=d;
                        opt.treeData=fn(d,opt.fid);
                    }
                    loadTree(opt.treeData);
                })
            }else{
                opt.treeData=fn(opt.data,opt.fid);
                loadTree(opt.treeData);
            }
        }else{
            loadTree(opt.treeData);
        };
        function loadTree(data){
            var tree=initTree(data);
            tree.addClass('jf-menu');
            self.append(tree);
        }
        function initTree(data){
            var ul=$('<ul></ul>');
            var len = data.length;
            for (var i = 0; i < len; i++) {
                var obj = data[i];
                var flag=obj.hasOwnProperty('children')&&obj.children.length>0;
                var li=$('<li></li>');
                li.data('node',obj);
                if(flag){
                    li.addClass('opend');
                    var item=$('<span class="child"></span>');
                    li.append(item);
                    item.on('click',function(){
                        var span=$(this).parent();
                        span.attr('class',span.attr('class')=='opend'?'closed':'opend');
                        if(opt.onShow!=undefined){
                            opt.onShow(span.data('node'));
                        }
                    });
                }
                var a=$('<a><img src="{0}" class="img"/>{1}</a>'.format(obj[opt.img],obj[opt.text]));
                a.data('node',obj);
                a.on('click',function(){
                    var a=$(this).parent();
                    if(a.data('node').hasOwnProperty('children')&&a.data('node').children.length>0){
                        a.attr('class',a.attr('class')=='opend'?'closed':'opend');
                    }
                    if(opt.onCheck!=undefined){
                        opt.onCheck(a.data('node'),a);
                    }
                });
                li.append(a);
                if(flag){
                    li.append(initTree(obj.children));
                }
                ul.append(li);
            }
            return ul;
        }
        function fn(data,pid){
            var result = [] , temp;
            for(var i in data){
                if(data[i][opt.pid]==pid){
                    result.push(data[i]);
                    temp = fn(data,data[i][opt.id]);
                    if(temp.length>0){
                        data[i].children=temp;
                        data[i].state='closed'
                    }
                }
            }
            return result;
        }
    }
    $.fn.jfTree=function(config){
        init(this,config);
    }
})(jQuery);