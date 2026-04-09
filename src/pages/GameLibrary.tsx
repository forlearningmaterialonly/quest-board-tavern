import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Users, Star, Search, Shuffle } from "lucide-react";

interface Game {
  name: string;
  players: string;
  difficulty: number;
  category: "party" | "strategy" | "family";
  image: string;
  descVi: string;
  descEn: string;
}

const games: Game[] = [
  { name: "Catan", players: "3-4", difficulty: 2, category: "strategy", image: "🏝️", descVi: "Xây dựng, giao dịch và chinh phục đảo.", descEn: "Build, trade, and settle the island." },
  { name: "Codenames", players: "4-8", difficulty: 1, category: "party", image: "🕵️", descVi: "Trò chơi giải mã từ khóa theo nhóm.", descEn: "Team-based word guessing game." },
  { name: "Ticket to Ride", players: "2-5", difficulty: 2, category: "family", image: "🚂", descVi: "Xây dựng tuyến đường sắt xuyên lục địa.", descEn: "Build railway routes across the map." },
  { name: "Azul", players: "2-4", difficulty: 2, category: "strategy", image: "🎨", descVi: "Sắp xếp gạch mosaic tuyệt đẹp.", descEn: "Create beautiful mosaic patterns." },
  { name: "Uno", players: "2-10", difficulty: 1, category: "party", image: "🃏", descVi: "Trò chơi bài kinh điển cho mọi lứa tuổi.", descEn: "Classic card game for all ages." },
  { name: "Splendor", players: "2-4", difficulty: 2, category: "strategy", image: "💎", descVi: "Thu thập đá quý, xây dựng đế chế.", descEn: "Collect gems, build your empire." },
  { name: "Dixit", players: "3-6", difficulty: 1, category: "family", image: "🦋", descVi: "Trò chơi kể chuyện bằng hình ảnh.", descEn: "Storytelling through beautiful illustrations." },
  { name: "Coup", players: "2-6", difficulty: 1, category: "party", image: "👑", descVi: "Lừa dối và loại bỏ đối thủ.", descEn: "Bluff and eliminate your opponents." },
  { name: "7 Wonders", players: "3-7", difficulty: 3, category: "strategy", image: "🏛️", descVi: "Xây dựng kỳ quan thế giới cổ đại.", descEn: "Build ancient world wonders." },
  { name: "Carcassonne", players: "2-5", difficulty: 2, category: "family", image: "🏰", descVi: "Đặt gạch xây dựng vương quốc.", descEn: "Place tiles to build your kingdom." },
  { name: "Exploding Kittens", players: "2-5", difficulty: 1, category: "party", image: "🐱", descVi: "Tránh con mèo nổ bằng mọi giá!", descEn: "Avoid the exploding kitten at all costs!" },
  { name: "Wingspan", players: "1-5", difficulty: 3, category: "strategy", image: "🦅", descVi: "Thu hút các loài chim về khu bảo tồn.", descEn: "Attract birds to your wildlife preserve." },
];

const GameLibrary = () => {
  const { t } = useLanguage();
  const [search, setSearch] = useState("");
  const [filterPlayers, setFilterPlayers] = useState("");
  const [filterDiff, setFilterDiff] = useState("");
  const [filterCat, setFilterCat] = useState("");

  const filtered = games.filter((g) => {
    if (search && !g.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (filterCat && g.category !== filterCat) return false;
    if (filterDiff && g.difficulty !== Number(filterDiff)) return false;
    if (filterPlayers) {
      const max = parseInt(g.players.split("-").pop() || "0");
      const need = parseInt(filterPlayers);
      const min = parseInt(g.players.split("-")[0]);
      if (need < min || need > max) return false;
    }
    return true;
  });

  const randomPick = () => {
    const g = filtered[Math.floor(Math.random() * filtered.length)];
    if (g) alert(`🎲 ${g.name}!`);
  };

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-heading font-bold text-3xl md:text-5xl mb-4 glow-text">
            {t("Chọn nhiệm vụ của bạn", "Choose Your Quest")}
          </h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            {t("Khám phá hơn 50 board game tại quán", "Explore 50+ board games at our café")}
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-8 items-center justify-center">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder={t("Tìm game...", "Search games...")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-card border border-border rounded-lg pl-9 pr-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 w-48"
            />
          </div>

          <select value={filterPlayers} onChange={(e) => setFilterPlayers(e.target.value)} className="bg-card border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50">
            <option value="">{t("Số người", "Players")}</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6+</option>
          </select>

          <select value={filterDiff} onChange={(e) => setFilterDiff(e.target.value)} className="bg-card border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50">
            <option value="">{t("Độ khó", "Difficulty")}</option>
            <option value="1">{t("Dễ", "Easy")} ⭐</option>
            <option value="2">{t("Trung bình", "Medium")} ⭐⭐</option>
            <option value="3">{t("Khó", "Hard")} ⭐⭐⭐</option>
          </select>

          <select value={filterCat} onChange={(e) => setFilterCat(e.target.value)} className="bg-card border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50">
            <option value="">{t("Thể loại", "Category")}</option>
            <option value="party">Party</option>
            <option value="strategy">{t("Chiến thuật", "Strategy")}</option>
            <option value="family">{t("Gia đình", "Family")}</option>
          </select>

          <button onClick={randomPick} className="btn-gold inline-flex items-center gap-2 text-sm !px-4 !py-2">
            <Shuffle className="w-4 h-4" />
            {t("Chọn ngẫu nhiên", "Random Pick")}
          </button>
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {filtered.map((game, i) => (
            <div key={i} className="quest-card p-5 text-center group cursor-pointer" style={{ animationDelay: `${i * 0.05}s` }}>
              <div className="text-4xl mb-3">{game.image}</div>
              <h3 className="font-heading font-semibold text-sm mb-1">{game.name}</h3>
              <p className="text-xs text-muted-foreground mb-2">{t(game.descVi, game.descEn)}</p>
              <div className="flex items-center justify-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {game.players}</span>
                <span className="flex items-center gap-1">
                  {Array(game.difficulty).fill(0).map((_, j) => (
                    <Star key={j} className="w-3 h-3 fill-accent text-accent" />
                  ))}
                </span>
              </div>
              <span className="inline-block mt-2 text-[10px] bg-accent/10 text-accent rounded-full px-2 py-0.5 capitalize">
                {game.category === "strategy" ? t("Chiến thuật", "Strategy") : game.category === "family" ? t("Gia đình", "Family") : "Party"}
              </span>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground py-12">{t("Không tìm thấy game nào.", "No games found.")}</p>
        )}
      </div>
    </div>
  );
};

export default GameLibrary;
