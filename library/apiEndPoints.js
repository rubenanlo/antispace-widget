const newsBaseUrl = "https://newsapi.org/v2/top-headlines";

export const newsUrl = (selectedSource) =>
  `${newsBaseUrl}${selectedSource ? "?sources=" + selectedSource : "/sources?"}&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`;
