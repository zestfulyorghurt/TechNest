// ================================================================
// FootprintPage（个人足迹页）假数据
// ================================================================

export const footprintStats = [
    { icon: '📝', num: 42, label: '总文章', change: '较上月 +6 篇', negative: false },
    { icon: '❤️', num: '1,284', label: '获赞总数', change: '较上月 +156', negative: false },
    { icon: '⭐', num: 368, label: '收藏总数', change: '较上月 +42', negative: false },
    { icon: '💬', num: 89, label: '评论总数', change: '较上月 -3', negative: true },
];

export interface FootprintItem {
    id: number;
    dot: string;
    title: string;
    highlight?: string;
    desc: string;
    time: string;
    tag: string;
    tagColor?: string;
    extra: string;
    ago: string;
}

export const footprints: FootprintItem[] = [
    { id: 1, dot: 'blue', title: '发布文章', highlight: '《深入理解 React Hooks 原理》', desc: '文章已通过审核，获得 23 次阅读', time: '2026-08-12 14:32', tag: '文章', extra: '👁️ 23 阅读', ago: '2 小时前' },
    { id: 2, dot: 'green', title: '获得点赞', highlight: '《Vue 3 组合式 API 实战》', desc: '张三 点赞了你的文章', time: '2026-08-12 13:20', tag: '点赞', tagColor: 'blue', extra: '❤️ +1', ago: '3 小时前' },
    { id: 3, dot: 'orange', title: '发表评论', desc: '在《CSS 网格布局完全指南》下回复：写得很详细，感谢分享！', time: '2026-08-12 11:45', tag: '评论', tagColor: 'orange', extra: '💬 回复', ago: '5 小时前' },
    { id: 4, dot: 'purple', title: '收藏文章', highlight: '《TypeScript 高级类型推导》', desc: '已添加到「技术进阶」收藏夹', time: '2026-08-12 10:30', tag: '收藏', extra: '⭐ 已收藏', ago: '6 小时前' },
    { id: 5, dot: 'pink', title: '关注了', highlight: 'bug菌', desc: '你关注了 bug菌，TA 有 16 万粉丝', time: '2026-08-12 09:15', tag: '关注', tagColor: 'blue', extra: '👥 互相关注', ago: '8 小时前' },
    { id: 6, dot: 'red', title: '文章被收藏', highlight: '《Spring Boot 3.0 入门》', desc: '李四 收藏了你的文章', time: '2026-08-12 08:40', tag: '收藏', extra: '⭐ +1', ago: '9 小时前' },
    { id: 7, dot: 'blue', title: '发布文章', highlight: '《Docker 容器化部署实战》', desc: '文章已发布，正在审核中', time: '2026-08-11 21:00', tag: '文章', extra: '⏳ 审核中', ago: '昨天' },
];

export const tagCloud = [
    { text: 'React', size: 'xl' }, { text: 'TypeScript', size: 'lg' }, { text: 'Spring Boot', size: 'lg' },
    { text: 'Vue.js', size: 'md' }, { text: 'Java', size: 'xl' }, { text: 'MySQL', size: 'sm' },
    { text: 'Docker', size: 'lg' }, { text: 'Python', size: 'sm' }, { text: 'AI', size: 'md' },
    { text: '机器学习', size: 'md' }, { text: '前端', size: 'lg' }, { text: '后端', size: 'xl' },
    { text: 'DevOps', size: 'sm' }, { text: '微服务', size: 'md' }, { text: 'Kubernetes', size: 'sm' },
    { text: 'GraphQL', size: 'md' }, { text: 'Redis', size: 'sm' }, { text: 'RabbitMQ', size: 'md' },
];
