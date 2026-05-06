import cn from "../../utils/cn";

const Section = ({ className, ...props }) => (
  <section className={cn("py-section animate-fade-up", className)} {...props} />
);

export default Section;
