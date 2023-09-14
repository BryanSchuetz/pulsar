---
title: Clean URLs in Jekyll
date: 2016-02-10 03:00:00 -05:00
category: web-development
tags:
- Jekyll
- Web Development
layout: post
---

GitHub Pages recently [updated](https://github.com/blog/2100-github-pages-now-faster-and-simpler-with-jekyll-3-0) its service to start using the latest major version of Jekyll—that’s [3.0](http://jekyllrb.com/news/2015/10/26/jekyll-3-0-released/) for those keeping score at home. Aside from [incremental regeneration](http://jekyllrb.com/docs/configuration/)—which I love when I’m working with rather large sites—the thing I’m most excited about in 3.0 is [extension-less URLs](http://jekyllrb.com/docs/permalinks/#extensionless-permalinks).

No one want’s to look at those ugly extensions, right? The worst. Seriously though, if you’re migrating from a standard LAMP Stack CMS like Drupal or WordPress, you can now chop off those extensions without worrying about redirecting everything—an especially painful process on GitHub Pages where you can’t have a bunch of directives in an .htaccess file.

Here’s the trick, once you’ve set your permalink style in the config file, you still need a server that understands the extensionless route and can serve up the right file. For hosting, this shouldn’t be a problem—GitHub Pages even handles this right out of the box. In your local workflow, there are a few more hoops to jump through.

~~~javascript
var hygienist   = require('hygienist-middleware');
var bs          = require('browser-sync');

gulp.task('serve', function() {
    bs({
        server:{
          baseDir: "build",
          middleware: hygienist("build")
        },
        notify: false,
    });
});
~~~

If, like me, you’re using a Node server for local development you can take advantage of some of the great Middleware available for [Connect](https://github.com/senchalabs/connect#readme) like [this plugin](https://www.npmjs.com/package/hygienist-middleware) to modify URLs before handing requests off to the server. Just pass in the root directory so it knows where to look for the files, see above.

Jekyll has really come a long way in the last year and a half. Collections, native support for pre-processors, a Liquid profiler, incremental regeneration, clean URLs, and more. Combined with a decoupled CMS like [Contentful](https://www.contentful.com) or [Siteleaf](http://v2.siteleaf.com), using Jekyll for clients is quickly becoming more and more of a solid choice.
