---
title: Jekyll Tag Archive Pages
date: 2016-02-03 03:00:00 -05:00
category: web-development
tags:
- Web Development
- Jekyll
layout: post
---

<p>If you’ve ever built a site with <a href="http://jekyllrb.com">Jekyll</a>, chances are pretty good that at some point you’ve asked yourself—how do I setup tag archive pages? The truth is that it’s kind of a pain. </p>

<img src="/images/jekyll-tags.jpg" alt="">

<p>Jekyll won’t do it for you out of the box. You could write your own ruby to do it—but if you’re using <a href="https://help.github.com/articles/using-jekyll-with-pages/">GitHub Pages</a> to build the site, your plugin won’t work. You could build the site locally and then push the output to GitHub Pages—but if other people need to update the site, welcome to the bottleneck. You could manually create them—but if you’re handing the site off to a client, that’s not really sustainable. </p>

<p><strong>Once all other options have been exhausted, the answer must be javascript.</strong></p>

<!--more-->

<p>Just to be clear: When I say ‘tag archive pages’ I mean a page for each tag that displays all posts on the site using that tag. It’s a very common pattern for most blog-like sites.</p>

<p>So, how to do this on a static site with Javascript? Well, one option is to pass the requested tag via a <a href="https://en.wikipedia.org/wiki/Query_string">query string</a> in the URL, and then use that variable to show the right posts. </p>

<p>It’s just text, so I opted for a single index page that lists all the posts grouped by tag—with each block hidden by default. Then I can just grab that tag variable and show the right block. Here’s a <a href="https://gist.github.com/BryanSchuetz/443f1600d772c2e2bd9d#file-jekyll-tag-archive-pages-liquid">Gist</a> so you can get the gist…</p>

~~~liquid
{% raw %}
 {% assign sorted_tags = site.tags | sort %}
  {% for tag in sorted_tags %}
    <div class="tag-archive--block" id="{{ tag | first | slugify }}">
      <h2>{{ tag | first }}</h2>
      {% assign posts = tag | last %}
      {% for post in posts %}
            <p><strong><a href="{{ post.url }}">{{ post.title }}</a></strong>
      {% endfor %}
    </div>
  {% endfor %}
  <script type="text/javascript">
  {% for tag in sorted_tags %}
    if(location.search == "?tag={{ tag | first | slugify }}"){
      $('#{{ tag | first | slugify}}').show();
    }
  {% endfor %}
  </script>
{% endraw %}
~~~

<p>I thought for a moment about building out my index of posts as a JSON file and then using JQuery to parse and display the right posts—but after looking at the performance of the above solution, going through JSON seemed like overkill.</p>
