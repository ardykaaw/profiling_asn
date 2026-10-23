<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Question;
use App\Models\TryoutSession;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TryoutController extends Controller
{
    /**
     * Subtest metadata and diagnostic learning recommendations.
     */
    private const SUBTEST_META = [
        "potensi-figural" => [
            "title" => "Penalaran Figural (Spasial & Bentuk)",
            "shortTitle" => "Figural",
            "sessionName" => "Tes Potensi Kognitif",
            "category" => "POTENSI",
            "rec_high" => "Daya visualisasi dan rotasi 3D sangat baik, pertahankan konsistensi konsentrasi pola ruang.",
            "rec_mid" => "Pemahaman figural cukup baik, disarankan memperbanyak latihan penalaran rotasi kubus 3D & analogi gambar kompleks.",
            "rec_low" => "Perlu latihan intensif pada penalaran serial pola gambar, rotasi sudut, dan matriks visual spasial.",
        ],
        "potensi-numerik" => [
            "title" => "Penalaran Numerik (Perbandingan Angka)",
            "shortTitle" => "Numerik",
            "sessionName" => "Tes Potensi Kognitif",
            "category" => "POTENSI",
            "rec_high" => "Ketelitian dan komparasi angka berkecepatan tinggi sangat tajam dan akurat.",
            "rec_mid" => "Ketelitian numerik standar, disarankan melatih kecepatan perbandingan kuantitatif dan eliminasi cepat.",
            "rec_low" => "Perlu peningkatan fokus dan kecepatan hitung komparasi aljabar dasar, persentase, dan deret angka.",
        ],
        "potensi-kritis" => [
            "title" => "Berpikir Kritis & Problem Solving",
            "shortTitle" => "Berpikir Kritis",
            "sessionName" => "Tes Potensi Kognitif",
            "category" => "POTENSI",
            "rec_high" => "Logika analisis dan kemampuan evaluasi argumen kebijakan publik sangat matang.",
            "rec_mid" => "Kemampuan problem solving memadai, tingkatkan ketajaman analisis silogisme dan penarikan kesimpulan.",
            "rec_low" => "Perlu melatih daya nalar analitis, pemilahan premis mayor-minor, dan identifikasi bias argumen.",
        ],
        "potensi-belajar-cepat" => [
            "title" => "Kemampuan Belajar Cepat & Adaptasi",
            "shortTitle" => "Belajar Cepat",
            "sessionName" => "Tes Potensi Kognitif",
            "category" => "POTENSI",
            "rec_high" => "Daya adaptasi dan kecepatan sintesis data baru luar biasa unggul.",
            "rec_mid" => "Kemampuan belajar cepat sudah baik, biasakan merangkum instruksi rumit ke poin aksi terstruktur.",
            "rec_low" => "Perlu melatih teknik scanning informasi, pemetaan konsep baru, dan fleksibilitas pola pikir.",
        ],
        "potensi-kepribadian" => [
            "title" => "Integritas & Kepribadian ASN",
            "shortTitle" => "Kepribadian",
            "sessionName" => "Tes Potensi Kognitif",
            "category" => "POTENSI",
            "rec_high" => "Integritas, etos kerja, dan kematangan emosional sangat kokoh sesuai Core Values BerAKHLAK.",
            "rec_mid" => "Profil etika dan integritas baik, pertahankan komitmen dalam situasi kerja bertekanan tinggi.",
            "rec_low" => "Perlu penguatan konsistensi kedisiplinan diri, regulasi emosi, dan ketegasan integritas moral.",
        ],
        "manajerial-sjt" => [
            "title" => "Kompetensi Manajerial (SJT)",
            "shortTitle" => "Manajerial SJT",
            "sessionName" => "Manajerial & Sosio Kultural",
            "category" => "MANAJERIAL",
            "rec_high" => "Orientasi pelayanan, integritas, dan pengambilan keputusan manajerial sangat strategis.",
            "rec_mid" => "Kompetensi manajerial cukup memadai, perdalam pertimbangan solusi yang berorientasi hasil jangka panjang.",
            "rec_low" => "Perlu mempelajari panduan PermenPAN-RB 38/2017 tentang 8 kompetensi manajerial ASN dan etika pimpinan.",
        ],
        "manajerial-sosio" => [
            "title" => "Sosio-Kultural & Perekat Bangsa",
            "shortTitle" => "Sosio Kultural",
            "sessionName" => "Manajerial & Sosio Kultural",
            "category" => "MANAJERIAL",
            "rec_high" => "Toleransi, kepekaan sosial, dan peran sebagai perekat bangsa sangat menginspirasi.",
            "rec_mid" => "Sikap kebhinekaan baik, tingkatkan keterbukaan dialog dalam menghadapi perbedaan latar belakang.",
            "rec_low" => "Perlu meningkatkan kepekaan terhadap dinamika budaya, empati kerja tim, dan resolusi konflik sosial.",
        ],
        "digital-skill" => [
            "title" => "Digital Skill (Kecakapan Digital)",
            "shortTitle" => "Digital Skill",
            "sessionName" => "Literasi Digital",
            "category" => "DIGITAL",
            "rec_high" => "Cakap dalam pemanfaatan instrumen digital birokrasi, automasi kerja, dan sistem SPBE.",
            "rec_mid" => "Cakupan kecakapan digital memadai, eksplorasi tool kolaborasi dan analitik data perkantoran.",
            "rec_low" => "Perlu meningkatkan keterampilan dasar komputasi awan, aplikasi perkantoran terintegrasi, dan alur SPBE.",
        ],
        "digital-culture" => [
            "title" => "Digital Culture (Budaya Digital)",
            "shortTitle" => "Digital Culture",
            "sessionName" => "Literasi Digital",
            "category" => "DIGITAL",
            "rec_high" => "Menjunjung tinggi nilai Pancasila dan budaya kebangsaan di ruang digital.",
            "rec_mid" => "Budaya bermedia digital baik, aktif mendorong konten konstruktif kebangsaan di media sosial.",
            "rec_low" => "Perlu pemahaman lebih dalam terkait pilar digital culture, wawasan nusantara, dan kurasi informasi publik.",
        ],
        "digital-ethics" => [
            "title" => "Digital Ethics (Etika Digital)",
            "shortTitle" => "Digital Ethics",
            "sessionName" => "Literasi Digital",
            "category" => "DIGITAL",
            "rec_high" => "Etika komunikasi digital birokrasi sangat santun, profesional, dan berintegritas.",
            "rec_mid" => "Memahami tata krama siber, perhatikan netralitas ASN di media sosial dan kejelasan komunikasi kedinasan.",
            "rec_low" => "Perlu mempelajari regulasi kode etik ASN di ruang digital dan mitigasi risiko ujaran serta hoaks.",
        ],
        "digital-safety" => [
            "title" => "Digital Safety (Keamanan Siber)",
            "shortTitle" => "Digital Safety",
            "sessionName" => "Literasi Digital",
            "category" => "DIGITAL",
            "rec_high" => "Sadar keamanan siber, proteksi data pribadi, dan pencegahan insiden siber sangat mumpuni.",
            "rec_mid" => "Kewaspadaan siber baik, pastikan selalu menerapkan 2FA dan verifikasi tautan mencurigakan.",
            "rec_low" => "Perlu pelatihan proteksi data rahasia instansi, pencegahan phishing, dan manajemen kredensial aman.",
        ],
    ];

    /**
     * Helper to classify question into subtest identifier.
     */
    private function getQuestionSubtestId($q): string
    {
        $catCode = $q->category->code ?? "POTENSI";
        $sub = strtolower($q->sub_category ?? "");

        if ($catCode === "POTENSI") {
            if (str_contains($sub, "figural") || !empty($q->image_path)) return "potensi-figural";
            if (str_contains($sub, "numerik")) return "potensi-numerik";
            if (str_contains($sub, "kritis")) return "potensi-kritis";
            if (str_contains($sub, "belajar")) return "potensi-belajar-cepat";
            if (str_contains($sub, "kepribadian")) return "potensi-kepribadian";
            return "potensi-figural";
        }
        if ($catCode === "MANAJERIAL") {
            if (str_contains($sub, "sosio") || str_contains($sub, "cultural")) return "manajerial-sosio";
            return "manajerial-sjt";
        }
        if ($catCode === "DIGITAL") {
            if (str_contains($sub, "culture")) return "digital-culture";
            if (str_contains($sub, "ethics")) return "digital-ethics";
            if (str_contains($sub, "safety")) return "digital-safety";
            return "digital-skill";
        }
        if ($catCode === "KARIR") {
            if (str_contains($sub, "nilai")) return "karir-nilai";
            if (str_contains($sub, "aspirasi")) return "karir-aspirasi";
            if (str_contains($sub, "pengalaman")) return "karir-pengalaman";
            return "karir-minat";
        }
        return "potensi-figural";
    }

    public function index(Request $request): Response
    {
        $user = $request->user();

        // Get all active questions with categories
        $questions = Question::with("category")
            ->where("is_active", true)
            ->get()
            ->map(function ($q) {
                return [
                    "id" => $q->id,
                    "kategori" => $q->category->code ?? "POTENSI",
                    "category_name" => $q->category->name ?? "",
                    "subkategori" => $q->sub_category,
                    "soal" => $q->question,
                    "image_url" => $q->image_url,
                    "pilihan" => $q->options,
                    "jawaban" => $q->correct_answer,
                    "scores" => $q->scores,
                    "pembahasan" => $q->explanation,
                ];
            });

        // User sessions history (completed)
        $sessions = TryoutSession::where("user_id", $user->id)
            ->whereNotNull("completed_at")
            ->latest("completed_at")
            ->take(10)
            ->get();

        // Any in-progress saved session
        $inProgressSession = TryoutSession::where("user_id", $user->id)
            ->whereNull("completed_at")
            ->latest("updated_at")
            ->first();

        $categories = Category::orderBy("order")->get();

        $completedTitles = TryoutSession::where("user_id", $user->id)
            ->whereNotNull("completed_at")
            ->pluck("title")
            ->unique()
            ->values()
            ->all();

        return Inertia::render("tryout", [
            "dbQuestions" => $questions,
            "sessions" => $sessions,
            "inProgressSession" => $inProgressSession,
            "completedTitles" => $completedTitles,
            "categories" => $categories,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            "title" => "nullable|string",
            "answers" => "required|array", // key: question_id or index, value: option index (0-4)
            "time_spent" => "nullable|integer",
        ]);

        $user = $request->user();
        $answers = $validated["answers"];
        $title = $validated["title"] ?? "";

        // Determine package scope
        $targetCat = "SEMUA";
        if (str_contains($title, "Sesi 1") || str_contains($title, "Potensi")) {
            $targetCat = "POTENSI";
        } elseif (str_contains($title, "Sesi 2") || str_contains($title, "Manajerial")) {
            $targetCat = "MANAJERIAL";
        } elseif (str_contains($title, "Sesi 3") || str_contains($title, "Digital")) {
            $targetCat = "DIGITAL";
        } elseif (str_contains($title, "Sesi 4") || str_contains($title, "Karir")) {
            $targetCat = "KARIR";
        }

        $query = Question::with("category")->where("is_active", true);
        if ($targetCat !== "SEMUA") {
            $query->whereHas("category", function ($q) use ($targetCat) {
                $q->where("code", $targetCat);
            });
        }
        $questions = $query->get();

        $catScores = [
            "POTENSI" => 0,
            "MANAJERIAL" => 0,
            "DIGITAL" => 0,
        ];
        $catMax = [
            "POTENSI" => 0,
            "MANAJERIAL" => 0,
            "DIGITAL" => 0,
        ];

        // Subtests breakdown accumulator
        $subtestAccumulator = [];
        foreach (self::SUBTEST_META as $sId => $meta) {
            if ($targetCat === "SEMUA" || $meta["category"] === $targetCat) {
                $subtestAccumulator[$sId] = [
                    "id" => $sId,
                    "title" => $meta["title"],
                    "shortTitle" => $meta["shortTitle"],
                    "sessionName" => $meta["sessionName"],
                    "category" => $meta["category"],
                    "total_points" => 0,
                    "max_points" => 0,
                    "correct_count" => 0,
                    "question_count" => 0,
                ];
            }
        }

        // Tripatha Karir tally (Preferensi Karir tidak memakai skor numerik)
        $karirTally = [
            "STRUKTURAL" => 0,
            "FUNGSIONAL" => 0,
            "OPERASIONAL" => 0,
        ];
        $karirCount = 0;

        foreach ($questions as $index => $q) {
            $catCode = $q->category->code ?? "POTENSI";
            $sId = $this->getQuestionSubtestId($q);

            $selected = $answers[$q->id] ?? ($answers[$index] ?? null);

            if ($catCode === "KARIR") {
                if ($selected !== null) {
                    $selected = (int) $selected;
                    $karirCount++;
                    // Map option index: 0 => STRUKTURAL, 1 => FUNGSIONAL, 2 => OPERASIONAL
                    if ($selected === 0) {
                        $karirTally["STRUKTURAL"]++;
                    } elseif ($selected === 1) {
                        $karirTally["FUNGSIONAL"]++;
                    } elseif ($selected === 2) {
                        $karirTally["OPERASIONAL"]++;
                    } else {
                        $karirTally["FUNGSIONAL"]++;
                    }
                }
            } else {
                if (!isset($catScores[$catCode])) {
                    $catScores[$catCode] = 0;
                    $catMax[$catCode] = 0;
                }

                $catMax[$catCode] += 5; // standard base 5 points per question

                if (isset($subtestAccumulator[$sId])) {
                    $subtestAccumulator[$sId]["max_points"] += 5;
                    $subtestAccumulator[$sId]["question_count"] += 1;
                }

                if ($selected !== null) {
                    $selected = (int) $selected;
                    $earned = 0;

                    if (!empty($q->scores) && is_array($q->scores) && isset($q->scores[$selected])) {
                        $earned = (int) $q->scores[$selected];
                    } else {
                        if ($selected === (int) $q->correct_answer) {
                            $earned = 5;
                        }
                    }

                    $catScores[$catCode] += $earned;

                    if (isset($subtestAccumulator[$sId])) {
                        $subtestAccumulator[$sId]["total_points"] += $earned;
                        if ($earned === 5) {
                            $subtestAccumulator[$sId]["correct_count"] += 1;
                        }
                    }
                }
            }
        }

        // Calculate normalized scores (0 - 100) per category
        $normalizedScores = [];
        foreach (["POTENSI", "MANAJERIAL", "DIGITAL"] as $code) {
            $max = $catMax[$code] > 0 ? $catMax[$code] : 25;
            $normalizedScores[$code] = round(($catScores[$code] / $max) * 100);
        }

        // Calculate normalized score & diagnostic feedback per subtest (0 - 100)
        $subtestResults = [];
        foreach ($subtestAccumulator as $sId => $item) {
            $max = $item["max_points"] > 0 ? $item["max_points"] : 1;
            $score = round(($item["total_points"] / $max) * 100);

            $status = "Perlu Peningkatan";
            $badgeColor = "rose";
            $rec = self::SUBTEST_META[$sId]["rec_low"];

            if ($score >= 80) {
                $status = "Kuat / Sangat Menguasai";
                $badgeColor = "emerald";
                $rec = self::SUBTEST_META[$sId]["rec_high"];
            } elseif ($score >= 65) {
                $status = "Cukup / Standar Memenuhi";
                $badgeColor = "blue";
                $rec = self::SUBTEST_META[$sId]["rec_mid"];
            }

            $subtestResults[$sId] = [
                "id" => $sId,
                "title" => $item["title"],
                "shortTitle" => $item["shortTitle"],
                "sessionName" => $item["sessionName"],
                "category" => $item["category"],
                "score" => $score,
                "total_points" => $item["total_points"],
                "max_points" => $item["max_points"],
                "correct_count" => $item["correct_count"],
                "question_count" => $item["question_count"],
                "status" => $status,
                "badge_color" => $badgeColor,
                "recommendation" => $rec,
            ];
        }

        // Calculate Tripatha Career breakdown percentages
        $totalKarirVotes = max($karirCount, 1);
        $strukturalPct = round(($karirTally["STRUKTURAL"] / $totalKarirVotes) * 100);
        $fungsionalPct = round(($karirTally["FUNGSIONAL"] / $totalKarirVotes) * 100);
        $operasionalPct = round(($karirTally["OPERASIONAL"] / $totalKarirVotes) * 100);

        // Determine dominant career recommendation
        $dominant = "FUNGSIONAL";
        $maxVotes = $karirTally["FUNGSIONAL"];

        if ($karirTally["STRUKTURAL"] > $maxVotes) {
            $dominant = "STRUKTURAL";
            $maxVotes = $karirTally["STRUKTURAL"];
        }
        if ($karirTally["OPERASIONAL"] > $maxVotes) {
            $dominant = "OPERASIONAL";
        }

        $careerRecommendation = "Jalur Fungsional Keahlian & Riset Kebijakan";
        if ($dominant === "STRUKTURAL") {
            $careerRecommendation = "Jalur Kepemimpinan & Manajerial (Struktural / JPT)";
        } elseif ($dominant === "OPERASIONAL") {
            $careerRecommendation = "Jalur Pelayanan & Keterampilan Teknis (Operasional Prosedural)";
        }

        $careerBreakdown = [
            "dominant" => $dominant,
            "recommendation" => $careerRecommendation,
            "tally" => $karirTally,
            "percentages" => [
                "struktural" => $strukturalPct,
                "fungsional" => $fungsionalPct,
                "operasional" => $operasionalPct,
            ],
            "roles" => [
                "STRUKTURAL" => ["Pejabat Pimpinan Tinggi (JPT)", "Administrator Eselon III", "Pengawas Strategis"],
                "FUNGSIONAL" => ["Analis Kebijakan Ahli", "Perencana Ahli", "Pranata Komputer Ahli", "Peneliti Kebijakan"],
                "OPERASIONAL" => ["Pengelola Layanan Operasional", "Arsiparis", "Verifikator Keuangan", "Pranata Humas"],
            ],
        ];

        // 9 BOX SIMATA - PETA TALENTA ASN
        // Axis X: Potensial (Potensi Kognitif & Literasi Digital)
        $axisX = round(($normalizedScores["POTENSI"] * 0.5) + ($normalizedScores["DIGITAL"] * 0.5));
        // Axis Y: Kinerja (Manajerial & Sosio-Kultural)
        $axisY = $normalizedScores["MANAJERIAL"];

        $talentQuadrant = "Box 1: Kinerja Rendah Potensial Rendah";
        if ($axisY >= 80) {
            if ($axisX >= 80) {
                $talentQuadrant = "Box 9: Kinerja Tinggi Potensial Tinggi (Talenta Unggul)";
            } elseif ($axisX >= 60) {
                $talentQuadrant = "Box 7: Kinerja Tinggi Potensial Menengah";
            } else {
                $talentQuadrant = "Box 4: Kinerja Tinggi Potensial Rendah";
            }
        } elseif ($axisY >= 60) {
            if ($axisX >= 80) {
                $talentQuadrant = "Box 8: Kinerja Sesuai Potensial Tinggi";
            } elseif ($axisX >= 60) {
                $talentQuadrant = "Box 5: Kinerja Sesuai Potensial Menengah";
            } else {
                $talentQuadrant = "Box 2: Kinerja Sesuai Potensial Rendah";
            }
        } else {
            if ($axisX >= 80) {
                $talentQuadrant = "Box 6: Kinerja Rendah Potensial Tinggi";
            } elseif ($axisX >= 60) {
                $talentQuadrant = "Box 3: Kinerja Rendah Potensial Menengah";
            } else {
                $talentQuadrant = "Box 1: Kinerja Rendah Potensial Rendah";
            }
        }

        $competencyLevels = [
            "Tes Potensi Kognitif" => $normalizedScores["POTENSI"] >= 80 ? "Level 4 (Tinggi)" : ($normalizedScores["POTENSI"] >= 65 ? "Level 3 (Sedang)" : "Level 2 (Dasar)"),
            "Manajerial & Sosio-Kultural" => $normalizedScores["MANAJERIAL"] >= 80 ? "Level 4 (Mahir)" : ($normalizedScores["MANAJERIAL"] >= 65 ? "Level 3 (Mampu)" : "Level 2 (Dasar)"),
            "Literasi Digital ASN" => $normalizedScores["DIGITAL"] >= 80 ? "Level 4 (Mahir & Cakap SPBE)" : ($normalizedScores["DIGITAL"] >= 65 ? "Level 3 (Mampu)" : "Level 2 (Dasar)"),
            "Preferensi Karir Utama" => $careerRecommendation,
        ];

        // Overall Composite Score (Standar BKN / MyASN: Skor tertinggi 100)
        // Preferensi Karir tidak dimasukkan dalam pembobotan nilai (hanya pemetaan)
        if ($targetCat === "POTENSI") {
            $avgScore = $normalizedScores["POTENSI"];
        } elseif ($targetCat === "MANAJERIAL") {
            $avgScore = $normalizedScores["MANAJERIAL"];
        } elseif ($targetCat === "DIGITAL") {
            $avgScore = $normalizedScores["DIGITAL"];
        } elseif ($targetCat === "KARIR") {
            $avgScore = 0; // Preferensi Karir tidak memakai nilai
        } else {
            $avgScore = round(($normalizedScores["POTENSI"] + $normalizedScores["MANAJERIAL"] + $normalizedScores["DIGITAL"]) / 3);
        }

        $totalScore = $avgScore; // Maksimal skor 100

        // Clean up any in-progress draft for this package
        if (!empty($validated["title"])) {
            TryoutSession::where("user_id", $user->id)
                ->where("title", $validated["title"])
                ->whereNull("completed_at")
                ->delete();
        }

        $categoryScoresData = [
            "POTENSI" => $normalizedScores["POTENSI"],
            "MANAJERIAL" => $normalizedScores["MANAJERIAL"],
            "DIGITAL" => $normalizedScores["DIGITAL"],
            "subtests" => $subtestResults,
        ];

        $session = TryoutSession::create([
            "user_id" => $user->id,
            "title" => $validated["title"] ?? ("Simulasi Profiling 4 Subtes #" . (TryoutSession::where("user_id", $user->id)->count() + 1)),
            "twk_score" => $normalizedScores["POTENSI"],
            "tiu_score" => $normalizedScores["MANAJERIAL"],
            "tkp_score" => $normalizedScores["DIGITAL"],
            "total_score" => $totalScore,
            "category_scores" => $categoryScoresData,
            "competency_levels" => $competencyLevels,
            "talent_quadrant" => $talentQuadrant,
            "career_recommendation" => $careerRecommendation,
            "career_breakdown" => $careerBreakdown,
            "is_passed" => $targetCat === "KARIR" ? true : ($avgScore >= 70),
            "answers" => $answers,
            "time_spent_seconds" => $validated["time_spent"] ?? 3600,
            "completed_at" => now(),
        ]);

        return back()->with([
            "success" => "Hasil asesmen profiling dan pemetaan Tripatha Karir berhasil diproses!",
            "session" => $session,
        ]);
    }

    public function saveProgress(Request $request)
    {
        $validated = $request->validate([
            "package_id" => "required|string",
            "title" => "required|string",
            "answers" => "required|array",
            "current_subtest_index" => "required|integer",
            "current_question_index" => "nullable|integer",
            "total_subtests" => "required|integer",
            "subtest_title" => "nullable|string",
            "answered_count" => "nullable|integer",
            "time_spent" => "nullable|integer",
        ]);

        $user = $request->user();

        $session = TryoutSession::updateOrCreate(
            [
                "user_id" => $user->id,
                "title" => $validated["title"],
                "completed_at" => null,
            ],
            [
                "answers" => $validated["answers"],
                "time_spent_seconds" => $validated["time_spent"] ?? 0,
                "category_scores" => [
                    "in_progress" => true,
                    "package_id" => $validated["package_id"],
                    "current_subtest_index" => (int) $validated["current_subtest_index"],
                    "current_question_index" => (int) ($validated["current_question_index"] ?? 0),
                    "total_subtests" => (int) $validated["total_subtests"],
                    "subtest_title" => $validated["subtest_title"] ?? null,
                    "answered_count" => (int) ($validated["answered_count"] ?? count($validated["answers"])),
                ],
            ]
        );

        if ($request->wantsJson() && !$request->header("X-Inertia")) {
            return response()->json([
                "status" => "success",
                "session_id" => $session->id,
                "message" => "Progres subtes berhasil disimpan.",
            ]);
        }

        return redirect()->back();
    }

    public function destroy(Request $request, TryoutSession $tryout)
    {
        $user = $request->user();
        if ($tryout->user_id !== $user->id && !$user->isAdmin()) {
            abort(403, "Akses tidak diizinkan.");
        }

        $tryout->delete();

        return back()->with("success", "Riwayat pengerjaan tes berhasil dihapus. Modul sekarang dapat dikerjakan ulang.");
    }

    public function resetPackage(Request $request)
    {
        $validated = $request->validate([
            "title" => "required|string",
        ]);

        $user = $request->user();
        TryoutSession::where("user_id", $user->id)
            ->where(function ($q) use ($validated) {
                $q->where("title", $validated["title"])
                  ->orWhere("title", "like", "%" . $validated["title"] . "%");
            })
            ->delete();

        return back()->with("success", "Riwayat pengerjaan paket telah direset. Modul sekarang dapat dikerjakan ulang.");
    }
}
