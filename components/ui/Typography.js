import { ChevronRightIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";

export const Typography = {};

//eslint-disable-next-line
Typography.Title = ({ as, title, className }) => {
  const Component = as ?? "h1";

  const variants = {
    h1: "font-bold tracking-tight text-2xl mb-5 pb-2 border-b border-widget-card",
    h2: "text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100",
  };

  return (
    <Component className={clsx(className, variants[Component])}>
      {title}
    </Component>
  );
};

//eslint-disable-next-line
Typography.Paragraph = ({ paragraph, className }) => (
  <p className={clsx(className)}>{paragraph}</p>
);

//eslint-disable-next-line
Typography.Action = ({ text, noChevron }) => (
  <div
    aria-hidden="true"
    className="text-orange-tertiary relative mt-4 flex text-sm font-medium"
  >
    {text}
    {noChevron ? null : (
      <ChevronRightIcon className="ml-1 w-4 stroke-current" />
    )}
  </div>
);
