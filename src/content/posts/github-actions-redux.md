---
title: 'Github Actions V2: Build and Deploy Jekyll'
category: web-development
date: 2019-10-05 22:00:00 Z
tags:
- Jekyll
- Web Development
- GitHub Actions
layout: post
socialImage: '/images/actions2.png'
---

Late last year—after I got my invitation into the beta of Github Actions—[I wrote up](https://distresssignal.org/github-actions) a quick little action and workflow for building and deploying a Jekyll repo back to its gh-pages branch. Mostly I just wanted to see how actions worked. But, this was also a nice way to build a Jekyll site **with my own custom gems and buildscripts** while still keeping the enitre workflow on Github—which is my preference.

Well...when Github said beta, they meant beta. [In August they overhauled the Actions API](https://github.blog/2019-08-08-github-actions-now-supports-ci-cd/) taking it to, what I suppose was alwyays its logical conclusion, a fully fledged continuous integration/continuous deployment service. Support for actions and workflows written against the old API ended last week. So...[I've re-written my simple little action for the new API](https://github.com/BryanSchuetz/jekyll-deploy-gh-pages).

![workflow example](/images/actions.gif)

Keep in mind that as Github says: 'GitHub Actions is currently in limited public beta and is subject to change.' I imagine things _will_ still change quite a bit. The `GITHUB_TOKEN` for instance—an auth token scoped to the repository, for doing things like pushing changes to the repo using the workflow—has limited ability to initiate builds on Github Pages (unless it's being used in a workflow in a private repository), which doesn't really make any sense when you think about it. But, [they're working on it](https://github.community/t5/GitHub-Actions/Github-action-not-triggering-gh-pages-upon-push/td-p/26869).

