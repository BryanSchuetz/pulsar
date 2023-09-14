---
title: Environment Variables, Bundler Groups, and Jekyll
category: web-development
date: 2016-03-04 03:00:00 -05:00
tags:
- Jekyll
- Web Development
layout: post
---
Oh my. If you're working with Jekyll and rolling your own build and deployment process, chances are you're slowly but surely accumulating sundry plugins, gems, and build scripts. Some of these are for local development, some are for deploying your site, some are for both—but configured differently for each. How do you manage all this? Bundler groups and environment variables are here to help.

Let's say you're using something like [Jekyll-Assets](https://github.com/jekyll/jekyll-assets) to manage your asset pipeline. You want it to process your Sass, concatenate and compress your Javascript and CSS, and bust cache with [url digests](http://guides.rubyonrails.org/asset_pipeline.html#what-is-fingerprinting-and-why-should-i-care-questionmark)—but you don't want it to do all that stuff all the time. Or maybe you're including a LiveReload script in your page to automatically refresh the browser as you develop locally—no need to have that in production. Luckily, you can tell Jekyll what to do when by setting `JEKYll_ENV`. It defaults to `"development"` and you can set it when building or serving e.g. `JEKYLL_ENV=production jekyll build`. Most plugins like Jekyll-Assets will look for the variable and act accordingly—only compressing and digesting in production, etc. The variable is also available in your templates at `jekyll.environment` so you can include and exclude things as appropriate.

~~~html
{% raw %}
{% unless jekyll.environment == 'production' %}
<script type="text/javascript" src="http://localhost:35729/livereload.js"></script>
{% endunless %}
{% endraw %}
~~~

When it comes to managing your site's dependencies for a given environment, [Bundler's groups](http://bundler.io/v1.5/groups.html) can help out. Organize your Gemfile into the approprate groups to make sure you're loading the right gems when you need them.

~~~ruby
source 'https://rubygems.org'

gem 'github-pages'
gem 'jekyll-paginate'

group :development do
  gem 'guard'
  gem 'guard-livereload'
end

group :production do
  gem 'rake'
  gem 'uglifier'
end
~~~

This is especially helpful when using something like a [continuous integration service](http://distresssignal.org/jekyll-continuous-integration-travis-ci) to build and deploy your site. By passing in the `--without development` flag as a bundler argument you can leave those gems behind and not bother loading them onto the build server since you don't need them.
