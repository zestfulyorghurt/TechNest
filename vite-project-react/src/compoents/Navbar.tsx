import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '@/styles/Navbar.css';

// ================================================================
// 类型定义
// ================================================================

interface NavbarProps {
    /** 头像显示文字 */
    avatarText?: string;
    /** 搜索框占位文字 */
    searchPlaceholder?: string;
    /** 搜索内容变化回调 */
    onSearchChange?: (value: string) => void;
    /** 通知按钮点击回调 */
    onNotificationClick?: () => void;
    /** 写博客按钮点击回调 */
    onWriteBlogClick?: () => void;
    /** 头像点击回调 */
    onAvatarClick?: () => void;
    /** 品牌点击回调 */
    onBrandClick?: () => void;
}

// ================================================================
// 导航栏组件
// ================================================================

const Navbar: React.FC<NavbarProps> = ({
    avatarText = '张',
    searchPlaceholder = '搜索文章...',
    onSearchChange,
    onNotificationClick,
    onWriteBlogClick,
    onAvatarClick,
    onBrandClick,
}) => {
    // 内部维护搜索关键字，同时向外部暴露变化回调
    const [searchValue, setSearchValue] = useState('');
    const navigate = useNavigate();

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchValue(value);
        onSearchChange?.(value);
    };

    return (
        <nav className="navbar">
            <a
                href="#"
                className="brand"
                onClick={(e) => {
                    e.preventDefault();
                    if (onBrandClick) onBrandClick();
                    else navigate('/TechCommunityPage');
                }}
            >
                <span className="brand-mark">T</span>
                Tech<span>Nest</span>
            </a>

            <div className="search-center">
                <div className="search-box">
                    <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                    <input
                        type="text"
                        placeholder={searchPlaceholder}
                        value={searchValue}
                        onChange={handleSearchChange}
                    />
                </div>
            </div>

            <div className="nav-actions">
                <button className="btn-icon" title="通知" onClick={onNotificationClick}>
                    <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                    <span className="badge-dot"></span>
                </button>
                <button className="btn-primary" onClick={() => (onWriteBlogClick ? onWriteBlogClick() : navigate('/BlogEditPage'))}>
                    <span>✏️</span> <span>写博客</span>
                </button>
                <button className="btn-avatar" onClick={() => (onAvatarClick ? onAvatarClick() : navigate('/ProfilePage'))}>{avatarText}</button>
            </div>
        </nav>
    );
};

export default Navbar;
