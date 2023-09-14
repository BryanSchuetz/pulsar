---
title: Open Table Alerts
category: web-development
date: 2015-02-03 17:00:00 Z
tags:
- Web Development
- D.C.
layout: post
---
Sometimes I forget to do stuff. Like making reservations for Valentines Day Dinner weeks and weeks in advance because the girl wants to go to some super popular restaurant. What to do? Well, if the restaurant refuses to keep a stand-by list and is wired up to something like <a href="http://opentable.com">Open Table</a> it's not as bad as you might think.

<img src="/images/resicat.jpg" alt="">

I knocked up this quick script to query Open Table for available reservations for 2 with the target restaurant at 7:00pm on the 14th. If it's still all booked up, I'll get a very sad notification from Resicat letting me know. If there's a cancellation and something opens up, Resicat will speak up and give me a link to book the newly opened table.

<!--more-->

Then I created a <a href="http://en.wikipedia.org/wiki/Launchd">launchd daemon</a> to run the script every 15 minutes. As it gets down to the wire, perhaps I'll have it run more frequently. I actually wrote this script last year when I crossed wires with the girl regarding a birthday dinner—it worked great and we were able to grab a cancelled table with no trouble. Since then it looks like Open Table has started rolling out its own <a href="http://alerts.opentable.com/login">alerts service</a>, but it's an invite only beta at the moment, and only works in NYC and LA.


Once I can get a Hot Tables login I'll probably set Resicat free but untill then he'll stay on the job, and I'm certain he won't let me down.

<strong>Update:</strong> Well, <a href="http://twitter.com/BryanSchuetz/status/566346541557121025/photo/1">Resicat came through at the last moment</a>. I'd almost given up, but with just a day left he finally found a table—there were a couple, I guess the restaruant puts them all into the system at once. I clicked the notificaiton and grabbed the one for 6:45, perfect. Thanks Resicat, see you next year.