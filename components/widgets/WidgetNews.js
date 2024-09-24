import { useState } from "react";
import useSWR from "swr";
import { Post } from "../ui/Post";
import { Container } from "../ui/Container";
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Label,
} from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

const fetcher = (url) => fetch(url).then((res) => res.json());

const WidgetNews = () => {
  const [
    selectedSource,
    // setSelectedSource
  ] = useState("bbc-news"); // Default source
  const { data: sourcesData } = useSWR(
    `https://newsapi.org/v2/top-headlines/sources?apiKey=${"4e1d7b146c4240f7919a802488db30a3"}`,
    fetcher,
  );

  console.log("🚀 ~ WidgetNews ~ data:", sourcesData);
  const { data: articlesData, error } = useSWR(
    selectedSource
      ? `https://newsapi.org/v2/top-headlines?sources=${selectedSource}&apiKey=${"4e1d7b146c4240f7919a802488db30a3"}`
      : null,
    fetcher,
  );

  if (error) return <div>Failed to load news</div>;
  if (!sourcesData || !articlesData) return <div>Loading...</div>;

  const { sources } = sourcesData;
  const { articles } = articlesData;

  return (
    <div className="news-widget p-4">
      <h1 className="text-2xl font-bold">News Widget</h1>

      <SelectSource sources={sources} />

      <div>
        {articles?.length > 0 ? (
          articles.map((article) => (
            <Article key={article.title} article={article} />
          ))
        ) : (
          <p>No news available for this source.</p>
        )}
      </div>
    </div>
  );
};

export default WidgetNews;

export const Article = ({
  article: { url, title, description },
  narrowWidth,
  fullWidth,
}) => (
  <Post
    narrowWidth={narrowWidth}
    fullWidth={fullWidth}
    as="article"
    className="row-span-2 shrink-0 overflow-x-visible lg:overflow-x-hidden"
  >
    <Container.Link href={url} className="flex h-full flex-col justify-between">
      <Post.Title title={title} />

      <Post.Description text={description} />
      <Post.Cta noChevron text={url ?? "Read article"} />
    </Container.Link>
  </Post>
);

const SelectSource = ({ sources }) => {
  const [query, setQuery] = useState("");
  const [selectedPerson, setSelectedPerson] = useState(null);
  const filteredSources =
    query === ""
      ? sources
      : sources.filter((source) => {
          return source.name.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <Combobox
      as="div"
      value={selectedPerson}
      onChange={(person) => {
        setQuery("");
        setSelectedPerson(person);
      }}
    >
      <Label className="block text-sm font-medium leading-6 text-gray-900">
        Assigned to
      </Label>
      <div className="relative mt-2">
        <ComboboxInput
          className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          onChange={(event) => setQuery(event.target.value)}
          onBlur={() => setQuery("")}
          displayValue={(person) => person?.name}
        />
        <ComboboxButton className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <ChevronUpDownIcon
            className="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </ComboboxButton>

        {filteredSources.length > 0 && (
          <ComboboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredSources.map((source) => (
              <ComboboxOption
                key={source.id}
                value={source.name}
                className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white"
              >
                <span className="block truncate group-data-[selected]:font-semibold">
                  {source.name}
                </span>

                <span className="absolute inset-y-0 right-0 hidden items-center pr-4 text-indigo-600 group-data-[selected]:flex group-data-[focus]:text-white">
                  <CheckIcon className="h-5 w-5" aria-hidden="true" />
                </span>
              </ComboboxOption>
            ))}
          </ComboboxOptions>
        )}
      </div>
    </Combobox>
  );
};
