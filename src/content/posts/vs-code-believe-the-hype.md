---
title: 'VS Code: Hope, Hype, and Hijacking'
date: 2018-02-21 22:00:00 Z
tags:
- Tooling
- Text Editors
layout: post
category: tooling
---

I've always been a bit promiscuous with my text editors. The whole chronology probably looks a little something like this:

> Dreamweaver => Coda => BBEdit => TextMate => Espresso => Sublime Text => Espresso _(again)_ => Sublime Text 2 => Atom => TextMate _(again)_ => BBEdit _(again)_ => Sublime Text 2 _(again)_ => Espresso _(yet again)_ => Sublime text 3 => Atom _(again)_ => Espresso _(yet again, again)_ => Sublime Text 3 _(again)_ => VS Code.

As you can see, I'm not shy about "picking up stakes" and moving from one to another—and back again. I'd like to think that I'm always **hopeful** for better features, performance, extensibility, etc.—that I'm always looking for ways to procrastonate, and avoid acutally doing any work with the editor du jour is probably closer to the mark. Nevertheless, my promisquity has given me a pretty good sense for what does and doesn't make for a good editor.

![Espresso App](/images/espresso.png)

From a purely UI/UX perspective I still think [Espresso](https://espressoapp.com) is one of the most elegant editors I've ever used—unfortunately its workflow model is a bit anachronistic. I really appreciate the thought that went into some of the features like [Dynamo](http://help.espressoapp.com/dynamo/)—their proprietary static site generator—but ultimately, it's playing in the proverbial walled garden. And, I can't remember the last time I used FTP to send files to the server.

Like most, I've welcomed our new decoupled, extension based, Git enabled, [Electron App](https://electronjs.org) overlords—and it's probably for the best. Electron apps will never be as blazingly fast as a well written native app, but [VS Code](https://code.visualstudio.com) does "OK"—better than [Atom](https://atom.io), I think. The Git integration is nice, though I do most of that stuff from the command line anyway. What really gets me are the extensions and the configuration. Granted, it's a pain in the ass to setup—Sublime is too—and though VS Code makes it easier than most, it still takes a real investment to get everything configured as you'd like. But the good news is that everything, and I mean _everything_ is configurable, and the extensions are killer.

## Killer Extensions

All the usual suspects are there: git gutter, file icons, linting, Emmet, syntax highlighting for every language you can imagine (these are much easier to fine-tune to your liking in VS Code). The _IntelliSense_—Microsoft's version of code completion/hinting—extensions are what really seal the deal though.

![VS Code](/images/vscode.png)

Sure, you get hinted to the right method in Ruby, or ES6—but better than that, you can autocomplete on [filenames](https://marketplace.visualstudio.com/items?itemName=christian-kohler.path-intellisense), [CSS class names](https://marketplace.visualstudio.com/items?itemName=Zignd.html-css-class-completion), even [Sass variable, mixin, and function names](https://marketplace.visualstudio.com/items?itemName=mrmlnc.vscode-scss)—I _never_ remember that stuff. There's no lack of **hype** around VS Code right now—but on the whole, I'd say it's living up to it.

## Hijacking the Community

Honestly, I feel kind of bad for the Sublime Text folks. Atom, and now VS Code are in many ways a direct hijack of the package/plugin/extension approach—pioneered in TextMate and brought to scale in Sublime—to say nothing of the command pallete, and some other directly hijacked bits of UI. It's telling that the [extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode.sublime-keybindings) which ports Sublime keyboard shortcuts over to VS Code already has 1/2 a million downloads. But just like any other suffeciently advanced technology these days—it's the ecosystem that really matters. When TextMate was TextMate, there was a vibrant community around it—creating bundles, themes, and addons—this made the editor much more than it could have been on its own. When development of newer versions stalled, the community moved on to Sublime—and did it all over again. Today VS Code has the community mindshare, but what came before is never really lost—most of the syntax files I've seen for VS Code are still based on the original TextMate Grammar scheme from 2004.