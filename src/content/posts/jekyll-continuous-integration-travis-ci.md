---
title: Jekyll and Continuous Integration with Travis CI
date: 2016-02-20 03:00:00 -05:00
tags:
- Jekyll
- Web Development
category: web-development
layout: post
---


Using GitHub Pages to host your Jekyll site is great—it’s fast, secure, and free (as in beer)—but it’s also restrictive. There’s a [whitelist](https://pages.github.com/versions/) of plugins Jekyll can build with, but it’s pretty limited. If you want to run your own plugins or post build scripts there’s no automated way to do that.

Of course, you could just build the site locally, and then deploy it—but if the site is for a client, or if you’re collaborating with others, that’s not really going to be sustainable.

One way around GitHub’s restrictions that I’ve been considering lately is using a continuous integration service like [Travis CI](https://travis-ci.org). Basically, Travis looks for updates to a GitHub repo, clones the given branch, builds the site, runs any post-build scripts you want, and then commits the site straight to the GH-Pages branch for hosting.

![Travis Output](images/travis.jpg)

This lets authors and content managers, using something like [Siteleaf](http://v2.siteleaf.com), add content as they wish—when they hit publish and the changes are sync’d to the repo, Travis takes over, builds the site, and then deploys it back to GitHub. Travis is primarily used for testing code in pull requests before merging it with a master branch. If we wanted to include tests into our workflow we could, but I’m mostly just interested in using it to build and deploy.

There are a couple hoops to jump through to get this all working, obviously. As an example, you can see the files I’m using with Travis to generate this very site below:

* Setup a Travis CI account
* Enable the repository you want it to work with. You can set it to build on pushes, pulls or both.
* Add a [travis.yml](https://github.com/BryanSchuetz/newsignal/blob/master/.travis.yml) file to the root of your repo. The file will tell Travis how to build and deploy. Travis will run a bundle install before getting started so make sure any gems you need are in your Gemfile.
* Add a [deploy.sh](https://github.com/BryanSchuetz/newsignal/blob/master/deploy.sh) script that Travis will use to commit the build directory to the gh-pages branch of the repo.
* You’ll also need to generate a [personal access token](https://github.com/blog/1509-personal-api-tokens) with GitHub and use it to set a GITHUB_URL environment variable in Travis. This will point to the remote repo to be used when Travis commits the built site. e.g.: https://[personal-access-token]@github.com/username/repo.git

That’s it, mostly. As always, there are a few landmines to look out for. You want to make sure that your _config.yml file excludes the vendor directory, or Jekyll will try to include those when it builds. Also, if you’re having Travis install any Node dependencies you will want to exclude them as well.
