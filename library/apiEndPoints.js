const newsBaseUrl = "https://newsapi.org/v2/top-headlines";

// If selectedSource is null, we construct the URL to fetch all sources.
// Otherwise, we fetch the news based on the selected source.
export const newsUrl = (selectedSource) =>
  `${newsBaseUrl}${selectedSource ? "?sources=" + selectedSource : "/sources?"}&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`;
