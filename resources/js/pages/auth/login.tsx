import { Form, Head } from '@inertiajs/react';
import { useState } from 'react';
import { Sparkles, ShieldCheck } from 'lucide-react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { store } from '@/routes/login';
import { request } from '@/routes/password';
import PasskeyVerify from '@/components/passkey-verify';

type Props = {
    status?: string;
    canResetPassword: boolean;
};

export default function Login({ status, canResetPassword }: Props) {
    const [demoEmail, setDemoEmail] = useState('');
    const [demoPassword, setDemoPassword] = useState('');

    const fillAdmin = () => {
        setDemoEmail('admin@example.com');
        setDemoPassword('password');
    };

    const fillUser = () => {
        setDemoEmail('user@example.com');
        setDemoPassword('password');
    };

    return (
        <>
            <Head title="Masuk ke Akun — ProASN" />

            <PasskeyVerify />

            {/* Quick Demo Credentials Banner */}
            <div className="mb-6 p-3 rounded-xl border border-emerald-200 bg-emerald-50/70 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs">
                <div className="flex items-center gap-2 text-emerald-800 font-semibold">
                    <Sparkles className="size-4 shrink-0 text-emerald-600" />
                    <span>Akun Demo Cepat:</span>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={fillAdmin}
                        className="px-2.5 py-1 rounded-lg bg-emerald-700 text-white font-bold text-[11px] hover:bg-emerald-800 transition-colors shadow-xs"
                        title="Login sebagai Administrator"
                    >
                        👑 Admin
                    </button>
                    <button
                        type="button"
                        onClick={fillUser}
                        className="px-2.5 py-1 rounded-lg border border-emerald-300 bg-white text-emerald-800 font-bold text-[11px] hover:bg-emerald-50 transition-colors shadow-xs"
                        title="Login sebagai Pegawai / Peserta"
                    >
                        👤 Peserta ASN
                    </button>
                </div>
            </div>

            <Form
                {...store.form()}
                resetOnSuccess={['password']}
                className="flex flex-col gap-5"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="email" className="text-xs font-semibold text-slate-700">
                                    Alamat Email
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="email"
                                    defaultValue={demoEmail}
                                    placeholder="nama@instansi.go.id"
                                    className="bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus-visible:ring-emerald-600 h-10 rounded-xl"
                                />
                                <InputError message={errors.email} />
                            </div>

                            <div className="grid gap-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="password" className="text-xs font-semibold text-slate-700">
                                        Kata Sandi
                                    </Label>
                                    {canResetPassword && (
                                        <TextLink
                                            href="/forgot-password"
                                            className="text-xs text-slate-500 hover:text-emerald-700 transition-colors"
                                            tabIndex={5}
                                        >
                                            Lupa kata sandi?
                                        </TextLink>
                                    )}
                                </div>
                                <PasswordInput
                                    id="password"
                                    name="password"
                                    required
                                    tabIndex={2}
                                    autoComplete="current-password"
                                    defaultValue={demoPassword}
                                    placeholder="••••••••"
                                    className="bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus-visible:ring-emerald-600 h-10 rounded-xl"
                                />
                                <InputError message={errors.password} />
                            </div>

                            <div className="flex items-center space-x-2.5">
                                <Checkbox
                                    id="remember"
                                    name="remember"
                                    tabIndex={3}
                                    className="border-slate-300 data-[state=checked]:bg-emerald-700 data-[state=checked]:text-white"
                                />
                                <Label htmlFor="remember" className="text-xs text-slate-600 font-normal cursor-pointer">
                                    Ingat saya di perangkat ini
                                </Label>
                            </div>

                            <Button
                                type="submit"
                                className="mt-2 w-full h-11 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm transition-all shadow-md"
                                tabIndex={4}
                                disabled={processing}
                            >
                                {processing && <Spinner className="text-white" />}
                                Masuk ke Portal
                            </Button>
                        </div>

                        <div className="text-center text-xs text-slate-600 mt-2">
                            Belum memiliki akun ProASN?{' '}
                            <a href="/register" tabIndex={5} className="font-semibold text-emerald-700 hover:underline">
                                Daftar akun sekarang
                            </a>
                        </div>
                    </>
                )}
            </Form>

            {status && (
                <div className="mt-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-center text-xs font-medium text-emerald-800">
                    {status}
                </div>
            )}
        </>
    );
}

Login.layout = {
    title: 'Masuk ke Portal ProASN',
    description: 'Akses simulasi CAT 4 dimensi kompetensi dan modul persiapan uji asesmen BKN.',
};
