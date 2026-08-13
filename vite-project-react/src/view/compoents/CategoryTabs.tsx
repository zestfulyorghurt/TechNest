import React from 'react';
import '@/styles/CategoryTabs.css';

// ================================================================
// 类型定义
// ================================================================

interface CategoryTabsProps {
    /** 分类列表 */
    categories: string[];
    /** 当前选中的分类 */
    active?: string;
    /** 切换分类回调 */
    onChange?: (category: string) => void;
    className?: string;
}

// ================================================================
// 分类标签组件
// ================================================================

const CategoryTabs: React.FC<CategoryTabsProps> = ({
    categories,
    active,
    onChange,
    className = '',
}) => {
    return (
        <div className={`category-tabs ${className}`}>
            {categories.map((category) => (
                <button
                    key={category}
                    className={`tab-btn ${active === category ? 'active' : ''}`}
                    onClick={() => onChange?.(category)}
                >
                    {category}
                </button>
            ))}
        </div>
    );
};

export default CategoryTabs;
