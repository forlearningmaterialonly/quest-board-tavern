import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Dice5, MapPin, Phone, Mail } from "lucide-react";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-muted border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Dice5 className="w-6 h-6 text-accent" />
              <span className="font-heading font-bold text-lg text-accent">Game On!</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {t(
                "Quán cà phê board game – nơi những cuộc phiêu lưu bắt đầu.",
                "Board game café – where adventures begin."
              )}
            </p>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-accent mb-4">
              {t("Liên kết", "Quick Links")}
            </h4>
            <div className="flex flex-col gap-2">
              <Link to="/games" className="text-sm text-muted-foreground hover:text-accent transition-colors">{t("Thư viện Game", "Game Library")}</Link>
              <Link to="/menu" className="text-sm text-muted-foreground hover:text-accent transition-colors">{t("Thực đơn", "Menu")}</Link>
              <Link to="/booking" className="text-sm text-muted-foreground hover:text-accent transition-colors">{t("Đặt bàn", "Book a Table")}</Link>
              <Link to="/about" className="text-sm text-muted-foreground hover:text-accent transition-colors">{t("Về chúng tôi", "About")}</Link>
            </div>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-accent mb-4">
              {t("Liên hệ", "Contact")}
            </h4>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-accent" />
                <span>{t("TP. Thủ Đức, TP.HCM, Việt Nam", "Thu Duc City, HCMC, Vietnam")}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-accent" />
                <span>0909 123 456</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-accent" />
                <span>hello@gameon.cafe</span>
              </div>
            </div>
          </div>
        </div>

        <div className="section-divider" />
        <p className="text-center text-xs text-muted-foreground">
          © 2026 Game On! Board Café. {t("Bảo lưu mọi quyền.", "All rights reserved.")}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
