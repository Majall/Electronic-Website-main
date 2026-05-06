import Card from "./ui/Card";
import Skeleton from "./ui/Skeleton";

const ProductCardSkeleton = () => (
  <Card className="p-4">
    <Skeleton className="h-40 w-full rounded-md" />
    <div className="mt-4 space-y-2">
      <Skeleton className="h-4 w-3/4" />
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-6 w-14 rounded-full" />
      </div>
    </div>
  </Card>
);

export default ProductCardSkeleton;
