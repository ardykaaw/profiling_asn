import ConfirmModal from '@/components/confirm-modal';
import { useState, useEffect, useMemo } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { 
    Award, 
    Clock, 
    ArrowLeft, 
    ArrowRight, 
    CheckCircle2, 
    XCircle,
    Sparkles, 
    Play, 
    RotateCcw,
    HelpCircle,
    Brain,
    Users,
    Zap,
    Briefcase,
    ShieldCheck,
    Layers,
    BarChart3,
    Printer,
    Download,
    Compass,
    AlertTriangle,
    X,
    FileText,
    Info,
    Check,
    ChevronRight,
    Eye,
    Trophy,
    TrendingUp,
    Target,
    Lightbulb,
    ZoomIn,
    Coffee,
    PauseCircle,
    Lock,
    Trash2,
    BookmarkCheck
} from 'lucide-react';
import MacWindowControls from '@/components/mac-window-controls';

interface Question {
    id: number;
    kategori: 'POTENSI' | 'MANAJERIAL' | 'DIGITAL' | 'KARIR' | string;
    category_name?: string;
    subkategori: string;
    soal: string;
    image_url?: string | null;
    pilihan: string[];
    jawaban: number;
    scores?: number[] | string[];
    pembahasan: string;
}

const packages = [
    { 
        id: 'profiling-full', 
        title: 'Simulasi Lengkap Profiling ASN (Semua 4 Sesi BKN)', 
        cat: 'SEMUA', 
        defaultSoal: 773, 
        durasi: 243, 
        badge: '15 Subtes / 773 Soal Paten (243 Menit)',
        desc: 'Simulasi menyeluruh 4 kategori resmi BKN: Tes Potensi (525 soal, 139 mnt), Manajerial & Sosio-Kultural (45 soal, 42 mnt), Literasi Digital (35 soal, 27 mnt), dan Preferensi Karir (168 soal, 35 mnt). Total 243 Menit.'
    },
    { 
        id: 'potensi-drill', 
        title: 'Sesi 1: Tes Potensi Kognitif & Figural', 
        cat: 'POTENSI', 
        defaultSoal: 525, 
        durasi: 139, 
        badge: '5 Subtes / 525 Soal Paten (139 Menit)',
        desc: 'Mencakup 5 subtes resmi: Figural (30 soal, 30 mnt), Numerik (360 soal, 34 mnt), Berpikir Kritis (45 soal, 25 mnt), Kepribadian (45 soal, 25 mnt), dan Belajar Cepat (45 soal, 25 mnt). Total 139 Menit.'
    },
    { 
        id: 'manajerial-drill', 
        title: 'Sesi 2: Manajerial & Sosio-Kultural (SJT MenPAN-RB)', 
        cat: 'MANAJERIAL', 
        defaultSoal: 45, 
        durasi: 42, 
        badge: '2 Subtes / 45 Soal Paten (42 Menit)',
        desc: 'Mencakup 2 subtes PermenPAN-RB: Manajerial (23 soal, 22 mnt) dan Sosio Kultural (22 soal, 20 mnt). Total 42 Menit.'
    },
    { 
        id: 'digital-drill', 
        title: 'Sesi 3: Literasi & Keamanan Digital ASN', 
        cat: 'DIGITAL', 
        defaultSoal: 35, 
        durasi: 27, 
        badge: '4 Subtes / 35 Soal Paten (27 Menit)',
        desc: 'Mencakup 4 pilar kecakapan digital: Digital Skill (9 soal, 7 mnt), Digital Culture (9 soal, 7 mnt), Digital Ethics (9 soal, 7 mnt), dan Digital Safety (8 soal, 6 mnt). Total 27 Menit.'
    },
    { 
        id: 'karir-drill', 
        title: 'Sesi 4: Preferensi & Tripatha Karir ASN', 
        cat: 'KARIR', 
        defaultSoal: 168, 
        durasi: 35, 
        badge: '4 Subtes / 168 Soal Paten (35 Menit)',
        desc: 'Mencakup 4 instrumen minat & bakat: Minat Kerja RIASEC (108 butir, 15 mnt), Nilai Kerja (30 butir, 10 mnt), Lingkungan Kerja (18 butir, 5 mnt), dan Gaya Kerja (12 butir, 5 mnt). Total 35 Menit.'
    },
];

const SUBTEST_METADATA: Record<string, { title: string; shortTitle: string; sessionName: string; category: string; description: string; durationMinutes: number }> = {
    'potensi-figural': {
        title: 'Penalaran Figural (Spasial & Bentuk)',
        shortTitle: 'Figural',
        sessionName: 'Tes Potensi Kognitif',
        category: 'POTENSI',
        description: 'Uji daya visualisasi, rotasi bentuk 3D, analogi gambar, dan kelanjutan pola figural standar BKN.',
        durationMinutes: 30,
    },
    'potensi-numerik': {
        title: 'Penalaran Numerik (Perbandingan Angka)',
        shortTitle: 'Numerik',
        sessionName: 'Tes Potensi Kognitif',
        category: 'POTENSI',
        description: 'Uji kecepatan dan ketelitian komparasi nilai angka positif-negatif berkecepatan tinggi.',
        durationMinutes: 34,
    },
    'potensi-kritis': {
        title: 'Berpikir Kritis & Problem Solving',
        shortTitle: 'Berpikir Kritis',
        sessionName: 'Tes Potensi Kognitif',
        category: 'POTENSI',
        description: 'Uji logika analitis, identifikasi premis, dan evaluasi solusi kebijakan publik.',
        durationMinutes: 25,
    },
    'potensi-belajar-cepat': {
        title: 'Kemampuan Belajar Cepat & Adaptasi',
        shortTitle: 'Belajar Cepat',
        sessionName: 'Tes Potensi Kognitif',
        category: 'POTENSI',
        description: 'Uji kecepatan memahami instruksi baru, sintesis data, dan fleksibilitas kerja.',
        durationMinutes: 25,
    },
    'potensi-kepribadian': {
        title: 'Integritas & Kepribadian ASN',
        shortTitle: 'Kepribadian',
        sessionName: 'Tes Potensi Kognitif',
        category: 'POTENSI',
        description: 'Uji profil ketahanan mental, etos kerja, kedisiplinan, dan konsistensi moral ASN.',
        durationMinutes: 25,
    },
    'manajerial-sjt': {
        title: 'Kompetensi Manajerial (SJT)',
        shortTitle: 'Manajerial SJT',
        sessionName: 'Manajerial & Sosio Kultural',
        category: 'MANAJERIAL',
        description: 'Uji 8 kompetensi manajerial MenPAN-RB berbasis skenario situasional birokrasi & integritas.',
        durationMinutes: 22,
    },
    'manajerial-sosio': {
        title: 'Sosio-Kultural & Perekat Bangsa',
        shortTitle: 'Sosio Kultural',
        sessionName: 'Manajerial & Sosio Kultural',
        category: 'MANAJERIAL',
        description: 'Uji kepekaan sosial, toleransi keberagaman, dan peran sebagai perekat persatuan bangsa.',
        durationMinutes: 20,
    },
    'digital-skill': {
        title: 'Digital Skill (Kecakapan Digital)',
        shortTitle: 'Digital Skill',
        sessionName: 'Literasi Digital',
        category: 'DIGITAL',
        description: 'Pemahaman pengoperasian perangkat lunak, sistem digital pemerintahan, dan otomatisasi administrasi.',
        durationMinutes: 7,
    },
    'digital-culture': {
        title: 'Digital Culture (Budaya Digital)',
        shortTitle: 'Digital Culture',
        sessionName: 'Literasi Digital',
        category: 'DIGITAL',
        description: 'Penanaman wawasan kebangsaan, Pancasila, dan Bhinneka Tunggal Ika di ruang siber.',
        durationMinutes: 7,
    },
    'digital-ethics': {
        title: 'Digital Ethics (Etika Digital)',
        shortTitle: 'Digital Ethics',
        sessionName: 'Literasi Digital',
        category: 'DIGITAL',
        description: 'Tata krama bermedia digital, komunikasi birokrasi santun, dan pencegahan ujaran kebencian.',
        durationMinutes: 7,
    },
    'digital-safety': {
        title: 'Digital Safety (Keamanan Siber)',
        shortTitle: 'Digital Safety',
        sessionName: 'Literasi Digital',
        category: 'DIGITAL',
        description: 'Perlindungan data pribadi ASN, keamanan sandi, penanganan phishing, dan mitigasi kebocoran data.',
        durationMinutes: 6,
    },
    'karir-minat': {
        title: 'Preferensi Karir: Minat Kerja (RIASEC)',
        shortTitle: 'Minat RIASEC',
        sessionName: 'Tripatha Karir',
        category: 'KARIR',
        description: 'Eksplorasi ketertarikan 6 dimensi Holland (Realistic, Investigative, Artistic, Social, Enterprising, Conventional).',
        durationMinutes: 15,
    },
    'karir-nilai': {
        title: 'Preferensi Karir: Nilai Kerja (Work Values)',
        shortTitle: 'Nilai Kerja',
        sessionName: 'Tripatha Karir',
        category: 'KARIR',
        description: 'Faktor pendorong utama profesional seperti kepastian finansial, otonomi, kemanfaatan, dan keseimbangan kerja.',
        durationMinutes: 10,
    },
    'karir-aspirasi': {
        title: 'Preferensi Karir: Lingkungan & Budaya Kerja',
        shortTitle: 'Lingkungan Kerja',
        sessionName: 'Tripatha Karir',
        category: 'KARIR',
        description: 'Preferensi iklim kerja operasional (kantor vs lapangan, kolaboratif vs mandiri, serta kepatuhan tata kelola).',
        durationMinutes: 5,
    },
    'karir-pengalaman': {
        title: 'Preferensi Karir: Gaya Kerja & Peran Profesional',
        shortTitle: 'Gaya Kerja',
        sessionName: 'Tripatha Karir',
        category: 'KARIR',
        description: 'Orientasi peran kerja aparatur (spesialisasi mendalam vs wawasan lintas fungsi, serta eksekutor vs inovator).',
        durationMinutes: 5,
    },
};


const SUBTEST_DIAGNOSTICS: Record<string, { rec_high: string; rec_mid: string; rec_low: string }> = {
    'potensi-figural': {
        rec_high: 'Daya visualisasi dan rotasi 3D sangat baik, pertahankan konsistensi konsentrasi pola ruang.',
        rec_mid: 'Pemahaman figural cukup baik, disarankan memperbanyak latihan penalaran rotasi kubus 3D & analogi gambar kompleks.',
        rec_low: 'Perlu latihan intensif pada penalaran serial pola gambar, rotasi sudut, dan matriks visual spasial.',
    },
    'potensi-numerik': {
        rec_high: 'Ketelitian dan komparasi angka berkecepatan tinggi sangat tajam dan akurat.',
        rec_mid: 'Ketelitian numerik standar, disarankan melatih kecepatan perbandingan kuantitatif dan eliminasi cepat.',
        rec_low: 'Perlu peningkatan fokus dan kecepatan hitung komparasi aljabar dasar, persentase, dan deret angka.',
    },
    'potensi-kritis': {
        rec_high: 'Logika analisis dan kemampuan evaluasi argumen kebijakan publik sangat matang.',
        rec_mid: 'Kemampuan problem solving memadai, tingkatkan ketajaman analisis silogisme dan penarikan kesimpulan.',
        rec_low: 'Perlu melatih daya nalar analitis, pemilahan premis mayor-minor, dan identifikasi bias argumen.',
    },
    'potensi-belajar-cepat': {
        rec_high: 'Daya adaptasi dan kecepatan sintesis data baru luar biasa unggul.',
        rec_mid: 'Kemampuan belajar cepat sudah baik, biasakan merangkum instruksi rumit ke poin aksi terstruktur.',
        rec_low: 'Perlu melatih teknik scanning informasi, pemetaan konsep baru, dan fleksibilitas pola pikir.',
    },
    'potensi-kepribadian': {
        rec_high: 'Integritas, etos kerja, dan kematangan emosional sangat kokoh sesuai Core Values BerAKHLAK.',
        rec_mid: 'Profil etika dan integritas baik, pertahankan komitmen dalam situasi kerja bertekanan tinggi.',
        rec_low: 'Perlu penguatan konsistensi kedisiplinan diri, regulasi emosi, dan ketegasan integritas moral.',
    },
    'manajerial-sjt': {
        rec_high: 'Orientasi pelayanan, integritas, dan pengambilan keputusan manajerial sangat strategis.',
        rec_mid: 'Kompetensi manajerial cukup memadai, perdalam pertimbangan solusi yang berorientasi hasil jangka panjang.',
        rec_low: 'Perlu mempelajari panduan PermenPAN-RB 38/2017 tentang 8 kompetensi manajerial ASN dan etika pimpinan.',
    },
    'manajerial-sosio': {
        rec_high: 'Toleransi, kepekaan sosial, dan peran sebagai perekat bangsa sangat menginspirasi.',
        rec_mid: 'Sikap kebhinekaan baik, tingkatkan keterbukaan dialog dalam menghadapi perbedaan latar belakang.',
        rec_low: 'Perlu meningkatkan kepekaan terhadap dinamika budaya, empati kerja tim, dan resolusi konflik sosial.',
    },
    'digital-skill': {
        rec_high: 'Cakap dalam pemanfaatan instrumen digital birokrasi, automasi kerja, dan sistem SPBE.',
        rec_mid: 'Cakupan kecakapan digital memadai, eksplorasi tool kolaborasi dan analitik data perkantoran.',
        rec_low: 'Perlu meningkatkan keterampilan dasar komputasi awan, aplikasi perkantoran terintegrasi, dan alur SPBE.',
    },
    'digital-culture': {
        rec_high: 'Menjunjung tinggi nilai Pancasila dan budaya kebangsaan di ruang digital.',
        rec_mid: 'Budaya bermedia digital baik, aktif mendorong konten konstruktif kebangsaan di media sosial.',
        rec_low: 'Perlu pemahaman lebih dalam terkait pilar digital culture, wawasan nusantara, dan kurasi informasi publik.',
    },
    'digital-ethics': {
        rec_high: 'Etika komunikasi digital birokrasi sangat santun, profesional, dan berintegritas.',
        rec_mid: 'Memahami tata krama siber, perhatikan netralitas ASN di media sosial dan kejelasan komunikasi kedinasan.',
        rec_low: 'Perlu mempelajari regulasi kode etik ASN di ruang digital dan mitigasi risiko ujaran serta hoaks.',
    },
    'digital-safety': {
        rec_high: 'Sadar keamanan siber, proteksi data pribadi, dan pencegahan insiden siber sangat mumpuni.',
        rec_mid: 'Kewaspadaan siber baik, pastikan selalu menerapkan 2FA dan verifikasi tautan mencurigakan.',
        rec_low: 'Perlu pelatihan proteksi data rahasia instansi, pencegahan phishing, dan manajemen kredensial aman.',
    },
};

const SUBTEST_ORDER = [
    'potensi-figural',
    'potensi-numerik',
    'potensi-kritis',
    'potensi-kepribadian',
    'potensi-belajar-cepat',
    'manajerial-sjt',
    'manajerial-sosio',
    'digital-skill',
    'digital-culture',
    'digital-ethics',
    'digital-safety',
    'karir-minat',
    'karir-nilai',
    'karir-aspirasi',
    'karir-pengalaman'
];

