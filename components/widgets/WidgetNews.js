import { useState } from "react";
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Label,
} from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Post } from "@/components/ui/Post";
import { Container } from "@/components/ui/Container";
import { Typography } from "@/components/ui/Typography";
import { useFetchNews } from "@/helpers/fetchData";

// This widget fetches articles from newsapi.org and displays them in a list. We
// combine a general state management with mobx and a custom hook to fetch the
// data.
// Note that the Observer makes the component reactive to MobX state changes, as
// part of the process of a global state management approach.

/* TODO: to improve displaying relevant information in the event of an error.

1. Add a message to the user when the API limit is exceeded.
2. Add a message to the user when the API key is invalid.
3. Add a loading animation while fetching the data.

*/

// Main widget component that combines the source selector and articles list
const WidgetNews = () => {
  const [selectedSource, setSelectedSource] = useState("bbc-news");

  return (
    <Container className="h-96 w-96 overflow-hidden rounded-2xl border border-widget-card p-5">
      <Typography.Title title="News" />
      <SelectSource
        selectedSource={selectedSource}
        setSelectedSource={setSelectedSource}
      />
      <Articles selectedSource={selectedSource} />
    </Container>
  );
};

export default WidgetNews;

/* ********** ARTICLES COMPONENT *********
The Articles and article components handle all the logic to display each article
fetched from the API.
*/

const Articles = ({ selectedSource }) => {
  const { data, error } = useFetchNews(selectedSource);

  if (error)
    return (
      <Container>Failed to load news, check if you exceed your limit</Container>
    );
  if (!data) return <Container>Loading...</Container>;

  const { articles } = data;

  return articles?.length > 0 ? (
    <Container.Flex className="h-1/2 w-full flex-col gap-y-10 overflow-auto scrollbar-hide">
      {articles.map((article) => (
        <Article key={article.title} article={article} />
      ))}
    </Container.Flex>
  ) : (
    <Typography.Paragraph paragraph="No news available for this source." />
  );
};

const Article = ({ article: { url, title, description } }) => (
  <Post as="article">
    <Container.Link
      href={url}
      target="_blank"
      className="flex h-full w-full flex-col justify-between"
    >
      <Post.Title title={title} />
      <Post.Description text={description} />
      <Post.Cta text={"Read article"} />
    </Container.Link>
  </Post>
);

/* ********** SELECT SOURCE COMPONENT *********

The SelectSource component is a dropdown that allows the user to select a news
source. This template was taken from Tailwind and refactored to avoid
unnecessary code, to make it more readable and to add some logic to fetch the
right information

*/

const SelectSource = ({ selectedSource, setSelectedSource }) => {
  const { data, error } = useFetchNews();
  const [query, setQuery] = useState("");

  if (error) return <Container />;

  if (!data) return <Container />;

  const { sources } = data;

  const filteredSources =
    query === ""
      ? sources
      : sources?.filter((source) => {
          return source.name.toLowerCase().includes(query.toLowerCase());
        });

  const getId = (sourceInput) =>
    sources?.find((source) => source.name === sourceInput).id;

  const getName = (sourceInput) =>
    sources?.find((source) => source.id === sourceInput).name;

  return (
    <Combobox
      as="div"
      value={selectedSource}
      onChange={(source) => {
        setQuery("");
        setSelectedSource(getId(source));
      }}
      className="relative mb-10"
    >
      <Label className="block text-sm font-medium leading-6">
        Select a Source
      </Label>
      <Container className="relative">
        <ComboboxInput
          className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-green-primary sm:text-sm sm:leading-6"
          onChange={(event) => setQuery(event.target.value)}
          onBlur={() => setQuery("")}
          displayValue={(source) => getName(source)}
        />
        <ComboboxButton className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <ChevronUpDownIcon
            className="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </ComboboxButton>
      </Container>

      {filteredSources?.length > 0 && (
        <ComboboxOptions className="absolute z-10 mt-1 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
          {filteredSources?.map((source) => (
            <ComboboxOption
              key={source.id}
              value={source.name}
              className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-green-primary data-[focus]:text-white"
            >
              <span className="block truncate group-data-[selected]:font-semibold">
                {source.name}
              </span>
              <span className="absolute inset-y-0 right-0 hidden items-center pr-4 text-green-primary group-data-[selected]:flex group-data-[focus]:text-white">
                <CheckIcon className="h-5 w-5" aria-hidden="true" />
              </span>
            </ComboboxOption>
          ))}
        </ComboboxOptions>
      )}
    </Combobox>
  );
};
