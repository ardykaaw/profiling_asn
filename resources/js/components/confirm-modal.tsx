import React, { useEffect } from 'react';
import { AlertTriangle, AlertCircle, CheckCircle2, Info, Loader2 } from 'lucide-react';
import MacWindowControls from '@/components/mac-window-controls';

export type ConfirmModalVariant = 'danger' | 'warning' | 'success' | 'info';

export interface ConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm?: () => void;
    title: string;
    description: React.ReactNode;
    confirmText?: string;
    cancelText?: string;
    variant?: ConfirmModalVariant;
    badgeText?: string;
    windowTitle?: string;
    details?: React.ReactNode;
    isProcessing?: boolean;
    isAlertOnly?: boolean;
}

export default function ConfirmModal({
    isOpen,
    onClose,
    onConfirm,
    title,
    description,
    confirmText = 'Lanjutkan',
    cancelText = 'Batal',
    variant = 'warning',
    badgeText,
    windowTitle,
    details,
    isProcessing = false,
    isAlertOnly = false,
}: ConfirmModalProps) {
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && !isProcessing) {
                onClose();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, isProcessing, onClose]);

    if (!isOpen) return null;

    const variantStyles = {
        danger: {
            iconBg: 'bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 ring-8 ring-rose-50 dark:ring-rose-950/30',
            icon: AlertTriangle,
            badge: badgeText || 'PERINGATAN',
            confirmBtn: 'bg-rose-600 hover:bg-rose-700 text-white shadow-rose-600/20 focus:ring-rose-500',
        },
        warning: {
            iconBg: 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 ring-8 ring-amber-50 dark:ring-amber-950/30',
            icon: AlertCircle,
            badge: badgeText || 'KONFIRMASI',
            confirmBtn: 'bg-amber-600 hover:bg-amber-700 text-white shadow-amber-600/20 focus:ring-amber-500',
        },
        success: {
            iconBg: 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 ring-8 ring-emerald-50 dark:ring-emerald-950/30',
            icon: CheckCircle2,
            badge: badgeText || 'SUKSES',
            confirmBtn: 'bg-emerald-700 hover:bg-emerald-800 text-white shadow-emerald-700/20 focus:ring-emerald-600',
        },
        info: {
            iconBg: 'bg-sky-100 dark:bg-sky-950/60 text-sky-700 dark:text-sky-400 ring-8 ring-sky-50 dark:ring-sky-950/30',
            icon: Info,
            badge: badgeText || 'INFORMASI',
            confirmBtn: 'bg-sky-700 hover:bg-sky-800 text-white shadow-sky-700/20 focus:ring-sky-600',
        },
    };

    const currentStyle = variantStyles[variant];
    const IconComponent = currentStyle.icon;

    return (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 dark:bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
            onClick={() => !isProcessing && onClose()}
        >
            <div 
                className="max-w-md w-full rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
                onClick={(e) => e.stopPropagation()}
            >
                <MacWindowControls 
                    title={windowTitle || (variant === 'danger' ? 'Konfirmasi Tindakan' : 'Notifikasi Sistem')} 
                    badge={currentStyle.badge} 
                />

                <div className="p-6 text-center space-y-4">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto transition-transform duration-300 hover:scale-105 ${currentStyle.iconBg}`}>
                        <IconComponent className="w-7 h-7" />
                    </div>

                    <div className="space-y-2">
                        <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-slate-100 tracking-tight">
                            {title}
                        </h3>
                        <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                            {description}
                        </div>
                    </div>

                    {details && (
                        <div className="text-left p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 text-xs text-slate-700 dark:text-slate-300">
                            {details}
                        </div>
                    )}

                    <div className="flex flex-col-reverse sm:flex-row gap-2.5 pt-3">
                        {!isAlertOnly && (
                            <button
                                type="button"
                                disabled={isProcessing}
                                onClick={onClose}
                                className="flex-1 py-2.5 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-xs hover:bg-slate-50 dark:hover:bg-slate-700/80 transition-all cursor-pointer disabled:opacity-50"
                            >
                                {cancelText}
                            </button>
                        )}
                        <button
                            type="button"
                            disabled={isProcessing}
                            onClick={() => {
                                if (onConfirm) onConfirm();
                                else onClose();
                            }}
                            className={`${isAlertOnly ? 'w-full' : 'flex-1'} py-2.5 px-4 rounded-xl font-bold text-xs transition-all shadow-md cursor-pointer flex items-center justify-center gap-1.5 disabled:opacity-60 ${currentStyle.confirmBtn}`}
                        >
                            {isProcessing ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    <span>Memproses...</span>
                                </>
                            ) : (
                                <span>{confirmText}</span>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
