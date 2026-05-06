import cn from "../../utils/cn";

const Card = ({ className, ...props }) => (
  <div
    className={cn(
      "rounded-lg border border-border bg-surface shadow-soft transition-all duration-300 ease-premium",
      className
    )}
    {...props}
  />
);

export default Card;
