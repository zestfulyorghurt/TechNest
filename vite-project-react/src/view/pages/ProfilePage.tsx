import React, { useState } from 'react';
import { columns, following, miniStats, profile, profileTabs, recentArticles } from '@/mock/ProfilePage.mock.data';
import '@/styles/ProfilePage.css';

const ProfilePage: React.FC = () => {
    const [activeTab, setActiveTab] = useState('recent');

    const showArticles = activeTab === 'recent' || activeTab === 'articles';
    const showColumns = activeTab === 'recent' || activeTab === 'columns';
    const showFollow = activeTab === 'follow';

    return (
        <div className="profile-container">
            {/* 左侧个人信息卡片 */}
            <aside className="profile-card">
                <div className="avatar-section">
                    <div className="avatar">{profile.avatar}</div>
                    <div className="display-name">
                        {profile.name}
                        <span className="level-tag">{profile.level}</span>
                    </div>
                    <div className="user-status">{profile.status}{profile.isVip && <span className="badge">VIP</span>}</div>
                    <button className="edit-btn" onClick={() => alert('跳转至编辑资料页')}>✎ 编辑资料</button>
                </div>

                <div className="stats-row">
                    {profile.stats.map((s) => (
                        <div key={s.label} className="stat-item">
                            <span className="num">{s.num}</span>
                            <span className="label">{s.label}</span>
                        </div>
                    ))}
                </div>

                <div className="info-list">
                    {profile.info.map((i) => (
                        <div key={i.label} className="info-item">
                            <span className="label">{i.label}</span>
                            <span className="value">{i.value}</span>
                        </div>
                    ))}
                    <div className="info-item"><span className="label" /><span className="detail-link">查看详细资料 ›</span></div>
                </div>

                <div className="achievement-section">
                    <div className="section-title">🏆 个人成就</div>
                    {profile.achievements.map((a) => (
                        <div key={a.text} className="achieve-item">
                            <span className="achieve-icon">{a.icon}</span>{a.text}
                        </div>
                    ))}
                </div>

                <div className="force-section">
                    <div className="force-item"><span className="force-label">原力等级</span><span className="force-num">已失效</span></div>
                    <div className="force-item"><span className="force-label">原力分</span><span className="force-num">本月获得</span></div>
                    <div>
                        <span className="force-tag">2</span>
                        <span className="force-tag" style={{ background: '#e8edfe', color: '#4f6ef7' }}>153</span>
                        <span className="force-tag">0</span>
                    </div>
                </div>
            </aside>

            {/* 右侧内容区域 */}
            <main className="profile-content">
                <div className="content-tabs">
                    {profileTabs.map((t) => (
                        <button key={t.key} className={`tab-btn ${activeTab === t.key ? 'active' : ''}`} onClick={() => setActiveTab(t.key)}>
                            {t.label}
                        </button>
                    ))}
                </div>

                {activeTab === 'recent' && (
                    <div className="stats-mini-grid">
                        {miniStats.map((s) => (
                            <div key={s.label} className="mini-stat">
                                <span className="num">{s.num}</span>
                                <span className="label">{s.label}</span>
                            </div>
                        ))}
                    </div>
                )}

                {showArticles && (
                    <div className="content-card">
                        <div className="card-header">
                            <span className="card-title">📄 {activeTab === 'recent' ? '最近文章' : `全部文章（${recentArticles.length}篇）`}</span>
                            <span className="card-more">更多 ›</span>
                        </div>
                        {recentArticles.map((a) => (
                            <div key={a.id} className="article-item" onClick={() => alert('跳转至文章详情')}>
                                <div>
                                    <div className="article-title">{a.title}</div>
                                    <div className="article-meta">{a.meta}<span className="tag">{a.tag}</span></div>
                                </div>
                                <div className="article-right">{a.views}阅读</div>
                            </div>
                        ))}
                    </div>
                )}

                {showColumns && (
                    <div className="content-card">
                        <div className="card-header">
                            <span className="card-title">📚 {activeTab === 'recent' ? "TA的专栏" : `全部专栏（${columns.length}个）`}</span>
                            <span className="card-more">更多 ›</span>
                        </div>
                        {columns.map((c) => (
                            <div key={c.id} className="column-item" onClick={() => alert('跳转至专栏详情')}>
                                <div className="column-icon">{c.icon}</div>
                                <div className="column-info">
                                    <div className="column-name">{c.name}</div>
                                    <div className="column-meta">{c.meta}</div>
                                </div>
                                <div className="column-count">{c.count}</div>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 'favorites' && (
                    <div className="content-card">
                        <div className="card-header">
                            <span className="card-title">⭐ 我的收藏（12篇）</span>
                            <span className="card-more">排序 ›</span>
                        </div>
                        {recentArticles.map((a) => (
                            <div key={a.id} className="article-item" onClick={() => alert('跳转至文章详情')}>
                                <div>
                                    <div className="article-title">{a.title}</div>
                                    <div className="article-meta">作者：张三 · 2026-08-02 · {a.views}阅读</div>
                                </div>
                                <div className="article-right">❤️ 128</div>
                            </div>
                        ))}
                    </div>
                )}

                {showFollow && (
                    <div className="content-card">
                        <div className="card-header">
                            <span className="card-title">👥 我关注的人（22人）</span>
                            <span className="card-more">管理 ›</span>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 }}>
                            {following.map((f) => (
                                <div key={f.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px', background: '#f8f9fa', borderRadius: 8, border: '1px solid #eef2f7' }}>
                                    <div style={{ width: 32, height: 32, borderRadius: '50%', background: f.bg, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 600 }}>{f.avatar}</div>
                                    <div>
                                        <div style={{ fontSize: 13, fontWeight: 500 }}>{f.name}</div>
                                        <div style={{ fontSize: 11, color: '#8a9aaa' }}>{f.fans}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default ProfilePage;
