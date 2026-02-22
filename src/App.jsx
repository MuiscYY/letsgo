import { useState, useEffect, createContext, useContext, useRef } from 'react'
import {
    Menu,
    X,
    Code,
    ShoppingCart,
    Settings,
    ArrowRight,
    Mail,
    MapPin,
    ChevronRight,
    Monitor,
    Layers,
    Zap,
    ExternalLink,
    Globe,
    Send,
    User,
    MessageSquare,
    Briefcase,
    CheckCircle2,
    Phone,
    Building2,
    Shield,
    Clock,
    Users,
    Target,
    TrendingUp,
} from 'lucide-react'

/* ══════════════════════════════════════════════
   i18n — Internationalization
   ══════════════════════════════════════════════ */
const translations = {
    zh: {
        // Navbar
        nav: {
            home: '首页',
            services: '核心服务',
            about: '关于我们',
            contact: '联系我们',
            cta: '立即咨询',
        },
        // Hero
        hero: {
            badge: '专业 IT 技术咨询与定制化软件开发服务商',
            titleLine1: '驱动业务创新的',
            titleLine2: '定制化 IT 解决方案',
            subtitle:
                '致力于为海内外企业客户提供高质量的 IT 技术外包、软件系统开发及架构咨询服务，助力企业数字化转型。',
            btnServices: '了解我们的服务',
            btnContact: '联系我们',
            stat1Value: '50+',
            stat1Label: '企业客户',
            stat2Value: '200+',
            stat2Label: '成功交付项目',
            stat3Value: '99.9%',
            stat3Label: '系统可用性',
        },
        // Services
        services: {
            label: 'Core Services',
            title: '核心服务',
            subtitle: '以技术驱动商业价值，为您提供端到端的数字化解决方案',
            card1Title: '定制化软件开发',
            card1Desc:
                '涵盖现代 Web 应用开发、PWA（渐进式网页应用）平台搭建、以及跨平台移动端适配开发。',
            card2Title: '交易系统架构',
            card2Desc:
                '提供从底层逻辑设计到前端产品交付的全链路开发服务，支持高并发的电子商务与社区交易平台需求。',
            card3Title: 'IT 技术咨询与运维',
            card3Desc:
                '为客户的出海项目提供系统部署、软件性能测试、代码审查及全天候的技术运维支持。',
            learnMore: '了解详情',
        },
        // Why Us
        whyUs: {
            label: 'Why Choose Us',
            title: '为什么选择我们',
            subtitle: '以结果为导向的专业技术服务，让每一个项目都成为精品',
            items: [
                { title: '敏捷交付', desc: '采用 Scrum/Kanban 方法论，确保快速迭代与按时交付' },
                { title: '全栈能力', desc: '覆盖前端、后端、移动端、云原生的全技术栈解决方案' },
                { title: '安全合规', desc: '遵循国际安全标准，确保代码质量与数据安全' },
                { title: '7×24 运维', desc: '提供全天候技术支持，保障系统稳定运行' },
                { title: '国际视野', desc: '服务海内外客户，具备跨文化项目管理经验' },
                { title: '持续增长', desc: '助力客户实现数字化转型，驱动业务持续增长' },
            ],
        },
        // About
        about: {
            label: 'About Us',
            title: '关于我们',
            description:
                '我们是一家专注于 B2B 业务模式的科技咨询公司。通过敏捷开发与专业的技术团队，我们采用项目制交付和技术服务费的结算模式，为全球客户提供符合国际标准的技术闭环。',
            stat1Value: '10+',
            stat1Label: '年行业经验',
            stat2Value: '100%',
            stat2Label: '项目交付率',
            stat3Value: '7×24',
            stat3Label: '运维支持',
            stat4Value: '30+',
            stat4Label: '技术专家',
        },
        // Contact Form
        contactForm: {
            label: 'Get In Touch',
            title: '联系我们',
            subtitle: '填写下方表单，我们将在 24 小时内回复您',
            name: '您的姓名',
            namePlaceholder: '请输入您的姓名',
            email: '电子邮箱',
            emailPlaceholder: '请输入您的邮箱',
            company: '公司名称',
            companyPlaceholder: '请输入您的公司名称',
            phone: '联系电话',
            phonePlaceholder: '请输入您的联系电话',
            message: '项目描述',
            messagePlaceholder: '请描述您的项目需求、预算和时间计划...',
            submit: '发送咨询',
            sending: '发送中...',
            success: '消息已发送！我们会尽快与您联系。',
            infoTitle: '联系方式',
            emailLabel: '邮箱',
            addressLabel: '地址',
            address: '中国上海市',
        },
        // Footer
        footer: {
            ctaTitle1: '准备好启动您的',
            ctaHighlight: '下一个项目',
            ctaTitle2: '了吗？',
            ctaSubtitle: '联系我们，获取免费项目评估与技术咨询',
            ctaBtn: '发送邮件咨询',
            brand: '专业的 IT 技术咨询与定制化软件开发服务商，助力企业数字化转型。',
            contactTitle: '联系方式',
            navTitle: '快速导航',
            copyright:
                '© 2026 Shanghai Qixiang Business Consulting Co., Ltd. All rights reserved.',
        },
    },
    en: {
        nav: {
            home: 'Home',
            services: 'Services',
            about: 'About',
            contact: 'Contact',
            cta: 'Get Started',
        },
        hero: {
            badge: 'Professional IT Consulting & Custom Software Development',
            titleLine1: 'Custom IT Solutions',
            titleLine2: 'That Drive Innovation',
            subtitle:
                'Delivering high-quality IT outsourcing, software development, and architecture consulting services to enterprises worldwide, empowering digital transformation.',
            btnServices: 'Explore Our Services',
            btnContact: 'Contact Us',
            stat1Value: '50+',
            stat1Label: 'Enterprise Clients',
            stat2Value: '200+',
            stat2Label: 'Projects Delivered',
            stat3Value: '99.9%',
            stat3Label: 'System Uptime',
        },
        services: {
            label: 'Core Services',
            title: 'Our Services',
            subtitle: 'Technology-driven business value with end-to-end digital solutions',
            card1Title: 'Custom Software Development',
            card1Desc:
                'Modern web application development, PWA platform building, and cross-platform mobile development.',
            card2Title: 'Transaction System Architecture',
            card2Desc:
                'Full-stack development from underlying logic design to frontend delivery, supporting high-concurrency e-commerce and community trading platforms.',
            card3Title: 'IT Consulting & Operations',
            card3Desc:
                'System deployment, performance testing, code review, and 24/7 technical support for your global business.',
            learnMore: 'Learn More',
        },
        whyUs: {
            label: 'Why Choose Us',
            title: 'Why Choose Us',
            subtitle: 'Result-oriented professional tech services — every project is a masterpiece',
            items: [
                { title: 'Agile Delivery', desc: 'Scrum / Kanban methodology for fast iteration and on-time delivery' },
                { title: 'Full-Stack Expertise', desc: 'End-to-end coverage across frontend, backend, mobile, and cloud-native' },
                { title: 'Security & Compliance', desc: 'International security standards with rigorous code quality assurance' },
                { title: '24/7 Support', desc: 'Round-the-clock technical support to keep your systems running' },
                { title: 'Global Perspective', desc: 'Serving clients worldwide with cross-cultural project management' },
                { title: 'Growth-Oriented', desc: 'Empowering digital transformation and sustaining business growth' },
            ],
        },
        about: {
            label: 'About Us',
            title: 'About Us',
            description:
                'We are a B2B-focused technology consulting company. Through agile development and a professional team, we deliver project-based solutions with service-fee billing models, providing global clients with technology solutions that meet international standards.',
            stat1Value: '10+',
            stat1Label: 'Years Experience',
            stat2Value: '100%',
            stat2Label: 'Delivery Rate',
            stat3Value: '24/7',
            stat3Label: 'Support',
            stat4Value: '30+',
            stat4Label: 'Tech Experts',
        },
        contactForm: {
            label: 'Get In Touch',
            title: 'Contact Us',
            subtitle: 'Fill out the form below and we\'ll get back to you within 24 hours',
            name: 'Your Name',
            namePlaceholder: 'Enter your name',
            email: 'Email Address',
            emailPlaceholder: 'Enter your email',
            company: 'Company Name',
            companyPlaceholder: 'Enter your company name',
            phone: 'Phone Number',
            phonePlaceholder: 'Enter your phone number',
            message: 'Project Description',
            messagePlaceholder: 'Describe your project requirements, budget, and timeline...',
            submit: 'Send Inquiry',
            sending: 'Sending...',
            success: 'Message sent! We\'ll be in touch soon.',
            infoTitle: 'Contact Info',
            emailLabel: 'Email',
            addressLabel: 'Address',
            address: 'Shanghai, China',
        },
        footer: {
            ctaTitle1: 'Ready to Start',
            ctaHighlight: 'Your Next Project',
            ctaTitle2: '?',
            ctaSubtitle: 'Contact us for a free project evaluation and technical consultation',
            ctaBtn: 'Send Email Inquiry',
            brand:
                'Professional IT consulting and custom software development, empowering enterprise digital transformation.',
            contactTitle: 'Contact',
            navTitle: 'Quick Links',
            copyright:
                '© 2026 Shanghai Qixiang Business Consulting Co., Ltd. All rights reserved.',
        },
    },
}

