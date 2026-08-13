import React from 'react';
import { myBlogs, myBlogStats } from '@/mock/MyBlogsPage.mock.data';
import '@/styles/AdminPages.css';

const MyBlogsPage: React.FC = () => {
    return (
        <div className="admin-page">
            <div className="page-header">
                <div className="title-group">
                    <h1>📝 我的博客</h1>
                    <div className="subtitle">管理你发布的所有文章</div>
                </div>
                <div className="header-actions">
                    <button className="btn-secondary" onClick={() => alert('刷新列表')}>🔄 刷新</button>
                    <button className="btn-primary" onClick={() => alert('跳转至写博客页面')}>✏️ 写新博客</button>
                </div>
            </div>

            <div className="stats-grid">
                {myBlogStats.map((s) => (
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
                        <input type="text" placeholder="搜索标题..." style={{ flex: 1 }} />
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
                                <th style={{ minWidth: 220 }}>标题</th>
                                <th>分类</th>
                                <th>状态</th>
                                <th>发布时间</th>
                                <th>阅读</th>
                                <th>点赞</th>
                                <th style={{ minWidth: 200 }}>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            {myBlogs.map((b) => (
                                <tr key={b.id}>
                                    <td><input type="checkbox" /></td>
                                    <td><span className="blog-title" onClick={() => alert('跳转至文章详情页')}>{b.title}</span></td>
                                    <td>{b.category}</td>
                                    <td><span className={`status-badge ${b.status}`}><span className="status-dot" />{b.statusText}</span></td>
                                    <td>{b.publishTime}</td>
                                    <td>{b.views.toLocaleString()}</td>
                                    <td>{b.likes}</td>
                                    <td>
                                        <div className="action-group">
                                            <button className="btn-sm btn-edit">编辑</button>
                                            <button className="btn-sm btn-view">查看</button>
                                            <button className="btn-sm btn-top">{b.top ? '已置顶' : '置顶'}</button>
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

export default MyBlogsPage;
