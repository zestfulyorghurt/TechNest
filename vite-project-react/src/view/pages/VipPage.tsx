import React, { useState } from 'react';
import { benefitRows, faqItems, pricingPlans, vipStatus } from '@/mock/VipPage.mock.data';
import '@/styles/VipPage.css';

const VipPage: React.FC = () => {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const handleSelect = (planName: string, price: number, period: string) => {
        alert(`📦 正在跳转至支付页面...\n\n套餐：${planName}\n价格：¥${price}${period}`);
    };

    return (
        <div className="vip-page">
            <header className="vip-header">
                <div className="vip-icon">👑</div>
                <h1>TechNest <span>VIP</span> 会员</h1>
                <p>解锁全部特权，享受更优质的技术社区体验</p>
            </header>

            <div className="vip-status-card">
                <div className="status-left">
                    <div className="status-icon">🎉</div>
                    <div className="status-info">
                        <div className="status-title">{vipStatus.title}</div>
                        <div className="status-detail">{vipStatus.detail}</div>
                        <div className="status-expire">{vipStatus.expire}</div>
                    </div>
                </div>
                <div className="status-right">
                    <button className="btn-renew" onClick={() => alert('🔄 跳转至续费页面')}>续费</button>
                    <button className="btn-upgrade" onClick={() => alert('📈 跳转至升级套餐页面')}>升级套餐</button>
                </div>
            </div>

            <div className="pricing-grid">
                {pricingPlans.map((plan) => (
                    <div key={plan.id} className={`pricing-card ${plan.popular ? 'popular' : ''}`}>
                        {plan.popular && <div className="popular-badge">🔥 最受欢迎</div>}
                        <div className="plan-icon">{plan.icon}</div>
                        <div className="plan-name">{plan.name}</div>
                        <div className="plan-price">
                            <span className="currency">¥</span>{plan.price}<span className="period">{plan.period}</span>
                        </div>
                        <div className="plan-desc">{plan.desc}</div>
                        <div className="plan-features">
                            {plan.features.map((f) => (
                                <div key={f.text} className="feature-item">
                                    <span className={f.included ? 'check' : 'cross'}>{f.included ? '✓' : '✗'}</span>
                                    {f.text}
                                </div>
                            ))}
                        </div>
                        <button
                            className={`btn-select ${plan.popular ? 'btn-vip' : plan.id === 'lifetime' ? 'btn-primary' : 'btn-outline'}`}
                            onClick={() => handleSelect(plan.name, plan.price, plan.period)}
                        >
                            {plan.popular ? '立即开通' : '选择套餐'}
                        </button>
                    </div>
                ))}
            </div>

            <div className="benefits-section">
                <div className="section-title">📊 权益详细对比</div>
                <div className="table-wrap">
                    <table className="benefits-table">
                        <thead>
                            <tr>
                                <th>权益项</th>
                                <th>普通用户</th>
                                <th>月度会员</th>
                                <th>年度会员</th>
                                <th>终身会员</th>
                            </tr>
                        </thead>
                        <tbody>
                            {benefitRows.map((row) => (
                                <tr key={row.label} className={row.highlight ? 'highlight-row' : ''}>
                                    <td>{row.label === '年度价格' ? <strong>{row.label}</strong> : row.label}</td>
                                    {row.values.map((v, i) => (
                                        <td key={i}>
                                            {v === '✓' ? <span className="icon-check">✓</span> : v === '✗' ? <span className="icon-cross">✗</span> : row.highlight && i === 2 ? <strong>{v}</strong> : v}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="faq-section">
                <div className="section-title">❓ 常见问题</div>
                {faqItems.map((faq, i) => (
                    <div key={faq.question} className="faq-item" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                        <div className="faq-question">
                            <span>{faq.question}</span>
                            <span className="faq-arrow">{openFaq === i ? '▲' : '▼'}</span>
                        </div>
                        <div className={`faq-answer ${openFaq === i ? 'open' : ''}`}>{faq.answer}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VipPage;
