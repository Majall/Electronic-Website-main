import { assets } from "../assets/assets";
import Card from "./ui/Card";

const OurPolicy = () => {
  return (
    <div className="grid gap-6 text-center text-sm text-subtle sm:grid-cols-3">
      {[
        {
          title: "Easy exchange policy",
          desc: "Flexible returns with effortless exchanges.",
          icon: assets.exchange_icon,
        },
        {
          title: "Seven day return",
          desc: "Shop confidently with quick returns.",
          icon: assets.quality_icon,
        },
        {
          title: "Premium support",
          desc: "24/7 assistance that feels human.",
          icon: assets.support_img,
        },
      ].map((policy) => (
        <Card
          key={policy.title}
          className="flex flex-col items-center gap-3 p-6 transition-transform duration-300 hover:-translate-y-1"
        >
          <img
            src={policy.icon}
            className="h-12 w-12"
            alt={policy.title}
            loading="lazy"
          />
          <p className="text-sm font-semibold text-foreground">
            {policy.title}
          </p>
          <p className="text-xs text-subtle">{policy.desc}</p>
        </Card>
      ))}
    </div>
  );
};

export default OurPolicy;
