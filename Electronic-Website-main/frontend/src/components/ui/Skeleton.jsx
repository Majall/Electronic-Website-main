import cn from "../../utils/cn";

const Skeleton = ({ className }) => (
  <div className={cn("skeleton rounded-md", className)} />
);

export default Skeleton;
