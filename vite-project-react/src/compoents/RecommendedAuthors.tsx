import React, { useState } from 'react';
import '@/styles/RecommendedAuthors.css';

// ================================================================
// 类型定义
// ================================================================

interface RecommendedAuthor {
    id: string | number;
    name: string;
    avatar: string; // 头像显示的文字
    desc: string; // 如 "Java · 算法 · 16万粉丝"
    avatarBg?: string;
    isFollowing?: boolean; // 是否已关注
    onFollow?: (id: string | number, isFollowing: boolean) => void;
    onClick?: () => void;
}

interface RecommendedAuthorsProps {
    authors: RecommendedAuthor[];
    title?: string;
    className?: string;
}

// ================================================================
// 推荐作者组件
// ================================================================

const RecommendedAuthors: React.FC<RecommendedAuthorsProps> = ({
    authors,
    title = '👥 推荐作者',
    className = '',
}) => {
    const [authorList, setAuthorList] = useState(authors);

    const handleFollow = (id: string | number) => {
        setAuthorList(prev =>
            prev.map(author =>
                author.id === id
                    ? { ...author, isFollowing: !author.isFollowing }
                    : author
            )
        );

        // 触发回调
        const author = authorList.find(a => a.id === id);
        if (author?.onFollow) {
            author.onFollow(id, !author.isFollowing);
        }
    };

    return (
        <div className={`sidebar-card ${className}`}>
            <div className="card-title">{title}</div>

            {authorList.map((author) => (
                <div
                    key={author.id}
                    className="author-recommend"
                    onClick={author.onClick}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && author.onClick?.()}
                >
                    <div
                        className="ar-avatar"
                        style={{ background: author.avatarBg || '#4f6ef7', color: '#fff' }}
                    >
                        {author.avatar}
                    </div>
                    <div className="ar-info">
                        <div className="ar-name">{author.name}</div>
                        <div className="ar-desc">{author.desc}</div>
                    </div>
                    <button
                        className={`ar-follow ${author.isFollowing ? 'following' : ''}`}
                        onClick={(e) => {
                            e.stopPropagation();
                            handleFollow(author.id);
                        }}
                    >
                        {author.isFollowing ? '已关注' : '+ 关注'}
                    </button>
                </div>
            ))}
        </div>
    );
};

export default RecommendedAuthors;