import WidgetNews from "@/components/widgets/WidgetNews";
import { fetcher } from "@/helpers/fetchData";
import { newsUrl } from "@/library/apiEndPoints";

const Home = ({ initialNews, sources }) => (
  <main className="relative flex h-screen items-center justify-center overflow-y-auto bg-background">
    <WidgetNews initialRender={{ initialNews, sources }} />
  </main>
);

export default Home;

export async function getStaticProps() {
  const { sources } = await fetcher(newsUrl());
  const initialNews = await fetcher(newsUrl(sources[0].id));
  return {
    props: {
      initialNews,
      sources,
    },
  };
}
