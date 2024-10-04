import useSWR from "swr";
import { newsUrl } from "@/library/apiEndPoints";

// Fetcher function used by SWR to fetch data from the API. In case we want to
// fetch data from other urls, I kept it separate
const fetcher = (url) => fetch(url).then((res) => res.json());

// Custom hook to fetch news sources and articles
export const useFetchNews = (selectedSource) =>
  useSWR(newsUrl(selectedSource), fetcher);
