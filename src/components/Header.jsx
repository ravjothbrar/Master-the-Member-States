import { Globe } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="flex items-center justify-center gap-3">
          <Globe className="w-8 h-8 text-[#009EDB]" strokeWidth={1.5} />
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 tracking-tight">
            Master the Member States
          </h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
