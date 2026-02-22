import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
    ArrowRight, ArrowLeft, ChevronRight, Code, ShoppingCart, Settings,
    CheckCircle2, Layers, Globe, Mail, Zap, Shield, Clock, Monitor,
} from 'lucide-react'
import { useLang } from './i18n.js'

/* Service key → icon mapping */
const serviceIcons = { software: Code, trading: ShoppingCart, consulting: Settings }
const serviceImages = {
    software: '/images/service-software.png',
    trading: '/images/service-ecommerce.png',
    consulting: '/images/service-consulting.png',
}
const accentColors = {
    software: { bg: 'bg-primary-50', border: 'border-primary-200', text: 'text-primary-600', iconBg: 'bg-primary-100', badge: 'bg-primary-600' },
    trading: { bg: 'bg-violet-50', border: 'border-violet-200', text: 'text-violet-600', iconBg: 'bg-violet-100', badge: 'bg-violet-600' },
    consulting: { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-600', iconBg: 'bg-emerald-100', badge: 'bg-emerald-600' },
}

/* Feature icons — cycle through these */
const featureIcons = [Monitor, Globe, Zap, Shield, Layers, Clock]

export default function ServiceDetail() {
    const { serviceKey } = useParams()
    const { t, lang, toggle } = useLang()

    useEffect(() => { window.scrollTo(0, 0) }, [serviceKey])

    const data = t.servicePages?.[serviceKey]
    const colors = accentColors[serviceKey] || accentColors.software
    const HeroIcon = serviceIcons[serviceKey] || Code

    if (!data) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="text-center">
                    <p className="text-lg text-slate-500">Service not found</p>
                    <Link to="/" className="mt-4 inline-flex items-center gap-1 text-primary-600 hover:underline">
                        <ArrowLeft className="h-4 w-4" /> {t.servicePages.backBtn}
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-white font-sans text-slate-900 antialiased">
            {/* Nav Bar */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl shadow-lg shadow-slate-900/5">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
                    <Link to="/" className="flex items-center gap-2.5 group">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary-600 to-primary-700 shadow-md shadow-primary-500/25">
                            <Layers className="h-5 w-5 text-white" strokeWidth={2.5} />
                        </div>
                        <span className="text-lg font-bold tracking-tight text-slate-800">
                            Qixiang <span className="font-medium text-slate-500">Consulting</span>
                        </span>
                    </Link>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={toggle}
                            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition-all hover:bg-slate-50"
                        >
                            <Globe className="h-4 w-4" />
                            {lang === 'zh' ? 'EN' : '中文'}
                        </button>
                        <Link
                            to="/"
                            className="inline-flex items-center gap-1.5 rounded-lg text-sm font-medium text-slate-600 hover:text-primary-600 transition-colors"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            {t.servicePages.backBtn}
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative overflow-hidden pt-28 pb-16 lg:pt-36 lg:pb-24">
                <div className="pointer-events-none absolute inset-0">
                    <div className={`absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full ${colors.bg} opacity-60 blur-3xl`} />
                    <div className={`absolute bottom-0 -left-40 h-[400px] w-[400px] rounded-full ${colors.bg} opacity-40 blur-3xl`} />
                </div>

                <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="grid items-center gap-12 lg:grid-cols-2">
                        {/* Text */}
                        <div>
                            <div className={`mb-6 inline-flex items-center gap-2 rounded-full ${colors.iconBg} ${colors.text} px-4 py-1.5 text-sm font-medium`}>
                                <HeroIcon className="h-4 w-4" />
                                {data.title}
                            </div>
                            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                                {data.title}
                            </h1>
                            <p className={`mt-3 text-lg font-medium ${colors.text}`}>
                                {data.subtitle}
                            </p>
                            <p className="mt-6 text-base leading-relaxed text-slate-600">
                                {data.heroDesc}
                            </p>
                            <div className="mt-8 flex flex-wrap gap-4">
                                <Link
                                    to="/#contact"
                                    className={`group inline-flex items-center gap-2 rounded-xl ${colors.badge} px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition-all hover:opacity-90 active:scale-[0.97]`}
                                >
                                    {t.servicePages.ctaBtn}
                                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                                </Link>
                            </div>
                        </div>

                        {/* Image */}
                        <div className="relative hidden lg:block">
                            <div className={`absolute inset-0 rounded-3xl ${colors.bg} opacity-30 blur-2xl`} />
                            <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
                                <img
                                    src={serviceImages[serviceKey]}
                                    alt={data.title}
                                    className="h-full w-full object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="bg-slate-50 py-20 lg:py-28">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                            {lang === 'zh' ? '服务内容' : 'What We Offer'}
                        </h2>
                        <p className="mt-3 text-base text-slate-500">
                            {lang === 'zh' ? '全方位的专业能力覆盖' : 'Comprehensive professional capabilities'}
                        </p>
                    </div>

                    <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {data.features.map((f, i) => {
                            const Icon = featureIcons[i % featureIcons.length]
                            return (
                                <div
                                    key={i}
                                    className={`group rounded-2xl border border-slate-200 bg-white p-7 transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1 hover:${colors.border}`}
                                >
                                    <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${colors.iconBg} ${colors.text} transition-all duration-300 group-hover:${colors.badge} group-hover:text-white group-hover:shadow-md`}>
                                        <Icon className="h-5 w-5" strokeWidth={1.8} />
                                    </div>
                                    <h3 className="mt-5 text-lg font-semibold text-slate-800">{f.title}</h3>
                                    <p className="mt-2 text-sm leading-relaxed text-slate-500">{f.desc}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Process / Methodology */}
            <section className="bg-white py-20 lg:py-28">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                            {lang === 'zh' ? '交付流程' : 'Our Process'}
                        </h2>
                        <p className="mt-3 text-base text-slate-500">
                            {lang === 'zh' ? '标准化的项目管理流程，确保可控可预期的交付成果' : 'Standardized project management for predictable, quality deliverables'}
                        </p>
                    </div>

                    <div className="mx-auto mt-14 grid max-w-4xl gap-8 sm:grid-cols-2 lg:grid-cols-4">
                        {data.process.map((p, i) => (
                            <div key={i} className="relative text-center">
                                {/* Connector line (hidden on first) */}
                                {i > 0 && (
                                    <div className="pointer-events-none absolute -left-4 top-8 hidden h-0.5 w-8 bg-slate-200 lg:block" />
                                )}
                                <div className={`mx-auto flex h-16 w-16 items-center justify-center rounded-2xl ${colors.badge} text-white text-xl font-bold shadow-lg`}>
                                    {p.step}
                                </div>
                                <h3 className="mt-5 text-base font-semibold text-slate-800">{p.title}</h3>
                                <p className="mt-2 text-sm leading-relaxed text-slate-500">{p.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Tech Stack */}
            <section className="border-y border-slate-100 bg-slate-50 py-14">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <p className="mb-6 text-center text-xs font-semibold uppercase tracking-widest text-slate-400">
                        {lang === 'zh' ? '相关技术栈' : 'Related Technologies'}
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-3">
                        {data.techStack.map((name) => (
                            <span
                                key={name}
                                className={`rounded-xl border ${colors.border} bg-white px-5 py-2.5 text-sm font-semibold text-slate-600 shadow-sm`}
                            >
                                {name}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* Bottom CTA */}
            <section className="bg-slate-900 py-20 lg:py-28">
                <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                        {t.servicePages.ctaTitle}
                    </h2>
                    <p className="mx-auto mt-4 max-w-xl text-lg text-slate-400">
                        {t.footer.ctaSubtitle}
                    </p>
                    <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                        <a
                            href="mailto:contact@qixiang.com"
                            className={`inline-flex items-center gap-2 rounded-xl ${colors.badge} px-8 py-4 text-sm font-semibold text-white shadow-lg transition-all hover:opacity-90 active:scale-[0.97]`}
                        >
                            <Mail className="h-5 w-5" />
                            {t.servicePages.ctaBtn}
                        </a>
                        <Link
                            to="/"
                            className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-7 py-4 text-sm font-semibold text-white transition-all hover:bg-white/10"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            {t.servicePages.backBtn}
                        </Link>
                    </div>
                </div>
            </section>

            {/* Mini Footer */}
            <footer className="bg-slate-900 border-t border-white/10 py-8">
                <p className="text-center text-xs text-slate-500">
                    {t.footer.copyright}
                </p>
            </footer>
        </div>
    )
}
