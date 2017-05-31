tinymce.PluginManager.add("toc",function(e){function t(t){return e.schema.isValidChild("div",t)}function n(t){return t&&e.dom.is(t,"."+u.className)&&e.getBody().contains(t)}function o(){var t=this;t.disabled(e.readonly||!r()),e.on("LoadContent SetContent change",function(){t.disabled(e.readonly||!r())})}function a(e){var t,n=[];for(t=1;t<=e;t++)n.push("h"+t);return n.join(",")}function r(){return!(!u||!c(u).length)}function c(t){var n=a(t.depth),o=m(n);return o.length&&/^h[1-9]$/i.test(t.headerTag)&&(o=o.filter(function(n,o){return!e.dom.hasClass(o.parentNode,t.className)})),tinymce.map(o,function(e){return e.id||(e.id=h()),{id:e.id,level:parseInt(e.nodeName.replace(/^H/i,""),10),title:m.text(e)}})}function l(e){var t,n=9;for(t=0;t<e.length;t++)if(e[t].level<n&&(n=e[t].level),1==n)return n;return n}function i(t,n){var o="</"+t+">";return"<"+t+' contenteditable="true">'+e.dom.encode(n)+o}function d(e){var t=s(e);return'<div class="'+e.className+'" contenteditable="false">'+t+"</div>"}function s(e){var t,n,o,a,r="",d=c(e),s=l(d)-1;if(!d.length)return"";for(r+=i(e.headerTag,tinymce.translate("Table of Contents")),t=0;t<d.length;t++){if(o=d[t],a=d[t+1]&&d[t+1].level,s===o.level)r+="<li>";else for(n=s;n<o.level;n++)r+="<ul><li>";if(r+='<a href="#'+o.id+'">'+o.title+"</a>",a!==o.level&&a)for(n=o.level;n>a;n--)r+="</li></ul><li>";else r+="</li>",a||(r+="</ul>");s=o.level}return r}var u,m=e.$,f={depth:3,headerTag:"h2",className:"mce-toc"},h=function(e){var t=0;return function(){var n=(new Date).getTime().toString(32);return e+n+(t++).toString(32)}}("mcetoc_");e.on("PreInit",function(){var n=e.settings,o=parseInt(n.toc_depth,10)||0;u={depth:o>=1&&o<=9?o:f.depth,headerTag:t(n.toc_header)?n.toc_header:f.headerTag,className:n.toc_class?e.dom.encode(n.toc_class):f.className}}),e.on("PreProcess",function(e){var t=m("."+u.className,e.node);t.length&&(t.removeAttr("contentEditable"),t.find("[contenteditable]").removeAttr("contentEditable"))}),e.on("SetContent",function(){var e=m("."+u.className);e.length&&(e.attr("contentEditable",!1),e.children(":first-child").attr("contentEditable",!0))});var v=function(t){return!t.length||e.dom.getParents(t[0],".mce-offscreen-selection").length>0};e.addCommand("mceInsertToc",function(){var t=m("."+u.className);v(t)?e.insertContent(d(u)):e.execCommand("mceUpdateToc")}),e.addCommand("mceUpdateToc",function(){var t=m("."+u.className);t.length&&e.undoManager.transact(function(){t.html(s(u))})}),e.addButton("toc",{tooltip:"Table of Contents",cmd:"mceInsertToc",icon:"toc",onPostRender:o}),e.addButton("tocupdate",{tooltip:"Update",cmd:"mceUpdateToc",icon:"reload"}),e.addContextToolbar(n,"tocupdate"),e.addMenuItem("toc",{text:"Table of Contents",context:"insert",cmd:"mceInsertToc",onPostRender:o})});