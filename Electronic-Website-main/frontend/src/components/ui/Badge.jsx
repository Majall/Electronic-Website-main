import cn from "../../utils/cn";

const Badge = ({ className, variant = "default", ...props }) => {
  const styles = {
    default: "bg-muted text-foreground",
    success: "bg-success/15 text-success",
    danger: "bg-danger/15 text-danger",
    accent: "bg-accent/15 text-accent",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold",
        styles[variant],
        className
      )}
      {...props}
    />
  );
};

export default Badge;
