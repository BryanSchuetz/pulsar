---
title: Culture Ship Randomizer
category: web-development
date: 2015-03-22 17:00:00 Z
tags:
- The Culture
- Jekyll
- Web Development
layout: post
---
I have to name things all the time—servers, databases, directories, functions, classes, mixins, etc. It's kind of a pain. As <a href="https://www.quora.com/Why-is-naming-things-hard-in-computer-science-and-how-can-it-can-be-made-easier?share=1">everyone knows</a>:

<blockquote>"There are only two hard things in Computer Science: cache invalidation, naming things, and off-by-one errors."<br>—Phil Karlton</blockquote>

As I've <a href="http://distresssignal.org/jibber-jabber/2015/tier.html">said before</a>, I'm also a big fan of Iain Banks' <a href="http://en.wikipedia.org/wiki/Culture_series">Culture Series</a>. <strong>That's why I built this <a href="http://bryanschuetz.github.io/culture-namer">quick and easy tool</a> to generate Culture Ship names at random, for whenever I need to use a random name</strong>. OK, it was mostly an excuse to learn how Jekyll's newish <a href="http://jekyllrb.com/docs/collections/">collections</a> feature works—but two birds, one stone, and all that. There's even a bundled script for generating names at the command line.

<img src="/images/culture-tools.jpg" alt="">

<!--more-->

<strong>A little background on Culture Ships:</strong> Some of the series' most important characters are the sentient machine based intelligences known as Minds. Each mind at the heart of a Culture Ship has its own unique and distinctive personality. To identify themselves, these ships choose their own names—often reflecting a particular aim or generalized personality. There are <em>a lot</em> of these ships in The Culture, and meeting them has become one of my favorite parts of reading the books. Re-purposing the ship names for random test databases and the like just seemed like a perfect fit to me.

Building out the tool with Jekyll and Github was super simple. Jekyll <a href="http://jekyllrb.com/docs/collections/">Collections</a> and <a href="http://jekyllrb.com/docs/datafiles/">YAML data files</a> let me quickly and easily tie together data about the books and ship classes with specific info for each of the ships. I also included a <a href="http://bryanschuetz.github.io/culture-namer/gravitas.rb">Ruby script</a> that Jekyll builds when generating the site to let me call new names right from the command line. Github makes publishing the whole thing online effortless.

Have a look at the <a href="http://github.com/bryanschuetz/culture-namer/">project repo</a> if you want to learn more.
