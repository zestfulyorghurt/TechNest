// ================================================================
// MyBlogsPage（个人博客管理页）假数据
// ================================================================

export interface MyBlog {
    id: number;
    title: string;
    category: string;
    status: 'passed' | 'pending' | 'rejected' | 'draft';
    statusText: string;
    publishTime: string;
    views: number;
    likes: number;
    top?: boolean;
}

export const myBlogStats = [
    { label: '全部', value: 42, dot: 'all' },
    { label: '待审核', value: 3, dot: 'pending' },
    { label: '已通过', value: 28, dot: 'passed' },
    { label: '已打回', value: 2, dot: 'rejected' },
    { label: '草稿', value: 9, dot: 'draft' },
];

export const myBlogs: MyBlog[] = [
    { id: 1, title: '📌 深入理解 React Hooks 原理与最佳实践', category: '前端', status: 'passed', statusText: '已通过', publishTime: '2026-08-12', views: 1283, likes: 89, top: true },
    { id: 2, title: 'TypeScript 5.5 高级类型推导技巧', category: '前端', status: 'pending', statusText: '待审核', publishTime: '2026-08-10', views: 856, likes: 43 },
    { id: 3, title: 'Spring Boot 3.0 从入门到实战', category: '后端', status: 'passed', statusText: '已通过', publishTime: '2026-08-08', views: 2104, likes: 156 },
    { id: 4, title: 'Docker 容器化部署从入门到精通', category: 'DevOps', status: 'rejected', statusText: '已打回', publishTime: '2026-08-06', views: 647, likes: 28 },
    { id: 5, title: 'Vue 3 组合式 API 实战指南（草稿）', category: '前端', status: 'draft', statusText: '草稿', publishTime: '2026-08-04', views: 0, likes: 0 },
];
