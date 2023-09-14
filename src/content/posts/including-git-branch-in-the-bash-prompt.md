---
title: Git Branch in the Bash Prompt
category: tooling
date: 2018-02-25 03:00:00 -05:00
tags:
- Command Line
- Tooling
layout: post
---

Waaaay late on this one—but you know what they say. For a while I've had a text trigger in [iTerm2](http://iterm2.com) to catch and highlight the currently active Git branch—but it never occurred to me to just add it directly into the command prompt.

![command-prompt](/images/prompt.png)

Trivial to do, and super helpful—as soon as you open up the directory, you immediately know what branch you're working in. [Here](https://gist.github.com/BryanSchuetz/f59001a6969bd2e2cae2d63c35a9ec18) is the setup for the prompt looks like, just drop that into your `.bash_profile` and you're all set.
