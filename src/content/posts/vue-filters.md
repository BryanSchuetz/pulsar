---
title: Vue Filters
date: 2017-03-16 03:00:00 -05:00
tags:
- Web Development
- Vue
layout: post
category: web-development
---
In [Vue](https://vuejs.org), we can call filters on text just like we would when templating in Liquid with Jekyll. For instance, if we wanted to transform some Markdown into HTML we could do something like this:

```javascript
{% raw %}
...
message: "**The boy stood on the burning deck**, whence all but he had fled; The flame that lit the battle's wreck _Shone round him o'er the dead_."
...
{{ message | markdownify }}
...
{% endraw %}
```
Giving us:

```html
<p><strong>The boy stood on the burning deck</strong>, whence all but he had fled; The flame that lit the battle&#39;s wreck <em>Shone round him o&#39;er the dead</em>.</p>
```
 However, in Vue 2.0 pre-set filters were removed, and the use of filters was restricted to text interpolation and v-bind directives. Adding them back in is pretty painless though. We just include a `filters:` object and define our function:

```javascript
{% raw %}import marked from 'marked'

var app = new Vue({
  el: '#app',
  data: {
    message: "**The boy stood on the burning deck**, whence all but he had fled; The flame that lit the battle's wreck _Shone round him o'er the dead_."
  },
  filters: {
     markdownify: function (val) {
          return marked(val);
     }
  }
}){% endraw %}
```
In this case, we're bringing in [Marked](https://github.com/chjj/marked) and letting it do the heavy lifting. The only problem here is that our mustache tags are going to embed what was returned by the filter as plain text on the page—when what we want, is to embed the HTML. To embed HTML we need to use the `v-html` directive. It would be great if we could do something like `<p v-html="message | markdownify"></p>` but we can only call filters in the mustache and `v-bind` syntax. So, there's a couple things here we could do. We could turn our filter into a method and then call it from within the `v-html` directive:

```javascript
{% raw %}import marked from 'marked'

var app = new Vue({
  el: '#app',
  data: {
    message: "**The boy stood on the burning deck**, whence all but he had fled; The flame that lit the battle's wreck _Shone round him o'er the dead_."
  },
  methods: {
     markdownify: function (val) {
          return marked(val);
     }
  }
}){% endraw %}
```
```html 
<div id="app">
<p v-html="markdownify(message)"></p>
</div>
```
Or, if we want to take advantage of caching—we could store the processed string in a computed property. This way we can process it once, and reuse it whenever we want, without having to call `marked` each time:

```javascript
{% raw %}var app = new Vue({
  el: '#app',
  data: {
    message: "**The boy stood on the burning deck**, whence all but he had fled; The flame that lit the battle's wreck _Shone round him o'er the dead_."
  },
  methods: {
     markdownify: function (val) {
          return marked(val);
     }
  },
  computed: {
    rawmessage: function(){
      return marked(this.message)
    }
  }
}){% endraw %}
```
```html
<div id="app">
{% raw %}{{ rawmessage }}{% endraw %}
</div>
```
Still lot's to learn about Vue, and I wouldn't be surprised if in a month or two I come to realize that I'm doing it all wrong here—but for now, this seems to work. If I'm going to be rendering Markdown via JSON via Jekyll, I imagine I'll be using a mix of these approaches. For body text where I don't have to worry about caching for the next page, I would probably opt for the method option—for headers and navigation, maybe computed properties would make more sense. Or not. I won't be surprised if I come back in a month and completely refactor all this stuff, but I guess that's just how I learn.