const getQuestionSubtestId = (q: Question): string => {
    const cat = q.kategori;
    const sub = (q.subkategori || '').toLowerCase();
    
    if (cat === 'POTENSI') {
        if (sub.includes('figural') || !!q.image_url) return 'potensi-figural';
        if (sub.includes('numerik')) return 'potensi-numerik';
        if (sub.includes('kritis')) return 'potensi-kritis';
        if (sub.includes('belajar')) return 'potensi-belajar-cepat';
        if (sub.includes('kepribadian')) return 'potensi-kepribadian';
        return 'potensi-figural';
    }
    if (cat === 'MANAJERIAL') {
        if (sub.includes('sosio') || sub.includes('cultural')) return 'manajerial-sosio';
        return 'manajerial-sjt';
    }
    if (cat === 'DIGITAL') {
        if (sub.includes('culture')) return 'digital-culture';
        if (sub.includes('ethics')) return 'digital-ethics';
        if (sub.includes('safety')) return 'digital-safety';
        return 'digital-skill';
    }
    if (cat === 'KARIR') {
        if (sub.includes('nilai')) return 'karir-nilai';
        if (sub.includes('aspirasi')) return 'karir-aspirasi';
        if (sub.includes('pengalaman')) return 'karir-pengalaman';
        return 'karir-minat';
    }
    return 'potensi-figural';
};

interface SubtestItem {
    id: string;
    title: string;
    shortTitle: string;
    sessionName: string;
    category: string;
    description: string;
    durationMinutes?: number;
    questions: Question[];
}

const buildSubtestsForPackage = (pkgCat: string, bank: Question[]): SubtestItem[] => {
    let sourceQuestions: Question[] = [];
    if (pkgCat === 'SEMUA') {
        sourceQuestions = [...bank];
    } else {
        sourceQuestions = bank.filter((q) => q.kategori === pkgCat);
    }
    if (sourceQuestions.length === 0) {
        sourceQuestions = [...bank];
    }

    const groups: Record<string, Question[]> = {};
    sourceQuestions.forEach((q) => {
        const sId = getQuestionSubtestId(q);
        if (!groups[sId]) groups[sId] = [];
        groups[sId].push(q);
    });

    const result: SubtestItem[] = [];
    SUBTEST_ORDER.forEach((sId) => {
        const qList = groups[sId];
        if (qList && qList.length > 0) {
            const meta = SUBTEST_METADATA[sId];
            result.push({
                id: sId,
                title: meta?.title || sId,
                shortTitle: meta?.shortTitle || sId,
                sessionName: meta?.sessionName || '',
                category: meta?.category || '',
                description: meta?.description || '',
                durationMinutes: meta?.durationMinutes,
                questions: qList.sort((a, b) => a.id - b.id),
            });
        }
    });

    return result;
};

interface TryOutPageProps {
    dbQuestions?: Question[];
    sessions?: any[];
    inProgressSession?: any;
    completedTitles?: string[];
    categories?: any[];
    auth?: {
        user?: {
            name: string;
            email: string;
        };
    };
}

import NineBoxSimata from '@/components/nine-box-simata';

