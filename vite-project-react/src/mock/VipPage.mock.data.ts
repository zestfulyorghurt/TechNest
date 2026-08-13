// ================================================================
// VipPage（VIP会员页）假数据
// ================================================================

export interface PricingPlan {
    id: string;
    icon: string;
    name: string;
    price: number;
    period: string;
    desc: string;
    popular?: boolean;
    features: { text: string; included: boolean }[];
}

export interface BenefitRow {
    label: string;
    values: string[];
    highlight?: boolean;
}

export interface FaqItem {
    question: string;
    answer: string;
}

export const vipStatus = {
    title: '年度会员 · 已开通',
    detail: '开通日期：2026-01-01 | 到期日期：2026-12-31',
    expire: '⚠️ 距离到期不足 7 天，请及时续费',
};

export const pricingPlans: PricingPlan[] = [
    {
        id: 'monthly',
        icon: '📅',
        name: '月度会员',
        price: 29,
        period: '/ 月',
        desc: '适合短期体验或临时需要',
        features: [
            { text: '查看付费文章', included: true },
            { text: '下载源码附件', included: true },
            { text: '上传文件 50MB', included: true },
            { text: '博客置顶 1 篇', included: true },
            { text: '专属 VIP 标识', included: false },
            { text: '优先审核通道', included: false },
        ],
    },
    {
        id: 'yearly',
        icon: '⭐',
        name: '年度会员',
        price: 99,
        period: '/ 年',
        desc: '性价比最高，省心一整年',
        popular: true,
        features: [
            { text: '查看付费文章', included: true },
            { text: '下载源码附件', included: true },
            { text: '上传文件 100MB', included: true },
            { text: '博客置顶 3 篇', included: true },
            { text: '专属 VIP 标识', included: true },
            { text: '优先审核通道', included: true },
        ],
    },
    {
        id: 'lifetime',
        icon: '🌟',
        name: '终身会员',
        price: 299,
        period: '/ 终身',
        desc: '一次付费，永久享受全部特权',
        features: [
            { text: '查看付费文章', included: true },
            { text: '下载源码附件', included: true },
            { text: '上传文件 200MB', included: true },
            { text: '博客置顶 5 篇', included: true },
            { text: '专属 VIP 标识', included: true },
            { text: '优先审核通道', included: true },
            { text: '专属客服支持', included: true },
        ],
    },
];

export const benefitRows: BenefitRow[] = [
    { label: '查看付费文章', values: ['✗', '✓', '✓', '✓'] },
    { label: '下载源码附件', values: ['✗', '✓', '✓', '✓'] },
    { label: '上传文件大小限制', values: ['10MB', '50MB', '100MB', '200MB'] },
    { label: '博客置顶数量', values: ['0 篇', '1 篇', '3 篇', '5 篇'] },
    { label: '专属 VIP 标识', values: ['✗', '✗', '✓', '✓'] },
    { label: '优先审核通道', values: ['✗', '✗', '✓', '✓'] },
    { label: '专属客服支持', values: ['✗', '✗', '✗', '✓'] },
    { label: '年度价格', values: ['免费', '¥348', '¥99', '¥299'], highlight: true },
];

export const faqItems: FaqItem[] = [
    {
        question: 'VIP 会员有哪些特权？',
        answer: 'VIP 会员可以查看付费文章、下载源码附件、获得更大的上传空间（最高 200MB）、更多博客置顶名额、专属 VIP 标识、优先审核通道以及专属客服支持。',
    },
    {
        question: '开通 VIP 后可以随时取消吗？',
        answer: '可以。您可以在个人中心的「VIP 信息」页面中取消自动续费。月度/年度会员在有效期内仍可享受全部权益，到期后自动降级为普通用户。',
    },
    {
        question: '年度会员和终身会员哪个更划算？',
        answer: '如果您是长期用户，终身会员最划算（一次付费永久使用）。如果您想先体验，年度会员性价比最高（¥99/年）。',
    },
    {
        question: 'VIP 会员可以转让给他人吗？',
        answer: 'VIP 会员与账号绑定，不支持转让给其他账号。如需帮助，请联系客服。',
    },
];
