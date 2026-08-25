import { generalInquiryLink } from "@/lib/whatsapp";

export function WhatsAppGlyph({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={`${className} fill-current`} aria-hidden>
      <path d="M16.004 3.2c-7.06 0-12.8 5.74-12.8 12.8 0 2.26.59 4.47 1.72 6.42L3.2 28.8l6.54-1.71a12.75 12.75 0 0 0 6.26 1.63h.01c7.05 0 12.79-5.74 12.79-12.8 0-3.42-1.33-6.64-3.75-9.05a12.71 12.71 0 0 0-9.04-3.67Zm0 23.39h-.01a10.6 10.6 0 0 1-5.4-1.48l-.39-.23-4.02 1.05 1.08-3.92-.25-.4a10.58 10.58 0 0 1-1.62-5.65c0-5.87 4.78-10.64 10.65-10.64 2.84 0 5.51 1.11 7.52 3.12a10.57 10.57 0 0 1 3.11 7.53c0 5.87-4.78 10.62-10.67 10.62Zm5.84-7.96c-.32-.16-1.94-.96-2.24-1.07-.3-.11-.52-.16-.74.16-.22.32-.85 1.07-1.04 1.29-.19.22-.38.24-.7.08-.32-.16-1.37-.5-2.6-1.61-.96-.86-1.61-1.92-1.8-2.24-.19-.32-.02-.5.14-.66.15-.15.32-.38.48-.56.16-.19.21-.32.32-.54.11-.22.05-.4-.03-.56-.08-.16-.72-1.78-1-2.44-.26-.64-.53-.55-.73-.56h-.63c-.22 0-.58.08-.88.4-.3.32-1.15 1.12-1.15 2.74s1.18 3.18 1.34 3.4c.16.22 2.31 3.53 5.6 4.95.78.34 1.39.54 1.87.69.79.25 1.5.21 2.07.13.63-.09 1.94-.79 2.21-1.56.27-.76.27-1.42.19-1.56-.08-.13-.3-.21-.62-.37Z" />
    </svg>
  );
}

export function WhatsAppFloat() {
  return (
    <a
      href={generalInquiryLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25d366] text-white shadow-[0_8px_24px_rgba(37,211,102,0.4)] transition-transform hover:scale-105"
    >
      <WhatsAppGlyph />
    </a>
  );
}