export default function TryOutPage({ dbQuestions = [], sessions = [], inProgressSession, completedTitles = [], auth }: TryOutPageProps) {
    const rawBank = dbQuestions && dbQuestions.length > 0 ? dbQuestions : [];

    const getPackageQuestionCount = (cat: string, fallback: number) => {
        if (cat === 'SEMUA') {
            return rawBank.length > 0 ? rawBank.length : fallback;
        }
        const count = rawBank.filter((q) => q.kategori === cat).length;
        return count > 0 ? count : fallback;
    };

    // Modes: 'list' | 'countdown' | 'test' | 'subtest-break' | 'result' | 'review'
    const [mode, setMode] = useState<'list' | 'countdown' | 'test' | 'subtest-break' | 'result' | 'review'>('list');
    const [selectedPackage, setSelectedPackage] = useState(packages[0]);
    const [pendingPackage, setPendingPackage] = useState(packages[0]);
    const [activeSubtests, setActiveSubtests] = useState<SubtestItem[]>([]);
    const [currentSubtestIndex, setCurrentSubtestIndex] = useState(0);
    const [currentQuestionInSubtest, setCurrentQuestionInSubtest] = useState(0);
    const [answers, setAnswers] = useState<Record<number, number>>({});
    const [timeLeft, setTimeLeft] = useState(45 * 60);
    const [categoryFilter, setCategoryFilter] = useState<string>('SEMUA');
    const [pendingUrl, setPendingUrl] = useState<string | null>(null);
    
    // Countdown state
    const [countdownSeconds, setCountdownSeconds] = useState(5);

    // Modal dialog states
    const [lockedPackageAlert, setLockedPackageAlert] = useState<string | null>(null);
    const [showExitModal, setShowExitModal] = useState(false);
    const [showSubmitModal, setShowSubmitModal] = useState(false);
    const [showSubtestFinishModal, setShowSubtestFinishModal] = useState(false);
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    // Reset Package Modal State
    const [packageToReset, setPackageToReset] = useState<any | null>(null);
    const [isResetting, setIsResetting] = useState(false);

    // Subtest Break States & Session Persistence
    const [justCompletedSubtest, setJustCompletedSubtest] = useState<SubtestItem | null>(null);
    const [breakNextSubtest, setBreakNextSubtest] = useState<SubtestItem | null>(null);
    const [savedSession, setSavedSession] = useState<{
        packageId: string;
        packageTitle: string;
        answers: Record<number, number>;
        currentSubtestIndex: number;
        currentQuestionInSubtest: number;
        nextSubtestTitle: string;
        timestamp: string;
    } | null>(null);

    // Helper to persist in-progress subtest progress to server
    const saveProgressToServer = (
        pkgId: string, 
        pkgTitle: string, 
        currentAnswers: Record<number, number>, 
        subIndex: number, 
        qIndex: number, 
        totalSubs: number,
        subTitle?: string
    ) => {
        try {
            router.post(
                '/tryout/save-progress',
                {
                    package_id: pkgId,
                    title: pkgTitle,
                    answers: currentAnswers,
                    current_subtest_index: subIndex,
                    current_question_index: qIndex,
                    total_subtests: totalSubs,
                    subtest_title: subTitle || '',
                    answered_count: Object.keys(currentAnswers).length,
                    time_spent: selectedPackage.durasi * 60 - timeLeft,
                },
                {
                    preserveState: true,
                    preserveScroll: true,
                }
            );
        } catch (err) {
            console.error(err);
        }
    };

    // Save and pause directly from active test
    const handleSaveAndPauseCurrentTest = () => {
        const nextQIdx = currentQuestionInSubtest;
        const subTitle = currentSubtest?.title || '';
        try {
            const stateData = {
                packageId: selectedPackage.id,
                packageTitle: selectedPackage.title,
                answers: answers,
                currentSubtestIndex: currentSubtestIndex,
                currentQuestionInSubtest: nextQIdx,
                nextSubtestTitle: subTitle,
                timestamp: new Date().toISOString(),
            };
            localStorage.setItem('tryout_saved_session', JSON.stringify(stateData));
            setSavedSession(stateData);
        } catch (e) {
            console.error(e);
        }
        saveProgressToServer(
            selectedPackage.id,
            selectedPackage.title,
            answers,
            currentSubtestIndex,
            nextQIdx,
            activeSubtests.length,
            subTitle
        );
        setShowExitModal(false);
        setShowSubtestFinishModal(false);
        setMode('list');
    };

    // Check for saved in-progress session in localStorage or server
    const checkSavedSession = () => {
        try {
            const raw = localStorage.getItem('tryout_saved_session');
            if (raw) {
                const parsed = JSON.parse(raw);
                if (parsed && parsed.packageId && parsed.answers) {
                    setSavedSession(parsed);
                    return parsed;
                }
            }
            if (inProgressSession && inProgressSession.category_scores) {
                const serverSaved = {
                    packageId: inProgressSession.category_scores.package_id || 'profiling-full',
                    packageTitle: inProgressSession.title,
                    answers: inProgressSession.answers || {},
                    currentSubtestIndex: inProgressSession.category_scores.current_subtest_index ?? 0,
                    currentQuestionInSubtest: inProgressSession.category_scores.current_question_index ?? 0,
                    nextSubtestTitle: inProgressSession.category_scores.subtest_title || '',
                    timestamp: inProgressSession.updated_at || new Date().toISOString(),
                };
                setSavedSession(serverSaved);
                return serverSaved;
            }
            setSavedSession(null);
            return null;
        } catch (e) {
            console.error(e);
            return null;
        }
    };

    const handleConfirmReset = () => {
        if (!packageToReset) return;
        setIsResetting(true);

        try {
            const raw = localStorage.getItem('tryout_saved_session');
            if (raw) {
                const parsed = JSON.parse(raw);
                if (parsed?.packageTitle === packageToReset.title || parsed?.packageId === packageToReset.id) {
                    localStorage.removeItem('tryout_saved_session');
                    setSavedSession(null);
                }
            }
        } catch (e) {
            console.error(e);
        }

        router.post(
            '/tryout/reset-package',
            { title: packageToReset.title },
            {
                preserveScroll: true,
                onSuccess: () => {
                    setIsResetting(false);
                    setPackageToReset(null);
                },
                onError: () => {
                    setIsResetting(false);
                    setPackageToReset(null);
                }
            }
        );
    };

    useEffect(() => {
        const activeSaved = checkSavedSession();

        // Check if navigated with query param ?resume=... or ?package=...
        const params = new URLSearchParams(window.location.search);
        const resumeParam = params.get('resume');
        const pkgParam = params.get('package');
        const targetId = resumeParam || pkgParam;

        if (targetId) {
            const foundPkg = packages.find(p => p.id === targetId);
            if (foundPkg) {
                const isDone = (completedTitles && completedTitles.includes(foundPkg.title)) || 
                    sessions.some(s => s.completed_at && (s.title === foundPkg.title || (s.title && s.title.includes(foundPkg.title)) || (foundPkg.id === 'profiling-full' && s.title && s.title.includes('Simulasi Profiling 4 Subtes'))));
                if (isDone) {
                    setLockedPackageAlert(foundPkg.title);
                } else {
                    if (activeSaved && (activeSaved.packageId === foundPkg.id || activeSaved.packageTitle === foundPkg.title)) {
                        handleResumeSavedSession(foundPkg);
                    } else {
                        initiateTest(foundPkg);
                    }
                }
            }
        }
    }, []);

    // Escape listener for image preview
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setPreviewImage(null);
            }
        };
        if (previewImage) {
            window.addEventListener('keydown', handleKeyDown);
        }
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [previewImage]);

    // Review filters
    const [reviewStatusFilter, setReviewStatusFilter] = useState<'ALL' | 'CORRECT' | 'WRONG' | 'UNANSWERED'>('ALL');
    const [reviewCategoryFilter, setReviewCategoryFilter] = useState<string>('ALL');

    // Anti-cheating & Navigation Lock: warn before leaving page during active test
    useEffect(() => {
        if (mode !== 'test') return;

        // 1. Intercept Inertia SPA client-side visits (e.g. sidebar links, navbar links)
        const removeRouterListener = router.on('before', (event) => {
            // Allow POST request to finish test
            if (event.detail.visit.method === 'post') {
                return;
            }

            // Prevent navigation and show alert modal
            event.preventDefault();
            const targetUrl = event.detail.visit.url.href;
            setPendingUrl(targetUrl);
            setShowExitModal(true);
        });

        // 2. Intercept browser back/forward buttons
        const handlePopState = (e: PopStateEvent) => {
            e.preventDefault();
            window.history.pushState(null, '', window.location.href);
            setShowExitModal(true);
        };
        window.history.pushState(null, '', window.location.href);
        window.addEventListener('popstate', handlePopState);

        // 3. Intercept tab close / reload
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            e.preventDefault();
            e.returnValue = 'Tes sedang berlangsung! Batalkan tes?';
            return e.returnValue;
        };
        window.addEventListener('beforeunload', handleBeforeUnload);

        // 4. Intercept clicks on links outside test workarea
        const handleGlobalClick = (e: MouseEvent) => {
            const link = (e.target as HTMLElement)?.closest('a');
            if (link && !link.closest('.test-workarea') && !link.closest('.exit-modal')) {
                const href = link.getAttribute('href');
                if (href && !href.startsWith('#')) {
                    e.preventDefault();
                    e.stopPropagation();
                    setPendingUrl(link.href);
                    setShowExitModal(true);
                }
            }
        };
        document.addEventListener('click', handleGlobalClick, true);

        return () => {
            removeRouterListener();
            window.removeEventListener('popstate', handlePopState);
            window.removeEventListener('beforeunload', handleBeforeUnload);
            document.removeEventListener('click', handleGlobalClick, true);
        };
    }, [mode]);

    // Timer for Countdown
    useEffect(() => {
        if (mode !== 'countdown') return;

        if (countdownSeconds <= 0) {
            executeStartTest(pendingPackage);
            return;
        }

        const timer = setInterval(() => {
            setCountdownSeconds((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [mode, countdownSeconds, pendingPackage]);

    // Main Test Timer
    useEffect(() => {
        if (mode !== 'test') return;

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    finishTest();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [mode]);

    const formatTime = (sec: number) => {
        const m = Math.floor(sec / 60);
        const s = sec % 60;
        return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    };

    // Step 1: User initiates test -> enters Countdown Screen
    const initiateTest = (pkg: typeof packages[0]) => {
        setPendingPackage(pkg);
        setCountdownSeconds(5);
        setMode('countdown');
    };

    // Active subtests and current subtest
    const currentSubtest: SubtestItem | undefined = activeSubtests[currentSubtestIndex] || activeSubtests[0];
    const currentSubtestQuestions: Question[] = currentSubtest ? currentSubtest.questions : [];
    const currentQ: Question | undefined = currentSubtestQuestions[currentQuestionInSubtest];

    // Flat array of all package questions for scoring, review, and reporting
    const activeQuestions: Question[] = useMemo(() => {
        if (activeSubtests.length > 0) {
            return activeSubtests.flatMap((s) => s.questions);
        }
        return rawBank;
    }, [activeSubtests, rawBank]);

    const hasNextSubtest = currentSubtestIndex >= 0 && currentSubtestIndex < activeSubtests.length - 1;
    const nextSubtest = hasNextSubtest ? activeSubtests[currentSubtestIndex + 1] : null;
    const isLastQuestionOfSubtest = currentSubtestQuestions.length > 0 && currentQuestionInSubtest === currentSubtestQuestions.length - 1;

    const currentSubtestAnsweredCount = currentSubtestQuestions.filter(
        (q) => answers[q.id] !== undefined
    ).length;

    // Step 2: Countdown finishes -> executes start of test
    const executeStartTest = (
        pkg: typeof packages[0],
        resumeSubtestIndex = 0,
        resumeQuestionIndex = 0,
        initialAnswers: Record<number, number> = {}
    ) => {
        setSelectedPackage(pkg);
        const subtests = buildSubtestsForPackage(pkg.cat, rawBank);
        setActiveSubtests(subtests);
        const targetSubIdx = Math.min(Math.max(0, resumeSubtestIndex), Math.max(0, subtests.length - 1));
        setCurrentSubtestIndex(targetSubIdx);
        
        const subQuestions = subtests[targetSubIdx]?.questions || [];
        let targetQIdx = 0;
        if (subQuestions.length > 0) {
            // Prioritize resuming at the exact question index user left off at
            if (typeof resumeQuestionIndex === 'number' && resumeQuestionIndex >= 0 && resumeQuestionIndex < subQuestions.length) {
                targetQIdx = resumeQuestionIndex;
            } else {
                const firstUnanswered = subQuestions.findIndex((q) => initialAnswers[q.id] === undefined);
                targetQIdx = firstUnanswered !== -1 ? firstUnanswered : 0;
            }
        }

        setCurrentQuestionInSubtest(targetQIdx);
        setAnswers(initialAnswers);
        setTimeLeft(pkg.durasi * 60);
        setCategoryFilter('SEMUA');
        setShowExitModal(false);
        setShowSubmitModal(false);
        setShowSubtestFinishModal(false);
        setMode('test');
    };

    const handleSelectOption = (qId: number, optIdx: number) => {
        setAnswers((prev) => {
            const next = {
                ...prev,
                [qId]: optIdx,
            };
            try {
                const stateData = {
                    packageId: selectedPackage.id,
                    packageTitle: selectedPackage.title,
                    answers: next,
                    currentSubtestIndex: currentSubtestIndex,
                    currentQuestionInSubtest: currentQuestionInSubtest,
                    nextSubtestTitle: currentSubtest?.title || '',
                    timestamp: new Date().toISOString(),
                };
                localStorage.setItem('tryout_saved_session', JSON.stringify(stateData));
                setSavedSession(stateData);
            } catch (e) {
                console.error(e);
            }
            return next;
        });
    };

    // Request finishing subtest (warn if unanswered questions remain)
    const handleRequestFinishSubtest = () => {
        const unansweredInSub = currentSubtestQuestions.filter((q) => answers[q.id] === undefined).length;
        if (unansweredInSub > 0) {
            setShowSubtestFinishModal(true);
        } else {
            handleForceFinishSubtest();
        }
    };

    // Transition to break between subtests
    const handleForceFinishSubtest = () => {
        setShowSubtestFinishModal(false);
        if (hasNextSubtest && nextSubtest && currentSubtest) {
            setJustCompletedSubtest(currentSubtest);
            setBreakNextSubtest(nextSubtest);
            const nextIdx = currentSubtestIndex + 1;
            // Save current progress to localStorage
            try {
                const stateData = {
                    packageId: selectedPackage.id,
                    packageTitle: selectedPackage.title,
                    answers: answers,
                    currentSubtestIndex: nextIdx,
                    currentQuestionInSubtest: 0,
                    nextSubtestTitle: nextSubtest.title,
                    timestamp: new Date().toISOString(),
                };
                localStorage.setItem('tryout_saved_session', JSON.stringify(stateData));
                setSavedSession(stateData);
            } catch (e) {
                console.error(e);
            }
            saveProgressToServer(selectedPackage.id, selectedPackage.title, answers, nextIdx, 0, activeSubtests.length, nextSubtest?.title ?? "");
            setMode('subtest-break');
        } else {
            setShowSubmitModal(true);
        }
    };

    const handleFinishSubtest = handleRequestFinishSubtest;

    // Break screen action: proceed to next subtest
    const handleProceedNextSubtest = () => {
        if (hasNextSubtest) {
            setCurrentSubtestIndex((prev) => prev + 1);
            setCurrentQuestionInSubtest(0);
            setMode('test');
        }
    };

    // Break screen action: pause & save progress
    const handlePauseAndSave = () => {
        if (breakNextSubtest) {
            const nextIdx = currentSubtestIndex + 1;
            try {
                const stateData = {
                    packageId: selectedPackage.id,
                    packageTitle: selectedPackage.title,
                    answers: answers,
                    currentSubtestIndex: nextIdx,
                    currentQuestionInSubtest: 0,
                    nextSubtestTitle: breakNextSubtest.title,
                    timestamp: new Date().toISOString(),
                };
                localStorage.setItem('tryout_saved_session', JSON.stringify(stateData));
                setSavedSession(stateData);
            } catch (e) {
                console.error(e);
            }
            saveProgressToServer(selectedPackage.id, selectedPackage.title, answers, nextIdx, 0, activeSubtests.length, nextSubtest?.title ?? "");
        }
        setMode('list');
    };

    // Resume saved session
    const handleResumeSavedSession = (targetPkg?: typeof packages[0]) => {
        let activeSaved = null;
        if (targetPkg) {
            if (savedSession && (savedSession.packageId === targetPkg.id || savedSession.packageTitle === targetPkg.title)) {
                activeSaved = savedSession;
            } else if (inProgressSession && (inProgressSession.title === targetPkg.title || inProgressSession.category_scores?.package_id === targetPkg.id)) {
                activeSaved = {
                    packageId: inProgressSession.category_scores?.package_id || targetPkg.id,
                    packageTitle: inProgressSession.title,
                    answers: inProgressSession.answers || {},
                    currentSubtestIndex: inProgressSession.category_scores?.current_subtest_index ?? 0,
                    currentQuestionInSubtest: inProgressSession.category_scores?.current_question_index ?? 0,
                    nextSubtestTitle: inProgressSession.category_scores?.subtest_title || '',
                    timestamp: inProgressSession.updated_at || new Date().toISOString(),
                };
            }
        }
        if (!activeSaved) {
            activeSaved = savedSession || (inProgressSession ? {
                packageId: inProgressSession.category_scores?.package_id || 'profiling-full',
                packageTitle: inProgressSession.title,
                answers: inProgressSession.answers || {},
                currentSubtestIndex: inProgressSession.category_scores?.current_subtest_index ?? 0,
                currentQuestionInSubtest: inProgressSession.category_scores?.current_question_index ?? 0,
                nextSubtestTitle: inProgressSession.category_scores?.subtest_title || '',
                timestamp: inProgressSession.updated_at || new Date().toISOString(),
            } : null);
        }

        if (!activeSaved) {
            if (targetPkg) initiateTest(targetPkg);
            return;
        }

        const pkgToStart = targetPkg || packages.find((p) => p.id === activeSaved.packageId || p.title === activeSaved.packageTitle) || packages[0];
        executeStartTest(
            pkgToStart,
            activeSaved.currentSubtestIndex ?? 0,
            activeSaved.currentQuestionInSubtest ?? 0,
            activeSaved.answers ?? {}
        );
    };

    // Discard saved session
    const handleDiscardSavedSession = () => {
        try {
            localStorage.removeItem('tryout_saved_session');
        } catch (e) {
            console.error(e);
        }
        setSavedSession(null);
    };

    // Step 3: Finish Test -> Save to server & transition to Result mode
    const finishTest = () => {
        setShowSubmitModal(false);
        // Clear saved session upon final submission
        try {
            localStorage.removeItem('tryout_saved_session');
            setSavedSession(null);
        } catch (e) {
            console.error(e);
        }
        router.post(
            '/tryout',
            {
                title: selectedPackage.title,
                answers: answers,
                time_spent: selectedPackage.durasi * 60 - timeLeft,
            },
            {
                preserveScroll: true,
                onSuccess: () => {
                    setMode('result');
                },
                onError: () => {
                    setMode('result');
                },
            }
        );
    };

    const confirmCancelTest = () => {
        setShowExitModal(false);
        const dest = pendingUrl;
        setPendingUrl(null);
        setAnswers({});
        setMode('list');
        if (dest) {
            router.visit(dest);
        }
    };

    const handlePrintReview = () => {
        window.print();
    };


    // Compute live client-side scores
    const scoresPerCategory: Record<string, { total: number; count: number }> = {
        POTENSI: { total: 0, count: 0 },
        MANAJERIAL: { total: 0, count: 0 },
        DIGITAL: { total: 0, count: 0 },
        KARIR: { total: 0, count: 0 },
    };

    let strukturalTally = 0;
    let fungsionalTally = 0;
    let operasionalTally = 0;
    let totalKarirAnswers = 0;
    let totalCorrectCount = 0;

    activeQuestions.forEach((q) => {
        const cat = q.kategori || 'POTENSI';
        if (!scoresPerCategory[cat]) {
            scoresPerCategory[cat] = { total: 0, count: 0 };
        }
        scoresPerCategory[cat].count += 5;

        const userChoice = answers[q.id];
        if (userChoice !== undefined) {
            if (cat === 'KARIR') {
                totalKarirAnswers++;
                if (userChoice === 0) strukturalTally++;
                else if (userChoice === 1) fungsionalTally++;
                else if (userChoice === 2) operasionalTally++;
                else fungsionalTally++;
                scoresPerCategory[cat].total += 5;
            } else if (q.scores && Array.isArray(q.scores) && typeof q.scores[userChoice] === 'number') {
                scoresPerCategory[cat].total += Number(q.scores[userChoice]);
                if (Number(q.scores[userChoice]) === 5) {
                    totalCorrectCount++;
                }
            } else if (userChoice === q.jawaban) {
                scoresPerCategory[cat].total += 5;
                totalCorrectCount++;
            }
        }
    });

    const normalizedScores: Record<string, number> = {};
    ['POTENSI', 'MANAJERIAL', 'DIGITAL'].forEach((cat) => {
        const { total, count } = scoresPerCategory[cat] || { total: 0, count: 0 };
        const max = count > 0 ? count : 30;
        normalizedScores[cat] = Math.round((total / max) * 100);
    });

    const totalVotes = Math.max(totalKarirAnswers, 1);
    const strukturalPct = Math.round((strukturalTally / totalVotes) * 100);
    const fungsionalPct = Math.round((fungsionalTally / totalVotes) * 100);
    const operasionalPct = Math.round((operasionalTally / totalVotes) * 100);

    let dominantKarir = 'Jalur Fungsional Keahlian & Riset Kebijakan';
    let dominantPill = 'Fungsional Keahlian';
    if (strukturalTally > fungsionalTally && strukturalTally >= operasionalTally) {
        dominantKarir = 'Jalur Kepemimpinan & Manajerial (Struktural / JPT)';
        dominantPill = 'Kepemimpinan & Struktural';
    } else if (operasionalTally > fungsionalTally && operasionalTally > strukturalTally) {
        dominantKarir = 'Jalur Pelayanan & Keterampilan Teknis (Operasional Prosedural)';
        dominantPill = 'Pelayanan & Operasional';
    }

    const avgCompetency = Math.round(
        (normalizedScores['POTENSI'] + normalizedScores['MANAJERIAL'] + normalizedScores['DIGITAL']) / 3
    );

    const isKarirOnly = selectedPackage.cat === 'KARIR';

    let displayOverallScore: number | null = avgCompetency;
    if (selectedPackage.cat === 'POTENSI') {
        displayOverallScore = normalizedScores['POTENSI'] || 0;
    } else if (selectedPackage.cat === 'MANAJERIAL') {
        displayOverallScore = normalizedScores['MANAJERIAL'] || 0;
    } else if (selectedPackage.cat === 'DIGITAL') {
        displayOverallScore = normalizedScores['DIGITAL'] || 0;
    } else if (isKarirOnly) {
        displayOverallScore = null;
    }

    const subtestBreakdownList = useMemo(() => {
        return activeSubtests
            .filter((sub) => sub.category !== 'KARIR')
            .map((sub) => {
                let totalPoints = 0;
                let maxPoints = sub.questions.length * 5;
                let correctCount = 0;

                sub.questions.forEach((q) => {
                    const userChoice = answers[q.id];
                    if (userChoice !== undefined) {
                        let earned = 0;
                        if (q.scores && Array.isArray(q.scores) && typeof q.scores[userChoice] === 'number') {
                            earned = Number(q.scores[userChoice]);
                        } else if (userChoice === q.jawaban) {
                            earned = 5;
                        }
                        totalPoints += earned;
                        if (earned === 5) correctCount++;
                    }
                });

                const score = Math.round((totalPoints / Math.max(maxPoints, 1)) * 100);
                let status: 'Kuat' | 'Standar' | 'Perlu Peningkatan' = 'Perlu Peningkatan';
                let badgeBg = 'bg-rose-50 border-rose-200 text-rose-800';
                let barBg = 'bg-rose-500';
                let rec = SUBTEST_DIAGNOSTICS[sub.id]?.rec_low || 'Perlu memperdalam latihan materi dasar.';

                if (score >= 80) {
                    status = 'Kuat';
                    badgeBg = 'bg-emerald-50 border-emerald-200 text-emerald-800';
                    barBg = 'bg-emerald-500';
                    rec = SUBTEST_DIAGNOSTICS[sub.id]?.rec_high || 'Kuasai dan pertahankan performa unggul.';
                } else if (score >= 65) {
                    status = 'Standar';
                    badgeBg = 'bg-blue-50 border-blue-200 text-blue-800';
                    barBg = 'bg-blue-500';
                    rec = SUBTEST_DIAGNOSTICS[sub.id]?.rec_mid || 'Capaian sudah memenuhi standar kelulusan.';
                }

                return {
                    id: sub.id,
                    title: sub.title,
                    shortTitle: sub.shortTitle,
                    sessionName: sub.sessionName,
                    category: sub.category,
                    score,
                    totalPoints,
                    maxPoints,
                    correctCount,
                    questionCount: sub.questions.length,
                    status,
                    badgeBg,
                    barBg,
                    rec,
                };
            });
    }, [activeSubtests, answers]);

    // 9 BOX SIMATA evaluation
    const axisX = Math.round((normalizedScores['POTENSI'] * 0.5) + (normalizedScores['DIGITAL'] * 0.5));
    const axisY = normalizedScores['MANAJERIAL'];

    let boxNumber = 1;
    let boxTitle = 'Kinerja Rendah Potensial Rendah';
    let boxDesc = 'Kinerja dan potensi masih rendah.';
    let boxTag = '';

    if (axisY >= 80) {
        if (axisX >= 80) {
            boxNumber = 9;
            boxTitle = 'Kinerja Tinggi Potensial Tinggi';
            boxDesc = 'Kinerja sangat baik dan potensi sangat tinggi.';
            boxTag = 'Talenta Unggul';
        } else if (axisX >= 60) {
            boxNumber = 7;
            boxTitle = 'Kinerja Tinggi Potensial Menengah';
            boxDesc = 'Kinerja sangat baik, potensi cukup untuk berkembang lebih tinggi.';
        } else {
            boxNumber = 4;
            boxTitle = 'Kinerja Tinggi Potensial Rendah';
            boxDesc = 'Kinerja sangat baik, namun potensi pengembangan masih terbatas.';
        }
    } else if (axisY >= 60) {
        if (axisX >= 80) {
            boxNumber = 8;
            boxTitle = 'Kinerja Sesuai Potensial Tinggi';
            boxDesc = 'Kinerja sudah sesuai, potensi sangat tinggi untuk peran yang lebih besar.';
        } else if (axisX >= 60) {
            boxNumber = 5;
            boxTitle = 'Kinerja Sesuai Potensial Menengah';
            boxDesc = 'Kinerja sesuai harapan dan memiliki potensi untuk berkembang.';
        } else {
            boxNumber = 2;
            boxTitle = 'Kinerja Sesuai Potensial Rendah';
            boxDesc = 'Kinerja sesuai harapan, namun potensi pengembangan masih rendah.';
        }
    } else {
        if (axisX >= 80) {
            boxNumber = 6;
            boxTitle = 'Kinerja Rendah Potensial Tinggi';
            boxDesc = 'Kinerja rendah, namun memiliki potensi sangat tinggi.';
        } else if (axisX >= 60) {
            boxNumber = 3;
            boxTitle = 'Kinerja Rendah Potensial Menengah';
            boxDesc = 'Kinerja rendah, namun memiliki potensi yang cukup.';
        } else {
            boxNumber = 1;
            boxTitle = 'Kinerja Rendah Potensial Rendah';
            boxDesc = 'Kinerja dan potensi masih rendah.';
        }
    }
    const boxLabel = `Box ${boxNumber}: ${boxTitle}${boxTag ? ` (${boxTag})` : ''}`;

    const answeredCount = Object.keys(answers).length;
    const unansweredCount = Math.max(0, activeQuestions.length - answeredCount);

    // Filtered questions for Review Page
    const filteredReviewQuestions = activeQuestions.filter((q) => {
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

        // Status filter
        if (reviewStatusFilter === 'CORRECT' && !isCorrect) return false;
        if (reviewStatusFilter === 'WRONG' && (!isAnswered || isCorrect)) return false;
        if (reviewStatusFilter === 'UNANSWERED' && isAnswered) return false;

        // Category filter
        if (reviewCategoryFilter !== 'ALL' && q.kategori !== reviewCategoryFilter) return false;

        return true;
    });

    return (
        <div className="min-h-screen bg-[#F8F9FA] text-slate-900 font-sans p-4 sm:p-6 lg:p-8 print:p-0 print:bg-white">
            <Head title="Simulasi Asesmen Profiling ASN - Standar BKN" />

            {/* Print Stylesheet Overrides */}
            <style>{`
                @media print {
                    body { background: white !important; color: black !important; }
                    .no-print { display: none !important; }
                    .print-only { display: block !important; }
                    .page-break { page-break-after: always; }
                    .card-box { border: 1px solid #cbd5e1 !important; box-shadow: none !important; margin-bottom: 1.5rem !important; }
                }
                @media screen {
                    .print-only { display: none !important; }
                }
            `}</style>

            <div className="max-w-6xl mx-auto space-y-6">

                {/* =========================================================================
                    MODE 1: DAFTAR PAKET & RIWAYAT (LANDING)
                   ========================================================================= */}
                {mode === 'list' && (
                    <div className="space-y-8">
                        {/* Saved In-Progress Session Resume Banner */}
                        {savedSession && (
                            <div className="p-5 rounded-2xl border border-emerald-300 bg-gradient-to-r from-emerald-50 via-teal-50 to-white shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-in fade-in">
                                <div className="flex items-center gap-3.5">
                                    <div className="w-11 h-11 rounded-xl bg-emerald-700 text-white flex items-center justify-center shrink-0 shadow-xs">
                                        <Coffee className="w-6 h-6" />
                                    </div>
                                    <div className="space-y-0.5">
                                        <div className="flex items-center gap-2">
                                            <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-200 text-emerald-900">
                                                ★ Ujian Tersimpan (Sesi Jeda)
                                            </span>
                                            <span className="text-xs text-slate-500 font-medium">
                                                {new Date(savedSession.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                        </div>
                                        <h4 className="font-black text-sm text-slate-900">
                                            {savedSession.packageTitle || 'Simulasi Tryout'}
                                        </h4>
                                        <p className="text-xs text-slate-600">
                                            Tersimpan di <strong>Sub-tes {savedSession.currentSubtestIndex + 1}</strong> • Sampai <strong>Soal ke-{(savedSession.currentQuestionInSubtest ?? 0) + 1}</strong> ({Object.keys(savedSession.answers || {}).length} soal sudah terjawab).
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2.5 self-end sm:self-center">
                                    <button
                                        type="button"
                                        onClick={handleDiscardSavedSession}
                                        className="px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-500 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                                    >
                                        Hapus
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleResumeSavedSession()}
                                        className="px-5 py-2.5 rounded-xl bg-emerald-800 text-white text-xs font-bold hover:bg-emerald-900 transition-all shadow-md flex items-center gap-2 cursor-pointer"
                                    >
                                        <Play className="w-4 h-4 fill-white" />
                                        <span>Lanjutkan Ujian</span>
                                    </button>
                                </div>
                            </div>
                        )}
                        {/* Header Banner */}
                        <div className="rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-900/5 overflow-hidden">
                            <MacWindowControls title="Ruang Uji Profiling & CAT Mandiri" badge="STANDAR BKN 2026" />
                            <div className="p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
                                <div className="space-y-2">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-200 bg-emerald-50 text-emerald-800 text-xs font-semibold">
                                        <Sparkles className="w-3.5 h-3.5" />
                                        <span>Simulasi Resmi Terintegrasi Pemetaan Talenta ASN (9 Box SIMATA)</span>
                                    </div>
                                    <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                                        Pusat Simulasi Uji Asesmen ASN
                                    </h1>
                                    <p className="text-xs sm:text-sm text-slate-600 max-w-xl leading-relaxed">
                                        Persiapkan diri menghadapi asesmen kompetensi BKN dengan simulasi 4 subtes resmi: <strong>Tes Potensi</strong>, <strong>Manajerial & Sosio-Kultural</strong>, <strong>Literasi Digital</strong>, dan <strong>Preferensi Karir</strong>.
                                    </p>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <Link
                                        href="/dashboard"
                                        className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold transition-all"
                                    >
                                        <ArrowLeft className="w-4 h-4" />
                                        <span>Ke Dashboard</span>
                                    </Link>
                                    <button
                                        onClick={() => initiateTest(packages[0])}
                                        className="inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl bg-emerald-800 text-white hover:bg-emerald-900 text-xs sm:text-sm font-bold shadow-md shadow-emerald-900/10 transition-all cursor-pointer"
                                    >
                                        <Play className="w-4 h-4 fill-white" />
                                        <span>Mulai Simulasi 4 Subtes</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* 4 Pillars Summary Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            <div className="p-4 rounded-xl border border-blue-100 bg-blue-50/50">
                                <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-blue-700">
                                    <span>Subtes 1</span>
                                    <span className="px-1.5 py-0.5 rounded bg-blue-100 text-blue-800 font-black">525 Soal</span>
                                </div>
                                <div className="text-xs font-black text-slate-900 mt-1">Tes Potensi</div>
                                <div className="text-[11px] text-slate-500 mt-0.5">5 Subtes: Figural (30), Numerik (360), Kritis (45), Belajar (45), Kepribadian (45)</div>
                            </div>
                            <div className="p-4 rounded-xl border border-emerald-100 bg-emerald-50/50">
                                <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                                    <span>Subtes 2</span>
                                    <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-black">45 Soal</span>
                                </div>
                                <div className="text-xs font-black text-slate-900 mt-1">Manajerial Sosio Kultural</div>
                                <div className="text-[11px] text-slate-500 mt-0.5">2 Subtes: SJT Manajerial & Sosio Kultural</div>
                            </div>
                            <div className="p-4 rounded-xl border border-purple-100 bg-purple-50/50">
                                <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-purple-700">
                                    <span>Subtes 3</span>
                                    <span className="px-1.5 py-0.5 rounded bg-purple-100 text-purple-800 font-black">35 Soal</span>
                                </div>
                                <div className="text-xs font-black text-slate-900 mt-1">Literasi Digital</div>
                                <div className="text-[11px] text-slate-500 mt-0.5">4 Subtes: Skill, Culture, Ethics, Safety (SPBE & PDP)</div>
                            </div>
                            <div className="p-4 rounded-xl border border-amber-100 bg-amber-50/50">
                                <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-amber-700">
                                    <span>Subtes 4</span>
                                    <span className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 font-black">168 Soal</span>
                                </div>
                                <div className="text-xs font-black text-slate-900 mt-1">Preferensi Karir</div>
                                <div className="text-[11px] text-slate-500 mt-0.5">4 Subtes: Minat, Nilai, Aspirasi, Pengalaman Kerja</div>
                            </div>
                        </div>

                        {/* Package Cards Grid */}
                        <div className="space-y-4">
                            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                                Pilihan Modul Latihan Uji Kompetensi
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                                {packages.map((pkg) => {
                                    const isDone = (completedTitles && completedTitles.includes(pkg.title)) || 
                                        sessions.some(s => s.completed_at && (s.title === pkg.title || (s.title && s.title.includes(pkg.title)) || (pkg.id === 'profiling-full' && s.title && s.title.includes('Simulasi Profiling 4 Subtes'))));

                                    const pkgInProgress = !isDone && (
                                        (savedSession && (savedSession.packageId === pkg.id || savedSession.packageTitle === pkg.title)) ||
                                        (inProgressSession && (inProgressSession.title === pkg.title || (inProgressSession.category_scores && inProgressSession.category_scores.package_id === pkg.id)))
                                    );

                                    const totalSubs = pkg.id === 'profiling-full' ? 15 : (pkg.id === 'potensi-drill' ? 5 : (pkg.id === 'manajerial-drill' ? 2 : 4));
                                    const currSub = savedSession?.currentSubtestIndex ?? (inProgressSession?.category_scores?.current_subtest_index ?? 0);
                                    const currQ = savedSession?.currentQuestionInSubtest ?? (inProgressSession?.category_scores?.current_question_index ?? 0);
                                    const savedAnswersCount = Object.keys(savedSession?.answers || inProgressSession?.answers || {}).length;
                                    const totalQuestionsInPkg = getPackageQuestionCount(pkg.cat, pkg.defaultSoal);
                                    const progressPct = isDone ? 100 : (pkgInProgress ? Math.min(99, Math.max(1, Math.round((savedAnswersCount / totalQuestionsInPkg) * 100))) : 0);

                                    return (
                                        <div
                                            key={pkg.id}
                                            className={`rounded-2xl border ${isDone ? 'border-emerald-200 bg-emerald-50/20' : (pkgInProgress ? 'border-amber-300 bg-amber-50/20' : 'border-slate-200 bg-white')} shadow-md hover:shadow-xl transition-all flex flex-col justify-between overflow-hidden`}
                                        >
                                            <MacWindowControls 
                                                title={pkg.title} 
                                                badge={isDone ? '100% SELESAI' : (pkgInProgress ? `SUBTES ${currSub + 1} • SOAL ${currQ + 1}` : pkg.badge)} 
                                            />
                                            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                                                <div>
                                                    <div className="flex items-center justify-between gap-2">
                                                        <h3 className="font-bold text-sm sm:text-base text-slate-900">
                                                            {pkg.title}
                                                        </h3>
                                                    </div>
                                                    <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                                                        {pkg.desc}
                                                    </p>
                                                </div>

                                                {/* Progress Bar Widget */}
                                                <div className="space-y-1.5 pt-2 border-t border-slate-100">
                                                    <div className="flex items-center justify-between text-xs font-bold">
                                                        <span className="text-slate-500 text-[11px] uppercase tracking-wider">Progress Pengerjaan</span>
                                                        <span className={isDone ? 'text-emerald-700 flex items-center gap-1 font-mono text-xs' : (pkgInProgress ? 'text-amber-700 font-mono text-xs' : 'text-slate-400 font-mono text-xs')}>
                                                            {isDone ? (
                                                                <>
                                                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                                                    <span>100% Selesai</span>
                                                                </>
                                                            ) : pkgInProgress ? (
                                                                <span>{progressPct}% (Sub-tes {currSub + 1} • Soal ke-{currQ + 1})</span>
                                                            ) : (
                                                                <span>0% Belum Dikerjakan</span>
                                                            )}
                                                        </span>
                                                    </div>
                                                    <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                                                        <div 
                                                            className={`h-full rounded-full transition-all duration-500 ${isDone ? 'bg-emerald-600 w-full' : (pkgInProgress ? 'bg-amber-500' : 'bg-slate-200 w-0')}`} 
                                                            style={{ width: `${progressPct}%` }}
                                                        />
                                                    </div>
                                                    {pkgInProgress && (
                                                        <p className="text-[11px] text-amber-700 font-medium">
                                                            {savedAnswersCount} butir jawaban tersimpan di database
                                                        </p>
                                                    )}
                                                </div>

                                                <div className="pt-1 flex items-center justify-between text-xs text-slate-500 font-medium">
                                                    <span className="flex items-center gap-1.5">
                                                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                                                        {pkg.durasi} Menit
                                                    </span>
                                                    <span className="flex items-center gap-1.5">
                                                        <Award className="w-3.5 h-3.5 text-slate-400" />
                                                        {getPackageQuestionCount(pkg.cat, pkg.defaultSoal)} Butir Soal
                                                    </span>
                                                </div>

                                                {isDone ? (
                                                    <div className="space-y-2 pt-1">
                                                        <button
                                                            disabled
                                                            className="w-full py-2.5 rounded-xl bg-slate-100 text-slate-400 font-bold text-xs flex items-center justify-center gap-2 border border-slate-200 cursor-not-allowed select-none"
                                                            title="Modul ini sudah pernah dikerjakan dan terkunci. Anda tidak dapat melakukan tes ulang kecuali menghapus riwayatnya."
                                                        >
                                                            <Lock className="w-3.5 h-3.5" />
                                                            <span>Terkunci (Sudah Selesai)</span>
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() => setPackageToReset(pkg)}
                                                            className="w-full py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                                                        >
                                                            <Trash2 className="w-3.5 h-3.5" />
                                                            <span>Hapus / Reset Riwayat Tes Ini</span>
                                                        </button>
                                                    </div>
                                                ) : pkgInProgress ? (
                                                    <div className="space-y-2 pt-1">
                                                        <button
                                                            onClick={() => handleResumeSavedSession(pkg)}
                                                            className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                                                        >
                                                            <Play className="w-3.5 h-3.5 fill-white" />
                                                            <span>Lanjutkan Ujian (Mulai Soal ke-{currQ + 1})</span>
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() => setPackageToReset(pkg)}
                                                            className="w-full py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                                                            title="Reset progress tersimpan dan mulai dari awal"
                                                        >
                                                            <Trash2 className="w-3.5 h-3.5" />
                                                            <span>Hapus / Ulang Dari Awal</span>
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <button
                                                        onClick={() => initiateTest(pkg)}
                                                        className="w-full py-2.5 rounded-xl bg-slate-900 text-white hover:bg-emerald-800 font-bold text-xs transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                                                    >
                                                        <span>Buka Modul Ini</span>
                                                        <ArrowRight className="w-3.5 h-3.5" />
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Recent History Table */}
                        {sessions && sessions.length > 0 && (
                            <div className="rounded-2xl border border-slate-200 bg-white shadow-md overflow-hidden">
                                <MacWindowControls title="Riwayat Hasil Uji Asesmen Mandiri" badge={`${sessions.length} SESI TERAKHIR`} />
                                <div className="p-5 sm:p-6">
                                    <h3 className="font-bold text-sm text-slate-900 mb-4">Sesi Asesmen yang Telah Anda Selesaikan</h3>
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left text-xs">
                                            <thead>
                                                <tr className="border-b border-slate-200 text-slate-500 font-semibold">
                                                    <th className="py-2.5 px-3">Nama Paket</th>
                                                    <th className="py-2.5 px-3">Tanggal</th>
                                                    <th className="py-2.5 px-3">Predikat 9 Box SIMATA</th>
                                                    <th className="py-2.5 px-3">Rekomendasi Karir</th>
                                                    <th className="py-2.5 px-3 text-right">Skor Total</th>
                                                    <th className="py-2.5 px-3 text-center">Aksi</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-100 text-slate-700">
                                                {sessions.map((s, idx) => (
                                                    <tr key={s.id || idx} className="hover:bg-slate-50/80 transition-colors">
                                                        <td className="py-3 px-3 font-semibold text-slate-900">
                                                            {s.title}
                                                        </td>
                                                        <td className="py-3 px-3 text-slate-500">
                                                            {new Date(s.completed_at || s.created_at).toLocaleDateString('id-ID', {
                                                                day: 'numeric',
                                                                month: 'short',
                                                                year: 'numeric'
                                                            })}
                                                        </td>
                                                        <td className="py-3 px-3">
                                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                                                                {s.talent_quadrant?.split('(')[0] || 'Box 9'}
                                                            </span>
                                                        </td>
                                                        <td className="py-3 px-3 font-medium text-slate-800">
                                                            {s.career_recommendation || 'Jalur Fungsional Keahlian'}
                                                        </td>
                                                        <td className="py-3 px-3 font-bold text-slate-900 text-right">
                                                            {s.title && s.title.includes('Karir') ? 'Orientasi Karir' : `${s.total_score} / 100`}
                                                        </td>
                                                        <td className="py-3 px-3 text-center">
                                                            <button
                                                                type="button"
                                                                onClick={() => setPackageToReset({ title: s.title, id: s.id })}
                                                                className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                                                                title="Hapus riwayat sesi ini"
                                                            >
                                                                <Trash2 className="w-3.5 h-3.5" />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* =========================================================================
                    MODE 2: PRA-UJIAN COUNTDOWN & TATA TERTIB RESMI
                   ========================================================================= */}
                {mode === 'countdown' && (
                    <div className="max-w-2xl mx-auto py-8">
                        <div className="rounded-2xl border border-slate-200 bg-white shadow-2xl overflow-hidden">
                            <MacWindowControls title="Ruang Persiapan Simulasi CAT BKN" badge="COUNTDOWN AKTIF" />
                            <div className="p-8 sm:p-10 text-center space-y-6">
                                
                                {/* Countdown Circle */}
                                <div className="relative w-32 h-32 mx-auto flex items-center justify-center">
                                    <div className="absolute inset-0 rounded-full border-4 border-emerald-100 animate-pulse" />
                                    <div className="w-28 h-28 rounded-full bg-emerald-800 text-white flex flex-col items-center justify-center shadow-lg shadow-emerald-900/30">
                                        <span className="text-4xl font-black tracking-tight">{countdownSeconds}</span>
                                        <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-200">Detik</span>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold">
                                        <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                                        <span>Simulasi Resmi Mengunci Navigasi</span>
                                    </div>
                                    <h2 className="text-2xl font-black text-slate-900">
                                        Bersiap Memulai Ujian
                                    </h2>
                                    <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                                        Anda akan memulai <strong>{pendingPackage.title}</strong> dengan alokasi waktu <strong>{pendingPackage.durasi} menit</strong>.
                                    </p>
                                </div>

                                {/* Tata Tertib Box */}
                                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 text-left space-y-2.5 text-xs text-slate-700">
                                    <div className="font-bold text-slate-900 flex items-center gap-1.5 text-xs">
                                        <ShieldCheck className="w-4 h-4 text-emerald-700" />
                                        <span>Ketentuan & Tata Tertib Simulasi CAT:</span>
                                    </div>
                                    <ul className="space-y-1.5 pl-5 list-disc text-slate-600 text-[11px] leading-relaxed">
                                        <li><strong>Navigasi Terkunci:</strong> Anda tidak diperkenankan keluar atau me-refresh halaman selama simulasi berlangsung.</li>
                                        <li><strong>Pembatalan Sesi:</strong> Jika Anda keluar paksa, seluruh progres dan waktu pengerjaan akan dibatalkan.</li>
                                        <li><strong>Kerahasiaan Pembahasan:</strong> Kunci jawaban dan rasionalisasi penilaian <em>hanya akan ditampilkan setelah Anda menyelesaikan seluruh soal</em>.</li>
                                        <li><strong>Unduh Pembahasan:</strong> Setelah selesai, Anda dapat mengunduh seluruh pembahasan soal dalam format dokumen PDF resmi.</li>
                                    </ul>
                                </div>

                                {/* Actions */}
                                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                                    <button
                                        onClick={() => setMode('list')}
                                        className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-all cursor-pointer"
                                    >
                                        Batalkan & Kembali
                                    </button>
                                    <button
                                        onClick={() => executeStartTest(pendingPackage)}
                                        className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-emerald-800 text-white text-xs font-bold hover:bg-emerald-900 shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                                    >
                                        <Play className="w-3.5 h-3.5 fill-white" />
                                        <span>Mulai Sekarang Tanpa Menunggu</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* =========================================================================
                    MODE 3: CAT TEST INTERFACE (UJIAN AKTIF PER SUB-TES)
                   ========================================================================= */}
                {mode === 'test' && currentQ && (
                    <div className="fixed inset-0 z-40 bg-[#F8F9FA] overflow-y-auto p-4 sm:p-6 lg:p-8 test-workarea flex flex-col justify-start">
                        <div className="max-w-6xl mx-auto w-full space-y-6">
                            {/* Top Bar Status in Mac Window */}
                            <div className="rounded-2xl border border-slate-200 bg-white shadow-md overflow-hidden">
                                <MacWindowControls title={selectedPackage.title} badge="SIMULASI BERLANGSUNG" />
                                
                                <div className="p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 bg-white">
                                    <div className="flex flex-wrap items-center gap-3">
                                        <span className="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-900 font-black text-xs shrink-0">
                                            Sub-tes {currentSubtestIndex + 1} dari {activeSubtests.length}
                                        </span>
                                        <div className="flex items-center gap-2">
                                            <span className="text-slate-900 font-extrabold text-sm sm:text-base">
                                                {currentSubtest?.title}
                                            </span>
                                            {currentSubtest?.sessionName && (
                                                <span className="hidden md:inline-block text-[11px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                                                    {currentSubtest.sessionName}
                                                </span>
                                            )}
                                            {currentSubtest?.durationMinutes && (
                                                <span className="text-[11px] font-mono font-bold text-emerald-800 bg-emerald-100/70 border border-emerald-200 px-2 py-0.5 rounded inline-flex items-center gap-1">
                                                    ⏱️ {currentSubtest.durationMinutes} Menit
                                                </span>
                                            )}
                                        </div>
                                        <div className="h-4 w-px bg-slate-200 hidden sm:block" />
                                        <div className="text-xs font-semibold text-slate-500 hidden sm:inline-flex items-center gap-1.5">
                                            <Layers className="w-3.5 h-3.5 text-slate-400" />
                                            <span>Soal {currentQuestionInSubtest + 1} dari {currentSubtestQuestions.length}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        {/* Timer */}
                                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-amber-200 bg-amber-50 text-amber-900 font-mono text-sm font-bold">
                                            <Clock className="w-4 h-4 text-amber-600 animate-pulse" />
                                            <span>{formatTime(timeLeft)}</span>
                                        </div>

                                        {/* Save & Pause Button */}
                                        <button
                                            type="button"
                                            onClick={handleSaveAndPauseCurrentTest}
                                            className="px-3.5 py-2 rounded-xl border border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                                            title="Simpan seluruh jawaban dan jeda tes untuk dilanjutkan nanti"
                                        >
                                            <PauseCircle className="w-4 h-4 text-amber-700" />
                                            <span className="hidden sm:inline">Simpan & Jeda</span>
                                        </button>

                                        {/* Exit Button with alert */}
                                        <button
                                            onClick={() => setShowExitModal(true)}
                                            className="px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                                            title="Keluar dari Ujian"
                                        >
                                            <AlertTriangle className="w-3.5 h-3.5 text-slate-500" />
                                            <span className="hidden sm:inline">Keluar</span>
                                        </button>

                                        {/* Action Button: Selesai Sub-tes / Selesaikan Ujian */}
                                        {hasNextSubtest ? (
                                            <button
                                                onClick={handleRequestFinishSubtest}
                                                className="px-4 py-2 rounded-xl bg-blue-700 text-white text-xs font-bold hover:bg-blue-800 transition-colors shadow-xs cursor-pointer flex items-center gap-1.5"
                                                title="Selesaikan sub-tes saat ini dan masuk ke jeda istirahat"
                                            >
                                                <Coffee className="w-3.5 h-3.5" />
                                                <span>Selesai Sub-tes</span>
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => setShowSubmitModal(true)}
                                                className="px-4 py-2 rounded-xl bg-emerald-800 text-white text-xs font-bold hover:bg-emerald-900 transition-colors shadow-xs cursor-pointer"
                                            >
                                                Selesaikan Ujian
                                            </button>
                                        )}
                                    </div>
                                </div>

                                {/* Sub-test Sequential Stepper */}
                                <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-200/80 flex items-center gap-2 overflow-x-auto text-xs">
                                    <div className="flex items-center gap-1.5 shrink-0 text-slate-500 font-bold text-[11px] uppercase tracking-wider pr-1">
                                        <Layers className="w-3.5 h-3.5 text-slate-600" />
                                        <span>Alur Sub-tes:</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 flex-nowrap">
                                        {activeSubtests.map((sub, sIdx) => {
                                            const isCompleted = sIdx < currentSubtestIndex;
                                            const isCurrent = sIdx === currentSubtestIndex;
                                            const isUpcoming = sIdx > currentSubtestIndex;
                                            return (
                                                <div
                                                    key={sub.id}
                                                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold shrink-0 transition-all ${
                                                        isCurrent
                                                            ? 'bg-slate-900 text-white shadow-xs ring-2 ring-emerald-500/40'
                                                            : isCompleted
                                                            ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                                                            : 'bg-slate-200/70 text-slate-400 border border-slate-200'
                                                    }`}
                                                >
                                                    {isCompleted ? (
                                                        <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                                                    ) : isCurrent ? (
                                                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                                                    ) : (
                                                        <span className="text-[10px] font-mono text-slate-400">#{sIdx + 1}</span>
                                                    )}
                                                    <span>
                                                        {sub.shortTitle} ({sub.questions.length})
                                                    </span>
                                                    {isUpcoming && <span className="text-[10px] opacity-60">🔒</span>}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>

                            {/* Question Work Area Grid */}
                            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                                {/* Question Box (Cols 3) */}
                                <div className="lg:col-span-3 rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-900/5 overflow-hidden flex flex-col justify-between">
                                    <div className="p-6 sm:p-8 space-y-6 flex-1">
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">
                                                    {currentSubtest?.title} • {currentQ.subkategori || currentQ.category_name}
                                                </div>
                                                <span className="text-xs font-mono font-bold text-slate-400">
                                                    Butir {currentQuestionInSubtest + 1} / {currentSubtestQuestions.length}
                                                </span>
                                            </div>
                                            <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed">
                                                {currentQ.soal}
                                            </h2>

                                            {currentQ.image_url && (
                                                <div className="my-4 p-4 bg-slate-50 border border-slate-200/90 rounded-2xl overflow-hidden flex flex-col items-center justify-center shadow-xs">
                                                    <div 
                                                        onClick={() => setPreviewImage(currentQ.image_url!)}
                                                        className="group relative cursor-pointer overflow-hidden rounded-xl"
                                                        title="Klik untuk memperbesar gambar (Modal)"
                                                    >
                                                        <img
                                                            src={currentQ.image_url}
                                                            alt="Bagan Soal Figural"
                                                            className="max-h-[390px] w-auto max-w-full object-contain rounded-xl shadow-xs transition-transform duration-200 group-hover:scale-[1.01]"
                                                        />
                                                        <div className="absolute inset-0 bg-slate-900/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white font-semibold text-xs backdrop-blur-[1px] rounded-xl">
                                                            <ZoomIn className="w-4 h-4" />
                                                            <span>Klik untuk memperbesar gambar</span>
                                                        </div>
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={() => setPreviewImage(currentQ.image_url!)}
                                                        className="text-[11px] text-slate-500 hover:text-blue-600 mt-2.5 font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                                                    >
                                                        <Layers className="w-3.5 h-3.5 text-blue-600" />
                                                        <span>Bagan Visual Soal Figural (Standar BKN) • <strong className="text-blue-600 font-semibold underline underline-offset-2">Perbesar Gambar</strong></span>
                                                    </button>
                                                </div>
                                            )}

                                            {currentQ.kategori === 'KARIR' && (
                                                <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-200 text-amber-900 text-xs flex items-center gap-2 font-medium">
                                                    <Compass className="w-4 h-4 text-amber-700 shrink-0" />
                                                    <span>Pilih opsi peran yang paling mencerminkan motivasi dan pendekatan kerja terbaik Anda:</span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Options List */}
                                        <div className={`pt-2 ${currentQ.pilihan?.length === 2 ? 'grid grid-cols-1 sm:grid-cols-2 gap-4' : 'space-y-3'}`}>
                                            {currentQ.pilihan?.map((pil, oIdx) => {
                                                const isSelected = answers[currentQ.id] === oIdx;
                                                return (
                                                    <button
                                                        key={oIdx}
                                                        onClick={() => handleSelectOption(currentQ.id, oIdx)}
                                                        className={`w-full text-left rounded-xl border transition-all flex items-start gap-3.5 font-medium cursor-pointer ${
                                                            currentQ.pilihan.length === 2 ? 'p-5 sm:p-6 text-sm sm:text-base' : 'p-4 text-xs sm:text-sm'
                                                        } ${
                                                            isSelected
                                                                ? 'border-emerald-600 bg-emerald-50/70 text-slate-900 ring-2 ring-emerald-600/30 shadow-xs'
                                                                : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700'
                                                        }`}
                                                    >
                                                        <span className={`rounded-md flex items-center justify-center font-bold shrink-0 transition-colors ${
                                                            currentQ.pilihan.length === 2 ? 'w-8 h-8 text-sm' : 'w-6 h-6 text-xs'
                                                        } ${
                                                            isSelected ? 'bg-emerald-700 text-white' : 'bg-slate-200 text-slate-600'
                                                        }`}>
                                                            {String.fromCharCode(65 + oIdx)}
                                                        </span>
                                                        <span className={`flex-1 leading-relaxed ${currentQ.pilihan.length === 2 ? 'font-mono font-bold text-slate-900 text-base sm:text-lg' : ''}`}>
                                                            {pil}
                                                        </span>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    {/* Navigation Arrows Bottom */}
                                    <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
                                        <button
                                            disabled={currentQuestionInSubtest === 0}
                                            onClick={() => setCurrentQuestionInSubtest((p) => Math.max(0, p - 1))}
                                            className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 disabled:opacity-40 hover:bg-white flex items-center gap-2 cursor-pointer disabled:cursor-not-allowed"
                                        >
                                            <ArrowLeft className="w-3.5 h-3.5" />
                                            <span>Soal Sebelumnya</span>
                                        </button>
                                        
                                        <div className="flex items-center gap-2">
                                            <button
                                                type="button"
                                                onClick={handleSaveAndPauseCurrentTest}
                                                className="px-3.5 py-2 rounded-xl border border-amber-300 bg-amber-50/90 text-amber-900 hover:bg-amber-100 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                                                title="Simpan progres pengerjaan di butir soal ini dan keluar untuk dilanjutkan nanti"
                                            >
                                                <BookmarkCheck className="w-3.5 h-3.5 text-amber-700" />
                                                <span className="hidden sm:inline">Selesaikan & Simpan</span>
                                            </button>

                                            {isLastQuestionOfSubtest ? (
                                                hasNextSubtest ? (
                                                    <button
                                                        onClick={handleRequestFinishSubtest}
                                                        className="px-5 py-2 rounded-xl bg-emerald-800 text-white text-xs font-bold hover:bg-emerald-900 flex items-center gap-2 cursor-pointer shadow-md transition-all"
                                                    >
                                                        <span>Selesai Sub-tes & Masuk Break</span>
                                                        <ArrowRight className="w-3.5 h-3.5" />
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() => setShowSubmitModal(true)}
                                                        className="px-5 py-2 rounded-xl bg-emerald-800 text-white text-xs font-bold hover:bg-emerald-900 flex items-center gap-2 cursor-pointer shadow-md transition-all"
                                                    >
                                                        <span>Selesaikan Seluruh Ujian</span>
                                                        <CheckCircle2 className="w-3.5 h-3.5" />
                                                    </button>
                                                )
                                            ) : (
                                                <button
                                                    onClick={() => setCurrentQuestionInSubtest((p) => Math.min(currentSubtestQuestions.length - 1, p + 1))}
                                                    className="px-5 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-emerald-800 flex items-center gap-2 cursor-pointer transition-colors"
                                                >
                                                    <span>Soal Berikutnya</span>
                                                    <ArrowRight className="w-3.5 h-3.5" />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Question Navigation Palette (Cols 1) - ONLY FOR ACTIVE SUB-TEST */}
                                <div className="lg:col-span-1 rounded-2xl border border-slate-200 bg-white shadow-md overflow-hidden h-fit">
                                    <MacWindowControls 
                                        title={`Sub-tes ${currentSubtestIndex + 1}: ${currentSubtest?.shortTitle || 'Daftar Soal'}`} 
                                        badge={`${currentSubtestAnsweredCount}/${currentSubtestQuestions.length}`} 
                                    />
                                    <div className="p-4 space-y-4">
                                        <div className="space-y-1">
                                            <div className="text-xs font-bold text-slate-800 flex items-center justify-between">
                                                <span>Daftar Soal Sub-tes</span>
                                                <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                                                    Sub-tes {currentSubtestIndex + 1} of {activeSubtests.length}
                                                </span>
                                            </div>
                                            <p className="text-[11px] text-slate-500 leading-snug">
                                                Hanya butir soal pada <strong>{currentSubtest?.shortTitle}</strong> ({currentSubtestQuestions.length} butir). Sub-tes berikutnya akan terbuka setelah jeda.
                                            </p>
                                        </div>

                                        <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-4 gap-2 max-h-96 overflow-y-auto pr-1">
                                            {currentSubtestQuestions.map((q, qIndex) => {
                                                const isAnswered = answers[q.id] !== undefined;
                                                const isCurrent = currentQuestionInSubtest === qIndex;
                                                return (
                                                    <button
                                                        key={q.id || qIndex}
                                                        onClick={() => setCurrentQuestionInSubtest(qIndex)}
                                                        className={`h-9 rounded-lg text-xs font-bold transition-all flex items-center justify-center cursor-pointer ${
                                                            isCurrent
                                                                ? 'ring-2 ring-slate-900 bg-emerald-800 text-white shadow-sm'
                                                                : isAnswered
                                                                ? 'bg-emerald-100 border border-emerald-300 text-emerald-900 font-bold'
                                                                : 'bg-slate-100 border border-slate-200 text-slate-600 hover:bg-slate-200'
                                                        }`}
                                                        title={`Soal nomor ${qIndex + 1} (${isAnswered ? 'Sudah terjawab' : 'Belum dijawab'})`}
                                                    >
                                                        {qIndex + 1}
                                                    </button>
                                                );
                                            })}
                                        </div>

                                        <div className="pt-3 border-t border-slate-100 space-y-1.5 text-[11px] text-slate-500 font-medium">
                                            <div className="flex items-center gap-2">
                                                <div className="w-3 h-3 rounded bg-emerald-800 ring-2 ring-slate-900" />
                                                <span>Soal Aktif</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="w-3 h-3 rounded bg-emerald-100 border border-emerald-300" />
                                                <span>Sudah Terjawab</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="w-3 h-3 rounded bg-slate-100 border border-slate-200" />
                                                <span>Belum Terjawab</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* =========================================================================
                    MODE 3.5: HALAMAN BREAK & JEDA ANTAR SUB-TES (INTERMISSION)
                   ========================================================================= */}
                {mode === 'subtest-break' && justCompletedSubtest && breakNextSubtest && (
                    <div className="fixed inset-0 z-40 bg-[#F8F9FA] overflow-y-auto p-4 sm:p-6 lg:p-8 test-workarea flex flex-col items-center justify-center min-h-screen">
                        <div className="max-w-2xl w-full rounded-3xl border border-slate-200 bg-white shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                            <MacWindowControls 
                                title={`Sesi Jeda Antar Sub-tes • ${selectedPackage.title}`} 
                                badge="BREAK TIME" 
                            />
                            
                            <div className="p-6 sm:p-8 space-y-6 text-center">
                                {/* Celebration / Status Icon */}
                                <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-sm">
                                    <CheckCircle2 className="w-8 h-8" />
                                </div>

                                <div className="space-y-2">
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-emerald-100 text-emerald-800 uppercase tracking-wider">
                                        ★ Sub-tes {currentSubtestIndex + 1} Selesai
                                    </span>
                                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                                        {justCompletedSubtest.title} Telah Selesai
                                    </h2>
                                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-lg mx-auto">
                                        Jawaban Anda pada sub-tes ini telah tersimpan aman di sistem. Anda dapat beristirahat sejenak sebelum memulai sub-tes berikutnya.
                                    </p>
                                </div>

                                {/* Stat Summary Box */}
                                <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left">
                                    <div className="space-y-1">
                                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Progres Sub-tes Ini</span>
                                        <div className="text-base font-black text-slate-900">
                                            {justCompletedSubtest.questions.filter(q => answers[q.id] !== undefined).length} / {justCompletedSubtest.questions.length} Terjawab
                                        </div>
                                        <p className="text-[10px] text-slate-500 font-medium">
                                            {justCompletedSubtest.questions.length - justCompletedSubtest.questions.filter(q => answers[q.id] !== undefined).length === 0 ? 'Semua butir soal terjawab' : `${justCompletedSubtest.questions.length - justCompletedSubtest.questions.filter(q => answers[q.id] !== undefined).length} butir terlewat`}
                                        </p>
                                    </div>
                                    <div className="space-y-1 border-l border-slate-200 pl-4">
                                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Terjawab Keseluruhan</span>
                                        <div className="text-base font-black text-emerald-700">
                                            {Object.keys(answers).length} / {activeQuestions.length} Soal
                                        </div>
                                        <p className="text-[10px] text-slate-500 font-medium">
                                            Sub-tes ke-{currentSubtestIndex + 1} dari {activeSubtests.length}
                                        </p>
                                    </div>
                                </div>

                                {/* Next Subtest Preview Card */}
                                <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50/60 border border-blue-200/80 text-left space-y-2.5">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[11px] font-bold text-blue-800 uppercase tracking-wider flex items-center gap-1.5">
                                            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                                            Sub-tes Selanjutnya (Siap Dikerjakan)
                                        </span>
                                        <span className="px-2 py-0.5 rounded-md bg-blue-200/60 text-blue-900 font-mono text-[11px] font-bold">
                                            {breakNextSubtest.questions.length} Butir Soal
                                        </span>
                                    </div>
                                    <h3 className="text-base font-black text-slate-900">
                                        {breakNextSubtest.title}
                                    </h3>
                                    <p className="text-xs text-slate-600 leading-relaxed">
                                        {breakNextSubtest.description || 'Fokus dan teliti dalam memilih jawaban terbaik. Waktu pengerjaan akan kembali berjalan saat Anda menekan tombol di bawah.'}
                                    </p>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                                    <button
                                        type="button"
                                        onClick={() => setMode('test')}
                                        className="py-3 px-4 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                                        title="Kembali ke soal pada sub-tes ini"
                                    >
                                        <ArrowLeft className="w-4 h-4 text-slate-500" />
                                        <span>Kembali ke Soal Sub-tes Ini</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handlePauseAndSave}
                                        className="flex-1 py-3.5 px-4 rounded-xl border border-amber-300 bg-amber-50 text-amber-900 hover:bg-amber-100 font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                                    >
                                        <PauseCircle className="w-4 h-4 text-amber-700" />
                                        <span>Istirahat & Simpan Progres</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleProceedNextSubtest}
                                        className="flex-1 py-3.5 px-4 rounded-xl bg-slate-900 hover:bg-emerald-800 text-white font-bold text-xs transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer group"
                                    >
                                        <span>Mulai Sub-tes Berikutnya</span>
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

            {/* =========================================================================
                MODE 4: HASIL SKOR & RAPOR PROFILING
               ========================================================================= */}
                {mode === 'result' && (
                    <div className="space-y-8">
                        {/* Summary Header in Mac Window */}
                        <div className="rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-900/5 overflow-hidden">
                            <MacWindowControls title="Laporan Rapor Hasil Evaluasi Asesmen" badge="HASIL RESMI" />
                            <div className="p-6 sm:p-10 space-y-8">
                                <div className="text-center max-w-xl mx-auto space-y-2">
                                    <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-emerald-200 bg-emerald-50 text-emerald-800 text-xs font-bold">
                                        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                                        <span>Simulasi Selesai Diproses</span>
                                    </div>
                                    <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
                                        Hasil Pemetaan Talenta & Karir Anda
                                    </h1>
                                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                                        Berikut adalah hasil evaluasi resmi capaian kompetensi kognitif, manajerial, literasi digital, serta pemetaan Tripatha Karir ASN Anda.
                                    </p>
                                </div>

                                {/* Top Metrics */}
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                                    <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/80">
                                        <div className="text-xs font-semibold text-slate-500">
                                            {isKarirOnly ? 'Status Pemetaan Karir' : 'Skor Capaian Kompetensi'}
                                        </div>
                                        <div className="text-3xl font-black text-slate-900 mt-1">
                                            {isKarirOnly ? '100% Terpetakan' : `${displayOverallScore} / 100`}
                                        </div>
                                        <div className="text-xs text-slate-500 mt-1 font-medium">
                                            {isKarirOnly ? '168 Instrumen Terjawab (Non-Nilai Angka)' : 'Skor Tertinggi 100 • Standar BKN / MyASN'}
                                        </div>
                                    </div>
                                    <div className="p-5 rounded-2xl border border-emerald-200 bg-emerald-50/70">
                                        <div className="text-xs font-semibold text-emerald-800">Predikat 9 Box SIMATA</div>
                                        <div className="text-xl font-black text-emerald-950 mt-1">
                                            Box {boxNumber}
                                        </div>
                                        <div className="text-xs text-emerald-800 mt-1 font-semibold">
                                            {boxTitle}
                                        </div>
                                        {boxTag && (
                                            <div className="mt-1">
                                                <span className="inline-block bg-[#f6c343] text-[#3d2700] text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-xs uppercase">
                                                    {boxTag}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-5 rounded-2xl border border-amber-200 bg-amber-50/70">
                                        <div className="text-xs font-semibold text-amber-800">Arah Rekomendasi Karir</div>
                                        <div className="text-base font-black text-amber-950 mt-1 line-clamp-1">
                                            {dominantPill}
                                        </div>
                                        <div className="text-xs text-amber-800 mt-1 font-semibold">Tripatha Karir Dominan</div>
                                    </div>
                                </div>

                                {/* Ringkasan Skor 3 Sesi Kompetensi Utama (Hanya Tampil Jika Paket Lengkap / Semua Sesi) */}
                                {selectedPackage.cat === 'SEMUA' && (
                                    <div className="p-5 sm:p-6 rounded-2xl border border-slate-200 bg-slate-50/60 space-y-3">
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                                            <span className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                                                <Layers className="w-4 h-4 text-blue-600" />
                                                Ringkasan Skor 3 Sesi Kompetensi Utama (Skala Maks 100)
                                            </span>
                                            <span className="text-[11px] font-semibold text-slate-500">
                                                *Sesi 4 (Preferensi Karir) merupakan pemetaan minat tanpa bobot nilai
                                            </span>
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                            <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs">
                                                <div className="text-[11px] font-semibold text-slate-500">Sesi 1: Tes Potensi Kognitif</div>
                                                <div className="text-2xl font-black text-slate-900 mt-1">
                                                    {normalizedScores['POTENSI'] || 0} <span className="text-xs text-slate-400 font-normal">/ 100</span>
                                                </div>
                                                <div className="text-[11px] text-slate-600 mt-1 font-medium">
                                                    {normalizedScores['POTENSI'] >= 80 ? 'Level 4 (Tinggi)' : normalizedScores['POTENSI'] >= 65 ? 'Level 3 (Sedang)' : 'Level 2 (Dasar)'}
                                                </div>
                                            </div>
                                            <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs">
                                                <div className="text-[11px] font-semibold text-slate-500">Sesi 2: Manajerial & Soskultur</div>
                                                <div className="text-2xl font-black text-slate-900 mt-1">
                                                    {normalizedScores['MANAJERIAL'] || 0} <span className="text-xs text-slate-400 font-normal">/ 100</span>
                                                </div>
                                                <div className="text-[11px] text-slate-600 mt-1 font-medium">
                                                    {normalizedScores['MANAJERIAL'] >= 80 ? 'Level 4 (Mahir)' : normalizedScores['MANAJERIAL'] >= 65 ? 'Level 3 (Mampu)' : 'Level 2 (Dasar)'}
                                                </div>
                                            </div>
                                            <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs">
                                                <div className="text-[11px] font-semibold text-slate-500">Sesi 3: Literasi Digital ASN</div>
                                                <div className="text-2xl font-black text-slate-900 mt-1">
                                                    {normalizedScores['DIGITAL'] || 0} <span className="text-xs text-slate-400 font-normal">/ 100</span>
                                                </div>
                                                <div className="text-[11px] text-slate-600 mt-1 font-medium">
                                                    {normalizedScores['DIGITAL'] >= 80 ? 'Level 4 (Cakap SPBE)' : normalizedScores['DIGITAL'] >= 65 ? 'Level 3 (Mampu)' : 'Level 2 (Dasar)'}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Rapor Evaluasi Capaian per Sub-Tes (Diagnostic Feedback & Rekomendasi Belajar) */}
                                {subtestBreakdownList.length > 0 && (
                                    <div className="p-5 sm:p-7 rounded-2xl border border-slate-200 bg-white shadow-xs space-y-5">
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                                            <div>
                                                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-blue-50 text-blue-800 border border-blue-200">
                                                    <Target className="w-3.5 h-3.5 text-blue-600" />
                                                    <span>Rapor Evaluasi Capaian per Sub-Tes (Diagnostic Feedback)</span>
                                                </div>
                                                <h3 className="text-base sm:text-lg font-black text-slate-900 mt-1">
                                                    Detail Skor & Rekomendasi Materi yang Perlu Dipelajari
                                                </h3>
                                                <p className="text-xs text-slate-500 mt-0.5">
                                                    Evaluasi performa tiap instrumen sub-tes untuk mengetahui kelemahan spesifik dan materi yang perlu ditingkatkan.
                                                </p>
                                            </div>
                                            <div className="flex flex-wrap items-center gap-2 text-[11px] font-bold">
                                                <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200">
                                                    {subtestBreakdownList.filter(s => s.status === 'Kuat').length} Kuat (≥80)
                                                </span>
                                                <span className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-800 border border-blue-200">
                                                    {subtestBreakdownList.filter(s => s.status === 'Standar').length} Standar (65-79)
                                                </span>
                                                <span className="px-2.5 py-1 rounded-lg bg-rose-50 text-rose-800 border border-rose-200">
                                                    {subtestBreakdownList.filter(s => s.status === 'Perlu Peningkatan').length} Perlu Peningkatan (&lt;65)
                                                </span>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {subtestBreakdownList.map((item) => (
                                                <div key={item.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors space-y-3">
                                                    <div className="flex items-start justify-between gap-2">
                                                        <div>
                                                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                                                {item.sessionName}
                                                            </span>
                                                            <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                                                                {item.title}
                                                            </h4>
                                                            <div className="text-[11px] text-slate-500 mt-0.5">
                                                                {item.correctCount} dari {item.questionCount} Soal Tepat ({item.totalPoints} / {item.maxPoints} Poin)
                                                            </div>
                                                        </div>
                                                        <div className="text-right shrink-0">
                                                            <div className="text-lg font-black text-slate-900">
                                                                {item.score} <span className="text-xs font-normal text-slate-400">/ 100</span>
                                                            </div>
                                                            <span className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-black border uppercase mt-0.5 ${item.badgeBg}`}>
                                                                {item.status}
                                                            </span>
                                                        </div>
                                                    </div>

                                                    <div className="h-1.5 w-full rounded-full bg-slate-200 overflow-hidden">
                                                        <div className={`h-full rounded-full transition-all duration-500 ${item.barBg}`} style={{ width: `${item.score}%` }} />
                                                    </div>

                                                    <div className="p-2.5 rounded-lg bg-white border border-slate-200 text-[11px] text-slate-600 leading-relaxed flex items-start gap-2 shadow-2xs">
                                                        <Lightbulb className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                                                        <div>
                                                            <span className="font-bold text-slate-800">Catatan Belajar: </span>
                                                            {item.rec}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Subtest 4 Feature: TRIPATHA KARIR SHOWCASE */}
                                <div className="p-6 rounded-2xl border border-amber-200 bg-amber-50/30 space-y-5">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-200/60 pb-4">
                                        <div>
                                            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
                                                <Compass className="w-3.5 h-3.5" />
                                                <span>Subtes 4: Pemetaan Tripatha Karir ASN (Instrumen Non-Skor Numerik)</span>
                                            </div>
                                            <h3 className="text-lg font-black text-slate-900 mt-1">
                                                {dominantKarir}
                                            </h3>
                                        </div>
                                        <span className="px-3 py-1.5 rounded-xl bg-amber-600 text-white text-xs font-bold shadow-xs">
                                            Rekomendasi Utama
                                        </span>
                                    </div>

                                    {/* 3 Tracks Percentage Bars */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
                                            <div className="flex justify-between items-center text-xs">
                                                <span className="font-bold text-slate-800">Fungsional Keahlian & Riset</span>
                                                <span className="font-black text-slate-900">{fungsionalPct}%</span>
                                            </div>
                                            <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                                                <div className="h-full bg-blue-600 rounded-full transition-all" style={{ width: `${fungsionalPct}%` }} />
                                            </div>
                                            <div className="text-[11px] text-slate-500 leading-tight">
                                                Analis kebijakan, perencanaan, IT & penelitian berbasis bukti.
                                            </div>
                                        </div>

                                        <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
                                            <div className="flex justify-between items-center text-xs">
                                                <span className="font-bold text-slate-800">Kepemimpinan & Manajerial</span>
                                                <span className="font-black text-slate-900">{strukturalPct}%</span>
                                            </div>
                                            <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                                                <div className="h-full bg-emerald-600 rounded-full transition-all" style={{ width: `${strukturalPct}%` }} />
                                            </div>
                                            <div className="text-[11px] text-slate-500 leading-tight">
                                                Struktural, JPT, koordinasi lintas unit & diplomasi strategi.
                                            </div>
                                        </div>

                                        <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
                                            <div className="flex justify-between items-center text-xs">
                                                <span className="font-bold text-slate-800">Pelayanan & Operasional Teknis</span>
                                                <span className="font-black text-slate-900">{operasionalPct}%</span>
                                            </div>
                                            <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                                                <div className="h-full bg-amber-600 rounded-full transition-all" style={{ width: `${operasionalPct}%` }} />
                                            </div>
                                            <div className="text-[11px] text-slate-500 leading-tight">
                                                Pelayanan publik langsung, administrasi & operasional kedinasan.
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* 9 BOX SIMATA - PETA TALENTA ASN */}
                                <NineBoxSimata activeBox={boxNumber} axisX={axisX} axisY={axisY} />

                                {/* PRIMARY ACTIONS: PEMBAHASAN & UNDUH */}
                                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-6 border-t border-slate-200">
                                    <button
                                        onClick={() => setMode('review')}
                                        className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-emerald-800 text-white font-bold text-xs sm:text-sm hover:bg-emerald-900 transition-all flex items-center justify-center gap-2.5 shadow-lg shadow-emerald-900/10 cursor-pointer"
                                    >
                                        <Eye className="w-4 h-4" />
                                        <span>Buka Halaman Pembahasan Lengkap</span>
                                    </button>
                                    <button
                                        onClick={() => {
                                            setMode('review');
                                            setTimeout(() => window.print(), 400);
                                        }}
                                        className="w-full sm:w-auto px-5 py-3.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                                    >
                                        <Download className="w-4 h-4 text-slate-600" />
                                        <span>Unduh / Cetak Laporan PDF</span>
                                    </button>
                                    <button
                                        onClick={() => setMode('list')}
                                        className="w-full sm:w-auto px-5 py-3.5 rounded-xl border border-transparent text-slate-600 hover:text-slate-900 font-semibold text-xs transition-all cursor-pointer"
                                    >
                                        Kembali ke Beranda
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* =========================================================================
                    MODE 5: HALAMAN PEMBAHASAN SOAL LENGKAP & DAPAT DIUNDUH (REVIEW)
                   ========================================================================= */}
                {mode === 'review' && (
                    <div className="space-y-6">
                        {/* Review Top Banner */}
                        <div className="rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-900/5 overflow-hidden no-print">
                            <MacWindowControls title="Halaman Pembahasan & Kunci Jawaban Resmi BKN" badge="PEMBAHASAN RESMI" />
                            <div className="p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
                                <div className="space-y-1.5">
                                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold">
                                        <FileText className="w-3.5 h-3.5" />
                                        <span>Kunci Jawaban & Rasionalisasi Asesmen ASN</span>
                                    </div>
                                    <h1 className="text-xl sm:text-2xl font-black text-slate-900">
                                        Pembahasan: {selectedPackage.title}
                                    </h1>
                                    <p className="text-xs text-slate-600 max-w-xl leading-relaxed">
                                        Pelajari kunci jawaban terbaik, rasionalisasi penilaian 8 dimensi PermenPAN-RB, literasi digital SPBE, penalaran potensi kognitif, dan arah pemetaan Tripatha Karir.
                                    </p>
                                </div>

                                <div className="flex flex-wrap items-center gap-3">
                                    <button
                                        onClick={handlePrintReview}
                                        className="px-5 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-emerald-800 transition-all flex items-center gap-2 shadow-md cursor-pointer"
                                    >
                                        <Printer className="w-4 h-4" />
                                        <span>Unduh / Cetak Pembahasan (PDF)</span>
                                    </button>
                                    <button
                                        onClick={() => setMode('result')}
                                        className="px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer"
                                    >
                                        <BarChart3 className="w-4 h-4" />
                                        <span>Kembali ke Skor</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Print Only Header (appears only on printed document / PDF) */}
                        <div className="print-only p-6 border-b-2 border-slate-900 mb-6 space-y-2">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h1 className="text-xl font-black tracking-tight text-slate-900">
                                        LEMBAR HASIL & PEMBAHASAN RESMI SIMULASI PROFILING ASN
                                    </h1>
                                    <p className="text-xs text-slate-600">
                                        Modul: {selectedPackage.title} | Standar Uji Kompetensi BKN & PermenPAN-RB
                                    </p>
                                </div>
                                <div className="text-right text-xs text-slate-500 font-mono">
                                    <div>Tanggal: {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
                                    <div className="font-bold text-slate-800">9 Box SIMATA: Box {boxNumber} ({boxTitle})</div>
                                </div>
                            </div>
                            <div className="grid grid-cols-4 gap-2 pt-2 text-xs font-semibold">
                                <div className="p-2 border rounded">Skor Rata-Rata: {displayOverallScore !== null ? `${displayOverallScore}/100` : 'Pemetaan Karir'}</div>
                                <div className="p-2 border rounded">Tes Potensi: {normalizedScores['POTENSI'] || 0}/100</div>
                                <div className="p-2 border rounded">Manajerial: {normalizedScores['MANAJERIAL'] || 0}/100</div>
                                <div className="p-2 border rounded">Literasi Digital: {normalizedScores['DIGITAL'] || 0}/100</div>
                            </div>
                            {subtestBreakdownList.length > 0 && (
                                <div className="border rounded-lg p-3 text-xs mt-3">
                                    <div className="font-bold mb-1.5">Rapor Evaluasi Capaian per Sub-Tes (Diagnostic Feedback):</div>
                                    <table className="w-full text-left text-[11px]">
                                        <thead>
                                            <tr className="border-b font-bold">
                                                <th className="py-1">Sub-Tes</th>
                                                <th className="py-1">Sesi</th>
                                                <th className="py-1">Skor</th>
                                                <th className="py-1">Status</th>
                                                <th className="py-1">Rekomendasi Materi Belajar</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y">
                                            {subtestBreakdownList.map((item) => (
                                                <tr key={item.id}>
                                                    <td className="py-1 font-semibold">{item.title}</td>
                                                    <td className="py-1 text-slate-500">{item.sessionName}</td>
                                                    <td className="py-1 font-bold">{item.score}/100</td>
                                                    <td className="py-1">{item.status}</td>
                                                    <td className="py-1 text-slate-600">{item.rec}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>

                        {/* 9 Box SIMATA in Review Page */}
                        <div className="mb-6">
                            <NineBoxSimata activeBox={boxNumber} axisX={axisX} axisY={axisY} />
                        </div>

                        {/* Filter Tabs Toolbar */}
                        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl border border-slate-200 bg-white shadow-xs no-print">
                            {/* Status Filter */}
                            <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
                                <span className="text-[11px] font-bold text-slate-400 shrink-0">Filter Hasil:</span>
                                {[
                                    { id: 'ALL', label: `Semua Soal (${activeQuestions.length})` },
                                    { id: 'CORRECT', label: `Tepat / Skor 5 (${totalCorrectCount})` },
                                    { id: 'WRONG', label: `Kurang Tepat (${answeredCount - totalCorrectCount})` },
                                    { id: 'UNANSWERED', label: `Belum Dijawab (${unansweredCount})` },
                                ].map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setReviewStatusFilter(tab.id as any)}
                                        className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                                            reviewStatusFilter === tab.id
                                                ? 'bg-slate-900 text-white shadow-xs'
                                                : 'text-slate-600 hover:bg-slate-100'
                                        }`}
                                    >
                                        {tab.label}
                                    </button>
                                ))}
                            </div>

                            {/* Category Filter */}
                            <div className="flex items-center gap-1.5 text-xs">
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
                            {filteredReviewQuestions.length === 0 ? (
                                <div className="p-12 text-center rounded-2xl border border-slate-200 bg-white space-y-2">
                                    <Info className="w-8 h-8 text-slate-400 mx-auto" />
                                    <p className="text-xs font-semibold text-slate-600">Tidak ada butir soal yang sesuai filter ini.</p>
                                </div>
                            ) : (
                                filteredReviewQuestions.map((q, idx) => {
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

                                    return (
                                        <div
                                            key={q.id || idx}
                                            className="card-box rounded-2xl border border-slate-200 bg-white shadow-md overflow-hidden"
                                        >
                                            <MacWindowControls
                                                title={`Soal Nomor ${idx + 1}`}
                                                badge={q.kategori}
                                            />
                                            <div className="p-5 sm:p-7 space-y-5 text-xs">
                                                {/* Meta Info */}
                                                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                                                    <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider">
                                                        {q.subkategori || q.category_name}
                                                    </span>
                                                    <div className="flex items-center gap-2">
                                                        {isCorrect ? (
                                                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-bold">
                                                                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                                                                <span>{q.kategori === 'KARIR' ? 'Terpetakan' : 'Jawaban Tepat (Skor 5)'}</span>
                                                            </span>
                                                        ) : isAnswered ? (
                                                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-red-50 text-red-800 border border-red-200 text-[11px] font-bold">
                                                                <XCircle className="w-3 h-3 text-red-600" />
                                                                <span>Jawaban Kurang Tepat</span>
                                                            </span>
                                                        ) : (
                                                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200 text-[11px] font-bold">
                                                                <span>Belum Dijawab</span>
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Question Body */}
                                                <div className="font-bold text-slate-900 text-sm leading-relaxed">
                                                    {idx + 1}. {q.soal}
                                                </div>

                                                {q.image_url && (
                                                    <div className="my-3 p-3 bg-slate-50 border border-slate-200/80 rounded-xl overflow-hidden flex flex-col items-center justify-center">
                                                        <div 
                                                            onClick={() => setPreviewImage(q.image_url!)}
                                                            className="group relative cursor-pointer overflow-hidden rounded-lg"
                                                            title="Klik untuk memperbesar gambar (Modal)"
                                                        >
                                                            <img
                                                                src={q.image_url}
                                                                alt="Diagram Soal Figural"
                                                                className="max-h-[350px] w-auto max-w-full object-contain rounded-lg transition-transform duration-200 group-hover:scale-[1.01]"
                                                            />
                                                            <div className="absolute inset-0 bg-slate-900/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 text-white font-semibold text-xs backdrop-blur-[1px] rounded-lg">
                                                                <ZoomIn className="w-4 h-4" />
                                                                <span>Klik untuk memperbesar gambar</span>
                                                            </div>
                                                        </div>
                                                        <button
                                                            type="button"
                                                            onClick={() => setPreviewImage(q.image_url!)}
                                                            className="text-[10px] text-slate-500 hover:text-blue-600 mt-1.5 font-medium flex items-center gap-1 transition-colors cursor-pointer"
                                                        >
                                                            <Layers className="w-3 h-3 text-blue-600" />
                                                            <span>Bagan Visual Soal Figural • <strong className="text-blue-600 font-semibold underline underline-offset-2">Perbesar Gambar</strong></span>
                                                        </button>
                                                    </div>
                                                )}

                                                {/* Options List with Key & User Answer highlighting */}
                                                <div className="space-y-2.5">
                                                    {q.pilihan?.map((pil, pIdx) => {
                                                        const isUser = userChoice === pIdx;
                                                        const isKey = q.jawaban === pIdx;
                                                        const optScore = q.scores && Array.isArray(q.scores) ? q.scores[pIdx] : null;

                                                        let optionClass = 'border-slate-200 bg-slate-50/60 text-slate-700';
                                                        if (isKey && q.kategori !== 'KARIR') {
                                                            optionClass = 'border-emerald-500 bg-emerald-50/80 font-bold text-slate-900 ring-1 ring-emerald-500/30';
                                                        } else if (isUser && !isKey) {
                                                            optionClass = 'border-red-300 bg-red-50 text-red-950 font-semibold';
                                                        } else if (isUser && q.kategori === 'KARIR') {
                                                            optionClass = 'border-amber-400 bg-amber-50 text-amber-950 font-bold ring-1 ring-amber-400';
                                                        }

                                                        return (
                                                            <div
                                                                key={pIdx}
                                                                className={`p-3.5 rounded-xl border flex items-start gap-3 transition-all ${optionClass}`}
                                                            >
                                                                <span className={`w-5 h-5 rounded-md flex items-center justify-center text-xs font-bold shrink-0 ${
                                                                    isKey ? 'bg-emerald-700 text-white' : isUser ? 'bg-red-600 text-white' : 'bg-slate-200 text-slate-600'
                                                                }`}>
                                                                    {String.fromCharCode(65 + pIdx)}
                                                                </span>
                                                                <span className="flex-1 leading-relaxed text-xs">{pil}</span>
                                                                
                                                                {/* Badges on right side */}
                                                                <div className="flex items-center gap-2 shrink-0">
                                                                    {optScore !== null && (
                                                                        <span className="text-[10px] px-2 py-0.5 rounded bg-slate-200/80 font-mono text-slate-700 font-bold">
                                                                            Skor: {optScore}
                                                                        </span>
                                                                    )}
                                                                    {isKey && q.kategori !== 'KARIR' && (
                                                                        <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100/90 px-2.5 py-0.5 rounded-md">
                                                                            Kunci Resmi
                                                                        </span>
                                                                    )}
                                                                    {isUser && !isKey && (
                                                                        <span className="text-[11px] font-bold text-red-700 bg-red-100 px-2.5 py-0.5 rounded-md">
                                                                            Pilihan Anda
                                                                        </span>
                                                                    )}
                                                                    {isUser && isKey && (
                                                                        <span className="text-[11px] font-bold text-emerald-900 bg-emerald-200 px-2.5 py-0.5 rounded-md">
                                                                            Pilihan Tepat
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>

                                                {/* Official Explanation Box */}
                                                <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/50 space-y-1.5">
                                                    <div className="font-bold text-emerald-950 flex items-center gap-1.5 text-xs">
                                                        <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
                                                        <span>Rasionalisasi Penilaian Standar BKN / MenPAN-RB:</span>
                                                    </div>
                                                    <p className="text-slate-800 text-xs leading-relaxed">
                                                        {q.pembahasan || 'Mengacu pada indikator kompetensi dasar standar pemetaan talenta dan profil aparatur sipil negara.'}
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

            </div>

            {/* =========================================================================
                MODAL 1: PERINGATAN PEMBATALAN TES (ANTI-CHEAT / EXIT LOCK)
               ========================================================================= */}
            {showExitModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 backdrop-blur-md p-4 exit-modal animate-in fade-in duration-200">
                    <div className="max-w-md w-full rounded-2xl bg-white border border-slate-200/90 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                        <MacWindowControls title="Peringatan Ujian Berlangsung" badge="ANTI-CHEAT / EXIT LOCK" />
                        <div className="p-6 sm:p-7 text-center space-y-4">
                            <div className="w-14 h-14 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto ring-8 ring-rose-50/60 shadow-xs">
                                <AlertTriangle className="w-7 h-7" />
                            </div>
                            <div className="space-y-1.5">
                                <h3 className="text-lg font-black text-slate-900 tracking-tight">
                                    Keluar atau Batalkan Tes?
                                </h3>
                                <p className="text-xs text-slate-600 leading-relaxed">
                                    Simulasi ujian sedang aktif berjalan. Anda telah menjawab <strong>{answeredCount} butir jawaban</strong>. Tentukan tindakan yang ingin Anda ambil:
                                </p>
                            </div>

                            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-left text-xs space-y-1">
                                <div className="flex justify-between items-center text-slate-500">
                                    <span>Paket Ujian:</span>
                                    <span className="font-bold text-slate-800">{selectedPackage?.title}</span>
                                </div>
                                <div className="flex justify-between items-center text-slate-500">
                                    <span>Subtes Berjalan:</span>
                                    <span className="font-medium text-emerald-700">{currentSubtest?.title}</span>
                                </div>
                            </div>

                            <div className="flex flex-col gap-2 pt-2">
                                <button
                                    onClick={() => {
                                        setShowExitModal(false);
                                        setPendingUrl(null);
                                    }}
                                    className="w-full py-3 rounded-xl bg-emerald-700 text-white font-bold text-xs hover:bg-emerald-800 transition-all cursor-pointer shadow-md"
                                >
                                    Lanjutkan Pengerjaan Ujian
                                </button>
                                <button
                                    onClick={handleSaveAndPauseCurrentTest}
                                    className="w-full py-2.5 rounded-xl border border-amber-300 bg-amber-50 text-amber-900 font-bold text-xs hover:bg-amber-100 transition-colors cursor-pointer shadow-xs flex items-center justify-center gap-1.5"
                                    title="Simpan progres pengerjaan dan keluar untuk dilanjutkan nanti"
                                >
                                    <BookmarkCheck className="w-4 h-4 text-amber-700" />
                                    <span>Selesaikan & Simpan Progres (Lanjutkan Nanti)</span>
                                </button>
                                <button
                                    onClick={confirmCancelTest}
                                    className="w-full py-2 rounded-xl text-rose-600 hover:text-rose-700 hover:bg-rose-50 font-bold text-xs transition-colors cursor-pointer"
                                    title="Batalkan tanpa menyimpan progres"
                                >
                                    Batalkan Tes & Hapus Jawaban
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* =========================================================================
                MODAL: KONFIRMASI PENYELESAIAN SUB-TES (JIKA ADA SOAL BELUM DIJAWAB)
               ========================================================================= */}
            {showSubtestFinishModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 backdrop-blur-md p-4 animate-in fade-in duration-200">
                    <div className="max-w-lg w-full rounded-2xl bg-white border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                        <MacWindowControls title="Konfirmasi Selesai Sub-tes" badge={`SUB-TES ${currentSubtestIndex + 1}`} />
                        <div className="p-6 space-y-4">
                            <div className="flex items-start gap-3.5">
                                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                                    <AlertTriangle className="w-5 h-5" />
                                </div>
                                <div className="space-y-1">
                                    <h3 className="text-sm sm:text-base font-black text-slate-900">
                                        Anda Masih Berada di Soal ke-{currentQuestionInSubtest + 1}
                                    </h3>
                                    <p className="text-xs text-slate-600 leading-relaxed">
                                        Sub-tes <strong>{currentSubtest?.title}</strong> memiliki {currentSubtestQuestions.length} butir soal. Anda baru menjawab <strong>{currentSubtestAnsweredCount} butir</strong> ({currentSubtestQuestions.length - currentSubtestAnsweredCount} butir belum dijawab).
                                    </p>
                                </div>
                            </div>

                            <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200/80 text-[11px] text-amber-900 leading-relaxed space-y-1">
                                <p className="font-bold">Apa yang ingin Anda lakukan?</p>
                                <p className="text-amber-800">
                                    Jika Anda ingin berhenti dan melanjutkan sisa soal sub-tes ini nanti, pilih <strong>Selesaikan & Simpan Progres</strong>. Anda berhak melanjutkan soal terakhir yang dikerjakan tanpa langsung melompat ke sub-tes berikutnya.
                                </p>
                            </div>

                            <div className="space-y-2 pt-1">
                                <button
                                    onClick={handleSaveAndPauseCurrentTest}
                                    className="w-full py-3 px-4 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs transition-colors cursor-pointer shadow-xs flex items-center justify-center gap-2"
                                >
                                    <BookmarkCheck className="w-4 h-4" />
                                    <span>Selesaikan & Simpan Progres (Lanjutkan Nanti)</span>
                                </button>
                                
                                <div className="flex flex-col sm:flex-row gap-2">
                                    <button
                                        onClick={() => setShowSubtestFinishModal(false)}
                                        className="flex-1 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-100 transition-colors cursor-pointer"
                                    >
                                        Kembali Mengerjakan
                                    </button>
                                    <button
                                        onClick={handleForceFinishSubtest}
                                        className="flex-1 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors cursor-pointer"
                                        title="Tutup sub-tes ini dan lanjut ke jeda istirahat"
                                    >
                                        Lewati & Masuk Break Sub-tes
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* =========================================================================
                MODAL 2: KONFIRMASI PENGUMPULAN JAWABAN (FINISH TEST)
               ========================================================================= */}
            {showSubmitModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 backdrop-blur-md p-4 animate-in fade-in duration-200">
                    <div className="max-w-md w-full rounded-2xl bg-white border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                        <MacWindowControls title="Konfirmasi Selesai Ujian" badge="PENGUMPULAN" />
                        <div className="p-6 text-center space-y-4">
                            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                                <CheckCircle2 className="w-6 h-6" />
                            </div>
                            <div className="space-y-1.5">
                                <h3 className="text-base font-black text-slate-900">
                                    Selesaikan & Kumpulkan Jawaban?
                                </h3>
                                <p className="text-xs text-slate-600 leading-relaxed">
                                    Anda telah menjawab <strong>{answeredCount} dari {activeQuestions.length} butir soal</strong> ({unansweredCount} belum dijawab). 
                                    Setelah dikumpulkan, sistem akan langsung memproses skor dan membuka seluruh pembahasan soal.
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
                                <button
                                    onClick={() => setShowSubmitModal(false)}
                                    className="flex-1 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-50 transition-colors cursor-pointer"
                                >
                                    Periksa Kembali
                                </button>
                                <button
                                    onClick={finishTest}
                                    className="flex-1 py-2.5 rounded-xl bg-emerald-800 text-white font-bold text-xs hover:bg-emerald-900 transition-colors cursor-pointer shadow-md"
                                >
                                    Kumpulkan Sekarang
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* =========================================================================
                MODAL 3: LIGHTBOX PREVIEW GAMBAR SOAL FIGURAL (TANPA TAB BARU)
               ========================================================================= */}
            {previewImage && (
                <div 
                    className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-4 animate-in fade-in duration-200"
                    onClick={() => setPreviewImage(null)}
                >
                    <div 
                        className="relative bg-white rounded-2xl shadow-2xl max-w-4xl max-h-[92vh] w-full flex flex-col overflow-hidden border border-slate-200"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between px-5 py-3 border-b border-slate-200 bg-slate-50">
                            <div className="flex items-center gap-2 text-slate-800">
                                <Layers className="w-4 h-4 text-blue-600" />
                                <span className="font-bold text-sm">Bagan Visual Soal Figural</span>
                                <span className="text-xs text-slate-500 font-normal hidden sm:inline">(Resolusi Penuh)</span>
                            </div>
                            <button
                                type="button"
                                onClick={() => setPreviewImage(null)}
                                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors cursor-pointer"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="p-4 sm:p-6 overflow-auto flex items-center justify-center bg-slate-100/70 max-h-[calc(92vh-100px)]">
                            <img
                                src={previewImage}
                                alt="Bagan Soal Figural"
                                className="max-h-[75vh] w-auto max-w-full object-contain rounded-xl shadow-md border border-slate-200 bg-white"
                            />
                        </div>
                        <div className="px-5 py-2.5 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
                            <span>Tekan <kbd className="px-1.5 py-0.5 rounded bg-slate-200 text-slate-700 font-mono text-[10px]">ESC</kbd> atau klik di luar untuk menutup</span>
                            <button
                                type="button"
                                onClick={() => setPreviewImage(null)}
                                className="px-3 py-1 rounded-lg bg-slate-900 text-white font-medium text-xs hover:bg-slate-800 transition-colors cursor-pointer"
                            >
                                Tutup
                            </button>
                        </div>
                    </div>
                </div>
            )}

            
            {/* Modal Peringatan Paket Sudah Terkunci */}
            {lockedPackageAlert && (
                <ConfirmModal
                    isOpen={Boolean(lockedPackageAlert)}
                    onClose={() => setLockedPackageAlert(null)}
                    isAlertOnly={true}
                    variant="warning"
                    title="Paket Asesmen Terkunci"
                    windowTitle="Pemberitahuan Sistem CAT"
                    badgeText="SUDAH SELESAI"
                    confirmText="Saya Mengerti"
                    description={
                        <span>
                            Paket <strong>"{lockedPackageAlert}"</strong> sudah pernah Anda selesaikan sebelumnya dan saat ini statusnya terkunci untuk mencegah duplikasi pengerjaan.
                        </span>
                    }
                    details={
                        <div className="space-y-1 text-xs">
                            <p className="font-bold text-amber-900">Ingin Mengulang Tes?</p>
                            <p className="text-amber-800 text-[11px] leading-relaxed">
                                Silakan gunakan tombol <span className="font-bold text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded border border-rose-200">Reset Riwayat</span> pada kartu paket ujian ini untuk mengosongkan progres dan membuka kunci kembali.
                            </p>
                        </div>
                    }
                />
            )}

            {/* Modal Konfirmasi Hapus & Reset Riwayat Paket */}
            {packageToReset && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-xs animate-in fade-in duration-200">
                    <div className="max-w-md w-full rounded-2xl border border-slate-200 bg-white shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                        <MacWindowControls title="Konfirmasi Reset Riwayat Tes" badge="PERINGATAN" />
                        <div className="p-6 space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                                    <AlertTriangle className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-base text-slate-900">
                                        Hapus Riwayat & Buka Kunci?
                                    </h4>
                                    <p className="text-xs text-slate-500">
                                        Tindakan ini akan mereset progress tes Anda.
                                    </p>
                                </div>
                            </div>

                            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1.5">
                                <div className="text-[11px] uppercase tracking-wider font-bold text-slate-400">Paket yang akan direset:</div>
                                <div className="font-bold text-slate-900">{packageToReset.title}</div>
                                <div className="text-slate-500 text-[11px]">
                                    Progress bar akan kembali ke <span className="font-bold text-slate-800">0%</span> dan modul ujian ini akan terbuka kembali sehingga Anda dapat melakukan tes ulang.
                                </div>
                            </div>

                            <div className="flex items-center justify-end gap-2.5 pt-2">
                                <button
                                    type="button"
                                    disabled={isResetting}
                                    onClick={() => setPackageToReset(null)}
                                    className="px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
                                >
                                    Batal
                                </button>
                                <button
                                    type="button"
                                    disabled={isResetting}
                                    onClick={handleConfirmReset}
                                    className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
                                >
                                    {isResetting ? (
                                        <span>Mereset...</span>
                                    ) : (
                                        <>
                                            <Trash2 className="w-3.5 h-3.5" />
                                            <span>Ya, Hapus & Buka Kunci</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}
