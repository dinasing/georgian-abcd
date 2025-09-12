import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const links = [
    { to: "/game/match", label: t("nav.match") },
    { to: "/game/build", label: t("nav.build") },
  ];

  function LanguageSwitcher() {
    const toggleLanguage = () => {
      i18n.changeLanguage(i18n.language === "ru" ? "en" : "ru");
    };

    return (
      <button onClick={toggleLanguage}>
        {i18n.language === "ru" ? "🇬🇧" : "🇷🇺"}
      </button>
    );
  }
  return (
    <nav className="bg-blue-500 text-white p-4 shadow-md">
      <div className="flex justify-between items-baseline">
        <button className="sm:hidden text-2xl w-6" onClick={() => setOpen(!open)}>
          {open ? "✖" : "☰"}
        </button>

        <Link to="/">{t("nav.learn")}</Link>

        <div className="hidden sm:flex gap-6">
          {links.map((link, i) => (
            <Link key={i} to={link.to}>
              {link.label}
            </Link>
          ))}
        </div>
        <LanguageSwitcher />
      </div>

      {open && (
        <div className="flex flex-col gap-3 mt-3 sm:hidden">
          {links.map((link, i) => (
            <Link
              key={i}
              to={link.to}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
