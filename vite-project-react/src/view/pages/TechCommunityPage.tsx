import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BlogCard from '@/compoents/BlogCard';
import '@/styles/TechCommunityPage.css';
import Navbar from '@/compoents/Navbar';
import CategoryTabs from '@/view/compoents/CategoryTabs';
import SortToolbar from '@/view/compoents/SortToolbar';
import Sidebar from '@/view/compoents/Sidebar';
import {
    blogPosts,
    categories,
    hotArticles,
    recommendedAuthors,
    sortOptions,
} from '@/mock/TechCommunityPage.mock.data';

const TechCommunityPage: React.FC = () => {
    // ===== 状态管理 =====
    const [activeCategory, setActiveCategory] = useState('全部');
    const [activeSort, setActiveSort] = useState('最新');
    const navigate = useNavigate();

    // ===== 事件处理 =====
    const handleLoadMore = () => {
        alert('加载更多文章');
    };

    // ===== 过滤文章 =====
    const filteredPosts = activeCategory === '全部'
        ? blogPosts
        : blogPosts.filter(post => post.tags.includes(activeCategory));

    return (
        <div className="tech-community">
            {/* ===== 导航栏 ===== */}
            <Navbar />
            {/* ===== 主容器 ===== */}
            <div className="container">
                {/* ===== 左侧：内容区 ===== */}
                <main className="main-content">
                    {/* 分类标签 */}
                    <CategoryTabs
                        categories={categories}
                        active={activeCategory}
                        onChange={setActiveCategory}
                    />
                    {/* 排序工具栏 */}
                    <SortToolbar
                        options={sortOptions}
                        active={activeSort}
                        onChange={setActiveSort}
                        resultCount={filteredPosts.length}
                    />
                    {/* 博客卡片列表 */}
                    {filteredPosts.map((post) => (
                        <BlogCard
                            key={post.id}
                            {...post}
                            onClick={() => navigate('/BlogDetailPage')}
                        />
                    ))}
                    {/* 加载更多 */}
                    <div className="load-more">
                        <button onClick={handleLoadMore}>加载更多</button>
                    </div>
                </main>
                {/* ===== 右侧边栏 ===== */}
                <Sidebar hotArticles={hotArticles} authors={recommendedAuthors} />
            </div>
        </div>
    );
};

export default TechCommunityPage;