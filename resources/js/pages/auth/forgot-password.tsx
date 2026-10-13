import { Form, Head } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { email } from '@/routes/password';

export default function ForgotPassword({ status }: { status?: string }) {
    return (
        <>
            <Head title="Lupa Kata Sandi — ProASN" />

            {status && (
                <div className="mb-4 text-center text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 p-3 rounded-xl">
                    {status}
                </div>
            )}

            <div className="space-y-6">
                <Form {...email.form()}>
                    {({ processing, errors }) => (
                        <>
                            <div className="grid gap-2">
                                <Label htmlFor="email" className="text-xs font-semibold text-slate-700">
                                    Alamat Email Terdaftar
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    autoFocus
                                    placeholder="nama@instansi.go.id"
                                    className="bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus-visible:ring-emerald-700 h-10 rounded-xl"
                                />
                                <InputError message={errors.email} />
                            </div>

                            <div className="my-6 flex items-center justify-start">
                                <Button
                                    className="w-full h-11 rounded-xl bg-emerald-800 text-white font-bold text-sm hover:bg-emerald-900 transition-all shadow-md"
                                    disabled={processing}
                                >
                                    {processing && (
                                        <LoaderCircle className="h-4 w-4 animate-spin text-white" />
                                    )}
                                    Kirim Tautan Pemulihan Kata Sandi
                                </Button>
                            </div>
                        </>
                    )}
                </Form>

                <div className="text-center text-xs text-slate-600">
                    Ingat kata sandi akun Anda?{' '}
                    <TextLink href="/login" className="font-semibold text-emerald-800 hover:underline">
                        Masuk kembali
                    </TextLink>
                </div>
            </div>
        </>
    );
}

ForgotPassword.layout = {
    title: 'Lupa Kata Sandi',
    description: 'Masukkan email kepegawaian Anda untuk menerima tautan pemulihan kata sandi portal ProASN.',
};
