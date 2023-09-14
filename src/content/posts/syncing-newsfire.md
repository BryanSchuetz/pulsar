---
title: Syncing NewsFire
date: 2009-02-15 22:00:00 Z
tags:
- OS X
- Hacks
layout: post
category: tooling
---


I just switched all my feed reading over to the newly released 1.6 version of <a href="http://www.newsfirex.com/blog/?p=383">NewsFire</a> and I’m loving it. The interface is gorgeous and the keyboard shortcuts make powering through a large number of feeds a breeze. Add in the new twitter <a href="http://www.newsfirex.com/blog/?p=364">plugin for Safari</a>, subscribe to some key twitter users and you’ve almost rolled your own twitter client. 

There was one problem though, no syncing. If I’m at work paging through some new items, when I get home I want those items to show up as having been read. The solution turned out to be shockingly simple: download the free version of <a href="http://www.getdropbox.com/">Dropbox</a> create some <a href="http://en.wikipedia.org/wiki/Symbolic_link">symbolic links</a> to a few key files on each computer and it’s done. Changes made on one computer are synced through Dropbox and show up on the other.  

Just move this folder:

<code>~/library/application support/newsfire</code>
And this file:

<code>~/Library/preferences/org.xlife.NewsFire.plist</code>
into the DropBox and replace them with symbolic links.  To create a symbolic link just fire up the terminal and use the <a href="http://unixhelp.ed.ac.uk/CGI/man-cgi?ln">ln</a> command. The format will be (ln -s) (filepath to target) (filepath for link), for example:

<code> ln -s /Users/yournamehere/Dropbox/newsfiresymlinks/org.xlife.NewsFire.plist /Users/yournamehere/Library/Preferences</code>
It really is that simple and from what I can see, works like a charm.

<strong>Update:</strong>Depending on the privileges you have when creating the symlink you may need to lock the file after you create it so NewsFire does not over write it when you exit.


