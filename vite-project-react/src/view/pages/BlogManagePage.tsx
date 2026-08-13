import React from 'react';
import { blogStats, manageBlogs } from '@/mock/BlogManagePage.mock.data';
import '@/styles/AdminPages.css';

const BlogManagePage: React.FC = () => {
    return (
        <div className="admin-page">
            <div className="page-header">
                <div className="title-group">
                    <h1>📋 博客管理</h1>
                    <div className="subtitle">管理全站所有博客 · 审核 · 状态管控</div>
                </div>
                <div className="header-actions">
                    <span className="admin-badge">🔑 管理员</span>
                    <button className="btn-secondary" onClick={() => alert('刷新列表')}>🔄 刷新</button>
                    <button className="btn-primary" onClick={() => alert('导出数据')}>导出数据</button>
                </div>
            </div>

            <div className="stats-grid">
                {blogStats.map((s) => (
                    <div key={s.label} className="stat-card">
                        <div className="stat-label"><span className={`stat-dot ${s.dot}`} />{s.label}</div>
                        <div className="stat-number">{s.value}</div>
                    </div>
                ))}
            </div>

            <div className="filter-bar">
                <div className="filter-row">
                    <div className="filter-group" style={{ flex: 2 }}>
                        <label>🔍</label>
                        <input type="text" placeholder="标题 / 作者昵称 / 作者ID" style={{ flex: 1 }} />
                    </div>
                    <div className="filter-group">
                        <label>状态</label>
                        <select><option value="">全部状态</option><option>待审核</option><option>已通过</option><option>已打回</option><option>草稿</option></select>
                    </div>
                    <div className="filter-actions">
                        <button className="btn-search">检索</button>
                        <button className="btn-reset">重置</button>
                    </div>
                </div>
            </div>

            <div className="table-container">
                <div className="table-header">
                    <div className="table-title">博客列表 <span className="count">共 42 篇</span></div>
                    <button className="btn-secondary" style={{ padding: '4px 12px', fontSize: 12 }}>📋 批量操作</button>
                </div>
                <div className="table-wrap">
                    <table>
                        <thead>
                            <tr>
                                <th style={{ width: 30 }}><input type="checkbox" /></th>
                                <th style={{ minWidth: 200 }}>博客标题</th>
                                <th>作者</th>
                                <th>状态</th>
                                <th>发布时间</th>
                                <th>浏览</th>
                                <th style={{ minWidth: 180 }}>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            {manageBlogs.map((b) => (
                                <tr key={b.id}>
                                    <td><input type="checkbox" /></td>
                                    <td><span className="blog-title" onClick={() => alert('跳转至前台详情页')}>{b.title}</span></td>
                                    <td>
                                        <div className="author-info">
                                            <div className="author-avatar" style={{ background: b.author.bg }}>{b.author.avatar}</div>
                                            <div>
                                                <div className="author-name">{b.author.name}</div>
                                                <div className="author-id">{b.author.id}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td><span className={`status-badge ${b.status}`}><span className="status-dot" />{b.statusText}</span></td>
                                    <td>{b.publishTime}</td>
                                    <td>{b.views.toLocaleString()}</td>
                                    <td>
                                        <div className="action-group">
                                            <button className="btn-sm btn-view">详情</button>
                                            {b.status === 'pending' ? <button className="btn-sm btn-audit">审核</button> : <button className="btn-sm btn-edit">编辑</button>}
                                            <button className="btn-sm btn-delete">删除</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="pagination">
                    <span>显示 1-5 条，共 42 条</span>
                    <span>‹ 1 2 3 ... 9 ›</span>
                </div>
            </div>
        </div>
    );
};

export default BlogManagePage;
