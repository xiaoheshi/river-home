import { PROFILE } from '../../constants';

export function FallbackPage() {
  return (
    <div className="min-h-screen bg-[#050816] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-6">🚀</div>
        <h1 className="text-2xl font-bold text-white mb-4">River Hub</h1>
        <p className="text-slate-400 mb-8">
          您的浏览器不支持 WebGL，无法显示 3D 内容。请使用现代浏览器（Chrome、Firefox、Safari）访问以获得最佳体验。
        </p>
        <a
          href={PROFILE.contact.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
        >
          访问 GitHub
        </a>
      </div>
    </div>
  );
}
