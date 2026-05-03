import { useState, useMemo, useEffect, useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { CalendarDays, Clock, Users, MessageSquare, CheckCircle, User, Phone, Info, ChevronDown } from "lucide-react";

const TOTAL_TABLES = 10;
const MAX_PER_TABLE = 6;
const BLOCK_HOURS = 4;
const MAX_DAYS_AHEAD = 3; // includes today

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

// Start time options stop at 21:30 (latest allowed start)
const startTimeSlots = timeSlots.filter((s) => s <= "21:30");

const TIME_PATTERN = "^([01][0-9]|2[0-3]):[0-5][0-9]$";

const toMinutes = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};

// Generate mocked bookings (start_time only) for a given date key.
// Deterministic per-date so visuals are stable.
const generateBookingsForDate = (dateKey: string): string[] => {
  // Simple hash from string
  let seed = 0;
  for (let i = 0; i < dateKey.length; i++) seed = (seed * 31 + dateKey.charCodeAt(i)) % 2147483647;
  const rand = () => {
    seed = (seed * 1103515245 + 12345) % 2147483647;
    return seed / 2147483647;
  };
  const bookings: string[] = [];
  // Generate ~14-22 bookings biased to peak hours
  const count = 14 + Math.floor(rand() * 9);
  for (let i = 0; i < count; i++) {
    const r = rand();
    // Peak bias 17:00 - 20:30
    const idx = r < 0.55
      ? Math.floor(toMinutes("17:00") / 15) + Math.floor(rand() * 15)
      : Math.floor(rand() * startTimeSlots.length);
    const slot = startTimeSlots[Math.min(idx, startTimeSlots.length - 1)];
    bookings.push(slot);
  }
  return bookings;
};

