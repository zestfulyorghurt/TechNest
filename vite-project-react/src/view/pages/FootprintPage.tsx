import React, { useState } from 'react';
import { footprints, footprintStats, tagCloud } from '@/mock/FootprintPage.mock.data';
import '@/styles/FootprintPage.css';

const FootprintPage: React.FC = () => {
    const [activeFilter, setActiveFilter] = useState('全部');

    const levels = ['l0', 'l1', 'l2', 'l3', 'l4'];
    const heatmapCells = Array.from({ length: 371 }).map((_, i) => levels[Math.floor(Math.random() * 5)]);

    return (
        <div className="footprint-page">
            <header className="page-header">
                <h1>👣 我的 <span>足迹</span></h1>
                <p>记录你在 TechNest 的每一步成长</p>
            </header>

            <div className="stats-grid">
                {footprintStats.map((s) => (
                    <div key={s.label} className="stat-card">
                        <div className="stat-icon">{s.icon}</div>
                        <div className="stat-number">{s.num}</div>
                        <div className="stat-label">{s.label}</div>
                        <div className={`stat-change ${s.negative ? 'negative' : ''}`}>{s.change}</div>
                    </div>
                ))}
            </div>

            <div className="heatmap-section">
                <div className="section-header">
                    <div className="section-title">📊 贡献日历</div>
                    <div>
                        {['2026', '2025', '2024'].map((y, i) => (
                            <button key={y} className={`year-btn ${i === 0 ? 'active' : ''}`}>{y}</button>
                        ))}
                    </div>
                </div>
                <div className="heatmap-grid">
                    {heatmapCells.map((lvl, i) => (
                        <div key={i} className={`heatmap-cell ${lvl === 'l0' ? '' : lvl}`} />
                    ))}
                </div>
                <div className="heatmap-legend">
                    <span>少</span>
                    <div className="legend-colors">
                        <span className="color-block l0" />
                        <span className="color-block l1" />
                        <span className="color-block l2" />
                        <span className="color-block l3" />
                        <span className="color-block l4" />
                    </div>
                    <span>多</span>
                </div>
            </div>

            <div className="timeline-section">
                <div className="section-header">
                    <div className="section-title">⏳ 近期足迹</div>
                    <div className="timeline-filter">
                        {['全部', '文章', '评论', '点赞'].map((f) => (
                            <button key={f} className={`filter-btn ${activeFilter === f ? 'active' : ''}`} onClick={() => setActiveFilter(f)}>{f}</button>
                        ))}
                    </div>
                </div>
                <div className="timeline-list">
                    {footprints.map((f) => (
                        <div key={f.id} className="timeline-item">
                            <div className={`timeline-dot ${f.dot}`} />
                            <div className="timeline-content">
                                <div className="timeline-title">
                                    {f.title} {f.highlight && <span className="highlight">{f.highlight}</span>}
                                </div>
                                <div className="timeline-desc">{f.desc}</div>
                                <div className="timeline-meta">
                                    <span>📅 {f.time}</span>
                                    <span className={`tag ${f.tagColor ?? ''}`}>{f.tag}</span>
                                    <span>{f.extra}</span>
                                </div>
                            </div>
                            <div className="timeline-time">{f.ago}</div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bottom-grid">
                <div className="card">
                    <div className="card-title">🏷️ 我的标签云</div>
                    <div className="tag-cloud">
                        {tagCloud.map((t) => (
                            <span key={t.text} className={`tag-item size-${t.size}`}>{t.text}</span>
                        ))}
                    </div>
                    <div style={{ marginTop: 10, fontSize: 12, color: '#8a9aaa' }}>
                        标签大小反映使用频率，点击标签可查看相关文章
                    </div>
                </div>
                <div className="card">
                    <div className="card-title">📈 活动分布</div>
                    {[
                        { label: '发布文章', pct: '45%' },
                        { label: '发表评论', pct: '25%' },
                        { label: '点赞互动', pct: '20%' },
                        { label: '收藏文章', pct: '10%' },
                    ].map((d) => (
                        <div key={d.label} style={{ marginBottom: 12 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 4 }}>
                                <span>{d.label}</span>
                                <span style={{ color: '#8a9aaa' }}>{d.pct}</span>
                            </div>
                            <div style={{ height: 8, background: '#f0f2f5', borderRadius: 4, overflow: 'hidden' }}>
                                <div style={{ height: '100%', width: d.pct, background: 'linear-gradient(90deg,#4f6ef7,#7b61ff)', borderRadius: 4 }} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FootprintPage;
