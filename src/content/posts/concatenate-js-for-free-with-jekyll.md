---
title: Concatenate JS for Free with Jekyll
category: web-development
date: 2018-04-15 22:00:00 Z
tags:
- Jekyll
- Web Development
layout: post
socialImage: '/images/concatenate.png'
---

This one's a stupid little trick, but I literally use it all the time, and I'm always surprised how novel people find it when I explain it to them. **Basically: use Liquid includes in a bundle.js file, and let Jekyll smash all your .js crap together for you.**

Jekyll will parse any file that has a [YAML](http://yaml.org) front matter block at the top of the file. So, just drop one of those suckers at the top of your JS file and include your scripts in the order you need them. 

`bundle.js`:

~~~liquid
{% raw %}
---
---

{% include _vendor/turbolinks.js %}
{% include _vendor/isotope.js %}

//More Awesome JS Stuff Below{% endraw %}
~~~

When Jekyll hits `bundle.js` it will grab your partials and drop them into the file right where they should be. You may still want to minify, etc.—though your vendor files are probably already ugly. This is a super simple, no overhead, low config way to concatenate all your js crap together—**letting Jekyll do what Jekyll does best: parse files**. 