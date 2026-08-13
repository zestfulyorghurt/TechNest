// ================================================================
// ProfilePage（个人主页）假数据
// ================================================================

export const profile = {
    avatar: '张',
    name: '张同学',
    level: '码龄7年',
    status: '患了无法学习的病',
    isVip: true,
    stats: [
        { num: '21,898', label: '总访问量' },
        { num: '15', label: '原创' },
        { num: '8', label: '粉丝' },
    ],
    info: [
        { label: 'IP属地', value: '山东省' },
        { label: '加入时间', value: '2019-03-03' },
        { label: '个人简介', value: '学习，这辈子是不可能学的' },
    ],
    achievements: [
        { icon: '❤️', text: '获得 15 次点赞' },
        { icon: '💬', text: '内容获得 6 次评论' },
        { icon: '⭐', text: '获得 12 次收藏' },
        { icon: '🏅', text: '博客总排名 537,447 名' },
    ],
};

export const profileTabs = [
    { key: 'recent', label: '最近' },
    { key: 'articles', label: '文章 15' },
    { key: 'columns', label: '专栏 5' },
    { key: 'favorites', label: '收藏' },
    { key: 'follow', label: '关注/订阅/互动' },
];

export const miniStats = [
    { num: '15', label: '文章' },
    { num: '5', label: '专栏' },
    { num: '12', label: '收藏' },
    { num: '22', label: '关注' },
];

export const recentArticles = [
    { id: 1, title: 'eclipse报错500，按着步骤来的，结果连不上数据库', meta: '原创 · 2024.06.27', tag: '笔记', views: 849 },
    { id: 2, title: 'idea的maven工程导入eclipse问题', meta: '原创 · 2024.06.20', tag: '笔记', views: 357 },
    { id: 3, title: 'xiamarin整合Braze实现送信和端末通知', meta: '原创 · 2022.07.11', tag: '工作项目', views: 831 },
    { id: 4, title: 'RabbitMQ简介', meta: '原创 · 2022.06.22', tag: '中间件', views: 357 },
];

export const columns = [
    { id: 1, icon: '📘', color: 'green', name: 'xamrin整合Braze', meta: '原创博文更新于 2022.07.11 · 831阅读', count: '1篇' },
    { id: 2, icon: '📗', color: 'orange', name: '笔记', meta: '11篇 · MYSQL使用技巧 · RabbitMQ简介', count: '11篇' },
    { id: 3, icon: '📙', color: 'purple', name: '工作项目', meta: '1篇 · 原创博文更新于 2022.06.22', count: '1篇' },
    { id: 4, icon: '📕', color: 'pink', name: '中间件', meta: '1篇 · RabbitMQ简介 · 357阅读', count: '1篇' },
];

export const following = [
    { id: 1, name: 'bug菌', avatar: 'bug', bg: '#4f6ef7', fans: '16万粉丝' },
    { id: 2, name: '张三', avatar: '张', bg: '#e67e22', fans: '2.3万粉丝' },
    { id: 3, name: '李四', avatar: '李', bg: '#16a34a', fans: '1.8万粉丝' },
    { id: 4, name: '王五', avatar: '王', bg: '#8b5cf6', fans: '9.8k粉丝' },
];
