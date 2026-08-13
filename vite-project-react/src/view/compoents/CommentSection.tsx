import React, { useState } from 'react';
import type { CommentItem } from '@/mock/BlogDetailPage.mock.data';

// ================================================================
// 类型定义
// ================================================================

interface CommentSectionProps {
    /** 初始评论列表 */
    comments: CommentItem[];
}

interface ReplyTarget {
    /** 回复的目标评论 id */
    commentId: number;
    /** 目标作者 */
    author: string;
    /** 目标文本（用于引用） */
    text: string;
    /** 是否为对二楼回复的回复（需要引用） */
    withQuote: boolean;
}

// ================================================================
// 图标
// ================================================================

const HeartIcon: React.FC<{ className?: string }> = ({ className = 'icon icon-sm' }) => (
    <svg className={className} viewBox="0 0 24 24">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
);

// ================================================================
// 单条评论
// ================================================================

const CommentView: React.FC<{
    comment: CommentItem;
    liked: boolean;
    onLike: (id: number) => void;
    onReply: (target: ReplyTarget) => void;
}> = ({ comment, liked, onLike, onReply }) => {
    return (
        <div className="comment-item">
            <div className="comment-avatar-sm">{comment.avatar}</div>
            <div className="comment-body">
                <div className="comment-author">
                    {comment.author}
                    {comment.isAuthor && <span className="author-badge owner">作者</span>}
                </div>
                {comment.quote && (
                    <div className="quote-text">
                        <span className="quote-author">@{comment.quote.author}</span>：{comment.quote.text}
                    </div>
                )}
                {comment.text && <div className="comment-text">{comment.text}</div>}
                <div className="comment-meta">
                    <span>{comment.time}</span>
                    <button
                        className={`like-comment-btn ${liked ? 'liked' : ''}`}
                        onClick={() => onLike(comment.id)}
                    >
                        <HeartIcon />
                        <span className="like-count">{liked ? comment.likes + 1 : comment.likes}</span>
                    </button>
                    <button
                        className="reply-btn"
                        onClick={() =>
                            onReply({
                                commentId: comment.id,
                                author: comment.author,
                                text: comment.text ?? '',
                                withQuote: true,
                            })
                        }
                    >
                        回复
                    </button>
                </div>
            </div>
        </div>
    );
};

// ================================================================
// 回复输入框
// ================================================================

const ReplyInput: React.FC<{
    target: ReplyTarget;
    onSubmit: (target: ReplyTarget, text: string) => void;
    onCancel: () => void;
}> = ({ target, onSubmit, onCancel }) => {
    const [text, setText] = useState('');

    const handleSubmit = () => {
        if (!text.trim()) return;
        onSubmit(target, text.trim());
        setText('');
    };

    return (
        <div className="reply-input-wrap">
            {target.withQuote && target.text && (
                <div className="reply-quote">
                    <span className="quote-author">@{target.author}</span>：{target.text}
                </div>
            )}
            <textarea
                rows={2}
                placeholder={`回复 @${target.author}...`}
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <div className="reply-actions">
                <button className="btn-submit-reply" onClick={handleSubmit}>回复</button>
                <button className="btn-cancel-reply" onClick={onCancel}>取消</button>
            </div>
        </div>
    );
};

// ================================================================
// 评论区域组件
// ================================================================

