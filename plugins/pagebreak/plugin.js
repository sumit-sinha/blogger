tinymce.PluginManager.add("pagebreak",function(e){var a=e.getParam("pagebreak_separator","\x3c!-- pagebreak --\x3e"),t=new RegExp(a.replace(/[\?\.\*\[\]\(\)\{\}\+\^\$\:]/g,function(e){return"\\"+e}),"gi"),n='<img src="'+tinymce.Env.transparentSrc+'" class="mce-pagebreak" data-mce-resize="false" data-mce-placeholder />';e.addCommand("mcePageBreak",function(){e.settings.pagebreak_split_block?e.insertContent("<p>"+n+"</p>"):e.insertContent(n)}),e.addButton("pagebreak",{title:"Page break",cmd:"mcePageBreak"}),e.addMenuItem("pagebreak",{text:"Page break",icon:"pagebreak",cmd:"mcePageBreak",context:"insert"}),e.on("ResolveName",function(a){"IMG"==a.target.nodeName&&e.dom.hasClass(a.target,"mce-pagebreak")&&(a.name="pagebreak")}),e.on("click",function(a){"IMG"===(a=a.target).nodeName&&e.dom.hasClass(a,"mce-pagebreak")&&e.selection.select(a)}),e.on("BeforeSetContent",function(e){e.content=e.content.replace(t,n)}),e.on("PreInit",function(){e.serializer.addNodeFilter("img",function(t){for(var n,r,c=t.length;c--;)if(n=t[c],(r=n.attr("class"))&&-1!==r.indexOf("mce-pagebreak")){var o=n.parent;if(e.schema.getBlockElements()[o.name]&&e.settings.pagebreak_split_block){o.type=3,o.value=a,o.raw=!0,n.remove();continue}n.type=3,n.value=a,n.raw=!0}})})});