import { useState, useMemo, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import MacWindowControls from '@/components/mac-window-controls';
import NineBoxSimata from '@/components/nine-box-simata';
import { 
    Question, 
    SubtestItem, 
    buildSubtestsForPackage, 
    SUBTEST_METADATA, 
    SUBTEST_DIAGNOSTICS,
    packages as defaultPackagesList 
} from '@/lib/subtest-helper';
import {
    FileCheck,
    CheckCircle2,
    XCircle,
    AlertCircle,
    BookOpen,
    Play,
    Printer,
    ArrowLeft,
    Clock,
    Lock,
    Sparkles,
    Target,
    Award,
    Filter,
    HelpCircle,
    Info,
    Layers,
    BarChart3,
    Eye,
    ZoomIn,
    X,
    FileText,
    Calendar,
    Check
} from 'lucide-react';

interface HistoryItem {
    id: number;
    package_id: string;
    package_cat: string;
    title: string;
    status: 'IN_PROGRESS' | 'COMPLETED';
    answered_count: number;
    score?: number | null;
    talent_quadrant?: string | null;
    career_recommendation?: string | null;
    is_passed?: boolean | null;
    date?: string | null;
    answers?: Record<number, number>;
}

interface PembahasanPageProps {
    dbQuestions: Question[];
    historyList: HistoryItem[];
    initialSessionId?: number | null;
    initialPackageId?: string | null;
}

export default function PembahasanPage({
    dbQuestions = [],
    historyList = [],
    initialSessionId,
    initialPackageId,
}: PembahasanPageProps) {
    const rawBank = dbQuestions && dbQuestions.length > 0 ? dbQuestions : [];

    // Selected session for review
    const [selectedSession, setSelectedSession] = useState<HistoryItem | null>(null);
    const [activeSubtests, setActiveSubtests] = useState<SubtestItem[]>([]);
    const [answers, setAnswers] = useState<Record<number, number>>({});
    const [isProgressive, setIsProgressive] = useState(false);

    // Filter in review mode
    const [reviewStatusFilter, setReviewStatusFilter] = useState<'ALL' | 'CORRECT' | 'WRONG' | 'UNANSWERED'>('ALL');
    const [reviewCategoryFilter, setReviewCategoryFilter] = useState<string>('ALL');

    // Image preview modal
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    // Read stored in-progress answers from localStorage as freshest fallback
    const getLocalSavedAnswers = (pkgId: string, pkgTitle: string) => {
        try {
            const raw = localStorage.getItem('tryout_saved_session');
            if (raw) {
                const parsed = JSON.parse(raw);
                if (parsed?.answers && (parsed.packageId === pkgId || parsed.packageTitle === pkgTitle)) {
                    return parsed.answers;
                }
            }
        } catch (e) {
            console.error(e);
        }
        return null;
    };

    // Open detail review for a session
    const handleOpenSessionReview = (sess: HistoryItem) => {
        setSelectedSession(sess);
        const subtests = buildSubtestsForPackage(sess.package_cat || 'SEMUA', rawBank);
        setActiveSubtests(subtests);

        let activeAnswers: Record<number, number> = sess.answers || {};

        if (sess.status === 'IN_PROGRESS') {
            const localAnswers = getLocalSavedAnswers(sess.package_id, sess.title);
            if (localAnswers && Object.keys(localAnswers).length > 0) {
                activeAnswers = localAnswers;
            }
            setIsProgressive(true);
        } else {
            setIsProgressive(false);
        }

        setAnswers(activeAnswers);
        setReviewStatusFilter('ALL');
        setReviewCategoryFilter('ALL');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Auto open if query params match
    useEffect(() => {
        if (initialSessionId) {
            const found = historyList.find(s => s.id === initialSessionId);
            if (found) handleOpenSessionReview(found);
        } else if (initialPackageId) {
            const found = historyList.find(s => s.package_id === initialPackageId || s.title.includes(initialPackageId));
            if (found) handleOpenSessionReview(found);
        }
    }, [initialSessionId, initialPackageId]);

    // Flatten all questions of active subtests
    const activeQuestions = useMemo(() => {
        const list: Question[] = [];
        activeSubtests.forEach(sub => {
            sub.questions.forEach(q => list.push(q));
        });
        return list;
    }, [activeSubtests]);

    const answeredCount = Object.keys(answers).length;
    const unansweredCount = Math.max(0, activeQuestions.length - answeredCount);

    // Scoring & Diagnostics for review
    const { normalizedScores, totalCorrectCount, subtestBreakdownList, boxNumber, boxTitle, axisX, axisY } = useMemo(() => {
        let correctCount = 0;
        const catPoints: Record<string, number> = { POTENSI: 0, MANAJERIAL: 0, DIGITAL: 0, KARIR: 0 };
        const catMax: Record<string, number> = { POTENSI: 0, MANAJERIAL: 0, DIGITAL: 0, KARIR: 0 };
        const subScores: Record<string, { current: number; max: number; title: string; sessionName: string }> = {};

        activeQuestions.forEach(q => {
            const userChoice = answers[q.id];
            const isAnswered = userChoice !== undefined;
            const subId = SUBTEST_METADATA[q.subkategori] ? q.subkategori : 'potensi-figural';

            if (!subScores[subId]) {
                const meta = SUBTEST_METADATA[subId];
                subScores[subId] = {
                    current: 0,
                    max: 0,
                    title: meta?.title || subId,
                    sessionName: meta?.sessionName || '',
                };
            }

            if (q.kategori === 'KARIR') {
                catMax['KARIR'] += 1;
                subScores[subId].max += 1;
                if (isAnswered) {
                    correctCount++;
                    catPoints['KARIR'] += 1;
                    subScores[subId].current += 1;
                }
            } else if (q.scores && Array.isArray(q.scores) && q.scores.length > 0) {
                const maxVal = Math.max(...(q.scores.map(Number).filter(n => !isNaN(n)) || [5]));
                catMax[q.kategori] = (catMax[q.kategori] || 0) + maxVal;
                subScores[subId].max += maxVal;

                if (isAnswered && typeof q.scores[userChoice] === 'number') {
                    const earned = Number(q.scores[userChoice]);
                    catPoints[q.kategori] = (catPoints[q.kategori] || 0) + earned;
                    subScores[subId].current += earned;
                    if (earned === maxVal) correctCount++;
                }
            } else {
                catMax[q.kategori] = (catMax[q.kategori] || 0) + 1;
                subScores[subId].max += 1;
                if (isAnswered) {
                    if (userChoice === q.jawaban) {
                        correctCount++;
                        catPoints[q.kategori] = (catPoints[q.kategori] || 0) + 1;
                        subScores[subId].current += 1;
                    }
                }
            }
        });

        const norm: Record<string, number> = {};
        ['POTENSI', 'MANAJERIAL', 'DIGITAL', 'KARIR'].forEach(c => {
            const max = catMax[c] || 0;
            norm[c] = max > 0 ? Math.round(((catPoints[c] || 0) / max) * 100) : 0;
        });

        // 9 Box SIMATA calculation
        const x = Math.round((norm['POTENSI'] * 0.5) + (norm['DIGITAL'] * 0.5));
        const y = norm['MANAJERIAL'];

        let box = 1;
        let title = 'Kinerja Rendah Potensial Rendah';

        if (y >= 80) {
            if (x >= 80) { box = 9; title = 'Kinerja Tinggi Potensial Tinggi (Talenta Unggul)'; }
            else if (x >= 60) { box = 7; title = 'Kinerja Tinggi Potensial Menengah'; }
            else { box = 4; title = 'Kinerja Tinggi Potensial Rendah'; }
        } else if (y >= 60) {
            if (x >= 80) { box = 8; title = 'Kinerja Sesuai Potensial Tinggi'; }
            else if (x >= 60) { box = 5; title = 'Kinerja Sesuai Potensial Menengah'; }
            else { box = 2; title = 'Kinerja Sesuai Potensial Rendah'; }
        } else {
            if (x >= 80) { box = 6; title = 'Kinerja Rendah Potensial Tinggi'; }
            else if (x >= 60) { box = 3; title = 'Kinerja Rendah Potensial Menengah'; }
            else { box = 1; title = 'Kinerja Rendah Potensial Rendah'; }
        }

        const breakdown = Object.entries(subScores).map(([sId, val]) => {
            const pct = val.max > 0 ? Math.round((val.current / val.max) * 100) : 0;
            const diag = SUBTEST_DIAGNOSTICS[sId];
            let rec = 'Materi pembelajaran standar.';
            let status = 'Perlu Peningkatan';
            if (pct >= 80) {
                status = 'Sangat Baik';
                rec = diag?.rec_high || 'Pertahankan performa pemahaman.';
            } else if (pct >= 65) {
                status = 'Cukup / Standar';
                rec = diag?.rec_mid || 'Perbanyak latihan soal sejenis.';
            } else {
                status = 'Perlu Bimbingan';
                rec = diag?.rec_low || 'Pelajari modul kisi-kisi terkait.';
            }
            return {
                id: sId,
                title: val.title,
                sessionName: val.sessionName,
                score: pct,
                status,
                rec,
            };
        });

        return {
            normalizedScores: norm,
            totalCorrectCount: correctCount,
            subtestBreakdownList: breakdown,
            boxNumber: box,
            boxTitle: title,
            axisX: x,
            axisY: y,
        };
    }, [activeQuestions, answers]);

    // Anti-leak filter for detail questions
    const filteredQuestions = useMemo(() => {
        return activeQuestions.filter(q => {
            const userChoice = answers[q.id];
            const isAnswered = userChoice !== undefined;

            // STRICT ANTI-LEAK: When reviewing in-progress test, hide unanswered questions completely!
            if (isProgressive && !isAnswered) return false;

            let isCorrect = false;
            if (q.kategori === 'KARIR') {
                isCorrect = isAnswered;
            } else if (q.scores && Array.isArray(q.scores) && typeof q.scores[userChoice] === 'number') {
                isCorrect = Number(q.scores[userChoice]) === 5;
            } else {
                isCorrect = userChoice === q.jawaban;
            }

            if (reviewStatusFilter === 'CORRECT' && !isCorrect) return false;
            if (reviewStatusFilter === 'WRONG' && (!isAnswered || isCorrect)) return false;
            if (reviewStatusFilter === 'UNANSWERED' && isAnswered) return false;

            if (reviewCategoryFilter !== 'ALL' && q.kategori !== reviewCategoryFilter) return false;

            return true;
        });
    }, [activeQuestions, answers, isProgressive, reviewStatusFilter, reviewCategoryFilter]);

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="flex flex-1 flex-col gap-6 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full font-sans text-slate-900 bg-[#F8F9FA] min-h-screen">
            <Head title={selectedSession ? `Pembahasan: ${selectedSession.title}` : 'Riwayat Pengerjaan & Pembahasan Asesmen ASN'} />

            {/* Print Styles */}
            <style>{`
                @media print {
                    nav, header, aside, .no-print {
                        display: none !important;
                    }
                    body {
                        background: #fff !important;
                        color: #000 !important;
                        font-size: 11pt !important;
                    }
                    .print-only {
                        display: block !important;
                    }
                    .card-box {
                        break-inside: avoid;
                        page-break-inside: avoid;
                        border: 1px solid #cbd5e1 !important;
                        box-shadow: none !important;
                        margin-bottom: 1.5rem !important;
                    }
                }
                .print-only {
                    display: none;
                }
            `}</style>

            {/* VIEW 1: DIRECT RIWAYAT PENGERJAAN (Ketika belum memilih sesi untuk di-review) */}
            {!selectedSession ? (
                <div className="space-y-6 animate-in fade-in duration-300">
                    {/* Header Window */}
                    <div className="rounded-2xl border border-slate-200 bg-white shadow-xs overflow-hidden">
                        <MacWindowControls title="Pusat Riwayat & Pembahasan Asesmen ASN" badge="REKAM EVALUASI CAT" />
                        <div className="p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <div className="space-y-1.5">
                                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full border border-emerald-200 bg-emerald-50 text-emerald-800 text-xs font-semibold">
                                    <Sparkles className="w-3.5 h-3.5" />
                                    <span>Rekam Evaluasi Pengerjaan & Pembahasan Resmi</span>
                                </div>
                                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                                    Riwayat Pengerjaan & Pembahasan Soal
                                </h1>
                                <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
                                    Daftar seluruh simulasi asesmen yang telah atau sedang Anda kerjakan. Buka kunci jawaban resmi, bobot nilai 8 dimensi PermenPAN-RB, literasi digital SPBE, dan evaluasi capaian per subtes.
                                </p>
                            </div>

                            <div className="flex flex-wrap items-center gap-3 shrink-0">
                                <Link
                                    href="/tryout"
                                    className="px-5 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs flex items-center gap-2 shadow-xs transition-all"
                                >
                                    <Play className="w-4 h-4 fill-white" />
                                    <span>Mulai Simulasi Baru</span>
                                </Link>
                                <Link
                                    href="/materi"
                                    className="px-4 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition-all"
                                >
                                    <BookOpen className="w-3.5 h-3.5" />
                                    <span>Kisi-Kisi Materi</span>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Quick Stat Pill Indicators */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <div className="p-4 rounded-xl border border-slate-200 bg-white flex items-center gap-3">
                            <div className="p-2.5 rounded-lg bg-emerald-100 text-emerald-800 shrink-0">
                                <FileCheck className="w-5 h-5" />
                            </div>
                            <div>
                                <div className="text-xl font-black text-slate-900">{historyList.length}</div>
                                <div className="text-[11px] text-slate-500 font-medium">Total Sesi Terdata</div>
                            </div>
                        </div>

                        <div className="p-4 rounded-xl border border-slate-200 bg-white flex items-center gap-3">
                            <div className="p-2.5 rounded-lg bg-blue-100 text-blue-800 shrink-0">
                                <CheckCircle2 className="w-5 h-5" />
                            </div>
                            <div>
                                <div className="text-xl font-black text-slate-900">
                                    {historyList.filter(s => s.status === 'COMPLETED').length}
                                </div>
                                <div className="text-[11px] text-slate-500 font-medium">Sesi Tuntas Diselesaikan</div>
                            </div>
                        </div>

                        <div className="p-4 rounded-xl border border-slate-200 bg-white flex items-center gap-3">
                            <div className="p-2.5 rounded-lg bg-amber-100 text-amber-800 shrink-0">
                                <Clock className="w-5 h-5" />
                            </div>
                            <div>
                                <div className="text-xl font-black text-slate-900">
                                    {historyList.filter(s => s.status === 'IN_PROGRESS').length}
                                </div>
                                <div className="text-[11px] text-slate-500 font-medium">Sesi Berjalan (Draft)</div>
                            </div>
                        </div>

                        <div className="p-4 rounded-xl border border-slate-200 bg-white flex items-center gap-3">
                            <div className="p-2.5 rounded-lg bg-slate-100 text-slate-800 shrink-0">
                                <Lock className="w-5 h-5" />
                            </div>
                            <div>
                                <div className="text-xs font-black text-emerald-800">Proteksi Anti-Bocor</div>
                                <div className="text-[11px] text-slate-500 font-medium">Hanya soal terjawab terbuka</div>
                            </div>
                        </div>
                    </div>

                    {/* Table / List of Attempts */}
                    <div className="rounded-2xl border border-slate-200 bg-white shadow-xs overflow-hidden">
                        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                            <div>
                                <h3 className="font-extrabold text-slate-900 text-base">Daftar Riwayat Asesmen</h3>
                                <p className="text-xs text-slate-500">Pilih salah satu sesi di bawah untuk langsung membuka evaluasi dan kunci pembahasannya.</p>
                            </div>
                        </div>

                        {historyList.length === 0 ? (
                            <div className="p-12 text-center space-y-3">
                                <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                                    <BookOpen className="w-6 h-6" />
                                </div>
                                <h4 className="font-extrabold text-slate-800 text-sm">Belum Ada Riwayat Pengerjaan</h4>
                                <p className="text-xs text-slate-500 max-w-md mx-auto">
                                    Anda belum memulai simulasi asesmen. Silakan buka menu Simulasi Asesmen CAT untuk mulai mengerjakan soal.
                                </p>
                                <div className="pt-2">
                                    <Link
                                        href="/tryout"
                                        className="px-4 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs inline-flex items-center gap-1.5 transition-all shadow-xs"
                                    >
                                        <Play className="w-3.5 h-3.5 fill-white" />
                                        <span>Buka Simulasi CAT</span>
                                    </Link>
                                </div>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-xs">
                                    <thead>
                                        <tr className="border-b border-slate-200 bg-slate-50/70 text-slate-500 font-bold uppercase text-[10px] tracking-wider">
                                            <th className="py-3 px-4">Status</th>
                                            <th className="py-3 px-4">Judul Modul / Sesi</th>
                                            <th className="py-3 px-4">Waktu Pengerjaan</th>
                                            <th className="py-3 px-4">Soal Terjawab</th>
                                            <th className="py-3 px-4">Hasil / Nilai</th>
                                            <th className="py-3 px-4 text-right">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {historyList.map((item) => {
                                            const isDone = item.status === 'COMPLETED';

                                            return (
                                                <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                                                    {/* Status Badge */}
                                                    <td className="py-3.5 px-4 whitespace-nowrap">
                                                        {isDone ? (
                                                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                                                                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                                                                <span>Selesai</span>
                                                            </span>
                                                        ) : (
                                                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300/60">
                                                                <Clock className="w-3 h-3 text-amber-700" />
                                                                <span>Sedang Dikerjakan</span>
                                                            </span>
                                                        )}
                                                    </td>

                                                    {/* Title */}
                                                    <td className="py-3.5 px-4">
                                                        <div className="font-extrabold text-slate-900 text-xs sm:text-sm">
                                                            {item.title}
                                                        </div>
                                                        {item.talent_quadrant && (
                                                            <div className="text-[11px] text-slate-500 mt-0.5 font-medium">
                                                                {item.talent_quadrant}
                                                            </div>
                                                        )}
                                                    </td>

                                                    {/* Date */}
                                                    <td className="py-3.5 px-4 whitespace-nowrap text-slate-600 font-mono text-[11px]">
                                                        {item.date || '-'}
                                                    </td>

                                                    {/* Answered Count */}
                                                    <td className="py-3.5 px-4 whitespace-nowrap">
                                                        <span className="font-bold text-slate-800">
                                                            {item.answered_count} Butir Soal
                                                        </span>
                                                        {!isDone && (
                                                            <div className="text-[10px] text-amber-700 font-medium">
                                                                Hanya butir ini yang terbuka
                                                            </div>
                                                        )}
                                                    </td>

                                                    {/* Score */}
                                                    <td className="py-3.5 px-4 whitespace-nowrap">
                                                        {isDone ? (
                                                            <div className="flex items-center gap-1.5">
                                                                <span className="text-sm font-black text-slate-900 px-2 py-0.5 rounded bg-slate-100">
                                                                    {item.score !== null && item.score !== undefined ? `${item.score}/100` : 'Tuntas'}
                                                                </span>
                                                                {item.is_passed !== null && (
                                                                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                                                                        item.is_passed ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
                                                                    }`}>
                                                                        {item.is_passed ? 'Memenuhi' : 'TMS'}
                                                                    </span>
                                                                )}
                                                            </div>
                                                        ) : (
                                                            <span className="text-slate-400 font-medium italic">
                                                                Sesi berjalan
                                                            </span>
                                                        )}
                                                    </td>

                                                    {/* Action Buttons */}
                                                    <td className="py-3.5 px-4 whitespace-nowrap text-right">
                                                        <div className="flex items-center justify-end gap-2">
                                                            <button
                                                                type="button"
                                                                onClick={() => handleOpenSessionReview(item)}
                                                                className="px-3.5 py-1.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs inline-flex items-center gap-1.5 transition-all shadow-2xs cursor-pointer"
                                                            >
                                                                <BookOpen className="w-3.5 h-3.5" />
                                                                <span>
                                                                    {isDone ? 'Lihat Pembahasan Lengkap' : `Lihat Pembahasan (${item.answered_count} Soal)`}
                                                                </span>
                                                            </button>

                                                            {!isDone && (
                                                                <Link
                                                                    href={`/tryout?resume=${item.package_id}`}
                                                                    className="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs inline-flex items-center gap-1 transition-all shadow-2xs"
                                                                >
                                                                    <Play className="w-3 h-3 fill-white" />
                                                                    <span>Lanjut Ujian</span>
                                                                </Link>
                                                            )}
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                /* VIEW 2: LEMBAR EVALUASI & PEMBAHASAN SOAL */
                <div className="space-y-6 animate-in fade-in duration-300">
                    {/* Header Window Controls */}
                    <div className="rounded-2xl border border-slate-200 bg-white shadow-xs p-6 space-y-4 no-print">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setSelectedSession(null)}
                                        className="px-3 py-1.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer transition-all shadow-2xs"
                                    >
                                        <ArrowLeft className="w-3.5 h-3.5" />
                                        <span>Kembali ke Riwayat Pengerjaan</span>
                                    </button>
                                    <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                                        isProgressive 
                                            ? 'bg-amber-100 text-amber-900 border border-amber-300/60' 
                                            : 'bg-emerald-100 text-emerald-900 border border-emerald-300/60'
                                    }`}>
                                        {isProgressive ? 'Evaluasi Soal Terjawab (Sesi Berjalan)' : 'Pembahasan Lengkap Resmi BKN'}
                                    </span>
                                </div>
                                <h1 className="text-xl sm:text-2xl font-black text-slate-900">
                                    {isProgressive ? `Evaluasi Progres: ${selectedSession.title}` : `Pembahasan: ${selectedSession.title}`}
                                </h1>
                                <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">
                                    {isProgressive ? (
                                        <>Menampilkan evaluasi hasil dan kunci pembahasan untuk <strong>{answeredCount} butir soal</strong> yang telah Anda kerjakan sejauh ini. Soal berikutnya yang belum dikerjakan <strong>terkunci rahasia</strong> agar tidak ada kebocoran jawaban.</>
                                    ) : (
                                        <>Pelajari kunci jawaban terbaik, rasionalisasi penilaian 8 dimensi PermenPAN-RB, literasi digital SPBE, penalaran potensi kognitif, dan arah pemetaan Tripatha Karir.</>
                                    )}
                                </p>
                            </div>

                            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                                {isProgressive ? (
                                    <Link
                                        href={`/tryout?resume=${selectedSession.package_id}`}
                                        className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all"
                                    >
                                        <Play className="w-3.5 h-3.5 fill-white" />
                                        <span>Lanjutkan Ujian CAT</span>
                                    </Link>
                                ) : null}
                                <button
                                    type="button"
                                    onClick={handlePrint}
                                    className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-emerald-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
                                >
                                    <Printer className="w-3.5 h-3.5" />
                                    <span>Cetak Pembahasan (PDF)</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Print Header */}
                    <div className="print-only p-6 border-b-2 border-slate-900 mb-6 space-y-2">
                        <div className="flex justify-between items-start">
                            <div>
                                <h1 className="text-xl font-black tracking-tight text-slate-900">
                                    LEMBAR HASIL & PEMBAHASAN RESMI SIMULASI PROFILING ASN
                                </h1>
                                <p className="text-xs text-slate-600">
                                    Modul: {selectedSession.title} | Standar Uji Kompetensi BKN & PermenPAN-RB
                                </p>
                            </div>
                            <div className="text-right text-xs text-slate-500 font-mono">
                                <div>Tanggal: {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
                                <div className="font-bold text-slate-800">9 Box SIMATA: Box {boxNumber} ({boxTitle})</div>
                            </div>
                        </div>
                        <div className="grid grid-cols-4 gap-2 pt-2 text-xs font-semibold">
                            <div className="p-2 border rounded">Skor Rata-Rata: {selectedSession.score !== null && selectedSession.score !== undefined ? `${selectedSession.score}/100` : 'Pemetaan Karir'}</div>
                            <div className="p-2 border rounded">Tes Potensi: {normalizedScores['POTENSI'] || 0}/100</div>
                            <div className="p-2 border rounded">Manajerial: {normalizedScores['MANAJERIAL'] || 0}/100</div>
                            <div className="p-2 border rounded">Literasi Digital: {normalizedScores['DIGITAL'] || 0}/100</div>
                        </div>
                    </div>

                    {/* Progressive Alert vs 9 Box SIMATA */}
                    {isProgressive ? (
                        <div className="p-4 rounded-2xl border border-amber-200 bg-amber-50/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-amber-900 no-print">
                            <div className="flex items-center gap-2.5">
                                <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                                <span>
                                    Sesi ini masih berjalan (<strong>{answeredCount}</strong> butir soal terjawab). Matriks 9 Box SIMATA & Rekomendasi Karir akan dikalkulasi final saat seluruh subtes telah diselesaikan.
                                </span>
                            </div>
                            <Link
                                href={`/tryout?resume=${selectedSession.package_id}`}
                                className="px-3.5 py-1.5 rounded-lg bg-amber-600 text-white font-bold text-xs hover:bg-amber-700 transition-colors shrink-0 flex items-center gap-1.5 shadow-2xs self-start sm:self-auto"
                            >
                                <Play className="w-3.5 h-3.5 fill-white" />
                                <span>Lanjutkan Tes</span>
                            </Link>
                        </div>
                    ) : (
                        <div className="mb-6">
                            <NineBoxSimata activeBox={boxNumber} axisX={axisX} axisY={axisY} />
                        </div>
                    )}

                    {/* Filter Toolbar */}
                    <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl border border-slate-200 bg-white shadow-xs no-print">
                        {/* Status Filter */}
                        <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
                            <span className="text-[11px] font-bold text-slate-400 shrink-0">Filter Hasil:</span>
                            {(isProgressive
                                ? [
                                    { id: 'ALL', label: `Semua Terjawab (${answeredCount})` },
                                    { id: 'CORRECT', label: `Tepat / Skor 5 (${totalCorrectCount})` },
                                    { id: 'WRONG', label: `Kurang Tepat (${Math.max(0, answeredCount - totalCorrectCount)})` },
                                ]
                                : [
                                    { id: 'ALL', label: `Semua Soal (${activeQuestions.length})` },
                                    { id: 'CORRECT', label: `Tepat / Skor 5 (${totalCorrectCount})` },
                                    { id: 'WRONG', label: `Kurang Tepat (${Math.max(0, answeredCount - totalCorrectCount)})` },
                                    { id: 'UNANSWERED', label: `Belum Dijawab (${unansweredCount})` },
                                ]
                            ).map((tab) => (
                                <button
                                    key={tab.id}
                                    type="button"
                                    onClick={() => setReviewStatusFilter(tab.id as any)}
                                    className={`px-3 py-1 rounded-lg font-bold text-xs transition-all cursor-pointer ${
                                        reviewStatusFilter === tab.id
                                            ? 'bg-emerald-800 text-white shadow-2xs'
                                            : 'text-slate-600 hover:bg-slate-100'
                                    }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        {/* Category Filter */}
                        <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
                            <span className="text-[11px] font-bold text-slate-400 shrink-0">Subtes:</span>
                            {[
                                { id: 'ALL', label: 'Semua Subtes' },
                                { id: 'POTENSI', label: 'Potensi' },
                                { id: 'MANAJERIAL', label: 'Manajerial' },
                                { id: 'DIGITAL', label: 'Digital' },
                                { id: 'KARIR', label: 'Karir' },
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    type="button"
                                    onClick={() => setReviewCategoryFilter(tab.id)}
                                    className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all cursor-pointer ${
                                        reviewCategoryFilter === tab.id
                                            ? 'bg-emerald-800 text-white'
                                            : 'text-slate-500 hover:bg-slate-100'
                                    }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Questions Review List */}
                    <div className="space-y-4">
                        {filteredQuestions.length === 0 ? (
                            <div className="p-12 text-center rounded-2xl border border-slate-200 bg-white space-y-2">
                                <Info className="w-8 h-8 text-slate-400 mx-auto" />
                                <p className="text-xs font-semibold text-slate-600">Tidak ada butir soal yang sesuai filter ini.</p>
                            </div>
                        ) : (
                            filteredQuestions.map((q, idx) => {
                                const userChoice = answers[q.id];
                                const isAnswered = userChoice !== undefined;
                                let isCorrect = false;

                                if (q.kategori === 'KARIR') {
                                    isCorrect = isAnswered;
                                } else if (q.scores && Array.isArray(q.scores) && typeof q.scores[userChoice] === 'number') {
                                    isCorrect = Number(q.scores[userChoice]) === 5;
                                } else {
                                    isCorrect = userChoice === q.jawaban;
                                }

                                const originalIndex = activeQuestions.findIndex((item) => item.id === q.id);
                                const questionLabel = originalIndex !== -1 ? `Soal Nomor ${originalIndex + 1}` : `Butir ${idx + 1}`;

                                return (
                                    <div
                                        key={q.id || idx}
                                        className="card-box rounded-2xl border border-slate-200 bg-white shadow-md overflow-hidden"
                                    >
                                        <MacWindowControls
                                            title={`Evaluasi: ${questionLabel}`}
                                            badge={q.kategori}
                                        />
                                        <div className="p-5 sm:p-7 space-y-5 text-xs">
                                            {/* Header Status Soal */}
                                            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-extrabold text-slate-700 uppercase tracking-wider text-[11px]">
                                                        {q.category_name || q.kategori}
                                                    </span>
                                                    {q.subkategori && (
                                                        <span className="text-slate-400 font-mono text-[10px]">
                                                            • {q.subkategori}
                                                        </span>
                                                    )}
                                                </div>
                                                <div>
                                                    {q.kategori === 'KARIR' ? (
                                                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800">
                                                            Preferensi Terpilih: {isAnswered ? `Opsi ${['A','B','C','D','E'][userChoice] || ''}` : 'Belum Dipilih'}
                                                        </span>
                                                    ) : isAnswered ? (
                                                        isCorrect ? (
                                                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                                                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                                                <span>Tepat (Skor Maksimal 5)</span>
                                                            </span>
                                                        ) : (
                                                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800">
                                                                <XCircle className="w-3.5 h-3.5 text-rose-600" />
                                                                <span>
                                                                    {q.scores && typeof q.scores[userChoice] === 'number'
                                                                        ? `Kurang Tepat (Skor ${q.scores[userChoice]}/5)`
                                                                        : 'Salah (Skor 0)'}
                                                                </span>
                                                            </span>
                                                        )
                                                    ) : (
                                                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-100 text-slate-500">
                                                            Tidak Dijawab (Skor 0)
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Text Soal */}
                                            <div className="text-slate-800 text-xs sm:text-sm leading-relaxed font-medium">
                                                {q.soal}
                                            </div>

                                            {/* Image Preview if Figural */}
                                            {q.image_url && (
                                                <div className="relative group max-w-sm rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
                                                    <img
                                                        src={q.image_url}
                                                        alt="Ilustrasi Soal"
                                                        className="w-full object-contain max-h-56 cursor-pointer"
                                                        onClick={() => setPreviewImage(q.image_url || null)}
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => setPreviewImage(q.image_url || null)}
                                                        className="absolute bottom-2 right-2 p-1.5 rounded-lg bg-slate-900/80 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-[10px] font-bold cursor-pointer"
                                                    >
                                                        <ZoomIn className="w-3 h-3" />
                                                        <span>Perbesar</span>
                                                    </button>
                                                </div>
                                            )}

                                            {/* Options List */}
                                            <div className="space-y-2 pt-1">
                                                {q.pilihan.map((optText, oIdx) => {
                                                    const isUserSelection = userChoice === oIdx;
                                                    const isBestAnswer = q.jawaban === oIdx;
                                                    const optScore = q.scores && Array.isArray(q.scores) ? q.scores[oIdx] : null;

                                                    let optionClass = 'border-slate-200 bg-white text-slate-700';

                                                    if (q.kategori === 'KARIR') {
                                                        if (isUserSelection) {
                                                            optionClass = 'border-blue-500 bg-blue-50/80 text-blue-900 font-semibold ring-1 ring-blue-500';
                                                        }
                                                    } else {
                                                        if (isBestAnswer) {
                                                            optionClass = 'border-emerald-500 bg-emerald-50/80 text-emerald-950 font-semibold ring-1 ring-emerald-500';
                                                        } else if (isUserSelection && !isBestAnswer) {
                                                            optionClass = 'border-rose-400 bg-rose-50/80 text-rose-950 ring-1 ring-rose-400';
                                                        }
                                                    }

                                                    return (
                                                        <div
                                                            key={oIdx}
                                                            className={`p-3 sm:p-3.5 rounded-xl border flex items-start justify-between gap-3 transition-colors ${optionClass}`}
                                                        >
                                                            <div className="flex items-start gap-2.5">
                                                                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5 ${
                                                                    isBestAnswer
                                                                        ? 'bg-emerald-600 text-white'
                                                                        : isUserSelection
                                                                            ? 'bg-rose-600 text-white'
                                                                            : 'bg-slate-200 text-slate-700'
                                                                }`}>
                                                                    {String.fromCharCode(65 + oIdx)}
                                                                </span>
                                                                <span className="text-xs leading-relaxed">{optText}</span>
                                                            </div>

                                                            <div className="flex items-center gap-1.5 shrink-0 text-[10px] font-bold font-mono">
                                                                {isUserSelection && (
                                                                    <span className="px-2 py-0.5 rounded bg-slate-900 text-white text-[9px] uppercase tracking-wider">
                                                                        Pilihan Anda
                                                                    </span>
                                                                )}
                                                                {isBestAnswer && q.kategori !== 'KARIR' && (
                                                                    <span className="px-2 py-0.5 rounded bg-emerald-200 text-emerald-900 text-[9px] uppercase tracking-wider">
                                                                        Kunci Terbaik
                                                                    </span>
                                                                )}
                                                                {optScore !== null && (
                                                                    <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                                                                        {optScore} Poin
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>

                                            {/* Rasionalisasi & Pembahasan Box */}
                                            <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200/90 text-xs text-slate-700 space-y-1.5 leading-relaxed">
                                                <div className="flex items-center gap-1.5 font-bold text-slate-900">
                                                    <FileText className="w-3.5 h-3.5 text-emerald-700" />
                                                    <span>Rasionalisasi & Pembahasan Resmi:</span>
                                                </div>
                                                <p className="whitespace-pre-line text-slate-600">
                                                    {q.pembahasan || 'Pembahasan kunci jawaban standar sesuai indikator kompetensi resmi BKN.'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>
            )}

            {/* Image Preview Modal */}
            {previewImage && (
                <div
                    className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-xs animate-in fade-in"
                    onClick={() => setPreviewImage(null)}
                >
                    <div className="relative max-w-4xl max-h-[90vh] bg-white rounded-2xl overflow-hidden p-2 shadow-2xl">
                        <button
                            type="button"
                            onClick={() => setPreviewImage(null)}
                            className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/80 text-white hover:bg-slate-900 transition-colors z-10 cursor-pointer"
                        >
                            <X className="w-4 h-4" />
                        </button>
                        <img
                            src={previewImage}
                            alt="Preview Soal"
                            className="w-full h-auto max-h-[80vh] object-contain rounded-xl"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
