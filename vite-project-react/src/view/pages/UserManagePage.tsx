import React from 'react';
import { manageUsers, userStats } from '@/mock/UserManagePage.mock.data';
import '@/styles/AdminPages.css';

const UserManagePage: React.FC = () => {
    return (
        <div className="admin-page">
            <div className="page-header">
                <div className="title-group">
                    <h1>👤 用户管理</h1>
                    <div className="subtitle">管理全站所有用户 · 权限 · 状态管控</div>
                </div>
                <div className="header-actions">
                    <span className="admin-badge">🔑 管理员</span>
                    <button className="btn-secondary" onClick={() => alert('刷新列表')}>🔄 刷新</button>
                    <button className="btn-primary" onClick={() => alert('添加用户')}>＋ 添加用户</button>
                </div>
            </div>

            <div className="stats-grid">
                {userStats.map((s) => (
                    <div key={s.label} className="stat-card">
                        <div className="stat-label">{s.dot ? <span className={`stat-dot ${s.dot}`} /> : null}{s.label}</div>
                        <div className="stat-number">{s.value}</div>
                        <div className={`stat-change ${s.negative ? 'negative' : ''}`}>{s.change}</div>
                    </div>
                ))}
            </div>

            <div className="filter-bar">
                <div className="filter-row">
                    <div className="filter-group" style={{ flex: 2 }}>
                        <label>🔍</label>
                        <input type="text" placeholder="昵称 / 手机号 / 邮箱 / 用户ID" style={{ flex: 1 }} />
                    </div>
                    <div className="filter-group">
                        <label>角色</label>
                        <select><option value="">全部角色</option><option>管理员</option><option>VIP 用户</option><option>普通用户</option></select>
                    </div>
                    <div className="filter-group">
                        <label>状态</label>
                        <select><option value="">全部状态</option><option>活跃</option><option>已停用</option></select>
                    </div>
                    <div className="filter-actions">
                        <button className="btn-search">检索</button>
                        <button className="btn-reset">重置</button>
                    </div>
                </div>
            </div>

            <div className="table-container">
                <div className="table-header">
                    <div className="table-title">用户列表 <span className="count">共 1,284 人</span></div>
                    <button className="btn-secondary" style={{ padding: '4px 12px', fontSize: 12 }}>📋 批量操作</button>
                </div>
                <div className="table-wrap">
                    <table>
                        <thead>
                            <tr>
                                <th style={{ width: 30 }}><input type="checkbox" /></th>
                                <th style={{ minWidth: 180 }}>用户</th>
                                <th>手机号</th>
                                <th>邮箱</th>
                                <th>角色</th>
                                <th>状态</th>
                                <th>注册时间</th>
                                <th style={{ minWidth: 200 }}>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            {manageUsers.map((u) => (
                                <tr key={u.id}>
                                    <td><input type="checkbox" /></td>
                                    <td>
                                        <div className="user-info">
                                            <div className="user-avatar" style={{ background: u.bg }}>{u.avatar}</div>
                                            <div>
                                                <div className="user-name">{u.name}</div>
                                                <div className="user-id">{u.userId}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{u.phone}</td>
                                    <td>{u.email}</td>
                                    <td><span className={`role-badge ${u.role}`}><span className="role-dot" />{u.roleText}</span></td>
                                    <td><span className={`status-badge ${u.status}`}><span className="status-dot" />{u.statusText}</span></td>
                                    <td>{u.registerTime}</td>
                                    <td>
                                        <div className="action-group">
                                            <button className="btn-sm btn-view">详情</button>
                                            <button className="btn-sm btn-edit">编辑</button>
                                            <button className="btn-sm btn-ban">停用</button>
                                            <button className="btn-sm btn-delete">删除</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="pagination">
                    <span>显示 1-5 人，共 1,284 人</span>
                    <span>‹ 1 2 3 ... 257 ›</span>
                </div>
            </div>
        </div>
    );
};

export default UserManagePage;
