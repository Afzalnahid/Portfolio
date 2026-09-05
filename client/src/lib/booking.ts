// Every booking entry point on the site reads from here. Change the calendar
// link, the address or the number once and the whole site follows.
export const BOOKING = {
  calendarUrl: "https://calendar.app.google/2kkn9abjZreibAJx6",
  email: "nahidafzal97@gmail.com",
  whatsapp: "8801690000732",
  label: "Book a call",
  blurb: "A 30-minute call, any timezone. Pick a slot or just email me.",
} as const;

/** Prefilled email for a given subject, so the first message is not blank. */
export function mailtoFor(subject?: string) {
  const line = subject
    ? `Your work on ${subject}`
    : "Your portfolio";
  const body = subject
    ? `Hi Nahid,\n\nI saw ${subject} on your portfolio and would like to talk.\n\n`
    : `Hi Nahid,\n\nI came across your portfolio and would like to talk.\n\n`;
  return `mailto:${BOOKING.email}?subject=${encodeURIComponent(line)}&body=${encodeURIComponent(body)}`;
}

/** Prefilled WhatsApp message, same idea. */
export function whatsappFor(subject?: string) {
  const text = subject
    ? `Hi Nahid, I saw ${subject} on your portfolio and would like to talk.`
    : `Hi Nahid, I came across your portfolio and would like to talk.`;
  return `https://wa.me/${BOOKING.whatsapp}?text=${encodeURIComponent(text)}`;
}
