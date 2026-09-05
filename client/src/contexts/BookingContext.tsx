import { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";
import BookingDialog from "@/components/BookingDialog";

interface BookingApi {
  /** Open the one booking dialog, optionally naming what it is about. */
  openBooking: (subject?: string) => void;
}

const BookingContext = createContext<BookingApi | null>(null);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [subject, setSubject] = useState<string | undefined>();

  const openBooking = useCallback((next?: string) => {
    setSubject(next);
    setIsOpen(true);
  }, []);

  const value = useMemo(() => ({ openBooking }), [openBooking]);

  return (
    <BookingContext.Provider value={value}>
      {children}
      <BookingDialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        subject={subject}
      />
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBooking must be used within BookingProvider");
  }
  return context;
}
