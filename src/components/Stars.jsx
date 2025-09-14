export default function Stars({ f1 }) {
  if (f1 >= 80) return "⭐⭐⭐⭐⭐";
  if (f1 >= 60) return "⭐⭐⭐⭐";
  if (f1 >= 40) return "⭐⭐⭐";
  if (f1 >= 20) return "⭐⭐";
  return "⭐";
}
