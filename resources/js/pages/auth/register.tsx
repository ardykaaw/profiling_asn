import { Form, Head } from '@inertiajs/react';
import { ExternalLink, ShieldCheck, Sparkles } from 'lucide-react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { login } from '@/routes';
import { store } from '@/routes/register';

type Props = {
    passwordRules: string;
};

export default function Register({ passwordRules }: Props) {
    return (
        <>
            <Head title="Aktivasi Akun — SiapCPNS" />

            {/* Lynk.id Sync Notice */}
            <div className="mb-2 p-3.5 rounded-xl border border-[#10B981]/30 bg-[#10B981]/10 text-xs flex items-start gap-3">
                <Sparkles className="size-4 shrink-0 text-[#10B981] mt-0.5" />
                <div>
                    <p className="font-semibold text-[#EDF0FF]">Aktivasi Pembelian Lynk.id</p>
                    <p className="text-[11px] text-[#94A3C4] mt-0.5 leading-normal">
                        Gunakan <strong className="text-[#EDF0FF]">Nama</strong> dan <strong className="text-[#EDF0FF]">Email</strong> yang sama dengan data saat checkout di etalase Lynk.id agar akun Anda langsung terverifikasi secara instan.
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
                                <Label htmlFor="name" className="text-xs font-semibold text-[#CBD5E1]">
                                    Nama Lengkap <span className="text-[#F0A500]">*</span>
                                </Label>
                                <Input
                                    id="name"
                                    type="text"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="name"
                                    name="name"
                                    placeholder="Nama sesuai data checkout Lynk.id"
                                    className="bg-[#0B1023]/80 border-[#1E2C4A] text-[#EDF0FF] placeholder:text-[#8FA0C0]/50 focus-visible:ring-[#F0A500] h-10 rounded-xl text-xs"
                                />
                                <InputError
                                    message={errors.name}
                                    className="mt-1"
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                                <div className="grid gap-1.5">
                                    <Label htmlFor="email" className="text-xs font-semibold text-[#CBD5E1]">
                                        Alamat Email <span className="text-[#F0A500]">*</span>
                                    </Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        required
                                        tabIndex={2}
                                        autoComplete="email"
                                        name="email"
                                        placeholder="Email akun Lynk.id"
                                        className="bg-[#0B1023]/80 border-[#1E2C4A] text-[#EDF0FF] placeholder:text-[#8FA0C0]/50 focus-visible:ring-[#F0A500] h-10 rounded-xl text-xs"
                                    />
                                    <InputError message={errors.email} className="mt-1" />
                                </div>

                                <div className="grid gap-1.5">
                                    <Label htmlFor="phone" className="text-xs font-semibold text-[#CBD5E1]">
                                        No. WhatsApp / Telepon
                                    </Label>
                                    <Input
                                        id="phone"
                                        type="tel"
                                        tabIndex={3}
                                        autoComplete="tel"
                                        name="phone"
                                        placeholder="08xxxxxxxxxx"
                                        className="bg-[#0B1023]/80 border-[#1E2C4A] text-[#EDF0FF] placeholder:text-[#8FA0C0]/50 focus-visible:ring-[#F0A500] h-10 rounded-xl text-xs"
                                    />
                                    <InputError message={errors.phone} className="mt-1" />
                                </div>
                            </div>

                            <div className="grid gap-1.5">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="lynk_order_id" className="text-xs font-semibold text-[#CBD5E1]">
                                        No. Invoice / Order ID Lynk.id
                                    </Label>
                                    <span className="text-[10px] text-[#6B7BA4] font-mono">Opsional</span>
                                </div>
                                <Input
                                    id="lynk_order_id"
                                    type="text"
                                    tabIndex={4}
                                    name="lynk_order_id"
                                    placeholder="Contoh: LNK-99201"
                                    className="bg-[#0B1023]/80 border-[#1E2C4A] text-[#EDF0FF] placeholder:text-[#8FA0C0]/50 focus-visible:ring-[#F0A500] h-10 rounded-xl text-xs font-mono"
                                />
                                <InputError message={errors.lynk_order_id} className="mt-1" />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                                <div className="grid gap-1.5">
                                    <Label htmlFor="password" className="text-xs font-semibold text-[#CBD5E1]">
                                        Kata Sandi <span className="text-[#F0A500]">*</span>
                                    </Label>
                                    <PasswordInput
                                        id="password"
                                        required
                                        tabIndex={5}
                                        autoComplete="new-password"
                                        name="password"
                                        placeholder="Min. 8 karakter"
                                        passwordrules={passwordRules}
                                        className="bg-[#0B1023]/80 border-[#1E2C4A] text-[#EDF0FF] placeholder:text-[#8FA0C0]/50 focus-visible:ring-[#F0A500] h-10 rounded-xl text-xs"
                                    />
                                    <InputError message={errors.password} className="mt-1" />
                                </div>

                                <div className="grid gap-1.5">
                                    <Label htmlFor="password_confirmation" className="text-xs font-semibold text-[#CBD5E1]">
                                        Konfirmasi Sandi <span className="text-[#F0A500]">*</span>
                                    </Label>
                                    <PasswordInput
                                        id="password_confirmation"
                                        required
                                        tabIndex={6}
                                        autoComplete="new-password"
                                        name="password_confirmation"
                                        placeholder="Ulangi sandi"
                                        passwordrules={passwordRules}
                                        className="bg-[#0B1023]/80 border-[#1E2C4A] text-[#EDF0FF] placeholder:text-[#8FA0C0]/50 focus-visible:ring-[#F0A500] h-10 rounded-xl text-xs"
                                    />
                                    <InputError
                                        message={errors.password_confirmation}
                                        className="mt-1"
                                    />
                                </div>
                            </div>

                            <Button
                                type="submit"
                                className="mt-2 w-full h-11 rounded-xl bg-[#F0A500] text-[#0B1023] font-bold text-xs hover:bg-[#FFD166] transition-all shadow-[0_4px_20px_rgba(240,165,0,0.2)] flex items-center justify-center gap-2"
                                tabIndex={7}
                                data-test="register-user-button"
                                disabled={processing}
                            >
                                {processing ? <Spinner className="text-[#0B1023]" /> : <ShieldCheck className="size-4" />}
                                <span>Aktivasi Akun & Mulai Latihan</span>
                            </Button>
                        </div>

                        <div className="pt-2 border-t border-[#1E2C4A]/80 flex flex-col gap-2 text-center text-xs text-[#8FA0C0]">
                            <div>
                                Sudah memiliki akun?{' '}
                                <TextLink href={login()} tabIndex={8} className="font-semibold text-[#F0A500] hover:underline">
                                    Masuk sekarang
                                </TextLink>
                            </div>
                            <div className="text-[11px] text-[#6B7BA4]">
                                Belum checkout akses?{' '}
                                <a
                                    href="https://lynk.id"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[#10B981] hover:underline inline-flex items-center gap-1 font-medium"
                                >
                                    <span>Beli akses di Etalase Lynk.id</span>
                                    <ExternalLink className="size-3" />
                                </a>
                            </div>
                        </div>
                    </>
                )}
            </Form>
        </>
    );
}

Register.layout = {
    title: 'Aktivasi Akun SiapCPNS',
    description: 'Daftarkan akun Anda sesuai data pembelian di Lynk.id untuk akses seumur hidup.',
};
