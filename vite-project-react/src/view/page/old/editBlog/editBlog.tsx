import '@/view/page/editBlog/editBlog.css';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { ChangeEvent } from 'react';

const defaultContent = '<p>欢迎使用富文本编辑器。你可以在这里写标题、正文、插入图片、链接和代码块。</p>';

interface SavedMarkdownDoc {
    id: string;
    title: string;
    markdown: string;
    html: string;
    savedAt: string;
    type: 'draft' | 'publish';
}

const STORAGE_KEY = 'saved-markdown-docs';

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

function saveDocToStorage(doc: SavedMarkdownDoc) {
    const docs = loadSavedDocs();
    const updated = [doc, ...docs.filter((item) => item.id !== doc.id)];
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

function htmlToMarkdown(html: string) {
    const doc = new DOMParser().parseFromString(html, 'text/html');

    const walk = (node: Node): string => {
        if (node.nodeType === Node.TEXT_NODE) {
            return node.textContent?.replace(/\s+/g, ' ') ?? '';
        }
        if (node.nodeType !== Node.ELEMENT_NODE) {
            return '';
        }

        const el = node as HTMLElement;
        const tag = el.tagName.toLowerCase();
        const children = Array.from(el.childNodes).map(walk).join('');

        switch (tag) {
            case 'h1':
                return '# ' + children.trim() + '\n\n';
            case 'h2':
                return '## ' + children.trim() + '\n\n';
            case 'h3':
                return '### ' + children.trim() + '\n\n';
            case 'p':
                return children.trim() + '\n\n';
            case 'strong':
            case 'b':
                return '**' + children.trim() + '**';
            case 'em':
            case 'i':
                return '*' + children.trim() + '*';
            case 'u':
                return '_' + children.trim() + '_';
            case 'blockquote':
                return '> ' + children.trim().replace(/\n/g, '\n> ') + '\n\n';
            case 'pre':
                return '```\n' + (el.textContent?.trim() ?? '') + '\n```\n\n';
            case 'code':
                return '`' + (el.textContent?.trim() ?? '') + '`';
            case 'ul':
                return Array.from(el.children)
                    .map((item) => '- ' + walk(item).trim())
                    .join('\n')
                    .concat('\n\n');
            case 'ol':
                return Array.from(el.children)
                    .map((item, index) => `${index + 1}. ${walk(item).trim()}`)
                    .join('\n')
                    .concat('\n\n');
            case 'li':
                return children.trim() + '\n';
            case 'br':
                return '  \n';
            case 'a':
                return `[${children.trim()}](${el.getAttribute('href') ?? ''})`;
            case 'img':
                return `![${el.getAttribute('alt') ?? ''}](${el.getAttribute('src') ?? ''})`;
            case 'div':
            case 'section':
            case 'article':
                return children + '\n\n';
            case 'span':
                return children;
            default:
                return children;
        }
    };

    return Array.from(doc.body.childNodes)
        .map(walk)
        .join('')
        .replace(/\n{3,}/g, '\n\n')
        .trim();
}

function EditBlogPage() {
    const editorRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const markdownInputRef = useRef<HTMLInputElement>(null);
    const [title, setTitle] = useState('我的文章标题');
    const [content, setContent] = useState(defaultContent);
    const [rawMarkdown, setRawMarkdown] = useState('');
    const [previewType, setPreviewType] = useState<'markdown' | 'html'>('markdown');

    useEffect(() => {
        if (editorRef.current) {
            editorRef.current.innerHTML = defaultContent;
        }
    }, []);

    const setEditorHtml = (html: string) => {
        if (editorRef.current) {
            editorRef.current.innerHTML = html;
        }
        setContent(html);
    };

    const updateContent = () => {
        setRawMarkdown('');
        setContent(editorRef.current?.innerHTML ?? '');
    };

    const execToolbar = (command: string, value?: string) => {
        if (!editorRef.current) return;

        if (command === 'createLink') {
            const url = window.prompt('请输入链接地址', 'https://');
            if (!url) return;
            document.execCommand(command, false, url);
        } else {
            document.execCommand(command, false, value ?? undefined);
        }

        editorRef.current.focus();
        updateContent();
    };

    const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file || !editorRef.current) return;

        const reader = new FileReader();
        reader.onload = () => {
            const dataUrl = reader.result;
            if (typeof dataUrl === 'string') {
                document.execCommand('insertImage', false, dataUrl);
                updateContent();
            }
        };
        reader.readAsDataURL(file);
        event.target.value = '';
    };

    const openImagePicker = () => {
        fileInputRef.current?.click();
    };

    const markdownToHtml = (markdown: string) => {
        const escapeHtml = (text: string) =>
            text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

        const parseInline = (text: string) =>
            escapeHtml(text)
                .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img alt="$1" src="$2" />')
                .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noreferrer">$1</a>')
                .replace(/`([^`]+)`/g, '<code>$1</code>')
                .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
                .replace(/\*([^*]+)\*/g, '<em>$1</em>')
                .replace(/__(.+?)__/g, '<u>$1</u>');

        const lines = markdown.replace(/\r\n/g, '\n').split('\n');
        let html = '';
        let inCodeBlock = false;
        let listType: 'ul' | 'ol' | null = null;

        const closeList = () => {
            if (listType) {
                html += `</${listType}>\n`;
                listType = null;
            }
        };

        lines.forEach((line) => {
            if (line.startsWith('```')) {
                if (!inCodeBlock) {
                    closeList();
                    html += '<pre><code>';
                    inCodeBlock = true;
                } else {
                    html += '</code></pre>\n';
                    inCodeBlock = false;
                }
                return;
            }

            if (inCodeBlock) {
                html += escapeHtml(line) + '\n';
                return;
            }

            if (/^#{1,6}\s+/.test(line)) {
                closeList();
                const level = line.match(/^#+/)?.[0].length ?? 1;
                const text = line.replace(/^#{1,6}\s+/, '').trim();
                html += `<h${level}>${parseInline(text)}</h${level}>\n`;
                return;
            }

            if (/^>\s?/.test(line)) {
                closeList();
                const text = line.replace(/^>\s?/, '').trim();
                html += `<blockquote>${parseInline(text)}</blockquote>\n`;
                return;
            }

            const ulMatch = /^([*-+])\s+(.+)$/.exec(line);
            const olMatch = /^(\d+)\.\s+(.+)$/.exec(line);

            if (ulMatch) {
                if (listType !== 'ul') {
                    closeList();
                    listType = 'ul';
                    html += '<ul>\n';
                }
                html += `<li>${parseInline(ulMatch[2].trim())}</li>\n`;
                return;
            }

            if (olMatch) {
                if (listType !== 'ol') {
                    closeList();
                    listType = 'ol';
                    html += '<ol>\n';
                }
                html += `<li>${parseInline(olMatch[2].trim())}</li>\n`;
                return;
            }

            closeList();

            if (line.trim() === '') {
                html += '<p><br/></p>\n';
            } else {
                html += `<p>${parseInline(line.trim())}</p>\n`;
            }
        });

        closeList();
        return html;
    };

    const handleMarkdownImport = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
            const text = reader.result;
            if (typeof text !== 'string') return;
            const html = markdownToHtml(text);
            setEditorHtml(html);
            setRawMarkdown(text);
            setPreviewType('markdown');
            setTitle((prevTitle) =>
                prevTitle.trim() === '' || prevTitle === '我的文章标题'
                    ? file.name.replace(/\.md$/, '')
                    : prevTitle
            );
        };
        reader.readAsText(file, 'utf-8');
        event.target.value = '';
    };

    const openMarkdownPicker = () => {
        markdownInputRef.current?.click();
    };

    const wordCount = useMemo(() => {
        const textOnly = content.replace(/<[^>]+>/g, '');
        return textOnly.trim().length;
    }, [content]);

    const persistDoc = (type: 'draft' | 'publish') => {
        const markdown = rawMarkdown ? rawMarkdown : htmlToMarkdown(content);
        const doc: SavedMarkdownDoc = {
            id: `${Date.now()}`,
            title: title || '未命名文章',
            markdown,
            html: content,
            savedAt: new Date().toISOString(),
            type,
        };
        saveDocToStorage(doc);
        return doc;
    };

    const saveDraft = () => {
        const doc = persistDoc('draft');
        window.alert(`草稿已保存：${doc.title}`);
        console.log('保存草稿：', doc);
    };

    const publish = () => {
        const doc = persistDoc('publish');
        window.alert(`文章已发布（模拟）：${doc.title}`);
        console.log('发布文章：', doc);
    };

    const markdown = useMemo(() => (rawMarkdown ? rawMarkdown : htmlToMarkdown(content)), [content, rawMarkdown]);

    const copyMarkdown = async () => {
        try {
            await navigator.clipboard.writeText(markdown);
            window.alert('Markdown 内容已复制到剪贴板。');
        } catch {
            window.alert('复制失败，请手动复制。');
        }
    };

    return (
        <div className="editor-page">
            <div className="editor-header">
                <div className="editor-title-area">
                    <label htmlFor="article-title">文章标题</label>
                    <input
                        id="article-title"
                        className="title-input"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="请输入文章标题，例如：React 富文本编辑器实现"
                    />
                </div>

                <div className="editor-actions">
                    <button type="button" className="save-btn" onClick={saveDraft}>
                        保存草稿
                    </button>
                    <button type="button" className="publish-btn" onClick={publish}>
                        发布文章
                    </button>
                </div>
            </div>

            <div className="toolbar">
                <button type="button" onClick={() => execToolbar('bold')} title="加粗">
                    B
                </button>
                <button type="button" onClick={() => execToolbar('italic')} title="斜体">
                    I
                </button>
                <button type="button" onClick={() => execToolbar('underline')} title="下划线">
                    U
                </button>
                <button type="button" onClick={() => execToolbar('formatBlock', 'H2')} title="标题">
                    H2
                </button>
                <button type="button" onClick={() => execToolbar('formatBlock', 'BLOCKQUOTE')} title="引用">
                    ❝
                </button>
                <button type="button" onClick={() => execToolbar('insertUnorderedList')} title="无序列表">
                    • 列表
                </button>
                <button type="button" onClick={() => execToolbar('insertOrderedList')} title="有序列表">
                    1. 列表
                </button>
                <button type="button" onClick={() => execToolbar('createLink')} title="插入链接">
                    🔗
                </button>
                <button type="button" onClick={openImagePicker} title="插入本地图片">
                    🖼️
                </button>
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleImageUpload}
                />
                <button type="button" onClick={openMarkdownPicker} title="导入本地 Markdown">
                    📄 导入 Markdown
                </button>
                <input
                    ref={markdownInputRef}
                    type="file"
                    accept=".md,.markdown"
                    style={{ display: 'none' }}
                    onChange={handleMarkdownImport}
                />
                <button type="button" onClick={() => execToolbar('formatBlock', 'PRE')} title="代码块">
                    {'</>'}
                </button>
                <button type="button" onClick={() => execToolbar('removeFormat')} title="清除格式">
                    清除
                </button>
            </div>

            <div className="editor-main">
                <div className="editor-panel">
                    <div className="panel-header">
                        <h3>编辑区</h3>
                        <span>编辑模式</span>
                    </div>
                    <div
                        ref={editorRef}
                        className="editor-area"
                        contentEditable
                        suppressContentEditableWarning
                        spellCheck={false}
                        onInput={updateContent}
                        onBlur={updateContent}
                    />
                    <div className="editor-status">
                        <span>当前字数：{wordCount}</span>
                        <span>模式：实时编辑</span>
                    </div>
                </div>

                <div className="preview-panel">
                    <div className="panel-header">
                        <h3>{previewType === 'markdown' ? 'Markdown 预览' : 'HTML 预览'}</h3>
                        <div className="preview-actions">
                            <button
                                type="button"
                                className="save-btn"
                                onClick={() => setPreviewType(previewType === 'markdown' ? 'html' : 'markdown')}
                            >
                                {previewType === 'markdown' ? '切换 HTML' : '切换 Markdown'}
                            </button>
                            <button type="button" className="publish-btn" onClick={copyMarkdown}>
                                复制 Markdown
                            </button>
                        </div>
                    </div>
                    <div className="preview-area">
                        {previewType === 'markdown' ? (
                            <>
                                {rawMarkdown && (
                                    <div className="markdown-note">原始导入 Markdown 内容，若编辑区变更此内容会同步更新。</div>
                                )}
                                <pre>{markdown}</pre>
                            </>
                        ) : (
                            <div className="html-preview" dangerouslySetInnerHTML={{ __html: content }} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditBlogPage;
