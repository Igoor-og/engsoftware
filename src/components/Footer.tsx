import React from 'react';
import { Instagram, Globe, ExternalLink, Heart, Terminal } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full mt-auto py-5 border-t border-zinc-800/80 bg-[#0d0f14]/90 backdrop-blur-md">
      <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
        
        {/* Creator Info */}
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-500" />
          <span className="text-zinc-300 font-medium tracking-wide">
            Criado por <strong className="text-white hover:text-red-400 transition-colors">Igor Almeida</strong>
          </span>
          <span className="text-zinc-600 hidden sm:inline">•</span>
          <span className="text-zinc-500 hidden sm:inline">
            © {new Date().getFullYear()}
          </span>
        </div>

        {/* Links to Instagram and Website */}
        <div className="flex items-center gap-3">
          {/* Instagram Link */}
          <a
            href="https://instagram.com/igoralmeidall"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 hover:border-red-500/60 hover:bg-zinc-800/80 text-zinc-300 hover:text-white transition-all duration-200 group shadow-sm hover:shadow-red-500/10"
            title="Instagram: @igoralmeidall"
          >
            <Instagram className="w-4 h-4 text-red-500 group-hover:scale-110 transition-transform" />
            <span className="font-medium tracking-tight">@igoralmeidall</span>
            <ExternalLink className="w-3 h-3 text-zinc-500 group-hover:text-red-400 opacity-60 group-hover:opacity-100 transition-opacity" />
          </a>

          {/* Website Link */}
          <a
            href="https://igoralmeida.online"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 hover:border-red-500/60 hover:bg-zinc-800/80 text-zinc-300 hover:text-white transition-all duration-200 group shadow-sm hover:shadow-red-500/10"
            title="Website: igoralmeida.online"
          >
            <Globe className="w-4 h-4 text-red-500 group-hover:scale-110 transition-transform" />
            <span className="font-medium tracking-tight">igoralmeida.online</span>
            <ExternalLink className="w-3 h-3 text-zinc-500 group-hover:text-red-400 opacity-60 group-hover:opacity-100 transition-opacity" />
          </a>
        </div>
      </div>
    </footer>
  );
};
