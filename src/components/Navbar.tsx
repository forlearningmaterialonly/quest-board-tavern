import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Menu, X, Dice5 } from "lucide-react";

const Navbar = () => {
  const { lang, setLang, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const links = [
    { to: "/", label: t("Trang chủ", "Home") },
    { to: "/games", label: t("Thư viện Game", "Game Library") },
    { to: "/menu", label: t("Thực đơn", "Menu") },
    { to: "/booking", label: t("Đặt bàn", "Book a Table") },
    { to: "/about", label: t("Về chúng tôi", "About") },
    { to: "/contact", label: t("Liên hệ", "Contact") },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2 group">
          <Dice5 className="w-7 h-7 text-accent group-hover:animate-float" />
          <span className="font-heading font-bold text-lg text-accent">
            Game On!
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm font-medium transition-colors hover:text-accent ${
                location.pathname === link.to ? "text-accent" : "text-foreground/80"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {/* Language toggle */}
          <div className="flex items-center bg-muted rounded-full p-0.5 text-xs font-heading">
            <button
              onClick={() => setLang("vi")}
              className={`px-3 py-1 rounded-full transition-all ${
                lang === "vi" ? "bg-accent text-accent-foreground" : "text-muted-foreground"
              }`}
            >
              VN
            </button>
            <button
              onClick={() => setLang("en")}
              className={`px-3 py-1 rounded-full transition-all ${
                lang === "en" ? "bg-accent text-accent-foreground" : "text-muted-foreground"
              }`}
            >
              EN
            </button>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-background border-b border-border animate-fade-in">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-3">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className={`text-sm font-medium py-2 transition-colors hover:text-accent ${
                  location.pathname === link.to ? "text-accent" : "text-foreground/80"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
