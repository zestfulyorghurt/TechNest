import React, { useState } from 'react';
import '@/view/style/BlogCard.css';

interface BlogAuthor {
    name: string;
    avatar: string; // 头像文字或图片URL
    level: string; // 如 "码龄8年"
    avatarBg?: string; // 头像背景色
}

interface BlogCardProps {
    id: string | number;
    author: BlogAuthor;
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
    onClick?: () => void;
    className?: string;
}

const formatNumber = (num: number): string => {
    if (num >= 10000) {
        return (num / 10000).toFixed(1) + 'w';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'k';
    }
    return String(num);
};

const TAG_COLORS: Record<string, string> = {
    前端: 'orange',
    后端: 'pink',
    人工智能: '',
    计算机视觉: 'blue',
    DevOps: 'purple',
    数据库: 'blue',
    移动开发: 'purple',
    区块链: 'orange',
    架构: 'blue',
};

const getTagClass = (tag: string): string => {
    const color = TAG_COLORS[tag];
    return color ? `category-tag ${color}` : 'category-tag';
};

// ================================================================
// SVG 图标组件
// ================================================================

const Icon: React.FC<{ name: string; className?: string }> = ({ name, className = '' }) => {
    const icons: Record<string, React.ReactNode> = {
        eye: (
            <>
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
            </>
        ),
        heart: <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />,
        message: <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />,
    };

    const path = icons[name];
    if (!path) return null;

    return (
        <svg className={`icon ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {path}
        </svg>
    );
};

const BlogCard: React.FC<BlogCardProps> = ({
    author,
    title,
    summary,
    tags,
    stats,
    publishDate,
    coverImage,
    onClick,
    className = '',
}) => {
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(stats.likes);

    const handleLike = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsLiked(!isLiked);
        setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
    };

    const avatarInitial = author.avatar.length > 1 ? author.avatar.slice(0, 2) : author.avatar;

    return (
        <div
            className={`blog-card ${className}`}
            onClick={onClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && onClick?.()}
        >
            <div className="blog-card__body">
                <div className="blog-card__author">
                    <div className="blog-card__avatar" style={{ background: author.avatarBg || '#4f6ef7' }}>
                        {avatarInitial}
                    </div>
                    <span className="blog-card__author-name">
                        {author.name}
                        <span className="author-level">· {author.level}</span>
                    </span>
                </div>

                <h3 className="blog-card__title">{title}</h3>
                <p className="blog-card__summary">{summary}</p>

                <div className="blog-card__meta">
                    {tags.map((tag, index) => (
                        <span key={index} className={getTagClass(tag)}>{tag}</span>
                    ))}
                    <span className="meta-item">
                        <Icon name="eye" />
                        {formatNumber(stats.views)}
                    </span>
                    <span className="meta-item" style={{ cursor: 'pointer', color: isLiked ? '#e74c3c' : undefined }} onClick={handleLike}>
                        <Icon name="heart" />
                        {formatNumber(likeCount)}
                    </span>
                    <span className="meta-item">
                        <Icon name="message" />
                        {formatNumber(stats.comments)}
                    </span>
                    <span>{publishDate}</span>
                </div>
            </div>

            {coverImage && (
                <div className="blog-card__cover">
                    <img src={coverImage} alt={title} loading="lazy" />
                </div>
            )}
        </div>
    );
};

export default BlogCard;