import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-emerald-950 text-emerald-50 py-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-4xl serif mb-6">TORAJA.</h2>
            <p className="text-emerald-200/60 max-w-sm font-light">
              Melestarikan warisan budaya takbenda Sulawesi Selatan melalui cerita digital.
            </p>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest text-emerald-400 mb-6">Navigasi</h4>
            <ul className="space-y-4 text-sm font-light text-emerald-100/80">
              <li><a href="#" className="hover:text-white transition-colors">Beranda</a></li>
              <li><a href="#collection" className="hover:text-white transition-colors">Koleksi</a></li>
              <li><a href="#philosophy" className="hover:text-white transition-colors">Filosofi</a></li>
              <li><a href="#ask-the-weaver" className="hover:text-white transition-colors">Pemandu AI</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest text-emerald-400 mb-6">Terhubung</h4>
            <ul className="space-y-4 text-sm font-light text-emerald-100/80">
              <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Email Kami</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-emerald-900 flex flex-col items-center text-center text-xs text-emerald-700 uppercase tracking-wider space-y-2">
          <p>&copy; {new Date().getFullYear()} Tenun Toraja Digital.</p>
          <p>Dirancang dengan Lokakarya</p>
          <div className="flex gap-4 mt-2">
            <a
              href="/privacy-policy"
              className="text-emerald-400 hover:text-white transition-colors normal-case"
            >
              Privacy Policy
            </a>
            <span className="text-emerald-700">|</span>
            <a
              href="/terms-of-service"
              className="text-emerald-400 hover:text-white transition-colors normal-case"
            >
              Terms of Service
            </a>
          </div>
          <p>
            Created by{' '}
            <a 
              href="https://web.facebook.com/emb777?locale=id_ID" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-emerald-400 hover:text-white transition-colors"
            >
              Muhamad Basim
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;