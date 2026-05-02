import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { CalendarDays, Clock, Users, MessageSquare, CheckCircle } from "lucide-react";

const timeSlots = [
  "09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00"
];

const Booking = () => {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ date: "", time: "", players: "2", notes: "", name: "", phone: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen pt-20 pb-16 flex items-center justify-center">
        <div className="quest-card p-8 md:p-12 text-center max-w-md animate-fade-in">
          <CheckCircle className="w-16 h-16 text-accent mx-auto mb-4" />
          <h2 className="font-heading font-bold text-2xl mb-2 glow-text">
            {t("Đặt bàn thành công!", "Booking Confirmed!")}
          </h2>
          <p className="text-muted-foreground mb-2">
            {t("Cảm ơn bạn! Chúng tôi đã nhận được yêu cầu.", "Thank you! We've received your reservation.")}
          </p>
          <p className="text-sm text-accent font-heading">
            {form.date} — {form.time} — {form.players} {t("người", "players")}
          </p>
          <button onClick={() => { setSubmitted(false); setForm({ date: "", time: "", players: "2", notes: "", name: "", phone: "" }); }} className="btn-adventure mt-6 text-sm">
            {t("Đặt thêm", "Book Another")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="font-heading font-bold text-3xl md:text-5xl mb-4 glow-text">
            {t("Đặt bàn phiêu lưu", "Reserve Your Table")}
          </h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            {t("Chọn ngày, giờ và số người — phiêu lưu đang chờ bạn!", "Pick a date, time, and party size — adventure awaits!")}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="max-w-lg mx-auto fantasy-border bg-card/50 p-6 md:p-8 space-y-5">
          <div>
            <label className="flex items-center gap-2 text-sm font-heading font-semibold text-accent mb-2">
              <CalendarDays className="w-4 h-4" />
              {t("Tên", "Name")}
            </label>
            <input required type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full bg-input border border-border rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50" placeholder={t("Tên của bạn", "Your name")} />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-heading font-semibold text-accent mb-2">
              <MessageSquare className="w-4 h-4" />
              {t("Số điện thoại", "Phone")}
            </label>
            <input required type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full bg-input border border-border rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50" placeholder="0948 305 658" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="flex items-center gap-2 text-sm font-heading font-semibold text-accent mb-2">
                <CalendarDays className="w-4 h-4" />
                {t("Ngày", "Date")}
              </label>
              <input required type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="w-full bg-input border border-border rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50" />
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-heading font-semibold text-accent mb-2">
                <Users className="w-4 h-4" />
                {t("Số người", "Players")}
              </label>
              <select
                value={["2","3","4","5","6","7","8","9","10"].includes(form.players) ? form.players : "custom"}
                onChange={(e) => setForm({ ...form, players: e.target.value === "custom" ? "" : e.target.value })}
                className="w-full bg-input border border-border rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
              >
                {[2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                  <option key={n} value={n}>{n} {t("người", "players")}</option>
                ))}
                <option value="custom">{t("Khác (tự nhập)", "Other (enter value)")}</option>
              </select>
              {!["2","3","4","5","6","7","8","9","10"].includes(form.players) && (
                <input
                  type="number"
                  min={1}
                  value={form.players}
                  onChange={(e) => setForm({ ...form, players: e.target.value })}
                  placeholder={t("Nhập số người", "Enter number of players")}
                  className="mt-2 w-full bg-input border border-border rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
                />
              )}
            </div>
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-heading font-semibold text-accent mb-2">
              <Clock className="w-4 h-4" />
              {t("Chọn giờ", "Time Slot")}
            </label>
            <div className="grid grid-cols-4 gap-2">
              {timeSlots.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setForm({ ...form, time: slot })}
                  className={`text-xs font-heading py-2 rounded-lg border transition-all ${
                    form.time === slot
                      ? "bg-accent text-accent-foreground border-accent"
                      : "bg-input border-border text-muted-foreground hover:border-accent/50"
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-heading font-semibold text-accent mb-2">
              <MessageSquare className="w-4 h-4" />
              {t("Ghi chú", "Notes")}
            </label>
            <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} rows={3} className="w-full bg-input border border-border rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 resize-none" placeholder={t("VD: Muốn chơi Catan, cần ghế thêm...", "E.g.: Want to play Catan, need extra chairs...")} />
          </div>

          <button type="submit" disabled={!form.date || !form.time} className="btn-adventure w-full disabled:opacity-50 disabled:cursor-not-allowed">
            {t("Xác nhận đặt bàn", "Confirm Booking")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Booking;
