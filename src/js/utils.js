// Format posts for display: Filter out future posts, sort by date or randomize
export function formatPosts(posts, {
  filterOutFuturePosts = true,
  sortByDate = true,
} = {}) {

  const filteredPosts = posts.reduce((acc, post) => {
      const { pubDate } = post.data;
      // filterOutFuturePosts if true
      if (filterOutFuturePosts && new Date(pubDate) > new Date()) {
          return acc;
      }
      // add post to acc
      acc.push(post)
      return acc;
  }, [])

  // sortByDate or randomize
  if (sortByDate) {
      filteredPosts.sort((a, b) => new Date(b.data.pubDate) - new Date(a.data.pubDate))
  } else {
      filteredPosts.sort(() => Math.random() - 0.5)
  }
  return filteredPosts;
}

// Format date in a readable way
import { DateTime } from "luxon";
export  function readableDate(date) {
    return DateTime.fromJSDate(date, {
      zone: "utc",
    }).toFormat("LLLL d, y");
  }

// Format date as relative string
export function relativeDate(date) {
  return DateTime.fromJSDate(date, {
    zone: "utc",
  }).toRelative({});
}


// Generate limited html excerpt from a markdown file
import marked from 'marked'
const excerptLength = 250
// Function to truncate markdown and convert to HTML
export function createExcerpt(postBody) {
    const truncatedMarkdown = postBody.substring(0, excerptLength);
    return marked.parse(truncatedMarkdown);
  }

//strip markdown
export function stripMarkdown(markdown) {
  return markdown
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '') // Remove image syntax
    .replace(/\[[^\]]*\]\([^)]*\)/g, '') // Remove link syntax
    .replace(/`{3}[^`]*`{3}/g, '') // Remove code block syntax
    .replace(/`[^`]*`/g, '') // Remove inline code syntax
    .replace(/#{1,6}\s/g, '') // Remove header syntax
    .replace(/[*_]{1,3}/g, '') // Remove bold/italic syntax
    .replace(/~~[^~]*~~/g, '') // Remove strikethrough syntax
    .replace(/>\s/g, '') // Remove blockquote syntax
    .replace(/\n{2,}/g, '\n') // Replace multiple newlines with a single newline
    .replace(/-\s/g, '') // Remove list syntax
    .replace(/\d+\.\s/g, ''); // Remove numbered list syntax
}
