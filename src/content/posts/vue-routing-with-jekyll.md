---
title: Vue Routing with Jekyll
date: 2017-04-05 03:00:00 -05:00
tags:
- Web Development
- Vue
- Jekyll
layout: post
category: web-development
---
I've been continuing to play around with an [isomorphic-ish](/vue-and-jekyll) approach to building sites with [Jekyll](jekyllrb.com) and [Vue](vuejs.org)—this week is routing. After we've pulled down the first page from the server, and begun relying on Vue, we still want to be able to move through the site while updating the URL, preserving the window's history, and keeping things (components, sections, pages, etc.) organized in a way that makes sense—without resetting the whole DOM, obviously. 

Luckily, the [built in router](https://router.vuejs.org/en/) for V2 let's us do all this stuff. Of course, we don't _have to_ use the official router, we could drop in our own, or use one off the shelf—but theirs seems pretty great honestly. 

## Dynamic Matching & the History API

Once we've imported the module `import VueRouter from 'vue-router'` and told Vue to use it `Vue.use(VueRouter)`, defining the routes is straightforward:

```javascript
{% raw %}const routes = [
  { path: '/about', component: Page },
  { path: '/ship/:name', component: Ship }
]{% endraw %}
```

We can define the routes manually, or use dynamic matching as you see above. We get back the matched value at `$route.params.name` so we can use the variable to do things like conditionally loading a block. This is how we'll navigate around the site, after the first page load—instead of asking the server for a new page, we'll either swap in a new component or grab the paramater from the route to update an existing one.

If we set `mode: 'history'` on the router object, we can use the `history.pushState()` method introduced with HTML5 to preserve our browsing history and reflect the changes we're making to the DOM, in the URL. 

```javascript
{% raw %}const router = new VueRouter({
  mode: 'history',
  routes 
}){% endraw %}
```

So, looking at a ship entry for Sanctioned Parts List the URL will read `/ship/santioned-parts-list`. **Because we're doing this in an isomorphic-ish way, we don't have to worry about direct requests to that URL getting 404'd**—a static version of the page already exists on the server thanks to Jekyll.

## Programatic Navigation

We can use `<router-link to='/about'>About</router-link>` to explicitly link to a route—or we can use the router's instance methods to navigate programatically `router.push('/ship/little-gravitas')`. If, for instance we wanted to generate a random link to a page, we could abstract that logic out into a separate method and then call it with an `v-on:click` directive `<button @click="getShip">Generate Ship</button>`.

## Moving on from Here

Next up, is to figure out how to build templates for both Jekyll and Vue that leverage as much of the same code as possible. As a single source of data drives both views, the templates should also share as much as possible.






