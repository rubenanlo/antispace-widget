import clsx from "clsx";

export const Typography = {};

//eslint-disable-next-line
Typography.Title = ({ as, title, className }) => {
  const Component = as ?? "h1";

  const variants = {
    h1: "font-bold tracking-tight text-2xl mb-5 pb-2 border-b border-widget-card",
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
