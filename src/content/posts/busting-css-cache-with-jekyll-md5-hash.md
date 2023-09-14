---
title: Busting CSS Cache with Jekyll
date: 2018-02-16 22:00:00 Z
category: web-development
tags:
- Jekyll
- Ruby
layout: post
---
If you're setting long expires headers on your static assets—**as God demands**—then at some point, you will want to bust that browser cache. If you're also using Jekyll, there's a [plugin](https://github.com/envygeeks/jekyll-assets) for that. **Here's the thing though**: not everyone needs a full-fledged, [sprockets](https://github.com/rails/sprockets) based, asset pipeline for their project. In the world of Jekyll—I'd actually say that the _majority_ of folks don't need that particular sledgehammer. It adds quite a lot of complexity to your build and, to be fair, the documentation is a bit inscrutable.

There's nothing wrong with simple workarounds like this:

```html
{%raw%}<link rel="stylesheet" href="/css/main.css?{{site.time | date: '%s'}}">{%endraw%}
```

Which uses the `site.time` variable formatted as seconds since the epoch (1970). When outputed, the `?1518881511` query paramater gets appended to the end of the filename—browsers see this as a new asset and download it. This is great, and will bust browser cache of the file everytime the site is built. 

## A Middle Path With MD5 Hashing

Ideally though, you'd only invalidate the browser cache when your asset has changed somehow. You could manually increment when changes occour using semantic versioning e.g. `main.css?v=1.2`—but my Mtv addled brain would never remember to do that. Somewhere between a Rails asset pipeline and manually incrementing—lies a middle path. A custom plugin that reads in your `_sass` files, geneartes an MD5 Digest—and then lets you append that digest to your css filname with a filter, e.g.:

```html
{%raw%}<link rel="stylesheet" href="{{ site.baseurl }}/assets/css/{{ 'site.css' | bust_css_cache }}">{%endraw%}
```

Which will give us something like this in the markup: `<link rel="stylesheet" href="/assets/css/site.css?c86a8588967580cc0631f5115d9d6b18">`. This way, the hash at the end only changes when the content of your Sass files change. A browser could hold onto your stylesheet for a year—but as soon as you make a change to the `_typesetting.scss` partial, it will ask for the new version.

It's not as complicated as it sounds. You can add a custom plugin by including an .rb file in the `_plugins` directory at the root of your project. There are some caveats though, so first have a look at [the documentation](https://jekyllrb.com/docs/plugins/) for running with custom plugins. Plugins can get pretty complicated, but for our purposes we just need to register a simple filter with Liquid.

```ruby
module Jekyll
  module CacheBust
    # put the stuff that does stuff here
  end
end

Liquid::Template.register_filter(Jekyll::CacheBust)
```

Basically, Liquid Filters take an input and return an output. In our case, our input will be the name of our CSS file, and the output will be the name of our CSS file with an MD5 Digest of our Sass files appended to it. I dropped the full plugin into [this gist](https://gist.github.com/BryanSchuetz/2ee8c115096d7dd98f294362f6a667db) if you want to give it a look. The key bits are a `CacheDigester` class that will take a file or directory of files and generate a digest, and the `bust_css_cache` method which you call as a filter in Liquid. 

We're passing our `_sass` directory to the `CacheDigester` object because we write in Sass and our CSS file will only be generated at the end when the site is built. I keep my Sass files in `assets/_sass` so if you plan to use this plugin you may have to change that bit in the `bust_css_cache` method.

## Simplicity, and Context 

What I love about Jekyll, is what I love about Liquid, is what I love about Ruby, is what I love about Vue. They all do complex things, but offer simple affordances to the user. Extending the functionality of Liquid and Jekyll is relatively straightforward, as you can see above. This means you can build the right solution for your particular context—without being forced to use a sledgehammer to swat a fly. 

