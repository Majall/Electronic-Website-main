import cn from "../../utils/cn";

const variants = {
  primary:
    "bg-primary text-primary-foreground shadow-soft hover:shadow-glow hover:bg-primary/90",
  secondary:
    "bg-muted text-foreground border border-border hover:bg-surface shadow-soft",
  ghost: "text-foreground hover:bg-muted",
};

const sizes = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-5 py-2 text-sm",
  lg: "px-6 py-2.5 text-base",
};

const Button = ({
  variant = "primary",
  size = "md",
  className,
  type = "button",
  ...props
}) => {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 ease-premium focus-ring",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  );
};

export default Button;
