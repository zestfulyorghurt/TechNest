import React, { useState } from 'react';
import CommentSection from '@/view/compoents/CommentSection';
import {
    authorCard,
    blogContent,
    blogDetail,
    initialComments,
    recommendArticles,
} from '@/mock/BlogDetailPage.mock.data';
import '@/styles/BlogDetailPage.css';

// ================================================================
// 图标
// ================================================================

const HeartIcon: React.FC<{ className?: string }> = ({ className = 'icon' }) => (
    <svg className={className} viewBox="0 0 24 24">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
);

const StarIcon: React.FC<{ className?: string }> = ({ className = 'icon' }) => (
    <svg className={className} viewBox="0 0 24 24">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
);

const ShareIcon: React.FC<{ className?: string }> = ({ className = 'icon' }) => (
    <svg className={className} viewBox="0 0 24 24">
        <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
        <polyline points="16 6 12 2 8 6" />
        <line x1="12" y1="2" x2="12" y2="15" />
    </svg>
);

const MoreIcon: React.FC<{ className?: string }> = ({ className = 'icon' }) => (
    <svg className={className} viewBox="0 0 24 24">
        <circle cx="12" cy="5" r="1" />
        <circle cx="12" cy="12" r="1" />
        <circle cx="12" cy="19" r="1" />
    </svg>
);

// ================================================================
// 博客详情页
// ================================================================

const BlogDetailPage: React.FC = () => {
    const [liked, setLiked] = useState(false);
    const [favorited, setFavorited] = useState(false);
    const [following, setFollowing] = useState(false);

    const tagColorMap: Record<string, string> = {
        blue: 'blue',
        orange: 'orange',
        purple: 'purple',
        pink: 'pink',
    };

    return (
        <div>
            <div className="blog-detail">
                {/* ===== 左侧主体 ===== */}
                <main className="blog-detail__main">
                    <h1 className="blog-detail__title">{blogDetail.title}</h1>

                    <div className="blog-detail__meta">
                        {blogDetail.meta.map((m) => (
                            <span key={m.label}>{m.label}</span>
                        ))}
                    </div>

                    <div className="blog-detail__category">
                        {blogDetail.categories.map((c) => (
                            <span key={c.name} className={`category-tag ${tagColorMap[c.color] ?? ''}`}>
                                {c.name}
                            </span>
                        ))}
                    </div>

                    <div className="blog-detail__content">
                        {blogContent.intro.map((block) =>
                            block.type === 'h2' ? (
                                <h2 key={block.text}>{block.text}</h2>
                            ) : (
                                <p key={block.text}>{block.text}</p>
                            )
                        )}
                        <pre><code>{blogContent.code}</code></pre>
                    </div>

                    <div className="blog-detail__actions">
                        <button className={`action-btn ${liked ? 'active' : ''}`} onClick={() => setLiked(!liked)}>
                            <HeartIcon />
                            <span>点赞 <span>{blogDetail.likeCount}</span></span>
                        </button>
                        <button className={`action-btn ${favorited ? 'favorited' : ''}`} onClick={() => setFavorited(!favorited)}>
                            <StarIcon />
                            <span>收藏 <span>{blogDetail.favoriteCount}</span></span>
                        </button>
                        <button className="action-btn">
                            <ShareIcon />
                            <span>分享</span>
                        </button>
                        <button className="action-btn">
                            <MoreIcon />
                            <span>更多</span>
                        </button>
                    </div>

                    {/* 评论区域 */}
                    <CommentSection comments={initialComments} />
                </main>

                {/* ===== 右侧边栏 ===== */}
                <aside className="blog-detail__sidebar">
                    {/* 作者卡片 */}
                    <div className="blog-detail__author-card">
                        <div className="blog-detail__author-card-header">
                            <div className="blog-detail__avatar-large">{authorCard.avatar}</div>
                            <div className="blog-detail__author-card-name">{authorCard.name}</div>
                            <div className="blog-detail__author-card-level">{authorCard.level}</div>
                            <div className="blog-detail__author-card-domain">{authorCard.domain}</div>
                        </div>
                        <div className="blog-detail__author-card-stats">
                            {authorCard.stats.map((s) => (
                                <div key={s.label} className="stat-item">
                                    <span className="stat-num">{s.value}</span>
                                    <span className="stat-label">{s.label}</span>
                                </div>
                            ))}
                        </div>
                        <div className="blog-detail__author-card-actions">
                            <button className={`btn-follow large ${following ? 'following' : ''}`} onClick={() => setFollowing(!following)}>
                                {following ? '已关注' : '+ 关注'}
                            </button>
                            <button className="btn-private large">私信</button>
                        </div>
                        <div className="blog-detail__author-card-bio">
                            {authorCard.bio.map((b) => (
                                <div key={b.label} className="bio-item">
                                    <span className="bio-label">{b.label}</span>
                                    <span className="bio-value">{b.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 热门文章推荐 */}
                    <div className="blog-detail__recommend">
                        <h3 className="blog-detail__recommend-title">🔥 热门文章</h3>
                        <div className="blog-detail__recommend-list">
                            {recommendArticles.map((a) => (
                                <div key={a.id} className="recommend-item">
                                    <span className={`recommend-tag ${a.tag === '置顶' ? 'top' : 'hot'}`}>{a.tag}</span>
                                    <span className="recommend-title">{a.title}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </aside>
            </div>

            {/* ===== 底部固定作者栏 ===== */}
            <div className="blog-detail__footer">
                <div className="footer-left">
                    <div className="footer-avatar">{authorCard.avatar}</div>
                    <div>
                        <div className="footer-author-name">{authorCard.name}</div>
                        <div className="footer-author-tags">{authorCard.level} · {authorCard.domain}</div>
                    </div>
                </div>
                <div className="footer-actions">
                    <button className={`btn-follow ${following ? 'following' : ''}`} onClick={() => setFollowing(!following)}>
                        {following ? '已关注' : '+ 关注'}
                    </button>
                    <button className="btn-private">私信</button>
                    <button className={`action-btn ${liked ? 'active' : ''}`} onClick={() => setLiked(!liked)}>
                        <HeartIcon />
                        <span>{blogDetail.likeCount}</span>
                    </button>
                    <button className={`action-btn ${favorited ? 'favorited' : ''}`} onClick={() => setFavorited(!favorited)}>
                        <StarIcon />
                        <span>{blogDetail.favoriteCount}</span>
                    </button>
                    <button className="action-btn"><ShareIcon /></button>
                    <button className="action-btn"><MoreIcon /></button>
                </div>
            </div>
        </div>
    );
};

export default BlogDetailPage;
