// 1. Import utilities from `astro:content`
import { z, defineCollection } from 'astro:content';

// 2. Define your collection(s)
const mydata = defineCollection({ 
  type: 'data',
  schema: z.array(z.object({
      name: z.string(),
      href: z.string(),
      icon: z.string(),
    })),
});
const posts = defineCollection({ 
  type: 'content',
  schema: z.object({
    title: z.string(),
    category: z.string(),
    pubDate: z.date(),
    tags: z.array(z.string()),    
    }),
});

// 3. Export a single `collections` object to register your collection(s)
//    This key should match your collection directory name in "src/content"
export const collections = {
  'mydata': mydata,
  'posts': posts,
};