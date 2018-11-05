/**
 * Created by Henq on 2016/5/16.
 * Edit by Henq on 2016/5/26.
 */
var Psinfo={};
var draw;
(function(){
    var psConfig={
        space: { x: 180, y: 140 ,pandding:30,left:10,top:9},
        menu:{},
        menuOn:{ps:'<div class="mi"><i></i><a onclick="opt(\'{1}\',\'edit\',\'{0}\')"><span class="icon-menu menu-info"></span>基本信息</a></div>'
            ,output:'<div class="mi"><i></i><a onclick="opt(\'{1}\',\'edit\',\'{0}\')"><span class="icon-menu menu-info"></span>基本信息</a></div>'
            ,mp:'<div class="mi"><i></i><a onclick="opt(\'{1}\',\'edit\',\'{0}\')"><span class="icon-menu menu-info"></span>监控点基本信息</a><a        onclick="opt(\'{1}\',\'editdgi\',\'{0}\')"><span class="icon-menu menu-data"></span>数采仪基本信息</a><a        onclick="opt(\'{1}\',\'addmdi\',\'{0}\')"><span class="icon-menu menu-add-r"></span>增加监测仪器</a></div>'
            ,equ:'<div class="mi"><i></i><a onclick="opt(\'{1}\',\'edit\',\'{0}\')"><span class="icon-menu menu-info"></span>基本信息</a><a        onclick="opt(\'{1}\',\'move\',\'{0}\')"><span class="icon-menu menu-edit"></span>更改安装位置</a><a onclick="opt(\'{1}\',\'delete\',\'{0}\')"><span class="icon-menu menu-delete"></span>删除</a></div>'
            ,pte:'<div class="mi"><i></i><a onclick="opt(\'{1}\',\'edit\',\'{0}\')"><span class="icon-menu menu-info"></span>基本信息</a></div>'
            ,item:''},
        menuChild:{ps:'<div class="mi"><i></i><a onclick="opt(\'{1}\',\'edit\',\'{0}\')"><span class="icon-menu menu-info"></span>基本信息</a></div>'
            ,output:'<div class="mi"><i></i><a onclick="opt(\'{1}\',\'edit\',\'{0}\')"><span class="icon-menu menu-info"></span>基本信息</a></div>'
            ,mp:'<div class="mi"><i></i><a onclick="opt(\'{1}\',\'edit\',\'{0}\')"><span class="icon-menu menu-info"></span>监控点基本信息</a><a       onclick="opt(\'{1}\',\'editdgi\',\'{0}\')"><span class="icon-menu menu-data"></span>数采仪基本信息</a><a        class="disabled"><span class="icon-menu menu-add-r"></span>增加监测仪器</a></div>'
            ,equ:'<div class="mi"><i></i><a onclick="opt(\'{1}\',\'edit\',\'{0}\')"><span class="icon-menu menu-info"></span>基本信息</a><a        class="disabled"><span class="icon-menu menu-edit"></span>更改安装位置</a><a onclick="opt(\'{1}\',\'delete\',\'{0}\')"><span class="icon-menu menu-delete"></span>删除</a></div>'
            ,pte:'<div class="mi"><i></i><a onclick="opt(\'{1}\',\'edit\',\'{0}\')"><span class="icon-menu menu-info"></span>基本信息</a></div>'
            ,item:''}
    };
    var layNum = 0; //y轴下移数
    var x=0;//监控点缩进数
    var py=81;//监控点偏移量
    var lnum=0;
    function Block(type,opt,id,title,css,menus,isque) {
        this.id = id;
        this.opt=opt;
        this.type=type;
        this.title = title;
        this.css = css;
        this.style = "";
        this.left = 0;
        this.top = psConfig.space.ptop;
        this.init = function (x, y) {
            this.left = x;
            this.top = y;
            this.style="left:"+x+"px;top:"+y+"px;";
        };
        this.html = function () {
            var block = $('<div id="{4}-{0}" class="block" style="{2}" ><div class="img-block {1}"  onclick="opt(\'{4}\',\'{5}\',\'{0}\')"></div><span class="name" title="{3}">{3}</span></div>'.format(this.id,this.css,this.style,this.title,this.type,this.opt));
            if(menus!=undefined){
                var menu = $(menus.format(this.id,this.type));
                block.append(menu);
            }
            if(isque==1){
                block.append($('<span class="v-que" ></span>'));
            }
            return block;
        };
    }
    function BlockItems(opt,id,title,css,mp) {
        this.id = id;
        this.title = title;
        this.data =[];
        this.items=[];
        this.style = "";
        this.left = 0;
        this.top = 0;
        if(mp!=undefined){
            this.data = mp.EquList;
            this.items=mp.ItemList;
        }
        this.init = function (x, y) {
            this.left = x;
            this.top = y;
            this.style = "left:" + x + "px;top:" + y + "px;";
        };
        this.html = function () {
            var str = '',itemList='',itemsArr=[];
            if(this.data!=undefined&&this.data.length>0){
                for (var i = 0; i < this.data.length; i++) {
                    var obj=this.data[i];
                    var isQue='';
                    var mdiicon=['v-mdi1','v-mdi3','v-mdi','v-mdi2'][obj.Type-91];
                    var mditip=['废气监测仪器','废气监测流量计','废水监测仪器','废水监测流量计'][obj.Type-91];
                    if(obj.ExamFlag==1){
                        isQue='<span class="v-que2"></span>';
                    }
                    str += '<div class="item"><div class="ps-item {0}" onclick="opt(\'equ\',\'edit\',\'{3}\')" title="{5}">{4}<span class="name" title="{1}">{1}</span></div>{2}</div>'.format(mdiicon,obj.Title,psConfig.menu.equ.format(obj.Id,'equ'),obj.Id,isQue,mditip);
                }
            }else{
                if(Psinfo.Flag==1){
                    str='<div class="item"><div class="ps-item {0}" onclick="opt(\'equ\',\'add\',\'{2}\')"><span class="name" title="{1}">{1}</span></div></div>'.format(css,title,this.id);
                }else{
                    str='<div class="item"> </div>' ;
                    //str='<div class="item"><div class="ps-item {0}" onclick="opt(\'equ\',\'add\',\'{2}\')"><span class="name" title="{1}">{1}</span></div></div>'.format(css,title,this.id);
                }
            }
            if(this.items==undefined||this.items.length==0){
                if(Psinfo.Flag==1){
                    itemList='<a onclick="opt(\'item\',\'add\',\'{0}\')"><span class="v-add-s"></span>查看项目</a>'.format(this.id);
                }else{
                    itemList='<a class="disabled"><span class="v-add-s"></span>查看项目</a>'.format(this.id);
                }
            }else{
                var i = 0;
                var len=this.items.length;
                for (; i < len; i++) {
                    var obj = this.items[i];
                    itemsArr.push('<a onclick="opt(\'item\',\'add\',\'{0}\')">{1}</a>'.format(this.id,obj.Title))
                }
                itemList=itemsArr.join('');
            }
            var block = $('<div id="{0}" class="block-items" style="{1}">{2}<div class="items">{3}</div></div>'.format(id,this.style,str,itemList));
            return block;
        };
    }
    function  Line(xy,p) {
        this.id = "";
        this.css = "line-" + xy;
        this.style = "";
        var dot = p != undefined;
        var points;
        this.init = function(left,top,width) {
            if (this.css == "line-x") {
                this.style = "left:" + left + "px;top:" + top + "px;width:" + width + "px;";
                if (dot) {
                    points = new Dot(p);
                    points.init(left + (width -psConfig.space.pandding)/ 2, top-psConfig.space.top);
                }
            } else {
                this.style = "left:" + left + "px;top:" + top + "px;height:" + width + "px;";
                if (dot) {
                    points = new Dot(p);
                    points.init(left-psConfig.space.left, top + width / 2);
                }
            }
        };
        this.html = function () {
            var html='<div class="{0}" style="{1}"></div>'.format(this.css,this.style);
            if(dot){
                html+=(points.html()).prop("outerHTML");
            }
            return $(html);
        };
    }
    function Dot(xy) {
        this.id = "";
        this.style = "";
        this.init = function (left, top) {
            this.style = "left:" + left + "px;top:" + top + "px;";
        };
        this.html = function () {
            var dot = $(' <div  style="{0}"></div>'.format(this.style));
            if (xy == "<") {
                dot.addClass("v-left");
            } else if(xy=="^"){
                dot.addClass("v-up");
            } else {
                dot.addClass("v-dot");
            }
            return dot;
        };
    }
    function link(block1, block2,dot) {
        if (block1.top == block2.top) {
            var line = new Line("x",dot);
            var width = Math.abs(block2.left - block1.left);
            line.init(block1.left +30, block1.top+25, width);
            $("#psView").append(line.html());
        } else if (block1.left == block2.left) {
            var liney = new Line("y",dot);
            var height = Math.abs(block2.top - block1.top);
            liney.init(block1.left + 30, block1.top + 25, height);
            $("#psView").append(liney.html());
        }else if(block2.left - block1.left<psConfig.space.x){
            var line1 = new Line("x");
            line1.init(block1.left+30,block2.top+30,block2.left - block1.left);
            var dot2 = new Dot('<');
            dot2.init(block1.left+50,block2.top+20);
            var dot1 = new Dot();
            dot1.init(block1.left+22,block2.top+20);
            var line2 = new Line("y",dot&&"^");
            line2.init(block1.left+30,block1.top+30,block2.top - block1.top);
            $("#psView").append(line1.html());
            $("#psView").append(dot1.html());
            $("#psView").append(dot2.html());
            $("#psView").append(line2.html());
        } else {
            var line1 = new Line("x",dot&&"<");
            var dot1 = new Dot();
            var line2 = new Line("y",dot&&"^");
            var dot2 = new Dot();
            var line3 = new Line("x",dot);
            var w = Math.abs(block2.left - block1.left);
            var h = Math.abs(block2.top - block1.top);
            line1.init(block1.left + 30, block1.top + 25, w / 2);
            dot1.init(block1.left + 22 + (w / 2), block1.top + 15);
            line2.init(block1.left + 30 + (w / 2), block1.top + 25, h);
            dot2.init(block1.left + 22 + (w / 2), block1.top + 15+h);
            line3.init(block1.left + 30+(w/2) , block1.top + 25+h, w / 2);
            $("#psView").append(line1.html());
            $("#psView").append(dot1.html());
            $("#psView").append(line2.html());
            $("#psView").append(dot2.html());
            $("#psView").append(line3.html());
        }
    }
//监控点绘制.
    function drawMp(mpList,pblock){
        x++;
        for (var j = 0; j < mpList.length; j++) {
            var mp = mpList[j];
            var mpicon=['v-mp','v-mp-gas','v-mp-waterIn'][mp.Type-4];
            var mpBlock = new Block("mp",'edit',mp.Id, mp.Title,mpicon,psConfig.menu.mp,mp.ExamFlag);
            mpBlock.init(psConfig.space.x * 2+(x-1)*py, psConfig.space.y * layNum );
            $("#psView").append(mpBlock.html());
            link(pblock,mpBlock);
            if(mp.EquList!=undefined&&mp.EquList.length>0){
                var equBlock=new BlockItems('edit',mp.Id,mp.Title,'v-mdi',mp);
                equBlock.init(psConfig.space.x*3+lnum*py,psConfig.space.y*layNum);
                $("#psView").append(equBlock.html());
                link(mpBlock,equBlock,'o');

            }else {
                if(Psinfo.Flag==1) {
                    var equBlock = new BlockItems('add', mp.Id, '添加监测设备', 'v-add',mp);
                    equBlock.init(psConfig.space.x * 3 + lnum*py, psConfig.space.y * layNum);
                    $("#psView").append(equBlock.html());
                    link(mpBlock, equBlock, 'o');
                }else{
                	if(mp.ItemList!=undefined&&mp.ItemList.length>0){
                		//监测仪器bug
                		var equBlock = new BlockItems('add', mp.Id, '添加监测设备', 'v-add',mp);
                		equBlock.init(psConfig.space.x * 3 + lnum*py, psConfig.space.y * layNum);
                		$("#psView").append(equBlock.html());
                		link(mpBlock, equBlock, 'o');
                	}
                }
            }
            layNum++;
            if(mp.children){
                drawMp(mp.children,mpBlock);
                x--;
            }
        }
    }

//初始化数据
    function initPsinfo(){
        var i = 0;
        var max=0;
        var mpMax=0;
        var len=Psinfo.OutList.length;
        for (; i < len; i++) {
            var out = Psinfo.OutList[i];
            out.MPs=group(out.MpList,out.Id);
        }
        lnum=max-1;
        if(lnum<0){
            lnum=0;
        }
        //水平数据转树形数据.
        function group(data,pid){
            var result = [] , temp;
            for(var i in data){
                if(data[i].PId==pid){
                    result.push(data[i]);
                    temp = group(data,data[i].Id);
                    if(temp.length>0){
                        data[i].children=temp;
                        mpMax++;
                    }
                }
            }
            if(mpMax>=max){
                max=mpMax;
            }
            return result;
        }
    }
    draw= function () {
        layNum = 0; //y轴下移数
        x=0;//监控点缩进数
        lnum=0;
        $('#psView').empty();
        initPsinfo();
        $('#psTitle').text(Psinfo.Title);
        if(Psinfo.Flag==1){
            psConfig.menu=psConfig.menuOn;
        }else{
            psConfig.menu=psConfig.menuChild;
        }
        var psinfo = new Block('ps','edit',Psinfo.Id, '', 'v-ps',psConfig.menu.ps);
        psinfo.init(0, 0);
        $("#psView").append(psinfo.html());
        if(Psinfo.OutList==undefined||Psinfo.OutList.length==0){
            if(Psinfo.Flag==1){
                /*var oupNew=new Block('output','add',Psinfo.Id,'添加排放口','v-add');
                oupNew.init(psConfig.space.x, psConfig.space.y*layNum);
                $("#psView").append(oupNew.html());
                link(psinfo,oupNew,'o');*/
            }
        }else{
            for (var i = 0; i <Psinfo.OutList.length; i++) {
                var out = Psinfo.OutList[i];
                var outBlock = new Block(['output-water','output-gas','output-in'][out.Type-1],'edit',out.Id, out.Title, ["v-water","v-gas" ,"v-water-in"][out.Type-1],psConfig.menu.output,out.ExamFlag);
                outBlock.init(psConfig.space.x, psConfig.space.y * layNum );
                $("#psView").append(outBlock.html());
                link(psinfo, outBlock);
                if(out.MpList==undefined||out.MpList.length==0){
                    if(Psinfo.Flag==1){
                        /*var mpNew=new Block('mp','add',out.Id,'添加监控点','v-add');
                        mpNew.init(psConfig.space.x*2, psConfig.space.y*layNum);
                        $("#psView").append(mpNew.html());
                        link(outBlock,mpNew,'o');*/
                    }else{
                        /*var mpNew=new Block('mp','add',out.Id,'添加监控点','v-add');
                        mpNew.init(psConfig.space.x*2, psConfig.space.y*layNum);
                        $("#psView").append(mpNew.html());
                        link(outBlock,mpNew,'o');*/
                    }
                    layNum++;
                }else{
                    x=0;
                    drawMp(out.MPs,outBlock);
                }
            }
        }
        //治理设施
        if(Psinfo.PteList!=undefined&&Psinfo.PteList.length>0){
            var pteInfo = new Block('pte','add',Psinfo.Id, '', 'v-pos');
            if(layNum==0){
                layNum++;
            }
            pteInfo.init(0, (layNum) * psConfig.space.y);
            $("#psView").append(pteInfo.html());
            var ptes = [];
            for (var i = 0; i < Psinfo.PteList.length; i++) {
                var pte = Psinfo.PteList[i];
                var pteBlock = new Block('pte','edit',pte.Id, pte.Title, "v-pte",psConfig.menu.pte,pte.ExamFlag);
                pteBlock.init((i + 1) * (psConfig.space.x*0.6), pteInfo.top);
                $("#psView").append(pteBlock.html());
                ptes.push(pteBlock);
                if (i == 0) {
                    link(pteInfo, pteBlock);
                } else {
                    link(ptes[i - 1], pteBlock,'o');
                }
            }
        }
        $(".disabled").each(function (i) {
			var a = $(this);
			a.attr('title','该企业信息管理权限属于'+Psinfo.RegionName+'，请联系'+Psinfo.RegionName+'进行维护');
		});
    };
})();

