const categoryColor: { name: string; color: string }[] = [
  { name: "math", color: "blue" },
  { name: "cond-mat", color: "orange" },
  { name: "physics", color: "yellow" },
  { name: "astro-ph", color: "yellow" },
  { name: "hep", color: "yellow" },
  { name: "gr-qc", color: "yellow" },
  { name: "nucl", color: "purple" },
  { name: "quant-ph", color: "yellow" },
  { name: "q-bio", color: "green" },
  { name: "q-fin", color: "red" },
  { name: "stat", color: "purple" },
  { name: "eess", color: "glay" },
  { name: "econ", color: "pink" },
  { name: "cs.", color: "cyan" },
];

type makeCategoryColor = (cat: string) => string;

export const makeCategoryColor: makeCategoryColor = (cat) => {
  const matched = categoryColor.find((category) => cat.includes(category.name));
  return matched ? matched.color : "glay";
};
