import { FaCopyright } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="max-w-6xl mx-auto md:pt-12 pb-12 overflow-hidden">
      <div className="pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="flex items-center gap-2 text-[10px] md:text-sm font-bold text-zinc-600 uppercase tracking-widest">
          <FaCopyright /> {currentYear} Nay Thu Htun. ALL RIGHTS RESERVED.
        </p>
        <p className="text-[10px] md:text-sm font-bold text-zinc-600 uppercase tracking-widest">
          Built with React & Framer Motion
        </p>
      </div>
    </footer>
  );
}
