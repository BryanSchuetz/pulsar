import { DateTime } from "luxon";

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



export  function readableDate(date) {
    return DateTime.fromJSDate(date, {
      zone: "utc",
    }).toFormat("LLLL d, y");
  }
