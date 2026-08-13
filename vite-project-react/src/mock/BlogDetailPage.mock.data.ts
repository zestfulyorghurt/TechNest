// ================================================================
// BlogDetailPage（博客详情页）假数据
// ================================================================

// ===== 类型定义 =====

export interface CommentItem {
    id: number;
    author: string;
    avatar: string;
    isAuthor?: boolean;
    text?: string;
    quote?: { author: string; text: string };
    time: string;
    likes: number;
    replies?: CommentItem[];
}

export interface AuthorCard {
    avatar: string;
    name: string;
    level: string;
    domain: string;
    stats: { label: string; value: string }[];
    bio: { label: string; value: string }[];
}

export interface RecommendArticle {
    id: number;
    title: string;
    tag: '置顶' | '热';
}

// ===== 数据 =====

export const blogDetail = {
    title: 'YOLOv9【第一章：零基础入门篇·第1节】YOLOv9核心思想与发展背景：从YOLOv7到PGI/GELAN！',
    meta: [
        { label: '原创于 2026-08-02 10:00:00' },
        { label: '阅读 8.1k' },
        { label: '9.8k 赞' },
        { label: '16万 收藏' },
    ],
    categories: [
        { name: '人工智能', color: '' },
        { name: '计算机视觉', color: 'blue' },
        { name: '目标检测', color: 'orange' },
        { name: 'YOLOv9', color: 'purple' },
        { name: '深度学习', color: 'pink' },
    ],
    likeCount: '9.8k',
    favoriteCount: '16万',
};

export const blogContent = {
    intro: [
        { type: 'h2' as const, text: '学 YOLO，还得跟「bug菌」学' },
        { type: 'p' as const, text: '本文收录于《YOLOv9实战：从入门到深度优化》专栏。' },
        { type: 'p' as const, text: '该专栏系统复现并深度梳理全网主流 YOLOv9 改进方法与工程实战案例，覆盖分类、目标检测、实例分割、多目标追踪等方向。' },
    ],
    code: `import torch
from yolov9 import YOLOv9
model = YOLOv9('yolov9-c.pt')
results = model.predict('image.jpg')
results.show()`,
};

export const authorCard: AuthorCard = {
    avatar: 'bug',
    name: 'bug菌',
    level: '博客等级 码龄8年',
    domain: 'Java、算法与数据结构技术领域',
    stats: [
        { label: '原创', value: '16万' },
        { label: '点赞', value: '9.8k' },
        { label: '收藏', value: '16万' },
        { label: '粉丝', value: '16万' },
    ],
    bio: [
        { label: '博客等级', value: '博客等级 码龄8年' },
        { label: '技术领域', value: 'Java、算法与数据结构技术领域' },
    ],
};

export const recommendArticles: RecommendArticle[] = [
    { id: 1, title: '《YOLOv8实战：从入门到深度优化》总目录', tag: '置顶' },
    { id: 2, title: '《滚雪球学SpringBoot》教程导航帖', tag: '置顶' },
    { id: 3, title: '手把手教你DeepSeek-R1本地部署', tag: '热' },
    { id: 4, title: 'SpringBoot入门：轻松搭建开发环境', tag: '热' },
];

export const initialComments: CommentItem[] = [
    {
        id: 1,
        author: '陈同学',
        avatar: '陈',
        isAuthor: true,
        text: '写得很详细，对 YOLOv9 的理解又加深了一层。特别是关于 PGI 和 GELAN 的对比分析非常清晰！',
        time: '2026-08-12 14:32',
        likes: 12,
        replies: [
            {
                id: 11,
                author: '张三',
                avatar: '张',
                text: '确实，PGI 的设计思路很值得借鉴。',
                time: '2026-08-12 15:10',
                likes: 3,
            },
            {
                id: 12,
                author: '李四',
                avatar: '李',
                quote: { author: '张三', text: '确实，PGI 的设计思路很值得借鉴。' },
                text: '同意，PGI 的梯度信息设计确实很有启发性。',
                time: '2026-08-12 15:35',
                likes: 5,
            },
        ],
    },
    {
        id: 2,
        author: '王五',
        avatar: '王',
        text: '已收藏，准备二刷。感谢分享！',
        time: '2026-08-12 11:45',
        likes: 8,
    },
];
