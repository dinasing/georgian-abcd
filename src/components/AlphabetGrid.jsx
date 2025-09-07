import LetterCard from "./LetterCard.jsx";

export default function AlphabetGrid({ alphabet }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {alphabet.map((letter, i) => (
        <LetterCard key={i} letter={letter} />
      ))}
    </div>
  );
}
