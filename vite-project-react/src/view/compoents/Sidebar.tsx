import React from 'react';
import HotArticles from '@/compoents/HotArticles';
import RecommendedAuthors from '@/compoents/RecommendedAuthors';
import AboutCard from '@/compoents/AboutCard';
import '@/styles/Sidebar.css';

// ================================================================
// 类型定义
// ================================================================

interface SidebarProps {
    /** 热门文章列表 */
    hotArticles: React.ComponentProps<typeof HotArticles>['articles'];
    /** 推荐作者列表 */
    authors: React.ComponentProps<typeof RecommendedAuthors>['authors'];
    className?: string;
}

// ================================================================
// 右侧边栏组件
// ================================================================

const Sidebar: React.FC<SidebarProps> = ({
    hotArticles,
    authors,
    className = '',
}) => {
    return (
        <aside className={`sidebar ${className}`}>
            <HotArticles articles={hotArticles} />
            <RecommendedAuthors authors={authors} />
            <AboutCard />
        </aside>
    );
};

export default Sidebar;
