const STORAGE_KEY = "alphabetProgress";

export function getProgress() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : {};
}

export function setProgress(symbol, learned) {
  const progress = getProgress();
  progress[symbol] = learned;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function isLearned(symbol) {
  const progress = getProgress();
  return !!progress[symbol];
}

export function filterAlphabet(alphabet, onlyUnlearned = false) {
  const progress = getProgress();
  return onlyUnlearned ? alphabet.filter((l) => !progress[l.symbol]) : alphabet;
}

export function getLearnedNumber() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? Object.keys(JSON.parse(data)).length : 0;
}