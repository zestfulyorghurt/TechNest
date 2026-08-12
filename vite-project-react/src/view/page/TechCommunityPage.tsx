import React, { useState } from 'react';
import BlogCard from '@/view/compoent/BlogCard';
import HotArticles from '@/view/compoent/HotArticles';
import RecommendedAuthors from '@/view/compoent/RecommendedAuthors';
import '@/view/style/TechCommunityPage.css';

// ================================================================
// 类型定义
// ================================================================

interface BlogPost {
    id: string | number;
    author: {
        name: string;
        avatar: string;
        level: string;
        avatarBg?: string;
    };
    title: string;
    summary: string;
    tags: string[];
    stats: {
        views: number;
        likes: number;
        comments: number;
    };
    publishDate: string;
    coverImage?: string;
}

// ================================================================
// 主页面组件
// ================================================================

const TechCommunityPage: React.FC = () => {
    // ===== 状态管理 =====
    const [activeCategory, setActiveCategory] = useState('全部');
    const [activeSort, setActiveSort] = useState('最新');

    // ===== 数据 =====
    const categories = ['全部', '前端', '后端', '人工智能', 'DevOps', '数据库', '移动开发', '区块链'];
    const sortOptions = ['最新', '热门', '最多点赞', '最多评论'];

    const blogPosts: BlogPost[] = [
        {
            id: 1,
            author: {
                name: 'bug菌',
                avatar: 'bug',
                level: '码龄8年',
                avatarBg: '#4f6ef7',
            },
            title: 'YOLOv9【第一章：零基础入门篇·第1节】YOLOv9核心思想与发展背景：从YOLOv7到PGI/GELAN！',
            summary: '该专栏系统梳理并深度梳理全网主流 YOLOv9 改进方法与工程实践案例，覆盖分类、目标检测、实例分割、多目标追踪等方向。',
            tags: ['人工智能', '计算机视觉'],
            stats: { views: 8100, likes: 128, comments: 23 },
            publishDate: '2026-08-02',
            coverImage: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="160" height="120"%3E%3Crect width="160" height="120" fill="%233b82f6"/%3E%3Ctext x="80" y="62" text-anchor="middle" fill="%23fff" font-size="18" font-weight="bold" font-family="sans-serif"%3EYOLOv9%3C/text%3E%3C/svg%3E',
        },
        {
            id: 2,
            author: {
                name: '张三',
                avatar: '张',
                level: '码龄3年',
                avatarBg: '#e67e22',
            },
            title: 'React 19 新特性全解析：Compiler、Actions 与 Server Components 深度实践',
            summary: 'React 19 带来了诸多令人兴奋的新特性，包括 React Compiler、Actions、Server Components 的稳定版本等。本文全面梳理这些新功能的使用方法和最佳实践。',
            tags: ['前端'],
            stats: { views: 3200, likes: 89, comments: 15 },
            publishDate: '2026-08-01',
            coverImage: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="160" height="120"%3E%3Crect width="160" height="120" fill="%23e67e22"/%3E%3Ctext x="80" y="62" text-anchor="middle" fill="%23fff" font-size="18" font-weight="bold" font-family="sans-serif"%3EReact%3C/text%3E%3C/svg%3E',
        },
        {
            id: 3,
            author: {
                name: '李四',
                avatar: '李',
                level: '码龄5年',
                avatarBg: '#16a34a',
            },
            title: 'TypeScript 5.5 发布：类型谓词自动推断、JSDoc 增强与性能大幅提升',
            summary: 'TypeScript 5.5 正式发布，带来了类型谓词的自动推断、JSDoc 增强、编辑器性能提升等多项改进。',
            tags: ['前端'],
            stats: { views: 5600, likes: 203, comments: 42 },
            publishDate: '2026-07-30',
        },
        {
            id: 4,
            author: {
                name: '王五',
                avatar: '王',
                level: '码龄2年',
                avatarBg: '#8b5cf6',
            },
            title: '从零搭建个人技术社区：需求分析、技术选型与架构设计全记录',
            summary: '记录从零开始搭建一个技术社区的全过程，涵盖需求分析、技术选型、架构设计、数据库设计等核心环节，分享实战中的思考与取舍。',
            tags: ['后端', '架构'],
            stats: { views: 1800, likes: 56, comments: 9 },
            publishDate: '2026-07-28',
            coverImage: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="160" height="120"%3E%3Crect width="160" height="120" fill="%238b5cf6"/%3E%3Ctext x="80" y="62" text-anchor="middle" fill="%23fff" font-size="16" font-weight="bold" font-family="sans-serif"%3ETechNest%3C/text%3E%3C/svg%3E',
        },
    ];

    const hotArticles = [
        {
            id: 1,
            title: '《YOLOv8实战：从入门到深度优化》总目录导航',
            index: 1,
            tag: '置顶' as const,
            onClick: () => alert('跳转至文章详情页'),
        },
        {
            id: 2,
            title: '《滚雪球学SpringBoot》教程导航帖（更新于2026.4.10）',
            index: 2,
            tag: '置顶' as const,
            onClick: () => alert('跳转至文章详情页'),
        },
        {
            id: 3,
            title: '手把手教你DeepSeek-R1本地部署和企业知识库搭建',
            index: 3,
            tag: '热' as const,
            onClick: () => alert('跳转至文章详情页'),
        },
        {
            id: 4,
            title: 'SpringBoot入门：轻松搭建开发环境，启动你的第一个Web项目！',
            index: 4,
            tag: '热' as const,
            onClick: () => alert('跳转至文章详情页'),
        },
        {
            id: 5,
            title: 'YOLOv9 核心思想与发展背景：从YOLOv7到PGI/GELAN',
            index: 5,
            onClick: () => alert('跳转至文章详情页'),
        },
    ];

    const recommendedAuthors = [
        {
            id: 1,
            name: 'bug菌',
            avatar: 'bug',
            desc: 'Java · 算法 · 16万粉丝',
            avatarBg: '#4f6ef7',
            isFollowing: false,
        },
        {
            id: 2,
            name: '张三',
            avatar: '张',
            desc: '前端 · React · 2.3万粉丝',
            avatarBg: '#e67e22',
            isFollowing: true,
        },
        {
            id: 3,
            name: '李四',
            avatar: '李',
            desc: '全栈 · TypeScript · 1.8万粉丝',
            avatarBg: '#16a34a',
            isFollowing: false,
        },
        {
            id: 4,
            name: '王五',
            avatar: '王',
            desc: '后端 · Spring · 9.8k粉丝',
            avatarBg: '#8b5cf6',
            isFollowing: false,
        },
    ];

    // ===== 事件处理 =====
    const handleCategoryClick = (category: string) => {
        setActiveCategory(category);
        // 实际项目中这里会触发数据过滤
    };

    const handleSortClick = (sort: string) => {
        setActiveSort(sort);
        // 实际项目中这里会触发数据重新排序
    };

    const handleLoadMore = () => {
        alert('加载更多文章');
    };

    // ===== 过滤文章 =====
    const filteredPosts = activeCategory === '全部'
        ? blogPosts
        : blogPosts.filter(post => post.tags.includes(activeCategory));

    return (
        <div className="tech-community">
            {/* ===== 导航栏 ===== */}
            <nav className="navbar">
                <a href="#" className="brand">
                    <span className="brand-mark">T</span>
                    Tech<span>Nest</span>
                </a>

                <div className="search-center">
                    <div className="search-box">
                        <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="11" cy="11" r="8" />
                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                        <input type="text" placeholder="搜索文章..." />
                    </div>
                </div>

                <div className="nav-actions">
                    <button className="btn-icon" title="通知">
                        <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                        </svg>
                        <span className="badge-dot"></span>
                    </button>
                    <button className="btn-primary"><span>✏️</span> <span>写博客</span></button>
                    <button className="btn-avatar">张</button>
                </div>
            </nav>

            {/* ===== 主容器 ===== */}
            <div className="container">
                {/* ===== 左侧：内容区 ===== */}
                <main className="main-content">
                    {/* 分类标签 */}
                    <div className="category-tabs">
                        {categories.map((category) => (
                            <button
                                key={category}
                                className={`tab-btn ${activeCategory === category ? 'active' : ''}`}
                                onClick={() => handleCategoryClick(category)}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    {/* 排序工具栏 */}
                    <div className="toolbar">
                        <div className="sort-options">
                            {sortOptions.map((sort) => (
                                <button
                                    key={sort}
                                    className={`sort-btn ${activeSort === sort ? 'active' : ''}`}
                                    onClick={() => handleSortClick(sort)}
                                >
                                    {sort}
                                </button>
                            ))}
                        </div>
                        <span className="result-count">共 {filteredPosts.length} 篇文章</span>
                    </div>

                    {/* 博客卡片列表 */}
                    {filteredPosts.map((post) => (
                        <BlogCard
                            key={post.id}
                            {...post}
                            onClick={() => alert('跳转至文章详情页')}
                        />
                    ))}

                    {/* 加载更多 */}
                    <div className="load-more">
                        <button onClick={handleLoadMore}>加载更多</button>
                    </div>
                </main>

                {/* ===== 右侧边栏 ===== */}
                <aside className="sidebar">
                    <HotArticles articles={hotArticles} />
                    <RecommendedAuthors authors={recommendedAuthors} />

                    {/* 关于社区 */}
                    <div className="sidebar-card about-card">
                        <div className="card-title">🌱 关于 TechNest</div>
                        <p style={{ fontSize: '14px', color: '#4a5a6a', lineHeight: '1.7', marginBottom: '12px' }}>
                            一个技术记录、分享与交友的社区。在这里，你可以记录学习心得、分享技术见解，通过技术结交志同道合的朋友。
                        </p>
                        <div style={{ display: 'flex', gap: '12px', fontSize: '13px', color: '#6b7a8a' }}>
                            <span>📝 28 篇文章</span>
                            <span>👥 156 位成员</span>
                            <span>❤️ 2.4k 互动</span>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default TechCommunityPage;