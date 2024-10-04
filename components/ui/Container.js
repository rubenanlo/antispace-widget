import Link from "next/link";
import clsx from "clsx";

export const Container = ({ children, as, className, ...props }) => {
  let Component = as ?? "div";

  return (
    <Component className={clsx(className)} {...props}>
      {children}
    </Component>
  );
};

//eslint-disable-next-line
Container.Flex = ({ as, children, className, ...props }) => {
  let Component = as ?? "div";

  return (
    <Component className={clsx(className, "flex")} {...props}>
      {children}
    </Component>
  );
};

//eslint-disable-next-line
Container.Link = ({ children, className, href, ...props }) => (
  <Link href={href} className={clsx(className, "cursor-pointer")} {...props}>
    {children}
  </Link>
);
