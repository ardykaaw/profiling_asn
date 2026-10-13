import { Form, Head } from '@inertiajs/react';
import { ExternalLink, ShieldCheck, Sparkles } from 'lucide-react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { store } from '@/routes/register';

type Props = {
    passwordRules: string;
};

export default function Register({ passwordRules }: Props) {
    return (
        <>
            <Head title="Pendaftaran Akun — ProASN" />

            {/* Lynk.id Sync Notice */}
            <div className="mb-4 p-3.5 rounded-xl border border-emerald-200 bg-emerald-50/70 text-xs flex items-start gap-3">
                <Sparkles className="size-4 shrink-0 text-emerald-600 mt-0.5" />
                <div>
                    <p className="font-semibold text-emerald-950">Aktivasi Akun Asesmen ASN</p>
                    <p className="text-[11px] text-emerald-800 mt-0.5 leading-normal">
                        Pastikan mengisi <strong className="text-emerald-950">Nama Lengkap</strong> dan <strong className="text-emerald-950">Email</strong> resmi Anda untuk sinkronisasi bukti akses dan pencetakan rapor profil kompetensi.
                    </p>
                </div>
            </div>

            <Form
                {...store.form()}
                resetOnSuccess={['password', 'password_confirmation']}
                disableWhileProcessing
                className="flex flex-col gap-4"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-3.5">
                            <div className="grid gap-1.5">
                                <Label htmlFor="name" className="text-xs font-semibold text-slate-700">
                                    Nama Lengkap & Gelar <span className="text-emerald-600">*</span>
                                </Label>
                                <Input
                                    id="name"
                                    type="text"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="name"
                                    name="name"
                                    placeholder="Contoh: Budi Santoso, S.STP"
                                    className="bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus-visible:ring-emerald-600 h-10 rounded-xl"
                                />
                                <InputError message={errors.name} />
                            </div>

                            <div className="grid gap-1.5">
                                <Label htmlFor="email" className="text-xs font-semibold text-slate-700">
                                    Alamat Email Aktif <span className="text-emerald-600">*</span>
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    required
                                    tabIndex={2}
                                    autoComplete="email"
                                    name="email"
                                    placeholder="nama@instansi.go.id"
                                    className="bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus-visible:ring-emerald-600 h-10 rounded-xl"
                                />
                                <InputError message={errors.email} />
                            </div>

                            <div className="grid gap-1.5">
                                <Label htmlFor="phone" className="text-xs font-semibold text-slate-700">
                                    Nomor WhatsApp / HP
                                </Label>
                                <Input
                                    id="phone"
                                    type="tel"
                                    tabIndex={3}
                                    autoComplete="tel"
                                    name="phone"
                                    placeholder="081234567890"
                                    className="bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus-visible:ring-emerald-600 h-10 rounded-xl"
                                />
                                <InputError message={errors.phone} />
                            </div>

                            <div className="grid gap-1.5">
                                <Label htmlFor="password" className="text-xs font-semibold text-slate-700">
                                    Kata Sandi <span className="text-emerald-600">*</span>
                                </Label>
                                <PasswordInput
                                    id="password"
                                    required
                                    tabIndex={4}
                                    autoComplete="new-password"
                                    name="password"
                                    placeholder="Minimal 8 karakter"
                                    className="bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus-visible:ring-emerald-600 h-10 rounded-xl"
                                />
                                <InputError message={errors.password} />
                            </div>

                            <div className="grid gap-1.5">
                                <Label htmlFor="password_confirmation" className="text-xs font-semibold text-slate-700">
                                    Konfirmasi Kata Sandi <span className="text-emerald-600">*</span>
                                </Label>
                                <PasswordInput
                                    id="password_confirmation"
                                    required
                                    tabIndex={5}
                                    autoComplete="new-password"
                                    name="password_confirmation"
                                    placeholder="Ulangi kata sandi"
                                    className="bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus-visible:ring-emerald-600 h-10 rounded-xl"
                                />
                                <InputError message={errors.password_confirmation} />
                            </div>

                            <Button
                                type="submit"
                                className="mt-2 w-full h-11 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm transition-all shadow-md"
                                tabIndex={6}
                                disabled={processing}
                            >
                                {processing && <Spinner className="text-white" />}
                                Daftarkan Akun Saya
                            </Button>
                        </div>

                        <div className="text-center text-xs text-slate-600 mt-2">
                            Sudah memiliki akun ProASN?{' '}
                            <a href="/login" tabIndex={7} className="font-semibold text-emerald-700 hover:underline">
                                Masuk ke akun
                            </a>
                        </div>
                    </>
                )}
            </Form>
        </>
    );
}

Register.layout = {
    title: 'Daftar Akun Baru ProASN',
    description: 'Akses instan modul uji kompetensi dan simulasi asesmen manajemen talenta.',
};
