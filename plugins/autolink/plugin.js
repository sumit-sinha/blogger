tinymce.PluginManager.add("autolink",function(t){function e(t){o(t,-1,"(")}function n(t){o(t,0,"")}function i(t){o(t,-1,"")}function o(t,e,n){function i(t,e){if(e<0&&(e=0),3==t.nodeType){var n=t.data.length;e>n&&(e=n)}return e}function o(t,e){1!=t.nodeType||t.hasChildNodes()?s.setStart(t,i(t,e)):s.setStartBefore(t)}function r(t,e){1!=t.nodeType||t.hasChildNodes()?s.setEnd(t,i(t,e)):s.setEndAfter(t)}var s,a,d,l,c,g,u,h,C,k;if("A"!=t.selection.getNode().tagName){if((s=t.selection.getRng(!0).cloneRange()).startOffset<5){if(!(h=s.endContainer.previousSibling)){if(!s.endContainer.firstChild||!s.endContainer.firstChild.nextSibling)return;h=s.endContainer.firstChild.nextSibling}if(C=h.length,o(h,C),r(h,C),s.endOffset<5)return;a=s.endOffset,l=h}else{if(3!=(l=s.endContainer).nodeType&&l.firstChild){for(;3!=l.nodeType&&l.firstChild;)l=l.firstChild;3==l.nodeType&&(o(l,0),r(l,l.nodeValue.length))}a=1==s.endOffset?2:s.endOffset-1-e}d=a;do{o(l,a>=2?a-2:0),r(l,a>=1?a-1:0),a-=1,k=s.toString()}while(" "!=k&&""!==k&&160!=k.charCodeAt(0)&&a-2>=0&&k!=n);s.toString()==n||160==s.toString().charCodeAt(0)?(o(l,a),r(l,d),a+=1):0===s.startOffset?(o(l,0),r(l,d)):(o(l,a),r(l,d)),"."==(g=s.toString()).charAt(g.length-1)&&r(l,d-1),(u=(g=s.toString()).match(f))&&("www."==u[1]?u[1]="http://www.":/@$/.test(u[1])&&!/^mailto:/.test(u[1])&&(u[1]="mailto:"+u[1]),c=t.selection.getBookmark(),t.selection.setRng(s),t.execCommand("createlink",!1,u[1]+u[2]),t.settings.default_link_target&&t.dom.setAttrib(t.selection.getNode(),"target",t.settings.default_link_target),t.selection.moveToBookmark(c),t.nodeChanged())}}var r,f=/^(https?:\/\/|ssh:\/\/|ftp:\/\/|file:\/|www\.|(?:mailto:)?[A-Z0-9._%+\-]+@)(.+)$/i;t.settings.autolink_pattern&&(f=t.settings.autolink_pattern),t.on("keydown",function(e){if(13==e.keyCode)return i(t)}),tinymce.Env.ie?t.on("focus",function(){if(!r){r=!0;try{t.execCommand("AutoUrlDetect",!1,!0)}catch(t){}}}):(t.on("keypress",function(n){if(41==n.keyCode)return e(t)}),t.on("keyup",function(e){if(32==e.keyCode)return n(t)}))});