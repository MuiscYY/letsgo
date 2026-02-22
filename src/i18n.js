import { useState, createElement, createContext, useContext } from 'react'

/* ══════════════════════════════════════════════
   Translations
   ══════════════════════════════════════════════ */
export const translations = {
    zh: {
        nav: {
            home: '首页',
            services: '核心服务',
            about: '关于我们',
            contact: '联系我们',
            cta: '立即咨询',
        },
        hero: {
            badge: '专业 IT 技术咨询与定制化软件开发服务商',
            titleLine1: '驱动业务创新的',
            titleLine2: '定制化 IT 解决方案',
            subtitle: '致力于为海内外企业客户提供高质量的 IT 技术外包、软件系统开发及架构咨询服务，助力企业数字化转型。',
            btnServices: '了解我们的服务',
            btnContact: '联系我们',
            stat1Value: '50+', stat1Label: '企业客户',
            stat2Value: '200+', stat2Label: '成功交付项目',
            stat3Value: '99.9%', stat3Label: '系统可用性',
        },
        services: {
            label: 'Core Services',
            title: '核心服务',
            subtitle: '以技术驱动商业价值，为您提供端到端的数字化解决方案',
            card1Title: '定制化软件开发',
            card1Desc: '涵盖现代 Web 应用开发、PWA（渐进式网页应用）平台搭建、以及跨平台移动端适配开发。',
            card2Title: '交易系统架构',
            card2Desc: '提供从底层逻辑设计到前端产品交付的全链路开发服务，支持高并发的电子商务与社区交易平台需求。',
            card3Title: 'IT 技术咨询与运维',
            card3Desc: '为客户的出海项目提供系统部署、软件性能测试、代码审查及全天候的技术运维支持。',
            learnMore: '了解详情',
        },
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
        about: {
            label: 'About Us',
            title: '关于我们',
            description: '我们是一家专注于 B2B 业务模式的科技咨询公司。通过敏捷开发与专业的技术团队，我们采用项目制交付和技术服务费的结算模式，为全球客户提供符合国际标准的技术闭环。',
            stat1Value: '10+', stat1Label: '年行业经验',
            stat2Value: '100%', stat2Label: '项目交付率',
            stat3Value: '7×24', stat3Label: '运维支持',
            stat4Value: '30+', stat4Label: '技术专家',
        },
        contactForm: {
            label: 'Get In Touch',
            title: '联系我们',
            subtitle: '填写下方表单，我们将在 24 小时内回复您',
            name: '您的姓名', namePlaceholder: '请输入您的姓名',
            email: '电子邮箱', emailPlaceholder: '请输入您的邮箱',
            company: '公司名称', companyPlaceholder: '请输入您的公司名称',
            phone: '联系电话', phonePlaceholder: '请输入您的联系电话',
            message: '项目描述', messagePlaceholder: '请描述您的项目需求、预算和时间计划...',
            submit: '发送咨询', sending: '发送中...',
            success: '消息已发送！我们会尽快与您联系。',
            infoTitle: '联系方式',
            emailLabel: '邮箱', addressLabel: '地址', address: '中国上海市',
        },
        footer: {
            ctaTitle1: '准备好启动您的', ctaHighlight: '下一个项目', ctaTitle2: '了吗？',
            ctaSubtitle: '联系我们，获取免费项目评估与技术咨询',
            ctaBtn: '发送邮件咨询',
            brand: '上海麒享商务咨询有限公司 — 专注于 B2B IT 技术咨询与定制化软件开发。我们为海内外企业提供全栈技术解决方案，涵盖 Web/移动端开发、交易系统架构、云原生部署与 7×24 运维支持。以敏捷交付和国际化标准，助力企业实现高效的数字化转型。',
            contactTitle: '联系方式', navTitle: '快速导航',
            copyright: '© 2026 Shanghai Qixiang Business Consulting Co., Ltd. All rights reserved.',
        },
        // Service Detail Pages
        servicePages: {
            backBtn: '← 返回首页',
            ctaTitle: '对此服务感兴趣？',
            ctaBtn: '立即咨询',
            software: {
                title: '定制化软件开发',
                subtitle: '从创意概念到产品落地，为您打造专属的数字化解决方案',
                heroDesc: '我们提供全流程的软件开发服务，涵盖需求分析、UI/UX 设计、前后端开发、测试部署及持续运维。无论是新产品从零到一，还是既有系统的现代化升级，我们都能提供专业可靠的技术支持。',
                features: [
                    { title: '现代 Web 应用', desc: '基于 React / Vue / Next.js 等主流框架，构建高性能、响应式的企业级 Web 应用平台，支持 SSR、CSR、ISR 等多种渲染策略。' },
                    { title: 'PWA 渐进式应用', desc: '打造接近原生体验的 Web 应用，支持离线访问、推送通知和桌面安装，降低多端开发成本的同时提升用户留存。' },
                    { title: '跨平台移动开发', desc: '采用 React Native / Capacitor 等跨平台方案，一套代码同时覆盖 iOS 和 Android，显著缩短开发周期并降低维护成本。' },
                    { title: '后端与 API 开发', desc: '使用 Node.js、Python、Java 等技术栈构建高可用的微服务架构和 RESTful / GraphQL API，支撑复杂业务逻辑。' },
                    { title: 'UI/UX 设计', desc: '以用户为中心的交互设计与视觉设计，通过用户调研、原型验证和 A/B 测试确保产品体验的优质和一致。' },
                    { title: 'DevOps 与 CI/CD', desc: '搭建自动化的持续集成/部署流水线，配合 Docker 容器化和 Kubernetes 编排，实现快速、安全、可靠的发布流程。' },
                ],
                process: [
                    { step: '01', title: '需求分析', desc: '深入理解业务目标，梳理功能需求与技术可行性' },
                    { step: '02', title: '架构设计', desc: '制定技术方案，选型评估，输出系统架构文档' },
                    { step: '03', title: '迭代开发', desc: '采用敏捷方法，两周一迭代，持续交付可用功能' },
                    { step: '04', title: '测试上线', desc: '全面的自动化测试与手动验收，确保质量后平稳上线' },
                ],
                techStack: ['React', 'Next.js', 'Vue.js', 'Node.js', 'TypeScript', 'Python', 'PostgreSQL', 'Redis', 'Docker', 'AWS'],
            },
            trading: {
                title: '交易系统架构',
                subtitle: '高可用、高并发的交易平台解决方案',
                heroDesc: '我们专注于电子商务与社区交易平台的全栈架构设计与开发。从底层数据库优化到前端用户体验，从支付流程安全到实时库存管理，提供经过实战检验的完整解决方案。',
                features: [
                    { title: '电商平台搭建', desc: '定制化的在线商城系统，支持多商户入驻、商品管理、订单处理、优惠促销等核心电商功能模块。' },
                    { title: '支付系统集成', desc: '集成支付宝、微信支付、Stripe 等主流支付渠道，保障交易安全并实现自动结算与对账。' },
                    { title: '高并发架构', desc: '基于微服务的分布式架构，结合消息队列、缓存策略和数据库分库分表，轻松应对流量洪峰。' },
                    { title: '实时数据处理', desc: '利用 WebSocket 和事件驱动架构实现实时库存更新、价格同步和订单状态推送。' },
                    { title: '风控与安全', desc: '多层安全防护体系，包含反欺诈检测、敏感数据加密、DDoS 防护和合规审计。' },
                    { title: '数据分析仪表盘', desc: '实时可视化的运营数据看板，涵盖销售分析、用户行为跟踪和库存预警等关键指标。' },
                ],
                process: [
                    { step: '01', title: '业务梳理', desc: '深入了解交易流程、用户角色和业务规则' },
                    { step: '02', title: '架构规划', desc: '设计高可用、可扩展的系统架构拓扑' },
                    { step: '03', title: '分阶段交付', desc: '核心交易链路优先，逐步扩展外围功能' },
                    { step: '04', title: '压测上线', desc: '全链路压力测试，确保系统性能达标后正式发布' },
                ],
                techStack: ['Java', 'Node.js', 'PostgreSQL', 'Redis', 'RabbitMQ', 'Elasticsearch', 'Docker', 'Kubernetes', 'Nginx', 'AWS'],
            },
            consulting: {
                title: 'IT 技术咨询与运维',
                subtitle: '为您的全球化业务提供全天候的技术保障',
                heroDesc: '我们为出海企业提供从技术咨询到日常运维的一站式服务。无论是系统架构评审、性能优化，还是 7×24 小时的故障响应，我们都以最高标准为您的业务保驾护航。',
                features: [
                    { title: '系统部署与迁移', desc: '提供云原生部署方案，支持 AWS、Azure、阿里云等主流平台，实现零停机的系统迁移与升级。' },
                    { title: '性能测试与优化', desc: '全方位的负载测试、压力测试和性能调优，找出并消除系统瓶颈，提升响应速度和吞吐量。' },
                    { title: '代码审查与重构', desc: '由资深工程师进行代码质量审查，识别技术债务并提供重构方案，提升代码可维护性和安全性。' },
                    { title: '7×24 运维监控', desc: '实时系统监控与告警，涵盖服务器健康、应用性能、日志分析，确保问题在影响用户前被发现和解决。' },
                    { title: '安全审计与合规', desc: '进行全面的安全漏洞扫描和渗透测试，帮助企业通过 GDPR、ISO 27001 等国际认证。' },
                    { title: '技术团队赋能', desc: '为客户团队提供技术培训、最佳实践分享和架构指导，帮助内部团队提升技术能力和开发效率。' },
                ],
                process: [
                    { step: '01', title: '现状评估', desc: '全面审查现有系统架构、代码质量和运维流程' },
                    { step: '02', title: '方案制定', desc: '针对痛点制定改进计划，明确优先级和里程碑' },
                    { step: '03', title: '实施优化', desc: '按计划逐步实施改进措施，每阶段交付可量化的成果' },
                    { step: '04', title: '持续运维', desc: '建立长期运维体系，提供持续的技术支持和优化建议' },
                ],
                techStack: ['AWS', 'Azure', 'Docker', 'Kubernetes', 'Terraform', 'Prometheus', 'Grafana', 'Nginx', 'Linux', 'Python'],
            },
        },
    },
    en: {
        nav: {
            home: 'Home', services: 'Services', about: 'About', contact: 'Contact', cta: 'Get Started',
        },
        hero: {
            badge: 'Professional IT Consulting & Custom Software Development',
            titleLine1: 'Custom IT Solutions', titleLine2: 'That Drive Innovation',
            subtitle: 'Delivering high-quality IT outsourcing, software development, and architecture consulting services to enterprises worldwide, empowering digital transformation.',
            btnServices: 'Explore Our Services', btnContact: 'Contact Us',
            stat1Value: '50+', stat1Label: 'Enterprise Clients',
            stat2Value: '200+', stat2Label: 'Projects Delivered',
            stat3Value: '99.9%', stat3Label: 'System Uptime',
        },
        services: {
            label: 'Core Services', title: 'Our Services',
            subtitle: 'Technology-driven business value with end-to-end digital solutions',
            card1Title: 'Custom Software Development',
            card1Desc: 'Modern web application development, PWA platform building, and cross-platform mobile development.',
            card2Title: 'Transaction System Architecture',
            card2Desc: 'Full-stack development from underlying logic design to frontend delivery, supporting high-concurrency e-commerce and community trading platforms.',
            card3Title: 'IT Consulting & Operations',
            card3Desc: 'System deployment, performance testing, code review, and 24/7 technical support for your global business.',
            learnMore: 'Learn More',
        },
        whyUs: {
            label: 'Why Choose Us', title: 'Why Choose Us',
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
            label: 'About Us', title: 'About Us',
            description: 'We are a B2B-focused technology consulting company. Through agile development and a professional team, we deliver project-based solutions with service-fee billing models, providing global clients with technology solutions that meet international standards.',
            stat1Value: '10+', stat1Label: 'Years Experience',
            stat2Value: '100%', stat2Label: 'Delivery Rate',
            stat3Value: '24/7', stat3Label: 'Support',
            stat4Value: '30+', stat4Label: 'Tech Experts',
        },
        contactForm: {
            label: 'Get In Touch', title: 'Contact Us',
            subtitle: 'Fill out the form below and we\'ll get back to you within 24 hours',
            name: 'Your Name', namePlaceholder: 'Enter your name',
            email: 'Email Address', emailPlaceholder: 'Enter your email',
            company: 'Company Name', companyPlaceholder: 'Enter your company name',
            phone: 'Phone Number', phonePlaceholder: 'Enter your phone number',
            message: 'Project Description', messagePlaceholder: 'Describe your project requirements, budget, and timeline...',
            submit: 'Send Inquiry', sending: 'Sending...',
            success: 'Message sent! We\'ll be in touch soon.',
            infoTitle: 'Contact Info',
            emailLabel: 'Email', addressLabel: 'Address', address: 'Shanghai, China',
        },
        footer: {
            ctaTitle1: 'Ready to Start', ctaHighlight: 'Your Next Project', ctaTitle2: '?',
            ctaSubtitle: 'Contact us for a free project evaluation and technical consultation',
            ctaBtn: 'Send Email Inquiry',
            brand: 'Shanghai Qixiang Business Consulting Co., Ltd. — A B2B technology consulting firm specializing in custom software development. We deliver full-stack solutions including Web/Mobile development, transaction system architecture, cloud-native deployment, and 24/7 operations support. Driving efficient digital transformation through agile delivery and international standards.',
            contactTitle: 'Contact', navTitle: 'Quick Links',
            copyright: '© 2026 Shanghai Qixiang Business Consulting Co., Ltd. All rights reserved.',
        },
        servicePages: {
            backBtn: '← Back to Home',
            ctaTitle: 'Interested in this service?',
            ctaBtn: 'Get Started',
            software: {
                title: 'Custom Software Development',
                subtitle: 'From concept to product — your dedicated digital solutions',
                heroDesc: 'We provide full-cycle software development services covering requirements analysis, UI/UX design, full-stack development, testing, deployment, and ongoing maintenance. Whether building from scratch or modernizing legacy systems, we deliver professional and reliable solutions.',
                features: [
                    { title: 'Modern Web Apps', desc: 'Enterprise-grade web applications built with React, Vue, Next.js with support for SSR, CSR, and ISR rendering strategies.' },
                    { title: 'Progressive Web Apps', desc: 'Near-native web experiences with offline access, push notifications, and installability — reducing multi-platform costs while improving retention.' },
                    { title: 'Cross-Platform Mobile', desc: 'Single codebase covering iOS and Android using React Native or Capacitor, significantly reducing development and maintenance costs.' },
                    { title: 'Backend & API', desc: 'Highly available microservice architectures and RESTful/GraphQL APIs built with Node.js, Python, and Java.' },
                    { title: 'UI/UX Design', desc: 'User-centered interaction and visual design validated through research, prototyping, and A/B testing.' },
                    { title: 'DevOps & CI/CD', desc: 'Automated CI/CD pipelines with Docker containerization and Kubernetes orchestration for fast, secure releases.' },
                ],
                process: [
                    { step: '01', title: 'Requirements', desc: 'Deep understanding of business goals, feature requirements, and technical feasibility' },
                    { step: '02', title: 'Architecture', desc: 'Technical planning, technology selection, and system architecture documentation' },
                    { step: '03', title: 'Development', desc: 'Agile sprints with bi-weekly iterations delivering working features' },
                    { step: '04', title: 'Launch', desc: 'Comprehensive testing and smooth production deployment' },
                ],
                techStack: ['React', 'Next.js', 'Vue.js', 'Node.js', 'TypeScript', 'Python', 'PostgreSQL', 'Redis', 'Docker', 'AWS'],
            },
            trading: {
                title: 'Transaction System Architecture',
                subtitle: 'High-availability, high-concurrency trading platform solutions',
                heroDesc: 'We specialize in full-stack architecture design and development for e-commerce and community trading platforms. From database optimization to frontend UX, from payment security to real-time inventory — battle-tested complete solutions.',
                features: [
                    { title: 'E-Commerce Platform', desc: 'Custom online marketplace systems with multi-vendor support, product management, order processing, and promotional features.' },
                    { title: 'Payment Integration', desc: 'Integration with Alipay, WeChat Pay, Stripe, and other payment gateways with secure auto-settlement and reconciliation.' },
                    { title: 'High-Concurrency', desc: 'Distributed microservice architecture with message queues, caching layers, and database sharding to handle traffic spikes.' },
                    { title: 'Real-Time Processing', desc: 'WebSocket and event-driven architecture for real-time inventory updates, price sync, and order status notifications.' },
                    { title: 'Risk & Security', desc: 'Multi-layered security with fraud detection, data encryption, DDoS protection, and compliance auditing.' },
                    { title: 'Analytics Dashboard', desc: 'Real-time operational dashboards covering sales analytics, user behavior tracking, and inventory alerts.' },
                ],
                process: [
                    { step: '01', title: 'Business Analysis', desc: 'Understanding transaction flows, user roles, and business rules' },
                    { step: '02', title: 'Architecture Design', desc: 'Designing highly available and scalable system topology' },
                    { step: '03', title: 'Phased Delivery', desc: 'Core transaction chain first, then expanding peripheral features' },
                    { step: '04', title: 'Load Testing', desc: 'Full-chain stress testing before production launch' },
                ],
                techStack: ['Java', 'Node.js', 'PostgreSQL', 'Redis', 'RabbitMQ', 'Elasticsearch', 'Docker', 'Kubernetes', 'Nginx', 'AWS'],
            },
            consulting: {
                title: 'IT Consulting & Operations',
                subtitle: '24/7 technical support for your global business',
                heroDesc: 'We provide end-to-end services from technical consulting to daily operations for enterprises going global. Whether it\'s architecture review, performance optimization, or 24/7 incident response — we uphold the highest standards.',
                features: [
                    { title: 'Deployment & Migration', desc: 'Cloud-native deployment solutions on AWS, Azure, and Alibaba Cloud with zero-downtime migration and upgrades.' },
                    { title: 'Performance Testing', desc: 'Comprehensive load testing, stress testing, and optimization — identifying bottlenecks to improve response time and throughput.' },
                    { title: 'Code Review & Refactoring', desc: 'Senior engineer code quality reviews, technical debt identification, and refactoring plans for better maintainability.' },
                    { title: '24/7 Monitoring', desc: 'Real-time system monitoring covering server health, application performance, and log analysis.' },
                    { title: 'Security Audit', desc: 'Comprehensive vulnerability scanning and penetration testing, helping achieve GDPR, ISO 27001 certifications.' },
                    { title: 'Team Enablement', desc: 'Technical training, best practice sharing, and architecture guidance to level up your internal team.' },
                ],
                process: [
                    { step: '01', title: 'Assessment', desc: 'Comprehensive review of existing architecture, code quality, and processes' },
                    { step: '02', title: 'Planning', desc: 'Targeted improvement plan with clear priorities and milestones' },
                    { step: '03', title: 'Implementation', desc: 'Phased improvements with measurable deliverables at each stage' },
                    { step: '04', title: 'Operations', desc: 'Long-term operational support with continuous optimization' },
                ],
                techStack: ['AWS', 'Azure', 'Docker', 'Kubernetes', 'Terraform', 'Prometheus', 'Grafana', 'Nginx', 'Linux', 'Python'],
            },
        },
    },
}

/* ══════════════════════════════════════════════
   Context
   ══════════════════════════════════════════════ */
const LangContext = createContext({ lang: 'zh', t: translations.zh, toggle: () => { } })

export function LangProvider({ children }) {
    const [lang, setLang] = useState(() => {
        try { return localStorage.getItem('qx-lang') || 'zh' } catch { return 'zh' }
    })

    const toggle = () => {
        const next = lang === 'zh' ? 'en' : 'zh'
        setLang(next)
        try { localStorage.setItem('qx-lang', next) } catch { }
    }

    return createElement(LangContext.Provider, { value: { lang, t: translations[lang], toggle } }, children)
}

export function useLang() {
    return useContext(LangContext)
}
