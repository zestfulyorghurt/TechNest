import React from 'react';
import '@/styles/SortToolbar.css';

// ================================================================
// 类型定义
// ================================================================

interface SortToolbarProps {
    /** 排序选项列表 */
    options: string[];
    /** 当前选中的排序方式 */
    active?: string;
    /** 切换排序方式回调 */
    onChange?: (sort: string) => void;
    /** 结果数量（不传则不显示） */
    resultCount?: number;
    className?: string;
}

// ================================================================
// 排序工具栏组件
// ================================================================

const SortToolbar: React.FC<SortToolbarProps> = ({
    options,
    active,
    onChange,
    resultCount,
    className = '',
}) => {
    return (
        <div className={`toolbar ${className}`}>
            <div className="sort-options">
                {options.map((sort) => (
                    <button
                        key={sort}
                        className={`sort-btn ${active === sort ? 'active' : ''}`}
                        onClick={() => onChange?.(sort)}
                    >
                        {sort}
                    </button>
                ))}
            </div>
            {resultCount !== undefined && (
                <span className="result-count">共 {resultCount} 篇文章</span>
            )}
        </div>
    );
};

export default SortToolbar;
