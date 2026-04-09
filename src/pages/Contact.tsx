import { useLanguage } from "@/contexts/LanguageContext";
import { MapPin, Phone, Mail, Clock, Facebook, Instagram } from "lucide-react";

const Contact = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="font-heading font-bold text-3xl md:text-5xl mb-4 glow-text">
            {t("Liên hệ", "Contact Us")}
          </h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            {t("Ghé thăm quán hoặc liên hệ trước — chúng tôi luôn sẵn sàng!", "Visit us or reach out — we're always ready!")}
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Info */}
          <div className="space-y-6">
            <div className="quest-card p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-accent mb-1">{t("Địa chỉ", "Address")}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t(
                      "123 Đường Võ Văn Ngân, Phường Linh Chiểu, TP. Thủ Đức, TP.HCM, Việt Nam",
                      "123 Vo Van Ngan Street, Linh Chieu Ward, Thu Duc City, HCMC, Vietnam"
                    )}
                  </p>
                </div>
              </div>
            </div>

            <div className="quest-card p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-accent mb-1">{t("Giờ mở cửa", "Opening Hours")}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t("Thứ 2 – Chủ nhật: 9:00 – 22:00", "Monday – Sunday: 9:00 AM – 10:00 PM")}
                  </p>
                </div>
              </div>
            </div>

            <div className="quest-card p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-accent mb-1">{t("Điện thoại", "Phone")}</h3>
                  <p className="text-sm text-muted-foreground">0909 123 456</p>
                </div>
              </div>
            </div>

            <div className="quest-card p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-accent mb-1">Email</h3>
                  <p className="text-sm text-muted-foreground">hello@gameon.cafe</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="quest-card p-4 flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors">
                <Facebook className="w-5 h-5" /> Facebook
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="quest-card p-4 flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors">
                <Instagram className="w-5 h-5" /> Instagram
              </a>
            </div>
          </div>

          {/* Map */}
          <div className="fantasy-border overflow-hidden h-[400px] md:h-full min-h-[300px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.4544366893945!2d106.75893827509668!3d10.851005889299584!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752763f23816ab%3A0x282f711441b6916f!2sVo%20Van%20Ngan%20Street%2C%20Thu%20Duc%20City%2C%20Ho%20Chi%20Minh%20City!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Game On! Board Café location"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
