import React, { useEffect } from 'react';

interface AdSenseSlotProps {
  slotId?: string;
  format?: 'auto' | 'fluid' | 'rectangle' | 'horizontal' | 'vertical';
  type?: 'leaderboard' | 'in-feed' | 'sidebar' | 'article-banner';
  className?: string;
}

export const AdSenseSlot: React.FC<AdSenseSlotProps> = ({
  slotId = '1234567890',
  format = 'auto',
  type = 'leaderboard',
  className = ''
}) => {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      // Catch Google AdSense script initialization errors if adblocker is active
    }
  }, []);

  return (
    <div className={`my-6 mx-auto text-center overflow-hidden ${className}`}>
      {/* Visual Ad Container */}
      <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 relative min-h-[90px] flex flex-col items-center justify-center shadow-xs">
        {/* Tiny AdSense Label required for compliance */}
        <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1 select-none">
          Advertisement • विज्ञापन
        </div>

        {/* AdSense ins tag */}
        <ins
          className="adsbygoogle"
          style={{ display: 'block', width: '100%' }}
          data-ad-client={(import.meta as any).env?.VITE_ADSENSE_PUB_ID || 'ca-pub-0000000000000000'}
          data-ad-slot={slotId}
          data-ad-format={format}
          data-full-width-responsive="true"
        />

        {/* Fallback Preview Placeholder when AdSense script isn't live yet */}
        <div className="text-xs text-slate-500 font-medium py-2 px-4 rounded-lg bg-white/80 border border-slate-200/60 shadow-xs max-w-md">
          <span className="font-bold text-blue-900">Google AdSense Reserved Space</span>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Auto-optimized high-CTR ad unit placed here for maximum AdSense revenue.
          </p>
        </div>
      </div>
    </div>
  );
};
