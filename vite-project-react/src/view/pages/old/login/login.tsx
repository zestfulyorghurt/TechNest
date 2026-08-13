import '@/view/page/login/login.css';
import { useViewLogicState } from '@/view/page/login/logic';

function LoginPage() {
    const {
        data,
        mode,
        userNameChange,
        passwordChange,
        handleSubmit,
        toggleMode
    } = useViewLogicState();

    return (
        <div className="login-container">
            {/* 左侧：控制区 */}
            <div className="left-side">
                <div className="left-content">
                    <h2>{mode === 'login' ? 'Welcome Back' : 'Join Us'}</h2>
                    <p>
                        {mode === 'login'
                            ? 'Please login to your account to continue.'
                            : 'Register to access all features.'}
                    </p>
                    <button className="signup-btn" onClick={toggleMode}>
                        {mode === 'login' ? data.singUpTitle : 'Sign In'}
                    </button>
                </div>
            </div>

            {/* 右侧：滑动窗口视口 */}
            <div className="right-side">
                {/* 关键：这个 wrapper 宽度是 200%，负责滑动 */}
                <div className={`forms-wrapper ${mode === 'login' ? 'show-login' : 'show-register'}`}>

                    {/* 1. 登录面板 */}
                    <div className="form-panel login-panel">
                        <h2>{data.singInTitle}</h2>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                placeholder="Username"
                                value={data.userName}
                                onChange={(e) => userNameChange(e)}
                                className="input-field"
                                required
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={data.password}
                                onChange={(e) => passwordChange(e)}
                                className="input-field"
                                required
                            />
                            <button type="submit" className="login-btn">
                                {data.singInTitle}
                            </button>
                        </form>

                        <div className="social-login">
                            <p>{data.singInOther}</p>
                            <div className="social-icons">
                                <span className="icon">💬</span>
                                <span className="icon">🐧</span>
                                <span className="icon">👤</span>
                                <span className="icon">支</span>
                            </div>
                        </div>
                    </div>

                    {/* 2. 注册面板 */}
                    <div className="form-panel register-panel">
                        <h2>{data.singUpTitle}</h2>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                placeholder="Set Username"
                                value={data.userName}
                                onChange={(e) => userNameChange(e)}
                                className="input-field"
                                required
                            />
                            <input
                                type="password"
                                placeholder="Set Password"
                                value={data.password}
                                onChange={(e) => passwordChange(e)}
                                className="input-field"
                                required
                            />
                            <button type="submit" className="login-btn">
                                {data.singUpTitle}
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default LoginPage;