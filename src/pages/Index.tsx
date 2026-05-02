import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Dice5, Users, Coffee, Gamepad2, Star, ArrowRight, Shuffle } from "lucide-react";
import heroImage from "@/assets/hero-tavern.jpg";
import boardgameImage from "@/assets/boardgame-table.jpg";
import AnimatedDice from "@/components/AnimatedDice";

const featuredGames = [
  { name: "Catan", players: "3-4", difficulty: "⭐⭐", image: "🏝️", descVi: "Xây dựng, giao dịch và chinh phục đảo.", descEn: "Build, trade, and settle the island." },
  { name: "Ticket to Ride", players: "2-5", difficulty: "⭐⭐", image: "🚂", descVi: "Xây dựng tuyến đường sắt xuyên lục địa.", descEn: "Build railway routes across the map." },
  { name: "Codenames", players: "4-8", difficulty: "⭐", image: "🕵️", descVi: "Trò chơi giải mã từ khóa theo nhóm.", descEn: "Team-based word guessing game." },
  { name: "Azul", players: "2-4", difficulty: "⭐⭐", image: "🎨", descVi: "Sắp xếp gạch mosaic tuyệt đẹp.", descEn: "Create beautiful mosaic patterns." },
];

const Index = () => {
  const { t } = useLanguage();

  const randomGame = () => {
    const games = ["Catan", "Uno", "Codenames", "Ticket to Ride", "Splendor", "Azul", "Dixit", "Coup"];
    const picked = games[Math.floor(Math.random() * games.length)];
    alert(`🎲 ${t("Hôm nay chơi", "Today's pick")}: ${picked}!`);
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Game On! Board Café" className="w-full h-full object-cover" width={1920} height={1080} />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center py-20">
          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/30 rounded-full px-4 py-1.5 mb-6 animate-fade-in">
            <Dice5 className="w-4 h-4 text-accent" />
            <span className="text-xs font-heading text-accent">
              {t("TP. Thủ Đức, TP.HCM", "Thu Duc City, HCMC")}
            </span>
          </div>

          <h1 className="font-heading font-extrabold text-4xl md:text-6xl lg:text-7xl mb-4 text-shadow-glow opacity-0 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <span className="glow-text">Game On!</span>
            <br />
            <span className="text-foreground">Board Café</span>
          </h1>

          {/* Dice + tagline */}
          <div className="flex items-center justify-center gap-3 mb-2 opacity-0 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <AnimatedDice />
            <p className="text-xl md:text-2xl font-heading text-accent/80">
              Roll. Play. Repeat.
            </p>
          </div>

          <p className="text-muted-foreground max-w-xl mx-auto mb-8 opacity-0 animate-fade-in" style={{ animationDelay: "0.6s" }}>
            {t(
              "Bước vào không gian phiêu lưu – nơi bạn bè, board game và cà phê ngon hội tụ.",
              "Enter the play space – where friends, board games, and great coffee come together."
            )}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-fade-in" style={{ animationDelay: "0.8s" }}>
            <Link to="/booking" className="btn-adventure inline-flex items-center justify-center gap-2">
              <Gamepad2 className="w-5 h-5" />
              {t("Đặt bàn ngay", "Book a Table")}
            </Link>
            <Link to="/games" className="btn-gold inline-flex items-center justify-center gap-2">
              <ArrowRight className="w-5 h-5" />
              {t("Khám phá Game", "Explore Games")}
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
          <div className="w-6 h-10 border-2 border-accent/40 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-accent/60 rounded-full" />
          </div>
        </div>
      </section>

      {/* Welcome section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-heading font-bold text-3xl md:text-4xl mb-6">
                <span className="glow-text">{t("Chào mừng đến Game On!", "Welcome to Game On!")}</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {t(
                  "Game On! Board Café là không gian lý tưởng cho những buổi tụ họp bạn bè. Với hơn 50 board game, đồ uống ngon và không gian ấm cúng, chúng tôi mang đến trải nghiệm phiêu lưu độc đáo ngay giữa TP. Thủ Đức.",
                  "Game On! Board Café is the perfect space for friend gatherings. With 50+ board games, great drinks, and a cozy atmosphere, we bring a unique adventure experience right in Thu Duc City."
                )}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {t(
                  "Dù bạn là chiến binh board game kì cựu hay người mới bắt đầu – luôn có một nhiệm vụ dành cho bạn!",
                  "Whether you're a veteran board gamer or just starting out – there's always a quest waiting for you!"
                )}
              </p>
            </div>
            <div className="fantasy-border overflow-hidden">
              <img src={boardgameImage} alt={t("Không gian chơi game", "Board game play space")} className="w-full h-72 md:h-80 object-cover" loading="lazy" width={1280} height={720} />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="font-heading font-bold text-3xl text-center mb-12 glow-text">
            {t("Tại sao chọn Game On?", "Why Game On?")}
          </h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { icon: Gamepad2, title: t("50+ Board Games", "50+ Board Games"), desc: t("Từ party game đến chiến thuật nặng đô", "From party games to heavy strategy") },
              { icon: Coffee, title: t("Đồ uống hấp dẫn", "Great Drinks"), desc: t("Cà phê, trà sữa, nước ép và thức uống theo mùa", "Coffee, milk tea, juices and seasonal drinks") },
              { icon: Users, title: t("Không gian nhóm", "Group Space"), desc: t("Khu vực thoải mái cho 2-10 người chơi", "Comfortable area for 2-10 players") },
            ].map((feat, i) => (
              <div key={i} className="quest-card p-6 text-center">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
                  <feat.icon className="w-7 h-7 text-accent" />
                </div>
                <h3 className="font-heading font-semibold text-lg mb-2">{feat.title}</h3>
                <p className="text-sm text-muted-foreground">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Games */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="font-heading font-bold text-3xl text-center mb-4 glow-text">
            {t("Nhiệm vụ nổi bật", "Featured Quests")}
          </h2>
          <p className="text-center text-muted-foreground mb-12">
            {t("Những board game được yêu thích nhất tại quán", "Our most popular board games")}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {featuredGames.map((game, i) => (
              <div key={i} className="quest-card p-5 text-center group cursor-pointer">
                <div className="text-4xl mb-3">{game.image}</div>
                <h3 className="font-heading font-semibold text-sm mb-1">{game.name}</h3>
                <p className="text-xs text-muted-foreground mb-2">{t(game.descVi, game.descEn)}</p>
                <p className="text-xs text-muted-foreground">{game.players} {t("người", "players")}</p>
                <p className="text-xs text-accent mt-1">{game.difficulty}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link to="/games" className="btn-adventure inline-flex items-center gap-2">
              <ArrowRight className="w-4 h-4" />
              {t("Xem tất cả game", "View All Games")}
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="font-heading font-bold text-3xl text-center mb-12 glow-text">
            {t("Nhật ký phiêu lưu", "Adventure Logs")}
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Minh Anh", text: t("Không gian cực chill, game nhiều, nhân viên tư vấn nhiệt tình!", "Super chill vibe, tons of games, staff helped us pick the perfect one!"), stars: 5 },
              { name: "Tuấn Kiệt", text: t("Đi cùng nhóm 6 người, chơi Catan 3 ván liên tiếp. Sẽ quay lại!", "Went with a group of 6, played 3 rounds of Catan. Will be back!"), stars: 5 },
              { name: "Hà My", text: t("Trà sữa ngon, board game hay, giá cả hợp lý. 10/10!", "Great milk tea, awesome board games, affordable prices. 10/10!"), stars: 5 },
            ].map((review, i) => (
              <div key={i} className="quest-card p-6">
                <div className="flex gap-1 mb-3">
                  {Array(review.stars).fill(0).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mb-4 italic">"{review.text}"</p>
                <p className="font-heading font-semibold text-sm text-accent">— {review.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA + Random Game */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading font-bold text-3xl mb-4 glow-text">
            {t("Sẵn sàng bắt đầu?", "Ready to Begin?")}
          </h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            {t(
              "Đặt bàn ngay hoặc để chúng tôi chọn game cho bạn!",
              "Book a table now or let us pick a game for you!"
            )}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/booking" className="btn-adventure inline-flex items-center justify-center gap-2">
              <Gamepad2 className="w-5 h-5" />
              {t("Đặt bàn", "Book a Table")}
            </Link>
            <button onClick={randomGame} className="btn-gold inline-flex items-center justify-center gap-2">
              <Shuffle className="w-5 h-5" />
              {t("Hôm nay chơi gì?", "What should we play?")}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
