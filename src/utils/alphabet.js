import { useTranslation } from "react-i18next";
import alphabetEN from "../data/alphabet-en";
import alphabetRU from "../data/alphabet-ru";

export default function alphabet() {
  const { i18n } = useTranslation();

  return i18n.language === "ru" ? alphabetRU : alphabetEN;
}
