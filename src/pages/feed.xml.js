import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { formatPosts } from "../js/utils";
export async function GET(context) {
  const posts = await getCollection('posts', context);
  const formattedPosts = formatPosts(posts);
  return rss({
    title: 'The Distress Signal',
    description: 'A personal hypertext of Bryan Schuetz.',
    site: context.site,
    items: formattedPosts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      customData: post.data.customData,
      link: `/${post.slug}/`,
    })),
    // (optional) inject custom xml
    customData: `<language>en-us</language>`,
  });
}
