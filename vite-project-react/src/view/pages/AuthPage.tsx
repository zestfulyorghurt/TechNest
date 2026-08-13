import React, { useState } from 'react';
import '@/styles/AuthPage.css';

// ================================================================
// 常量
// ================================================================

const socialOptions = [
    { name: '微信', icon: '💬', cls: 'wechat' },
    { name: 'QQ', icon: '🐧', cls: 'qq' },
    { name: '支付宝', icon: '💳', cls: 'alipay' },
    { name: 'GitHub', icon: '🐙', cls: 'github' },
    { name: 'Google', icon: '🌐', cls: 'google' },
];

// ================================================================
// 认证页
// ================================================================

const AuthPage: React.FC = () => {
    const [mode, setMode] = useState<'login' | 'register'>('login');
    const [loginType, setLoginType] = useState<'phone' | 'email' | 'social'>('phone');
    const [registerType, setRegisterType] = useState<'phone' | 'email' | 'social'>('phone');
    const [showPwd, setShowPwd] = useState(false);
    const [captchaCountdown, setCaptchaCountdown] = useState(0);

    // 表单字段
    const [phone, setPhone] = useState('');
    const [captcha, setCaptcha] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nickname, setNickname] = useState('');
    const [agree, setAgree] = useState(true);

    const sendCaptcha = () => {
        setCaptchaCountdown(60);
        const timer = setInterval(() => {
            setCaptchaCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    const handleSubmit = () => {
        if (!agree) {
            alert('请先阅读并同意用户协议与隐私政策');
            return;
        }
        alert(mode === 'login' ? '登录成功（示例）' : '注册成功（示例）');
    };

    const submitDisabled = mode === 'register' && (phone === '' || nickname === '' || password === '');

    return (
        <div className="auth-page">
            {/* 粒子背景 */}
            <div className="particles">
                {Array.from({ length: 15 }).map((_, i) => <div key={i} className="particle" />)}
            </div>

            <div className="auth-container">
                {/* 品牌 */}
                <div className="brand">
                    <a href="#" className="logo">
                        <span className="logo-icon">T</span>
                        Tech<span>Nest</span>
                    </a>
                    <div className="slogan">✦ 技术记录 · 分享 · 交友</div>
                </div>

                {/* 认证卡片 */}
                <div className="auth-card">
                    {/* 登录/注册切换 */}
                    <div className="mode-tabs">
                        <button className={`tab-btn ${mode === 'login' ? 'active' : ''}`} onClick={() => setMode('login')}>登录</button>
                        <button className={`tab-btn ${mode === 'register' ? 'active' : ''}`} onClick={() => setMode('register')}>注册</button>
                    </div>

                    {mode === 'login' ? (
                        <>
                            {/* 登录方式切换 */}
                            <div className="auth-type-tabs">
                                {[
                                    { key: 'phone' as const, label: '📱 手机号' },
                                    { key: 'email' as const, label: '✉️ 邮箱' },
                                    { key: 'social' as const, label: '🔗 第三方' },
                                ].map((t) => (
                                    <button
                                        key={t.key}
                                        className={`type-btn ${loginType === t.key ? 'active' : ''}`}
                                        onClick={() => setLoginType(t.key)}
                                    >
                                        {t.label}
                                    </button>
                                ))}
                            </div>

                            {loginType === 'phone' && (
                                <div className="form-panel" style={{ display: 'block' }}>
                                    <div className="form-group">
                                        <label>手机号</label>
                                        <div className="input-wrap">
                                            <span className="input-icon">📱</span>
                                            <input type="tel" placeholder="请输入手机号" value={phone} onChange={(e) => setPhone(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>验证码</label>
                                        <div className="input-wrap">
                                            <span className="input-icon">✉️</span>
                                            <input type="text" placeholder="请输入验证码" value={captcha} onChange={(e) => setCaptcha(e.target.value)} />
                                            <button className="captcha-btn" disabled={captchaCountdown > 0} onClick={sendCaptcha}>
                                                {captchaCountdown > 0 ? `${captchaCountdown}s` : '获取验证码'}
                                            </button>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="checkbox-wrap">
                                            <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
                                            <label>我已阅读并同意 <a href="#">《用户协议》</a> 和 <a href="#">《隐私政策》</a></label>
                                        </div>
                                    </div>
                                    <button className="btn-submit" onClick={handleSubmit}>登 录</button>
                                    <div className="switch-hint">还没有账号？<button className="switch-link" onClick={() => setMode('register')}>立即注册</button></div>
                                </div>
                            )}

                            {loginType === 'email' && (
                                <div className="form-panel" style={{ display: 'block' }}>
                                    <div className="form-group">
                                        <label>邮箱</label>
                                        <div className="input-wrap">
                                            <span className="input-icon">✉️</span>
                                            <input type="email" placeholder="请输入邮箱" value={email} onChange={(e) => setEmail(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>密码</label>
                                        <div className="input-wrap">
                                            <span className="input-icon">🔒</span>
                                            <input type={showPwd ? 'text' : 'password'} placeholder="请输入密码" value={password} onChange={(e) => setPassword(e.target.value)} />
                                            <button className="toggle-pwd" onClick={() => setShowPwd(!showPwd)}>👁️</button>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="checkbox-wrap">
                                            <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
                                            <label>我已阅读并同意 <a href="#">《用户协议》</a> 和 <a href="#">《隐私政策》</a></label>
                                        </div>
                                    </div>
                                    <button className="btn-submit" onClick={handleSubmit}>登 录</button>
                                    <div className="switch-hint">还没有账号？<button className="switch-link" onClick={() => setMode('register')}>立即注册</button></div>
                                </div>
                            )}

                            {loginType === 'social' && (
                                <div className="form-panel" style={{ display: 'block' }}>
                                    <p style={{ color: '#8a9aaa', fontSize: 14, textAlign: 'center', marginBottom: 20 }}>
                                        使用以下第三方账号快速登录
                                    </p>
                                    <div className="social-login">
                                        {socialOptions.map((s) => (
                                            <button key={s.name} className={`social-btn ${s.cls}`} onClick={() => alert(`使用${s.name}登录（示例）`)}>{s.icon}</button>
                                        ))}
                                    </div>
                                    <div className="switch-hint">还没有账号？<button className="switch-link" onClick={() => setMode('register')}>立即注册</button></div>
                                </div>
                            )}
                        </>
                    ) : (
                        <>
                            {/* 注册方式切换 */}
                            <div className="auth-type-tabs">
                                {[
                                    { key: 'phone' as const, label: '📱 手机号' },
                                    { key: 'email' as const, label: '✉️ 邮箱' },
                                    { key: 'social' as const, label: '🔗 第三方' },
                                ].map((t) => (
                                    <button
                                        key={t.key}
                                        className={`type-btn ${registerType === t.key ? 'active' : ''}`}
                                        onClick={() => setRegisterType(t.key)}
                                    >
                                        {t.label}
                                    </button>
                                ))}
                            </div>

                            {registerType === 'phone' && (
                                <div className="form-panel" style={{ display: 'block' }}>
                                    <div className="form-group">
                                        <label>手机号</label>
                                        <div className="input-wrap">
                                            <span className="input-icon">📱</span>
                                            <input type="tel" placeholder="请输入手机号" value={phone} onChange={(e) => setPhone(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>验证码</label>
                                        <div className="input-wrap">
                                            <span className="input-icon">✉️</span>
                                            <input type="text" placeholder="请输入验证码" value={captcha} onChange={(e) => setCaptcha(e.target.value)} />
                                            <button className="captcha-btn" disabled={captchaCountdown > 0} onClick={sendCaptcha}>
                                                {captchaCountdown > 0 ? `${captchaCountdown}s` : '获取验证码'}
                                            </button>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>昵称</label>
                                        <div className="input-wrap">
                                            <span className="input-icon">👤</span>
                                            <input type="text" placeholder="2-12个字符，中英文、数字、下划线" value={nickname} onChange={(e) => setNickname(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>密码</label>
                                        <div className="input-wrap">
                                            <span className="input-icon">🔒</span>
                                            <input type={showPwd ? 'text' : 'password'} placeholder="8-20位，包含字母和数字" value={password} onChange={(e) => setPassword(e.target.value)} />
                                            <button className="toggle-pwd" onClick={() => setShowPwd(!showPwd)}>👁️</button>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="checkbox-wrap">
                                            <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
                                            <label>我已阅读并同意 <a href="#">《用户协议》</a> 和 <a href="#">《隐私政策》</a></label>
                                        </div>
                                    </div>
                                    <button className="btn-submit" disabled={submitDisabled} onClick={handleSubmit}>注 册</button>
                                    <div className="switch-hint">已有账号？<button className="switch-link" onClick={() => setMode('login')}>立即登录</button></div>
                                </div>
                            )}

                            {registerType === 'email' && (
                                <div className="form-panel" style={{ display: 'block' }}>
                                    <div className="form-group">
                                        <label>邮箱</label>
                                        <div className="input-wrap">
                                            <span className="input-icon">✉️</span>
                                            <input type="email" placeholder="请输入邮箱" value={email} onChange={(e) => setEmail(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>验证码</label>
                                        <div className="input-wrap">
                                            <span className="input-icon">✉️</span>
                                            <input type="text" placeholder="请输入验证码" value={captcha} onChange={(e) => setCaptcha(e.target.value)} />
                                            <button className="captcha-btn" disabled={captchaCountdown > 0} onClick={sendCaptcha}>
                                                {captchaCountdown > 0 ? `${captchaCountdown}s` : '获取验证码'}
                                            </button>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>昵称</label>
                                        <div className="input-wrap">
                                            <span className="input-icon">👤</span>
                                            <input type="text" placeholder="2-12个字符，中英文、数字、下划线" value={nickname} onChange={(e) => setNickname(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>密码</label>
                                        <div className="input-wrap">
                                            <span className="input-icon">🔒</span>
                                            <input type={showPwd ? 'text' : 'password'} placeholder="8-20位，包含字母和数字" value={password} onChange={(e) => setPassword(e.target.value)} />
                                            <button className="toggle-pwd" onClick={() => setShowPwd(!showPwd)}>👁️</button>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="checkbox-wrap">
                                            <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
                                            <label>我已阅读并同意 <a href="#">《用户协议》</a> 和 <a href="#">《隐私政策》</a></label>
                                        </div>
                                    </div>
                                    <button className="btn-submit" disabled={submitDisabled} onClick={handleSubmit}>注 册</button>
                                    <div className="switch-hint">已有账号？<button className="switch-link" onClick={() => setMode('login')}>立即登录</button></div>
                                </div>
                            )}

                            {registerType === 'social' && (
                                <div className="form-panel" style={{ display: 'block' }}>
                                    <p style={{ color: '#8a9aaa', fontSize: 14, textAlign: 'center', marginBottom: 20 }}>
                                        使用以下第三方账号快速注册
                                    </p>
                                    <div className="social-login">
                                        {socialOptions.map((s) => (
                                            <button key={s.name} className={`social-btn ${s.cls}`} onClick={() => alert(`使用${s.name}注册（示例）`)}>{s.icon}</button>
                                        ))}
                                    </div>
                                    <div className="switch-hint">已有账号？<button className="switch-link" onClick={() => setMode('login')}>立即登录</button></div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