const Booking = () => {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [showStartDropdown, setShowStartDropdown] = useState(false);
  const startWrapperRef = useRef<HTMLDivElement | null>(null);

  // Date options: today + next (MAX_DAYS_AHEAD - 1) days
  const dateOptions = useMemo(() => {
    const opts: { value: string; label: (vn: boolean) => string }[] = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dayNamesVN = ["Chủ nhật", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"];
    const dayNamesEN = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    for (let i = 0; i < MAX_DAYS_AHEAD; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, "0");
      const dd = String(d.getDate()).padStart(2, "0");
      const value = `${yyyy}-${mm}-${dd}`;
      const dow = d.getDay();
      opts.push({
        value,
        label: (vn) => {
          if (i === 0) return vn ? `Hôm nay (${dd}/${mm})` : `Today (${dd}/${mm})`;
          if (i === 1) return vn ? `Ngày mai (${dd}/${mm})` : `Tomorrow (${dd}/${mm})`;
          return vn ? `${dayNamesVN[dow]} (${dd}/${mm})` : `${dayNamesEN[dow]} (${dd}/${mm})`;
        },
      });
    }
    return opts;
  }, []);

  const [form, setForm] = useState({
    date: dateOptions[0]?.value ?? "",
    startTime: "",
    players: "2",
    notes: "",
    name: "",
    phone: "",
  });

  // Bookings for selected date
  const bookingsForDate = useMemo(
    () => (form.date ? generateBookingsForDate(form.date) : []),
    [form.date],
  );

  // Occupancy per slot: count bookings whose start_time <= slot AND start_time + 4h > slot
  const occupancyForDate = useMemo(() => {
    const blockMin = BLOCK_HOURS * 60;
    const map: Record<string, number> = {};
    timeSlots.forEach((slot) => {
      const slotMin = toMinutes(slot);
      let count = 0;
      bookingsForDate.forEach((b) => {
        const bMin = toMinutes(b);
        if (bMin <= slotMin && bMin + blockMin > slotMin) count += 1;
      });
      map[slot] = Math.min(TOTAL_TABLES, count);
    });
    return map;
  }, [bookingsForDate]);

  const startBooked = form.startTime ? occupancyForDate[form.startTime] ?? 0 : 0;
  const startAvailable = TOTAL_TABLES - startBooked;
  const noTablesAvailable = form.startTime !== "" && startAvailable <= 0;

  // Close dropdown on outside click
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (startWrapperRef.current && !startWrapperRef.current.contains(e.target as Node)) {
        setShowStartDropdown(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  // Scroll selected slot into view (centered) in the availability panel
  const slotRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  useEffect(() => {
    if (form.startTime && slotRefs.current[form.startTime]) {
      slotRefs.current[form.startTime]?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [form.startTime]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const selectedDateLabel = dateOptions.find((d) => d.value === form.date)?.label;

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
            {form.date} — {form.startTime} — {form.players} {t("người", "players")}
          </p>
          <button
            onClick={() => {
              setSubmitted(false);
              setForm({ date: dateOptions[0]?.value ?? "", startTime: "", players: "2", notes: "", name: "", phone: "" });
            }}
            className="btn-adventure mt-6 text-sm"
          >
            {t("Đặt thêm", "Book Another")}
          </button>
        </div>
      </div>
    );
  }

  const requiredStar = <span className="text-destructive">*</span>;

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
                  {t("Tên", "Name")} {requiredStar}
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
                  {t("Số điện thoại", "Phone")} {requiredStar}
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
                  {t("Ngày", "Date")} {requiredStar}
                </label>
                <select
                  required
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value, startTime: "" })}
                  className="w-full bg-input border border-border rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
                >
                  {dateOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label(t("vi", "en") === "vi")}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm font-heading font-semibold text-accent mb-2">
                  <Users className="w-4 h-4" />
                  {t("Số người", "Players")} {requiredStar}
                </label>
                <select
                  required
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
                    required
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
                {t("Giờ bắt đầu", "Start time")} {requiredStar}
              </label>
              <div className="relative" ref={startWrapperRef}>
                <input
                  required
                  type="text"
                  inputMode="numeric"
                  value={form.startTime}
                  onChange={(e) => setForm({ ...form, startTime: e.target.value })}
                  onFocus={() => setShowStartDropdown(true)}
                  onClick={() => setShowStartDropdown(true)}
                  pattern={TIME_PATTERN}
                  placeholder="HH:MM"
                  maxLength={5}
                  title={t("Định dạng 24h, từ 10:00 đến 21:30", "24h format, between 10:00 and 21:30")}
                  className="w-full bg-input border border-border rounded-lg px-4 py-2.5 pr-10 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
                />
                <ChevronDown
                  className={`absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-accent/70 pointer-events-none transition-transform ${
                    showStartDropdown ? "rotate-180" : ""
                  }`}
                />
                {showStartDropdown && (
                  <div className="absolute z-30 mt-1 w-full max-h-60 overflow-y-auto rounded-lg border border-accent/40 bg-card shadow-lg shadow-accent/10 animate-fade-in">
                    {startTimeSlots.map((slot) => {
                      const booked = occupancyForDate[slot] ?? 0;
                      const free = TOTAL_TABLES - booked;
                      const ratio = booked / TOTAL_TABLES;
                      const isSelected = form.startTime === slot;
                      const isFull = free <= 0;
                      const isNearly = !isFull && ratio >= 0.7;
                      const labelClass = isFull
                        ? "text-ember"
                        : isNearly
                        ? "text-accent"
                        : "text-muted-foreground";
                      return (
                        <button
                          type="button"
                          key={slot}
                          onClick={() => {
                            setForm({ ...form, startTime: slot });
                            setShowStartDropdown(false);
                          }}
                          className={`w-full flex items-center justify-between px-4 py-2 text-sm text-left transition-colors hover:bg-accent/10 ${
                            isSelected ? "bg-accent/15 text-accent" : "text-foreground"
                          }`}
                        >
                          <span className="font-heading">{slot}</span>
                          <span className={`text-xs ${labelClass}`}>
                            {isFull ? t("Liên hệ", "Contact") : `${free}/${TOTAL_TABLES}`}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
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
                    "Khung giờ này có thể đã hết bàn. Đừng lo, hãy gửi yêu cầu để tụi mình kiểm tra tình trạng bàn thực tế và báo lại cho bạn ngay nhé!",
                    "This time slot might be full. Don't worry, submit your request and we'll check the actual availability and get back to you immediately!",
                  )}
                </p>
              </div>
            )}

            <button
              type="submit"
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
                {t("Tình trạng bàn", "Table Availability")}
              </h3>
              {selectedDateLabel && (
                <p className="text-xs text-accent font-heading">
                  {selectedDateLabel(t("vi", "en") === "vi")}
                </p>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-forest border border-forest-light" />
                {t("Còn trống", "Available")}
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-accent/70 border border-accent" />
                {t("Gần đầy", "Nearly full")}
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-ember/80 border border-ember" />
                {t("Liên hệ để sắp xếp", "Contact us")}
              </span>
            </div>

            <div className="max-h-[420px] overflow-y-auto pr-1 space-y-1.5">
              {timeSlots.filter((s) => s.endsWith(":00") || s.endsWith(":30")).map((slot) => {
                // Group by 30-min interval: occupancy = max of the slot and the +15 sub-slot
                const subSlot = (() => {
                  const [h, m] = slot.split(":").map(Number);
                  const nm = m + 15;
                  return nm < 60 ? `${String(h).padStart(2,"0")}:${String(nm).padStart(2,"0")}` : null;
                })();
                const bookedRaw = Math.max(
                  occupancyForDate[slot] ?? 0,
                  subSlot ? (occupancyForDate[subSlot] ?? 0) : 0,
                );
                const booked = Math.min(TOTAL_TABLES, bookedRaw);
                const free = TOTAL_TABLES - booked;
                const ratio = booked / TOTAL_TABLES;
                const pct = ratio * 100;
                const status = free <= 0 ? "full" : ratio >= 0.7 ? "near" : "free";
                const barColor =
                  status === "full"
                    ? "bg-ember/80"
                    : status === "near"
                    ? "bg-accent/70"
                    : "bg-forest";
                const textColor =
                  status === "full"
                    ? "text-ember"
                    : status === "near"
                    ? "text-accent"
                    : "text-muted-foreground";
                const isSelected = form.startTime === slot;
                const isStartable = slot <= "21:30";
                return (
                  <button
                    type="button"
                    key={slot}
                    ref={(el) => { slotRefs.current[slot] = el; }}
                    disabled={!isStartable}
                    onClick={() => setForm({ ...form, startTime: slot })}
                    className={`w-full flex items-center gap-3 p-2 rounded-md border text-left transition-all hover:border-accent/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-border ${
                      isSelected ? "border-accent bg-accent/10" : "border-border bg-input/40"
                    }`}
                  >
                    <span className="font-heading text-xs text-foreground w-12 shrink-0">{slot}</span>
                    <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                      <div className={`h-full ${barColor} transition-all`} style={{ width: `${pct}%` }} />
                    </div>
                    <span className={`text-xs font-heading w-20 text-right shrink-0 ${textColor}`}>
                      {status === "full" ? t("Liên hệ", "Contact") : `${free}/${TOTAL_TABLES}`}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="flex gap-2 p-3 rounded-md bg-muted/40 border border-border">
              <Info className="w-4 h-4 text-accent shrink-0 mt-0.5" />
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                {t(
                  "Mỗi lượt đặt được tính block 4 tiếng. Tình trạng có thể thay đổi do khách walk-in hoặc kéo dài thời gian chơi. Nếu hết bàn, tụi mình sẽ kiểm tra lại lịch và liên lạc bạn để sắp xếp.",
                  "Each booking blocks a table for 4 hours. Availability may change due to walk-ins or extended play sessions. If we're full, we'll re-check and contact you to arrange.",
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
