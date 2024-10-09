import { useState } from "react";
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Label,
} from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Container } from "@/components/ui/Container";
import { Typography } from "@/components/ui/Typography";
import { useFetchNews } from "@/helpers/fetchData";

// This widget fetches articles from newsapi.org and displays them in a list. We
// combine a general state management with mobx and a custom hook to fetch the
// data.
// Note that the Observer makes the component reactive to MobX state changes, as
// part of the process of a global state management approach.

/* ********** ARTICLES COMPONENT *********
Main widget component that combines the source selector and articles list
components, along with the logic to pass the selected source to the articles list and list of sources
*/
const WidgetNews = () => {
  const [selectedSource, setSelectedSource] = useState({
    id: "bbc-news",
    name: "BBC News",
  });

  return (
    <Container className="h-96 w-96 overflow-hidden rounded-2xl border border-widget-card p-5">
      <Typography.Title title="News" />
      <SelectSource
        selectedSource={selectedSource}
        setSelectedSource={setSelectedSource}
      />
      <Articles selectedSource={selectedSource?.id} />
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

  if (error || !data)
    return (
      <Typography.Paragraph
        paragraph={
          error
            ? "Failed to load news, check if you exceed your limit"
            : "Loading..."
        }
      />
    );

  const { articles } = data;

  return !!articles.length > 0 ? (
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
  <Container
    as="article"
    className="group relative flex w-full flex-col items-start"
  >
    <Container.Link
      href={url}
      target="_blank"
      className="flex h-full w-full flex-col justify-between"
    >
      <Typography.Title title={title} as="h2" />
      <Typography.Paragraph
        paragraph={description}
        className="relative mt-2 text-sm text-zinc-600 dark:text-zinc-400"
      />
      <Typography.Action text={"Read article"} />
    </Container.Link>
  </Container>
);

/* ********** SELECT SOURCE COMPONENT *********

The SelectSource component is a dropdown that allows the user to select a news
source. This template was taken from Tailwind and refactored to avoid
unnecessary code, to make it more readable and to add some logic to fetch the
right information

*/

const SelectSource = ({ selectedSource, setSelectedSource }) => {
  const { data, error } = useFetchNews();

  // I generated this useState to filter the sources based on the user's input.
  // If I were to mutate the selectedSource state directly, it would cause a
  // re-render of the Articles component, which would result in a new fetch
  // request to the API. This is not the desired behavior, as we only want to
  // fetch new articles when the user selects a new source. This is why I
  // created a separate state to handle the user's input and only update the
  // selectedSource state when the user selects a source from the dropdown menu.
  const [query, setQuery] = useState("");

  if (error || !data) return;

  const { sources } = data;

  const filteredSources =
    sources?.filter((source) =>
      source.name.toLowerCase().includes(query.toLowerCase()),
    ) || [];

  // This function is only used to display the name of the source in the
  // dropdown menu.
  return (
    <Combobox
      as="div"
      value={selectedSource}
      onChange={setSelectedSource}
      className="relative mb-10"
    >
      <Label className="block text-sm font-medium leading-6">
        Select a Source
      </Label>
      <Container className="relative">
        <ComboboxInput
          className="w-full rounded-md border-0 bg-foreground py-1.5 pl-3 pr-10 text-background ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-green-primary sm:text-sm sm:leading-6"
          onChange={(event) => setQuery(event.target.value)}
          onBlur={() => setQuery("")}
          displayValue={({ name }) => name}
        />
        <ComboboxButton className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <ChevronUpDownIcon className="w-5 text-gray-400" aria-hidden="true" />
        </ComboboxButton>
      </Container>

      {!!filteredSources.length > 0 && (
        <ComboboxOptions className="absolute z-10 mt-1 h-48 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 scrollbar-hide focus:outline-none sm:text-sm">
          {filteredSources.map(({ id, name }) => (
            <ComboboxOption
              key={id}
              value={{ id, name }}
              className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-green-primary data-[focus]:text-white"
            >
              <span className="block truncate group-data-[selected]:font-semibold">
                {name}
              </span>
            </ComboboxOption>
          ))}
        </ComboboxOptions>
      )}
    </Combobox>
  );
};
