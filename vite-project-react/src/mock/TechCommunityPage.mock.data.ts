// ================================================================
// TechCommunityPage（技术社区主页）假数据
// ================================================================

// ===== 类型定义 =====

export interface BlogPost {
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

export interface HotArticle {
    id: string | number;
    title: string;
    index: number;
    tag?: '置顶' | '热' | '';
    onClick?: () => void;
}

export interface RecommendedAuthor {
    id: string | number;
    name: string;
    avatar: string;
    desc: string;
    avatarBg?: string;
    isFollowing?: boolean;
}

// ===== 数据 =====

export const categories = ['全部', '前端', '后端', '人工智能', 'DevOps', '数据库', '移动开发', '区块链'];

export const sortOptions = ['最新', '热门', '最多点赞', '最多评论'];

export const blogPosts: BlogPost[] = [
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

export const hotArticles: HotArticle[] = [
    {
        id: 1,
        title: '《YOLOv8实战：从入门到深度优化》总目录导航',
        index: 1,
        tag: '置顶',
        onClick: () => alert('跳转至文章详情页'),
    },
    {
        id: 2,
        title: '《滚雪球学SpringBoot》教程导航帖（更新于2026.4.10）',
        index: 2,
        tag: '置顶',
        onClick: () => alert('跳转至文章详情页'),
    },
    {
        id: 3,
        title: '手把手教你DeepSeek-R1本地部署和企业知识库搭建',
        index: 3,
        tag: '热',
        onClick: () => alert('跳转至文章详情页'),
    },
    {
        id: 4,
        title: 'SpringBoot入门：轻松搭建开发环境，启动你的第一个Web项目！',
        index: 4,
        tag: '热',
        onClick: () => alert('跳转至文章详情页'),
    },
    {
        id: 5,
        title: 'YOLOv9 核心思想与发展背景：从YOLOv7到PGI/GELAN',
        index: 5,
        onClick: () => alert('跳转至文章详情页'),
    },
];

export const recommendedAuthors: RecommendedAuthor[] = [
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
