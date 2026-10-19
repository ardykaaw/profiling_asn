import { Form, Head } from '@inertiajs/react';
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

type Props = {
    status?: string;
    canResetPassword: boolean;
};

export default function Login({ status, canResetPassword }: Props) {
    return (
        <>
            <Head title="Masuk ke Akun — ProASN" />

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
                                    placeholder="nama@email.com"
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
                                className="mt-2 w-full h-11 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm transition-all shadow-md cursor-pointer"
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
