---
title: Vue and Jekyll
date: 2017-03-15 03:00:00 -05:00
tags:
- Jekyll
- Web Development
- Vue
layout: post
category: web-development
---
I've been using [Vue](https://vuejs.org) a bit lately, and I love it. If you're not familiar with it, you should really check it out. In a nut: **it's a client-side JS framework, much like Ember, Angular, React, etc.** It borrows conventions from all those other frameworks and ends up with—what I think anyways—is the simplest, most elegant, client-side framework around. Have a look at [the docs](http://vuejs.org/v2/guide/) and see for yourself.

Now, I'm also a big [Jekyll](https://jekyllrb.com) fan, and love what static sites offer—so I thought why not combine them for the best of both worlds?

## Isomorphic blah blah blah

I know, bear with me. Let's say a user requests a URL from our site and we ship them the pre-rendered static page that's sitting on our CDN. Great, we've used our blinged out CDN with HTTP2/Server Push, extreme caching, asset compression, double cup holders, and cloud bleed to get to first paint in record time—we also sent down a small bit of JSON while we we're at it. Now, if JS is supported, what if the next request didn't have to go to the server at all? What if instead, we used Vue—and a small bit of JSON to build the next page locally, in the browser? **Spoiler: It would be wicked fast**.

![Isomorphic Demo](/images/isomorphic.gif)

The trick then, is to be able to build the same page, with the same data on both the server and the client—an isomorphic view if you will. I'm probably a bit late to the game on all this isomorphic stuff, but better late than never.

I've been playing around with this pattern a bit and put together [this bare-bones template](https://github.com/BryanSchuetz/vue-jekyll) for experiements. Have a look, and check out the demo—turn off Javascript to get the statically rendered page, re-enable JS to see the Vue view. The project relies on [Webpack](https://webpack.js.org), and [NPM](http://npmjs.com) to pull everything together.

I'll be posting more about Vue as I dig in and learn more about it. So far I think it's pretty fabulous. Single file components neatly separate template code from component methods and data, no JSX here. Angular-like directives make doing things like `<p v-for="post in posts"></p>` dead simple. That same kind of simplicty goes for event handling `<button @click="submit.prevent">Submit</button>`, conditional rendering `<div v-if="logged-in">...</div>`, attribute and class binding, and more. Check it out, it's pretty great.





