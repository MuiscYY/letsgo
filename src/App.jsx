import { useState, useEffect, useRef } from 'react'
import { HashRouter, Routes, Route, Link } from 'react-router-dom'
import {
    Menu, X, Code, ShoppingCart, Settings, ArrowRight, Mail, MapPin,
    ChevronRight, Monitor, Layers, Zap, ExternalLink, Globe, Send,
    User, MessageSquare, Briefcase, CheckCircle2, Phone, Building2,
    Shield, Clock, Users, Target, TrendingUp,
} from 'lucide-react'
import { LangProvider, useLang } from './i18n.js'
import ServiceDetail from './ServiceDetail'

/* ══════════════════════════════════════════════
   Animated Number Component
   ══════════════════════════════════════════════ */
function AnimatedStat({ value, label }) {
    const ref = useRef(null)
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setVisible(true) },
            { threshold: 0.3 }
        )
        if (ref.current) observer.observe(ref.current)
        return () => observer.disconnect()
    }, [])

    return (
        <div ref={ref} className="text-center">
            <div
                className={`text-3xl font-bold text-slate-800 lg:text-4xl transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}
            >
                {value}
            </div>
            <div
                className={`mt-1 text-sm font-medium text-slate-400 transition-all duration-700 delay-200 ${visible ? 'opacity-100' : 'opacity-0'
                    }`}
            >
                {label}
            </div>
        </div>
    )
}

/* ══════════════════════════════════════════════
   Scroll-Reveal Wrapper
   ══════════════════════════════════════════════ */
function Reveal({ children, className = '', delay = 0 }) {
    const ref = useRef(null)
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setVisible(true) },
            { threshold: 0.15 }
        )
        if (ref.current) observer.observe(ref.current)
        return () => observer.disconnect()
    }, [])

    return (
        <div
            ref={ref}
            className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                } ${className}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    )
}

/* ──────────────────────────────────────────────
   Navbar
   ────────────────────────────────────────────── */
function Navbar() {
    const { t, lang, toggle } = useLang()
    const [open, setOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    const scrollTo = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
        setOpen(false)
    }

    const links = [
        { label: t.nav.home, id: 'hero' },
        { label: t.nav.services, id: 'services' },
        { label: t.nav.about, id: 'about' },
        { label: t.nav.contact, id: 'contact' },
    ]

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                ? 'bg-white/80 backdrop-blur-xl shadow-lg shadow-slate-900/5'
                : 'bg-transparent'
                }`}
        >
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
                {/* Logo */}
                <button onClick={() => scrollTo('hero')} className="flex items-center gap-2.5 group cursor-pointer">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary-600 to-primary-700 shadow-md shadow-primary-500/25 transition-transform group-hover:scale-105">
                        <Layers className="h-5 w-5 text-white" strokeWidth={2.5} />
                    </div>
                    <span className="text-lg font-bold tracking-tight text-slate-800">
                        Qixiang <span className="font-medium text-slate-500">Consulting</span>
                    </span>
                </button>

                {/* Desktop Links */}
                <div className="hidden items-center gap-1 md:flex">
                    {links.map((l) => (
                        <button
                            key={l.id}
                            onClick={() => scrollTo(l.id)}
                            className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 cursor-pointer"
                        >
                            {l.label}
                        </button>
                    ))}

                    {/* Language Switcher */}
                    <button
                        onClick={toggle}
                        className="ml-2 inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition-all hover:bg-slate-50 hover:border-slate-300 active:scale-[0.97]"
                        aria-label="Switch language"
                    >
                        <Globe className="h-4 w-4" />
                        {lang === 'zh' ? 'EN' : '中文'}
                    </button>

                    <button
                        onClick={() => scrollTo('contact')}
                        className="ml-3 inline-flex items-center gap-1.5 rounded-lg bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-primary-500/25 transition-all hover:bg-primary-700 hover:shadow-lg hover:shadow-primary-500/30 active:scale-[0.97] cursor-pointer"
                    >
                        {t.nav.cta}
                        <ArrowRight className="h-4 w-4" />
                    </button>
                </div>

                {/* Mobile Right Side */}
                <div className="flex items-center gap-2 md:hidden">
                    <button
                        onClick={toggle}
                        className="rounded-lg border border-slate-200 p-2 text-slate-600 transition-colors hover:bg-slate-100"
                        aria-label="Switch language"
                    >
                        <Globe className="h-5 w-5" />
                    </button>
                    <button
                        onClick={() => setOpen(!open)}
                        className="rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-100"
                        aria-label="Toggle navigation"
                    >
                        {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={`overflow-hidden transition-all duration-300 md:hidden ${open ? 'max-h-80 border-t border-slate-100' : 'max-h-0'
                    }`}
            >
                <div className="bg-white/95 backdrop-blur-xl px-6 pb-6 pt-2">
                    {links.map((l) => (
                        <button
                            key={l.id}
                            onClick={() => scrollTo(l.id)}
                            className="block w-full text-left rounded-lg px-4 py-3 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900 cursor-pointer"
                        >
                            {l.label}
                        </button>
                    ))}
                    <button
                        onClick={() => scrollTo('contact')}
                        className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-lg bg-primary-600 px-5 py-3 text-sm font-semibold text-white shadow-md shadow-primary-500/25 transition-all hover:bg-primary-700 cursor-pointer"
                    >
                        {t.nav.cta}
                        <ArrowRight className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </nav>
    )
}

