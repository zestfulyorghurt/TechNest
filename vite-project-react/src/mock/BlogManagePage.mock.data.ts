// ================================================================
// BlogManagePage（博客管理页）假数据
// ================================================================

export interface ManageBlog {
    id: number;
    title: string;
    author: { name: string; avatar: string; bg: string; id: string };
    status: 'pending' | 'passed' | 'rejected' | 'draft';
    statusText: string;
    publishTime: string;
    views: number;
}

export const blogStats = [
    { label: '全部博客', value: 42, dot: 'total' },
    { label: '待审核', value: 7, dot: 'pending' },
    { label: '已通过', value: 28, dot: 'passed' },
    { label: '已打回', value: 4, dot: 'rejected' },
    { label: '草稿', value: 3, dot: 'draft' },
];

export const manageBlogs: ManageBlog[] = [
    { id: 1, title: '深入理解 React Hooks 原理与最佳实践', author: { name: '张三', avatar: '张', bg: '#4f6ef7', id: 'ID: 1001' }, status: 'pending', statusText: '待审核', publishTime: '2026-08-12 14:32', views: 1283 },
    { id: 2, title: 'Vue 3 组合式 API 实战指南与源码分析', author: { name: '李四', avatar: '李', bg: '#e67e22', id: 'ID: 1002' }, status: 'passed', statusText: '已通过', publishTime: '2026-08-11 09:15', views: 2341 },
    { id: 3, title: 'Tailwind CSS 在大型项目中的最佳实践', author: { name: '王五', avatar: '王', bg: '#16a34a', id: 'ID: 1003' }, status: 'passed', statusText: '已通过', publishTime: '2026-08-10 16:20', views: 1892 },
    { id: 4, title: 'Spring Boot 3.0 从入门到实战', author: { name: '张三', avatar: '张', bg: '#4f6ef7', id: 'ID: 1001' }, status: 'rejected', statusText: '已打回', publishTime: '2026-08-09 11:05', views: 647 },
    { id: 5, title: 'AI 辅助编程：从 Copilot 到 Agent（草稿）', author: { name: '李四', avatar: '李', bg: '#e67e22', id: 'ID: 1002' }, status: 'draft', statusText: '草稿', publishTime: '2026-08-08 20:00', views: 0 },
];