const CommentSection: React.FC<CommentSectionProps> = ({ comments }) => {
    const [commentList, setCommentList] = useState<CommentItem[]>(comments);
    const [newComment, setNewComment] = useState('');
    const [likedIds, setLikedIds] = useState<Set<number>>(new Set());
    const [collapsedIds, setCollapsedIds] = useState<Set<number>>(new Set());
    const [replyTarget, setReplyTarget] = useState<ReplyTarget | null>(null);
    const [sort, setSort] = useState('latest');

    const totalCountText = `共 ${commentList.length} 条`;

    const handleSubmitComment = () => {
        if (!newComment.trim()) return;
        const newItem: CommentItem = {
            id: Date.now(),
            author: '我',
            avatar: '我',
            text: newComment.trim(),
            time: new Date().toLocaleString('zh-CN', { hour12: false }),
            likes: 0,
            replies: [],
        };
        setCommentList((prev) => [newItem, ...prev]);
        setNewComment('');
    };

    const handleSubmitReply = (target: ReplyTarget, text: string) => {
        setCommentList((prev) =>
            prev.map((c) => {
                if (c.id !== target.commentId) return c;
                const reply: CommentItem = {
                    id: Date.now(),
                    author: '我',
                    avatar: '我',
                    text,
                    quote: target.withQuote && target.text ? { author: target.author, text: target.text } : undefined,
                    time: new Date().toLocaleString('zh-CN', { hour12: false }),
                    likes: 0,
                };
                return { ...c, replies: [...(c.replies ?? []), reply] };
            })
        );
        setReplyTarget(null);
    };

    const handleLike = (id: number) => {
        setLikedIds((prev) => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    };

    const toggleReplies = (id: number) => {
        setCollapsedIds((prev) => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    };

    return (
        <div className="blog-detail__comments">
            <div className="comments-header">
                <div>
                    <h3>💬 评论 <span className="comment-count">{totalCountText}</span></h3>
                </div>
                <select className="comment-sort" value={sort} onChange={(e) => setSort(e.target.value)}>
                    <option value="latest">最新</option>
                    <option value="hot">最热</option>
                    <option value="oldest">最早</option>
                </select>
            </div>

            <div className="comment-input-wrap">
                <div className="comment-avatar">我</div>
                <div className="comment-input-wrapper">
                    <textarea
                        rows={2}
                        placeholder="写下你的想法..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                    />
                </div>
                <button className="comment-submit" onClick={handleSubmitComment}>发布</button>
            </div>

            <div className="comment-list">
                {commentList.map((comment) => {
                    const collapsed = collapsedIds.has(comment.id);
                    const replies = comment.replies ?? [];
                    const showingReply = replyTarget?.commentId === comment.id;
                    return (
                        <div key={comment.id} className="comment-item" style={{ display: 'block' }}>
                            <div style={{ display: 'flex', gap: 12 }}>
                                <div className="comment-avatar-sm">{comment.avatar}</div>
                                <div className="comment-body">
                                    <div className="comment-author">
                                        {comment.author}
                                        {comment.isAuthor && <span className="author-badge owner">作者</span>}
                                    </div>
                                    <div className="comment-text">{comment.text}</div>
                                    <div className="comment-meta">
                                        <span>{comment.time}</span>
                                        <button
                                            className={`like-comment-btn ${likedIds.has(comment.id) ? 'liked' : ''}`}
                                            onClick={() => handleLike(comment.id)}
                                        >
                                            <HeartIcon />
                                            <span className="like-count">
                                                {likedIds.has(comment.id) ? comment.likes + 1 : comment.likes}
                                            </span>
                                        </button>
                                        <button
                                            className="reply-btn"
                                            onClick={() =>
                                                setReplyTarget({
                                                    commentId: comment.id,
                                                    author: comment.author,
                                                    text: comment.text ?? '',
                                                    withQuote: false,
                                                })
                                            }
                                        >
                                            回复
                                        </button>
                                    </div>

                                    {showingReply && (
                                        <ReplyInput
                                            target={replyTarget!}
                                            onSubmit={handleSubmitReply}
                                            onCancel={() => setReplyTarget(null)}
                                        />
                                    )}

                                    {replies.length > 0 && (
                                        <>
                                            <div className={`replies-container ${collapsed ? 'collapsed' : ''}`}>
                                                {replies.map((reply) => (
                                                    <CommentView
                                                        key={reply.id}
                                                        comment={reply}
                                                        liked={likedIds.has(reply.id)}
                                                        onLike={handleLike}
                                                        onReply={(target) =>
                                                            setReplyTarget({ ...target, withQuote: true })
                                                        }
                                                    />
                                                ))}
                                            </div>
                                            <button className="replies-toggle" onClick={() => toggleReplies(comment.id)}>
                                                <span className={`arrow ${collapsed ? 'collapsed' : ''}`}>▼</span>
                                                <span className="toggle-text">
                                                    {collapsed ? `展开 ${replies.length} 条回复` : `收起 ${replies.length} 条回复`}
                                                </span>
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="load-more-comments">
                <button onClick={() => alert('加载更多评论')}>加载更多评论</button>
            </div>
        </div>
    );
};

export default CommentSection;
