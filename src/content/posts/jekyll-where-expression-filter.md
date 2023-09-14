---
title: The Where Expression Filter in Jekyll 3.2
date: 2016-09-31 03:00:00 -05:00
category: web-development
tags:
- Jekyll
- Web Development
layout: post
---
If, like me, you’ve been distracted by all the changes to gem based themes in the last two releases of [Jekyll](https://jekyllrb.com) you may have missed the addition of this humble new filter: `where_exp`.

**Spoiler: It’s awesome**

Now the `where` filter has been around for a while—it lets you pre-filter an array before iterating over its contents, for  instance:

```liquid
{% raw %}
{% assign fascists = site.fascists | where:”era”,”21st Century” %}
{% for fascist in fascists %}
    {{ fascist.name}}, {{ fascist.country }}<br>
{% endfor %}
{% endraw %}

=> Donald Trump, United States
   Vladimir Putin, Russia
   Nikolaos Michaloliakos, Greece
```

That’s great, but what if you want to filter for a single value in an array or hash. Let’s say each document in our fascist collection has a properties field that enumerates their [fascist ideology](https://en.wikipedia.org/wiki/Definitions_of_fascism). With the `where_exp` filter then, we could do something like this:

```liquid
{% raw %}
{% assign fascists = site.fascists | where_exp: "fascist", "fascist.properties contains 'Contempt for the Weak'" %}

{% for fascist in fascists %}
    {{ fascist.name }}<br>
{% endfor %}
{% endraw %}
=> Donald Trump
   Adolf Hitler
```

This makes things so much easier than it used to be. Rather than having to iterate over each item in the collection to check for the right fascist ideology—this is also a pain when having to deal with empty sets, setting headers, etc.—we can simply use the filter. **Note:** both the `where` and the `where_exp` filters are unique to Jekyll and are not actually part of [Liquid](https://shopify.github.io/liquid/basics/types/).

Maybe it’s just me, but the pace of change in Jekyll seems to have picked up quite a bit. As more and more people move to decoupled systems with a static component it’s good to see Jekyll modernize to meet the new demand.
