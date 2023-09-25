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
