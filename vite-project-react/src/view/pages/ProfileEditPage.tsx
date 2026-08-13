import React, { useState } from 'react';
import { initialProfile, provinceOptions, securityItems } from '@/mock/ProfileEditPage.mock.data';
import '@/styles/ProfileEditPage.css';

const ProfileEditPage: React.FC = () => {
    const [nickname, setNickname] = useState(initialProfile.nickname);
    const [birthday, setBirthday] = useState(initialProfile.birthday);
    const [occupation, setOccupation] = useState(initialProfile.occupation);
    const [province, setProvince] = useState(initialProfile.province);
    const [bio, setBio] = useState(initialProfile.bio);
    const [tags, setTags] = useState(initialProfile.tags);
    const [tagInput, setTagInput] = useState('');

    const addTag = () => {
        const t = tagInput.trim();
        if (!t) return;
        if (tags.length >= 10) { alert('最多添加 10 个标签'); return; }
        if (tags.includes(t)) { alert('标签已存在'); return; }
        setTags([...tags, t]);
        setTagInput('');
    };

    const removeTag = (t: string) => setTags(tags.filter((x) => x !== t));

    const saveProfile = () => {
        if (nickname.length < 2 || nickname.length > 12) {
            alert('昵称长度为 2-12 个字符');
            return;
        }
        alert('✅ 资料已保存成功！');
    };

    return (
        <div className="profile-edit-page">
            <header className="page-header">
                <div>
                    <h1>✎ 编辑资料</h1>
                    <div className="subtitle">管理你的个人信息和账户设置</div>
                </div>
                <div className="header-actions">
                    <button className="btn-secondary" onClick={() => alert('已取消编辑')}>取消</button>
                    <button className="btn-primary" onClick={saveProfile}>保存修改</button>
                </div>
            </header>

            <div className="card">
                <div className="card-title">👤 头像</div>
                <div className="avatar-upload">
                    <div className="avatar-preview">张</div>
                    <div className="avatar-actions">
                        <button className="btn-upload" onClick={() => alert('选择头像文件')}>上传新头像</button>
                        <button className="btn-remove" onClick={() => alert('确认移除头像？')}>移除头像</button>
                        <span className="hint">建议尺寸 200x200px，支持 JPG/PNG</span>
                    </div>
                </div>
            </div>

            <div className="card">
                <div className="card-title">📋 基本信息</div>
                <div className="form-row">
                    <div className="form-group">
                        <label>昵称 <span className="required">*</span></label>
                        <div className="input-wrap"><input value={nickname} onChange={(e) => setNickname(e.target.value)} placeholder="2-12个字符" /></div>
                        <div className="help-text">2-12 个字符，支持中英文、数字、下划线</div>
                    </div>
                    <div className="form-group">
                        <label>生日</label>
                        <div className="input-wrap"><input type="date" value={birthday} onChange={(e) => setBirthday(e.target.value)} /></div>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <label>职业</label>
                        <div className="input-wrap"><input value={occupation} onChange={(e) => setOccupation(e.target.value)} placeholder="如：前端工程师" /></div>
                    </div>
                    <div className="form-group">
                        <label>居住地</label>
                        <div className="input-wrap">
                            <select value={province} onChange={(e) => setProvince(e.target.value)}>
                                {provinceOptions.map((p) => <option key={p} value={p}>{p}</option>)}
                            </select>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label>个人简介</label>
                    <div className="input-wrap"><textarea value={bio} onChange={(e) => setBio(e.target.value)} placeholder="简单介绍一下自己..." /></div>
                    <div className="help-text">最多 200 个字符</div>
                </div>
            </div>

            <div className="card">
                <div className="card-title">🏷️ 技术标签</div>
                <div className="tag-group">
                    {tags.map((t) => (
                        <span key={t} className="tag">{t} <button className="tag-remove" onClick={() => removeTag(t)}>×</button></span>
                    ))}
                    <div className="tag-input-wrap">
                        <input value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && addTag()} placeholder="添加标签..." />
                        <button className="btn-add-tag" onClick={addTag}>添加</button>
                    </div>
                </div>
                <div className="help-text">输入标签后按 Enter 或点击「添加」按钮，最多 10 个</div>
            </div>

            <div className="card">
                <div className="card-title">📞 联系方式</div>
                <div className="form-group">
                    <label>手机号</label>
                    <div className="input-wrap">
                        <span className="input-prefix">+86</span>
                        <input value={initialProfile.phone} readOnly />
                        <span className="input-suffix">已验证</span>
                    </div>
                    <div className="help-text">手机号已验证，如需修改请前往账号安全</div>
                </div>
                <div className="form-group">
                    <label>邮箱</label>
                    <div className="input-wrap"><input defaultValue={initialProfile.email} /></div>
                    <div className="help-text">用于接收通知和找回密码</div>
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                    <label>GitHub</label>
                    <div className="input-wrap">
                        <span className="input-prefix">github.com/</span>
                        <input defaultValue={initialProfile.github} />
                    </div>
                </div>
            </div>

            <div className="card">
                <div className="card-title">🔐 账号安全</div>
                {securityItems.map((s, i) => (
                    <div key={s.label} className="security-item" style={i === securityItems.length - 1 ? { borderBottom: 'none', paddingBottom: 0 } : undefined}>
                        <div>
                            <div className="security-label" style={s.danger ? { color: '#991b1b' } : undefined}>{s.label}</div>
                            <div className="security-desc">{s.desc}</div>
                            {s.status && <div className={`security-status ${s.status === '未验证' ? 'inactive' : ''}`}>{s.status}</div>}
                        </div>
                        <button className={`btn-security ${s.danger ? 'danger' : ''}`} onClick={() => alert(s.danger ? '注销账号（示例）' : `跳转至${s.action}`)}>{s.action}</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProfileEditPage;
