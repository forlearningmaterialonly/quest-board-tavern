import { useLanguage } from "@/contexts/LanguageContext";
import { Coffee, Leaf, GlassWater, Cookie } from "lucide-react";

interface MenuItem {
  name: string;
  nameEn: string;
  price: string;
}

interface MenuCategory {
  title: string;
  titleEn: string;
  icon: typeof Coffee;
  items: MenuItem[];
}

const menuData: MenuCategory[] = [
  {
    title: "Cà phê",
    titleEn: "Coffee",
    icon: Coffee,
    items: [
      { name: "Cà phê đen", nameEn: "Black Coffee", price: "25.000₫" },
      { name: "Cà phê sữa", nameEn: "Milk Coffee", price: "30.000₫" },
      { name: "Bạc xỉu", nameEn: "Bạc Xỉu", price: "30.000₫" },
      { name: "Espresso", nameEn: "Espresso", price: "35.000₫" },
      { name: "Cappuccino", nameEn: "Cappuccino", price: "40.000₫" },
      { name: "Latte", nameEn: "Latte", price: "40.000₫" },
    ],
  },
  {
    title: "Trà",
    titleEn: "Tea",
    icon: Leaf,
    items: [
      { name: "Trà đào cam sả", nameEn: "Peach Lemongrass Tea", price: "35.000₫" },
      { name: "Trà vải", nameEn: "Lychee Tea", price: "35.000₫" },
      { name: "Trà chanh mật ong", nameEn: "Honey Lemon Tea", price: "30.000₫" },
      { name: "Trà sen", nameEn: "Lotus Tea", price: "25.000₫" },
    ],
  },
  {
    title: "Trà sữa",
    titleEn: "Milk Tea",
    icon: GlassWater,
    items: [
      { name: "Trà sữa truyền thống", nameEn: "Classic Milk Tea", price: "35.000₫" },
      { name: "Trà sữa matcha", nameEn: "Matcha Milk Tea", price: "40.000₫" },
      { name: "Trà sữa taro", nameEn: "Taro Milk Tea", price: "40.000₫" },
      { name: "Trà sữa socola", nameEn: "Chocolate Milk Tea", price: "40.000₫" },
    ],
  },
  {
    title: "Snacks",
    titleEn: "Snacks",
    icon: Cookie,
    items: [
      { name: "Khoai tây chiên", nameEn: "French Fries", price: "35.000₫" },
      { name: "Bánh mì bơ tỏi", nameEn: "Garlic Bread", price: "25.000₫" },
      { name: "Nachos phô mai", nameEn: "Cheese Nachos", price: "45.000₫" },
      { name: "Xúc xích nướng", nameEn: "Grilled Sausage", price: "30.000₫" },
      { name: "Bắp rang bơ", nameEn: "Popcorn", price: "20.000₫" },
    ],
  },
];

const MenuPage = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="font-heading font-bold text-3xl md:text-5xl mb-4 glow-text">
            {t("Thực đơn quán rượu", "Tavern Menu")}
          </h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            {t("Nạp năng lượng cho cuộc phiêu lưu tiếp theo", "Fuel up for your next adventure")}
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-10">
          {menuData.map((cat, i) => (
            <div key={i} className="fantasy-border bg-card/50 p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                  <cat.icon className="w-5 h-5 text-accent" />
                </div>
                <h2 className="font-heading font-bold text-xl text-accent">
                  {t(cat.title, cat.titleEn)}
                </h2>
              </div>

              <div className="space-y-3">
                {cat.items.map((item, j) => (
                  <div key={j} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                    <span className="text-sm text-foreground">
                      {t(item.name, item.nameEn)}
                    </span>
                    <span className="text-sm font-heading font-semibold text-accent ml-4 whitespace-nowrap">
                      {item.price}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuPage;
