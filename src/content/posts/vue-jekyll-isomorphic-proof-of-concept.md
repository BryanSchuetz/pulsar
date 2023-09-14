---
title: 'A Vue & Jekyll Proof of Concept'
date: 2017-07-11 03:00:00 -05:00
tags:
- Web Development
- Vue
- Jekyll
layout: post
category: web-development
---

I've been continuing to play around with an isomorphic(ish) approach to building sites with [Jekyll](https://jekyllrb.com) and [Vue](https://vuejs.org). In my [last post](vue-routing-with-jekyll), I looked at routing, navigation, and the history API. This time I look at sharing data, templating, and bringing it all together. Believing that the best way to "learn a thing", is to just "build a thing"—I wen't ahead and built out a [little example application](https://culture-namer.surge.sh) that brings all this stuff together in a single working site. The Vue code is super rough (still just learning)—*I should be using props to pass down ship data from the home component to the ship component, I should add in transitions so moving through the routes looks smoother, etc.*—but, "it works"™. 

**The Key Bits: works with/without JS, static pages and real URLS for SEO and usability, it's fast un-optimized, and... Culture ships are cool.**

![Culture Namer](/images/namer.gif)

## Why use Jekyll at all?

Before we get in too deep—It's worth pointing out that you *could* just use Vue to render the static pages. Or you could run Vue on the server and have it render pages on the fly—something like [Nuxt](https://nuxtjs.org) comes in handy for these types of things. If your primary concern is universal rendering—there's no real reason to even reach for Jekyll. However, **Jekyll is great**. If you're building a decoupled CMS, there's lots of reasons why you might want to use Jekyll for the static bit—not the least of which, is that services like [Siteleaf](https://www.siteleaf.com) mean that you can easily add in a slick web-based interface for writers, editors, and content managers.

## Sharing the data and getting all isomorphic

The real trick here is using one set of data to render both sets of views—one for the server and one for the client. So step one is building some JSON endpoints where Vue can consume the site, ship, ship-type, and book data used by Jekyll. Since we're bundling our Vue code from the same repo as our Jekyll code we could just include the data directly via Webpack—but this may not always be the case (and, depending on the view, we may not always need all the data), so we'll use [Axios](https://github.com/mzabriskie/axios) to pull on the endpoints as needed.

We setup `_ships` as a collection in Jekyll so each ship has its own Markdown file and frontmatter, indicating the ship type, the book it first appeared in, its name, and so on. So, we just step through all that, and generate the JSON file for Vue with Liquid. We'll do the same thing with our `_data` files, one for the app (basic site level data like, site title, description, etc.), one for books, and one for ship-types.

```liquid
{% raw %}---
title: shipData
---
[{% for ship in site.ships %}{
  "name": "{{ ship.title }}",
  "url": "{{ ship.url }}",
  "content": "{{ ship.content | strip_html | strip_newlines | remove:"Note: " | remove:'"'}}",
  "typeAbrev": "{{ ship.type-abrev }}",
  "typeLong": "{{ ship.type-long }}",
  "book": "{{ ship.book }}"
  }{% unless forloop.last %},{% endunless %}{% endfor %}]{% endraw %}
```

## Using Vue-Axios

Now that we've got our data endpoints, we can bring them into our Vue app. We use the `created()` hook (which triggers after the instance has been created, and data observation has already been setup) to update the existing `siteData` and `shipData` objects.

```javascript
{% raw %}data () {
    return {
      siteData: [],
      shipData: [],
    }
  },
  created(){
    axios.get('/data/data.json').then(response => this.siteData = response.data);
    axios.get('/data/ships.json').then(response => this.shipData = response.data);
  }{% endraw %}
```

Then we just dip into those data objects from each component as we need them. Below are the ship page views for both Jekyll and Vue. In Jekyll, each document in the collection gets its own URL. In Vue we'll have to grab the ship name from the URL params and then pull the related data from `shipData`. In Jekyll we'll use the `where_exp` filter to connect the `book.yml` and `ship-type.yml` to the current ship. In Vue we'll have to use the `v-for` and `v-if` directives. Those types of differences aside, building templates for both Vue and Jekyll is remarkably simillar.

## The Vue View

```html
{% raw %}<div id="content" v-for="ship in shipData" v-if="ship.url.includes($route.params.name)">
      <h3>{{ ship.name }}</h3>
      <p>This ship first appeard in the book <a v-for="book in bookData" v-if="ship.book === book.name" v-bind:href="book.url">{{ ship.book }}</a>—the ship is a <strong>{{ ship.typeLong }} ({{ ship.typeAbrev }})</strong>. <span v-for="type in shipTypeData" v-if="ship.typeAbrev === type.type">{{ type.description }}</span></p>
      <p v-if="ship.content.length > 0"><span class="note">Note:</span> {{ ship.content }}</p>
    </div>
    <div class="button"><a v-on:click.prevent="$router.push(shipData[Math.floor(Math.random() * shipData.length)].url)" class="btn btn--lg btn--green">Pick a Random Ship</a></div>{% endraw %}
```

## The Jekyll View

```html
{% raw %}<div id="content">
    <h3>{{ page.name }}</h3>
    <p>This ship first appeared in the book <a href="{{ book[0].booklink }}">{{ page.book }}</a>—the ship is a <strong>{{ page.type-long }} ({{ page.type-abrev }})</strong>. {{ type[0].description }}</p>
    {{ content }}
    <div class="button"><a href="{{ ship.url }}" class="btn btn--lg btn--green">Pick a Random Ship</a></div> 
  </div>{% endraw %}
```

That they look so simillar, is a testament to just how intuitive it is to build templates in Vue—because Jekyll is wicked easy. As I said, my Vue code is still a bit rough—I assume there must be a better way to compare properties between `shipData` and `BookData` than stepping through each item, I just don't know what it is right now—I guess I should be abstracting that out into a `<template>`? 

Regardless, the point here is that there's one store of data being used to populate two different views—one of those is generated at build time and shipped from the server, the other is generated on the client side (after the server ships down the necessary JSON).

## Bringing it all together

This has been a fun little side project to mess with in my free time—and I'll probably use this little [boilerplate template](https://github.com/BryanSchuetz/vue-jekyll) for any Vue/Jekyll projects I build in the future, though none spring to mind. On the whole, I think this type of isomorphic approach has a lot of promise—*though it is kind of a pain to have to biuld out all the views twice*. It would be easier just to use Nuxt or the like—but if I'm building anything that non-technical users will need to interact with, I would prefer the ease and security of a Jekyll + Vue approach. One thing's for sure, Vue is really great—and I'm looking forward to spending some more time getting to know it.