/* ──────────────────────────────────────────────
   Hero Section
   ────────────────────────────────────────────── */
function Hero() {
    const { t } = useLang()

    return (
        <section
            id="hero"
            className="relative overflow-hidden pt-32 pb-12 lg:pt-40 lg:pb-16"
        >
            {/* Background Image */}
            <div className="pointer-events-none absolute inset-0">
                <img
                    src="/images/hero-bg.png"
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover"
                />
                {/* White overlay for readability */}
                <div className="absolute inset-0 bg-white/85" />
                {/* Bottom fade to white */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/80 to-white" />
            </div>

            {/* Decorative elements on top of bg */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-primary-100/40 blur-3xl" />
                <div className="absolute top-1/2 -left-32 h-[400px] w-[400px] rounded-full bg-primary-50/60 blur-3xl" />
                <div className="absolute bottom-0 right-1/4 h-[300px] w-[300px] rounded-full bg-violet-100/30 blur-3xl" />
                {/* Animated floating dots */}
                <div className="absolute top-1/4 right-1/3 h-2 w-2 rounded-full bg-primary-400/30 animate-pulse" />
                <div className="absolute top-2/3 left-1/4 h-3 w-3 rounded-full bg-primary-300/20 animate-pulse" style={{ animationDelay: '1s' }} />
                <div className="absolute top-1/3 left-2/3 h-1.5 w-1.5 rounded-full bg-violet-400/25 animate-pulse" style={{ animationDelay: '2s' }} />

                {/* Side illustrations — hidden on small screens */}
                <div className="hidden xl:block absolute left-0 top-1/2 -translate-y-1/2 w-[420px] 2xl:w-[500px]">
                    <img
                        src="/images/hero-left.png"
                        alt=""
                        className="w-full h-auto mix-blend-multiply animate-[float_6s_ease-in-out_infinite]"
                        style={{ maskImage: 'radial-gradient(ellipse 60% 50% at 30% 50%, black 20%, transparent 70%)', WebkitMaskImage: 'radial-gradient(ellipse 60% 50% at 30% 50%, black 20%, transparent 70%)' }}
                    />
                </div>
                <div className="hidden xl:block absolute right-0 top-1/2 -translate-y-1/2 w-[420px] 2xl:w-[500px]">
                    <img
                        src="/images/hero-right.png"
                        alt=""
                        className="w-full h-auto mix-blend-multiply animate-[float_6s_ease-in-out_infinite_1.5s]"
                        style={{ maskImage: 'radial-gradient(ellipse 60% 50% at 70% 50%, black 20%, transparent 70%)', WebkitMaskImage: 'radial-gradient(ellipse 60% 50% at 70% 50%, black 20%, transparent 70%)' }}
                    />
                </div>
            </div>

            <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-3xl text-center">
                    <Reveal>
                        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary-200 bg-primary-50/80 px-4 py-1.5 text-sm font-medium text-primary-700 backdrop-blur-sm">
                            <Zap className="h-4 w-4" />
                            {t.hero.badge}
                        </div>
                    </Reveal>

                    <Reveal delay={100}>
                        <h1 className="text-4xl font-extrabold leading-[1.15] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                            {t.hero.titleLine1}
                            <br />
                            <span className="bg-gradient-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent">
                                {t.hero.titleLine2}
                            </span>
                        </h1>
                    </Reveal>

                    <Reveal delay={200}>
                        <p className="mt-6 text-lg leading-relaxed text-slate-600 sm:text-xl lg:mt-8">
                            {t.hero.subtitle}
                        </p>
                    </Reveal>

                    <Reveal delay={300}>
                        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:mt-12">
                            <button
                                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                                className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary-500/25 transition-all hover:bg-primary-700 hover:shadow-xl hover:shadow-primary-500/30 active:scale-[0.97] sm:w-auto cursor-pointer"
                            >
                                {t.hero.btnServices}
                                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                            </button>
                            <button
                                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                                className="group inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white/80 backdrop-blur-sm px-7 py-3.5 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:border-slate-300 hover:bg-white hover:shadow-md active:scale-[0.97] sm:w-auto cursor-pointer"
                            >
                                {t.hero.btnContact}
                                <ExternalLink className="h-4 w-4 text-slate-400 transition-transform group-hover:translate-x-0.5" />
                            </button>
                        </div>
                    </Reveal>
                </div>

                {/* Stats Strip */}
                <div className="mx-auto mt-14 grid max-w-2xl grid-cols-3 gap-8 rounded-2xl border border-slate-200/60 bg-white/70 px-8 py-6 shadow-lg shadow-slate-200/30 backdrop-blur-sm lg:mt-16">
                    <AnimatedStat value={t.hero.stat1Value} label={t.hero.stat1Label} />
                    <AnimatedStat value={t.hero.stat2Value} label={t.hero.stat2Label} />
                    <AnimatedStat value={t.hero.stat3Value} label={t.hero.stat3Label} />
                </div>
            </div>
        </section>
    )
}

/* ──────────────────────────────────────────────
   Tech Stack Marquee — scrolling logos strip
   ────────────────────────────────────────────── */
const techRow1 = ['React', 'Node.js', 'TypeScript', 'Python', 'AWS', 'Docker', 'PostgreSQL', 'Kubernetes']
const techRow2 = ['Next.js', 'GraphQL', 'Redis', 'MongoDB', 'Vue.js', 'Java', 'Go', 'Nginx', 'Terraform', 'Elasticsearch']

function TechMarquee() {
    const { lang } = useLang()
    const row1 = [...techRow1, ...techRow1, ...techRow1]
    const row2 = [...techRow2, ...techRow2, ...techRow2]

    return (
        <section className="overflow-hidden border-y border-slate-100 bg-white py-10">
            <p className="mb-6 text-center text-xs font-semibold uppercase tracking-widest text-slate-400">
                {lang === 'zh' ? '我们的技术栈' : 'Our Technology Stack'}
            </p>
            <div className="relative">
                {/* Fade edges */}
                <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-white to-transparent" />
                <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-white to-transparent" />

                {/* Row 1 — scrolls left */}
                <div className="flex animate-[marquee_25s_linear_infinite] gap-4 mb-4">
                    {row1.map((name, i) => (
                        <span
                            key={`r1-${name}-${i}`}
                            className="shrink-0 rounded-xl border border-slate-200 bg-slate-50 px-5 py-2.5 text-sm font-semibold text-slate-500 shadow-sm"
                        >
                            {name}
                        </span>
                    ))}
                </div>

                {/* Row 2 — scrolls right */}
                <div className="flex animate-[marqueeReverse_28s_linear_infinite] gap-4">
                    {row2.map((name, i) => (
                        <span
                            key={`r2-${name}-${i}`}
                            className="shrink-0 rounded-xl border border-primary-100 bg-primary-50/50 px-5 py-2.5 text-sm font-semibold text-primary-600/70 shadow-sm"
                        >
                            {name}
                        </span>
                    ))}
                </div>
            </div>
        </section>
    )
}
/* ──────────────────────────────────────────────
   Services Section
   ────────────────────────────────────────────── */
const cardAccent = {
    primary:
        'group-hover:bg-primary-50 group-hover:border-primary-200 [&_.icon-wrap]:bg-primary-100 [&_.icon-wrap]:text-primary-600',
    violet:
        'group-hover:bg-violet-50 group-hover:border-violet-200 [&_.icon-wrap]:bg-violet-100 [&_.icon-wrap]:text-violet-600',
    emerald:
        'group-hover:bg-emerald-50 group-hover:border-emerald-200 [&_.icon-wrap]:bg-emerald-100 [&_.icon-wrap]:text-emerald-600',
}

function Services() {
    const { t } = useLang()

    const services = [
        { icon: Code, title: t.services.card1Title, description: t.services.card1Desc, color: 'primary', image: '/images/service-software.png', key: 'software' },
        { icon: ShoppingCart, title: t.services.card2Title, description: t.services.card2Desc, color: 'violet', image: '/images/service-ecommerce.png', key: 'trading' },
        { icon: Settings, title: t.services.card3Title, description: t.services.card3Desc, color: 'emerald', image: '/images/service-consulting.png', key: 'consulting' },
    ]

    return (
        <section id="services" className="bg-white pt-16 pb-24 lg:pt-20 lg:pb-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <Reveal>
                    <div className="mx-auto max-w-2xl text-center">
                        <p className="text-sm font-semibold uppercase tracking-widest text-primary-600">
                            {t.services.label}
                        </p>
                        <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                            {t.services.title}
                        </h2>
                        <p className="mt-4 text-lg leading-relaxed text-slate-500">
                            {t.services.subtitle}
                        </p>
                    </div>
                </Reveal>

                <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {services.map((s, i) => {
                        const Icon = s.icon
                        return (
                            <Reveal key={s.title} delay={i * 150}>
                                <div
                                    className={`group relative rounded-2xl border border-slate-200 bg-white overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1 ${cardAccent[s.color]}`}
                                >
                                    {/* Service Illustration */}
                                    <div className="relative h-48 overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100">
                                        <img
                                            src={s.image}
                                            alt={s.title}
                                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    </div>
                                    <div className="p-8">
                                        <div className="icon-wrap flex h-12 w-12 items-center justify-center rounded-xl transition-colors duration-300">
                                            <Icon className="h-6 w-6" strokeWidth={1.8} />
                                        </div>
                                        <h3 className="mt-5 text-xl font-semibold text-slate-800">{s.title}</h3>
                                        <p className="mt-3 text-sm leading-relaxed text-slate-500">{s.description}</p>
                                        <Link to={`/service/${s.key}`} className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-primary-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                            {t.services.learnMore}
                                            <ArrowRight className="h-4 w-4" />
                                        </Link>
                                    </div>
                                </div>
                            </Reveal>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

/* ──────────────────────────────────────────────
   Global Reach Banner — between Services & WhyUs
   ────────────────────────────────────────────── */
function GlobalBanner() {
    const { lang } = useLang()

    return (
        <section className="relative overflow-hidden bg-slate-900">
            {/* Globe Image */}
            <div className="relative">
                <img
                    src="/images/global-network.png"
                    alt="Global network"
                    className="w-full h-[320px] lg:h-[420px] object-cover"
                />
                {/* Gradient overlays for blending */}
                <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-transparent opacity-30" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />

                {/* Overlaid text */}
                <div className="absolute inset-0 flex flex-col items-center justify-end pb-12 lg:pb-16">
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary-400">
                        {lang === 'zh' ? '全球化服务' : 'Global Reach'}
                    </p>
                    <h2 className="mt-3 text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
                        {lang === 'zh' ? '连接全球，赋能企业' : 'Connecting Worldwide, Empowering Business'}
                    </h2>
                    <p className="mt-3 max-w-xl text-center text-sm text-slate-400 lg:text-base">
                        {lang === 'zh'
                            ? '我们的服务覆盖亚洲、欧洲和北美，为出海企业提供无时差的技术支持'
                            : 'Our services span Asia, Europe, and North America — seamless tech support across time zones'}
                    </p>

                    {/* Animated Stats */}
                    <div className="mt-8 flex gap-12">
                        {[
                            { value: lang === 'zh' ? '3+' : '3+', label: lang === 'zh' ? '大洲覆盖' : 'Continents' },
                            { value: lang === 'zh' ? '10+' : '10+', label: lang === 'zh' ? '国家/地区' : 'Countries' },
                            { value: '24/7', label: lang === 'zh' ? '全天候支持' : 'Support' },
                        ].map((s) => (
                            <div key={s.label} className="text-center">
                                <div className="text-2xl font-bold text-white lg:text-3xl">{s.value}</div>
                                <div className="mt-1 text-xs font-medium text-slate-500">{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

/* ──────────────────────────────────────────────
   Why Choose Us Section
   ────────────────────────────────────────────── */
const whyUsIcons = [Target, Layers, Shield, Clock, Users, TrendingUp]

function WhyUs() {
    const { t } = useLang()

    return (
        <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white pt-16 pb-24 lg:pt-20 lg:pb-32">
            {/* Background decoration */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute top-0 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-primary-50/40 blur-3xl" />
            </div>

            <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
                <Reveal>
                    <div className="mx-auto max-w-2xl text-center">
                        <p className="text-sm font-semibold uppercase tracking-widest text-primary-600">
                            {t.whyUs.label}
                        </p>
                        <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                            {t.whyUs.title}
                        </h2>
                        <p className="mt-4 text-lg leading-relaxed text-slate-500">
                            {t.whyUs.subtitle}
                        </p>
                    </div>
                </Reveal>

                <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {t.whyUs.items.map((item, i) => {
                        const Icon = whyUsIcons[i]
                        return (
                            <Reveal key={i} delay={i * 100}>
                                <div className="group flex gap-4 rounded-2xl border border-slate-100 bg-white/80 p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary-200 hover:bg-primary-50/50 hover:shadow-lg hover:shadow-primary-100/50">
                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-100 text-primary-600 transition-all duration-300 group-hover:bg-primary-600 group-hover:text-white group-hover:shadow-md group-hover:shadow-primary-500/25">
                                        <Icon className="h-5 w-5" strokeWidth={1.8} />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-slate-800">{item.title}</h3>
                                        <p className="mt-1 text-sm leading-relaxed text-slate-500">{item.desc}</p>
                                    </div>
                                </div>
                            </Reveal>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

/* ──────────────────────────────────────────────
   Compliance & Security Standards Banner
   ────────────────────────────────────────────── */
const standardsRow1 = ['ISO 27001', 'GDPR', 'SOC 2 Type II', 'PCI DSS', 'OWASP Top 10', 'NIST CSF', 'HIPAA', 'CSA STAR']
const standardsRow2 = ['SSL/TLS Encryption', 'Zero Trust Architecture', 'Penetration Testing', 'Data Loss Prevention', 'CCPA Compliance', 'End-to-End Encryption', 'WAF Protection', 'IAM Best Practices']

function ComplianceBanner() {
    const { lang } = useLang()
    const row1 = [...standardsRow1, ...standardsRow1, ...standardsRow1]
    const row2 = [...standardsRow2, ...standardsRow2, ...standardsRow2]

    return (
        <section className="relative overflow-hidden bg-slate-900 py-16 lg:py-20">
            {/* Background glow */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[800px] rounded-full bg-primary-600/10 blur-3xl" />
            </div>

            {/* Header */}
            <div className="relative mx-auto max-w-7xl px-6 text-center lg:px-8 mb-10">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-600/20 mb-5">
                    <Shield className="h-7 w-7 text-primary-400" />
                </div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary-400">
                    {lang === 'zh' ? '安全合规' : 'Security & Compliance'}
                </p>
                <h2 className="mt-3 text-2xl font-bold text-white sm:text-3xl">
                    {lang === 'zh' ? '遵循国际安全标准' : 'International Security Standards'}
                </h2>
                <p className="mx-auto mt-3 max-w-lg text-sm text-slate-400">
                    {lang === 'zh'
                        ? '我们严格遵循全球主流安全认证与合规框架，确保您的数据与业务安全无忧'
                        : 'We strictly follow global security certifications and compliance frameworks to keep your data safe'}
                </p>
            </div>

            {/* Scrolling standards — Row 1 */}
            <div className="relative mb-4">
                <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-slate-900 to-transparent" />
                <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-slate-900 to-transparent" />
                <div className="flex animate-[marquee_20s_linear_infinite] gap-4">
                    {row1.map((name, i) => (
                        <span
                            key={`c1-${i}`}
                            className="shrink-0 flex items-center gap-2 rounded-xl border border-primary-500/20 bg-primary-500/10 px-5 py-3 text-sm font-semibold text-primary-300"
                        >
                            <Shield className="h-4 w-4 text-primary-400" />
                            {name}
                        </span>
                    ))}
                </div>
            </div>

            {/* Scrolling standards — Row 2 */}
            <div className="relative">
                <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-slate-900 to-transparent" />
                <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-slate-900 to-transparent" />
                <div className="flex animate-[marqueeReverse_24s_linear_infinite] gap-4">
                    {row2.map((name, i) => (
                        <span
                            key={`c2-${i}`}
                            className="shrink-0 flex items-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-5 py-3 text-sm font-semibold text-emerald-300"
                        >
                            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                            {name}
                        </span>
                    ))}
                </div>
            </div>
        </section>
    )
}

/* ──────────────────────────────────────────────
   About Section
   ────────────────────────────────────────────── */
function About() {
    const { t } = useLang()

    const stats = [
        { value: t.about.stat1Value, label: t.about.stat1Label },
        { value: t.about.stat2Value, label: t.about.stat2Label },
        { value: t.about.stat3Value, label: t.about.stat3Label },
        { value: t.about.stat4Value, label: t.about.stat4Label },
    ]

    return (
        <section id="about" className="bg-white py-24 lg:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="grid items-center gap-16 lg:grid-cols-2">
                    {/* Text */}
                    <div>
                        <Reveal>
                            <p className="text-sm font-semibold uppercase tracking-widest text-primary-600">
                                {t.about.label}
                            </p>
                            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                                {t.about.title}
                            </h2>
                        </Reveal>
                        <Reveal delay={100}>
                            <p className="mt-6 text-lg leading-relaxed text-slate-600">
                                {t.about.description}
                            </p>
                        </Reveal>
                        <Reveal delay={200}>
                            <div className="mt-10 grid grid-cols-2 gap-6">
                                {stats.map((item) => (
                                    <div key={item.label} className="rounded-xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-5 shadow-sm transition-shadow hover:shadow-md">
                                        <div className="text-2xl font-bold text-primary-600">{item.value}</div>
                                        <div className="mt-1 text-sm font-medium text-slate-500">{item.label}</div>
                                    </div>
                                ))}
                            </div>
                        </Reveal>
                    </div>

                    {/* Visual — Abstract Geometric */}
                    <Reveal delay={300}>
                        <div className="relative hidden lg:block">
                            <div className="relative mx-auto aspect-square max-w-md">
                                {/* Blur glow behind image */}
                                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary-600 to-primary-700 opacity-10 blur-2xl" />

                                {/* Main image container */}
                                <div className="absolute inset-4 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
                                    <img
                                        src="/images/about-workspace.png"
                                        alt="Modern development workspace"
                                        className="h-full w-full object-cover"
                                    />
                                    {/* Subtle overlay to blend with design */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-white/10 via-transparent to-transparent" />
                                </div>

                                {/* Floating decorative icons */}
                                <div className="absolute -right-6 -top-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-600 shadow-lg shadow-primary-500/30 animate-[float_6s_ease-in-out_infinite]">
                                    <Monitor className="h-7 w-7 text-white" />
                                </div>
                                <div className="absolute -bottom-4 -left-4 flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-500 shadow-lg shadow-emerald-500/30 animate-[float_6s_ease-in-out_infinite_1s]">
                                    <Zap className="h-6 w-6 text-white" />
                                </div>
                                <div className="absolute -right-3 bottom-1/4 flex h-12 w-12 items-center justify-center rounded-lg bg-violet-500 shadow-lg shadow-violet-500/30 animate-[float_6s_ease-in-out_infinite_2s]">
                                    <Shield className="h-5 w-5 text-white" />
                                </div>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    )
}

/* ──────────────────────────────────────────────
   Team Expertise & Qualifications
   ────────────────────────────────────────────── */
function TeamExpertise() {
    const { lang } = useLang()

    const certs = lang === 'zh'
        ? [
            { icon: Shield, title: 'AWS 认证', desc: 'Solutions Architect & DevOps Engineer' },
            { icon: Monitor, title: '全栈技术认证', desc: 'React, Node.js, Python, Java 高级认证' },
            { icon: Layers, title: 'PMP 项目管理', desc: '国际项目管理专业认证' },
            { icon: Target, title: 'Scrum Master', desc: 'CSM 敏捷项目管理认证' },
        ]
        : [
            { icon: Shield, title: 'AWS Certified', desc: 'Solutions Architect & DevOps Engineer' },
            { icon: Monitor, title: 'Full-Stack Certified', desc: 'React, Node.js, Python, Java Advanced' },
            { icon: Layers, title: 'PMP Certified', desc: 'Project Management Professional' },
            { icon: Target, title: 'Scrum Master', desc: 'Certified ScrumMaster (CSM)' },
        ]

    const metrics = lang === 'zh'
        ? [
            { value: '8+', label: '平均从业年限' },
            { value: '100%', label: '本科及以上学历' },
            { value: '60%', label: '海外留学/工作经验' },
            { value: '4.9/5', label: '客户满意度评分' },
        ]
        : [
            { value: '8+', label: 'Avg Years Experience' },
            { value: '100%', label: 'Bachelor\'s or Above' },
            { value: '60%', label: 'International Experience' },
            { value: '4.9/5', label: 'Client Satisfaction' },
        ]

    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20 lg:py-28">
            {/* Background decorations */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-primary-600/8 blur-3xl" />
                <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-violet-600/8 blur-3xl" />
                {/* Grid pattern */}
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            </div>

            <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
                {/* Header */}
                <div className="mx-auto max-w-2xl text-center mb-16">
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary-400">
                        {lang === 'zh' ? '技术专家团队' : 'Expert Team'}
                    </p>
                    <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
                        {lang === 'zh' ? '专业认证的技术团队' : 'Certified Professional Team'}
                    </h2>
                    <p className="mt-4 text-base text-slate-400">
                        {lang === 'zh'
                            ? '我们的团队成员均具备国际认可的技术认证与丰富的实战经验'
                            : 'Our team members hold internationally recognized certifications with extensive hands-on experience'}
                    </p>
                </div>

                {/* Certification Cards */}
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-16">
                    {certs.map((c, i) => {
                        const Icon = c.icon
                        return (
                            <div key={i} className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-primary-500/30 hover:-translate-y-1">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-500/15 text-primary-400 transition-colors group-hover:bg-primary-500/25">
                                    <Icon className="h-6 w-6" strokeWidth={1.8} />
                                </div>
                                <h3 className="mt-4 text-base font-semibold text-white">{c.title}</h3>
                                <p className="mt-1.5 text-sm text-slate-400">{c.desc}</p>
                            </div>
                        )
                    })}
                </div>

                {/* Team Metrics Bar */}
                <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-8">
                    <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
                        {metrics.map((m, i) => (
                            <div key={i} className="text-center">
                                <div className="text-3xl font-bold text-primary-400 lg:text-4xl">{m.value}</div>
                                <div className="mt-2 text-sm font-medium text-slate-400">{m.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

/* ──────────────────────────────────────────────
   Contact Form Section
   ────────────────────────────────────────────── */
function ContactForm() {
    const { t, lang } = useLang()
    const [form, setForm] = useState({ name: '', email: '', company: '', phone: '', message: '' })
    const [status, setStatus] = useState('idle') // idle | sending | success

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setStatus('sending')

        // Build mailto link with structured body
        const subject = encodeURIComponent(
            `[Qixiang Consulting] 项目咨询 - ${form.company || form.name}`
        )
        const body = encodeURIComponent(
            `姓名 / Name: ${form.name}\n` +
            `邮箱 / Email: ${form.email}\n` +
            `公司 / Company: ${form.company}\n` +
            `电话 / Phone: ${form.phone}\n` +
            `────────────────────\n` +
            `${form.message}`
        )

        // Open mailto
        window.location.href = `mailto:contact@qixiang.com?subject=${subject}&body=${body}`

        // Show success after brief delay
        setTimeout(() => {
            setStatus('success')
            setTimeout(() => setStatus('idle'), 4000)
        }, 500)
    }

    return (
        <section id="contact" className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-slate-100 py-24 lg:py-32">
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-primary-50/50 blur-3xl" />
                <div className="absolute top-20 -left-40 h-[400px] w-[400px] rounded-full bg-violet-50/30 blur-3xl" />
            </div>

            <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
                <Reveal>
                    <div className="mx-auto max-w-2xl text-center">
                        <p className="text-sm font-semibold uppercase tracking-widest text-primary-600">
                            {t.contactForm.label}
                        </p>
                        <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                            {t.contactForm.title}
                        </h2>
                        <p className="mt-4 text-lg leading-relaxed text-slate-500">
                            {t.contactForm.subtitle}
                        </p>
                    </div>
                </Reveal>

                <div className="mt-16 grid gap-12 lg:grid-cols-5">
                    {/* Form */}
                    <Reveal delay={100} className="lg:col-span-3">
                        <form
                            onSubmit={handleSubmit}
                            className="rounded-2xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/50 lg:p-10"
                        >
                            <div className="grid gap-6 sm:grid-cols-2">
                                {/* Name */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-slate-700">
                                        <User className="mr-1.5 inline h-4 w-4 text-slate-400" />
                                        {t.contactForm.name}
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        value={form.name}
                                        onChange={handleChange}
                                        placeholder={t.contactForm.namePlaceholder}
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 transition-all focus:border-primary-400 focus:bg-white focus:ring-2 focus:ring-primary-100 focus:outline-none"
                                    />
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-slate-700">
                                        <Mail className="mr-1.5 inline h-4 w-4 text-slate-400" />
                                        {t.contactForm.email}
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        value={form.email}
                                        onChange={handleChange}
                                        placeholder={t.contactForm.emailPlaceholder}
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 transition-all focus:border-primary-400 focus:bg-white focus:ring-2 focus:ring-primary-100 focus:outline-none"
                                    />
                                </div>

                                {/* Company */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-slate-700">
                                        <Building2 className="mr-1.5 inline h-4 w-4 text-slate-400" />
                                        {t.contactForm.company}
                                    </label>
                                    <input
                                        type="text"
                                        name="company"
                                        value={form.company}
                                        onChange={handleChange}
                                        placeholder={t.contactForm.companyPlaceholder}
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 transition-all focus:border-primary-400 focus:bg-white focus:ring-2 focus:ring-primary-100 focus:outline-none"
                                    />
                                </div>

                                {/* Phone */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-slate-700">
                                        <Phone className="mr-1.5 inline h-4 w-4 text-slate-400" />
                                        {t.contactForm.phone}
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={form.phone}
                                        onChange={handleChange}
                                        placeholder={t.contactForm.phonePlaceholder}
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 transition-all focus:border-primary-400 focus:bg-white focus:ring-2 focus:ring-primary-100 focus:outline-none"
                                    />
                                </div>
                            </div>

                            {/* Message */}
                            <div className="mt-6">
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    <MessageSquare className="mr-1.5 inline h-4 w-4 text-slate-400" />
                                    {t.contactForm.message}
                                </label>
                                <textarea
                                    name="message"
                                    required
                                    rows={5}
                                    value={form.message}
                                    onChange={handleChange}
                                    placeholder={t.contactForm.messagePlaceholder}
                                    className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 transition-all focus:border-primary-400 focus:bg-white focus:ring-2 focus:ring-primary-100 focus:outline-none"
                                />
                            </div>

                            {/* Submit */}
                            <div className="mt-6 flex items-center gap-4">
                                <button
                                    type="submit"
                                    disabled={status === 'sending'}
                                    className="inline-flex items-center gap-2 rounded-xl bg-primary-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary-500/25 transition-all hover:bg-primary-700 hover:shadow-xl hover:shadow-primary-500/30 active:scale-[0.97] disabled:opacity-60 disabled:cursor-not-allowed"
                                >
                                    {status === 'sending' ? (
                                        <>
                                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                            {t.contactForm.sending}
                                        </>
                                    ) : (
                                        <>
                                            <Send className="h-4 w-4" />
                                            {t.contactForm.submit}
                                        </>
                                    )}
                                </button>

                                {status === 'success' && (
                                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-600 animate-[fadeIn_0.3s_ease-out]">
                                        <CheckCircle2 className="h-4 w-4" />
                                        {t.contactForm.success}
                                    </span>
                                )}
                            </div>
                        </form>
                    </Reveal>

                    {/* Contact Info Sidebar */}
                    <Reveal delay={250} className="lg:col-span-2">
                        <div className="space-y-6">
                            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-lg shadow-slate-200/50">
                                <h3 className="text-lg font-semibold text-slate-800">{t.contactForm.infoTitle}</h3>

                                <div className="mt-6 space-y-5">
                                    <div className="flex items-start gap-4">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-100 text-primary-600">
                                            <Mail className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-slate-500">{t.contactForm.emailLabel}</p>
                                            <a href="mailto:contact@qixiang.com" className="text-sm font-semibold text-slate-800 hover:text-primary-600 transition-colors">
                                                contact@qixiang.com
                                            </a>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                                            <MapPin className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-slate-500">{t.contactForm.addressLabel}</p>
                                            <p className="text-sm font-semibold text-slate-800">{t.contactForm.address}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Trust badges */}
                            <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-primary-600 to-primary-700 p-8 text-white shadow-lg shadow-primary-500/25">
                                <Briefcase className="h-8 w-8 mb-4 opacity-80" />
                                <h3 className="text-lg font-semibold">
                                    {lang === 'en' ? "Let's Build Together" : '合作共赢'}
                                </h3>
                                <p className="mt-2 text-sm leading-relaxed text-primary-100">
                                    {lang === 'en'
                                        ? 'Join 50+ enterprise clients who trust us to deliver world-class technology solutions.'
                                        : '加入我们 50+ 家企业合作伙伴，共同打造一流的技术产品。'}
                                </p>
                                <div className="mt-6 flex gap-3">
                                    {[Shield, Clock, CheckCircle2].map((Icon, i) => (
                                        <div key={i} className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 backdrop-blur-sm">
                                            <Icon className="h-4 w-4" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    )
}

/* ──────────────────────────────────────────────
   Footer
   ────────────────────────────────────────────── */
function Footer() {
    const { t, lang } = useLang()

    return (
        <footer className="relative overflow-hidden bg-slate-900 text-white">
            {/* Top CTA Area */}
            <div className="relative border-b border-white/10 py-20 lg:py-28">
                <div className="pointer-events-none absolute inset-0">
                    <div className="absolute -top-40 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary-600/10 blur-3xl" />
                </div>
                <div className="relative mx-auto max-w-7xl px-6 text-center lg:px-8">
                    <Reveal>
                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                            {t.footer.ctaTitle1}
                            <span className="bg-gradient-to-r from-primary-400 to-primary-300 bg-clip-text text-transparent">
                                {t.footer.ctaHighlight}
                            </span>
                            {t.footer.ctaTitle2}
                        </h2>
                    </Reveal>
                    <Reveal delay={100}>
                        <p className="mx-auto mt-5 max-w-xl text-lg text-slate-400">
                            {t.footer.ctaSubtitle}
                        </p>
                    </Reveal>
                    <Reveal delay={200}>
                        <button
                            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                            className="mt-10 inline-flex items-center gap-2 rounded-xl bg-primary-600 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-primary-500/25 transition-all hover:bg-primary-500 hover:shadow-xl hover:shadow-primary-500/30 active:scale-[0.97] cursor-pointer"
                        >
                            <Mail className="h-5 w-5" />
                            {t.footer.ctaBtn}
                        </button>
                    </Reveal>
                </div>
            </div>
            {/* Rich Footer */}
            <div className="mx-auto max-w-7xl px-6 pt-16 pb-8 lg:px-8">
                {/* 4-column grid */}
                <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
                    {/* Col 1 — Brand */}
                    <div className="sm:col-span-2 lg:col-span-1">
                        <div className="flex items-center gap-2.5">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-600 shadow-md shadow-primary-500/25">
                                <Layers className="h-5 w-5 text-white" strokeWidth={2.5} />
                            </div>
                            <span className="text-lg font-bold tracking-tight text-white">
                                Qixiang <span className="font-medium text-slate-400">Consulting</span>
                            </span>
                        </div>
                        <p className="mt-4 text-sm leading-relaxed text-slate-400">
                            {t.footer.brand}
                        </p>
                        {/* Social-like icons */}
                        <div className="mt-6 flex gap-3">
                            {[Mail, Globe, MessageSquare, Briefcase].map((Icon, i) => (
                                <div key={i} className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-400 transition-all hover:bg-white/10 hover:text-white hover:border-primary-500/30 cursor-pointer">
                                    <Icon className="h-4 w-4" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Col 2 — Services */}
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-widest text-slate-300">
                            {lang === 'zh' ? '核心服务' : 'Services'}
                        </h3>
                        <ul className="mt-4 space-y-3 text-sm">
                            {[
                                { label: t.services.card1Title, id: 'software' },
                                { label: t.services.card2Title, id: 'trading' },
                                { label: t.services.card3Title, id: 'consulting' },
                            ].map((s) => (
                                <li key={s.id}>
                                    <Link to={`/service/${s.id}`} className="text-slate-400 transition-colors hover:text-white">
                                        {s.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        <h3 className="mt-8 text-sm font-semibold uppercase tracking-widest text-slate-300">
                            {t.footer.navTitle}
                        </h3>
                        <ul className="mt-4 space-y-3 text-sm">
                            {[
                                { label: t.nav.home, id: 'hero' },
                                { label: t.nav.services, id: 'services' },
                                { label: t.nav.about, id: 'about' },
                                { label: t.nav.contact, id: 'contact' },
                            ].map((l) => (
                                <li key={l.id}>
                                    <button onClick={() => document.getElementById(l.id)?.scrollIntoView({ behavior: 'smooth' })} className="text-slate-400 transition-colors hover:text-white cursor-pointer">
                                        {l.label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Col 3 — Tech Stack */}
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-widest text-slate-300">
                            {lang === 'zh' ? '技术能力' : 'Tech Stack'}
                        </h3>
                        <div className="mt-4 flex flex-wrap gap-2">
                            {['React', 'Node.js', 'TypeScript', 'Python', 'Java', 'AWS', 'Docker', 'K8s', 'PostgreSQL', 'Redis'].map((t) => (
                                <span key={t} className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-400">
                                    {t}
                                </span>
                            ))}
                        </div>

                        <h3 className="mt-8 text-sm font-semibold uppercase tracking-widest text-slate-300">
                            {lang === 'zh' ? '安全认证' : 'Certifications'}
                        </h3>
                        <div className="mt-4 flex flex-wrap gap-2">
                            {['ISO 27001', 'GDPR', 'SOC 2', 'PCI DSS'].map((c) => (
                                <span key={c} className="flex items-center gap-1.5 rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-400">
                                    <Shield className="h-3 w-3" />
                                    {c}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Col 4 — Contact */}
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-widest text-slate-300">
                            {t.footer.contactTitle}
                        </h3>
                        <ul className="mt-4 space-y-4 text-sm text-slate-400">
                            <li className="flex items-start gap-3">
                                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary-400" />
                                <a href="mailto:contact@qixiang.com" className="hover:text-white transition-colors">contact@qixiang.com</a>
                            </li>
                            <li className="flex items-start gap-3">
                                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary-400" />
                                <span>+86 6590-6578</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary-400" />
                                <span>{t.contactForm.address}</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary-400" />
                                <span>{lang === 'zh' ? '工作时间：周一至周五 9:00-18:00' : 'Mon-Fri 9:00 AM - 6:00 PM'}</span>
                            </li>
                        </ul>

                        {/* Mini CTA */}
                        <button
                            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary-600 px-5 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-primary-500 cursor-pointer"
                        >
                            <Send className="h-4 w-4" />
                            {t.nav.cta}
                        </button>
                    </div>
                </div>

                {/* Trust strip */}
                <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4 rounded-2xl border border-white/10 bg-white/5 p-6">
                    {[
                        { value: '50+', label: lang === 'zh' ? '企业客户' : 'Enterprise Clients', icon: Building2 },
                        { value: '200+', label: lang === 'zh' ? '成功交付' : 'Projects Delivered', icon: CheckCircle2 },
                        { value: '99.9%', label: lang === 'zh' ? '系统可用性' : 'System Uptime', icon: Zap },
                        { value: '24/7', label: lang === 'zh' ? '技术支持' : 'Tech Support', icon: Clock },
                    ].map((s) => {
                        const Icon = s.icon
                        return (
                            <div key={s.label} className="flex items-center gap-3">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-500/15 text-primary-400">
                                    <Icon className="h-5 w-5" />
                                </div>
                                <div>
                                    <div className="text-lg font-bold text-white">{s.value}</div>
                                    <div className="text-xs text-slate-500">{s.label}</div>
                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* Bottom bar */}
                <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
                    <p className="text-xs text-slate-500">
                        {t.footer.copyright}
                    </p>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-white transition-colors cursor-pointer"
                        >
                            <ArrowRight className="h-3 w-3 -rotate-90" />
                            {lang === 'zh' ? '回到顶部' : 'Back to Top'}
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    )
}

/* ──────────────────────────────────────────────
   Home Page — all existing sections
   ────────────────────────────────────────────── */
function HomePage() {
    return (
        <div className="min-h-screen bg-white font-sans text-slate-900 antialiased">
            <Navbar />
            <Hero />
            <TechMarquee />
            <Services />
            <GlobalBanner />
            <WhyUs />
            <ComplianceBanner />
            <About />
            <TeamExpertise />
            <ContactForm />
            <Footer />
        </div>
    )
}

/* ──────────────────────────────────────────────
   App — Routing
   ────────────────────────────────────────────── */
export default function App() {
    return (
        <LangProvider>
            <HashRouter>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/service/:serviceKey" element={<ServiceDetail />} />
                </Routes>
            </HashRouter>
        </LangProvider>
    )
}
