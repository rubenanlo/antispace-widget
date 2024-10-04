import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import clsx from "clsx";

export const Container = ({ children, as, className, ...props }) => {
  let Component = as ?? "div";

  return (
    <Component className={clsx(className)} {...props}>
      {children}
    </Component>
  );
};

Container.Animated = function ContainerAnimated({
  children,
  className,
  ...props
}) {
  return (
    <motion.div className={clsx(className)} {...props}>
      {children}
    </motion.div>
  );
};

Container.Flex = function ContainerFlex({ as, children, className, ...props }) {
  let Component = as ?? "div";

  return (
    <Component className={clsx(className, "flex")} {...props}>
      {children}
    </Component>
  );
};

Container.Image = function ContainerImage({ className, ...props }) {
  const { src, alt, height, width } = props;

  return (
    <Image
      className={clsx(className)}
      src={src}
      alt={alt}
      height={height}
      width={width}
    />
  );
};

Container.Link = function ContainerLink({
  children,
  className,
  href,
  ...props
}) {
  return (
    <Link href={href} className={clsx(className, "cursor-pointer")} {...props}>
      {children}
    </Link>
  );
};
