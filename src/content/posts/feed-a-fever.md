---
title: Feed a Fever
category: tooling
date: 2009-06-01 22:00:00 Z
tags:
- Interwebz
layout: post
---


I’ve gone through a number of different solutions for managing my RSS feeds. It’s been an ongoing evolution from Live Bookmarks to BlogLines to GoogleReader to NetNewsWire to my most recent solution, using sync’d versions of NewsFire. I absolutely love NewsFire and lets face it <a href="http://www.newsfirex.com/blog/">Dave Watanabe</a> knows how to make some beautiful OS X applications. 

One simple problem though that all these tools share is the unavoidable issue with the subscription model. Simply put, the more subscriptions you have the more subscriptions you have to read. My own limit is about 200 feeds and even then I often get behind and have to mark as read 100s of articles at a time without having so much as a glance at the headline. Opening up the newsreader and seeing unread counts pile also takes a mental toll and loads up the guilt. I end up avoiding feeds that publish frequently and almost never add new subscriptions because I know they’ll end up unread.

Enter <a href="http://feedafever.com/">Fever</a>, a news reader from Shaun Inman. To call it simply a news reader doesn’t really do it justice. As Inman himself puts it:<br>

<blockquote>“Born of (almost) a decade of accumulating and failing to keep up with hundreds of feeds, Fever is a self-hosted recommendation engine for content you’re already subscribed to built atop a full-featured feed reader.”</blockquote>

Fever gives you two basic categories for subscriptions, Kindling and Sparks. Kindling is meant for those feeds that are must-read. Sparks is for feeds that publish quite frequently but have a much lower signal-to-noise ratio than those in Kindling. Fever analyzes the links shared amongst your feeds and uses sparks to identify and elevate those articles that are getting a lot of attention within your network of subscriptions.

The idea is that I never have to worry about unread counts in Sparks. I don’t even ever have to go in there, instead important stories are identified and pulled out by Fever for special attention on the Hot page. The best part is that the more feeds you add in the better the application gets at making recommendations. 

I should note that Fever is not a desktop application, it’s a PHP – SQL – HTML – CSS solution that you need to host on your own server. I’ve been playing with it for a couple weeks now and so far so good. I’m still trying to get a handle on fine tuning Sparks vs. Kindling and I still have a backlog of sites that need to be added in. I’m hopeful though that this may be the final answer to my RSS dilemma. 

<strong>Update:</strong> Well after a couple weeks of using Fever I’m afraid to say it just doesn’t make the cut. It’s a neat idea and the multi-week analysis of trends works well enough but it’s just not a good fit for how I’m reading my news.  Trend analysis for periods shorter than a week seem to get overwhelmed by a few popular sites (BoingBoing, Engadget, etc.). Also the fact that it’s web based is a bit of a drawback when it comes to the UI. A really well designed/developed website (which Fever certainly is) is still in the end just a website even if you are running it in a site specific browser. So.. back to NewsFire for me. I will miss the iPhone app and the ease of use across multiple machines though. Oh well, the search continues. 


