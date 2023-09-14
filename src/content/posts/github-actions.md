---
title: Using GitHub Actions to Deploy your Jekyll Site
category: web-development
date: 2018-12-01 22:00:00 Z
tags:
- Jekyll
- Web Development
- GitHub Actions
layout: post
---

**UPDATE: Github Actions API has been updated, [See here for an updated version of what's discussed below](/github-actions-redux)**

A few weeks ago, I got invited into the limited beta for [GitHub Actions](https://github.com/features/actions). In case you've not heard of *Actions* before—it's GitHub's pitch for the future of continuous integration/deployment of GitHub repos. As has been said:

> The future has arrived, it's just not evenly distributed yet. --Apocryphal William Gibson

Is *Actions* the future? I don't know, but after playing with the beta for a bit—I do think it's pretty cool. Even for something relatively straightforward like building a Jekyll site—the immediate advanages are obvious. 

* Want to use those custom Jekyll plugins that GitHub Pages has always blocked? **No problem**. 
* Want to update your search index with newly built pages everytime you deploy? **Sure thing**.
* Want to run some NPM scripts to compress, concatenate, autoprefix, ship, resize, slice, or dice any, some, or all of your assets? **Errr...OK**.
* Want to do it all while staying on GitHub...for free? **Let's do this**.

## Setting Up Your Workflow

Once we have access to *Actions* we can start things off by adding a `do-stuff.workflow` file in a `.github` directory sitting in the root of our repository. Github includes a little visual editor you can use to setup your workflow, but I found this to be more trouble than it was worth. Essentially: our workflow needs to identify itself, indicate a trigger, point to an action, and include any secrets or environment variables the action will need.

```json
workflow "Deploy Site" {
  on = "push"
  resolves = ["Build and Deploy Jekyll"]
}

action "Build and Deploy Jekyll" {
  uses = "BryanSchuetz/jekyll-deploy-gh-pages@master"
  secrets = ["GITHUB_TOKEN"]
}
```

## Building the Action

In the action directory we need a couple things:

* `Dockerfile` We'll use Docker to setup a container within which we can import ruby and jekyll and any other gems we'll need to build our site.
* `Entrypoint.sh` This is where [the heart of our action](https://github.com/BryanSchuetz/jekyll-deploy-gh-pages/blob/master/entrypoint.sh) lives. We'll install all our Gem dependencies, build the site, initialize and setup Git, and then push all the site files back to the gh-pages branch of our repo.
* `README.md` Explain what the action does. One of the nicer features of *Actions* is that creators can expose them in a [public repo](https://github.com/BryanSchuetz/jekyll-deploy-gh-pages)—so that other users can call them from their own workflows! 

![Action Log](/images/actions.png)

## Try it Out

As mentioned above, I've put this action in [its own public repository](https://github.com/BryanSchuetz/jekyll-deploy-gh-pages) so anyone can point to it and use it to build and deploy their own Jekyll site. Or, just have a look around and see how I've sructured things—I'm sure there are efficiences I could make—if you have any suggestions, please let me know.

