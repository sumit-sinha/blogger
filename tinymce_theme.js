!function(){var e={},t=function(t){for(var n=e[t],o=n.deps,r=n.defn,a=o.length,l=new Array(a),s=0;s<a;++s)l[s]=i(o[s]);var c=r.apply(null,l);if(void 0===c)throw"module ["+t+"] returned undefined";n.instance=c},n=function(t,n,i){if("string"!=typeof t)throw"module id must be a string";if(void 0===n)throw"no dependencies for "+t;if(void 0===i)throw"no definition function for "+t;e[t]={deps:n,defn:i,instance:void 0}},i=function(n){var i=e[n];if(void 0===i)throw"module ["+n+"] was undefined";return void 0===i.instance&&t(n),i.instance},o=function(e,t){for(var n=e.length,o=new Array(n),r=0;r<n;++r)o.push(i(e[r]));t.apply(null,t)};({}).bolt={module:{api:{define:n,require:o,demand:i}}};var r=n,a=function(e,t){r(e,[],function(){return t})};a("global!tinymce.Env",tinymce.Env),a("global!tinymce.EditorManager",tinymce.EditorManager),a("global!tinymce.ThemeManager",tinymce.ThemeManager),a("global!tinymce.util.Tools",tinymce.util.Tools),a("global!tinymce.ui.Factory",tinymce.ui.Factory),a("global!tinymce.DOM",tinymce.DOM),r("tinymce.modern.ui.Toolbar",["global!tinymce.util.Tools","global!tinymce.ui.Factory"],function(e,t){var n=function(n,i,o){var r,a=[];if(i)return e.each(i.split(/[ ,]/),function(e){var i,l=function(){var t=n.selection;e.settings.stateSelector&&t.selectorChanged(e.settings.stateSelector,function(t){e.active(t)},!0),e.settings.disabledStateSelector&&t.selectorChanged(e.settings.disabledStateSelector,function(t){e.disabled(t)})};"|"==e?r=null:t.has(e)?(e={type:e,size:o},a.push(e),r=null):(r||(r={type:"buttongroup",items:[]},a.push(r)),n.buttons[e]&&(i=e,"function"==typeof(e=n.buttons[i])&&(e=e()),e.type=e.type||"button",e.size=o,e=t.create(e),r.items.push(e),n.initialized?l():n.on("init",l)))}),{type:"toolbar",layout:"flow",items:a}};return{createToolbar:n,createToolbars:function(t,i){var o=[],r=t.settings,a=function(e){if(e)return o.push(n(t,e,i)),!0};if(e.isArray(r.toolbar)){if(0===r.toolbar.length)return;e.each(r.toolbar,function(e,t){r["toolbar"+(t+1)]=e}),delete r.toolbar}for(var l=1;l<10&&a(r["toolbar"+l]);l++);if(o.length||!1===r.toolbar||a(r.toolbar||"undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image"),o.length)return{type:"panel",layout:"stack",classes:"toolbar-grp",ariaRoot:!0,ariaRemember:!0,items:o}}}}),r("tinymce.modern.ui.Menubar",["global!tinymce.util.Tools"],function(e){var t={file:{title:"File",items:"newdocument"},edit:{title:"Edit",items:"undo redo | cut copy paste pastetext | selectall"},insert:{title:"Insert",items:"|"},view:{title:"View",items:"visualaid |"},format:{title:"Format",items:"bold italic underline strikethrough superscript subscript | formats | removeformat"},table:{title:"Table"},tools:{title:"Tools"}},n=function(e,t){return"|"==t?{text:"|"}:e[t]},i=function(i,o,r){var a,l,s,c,u;if(u=e.makeMap((o.removed_menuitems||"").split(/[ ,]/)),o.menu?(l=o.menu[r],c=!0):l=t[r],l){a={text:l.title},s=[],e.each((l.items||"").split(/[ ,]/),function(e){n(i,e)&&!u[e]&&s.push(n(i,e))}),c||e.each(i,function(e){e.context==r&&("before"==e.separator&&s.push({text:"|"}),e.prependToContext?s.unshift(e):s.push(e),"after"==e.separator&&s.push({text:"|"}))});for(var d=0;d<s.length;d++)"|"==s[d].text&&(0!==d&&d!=s.length-1||s.splice(d,1));if(a.menu=s,!a.menu.length)return null}return a};return{createMenuButtons:function(e){var n,o=[],r=e.settings,a=[];if(r.menu)for(n in r.menu)a.push(n);else for(n in t)a.push(n);for(var l="string"==typeof r.menubar?r.menubar.split(/[ ,]/):a,s=0;s<l.length;s++){var c=l[s];(c=i(e.menuItems,e.settings,c))&&o.push(c)}return o}}}),a("global!tinymce.util.Delay",tinymce.util.Delay),a("global!tinymce.geom.Rect",tinymce.geom.Rect),r("tinymce.modern.ui.ContextToolbars",["global!tinymce.DOM","global!tinymce.util.Tools","global!tinymce.util.Delay","tinymce.modern.ui.Toolbar","global!tinymce.ui.Factory","global!tinymce.geom.Rect"],function(e,t,n,i,o,r){var a=function(e){return{left:e.x,top:e.y,width:e.w,height:e.h,right:e.x+e.w,bottom:e.y+e.h}},l=function(e){t.each(e.contextToolbars,function(e){e.panel&&e.panel.hide()})},s=function(e,t){e.moveTo(t.left,t.top)},c=function(e,n,i){n=n?n.substr(0,2):"",t.each({t:"down",b:"up"},function(t,o){e.classes.toggle("arrow-"+t,i(o,n.substr(0,1)))}),t.each({l:"left",r:"right"},function(t,o){e.classes.toggle("arrow-"+t,i(o,n.substr(1,1)))})},u=function(e,t,n,i,o,r){return r=a({x:t,y:n,w:r.w,h:r.h}),e&&(r=e({elementRect:a(i),contentAreaRect:a(o),panelRect:r})),r};return{addContextualToolbars:function(a){var d,m=a.settings,f=function(){return a.contextToolbars||[]},b=function(t){var n,i,o;return n=e.getPos(a.getContentAreaContainer()),i=a.dom.getRect(t),"BODY"===(o=a.dom.getRoot()).nodeName&&(i.x-=o.ownerDocument.documentElement.scrollLeft||o.scrollLeft,i.y-=o.ownerDocument.documentElement.scrollTop||o.scrollTop),i.x+=n.x,i.y+=n.y,i},y=function(t,n){var i,o,d,f,y,h,g,p=m.inline_toolbar_position_handler;a.removed||(t&&t.toolbar.panel?(g=["bc-tc","tc-bc","tl-bl","bl-tl","tr-br","br-tr"],y=t.toolbar.panel,n&&y.show(),d=b(t.element),o=e.getRect(y.getEl()),f=e.getRect(a.getContentAreaContainer()||a.getBody()),25,"inline"!==e.getStyle(t.element,"display",!0)&&(d.w=t.element.clientWidth,d.h=t.element.clientHeight),a.inline||(f.w=a.getDoc().documentElement.offsetWidth),a.selection.controlSelection.isResizable(t.element)&&d.w<25&&(d=r.inflate(d,0,8)),i=r.findBestRelativePosition(o,d,f,g),d=r.clamp(d,f),i?(h=r.relativePosition(o,d,i),s(y,u(p,h.x,h.y,d,f,o))):(f.h+=o.h,(d=r.intersect(f,d))?(i=r.findBestRelativePosition(o,d,f,["bc-tc","bl-tl","br-tr"]))?(h=r.relativePosition(o,d,i),s(y,u(p,h.x,h.y,d,f,o))):s(y,u(p,d.x,d.y,d,f,o)):y.hide()),c(y,i,function(e,t){return e===t})):l(a))},h=function(e){return function(){var t=function(){a.selection&&y(w(a.selection.getNode()),e)};n.requestAnimationFrame(t)}},g=function(){d||(d=a.selection.getScrollContainer()||a.getWin(),e.bind(d,"scroll",h(!0)),a.on("remove",function(){e.unbind(d,"scroll")}))},p=function(e){var t;if(e.toolbar.panel)return e.toolbar.panel.show(),void y(e);g(),t=o.create({type:"floatpanel",role:"dialog",classes:"tinymce tinymce-inline arrow",ariaLabel:"Inline toolbar",layout:"flex",direction:"column",align:"stretch",autohide:!1,autofix:!0,fixed:!0,border:1,items:i.createToolbar(a,e.toolbar.items),oncancel:function(){a.focus()}}),e.toolbar.panel=t,t.renderTo(document.body).reflow(),y(e)},v=function(){t.each(f(),function(e){e.panel&&e.panel.hide()})},w=function(e){var t,n,i,o=f();for(t=(i=a.$(e).parents().add(e)).length-1;t>=0;t--)for(n=o.length-1;n>=0;n--)if(o[n].predicate(i[t]))return{toolbar:o[n],element:i[t]};return null};a.on("click keyup setContent ObjectResized",function(e){("setcontent"!==e.type||e.selection)&&n.setEditorTimeout(a,function(){var e;(e=w(a.selection.getNode()))?(v(),p(e)):v()})}),a.on("blur hide contextmenu",v),a.on("ObjectResizeStart",function(){var e=w(a.selection.getNode());e&&e.toolbar.panel&&e.toolbar.panel.hide()}),a.on("ResizeEditor ResizeWindow",h(!0)),a.on("nodeChange",h(!1)),a.on("remove",function(){t.each(f(),function(e){e.panel&&e.panel.remove()}),a.contextToolbars={}}),a.shortcuts.add("ctrl+shift+e > ctrl+shift+p","",function(){var e=w(a.selection.getNode());e&&e.toolbar.panel&&e.toolbar.panel.items()[0].focus()})}}}),r("tinymce.modern.ui.A11y",[],function(){var e=function(e,t){return function(){var n=e.find(t)[0];n&&n.focus(!0)}};return{addKeys:function(t,n){t.shortcuts.add("Alt+F9","",e(n,"menubar")),t.shortcuts.add("Alt+F10,F10","",e(n,"toolbar")),t.shortcuts.add("Alt+F11","",e(n,"elementpath")),n.on("cancel",function(){t.focus()})}}}),r("tinymce.modern.ui.Sidebar",["global!tinymce.util.Tools","global!tinymce.ui.Factory","global!tinymce.Env"],function(e,t,n){var i=function(e){return{element:function(){return e}}},o=function(e,t,n){var o=e.settings[n];o&&o(i(t.getEl("body")))},r=function(t,n,i){e.each(i,function(e){var i=n.items().filter("#"+e.name)[0];i&&i.visible()&&e.name!==t&&(o(e,i,"onhide"),i.visible(!1))})},a=function(e){e.items().each(function(e){e.active(!1)})},l=function(t,n){return e.grep(t,function(e){return e.name===n})[0]},s=function(e,n,i){return function(s){var c=s.control,u=c.parents().filter("panel")[0],d=u.find("#"+n)[0],m=l(i,n);r(n,u,i),a(c.parent()),d&&d.visible()?(o(m,d,"onhide"),d.hide(),c.active(!1)):(d?(d.show(),o(m,d,"onshow")):(d=t.create({type:"container",name:n,layout:"stack",classes:"sidebar-panel",html:""}),u.prepend(d),o(m,d,"onrender"),o(m,d,"onshow")),c.active(!0)),e.fire("ResizeEditor")}},c=function(){return!n.ie||n.ie>=11};return{hasSidebar:function(e){return!(!c()||!e.sidebars)&&e.sidebars.length>0},createSidebar:function(t){return{type:"panel",name:"sidebar",layout:"stack",classes:"sidebar",items:[{type:"toolbar",layout:"stack",classes:"sidebar-toolbar",items:e.map(t.sidebars,function(e){var n=e.settings;return{type:"button",icon:n.icon,image:n.image,tooltip:n.tooltip,onclick:s(t,e.name,t.sidebars)}})}]}}}}),r("tinymce.modern.ui.SkinLoaded",[],function(){return{fireSkinLoaded:function(e){var t=function(){e._skinLoaded=!0,e.fire("SkinLoaded")};return function(){e.initialized?t():e.on("init",t)}}}}),r("tinymce.modern.ui.Resize",["global!tinymce.DOM"],function(e){var t=function(e){return{width:e.clientWidth,height:e.clientHeight}},n=function(n,i,o){var r,a,l,s,c=n.settings;r=n.getContainer(),a=n.getContentAreaContainer().firstChild,l=t(r),s=t(a),null!==i&&(i=Math.max(c.min_width||100,i),i=Math.min(c.max_width||65535,i),e.setStyle(r,"width",i+(l.width-s.width)),e.setStyle(a,"width",i)),o=Math.max(c.min_height||100,o),o=Math.min(c.max_height||65535,o),e.setStyle(a,"height",o),n.fire("ResizeEditor")};return{resizeTo:n,resizeBy:function(e,t,i){var o=e.getContentAreaContainer();n(e,o.clientWidth+t,o.clientHeight+i)}}}),r("tinymce.modern.modes.Iframe",["global!tinymce.util.Tools","global!tinymce.ui.Factory","global!tinymce.DOM","tinymce.modern.ui.Toolbar","tinymce.modern.ui.Menubar","tinymce.modern.ui.ContextToolbars","tinymce.modern.ui.A11y","tinymce.modern.ui.Sidebar","tinymce.modern.ui.SkinLoaded","tinymce.modern.ui.Resize"],function(e,t,n,i,o,r,a,l,s,c){var u=function(e){return function(t){e.find("*").disabled("readonly"===t.mode)}},d=function(e){return{type:"panel",name:"iframe",layout:"stack",classes:"edit-area",border:e,html:""}},m=function(e){return{type:"panel",layout:"stack",classes:"edit-aria-container",border:"1 0 0 0",items:[d("0"),l.createSidebar(e)]}};return{render:function(e,f,b){var y,h,g,p=e.settings;return b.skinUiCss&&n.styleSheetLoader.load(b.skinUiCss,s.fireSkinLoaded(e)),y=f.panel=t.create({type:"panel",role:"application",classes:"tinymce",style:"visibility: hidden",layout:"stack",border:1,items:[!1===p.menubar?null:{type:"menubar",border:"0 0 1 0",items:o.createMenuButtons(e)},i.createToolbars(e,p.toolbar_items_size),l.hasSidebar(e)?m(e):d("1 0 0 0")]}),!1!==p.resize&&(h={type:"resizehandle",direction:p.resize,onResizeStart:function(){var t=e.getContentAreaContainer().firstChild;g={width:t.clientWidth,height:t.clientHeight}},onResize:function(t){"both"===p.resize?c.resizeTo(e,g.width+t.deltaX,g.height+t.deltaY):c.resizeTo(e,null,g.height+t.deltaY)}}),!1!==p.statusbar&&y.add({type:"panel",name:"statusbar",classes:"statusbar",layout:"flow",border:"1 0 0 0",ariaRoot:!0,items:[{type:"elementpath",editor:e},h]}),e.fire("BeforeRenderUI"),e.on("SwitchMode",u(y)),y.renderBefore(b.targetNode).reflow(),p.readonly&&e.setMode("readonly"),p.width&&n.setStyle(y.getEl(),"width",p.width),e.on("remove",function(){y.remove(),y=null}),a.addKeys(e,y),r.addContextualToolbars(e),{iframeContainer:y.find("#iframe")[0].getEl(),editorContainer:y.getEl()}}}}),a("global!tinymce.ui.FloatPanel",tinymce.ui.FloatPanel),r("tinymce.modern.modes.Inline",["global!tinymce.util.Tools","global!tinymce.ui.Factory","global!tinymce.DOM","global!tinymce.ui.FloatPanel","tinymce.modern.ui.Toolbar","tinymce.modern.ui.Menubar","tinymce.modern.ui.ContextToolbars","tinymce.modern.ui.A11y","tinymce.modern.ui.SkinLoaded"],function(e,t,n,i,o,r,a,l,s){return{render:function(e,c,u){var d,m,f=e.settings;f.fixed_toolbar_container&&(m=n.select(f.fixed_toolbar_container)[0]);var b=function(){if(d&&d.moveRel&&d.visible()&&!d._fixed){var t=e.selection.getScrollContainer(),i=e.getBody(),o=0,r=0;if(t){var a=n.getPos(i),l=n.getPos(t);o=Math.max(0,l.x-a.x),r=Math.max(0,l.y-a.y)}d.fixed(!1).moveRel(i,e.rtl?["tr-br","br-tr"]:["tl-bl","bl-tl","tr-br"]).moveBy(o,r)}},y=function(){d&&(d.show(),b(),n.addClass(e.getBody(),"mce-edit-focus"))},h=function(){d&&(d.hide(),i.hideAll(),n.removeClass(e.getBody(),"mce-edit-focus"))},g=function(){d?d.visible()||y():(d=c.panel=t.create({type:m?"panel":"floatpanel",role:"application",classes:"tinymce tinymce-inline",layout:"flex",direction:"column",align:"stretch",autohide:!1,autofix:!0,fixed:!!m,border:1,items:[!1===f.menubar?null:{type:"menubar",border:"0 0 1 0",items:r.createMenuButtons(e)},o.createToolbars(e,f.toolbar_items_size)]}),e.fire("BeforeRenderUI"),d.renderTo(m||document.body).reflow(),l.addKeys(e,d),y(),a.addContextualToolbars(e),e.on("nodeChange",b),e.on("activate",y),e.on("deactivate",h),e.nodeChanged())};return f.content_editable=!0,e.on("focus",function(){u.skinUiCss?n.styleSheetLoader.load(u.skinUiCss,g,g):g()}),e.on("blur hide",h),e.on("remove",function(){d&&(d.remove(),d=null)}),u.skinUiCss&&n.styleSheetLoader.load(u.skinUiCss,s.fireSkinLoaded(e)),{}}}}),a("global!tinymce.ui.Throbber",tinymce.ui.Throbber),r("tinymce.modern.ui.ProgressState",["global!tinymce.ui.Throbber"],function(e){return{setup:function(t,n){var i;t.on("ProgressState",function(t){i=i||new e(n.panel.getEl("body")),t.state?i.show(t.time):i.hide()})}}}),r("tinymce.modern.Theme",["global!tinymce.Env","global!tinymce.EditorManager","global!tinymce.ThemeManager","tinymce.modern.modes.Iframe","tinymce.modern.modes.Inline","tinymce.modern.ui.Resize","tinymce.modern.ui.ProgressState"],function(e,t,n,i,o,r,a){var l=function(n,r,l){var s=n.settings,c=!1!==s.skin&&(s.skin||"lightgray");if(c){var u=s.skin_url;u=u?n.documentBaseURI.toAbsolute(u):t.baseURL+"/skins/"+c,e.documentMode<=7?l.skinUiCss=u+"/skin.ie7.min.css":l.skinUiCss=u+"/skin.min.css",n.contentCSS.push(u+"/content"+(n.inline?".inline":"")+".min.css")}return a.setup(n,r),s.inline?o.render(n,r,l):i.render(n,r,l)};return n.add("modern",function(e){return{renderUI:function(t){return l(e,this,t)},resizeTo:function(t,n){return r.resizeTo(e,t,n)},resizeBy:function(t,n){return r.resizeBy(e,t,n)}}}),function(){}}),i("tinymce.modern.Theme")()}();