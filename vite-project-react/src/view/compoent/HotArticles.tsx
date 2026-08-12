import React from 'react';
import '@/view/style/HotArticles.css';

// ================================================================
// 类型定义
// ================================================================

interface HotArticle {
    id: string | number;
    title: string;
    index: number; // 排名 1-5
    tag?: '置顶' | '热' | ''; // 标签类型
    onClick?: () => void;
}

interface HotArticlesProps {
    articles: HotArticle[];
    title?: string;
    className?: string;
}

// ================================================================
// 热门文章组件
// ================================================================

const HotArticles: React.FC<HotArticlesProps> = ({
    articles,
    title = '🔥 热门文章',
    className = '',
}) => {
    const getIndexClass = (index: number): string => {
        if (index === 1) return 'hot-index top1';
        if (index === 2) return 'hot-index top2';
        if (index === 3) return 'hot-index top3';
        return 'hot-index';
    };

    const getTagClass = (tag?: string): string => {
        if (tag === '置顶') return 'hot-tag top';
        if (tag === '热') return 'hot-tag hot';
        return '';
    };

    return (
        <div className={`sidebar-card ${className}`}>
            <div className="card-title">{title}</div>
            <div className="hot-list">
                {articles.map((article) => (
                    <div
                        key={article.id}
                        className="hot-item"
                        onClick={article.onClick}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => e.key === 'Enter' && article.onClick?.()}
                    >
                        <span className={getIndexClass(article.index)}>{article.index}</span>
                        <span className="hot-title">{article.title}</span>
                        {article.tag && (
                            <span className={getTagClass(article.tag)}>{article.tag}</span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HotArticles;