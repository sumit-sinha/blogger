import { Injectable } from '@angular/core';

@Injectable()
export class LazyLoadHelper {

  env;
  head;
  pending: any = {};
  pollCount = 0;
  queue = {
    css: [],
    js: []
  };
  styleSheets = document.styleSheets;

  private createNode(name, attrs) {

    const node = document.createElement(name);
    for (const attr in attrs) {
      if (attrs.hasOwnProperty(attr)) {
        node.setAttribute(attr, attrs[attr]);
      }
    }

    return node;
  }

  private finish(type) {
    const p = this.pending[type];
    let callback;
    let urls;

    if (p) {
      callback = p.callback;
      urls = p.urls;

      urls.shift();
      this.pollCount = 0;

      if (!urls.length) {
        if (callback) {
          callback.call(p.context, p.obj);
        }

        this.pending[type] = null;

        if (this.queue[type].length) {
          this.load(type, null, null, null, null);
        }
      }
    }
  }

  private getEnv() {
    const ua = navigator.userAgent;

    this.env = {
      async: document.createElement('script').async === true
    };

    this.env.webkit = /AppleWebKit\//.test(ua);
    if (this.env.webkit == null) {
      this.env.ie = /MSIE|Trident/.test(ua);
    }

    if (this.env.webkit == null) {
      this.env.opera = /Opera/.test(ua);
    }

    if (this.env.webkit == null) {
      this.env.gecko = /Gecko\//.test(ua);
    }

    if (this.env.webkit == null) {
      this.env.unknown = true;
    }
  }

  private load(type, urls, callback, obj, context) {
    const _finish = () => {
        this.finish(type);
      },
      isCSS = type === 'css',
      nodes = [];
    let i, len, node, p, pendingUrls, url;

    if (this.env == null) {
      this.getEnv();
    }

    if (urls) {

      urls = typeof urls === 'string' ? [urls] : urls.concat();

      if (isCSS || this.env.async || this.env.gecko || this.env.opera) {
        // Load in parallel.
        this.queue[type].push({
          urls: urls,
          callback: callback,
          obj: obj,
          context: context
        });
      } else {
        // Load sequentially.
        for (i = 0, len = urls.length; i < len; ++i) {
          this.queue[type].push({
            urls: [urls[i]],
            callback: i === len - 1 ? callback : null,
            obj: obj,
            context: context
          });
        }
      }
    }

    if (this.pending[type] || !(p = this.pending[type] = this.queue[type].shift())) {
      return;
    }

    if (this.head == null) {
      this.head = document.head || document.getElementsByTagName('head')[0];
    }

    pendingUrls = p.urls.concat();

    for (i = 0, len = pendingUrls.length; i < len; ++i) {
      url = pendingUrls[i];

      if (isCSS) {
        node = this.env.gecko ? this.createNode('style', null) : this.createNode('link', {
          href: url,
          rel: 'stylesheet'
        });
      } else {
        node = this.createNode('script', {
          src: url
        });
        node.async = false;
      }

      node.className = 'lazyload';
      node.setAttribute('charset', 'utf-8');

      if (this.env.ie && !isCSS && 'onreadystatechange' in node && !('draggable' in node)) {
        node.onreadystatechange = () => {
          if (/loaded|complete/.test(node.readyState)) {
            node.onreadystatechange = null;
            _finish();
          }
        };
      } else if (isCSS && (this.env.gecko || this.env.webkit)) {
        if (this.env.webkit) {
          p.urls[i] = node.href;
          this.pollWebKit();
        } else {
          node.innerHTML = '@import "' + url + '";';
          this.pollGecko(node);
        }
      } else {
        node.onload = node.onerror = _finish;
      }

      nodes.push(node);
    }

    for (i = 0, len = nodes.length; i < len; ++i) {
      this.head.appendChild(nodes[i]);
    }
  }

  private pollGecko(node) {
    let hasRules;

    try {
      hasRules = !!node.sheet.cssRules;
    } catch (ex) {
      this.pollCount += 1;

      if (this.pollCount < 200) {
        setTimeout(() => {
          this.pollGecko(node);
        }, 50);
      } else {
        if (hasRules) {
          this.finish('css');
        }
      }

      return;
    }

    this.finish('css');
  }

  private pollWebKit() {
    const css = this.pending.css;

    if (css) {
      let i = this.styleSheets.length;

      while (--i >= 0) {
        if (this.styleSheets[i].href === css.urls[0]) {
          this.finish('css');
          break;
        }
      }

      this.pollCount += 1;

      if (css) {
        if (this.pollCount < 200) {
          setTimeout(this.pollWebKit, 50);
        } else {
          this.finish('css');
        }
      }
    }
  }

  css(urls, callback, obj, context) {
    this.load('css', urls, callback, obj, context);
  }

  js(urls, callback, obj, context) {
    this.load('js', urls, callback, obj, context);
  }
}
