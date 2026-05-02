import { useState, useMemo, useEffect, useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { CalendarDays, Clock, Users, MessageSquare, CheckCircle, User, Phone, Info } from "lucide-react";

const TOTAL_TABLES = 10;
const MAX_PER_TABLE = 6;

const timeSlots = (() => {
  const slots: string[] = [];
  let h = 10, m = 0;
  while (h < 22 || (h === 22 && m <= 30)) {
    slots.push(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
    m += 15;
    if (m >= 60) { m = 0; h += 1; }
  }
  return slots;
})();

// Mocked occupancy per slot (in real app this comes from backend).
// Deterministic pseudo-random so the visual is stable across renders.
const mockOccupancy: Record<string, number> = (() => {
  const map: Record<string, number> = {};
  timeSlots.forEach((slot, i) => {
    const seed = (i * 9301 + 49297) % 233280;
    const rnd = seed / 233280;
    // Bias: peak hours (18:00 - 21:00) busier
    const [h] = slot.split(":").map(Number);
    const peak = h >= 18 && h <= 20 ? 4 : h >= 12 && h <= 14 ? 2 : 0;
    map[slot] = Math.min(TOTAL_TABLES, Math.floor(rnd * 6) + peak);
  });
  return map;
})();

const Booking = () => {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    date: "",
    startTime: "",
    endTime: "",
    players: "2",
    notes: "",
    name: "",
    phone: "",
  });

  const startBooked = form.startTime ? mockOccupancy[form.startTime] ?? 0 : 0;
  const startAvailable = TOTAL_TABLES - startBooked;
  const noTablesAvailable = form.startTime !== "" && startAvailable <= 0;

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
            {noTablesAvailable
              ? t("Đã nhận yêu cầu!", "Request Received!")
              : t("Đặt bàn thành công!", "Booking Confirmed!")}
          </h2>
          <p className="text-muted-foreground mb-2">
            {noTablesAvailable
              ? t(
                  "Khung giờ này tạm hết bàn. Tụi mình sẽ kiểm tra lại và liên lạc bạn sớm nhất.",
                  "This slot is currently full. We'll double-check and contact you shortly.",
                )
              : t("Cảm ơn bạn! Chúng tôi đã nhận được yêu cầu.", "Thank you! We've received your reservation.")}
          </p>
          <p className="text-sm text-accent font-heading">
            {form.date} — {form.startTime}
            {form.endTime ? ` → ${form.endTime}` : ""} — {form.players} {t("người", "players")}
          </p>
          <button
            onClick={() => {
              setSubmitted(false);
              setForm({ date: "", startTime: "", endTime: "", players: "2", notes: "", name: "", phone: "" });
            }}
            className="btn-adventure mt-6 text-sm"
          >
            {t("Đặt thêm", "Book Another")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="font-heading font-bold text-3xl md:text-5xl mb-4 glow-text">
            {t("Đặt bàn phiêu lưu", "Reserve Your Table")}
          </h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            {t(
              "Chọn ngày, giờ và số người — phiêu lưu đang chờ bạn!",
              "Pick a date, time, and party size — adventure awaits!",
            )}
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="lg:col-span-3 fantasy-border bg-card/50 p-6 md:p-8 space-y-5"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="flex items-center gap-2 text-sm font-heading font-semibold text-accent mb-2">
                  <User className="w-4 h-4" />
                  {t("Tên", "Name")}
                </label>
                <input
                  required
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-input border border-border rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
                  placeholder={t("Tên của bạn", "Your name")}
                />
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm font-heading font-semibold text-accent mb-2">
                  <Phone className="w-4 h-4" />
                  {t("Số điện thoại", "Phone")}
                </label>
                <input
                  required
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full bg-input border border-border rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
                  placeholder="0948 305 658"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="flex items-center gap-2 text-sm font-heading font-semibold text-accent mb-2">
                  <CalendarDays className="w-4 h-4" />
                  {t("Ngày", "Date")}
                </label>
                <input
                  required
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="w-full bg-input border border-border rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
                />
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
                  <option value="custom">{t("Khác", "Other")}</option>
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

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="flex items-center gap-2 text-sm font-heading font-semibold text-accent mb-2">
                  <Clock className="w-4 h-4" />
                  {t("Giờ bắt đầu", "Start time")} <span className="text-destructive">*</span>
                </label>
                <input
                  required
                  type="time"
                  value={form.startTime}
                  onChange={(e) => setForm({ ...form, startTime: e.target.value })}
                  list="time-slot-options"
                  min="10:00"
                  max="22:30"
                  step={900}
                  className="w-full bg-input border border-border rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
                />
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm font-heading font-semibold text-accent mb-2">
                  <Clock className="w-4 h-4" />
                  {t("Giờ kết thúc", "End time")}{" "}
                  <span className="text-muted-foreground text-xs font-normal">({t("tuỳ chọn", "optional")})</span>
                </label>
                <input
                  type="time"
                  value={form.endTime}
                  onChange={(e) => setForm({ ...form, endTime: e.target.value })}
                  list="time-slot-options"
                  min={form.startTime || "10:00"}
                  max="22:30"
                  step={900}
                  className="w-full bg-input border border-border rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
                />
              </div>
              <datalist id="time-slot-options">
                {timeSlots.map((slot) => (
                  <option key={slot} value={slot} />
                ))}
              </datalist>
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-heading font-semibold text-accent mb-2">
                <MessageSquare className="w-4 h-4" />
                {t("Ghi chú", "Notes")}
              </label>
              <textarea
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                rows={3}
                className="w-full bg-input border border-border rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 resize-none"
                placeholder={t(
                  "VD: Muốn chơi Catan, cần ghế thêm...",
                  "E.g.: Want to play Catan, need extra chairs...",
                )}
              />
            </div>

            {noTablesAvailable && (
              <div className="flex gap-3 p-4 rounded-lg border border-accent/40 bg-accent/5">
                <Info className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {t(
                    "Khung giờ này hiện đã hết bàn. Bạn vẫn có thể gửi yêu cầu — tụi mình sẽ kiểm tra lại và liên lạc bạn sớm nhất.",
                    "This time slot appears full. You can still submit — we'll double-check and contact you shortly.",
                  )}
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={!form.date || !form.startTime}
              className="btn-adventure w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {noTablesAvailable
                ? t("Gửi yêu cầu (chờ xác nhận)", "Send Request (pending confirmation)")
                : t("Xác nhận đặt bàn", "Confirm Booking")}
            </button>
          </form>

          {/* Availability panel */}
          <aside className="lg:col-span-2 fantasy-border bg-card/50 p-6 md:p-7 space-y-4 self-start">
            <div>
              <h3 className="font-heading font-bold text-lg glow-text mb-1">
                {t("Tình trạng bàn hôm nay", "Today's Availability")}
              </h3>
              <p className="text-xs text-muted-foreground">
                {t(
                  `Quán có ${TOTAL_TABLES} bàn, mỗi bàn tối đa ${MAX_PER_TABLE} người. Mở cửa 10:00 – 22:30.`,
                  `We have ${TOTAL_TABLES} tables (max ${MAX_PER_TABLE} per table). Open 10:00 – 22:30.`,
                )}
              </p>
            </div>

            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-forest border border-forest-light" />
                {t("Còn trống", "Free")}
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-accent/70 border border-accent" />
                {t("Sắp hết", "Few left")}
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-destructive/70 border border-destructive" />
                {t("Hết bàn", "Full")}
              </span>
            </div>

            <div className="max-h-[420px] overflow-y-auto pr-1 space-y-1.5">
              {timeSlots.map((slot) => {
                const booked = mockOccupancy[slot] ?? 0;
                const free = TOTAL_TABLES - booked;
                const pct = (booked / TOTAL_TABLES) * 100;
                const status =
                  free <= 0 ? "full" : free <= 3 ? "few" : "free";
                const barColor =
                  status === "full"
                    ? "bg-destructive/70"
                    : status === "few"
                    ? "bg-accent/70"
                    : "bg-forest";
                const isSelected = form.startTime === slot;
                return (
                  <button
                    type="button"
                    key={slot}
                    onClick={() => setForm({ ...form, startTime: slot })}
                    className={`w-full flex items-center gap-3 p-2 rounded-md border text-left transition-all hover:border-accent/50 ${
                      isSelected ? "border-accent bg-accent/10" : "border-border bg-input/40"
                    }`}
                  >
                    <span className="font-heading text-xs text-foreground w-12 shrink-0">{slot}</span>
                    <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                      <div className={`h-full ${barColor} transition-all`} style={{ width: `${pct}%` }} />
                    </div>
                    <span
                      className={`text-xs font-heading w-16 text-right shrink-0 ${
                        status === "full"
                          ? "text-destructive"
                          : status === "few"
                          ? "text-accent"
                          : "text-muted-foreground"
                      }`}
                    >
                      {free}/{TOTAL_TABLES}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="flex gap-2 p-3 rounded-md bg-muted/40 border border-border">
              <Info className="w-4 h-4 text-accent shrink-0 mt-0.5" />
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                {t(
                  "Trong trường hợp hết bàn, tụi mình sẽ kiểm tra lại lịch và liên lạc bạn để sắp xếp.",
                  "If we're fully booked, we'll re-check the schedule and contact you to arrange.",
                )}
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Booking;
