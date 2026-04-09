import { useLanguage } from "@/contexts/LanguageContext";
import { Heart, Target, Sparkles } from "lucide-react";
import cafeImage from "@/assets/cafe-interior.jpg";

const About = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="font-heading font-bold text-3xl md:text-5xl mb-4 glow-text">
            {t("Câu chuyện của chúng tôi", "Our Story")}
          </h1>
        </div>

        <div className="max-w-3xl mx-auto">
          {/* Story */}
          <div className="fantasy-border bg-card/50 p-6 md:p-8 mb-10">
            <p className="text-muted-foreground leading-relaxed mb-4">
              {t(
                "Game On! Board Café ra đời từ tình yêu dành cho board game và mong muốn tạo ra một không gian nơi mọi người có thể kết nối thật sự — không qua màn hình điện thoại, mà qua những viên xúc xắc, lá bài và tiếng cười.",
                "Game On! Board Café was born from a love for board games and a desire to create a space where people can truly connect — not through phone screens, but through dice, cards, and laughter."
              )}
            </p>
            <p className="text-muted-foreground leading-relaxed">
              {t(
                "Tọa lạc tại TP. Thủ Đức, TP.HCM, chúng tôi phục vụ cộng đồng sinh viên và bạn trẻ với hơn 50 board game, đồ uống ngon và một không gian ấm cúng để tận hưởng những khoảnh khắc vui vẻ cùng bạn bè.",
                "Located in Thu Duc City, HCMC, we serve the student and young adult community with 50+ board games, great drinks, and a cozy space to enjoy fun moments with friends."
              )}
            </p>
          </div>

          {/* Photo */}
          <div className="fantasy-border overflow-hidden mb-10">
            <img src={cafeImage} alt={t("Không gian Game On!", "Game On! space")} className="w-full h-64 md:h-80 object-cover" loading="lazy" width={1280} height={720} />
          </div>

          {/* Mission */}
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { icon: Heart, title: t("Đam mê", "Passion"), desc: t("Mang board game đến gần hơn với giới trẻ Việt Nam.", "Bringing board games closer to Vietnamese youth.") },
              { icon: Target, title: t("Sứ mệnh", "Mission"), desc: t("Tạo không gian kết nối xã hội thông qua board game.", "Creating social connection through board games.") },
              { icon: Sparkles, title: t("Trải nghiệm", "Experience"), desc: t("Mỗi lần đến là một cuộc phiêu lưu mới.", "Every visit is a new adventure.") },
            ].map((item, i) => (
              <div key={i} className="quest-card p-6 text-center">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-accent/10 flex items-center justify-center">
                  <item.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-heading font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
