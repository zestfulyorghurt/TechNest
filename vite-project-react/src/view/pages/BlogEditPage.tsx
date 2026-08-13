import React, { useState } from 'react';
import {
    aiActions,
    articleCategoryOptions,
    articleColumnOptions,
    articleTypeOptions,
    declarationOptions,
    publishScopeOptions,
    tagOptions,
    toolbarGroups,
} from '@/mock/BlogEditPage.mock.data';
import '@/styles/BlogEditPage.css';

// ================================================================
// 图标（简化）
// ================================================================

const toolIcon = (icon: string): string => {
    const map: Record<string, string> = {
        undo: '↩', redo: '↪', history: '🕘', heading: 'H', bold: 'B',
        underline: 'U', fill: '▦', more: '⋯', list: '☰', align: '≡',
        quote: '❝', code: '</>', upload: '⬆', table: '⊞', image: '🖼',
        video: '🎬', sigma: '∑', link: '🔗', template: '▤', catalog: '📑',
        vote: '🗳', fullscreen: '⛶', switch: '⇄', lines: '☰', search: '🔍',
    };
    return map[icon] ?? '•';
};

// ================================================================
// 博客编辑页
// ================================================================

const BlogEditPage: React.FC = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [toast, setToast] = useState('');
    const [articleType, setArticleType] = useState(articleTypeOptions[0]);
    const [articleCategory, setArticleCategory] = useState(articleCategoryOptions[0]);
    const [articleColumn, setArticleColumn] = useState(articleColumnOptions[0]);
    const [selectedTags, setSelectedTags] = useState<string[]>(['JavaScript', '前端']);
    const [selectedDeclarations, setSelectedDeclarations] = useState<string[]>(['允许评论', '展示目录']);

    const wordCount = title.length + content.length;
    const titleRemain = title.length >= 5 ? 0 : 5 - title.length;

    const showToast = (msg: string) => {
        setToast(msg);
        setTimeout(() => setToast(''), 2000);
    };

    const toggleTag = (tag: string) => {
        setSelectedTags((prev) =>
            prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
        );
    };

    const toggleDeclaration = (d: string) => {
        setSelectedDeclarations((prev) =>
            prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]
        );
    };

    return (
        <div className="blog-edit-page">
            {/* ===== 顶部栏 ===== */}
            <header className="topbar">
                <div className="topbar__left">
                    <div className="logo">TEST</div>
                    <div className="page-title">
                        <span>发布文章</span>
                        <span className="page-title__caret" />
                    </div>
                </div>
                <div className="topbar__right">
                    <button className="sync-pill">
                        <span className="sync-pill__mark">C</span>
                        <span>TEST同步助手</span>
                    </button>
                    <div className="avatar" />
                    <div className="notice-link"><span>消息</span></div>
                </div>
            </header>

            {/* ===== 工具栏 ===== */}
            <nav className="toolbar">
                <div className="toolbar__scroll">
                    {toolbarGroups.map((group, gi) => (
                        <React.Fragment key={gi}>
                            {gi > 0 && <span className="tool-separator" />}
                            {group.map((tool) => (
                                <button
                                    key={tool.label}
                                    className="tool-btn"
                                    title={tool.label}
                                    onClick={() => tool.label !== '使用 MD 编辑器' && showToast(`${tool.label}功能待接入`)}
                                >
                                    <span className="icon">{toolIcon(tool.icon)}</span>
                                    <span className="tool-btn__label">{tool.label}</span>
                                </button>
                            ))}
                        </React.Fragment>
                    ))}
                </div>
            </nav>

            {/* ===== 工作区 ===== */}
            <main className="workspace">
                {/* 目录面板 */}
                <aside className="catalog-panel">
                    <div className="catalog-panel__header">
                        <span>目录</span>
                        <button className="catalog-panel__collapse" title="收起目录">«</button>
                    </div>
                    <div className="catalog-panel__body">
                        <div className="outline-empty">为文内增加标题，这里将生成目录</div>
                    </div>
                </aside>

                {/* 编辑区 */}
                <section className="editor-area">
                    <article className="editor-paper">
                        <div className="title-row">
                            <h1
                                className="article-title"
                                contentEditable
                                suppressContentEditableWarning
                                data-placeholder="请输入文章标题（5～100个字）"
                                onInput={(e) => setTitle((e.target as HTMLElement).innerText)}
                            />
                            <div className="title-helper">
                                <button className="magic-btn" title="AI 优化标题" onClick={() => showToast('AI 优化标题')}>✨</button>
                                <span className={`title-helper__text ${title.length >= 5 ? 'is-ready' : 'is-warning'}`}>
                                    {title.length >= 5 ? '标题长度已达标' : `还需输入${titleRemain}个字`}
                                </span>
                            </div>
                        </div>

                        <div className="editor-body-wrap">
                            <div
                                className="article-editor"
                                contentEditable
                                suppressContentEditableWarning
                                onInput={(e) => setContent((e.target as HTMLElement).innerText)}
                            />
                            {content.length === 0 && (
                                <div className="editor-hints">
                                    <strong>#创作灵感</strong>
                                    <p>• 记录工作实践、项目复盘</p>
                                    <p>• 写技术笔记巩固知识要点</p>
                                    <p>• 发表职场感悟心得</p>
                                    <p>• 搬运自己的原创文章到这</p>
                                </div>
                            )}
                        </div>
                    </article>
                </section>

                {/* AI 面板 */}
                <aside className="ai-panel">
                    <div className="ai-panel__header">
                        <span className="ai-panel__mark">AI</span>
                        <span>AI助手</span>
                    </div>
                    <div className="ai-panel__body">
                        {aiActions.map((a) => (
                            <button key={a.label} className="ai-action" onClick={() => showToast(`AI ${a.label}`)}>
                                <span className="icon icon-sm">{toolIcon(a.icon)}</span>
                                <span>{a.label}</span>
                            </button>
                        ))}
                    </div>
                </aside>
            </main>

            {/* 反馈 tab */}
            <div className="feedback-tab">反馈</div>

            {/* ===== 底部栏 ===== */}
            <footer className="bottom-bar">
                <div className="bottom-bar__inner">
                    <span className="word-count">共 {wordCount} 字</span>
                    <div className={`publish-settings ${settingsOpen ? 'is-open' : ''}`}>
                        <button className="settings-trigger" onClick={() => setSettingsOpen(!settingsOpen)}>
                            <span>发布设置</span>
                            <span className="icon icon-sm">▾</span>
                        </button>
                        <section className="settings-popover">
                            <div className="settings-popover__title">
                                <span>发布设置</span>
                                <span className="settings-popover__status">✓ 草稿待完善</span>
                            </div>
                            <div className="setting-grid">
                                <label className="setting-field">
                                    <span className="setting-label">文章类型</span>
                                    <select className="field-control" value={articleType} onChange={(e) => setArticleType(e.target.value)}>
                                        {articleTypeOptions.map((o) => <option key={o}>{o}</option>)}
                                    </select>
                                </label>
                                <label className="setting-field">
                                    <span className="setting-label">发布形式</span>
                                    <select className="field-control" defaultValue={publishScopeOptions[0]}>
                                        {publishScopeOptions.map((o) => <option key={o}>{o}</option>)}
                                    </select>
                                </label>
                                <label className="setting-field">
                                    <span className="setting-label">文章分类</span>
                                    <select className="field-control" value={articleCategory} onChange={(e) => setArticleCategory(e.target.value)}>
                                        {articleCategoryOptions.map((o) => <option key={o}>{o}</option>)}
                                    </select>
                                </label>
                                <label className="setting-field">
                                    <span className="setting-label">发布专栏</span>
                                    <select className="field-control" value={articleColumn} onChange={(e) => setArticleColumn(e.target.value)}>
                                        {articleColumnOptions.map((o) => <option key={o}>{o}</option>)}
                                    </select>
                                </label>
                                <div className="setting-field setting-field--full">
                                    <span className="setting-label">文章标签</span>
                                    <div className="tag-row">
                                        {tagOptions.map((t) => (
                                            <button
                                                key={t}
                                                className={`chip ${selectedTags.includes(t) ? 'is-selected' : ''}`}
                                                onClick={() => toggleTag(t)}
                                            >
                                                {t}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="setting-field setting-field--full">
                                    <span className="setting-label">推荐声明</span>
                                    <div className="type-row">
                                        {declarationOptions.map((d) => (
                                            <button
                                                key={d}
                                                className={`chip ${selectedDeclarations.includes(d) ? 'is-selected' : ''}`}
                                                onClick={() => toggleDeclaration(d)}
                                            >
                                                {d}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="settings-actions">
                                <button className="mini-btn" onClick={() => setSettingsOpen(false)}>取消</button>
                                <button className="mini-btn mini-btn--primary" onClick={() => setSettingsOpen(false)}>完成</button>
                            </div>
                        </section>
                    </div>
                    <span className="bottom-spacer" />
                    <button className="footer-btn" onClick={() => showToast('已保存草稿')}>
                        <span>保存草稿</span>
                        <span className="icon icon-sm">▾</span>
                    </button>
                    <button className="footer-btn" onClick={() => showToast('定时发布功能待接入')}>
                        <span>定时发布</span>
                        <span className="icon icon-sm">›</span>
                    </button>
                    <button className="footer-btn footer-btn--primary" onClick={() => setModalOpen(true)}>发布博客</button>
                </div>
            </footer>

            {/* ===== 发布确认弹窗 ===== */}
            <section className={`publish-modal ${modalOpen ? 'is-open' : ''}`}>
                <div className="publish-dialog">
                    <div className="publish-dialog__header">
                        <span>发布确认</span>
                        <button className="close-btn" onClick={() => setModalOpen(false)}>✕</button>
                    </div>
                    <div className="publish-dialog__body">
                        <div className="publish-summary">
                            <div className="publish-summary__title">{title || '未填写标题'}</div>
                            <div className="publish-summary__meta">
                                <span className="summary-pill">{articleType}</span>
                                <span className="summary-pill">{articleCategory}</span>
                                <span className="summary-pill">{articleColumn}</span>
                                <span className="summary-pill">{wordCount} 字</span>
                            </div>
                        </div>
                        <div className="publish-checklist">
                            <div className="check-item"><span className="icon icon-sm">✓</span><span>标题长度已检测</span></div>
                            <div className="check-item"><span className="icon icon-sm">✓</span><span>分类与专栏已选择</span></div>
                            <div className="check-item"><span className="icon icon-sm">✓</span><span>标签可继续补充</span></div>
                            <div className="check-item"><span className="icon icon-sm">✓</span><span>草稿自动保存开启</span></div>
                        </div>
                    </div>
                    <div className="publish-dialog__footer">
                        <button className="mini-btn" onClick={() => setModalOpen(false)}>继续编辑</button>
                        <button
                            className="mini-btn mini-btn--primary"
                            onClick={() => { setModalOpen(false); showToast('发布成功'); }}
                        >
                            确认发布
                        </button>
                    </div>
                </div>
            </section>

            {/* ===== toast ===== */}
            <div className={`toast ${toast ? 'is-show' : ''}`}>{toast}</div>
        </div>
    );
};

export default BlogEditPage;
