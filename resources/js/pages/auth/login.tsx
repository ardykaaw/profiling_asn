import { useState } from 'react';
import { Form, Head } from '@inertiajs/react';
import { Sparkles } from 'lucide-react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { register } from '@/routes';
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
            <Head title="Masuk ke Akun" />

            <PasskeyVerify />

            {/* Quick Demo Credentials Banner */}
            <div className="mb-6 p-3 rounded-xl border border-[#F0A500]/30 bg-[#F0A500]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs">
                <div className="flex items-center gap-2 text-[#F0A500]">
                    <Sparkles className="size-4 shrink-0" />
                    <span className="font-mono text-[11px] text-[#EDF0FF]">
                        Pilih Akun Demo Cepat:
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={fillAdmin}
                        className="px-2.5 py-1 rounded-md bg-[#F0A500] text-[#0B1023] font-bold text-[11px] hover:bg-[#FFD166] transition-colors"
                        title="Login sebagai Administrator (Upload materi & buat soal)"
                    >
                        👑 Admin
                    </button>
                    <button
                        type="button"
                        onClick={fillUser}
                        className="px-2.5 py-1 rounded-md border border-[#F0A500]/40 bg-[#131B2E] text-[#EDF0FF] font-bold text-[11px] hover:bg-accent transition-colors"
                        title="Login sebagai Peserta (Try Out CAT & Belajar Materi)"
                    >
                        👤 Peserta
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
                        <div className="grid gap-5">
                            <div className="grid gap-2">
                                <Label htmlFor="email" className="text-xs font-semibold text-[#CBD5E1]">
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
                                    placeholder="nama@email.com"
                                    className="bg-[#0B1023]/80 border-[#1E2C4A] text-[#EDF0FF] placeholder:text-[#8FA0C0]/50 focus-visible:ring-[#F0A500] h-10 rounded-xl"
                                />
                                <InputError message={errors.email} />
                            </div>

                            <div className="grid gap-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="password" className="text-xs font-semibold text-[#CBD5E1]">
                                        Kata Sandi
                                    </Label>
                                    {canResetPassword && (
                                        <TextLink
                                            href={request()}
                                            className="text-xs text-[#8FA0C0] hover:text-[#F0A500] transition-colors"
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
                                    className="bg-[#0B1023]/80 border-[#1E2C4A] text-[#EDF0FF] placeholder:text-[#8FA0C0]/50 focus-visible:ring-[#F0A500] h-10 rounded-xl"
                                />
                                <InputError message={errors.password} />
                            </div>

                            <div className="flex items-center space-x-2.5">
                                <Checkbox
                                    id="remember"
                                    name="remember"
                                    tabIndex={3}
                                    className="border-[#1E2C4A] data-[state=checked]:bg-[#F0A500] data-[state=checked]:text-[#0B1023]"
                                />
                                <Label htmlFor="remember" className="text-xs text-[#8FA0C0] font-normal cursor-pointer">
                                    Ingat saya di perangkat ini
                                </Label>
                            </div>

                            <Button
                                type="submit"
                                className="mt-2 w-full h-11 rounded-xl bg-[#F0A500] text-[#0B1023] font-bold text-sm hover:bg-[#FFD166] transition-all shadow-[0_4px_20px_rgba(240,165,0,0.2)]"
                                tabIndex={4}
                                disabled={processing}
                                data-test="login-button"
                            >
                                {processing && <Spinner className="text-[#0B1023]" />}
                                Masuk ke Akun
                            </Button>
                        </div>

                        <div className="text-center text-xs text-[#8FA0C0] mt-2">
                            Belum punya akun SiapCPNS?{' '}
                            <TextLink href={register()} tabIndex={5} className="font-semibold text-[#F0A500] hover:underline">
                                Daftar sekarang
                            </TextLink>
                        </div>
                    </>
                )}
            </Form>

            {status && (
                <div className="mt-4 p-3 rounded-xl bg-[#10B981]/15 border border-[#10B981]/30 text-center text-xs font-medium text-[#10B981]">
                    {status}
                </div>
            )}
        </>
    );
}

Login.layout = {
    title: 'Masuk ke SiapCPNS',
    description: 'Akses bank soal simulasi CAT BKN terlengkap dan materi belajar intensif.',
};

