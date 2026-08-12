import '@/view/page/showBlog/showBlog.css';
import { useMemo, useState } from 'react';

interface SavedMarkdownDoc {
    id: string;
    title: string;
    markdown: string;
    html: string;
    savedAt: string;
    type: 'draft' | 'publish';
}

const STORAGE_KEY = 'saved-markdown-docs';

interface CommentItem {
    id: string;
    docId: string;
    author: string;
    content: string;
    parentId?: string | null;
    createdAt: string;
}

const COMMENTS_KEY = 'saved-comments';

function loadComments(): CommentItem[] {
    if (typeof window === 'undefined') return [];
    const raw = window.localStorage.getItem(COMMENTS_KEY);
    if (!raw) return [];
    try {
        return JSON.parse(raw) as CommentItem[];
    } catch {
        return [];
    }
}

function saveComments(comments: CommentItem[]) {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(COMMENTS_KEY, JSON.stringify(comments));
}

function loadSavedDocs(): SavedMarkdownDoc[] {
    if (typeof window === 'undefined') return [];
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    try {
        return JSON.parse(raw) as SavedMarkdownDoc[];
    } catch {
        return [];
    }
}

function formatDate(iso: string) {
    const date = new Date(iso);
    return date.toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
    });
}

function renderContentWithMentions(text: string) {
    // split by @mentions like @username and wrap them for styling
    const parts = text.split(/(@[A-Za-z0-9_-]+)/g);
    return parts.map((part, i) => {
        if (!part) return null;
        if (part.startsWith('@')) {
            return <span key={i} className="mention">{part}</span>;
        }
        // preserve line breaks
        const lines = part.split('\n');
        return lines.map((ln, idx) => (
            <span key={`${i}-${idx}`}>
                {ln}
                {idx < lines.length - 1 ? <br /> : null}
            </span>
        ));
    });
}

