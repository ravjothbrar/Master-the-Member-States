import { Globe } from 'lucide-react';

const Header = ({ onHomeClick }) => {
  return (
    <header className="bg-white shadow-md border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-4 py-5">
        <button
          onClick={onHomeClick}
          className="flex items-center justify-center gap-3 w-full group cursor-pointer transition-all duration-300 hover:opacity-80"
        >
          <Globe className="w-9 h-9 text-[#009EDB] transition-transform duration-300 group-hover:rotate-12" strokeWidth={1.5} />
          <h1 className="text-2xl md:text-[2rem] font-bold text-gray-800 tracking-tight transition-colors duration-300 group-hover:text-[#009EDB]">
            Master the Member States
          </h1>
        </button>
      </div>
    </header>
  );
};

export default Header;
