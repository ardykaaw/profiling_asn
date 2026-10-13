// Components
import { Form, Head } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { login } from '@/routes';
import { email } from '@/routes/password';

export default function ForgotPassword({ status }: { status?: string }) {
    return (
        <>
            <Head title="Lupa Kata Sandi" />

            {status && (
                <div className="mb-4 p-3 rounded-xl bg-[#10B981]/15 border border-[#10B981]/30 text-center text-xs font-medium text-[#10B981]">
                    {status}
                </div>
            )}

            <div className="space-y-5">
                <Form {...email.form()}>
                    {({ processing, errors }) => (
                        <>
                            <div className="grid gap-2">
                                <Label htmlFor="email" className="text-xs font-semibold text-[#CBD5E1]">
                                    Alamat Email Terdaftar
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    autoComplete="off"
                                    autoFocus
                                    placeholder="nama@email.com"
                                    className="bg-[#0B1023]/80 border-[#1E2C4A] text-[#EDF0FF] placeholder:text-[#8FA0C0]/50 focus-visible:ring-[#F0A500] h-10 rounded-xl"
                                />

                                <InputError message={errors.email} />
                            </div>

                            <div className="my-5 flex items-center justify-start">
                                <Button
                                    className="w-full h-11 rounded-xl bg-[#F0A500] text-[#0B1023] font-bold text-sm hover:bg-[#FFD166] transition-all shadow-[0_4px_20px_rgba(240,165,0,0.2)]"
                                    disabled={processing}
                                    data-test="email-password-reset-link-button"
                                >
                                    {processing && (
                                        <LoaderCircle className="h-4 w-4 animate-spin text-[#0B1023]" />
                                    )}
                                    Kirim Tautan Reset Sandi
                                </Button>
                            </div>
                        </>
                    )}
                </Form>

                <div className="text-center text-xs text-[#8FA0C0]">
                    <span>Sudah ingat kata sandi? </span>
                    <TextLink href={login()} className="font-semibold text-[#F0A500] hover:underline">
                        Kembali masuk
                    </TextLink>
                </div>
            </div>
        </>
    );
}

ForgotPassword.layout = {
    title: 'Lupa Kata Sandi?',
    description: 'Masukkan email akun Anda. Kami akan mengirimkan tautan untuk membuat kata sandi baru.',
};