const LangContext = createContext({ lang: 'zh', t: translations.zh, toggle: () => { } })

function LangProvider({ children }) {
    const [lang, setLang] = useState(() => {
        try {
            return localStorage.getItem('qx-lang') || 'zh'
        } catch {
            return 'zh'
        }
    })

    const toggle = () => {
        const next = lang === 'zh' ? 'en' : 'zh'
        setLang(next)
        try {
            localStorage.setItem('qx-lang', next)
        } catch { }
    }

    const t = translations[lang]

    return (
        <LangContext.Provider value={{ lang, t, toggle }}>
            {children}
        </LangContext.Provider>
    )
}

function useLang() {
    return useContext(LangContext)
}

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

    const links = [
        { label: t.nav.home, href: '#hero' },
        { label: t.nav.services, href: '#services' },
        { label: t.nav.about, href: '#about' },
        { label: t.nav.contact, href: '#contact' },
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
                <a href="#hero" className="flex items-center gap-2.5 group">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary-600 to-primary-700 shadow-md shadow-primary-500/25 transition-transform group-hover:scale-105">
                        <Layers className="h-5 w-5 text-white" strokeWidth={2.5} />
                    </div>
                    <span className="text-lg font-bold tracking-tight text-slate-800">
                        Qixiang <span className="font-medium text-slate-500">Consulting</span>
                    </span>
                </a>

                {/* Desktop Links */}
                <div className="hidden items-center gap-1 md:flex">
                    {links.map((l) => (
                        <a
                            key={l.href}
                            href={l.href}
                            className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
                        >
                            {l.label}
                        </a>
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

                    <a
                        href="#contact"
                        className="ml-3 inline-flex items-center gap-1.5 rounded-lg bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-primary-500/25 transition-all hover:bg-primary-700 hover:shadow-lg hover:shadow-primary-500/30 active:scale-[0.97]"
                    >
                        {t.nav.cta}
                        <ArrowRight className="h-4 w-4" />
                    </a>
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
                        <a
                            key={l.href}
                            href={l.href}
                            onClick={() => setOpen(false)}
                            className="block rounded-lg px-4 py-3 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900"
                        >
                            {l.label}
                        </a>
                    ))}
                    <a
                        href="#contact"
                        onClick={() => setOpen(false)}
                        className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-lg bg-primary-600 px-5 py-3 text-sm font-semibold text-white shadow-md shadow-primary-500/25 transition-all hover:bg-primary-700"
                    >
                        {t.nav.cta}
                        <ArrowRight className="h-4 w-4" />
                    </a>
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
                            <a
                                href="#services"
                                className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary-500/25 transition-all hover:bg-primary-700 hover:shadow-xl hover:shadow-primary-500/30 active:scale-[0.97] sm:w-auto"
                            >
                                {t.hero.btnServices}
                                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                            </a>
                            <a
                                href="#contact"
                                className="group inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white/80 backdrop-blur-sm px-7 py-3.5 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:border-slate-300 hover:bg-white hover:shadow-md active:scale-[0.97] sm:w-auto"
                            >
                                {t.hero.btnContact}
                                <ExternalLink className="h-4 w-4 text-slate-400 transition-transform group-hover:translate-x-0.5" />
                            </a>
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
const techStack = [
    'React', 'Node.js', 'TypeScript', 'Python', 'AWS', 'Docker',
    'PostgreSQL', 'Kubernetes', 'Next.js', 'GraphQL', 'Redis', 'MongoDB',
    'Vue.js', 'Java', 'Go', 'Nginx',
]

function TechMarquee() {
    const { lang } = useLang()
    // Double the list for seamless loop
    const items = [...techStack, ...techStack]

    return (
        <section className="overflow-hidden border-y border-slate-100 bg-white py-10">
            <p className="mb-6 text-center text-xs font-semibold uppercase tracking-widest text-slate-400">
                {lang === 'zh' ? '我们的技术栈' : 'Our Technology Stack'}
            </p>
            <div className="relative">
                {/* Fade edges */}
                <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-white to-transparent" />
                <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-white to-transparent" />
                {/* Scrolling row */}
                <div className="flex animate-[marquee_30s_linear_infinite] gap-6">
                    {items.map((name, i) => (
                        <span
                            key={`${name}-${i}`}
                            className="shrink-0 rounded-xl border border-slate-200 bg-slate-50 px-5 py-2.5 text-sm font-semibold text-slate-500 shadow-sm"
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
        { icon: Code, title: t.services.card1Title, description: t.services.card1Desc, color: 'primary', image: '/images/service-software.png' },
        { icon: ShoppingCart, title: t.services.card2Title, description: t.services.card2Desc, color: 'violet', image: '/images/service-ecommerce.png' },
        { icon: Settings, title: t.services.card3Title, description: t.services.card3Desc, color: 'emerald', image: '/images/service-consulting.png' },
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
                                        <div className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-primary-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                            {t.services.learnMore}
                                            <ArrowRight className="h-4 w-4" />
                                        </div>
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
   Contact Form Section
   ────────────────────────────────────────────── */
function ContactForm() {
    const { t } = useLang()
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
                                    {t.contactForm.label === 'Get In Touch' ? 'Let\'s Build Together' : '合作共赢'}
                                </h3>
                                <p className="mt-2 text-sm leading-relaxed text-primary-100">
                                    {t.contactForm.label === 'Get In Touch'
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
    const { t } = useLang()

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
                        <a
                            href="#contact"
                            className="mt-10 inline-flex items-center gap-2 rounded-xl bg-primary-600 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-primary-500/25 transition-all hover:bg-primary-500 hover:shadow-xl hover:shadow-primary-500/30 active:scale-[0.97]"
                        >
                            <Mail className="h-5 w-5" />
                            {t.footer.ctaBtn}
                        </a>
                    </Reveal>
                </div>
            </div>

            {/* Bottom Info */}
            <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
                <div className="grid gap-10 md:grid-cols-3">
                    {/* Brand */}
                    <div>
                        <div className="flex items-center gap-2.5">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600">
                                <Layers className="h-4 w-4 text-white" strokeWidth={2.5} />
                            </div>
                            <span className="text-base font-bold tracking-tight">
                                Qixiang <span className="font-medium text-slate-400">Consulting</span>
                            </span>
                        </div>
                        <p className="mt-4 text-sm leading-relaxed text-slate-400">
                            {t.footer.brand}
                        </p>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-widest text-slate-300">
                            {t.footer.contactTitle}
                        </h3>
                        <ul className="mt-4 space-y-3 text-sm text-slate-400">
                            <li className="flex items-start gap-3">
                                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary-400" />
                                <a href="mailto:contact@qixiang.com" className="hover:text-white transition-colors">contact@qixiang.com</a>
                            </li>
                            <li className="flex items-start gap-3">
                                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary-400" />
                                <span>{t.contactForm.address}</span>
                            </li>
                        </ul>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-widest text-slate-300">
                            {t.footer.navTitle}
                        </h3>
                        <ul className="mt-4 space-y-3 text-sm">
                            {[
                                { label: t.nav.home, href: '#hero' },
                                { label: t.nav.services, href: '#services' },
                                { label: t.nav.about, href: '#about' },
                                { label: t.nav.contact, href: '#contact' },
                            ].map((l) => (
                                <li key={l.href}>
                                    <a href={l.href} className="text-slate-400 transition-colors hover:text-white">
                                        {l.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="mt-12 border-t border-white/10 pt-8 text-center text-xs text-slate-500">
                    {t.footer.copyright}
                </div>
            </div>
        </footer>
    )
}

/* ──────────────────────────────────────────────
   App
   ────────────────────────────────────────────── */
export default function App() {
    return (
        <LangProvider>
            <div className="min-h-screen bg-white font-sans text-slate-900 antialiased">
                <Navbar />
                <Hero />
                <TechMarquee />
                <Services />
                <WhyUs />
                <About />
                <ContactForm />
                <Footer />
            </div>
        </LangProvider>
    )
}