function ShowBlogPage() {
    const initialDocs = loadSavedDocs();
    const [docs, setDocs] = useState<SavedMarkdownDoc[]>(initialDocs);
    const [selectedId, setSelectedId] = useState(initialDocs[0]?.id ?? '');
    const [comments, setComments] = useState<CommentItem[]>(() => loadComments());
    const [commentAuthor, setCommentAuthor] = useState('');
    const [commentContent, setCommentContent] = useState('');
    const [openReplyId, setOpenReplyId] = useState<string | null>(null);
    const [replyState, setReplyState] = useState<Record<string, { author: string; content: string }>>({});
    const [collapsedReplies, setCollapsedReplies] = useState<Record<string, boolean>>({});

    const selectedDoc = useMemo(
        () => docs.find((doc) => doc.id === selectedId) ?? docs[0],
        [docs, selectedId]
    );

    const docComments = useMemo(
        () => comments.filter((c) => c.docId === (selectedDoc?.id ?? '')),
        [comments, selectedDoc]
    );

    const topComments = useMemo(() => docComments.filter((c) => !c.parentId), [docComments]);

    const refreshDocs = () => {
        const saved = loadSavedDocs();
        setDocs(saved);
        if (!selectedId && saved.length > 0) {
            setSelectedId(saved[0].id);
        }
    };

    const handleAddComment = (parentId?: string | null) => {
        if (!selectedDoc) return;
        const author = (commentAuthor || '匿名').trim();
        const content = (commentContent || '').trim();
        if (!content) {
            window.alert('评论不能为空');
            return;
        }
        const item: CommentItem = {
            id: `${Date.now()}`,
            docId: selectedDoc.id,
            author,
            content,
            parentId: parentId ?? null,
            createdAt: new Date().toISOString(),
        };
        const updated = [item, ...comments];
        setComments(updated);
        saveComments(updated);
        setCommentAuthor('');
        setCommentContent('');
    };

    const handleToggleReply = (id: string, author?: string) => {
        setOpenReplyId((prev) => {
            const next = prev === id ? null : id;
            if (next && author) {
                // prefill @mention when opening reply box
                setReplyState((s) => ({ ...s, [id]: { ...(s[id] ?? { author: '', content: '' }), content: `@${author} ` } }));
            }
            return next;
        });
    };

    const toggleCollapse = (parentId: string) => {
        setCollapsedReplies((s) => ({ ...s, [parentId]: !s[parentId] }));
    };

    const expandAndReply = (parentId: string, author?: string) => {
        setCollapsedReplies((s) => ({ ...s, [parentId]: false }));
        setOpenReplyId(parentId);
        if (author) setReplyState((s) => ({ ...s, [parentId]: { ...(s[parentId] ?? { author: '', content: '' }), content: `@${author} ` } }));
    };

    const handleReplyChange = (id: string, field: 'author' | 'content', value: string) => {
        setReplyState((s) => ({ ...s, [id]: { ...(s[id] ?? { author: '', content: '' }), [field]: value } }));
    };

    const handleAddReply = (parentId: string) => {
        if (!selectedDoc) return;
        const rs = replyState[parentId] ?? { author: '', content: '' };
        const author = (rs.author || '匿名').trim();
        const content = (rs.content || '').trim();
        if (!content) {
            window.alert('回复不能为空');
            return;
        }
        const item: CommentItem = {
            id: `${Date.now()}`,
            docId: selectedDoc.id,
            author,
            content,
            parentId,
            createdAt: new Date().toISOString(),
        };
        const updated = [item, ...comments];
        setComments(updated);
        saveComments(updated);
        setReplyState((s) => ({ ...s, [parentId]: { author: '', content: '' } }));
        setOpenReplyId(null);
    };

    const handleQuoteReply = (targetId: string, targetAuthor: string, targetContent: string) => {
        // prepare quoted content and mention
        const quote = `> ${targetContent.split('\n').slice(0, 6).join('\n> ')}\n\n`;
        const mention = `@${targetAuthor} `;
        setOpenReplyId(targetId);
        setReplyState((s) => ({ ...s, [targetId]: { author: '', content: `${mention}${quote}` } }));
    };

    const handleDeleteComment = (id: string) => {
        if (!window.confirm('确认删除该评论吗？')) return;
        // cascade delete: remove comment and its replies
        const updated = comments.filter((c) => c.id !== id && c.parentId !== id);
        setComments(updated);
        saveComments(updated);
    };

    return (
        <div className="show-blog-page">
            <div className="show-blog-header">
                <div>
                    <h2>已保存 Markdown 文档</h2>
                    <p>展示从编辑器保存到本地的 Markdown 文档，支持草稿和发布记录。</p>
                </div>
                <button className="refresh-btn" type="button" onClick={refreshDocs}>
                    刷新列表
                </button>
            </div>

            <div className="show-blog-main">
                <aside className="doc-list">
                    {docs.length === 0 ? (
                        <div className="empty-list">当前没有已保存的文档，请先在编辑页面保存一篇文章。</div>
                    ) : (
                        docs.map((doc) => (
                            <button
                                key={doc.id}
                                type="button"
                                className={`doc-item ${selectedId === doc.id ? 'active' : ''}`}
                                onClick={() => setSelectedId(doc.id)}
                            >
                                <div className="doc-title">{doc.title || '未命名文档'}</div>
                                <div className="doc-meta">
                                    <span>{doc.type === 'publish' ? '已发布' : '草稿'}</span>
                                    <span>{formatDate(doc.savedAt)}</span>
                                </div>
                            </button>
                        ))
                    )}
                </aside>

                <section className="doc-viewer">
                    {selectedDoc ? (
                        <>
                            <div className="doc-viewer-header">
                                <div>
                                    <h3>{selectedDoc.title}</h3>
                                    <div className="doc-viewer-subtitle">
                                        <span>{selectedDoc.type === 'publish' ? '发布文档' : '草稿文档'}</span>
                                        <span>{formatDate(selectedDoc.savedAt)}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="doc-preview-block">
                                <div className="doc-preview-section">
                                    <h4>Markdown 内容</h4>
                                    <pre>{selectedDoc.markdown}</pre>
                                </div>

                                <div className="doc-preview-section html-preview-section">
                                    <h4>HTML 预览</h4>
                                    <div className="html-preview" dangerouslySetInnerHTML={{ __html: selectedDoc.html }} />
                                </div>
                            </div>

                            {/* <div className="doc-comments-section">
                                <h4>评论</h4>
                                <div className="comment-form">
                                    <input
                                        placeholder="你的名字（可选）"
                                        value={commentAuthor}
                                        onChange={(e) => setCommentAuthor(e.target.value)}
                                    />
                                    <textarea
                                        placeholder="写下你的评论..."
                                        value={commentContent}
                                        onChange={(e) => setCommentContent(e.target.value)}
                                    />
                                    <div style={{ display: 'flex', gap: 8 }}>
                                        <button className="save-btn" type="button" onClick={() => handleAddComment()}>提交评论</button>
                                    </div>
                                </div>

                                <div className="comment-list">
                                    {topComments.length === 0 ? (
                                        <div className="empty-list">暂无评论，快来成为第一个评论的人吧。</div>
                                    ) : (
                                        topComments.map((c) => {
                                            const replies = docComments.filter((r) => r.parentId === c.id);
                                            return (
                                                <div key={c.id}>
                                                    <div className="comment-item">
                                                        <div className="comment-head">
                                                            <strong>{c.author || '匿名'}</strong>
                                                            <span className="comment-time">{new Date(c.createdAt).toLocaleString()}</span>
                                                        </div>
                                                        <div className="comment-body">{renderContentWithMentions(c.content)}</div>
                                                        <div className="comment-actions">
                                                            <button type="button" onClick={() => handleToggleReply(c.id, c.author)}>回复</button>
                                                            <button type="button" onClick={() => handleQuoteReply(c.id, c.author, c.content)}>引用并回复</button>
                                                            <button type="button" onClick={() => toggleCollapse(c.id)}>
                                                                {collapsedReplies[c.id] ? '展开回复' : '折叠回复'}
                                                            </button>
                                                            <button type="button" onClick={() => handleDeleteComment(c.id)}>删除</button>
                                                        </div>
                                                    </div>

                                                    {replies.length > 0 && collapsedReplies[c.id] && (
                                                        <div className="collapsed-reply-summary">
                                                            <div className="collapsed-reply-overview">
                                                                <span>已折叠 {replies.length} 条回复</span>
                                                                <span>最新回复：{replies[0].author || '匿名'}</span>
                                                            </div>
                                                            <div className="collapsed-reply-actions">
                                                                <button type="button" onClick={() => toggleCollapse(c.id)}>查看全部</button>
                                                                <button type="button" onClick={() => expandAndReply(c.id, replies[0].author)}>回复Ta</button>
                                                                <button type="button" onClick={() => handleQuoteReply(c.id, replies[0].author, replies[0].content)}>引用最新回复</button>
                                                            </div>
                                                        </div>
                                                    )}

                                                    {!collapsedReplies[c.id] && (
                                                        <div className="reply-list">
                                                            {replies.map((r) => (
                                                                <div className="reply-item" key={r.id}>
                                                                    <div className="comment-head">
                                                                        <strong>{r.author || '匿名'}</strong>
                                                                        <span className="comment-time">{new Date(r.createdAt).toLocaleString()}</span>
                                                                    </div>
                                                                    <div className="comment-body">{renderContentWithMentions(r.content)}</div>
                                                                    <div className="comment-actions">
                                                                        <button type="button" onClick={() => expandAndReply(c.id, r.author)}>回复</button>
                                                                        <button type="button" onClick={() => handleQuoteReply(c.id, r.author, r.content)}>引用并回复</button>
                                                                        <button type="button" onClick={() => handleDeleteComment(r.id)}>删除</button>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}

                                                    {openReplyId === c.id && (
                                                        <div className="reply-form">
                                                            <input
                                                                placeholder="你的名字（可选）"
                                                                value={(replyState[c.id]?.author) ?? ''}
                                                                onChange={(e) => handleReplyChange(c.id, 'author', e.target.value)}
                                                            />
                                                            <textarea
                                                                placeholder="写下你的回复..."
                                                                value={(replyState[c.id]?.content) ?? ''}
                                                                onChange={(e) => handleReplyChange(c.id, 'content', e.target.value)}
                                                            />
                                                            <div style={{ display: 'flex', gap: 8 }}>
                                                                <button className="save-btn" type="button" onClick={() => handleAddReply(c.id)}>提交回复</button>
                                                                <button type="button" onClick={() => setOpenReplyId(null)}>取消</button>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })
                                    )}
                                </div>
                            </div> */}
                        </>
                    ) : (
                        <div className="empty-view">请先选择左侧文档进行查看。</div>
                    )}
                </section>
            </div>
        </div>
    );
}

export default ShowBlogPage;
