import { HoverEffect } from "./ui/card-hover-effect";

export function CardHoverEffectDemo() {
  return (
    <div className="max-w-2xl mx-auto px-2">
      <HoverEffect items={projects} />
    </div>
  );
}
export const projects = [
  {
    title: "Course Created",
    description:21,

  },
  {
    title: "Articles Created",
    description:32

  },
  {
    title: "Amount",
    amount:"$32221"

  },

];
