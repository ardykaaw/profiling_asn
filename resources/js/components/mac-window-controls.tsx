import React from 'react';

type Props = {
    title?: string;
    className?: string;
    badge?: string;
};

export default function MacWindowControls({ title, className = '', badge }: Props) {
    return (
        <div className={`flex items-center justify-between px-4 py-3 bg-slate-100/90 border-b border-slate-200 rounded-t-2xl select-none ${className}`}>
            <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]/50 inline-block shadow-xs hover:opacity-80 transition-opacity" />
                <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]/50 inline-block shadow-xs hover:opacity-80 transition-opacity" />
                <span className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]/50 inline-block shadow-xs hover:opacity-80 transition-opacity" />
            </div>

            {title && (
                <div className="text-xs font-semibold text-slate-700 truncate px-2 tracking-tight">
                    {title}
                </div>
            )}

            {badge ? (
                <span className="text-[10px] font-semibold tracking-wide px-2.5 py-0.5 rounded-full bg-white border border-slate-200 text-slate-700 shadow-xs">
                    {badge}
                </span>
            ) : (
                <div className="w-10" />
            )}
        </div>
    );
}
