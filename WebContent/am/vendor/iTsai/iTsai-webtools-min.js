﻿
 /* iTsai WebTools(Web开发工具集)
 *  当前库依赖第三方库：
 *  1).jQuery（v1.7.x）。详细了解：http://jquery.com/
 *  2).json2.js库。如果浏览器支持JSON.stringify和JSON.parse接口就不需要此库，详细了解：http://www.json.org/
 *  当前库实现的基本功能：
 *  1).ajax: 异步数据请求封装；
 *  2).array:
 * @author Chihpeng Tsai(470597142@qq.com)
 * git: https://github.com/iiTsai
 * osc: http://my.oschina.net/tsai
 * @method ()
 */
eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('(7(){o(!H.q){H.q={}}})();q={P:\'0.2.9\',V:7(){j\'q\'},2N:7(){j 1h 1Q().47()+\'\'+23.4U(23.2N()*2o)},6w:7(a){o(1a a!=\'1H\'){j N}o(a.1Y(\'.\')!=-1){j J}j N},4W:7(a){o(a!=3a(a,10)){j N}j J},6U:7(a){o(1a a=="1K"||a==17){j\'\'}j a},5f:7(a,b){p c=\'\';o(1a b===\'1K\'){c=a}B{c=b}j l.3A(c)||l.3v(a)},3v:7(a){o(!a)j N;a=a.1G();p b=H.2Q.4o;L(p i=0;i<b.G;i++){o(b[i]&&b[i].K.1G().1Y(a)>-1){j J}}j N},3A:7(a){o(!a)j N;2V{1h 6S(a);j J}2W(4f){j N}},4m:7(a){a=!a?\'\':a;a=3a(a.I(\'#\',\'4T\'));p r=a>>16,g=a>>8&3g,b=a&3g,3L=3c-r,3h=3c-g,3i=3c-b,2X=\'#\'+(3L<<16|3h<<8|3i).V(16);j 2X==\'#0\'?\'#4t\':2X},4K:7(){p a=H.2Q;j(a.4N||a.4O)},4P:7(e){o(e&&e.3m){e.3m()}B{H.3u.56=J}},2E:7(e){o(e&&e.2E){e.2E()}B{H.3u.5g=N}j N}};q.X={V:7(){j\'q.X\'},6l:7(s){o($.1t(s)){p a=q.X;a.2B=s.1I?s.1I:\'/\';a.2y=s.21?s.21:2o;a.2w.2v=s.3y?s.3y:3z;a.2s=s.4R?J:N}j l},2w:{2v:3z},18:{C:\'c\',R:\'r\',U:\'u\',D:\'d\'},2B:\'/\',2y:2o,2s:N,5k:7(a,b,c){l.X(\'1R\',a,b,c)},6f:7(a,b,c){a.18=l.18.C;l.X(\'1R\',a,b,c)},6g:7(a,b,c){a.18=l.18.R;l.X(\'1R\',a,b,c)},6h:7(a,b,c){a.18=l.18.U;l.X(\'1R\',a,b,c)},6j:7(a,b,c){a.18=l.18.D;l.X(\'1R\',a,b,c)},3U:7(a,b,c){l.X(\'6o\',a,b,c)},X:7(d,e,f,g){e=6A.6D(e);p h=q.X;$.X({2p:e,x:d,4g:g?N:J,1I:h.2B,21:h.2y,4j:7(a,b){o(!a){j}o(1a a!==\'4k\'){j}a=$.4l(a);p c=h.4a(a);o(f&&a){f(a.2p||{},c)}},4n:7(a,b,c){o(b=="21"){q.15.4d("访问超时:"+c)}4u{4z:a,4D:b,4H:c}}})},4a:7(a){o(!a)j N;p b=a.4I,15=a.15,32=l.2w.2v;o(b===32&&l.2s){q.15.3n([15,\' [\',b,\']\'].1b(\'\'))}B{q.15.4b([15,\' [\',b,\']\'].1b(\'\'))}j b===32?J:N}};4Q.O.1Y=7(a){L(p i=0,49=l.G;i<49;i++){o(l[i]===a)j i}j-1};q.48={V:7(){j\'q.48\'},4V:7(a,b){o(!b){j a}p c=[],46=b.1b("&45;&45;");L(p i 1g a){o(46.1Y(a[i])==-1){c.2A(a[i])}}j c}};q.43={V:7(){j\'q.43\'},1S:7(a){o(a<10){j\'0\'+a}j a+\'\'},6d:7(a){o(a<0){a=0}a=3a(a,10);p b=23.42(a/2g),3X=23.42((a%2g)/60),3V=a%2g%60;j l.1S(b)+\':\'+l.1S(3X)+\':\'+l.1S(3V)},2H:7(a,b){p z={M:a.6x()+1,d:a.3T(),h:a.6C(),m:a.6F(),s:a.6N()};b=b.I(/(M+|d+|h+|m+|s+)/g,7(v){j((v.G>1?"0":"")+6T(\'z.\'+v.2k(-1))).2k(-2)});j b.I(/(y+)/g,7(v){j a.79().V().2k(-v.G)})},1V:7(a){o(1U[0])a=1U[0];j l.2H(1h 1Q(),a)},4h:7(a){j l.1V(a||\'2q-2x-22 2F:1T:2K\')},4p:7(a){p b=1h 1Q();j l.2H(b,a||\'2q-2x-22 2F:1T:2K\')+\'.\'+b.4r()},3T:7(a){j l.1V(a||\'2q-2x-22\')},47:7(a){j l.1V(a||\'2F:1T:2K\')},4s:7(c,d){p e=$(\'#\'+c+\',\'+\'#\'+d),2L={};2L=e.1u({4v:J,4x:1,2Z:\'4A-1T-22\',4C:7(a){p b=l.12==c?"4E":"4G",30=$(l).2p("1u"),3S=$.1u.4J(30.3R.2Z||$.1u.4L.2Z,a,30.3R);2L.4M(l).1u("1P",b,3S)},3Q:1h 1Q()}).1u(\'3Q\',1h 1Q())}};q.4e={V:7(){j\'q.4e\'},11:{3M:4S,3e:27,3K:13,3J:33,3I:34,4Y:35,50:36,3H:37,3F:38,3D:39,3C:40},14:7(a,b,c){a.5l(7(e){o(e.5n==b){o(1a c==\'7\')c(a,e)}})},5s:7(a,b){l.14(l.11.3K,a,b);j l},5u:7(a,b){l.14(l.11.3e,a,b);j l},5v:7(a,b){l.14(l.11.3M,a,b);j l},5D:7(a,b){l.14(l.11.3I,a,b);j l},5G:7(a,b){l.14(l.11.3J,a,b);j l},5L:7(a,b){l.14(l.11.3H,a,b);j l},5R:7(a,b){l.14(l.11.3D,a,b);j l},6b:7(a,b){l.14(l.11.3F,a,b);j l},6c:7(a,b){l.14(l.11.3C,a,b);j l},7c:7(a,b){o(b&&b.Y)j b.Y(\'Q[K="\'+a+\'"]:1c\').1z();j $(\'Q[K="\'+a+\'"]:1c\').1z()},6i:7(a,b,c){o(c&&c.Y)j c.Y(\'Q[K="\'+a+\'"][W="\'+b+\'"]\').E(\'1c\',J);j $(\'Q[K="\'+a+\'"][W="\'+b+\'"]\').E(\'1c\',J)},6n:7(a,b,c){o(c&&c.Y)j c.Y(\'#\'+a+\' 1P[W="\'+b+\'"]\').E(\'3x\',J);j $(\'#\'+a+\' 1P[W="\'+b+\'"]\').E(\'3x\',J)},6q:7(a){o(!$.1t(a)){j\'\'}p b=[];L(p i 1g a){b.2A(\'<1P W="\'+i+\'">\'+a[i]+\'</1P>\')}j b.1b(\'\')},6r:7(a,b){o($.1t(a)){a.Y(\'Q,1w,1v\').E(\'6y\',b)}j l},2C:7(a){p b={};o(!a){j b}L(p i=a.G-1;i>=0;i--){p c=$(a[i]),x=c.E(\'x\');o(x){x=x.1G()}p d=c.3U(0).6B,12=c.E(\'12\'),K=c.E(\'K\'),W=17;o(c.3w(\'1o\')){1r}o(d==\'6M\'&&x){3t(x){24\'3s\':{W=c.3r(\':1c\')}26;24\'3q\':{o(c.3r(\':1c\')){W=c.E(\'W\')}B{1r}}26;2M:{W=c.1z()}}}B{W=c.1z()}b[K||12]=W;c.3p(\'1o\')}j b},2O:7(b,c){o(!b&&c==17){j l}L(p i=b.G-1;i>=0;i--){p d=$(b[i]);o(d.3w(\'1o\')){1r}p e=d.E(\'x\');o(e){e=e.1G()}o(e){3t(e){24\'3s\':{d.E(\'1c\',c)}26;24\'3q\':{d.4i(7(i){p a=$(l);o(a.E(\'W\')==c){a.E(\'1c\',J)}})}26;2M:{d.1z(c)}}}B{d.1z(c)}d.2P(\'1o\')}j l},3o:7(a){p b={};o(!a){j b}L(p i=a.G-1;i>=0;i--){p c=$(a[i]),2R=c.E(\'2S\');o(!2R){1r}p d=c.Y(\'Q[x!=2T][x!=2U][x!=2e],1w,1v\');b[2R]=l.2C(d);d.2P(\'1o\')}j b},4q:7(a){p b={};a=a||$(\'1i\');o(!a){j b}p c=a.Y(\'Z[2S]\'),2Y=l.3o(c),3l=a.Y(\'Q[x!=2T][x!=2U][x!=2e][x!=3k],1w,1v\'),b=l.2C(3l);L(p d 1g 2Y){b[d]=2Y[d]}j b},4w:7(a,b){a=a||$(\'1i\');o(!a||!b){j l}p c=l.2O;L(p d 1g b){p e=b[d];c(a,d,e)}j l},1F:7(a){j $(a.Y(\'Q[x!=2T][x!=2U][x!=2e][x!=3k][x!=4y],1w,1v\'))},1E:7(a,b){j $(a.3j(\'Q[K=\'+b+\'],Q[12=\'+b+\'],1v[K=\'+b+\'],1v[12=\'+b+\'],1w[K=\'+b+\'],1w[12=\'+b+\']\'))},4B:7(a,b){a=a||$(\'1i\');o(!a||!b){j l}p c={},2c={};L(p d 1g b){p e=b[d];o($.1t(e)){2c[d]=e}B{c[d]=e}}p f=l.2O,1F=l.1F,1E=l.1E;L(p d 1g 2c){p b=2c[d],Z=a.Y(\'Z[2S="\'+d+\'"]\');o(!Z.G){1r}p g=1F(Z);o(!g.G){1r}L(p k 1g b){p h=b[k],Q=1E(g,k);f(Q,h)}}p g=1F(a);L(p d 1g c){p e=c[d],Q=1E(g,d);f(Q,e)}g.3j(\'.1o\').3p(\'1o\');j l}};q.1j={V:7(){j\'q.1j\'},4F:7(b){o($(\'#1d-1j\').G>0){l.3f()}p c="数据处理中...";o(!b){c=b}p d=$(\'<Z></Z>\'),1D=$(1y),19=$([\'<1s>\',c,\'</1s>\'].1b(\'\'));d.E(\'12\',\'1d-1j\').3b(19);p e=7(){p a=1D.1k()/2+1D.31();19.1l({1m:a,1B:(1D.1e()-19.1e())/2,1q:\'29\'});d.1l({1k:1D.1k()})};$(\'1i\').28(d);e();$(H).2J(\'2I 2G\',7(){e()});j l},3f:7(){$(\'#1d-1j\').1p();j l},4X:7(a,b){o(b){$(\'#1d-1j 1s\').28(a)}B{$(\'#1d-1j 1s\').3b(a)}j l},1f:7(a,b){o($.1t(a)){$(\'#\'+a.E(\'2D\')).1p();p c=\'1d-1f-\'+q.2N(),2z=a.4Z(),2u=a.51(),2t=a.1q(),19=$([\'<Z>\',(b?b:\'\'),\'</Z>\'].1b(\'\')),1f=$([\'<Z 52="1d-1f" 12="\',c,\'"></Z>\'].1b(\'\'));a.53(1f).E(\'2D\',c);1f.28(19).1l({1q:\'29\',1m:2t.1m,1B:2t.1B,1k:2z,1e:2u});19.1l({1m:(2z-19.1k())/2,1B:(2u-19.1e())/2});j 1f}},54:7(a){o($.1t(a)){$(\'#\'+a.E(\'2D\')).1p()}B{$(\'.1d-1f\').1p()}j l},55:7(a,b,c){p d=$(1y),1x=7(){a.1l({\'z-57\':c?c:0,1q:\'29\',1B:(d.1e()-a.1e())/2,1m:d.31()+(($.3B.2r?d.1k():H.58)-a.1k())/2})};1x();o(b){$(H).2J(\'2I 2G\',7(){1x()})}j a}};q.15={V:7(){j\'q.15\'},4b:7(a,b){l.1J(a,\'59\',b)},3n:7(a,b){l.1J(a,\'5a\',b)},5b:7(a,b){l.1J(a,\'5c\',b)},4d:7(a,b){l.1J(a,\'5d\',b)},5e:7(){$(\'#1Z\').1p()},1J:7(b,c,d){$(\'#1Z\').1p();p e=$(\'<1s 12="1Z"></1s>\');e.1l({1q:\'29\'}).2P(c).3b(b);p f=$(\'1i\');o(d<0){f.3E(e)}B{d=(d==1K?5:d);f.3E(e.5h().3G(d*5i).5j())}p g=$(\'#1Z\'),2n=g.1q().1m,1x=7(a){g.3G(10).1l({1B:(f.1e()-g.1e())/2,1m:a+$(1y).31()})};1x(2n);$(H).2J(\'2I 2G\',7(){1x(2n)})}};q.2m={V:7(){j\'q.2m\'},5m:7(a,b){p c=b||H.2l.5o;o(c.G==0){j 17}o(c.5p(0)!="?"){j 17}c=5q(c).5r(1);o(c.G==0){j 17}p d=c.1X(\'&\');L(p i=0;i<d.G;i++){p e=d[i].1X(\'=\',2);o(e[0]==a){o(e.G<2||1a(e[1])==="1K"||e[1]=="1K"||e[1]=="17")j\'\';j e[1]}}j 17},5t:7(){2j.2i(-1);j l},5w:7(){2j.2i(1);j l},5x:7(){2j.2i(0);j l},5y:7(a){a=(a?a:2l.5z);o(1y.5A){1y.1i.5B.5C=\'1I(#2M#3N)\';1y.1i.5E(a)}B o(H.5F){o(H.3O){2V{H.3O.5H.5I.5J("5K")}2W(e){2h(\'此操作被浏览器拒绝！请在地址栏输入"5M:5N"并回车然后将[5O.5P.5Q]的值设置为J\')}}2V{p b=3P.5S[\'@5T.5U/5V-5W;1\'].5X(3P.5Y.5Z);b.61(\'3B.62.3N\',a)}2W(e){2h(\'设置失败\')}}B{2h(\'请用63+D将地址添加到收藏夹\')}j l},64:7(){j 2l.65.1X(\':\')[0]},66:7(){H.67=17;H.68(\'\',\'69\');H.6a()},K:\'\',P:\'\',1W:\'\',1A:7(){p a={},1n=2Q.1n.1G(),s;(s=1n.1C(/2r ([\\d.]+)/))?a.2f=s[1]:(s=1n.1C(/1O\\/([\\d.]+)/))?a.1O=s[1]:(s=1n.1C(/1N\\/([\\d.]+)/))?a.1N=s[1]:(s=1n.1C(/1M.([\\d.]+)/))?a.1M=s[1]:(s=1n.1C(/P\\/([\\d.]+).*1L/))?a.1L=s[1]:0;p b=\'\',P=\'\';o(a.2f){b=\'2r\';P=a.2f}B o(a.1O){b=\'1O\';P=a.1O}B o(a.1N){b=\'1N\';P=a.1N}B o(a.1M){b=\'1M\';P=a.1M}B o(a.1L){b=\'1L\';P=a.1L}B{b=\'6k\'}j{K:b,P:P.1X(\'.\')[0],1W:P}}};(7(){p a=q.2m,1A=a.1A();a.K=1A.K;a.P=1A.P;a.1W=1A.1W})();q.3W={V:7(){j\'q.3W\'},6m:/^[\\w-]*(\\.[\\w-]*)+/20,1I:/6p?:\\/\\/[\\w-]*(\\.[\\w-]*)+/20,3Y:/3Y:\\/\\/[\\w-]*(\\.[\\w-]*)+/20,3Z:/3Z:\\/\\/[\\w-]*(\\.[\\w-]*)+/20,6s:/^[-a-6t-6u-6v\\.]+@([0-41-3d-z][0-41-3d-z-]+\\.)+[A-3d-z]{2,5}$/,6z:/^([44]?\\d\\d?|2[0-4]\\d|25[0-5])(\\.([44]?\\d\\d?|2[0-4]\\d|25[0-5])){3}$/,6E:/^[A-F\\d]{2}-[A-F\\d]{2}-[A-F\\d]{2}-[A-F\\d]{2}-[A-F\\d]{2}-[A-F\\d]{2}$/,6G:/^(\\d{1,4}|[1-5]\\d{4}|6([0-4]\\d{3}|5([0-4]\\d{2}|5([0-2]\\d|3[0-5]))))$/,6H:/(^[0-9]{1,4}\\-[0-9]{3,4}\\-[0-9]{3,8}$)|(^[0-9]{3,4}\\-[0-9]{3,8}$)|(^[0-9]{3,8}$)/,6I:/[6J-6K]/,6L:/[^2a-2b]/,6O:/[^\\2a-2b]/,6P:/\\s/,6Q:/\\S/};q.1H={V:7(){j\'q.1H\'},6R:7(){l.2d=[];l.28=7(a){p t=1a a;o(t===\'1H\'||t===\'4c\'){l.2d.2A(a)}j l};l.V=7(a){p t=1a a;o(t!==\'1H\'&&t!==\'4c\'){a=\'\'}j l.2d.1b(a)};l.6V=7(){j l.2d}}};T.O.6W=7(){j l.I(/(^\\s*)|(\\s*$)/g,"")};T.O.6X=7(){j l.I(/(\\s*)/g,"")};T.O.6Y=7(){j l.I(/(^\\s*)/g,"")};T.O.6Z=7(){j l.I(/(\\s*$)/g,"")};T.O.70=7(a,b){o(a===\'\'){a=\' \'}p i=\'i\';o(b){i=\'\'}j l.I(1h 71("("+a+")",i+"g"),"")};T.O.72=7(){j l.I(/(\\,$)/g,"")};T.O.73=7(){j l.I(/(^0*)/g,"")};T.O.74=7(){j l.I(/[^\\2a-\\2b]/g,"75").G};T.O.76=7(){j l.I(/[^\\2a-\\2b]/g,"77").G};T.O.78=7(){j l.I(/(^\\n+)|(\\n+$)/g,"")};T.O.7a=7(){j l.I(/(\\n+)/g,"\\n")};T.O.7b=7(){j l.I(/(\\n+)/g,"\\r\\n")};T.O.6e=7(){p a=l;L(p i=0;i<1U.G;i++){p b="\\{"+i+"\\}";a=a.I(b,1U[i])}j a};',62,447,'|||||||function||||||||||||return||this|||if|var|iTsai|||||||type||||else|||attr||length|window|replace|true|name|for||false|prototype|version|input|||String||toString|value|ajax|find|div||keycode|id||_bindKey|msg||null|action|txt|typeof|join|checked|itsai|width|mask|in|new|body|layer|height|css|top|userAgent|_isSerialized|remove|position|continue|span|isPlainObject|datepicker|textarea|select|_resetPos|document|val|agent|left|match|doc|_findInputs|_filterInputs|toLowerCase|string|url|_infoImpl|undefined|safari|opera|chrome|firefox|option|Date|POST|_zeroCompletion|mm|arguments|dateTimeWrapper|versions|split|indexOf|c_msg_x|ig|timeout|dd|Math|case||break||append|absolute|x00|xff|groups|_string|submit|ie|3600|alert|go|history|slice|location|nav|top_orig|10000|data|yyyy|msie|SHOW_SUCC_INFO|pos|o_w|SUCC|reqCode|MM|TIME_OUT|o_h|push|REQ_URL|_serializeInputs|masker|preventDefault|hh|scroll|dateTime2str|resize|bind|ss|dates|default|random|_deserializeInputs|addClass|navigator|key|fieldset|button|reset|try|catch|clr|jsonGroup|dateFormat|instance|scrollTop|succ||||||||parseInt|html|255|Za|ESC|clear|0x0000ff|_g|_b|filter|image|inputs|stopPropagation|infoCorrect|_serializeGroups|removeClass|radio|is|checkbox|switch|event|hasPlugin|hasClass|selected|sucCode|200|hasPluginIE|browser|DOWN|RIGHT|prepend|UP|delay|LEFT|PAGEDOWN|PAGEUP|ENTER|_r|F11|homepage|netscape|Components|setDate|settings|date|getDate|get|sec|regexp|mins|ftp|smtp||9A|floor|calendar|01|quot|str|getTime|array|len|printReqInfo|infoAlert|number|infoError|form|ex|async|getDatetime|each|success|object|parseJSON|colorInverse|error|plugins|getDatetimes|serialize|getMilliseconds|initDatePickerRange|000000|throw|changeMonth|deserializeSimple|numberOfMonths|file|XMLHttpRequest|yy|deserialize|onSelect|textStatus|minDate|add|maxDate|errorThrown|code|parseDate|getLang|_defaults|not|language|userLanguage|stopBubble|Array|sucInfo|122|0x|round|arrayReduce|isInteger|addInfo|END|outerHeight|HOME|outerWidth|class|after|clearMask|move2Center|cancelBubble|index|innerHeight|c_alert_f|c_correct_f|infoWarning|c_warning_f|c_error_f|infoClear|checkPlugin|returnValue|fadeIn|1000|fadeOut|post|keydown|getParameter|keyCode|search|charAt|unescape|substring|bindEnterKey|goPrevPage|bindEscKey|bindF11Key|goNextPage|refreshPage|setHomepage|href|all|style|behavior|bindPageDownKey|setHomePage|sidebar|bindPageUpKey|security|PrivilegeManager|enablePrivilege|UniversalXPConnect|bindLeftKey|about|config|signed|applets|codebase_principal_support|bindRightKey|classes|mozilla|org|preferences|service|getService|interfaces|nsIPrefBranch||setCharPref|startup|Ctrl|getHost|host|closeWin|opener|open|_self|close|bindUpKey|bindDownKey|secs2Time|formatArgs|postC|postR|postU|setRadioValue|postD|unknown|setup|domain|setSelectValue|GET|https|object2Options|formDisable|email|zA|Z0|9_|hasDot|getMonth|disabled|ipv4|JSON|tagName|getHours|stringify|mac|getMinutes|rang0t65535|phone|char_zhcn|u4e00|u9fa5|byte|INPUT|getSeconds|ascii|blank|notBlank|StringBuffer|ActiveXObject|eval|obj2Empty|toArray|trim|trimBlanks|trimPreBlank|trimSufBlank|trimChars|RegExp|trimCom|trimPreZero|sizeUTF8|aaa|sizeDW|aa|trimLines|getFullYear|rowSpan|lf2crlf|getRadioValue'.split('|'),0,{}))