export interface Question {
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

export interface SubtestItem {
    id: string;
    title: string;
    shortTitle: string;
    sessionName: string;
    category: string;
    description: string;
    durationMinutes?: number;
    questions: Question[];
}

export const packages = [
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

export const SUBTEST_METADATA: Record<string, { title: string; shortTitle: string; sessionName: string; category: string; description: string; durationMinutes: number }> = {
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

export const SUBTEST_DIAGNOSTICS: Record<string, { rec_high: string; rec_mid: string; rec_low: string }> = {
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

export const SUBTEST_ORDER = [
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

export const getQuestionSubtestId = (q: Question): string => {
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

export const buildSubtestsForPackage = (pkgCat: string, bank: Question[]): SubtestItem[] => {
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
