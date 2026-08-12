import BlogCard from "@/view/compoent/BlogCard";
import HotArticles from "@/view/compoent/HotArticles";
import RecommendedAuthors from "@/view/compoent/RecommendedAuthors";

const TestPage: React.FC = () => {
    const hotArticles = [
        {
            id: 1,
            title: '《YOLOv8实战：从入门到深度优化》总目录导航',
            index: 1,
            tag: '置顶' as const,
            onClick: () => console.log('跳转至文章详情页'),
        },
        {
            id: 2,
            title: '《滚雪球学SpringBoot》教程导航帖（更新于2026.4.10）',
            index: 2,
            tag: '置顶' as const,
            onClick: () => console.log('跳转至文章详情页'),
        },
        {
            id: 3,
            title: '手把手教你DeepSeek-R1本地部署和企业知识库搭建',
            index: 3,
            tag: '热' as const,
            onClick: () => console.log('跳转至文章详情页'),
        },
        {
            id: 4,
            title: 'SpringBoot入门：轻松搭建开发环境，启动你的第一个Web项目！',
            index: 4,
            tag: '热' as const,
            onClick: () => console.log('跳转至文章详情页'),
        },
        {
            id: 5,
            title: 'YOLOv9 核心思想与发展背景：从YOLOv7到PGI/GELAN',
            index: 5,
            onClick: () => console.log('跳转至文章详情页'),
        },
    ];

    const authors = [
        {
            id: 1,
            name: 'bug菌',
            avatar: 'bug',
            desc: 'Java · 算法 · 16万粉丝',
            avatarBg: '#4f6ef7',
            isFollowing: false,
            onFollow: (id, isFollowing) => {
                console.log(`用户 ${id} ${isFollowing ? '已关注' : '取消关注'}`);
            },
        },
        {
            id: 2,
            name: '张三',
            avatar: '张',
            desc: '前端 · React · 2.3万粉丝',
            avatarBg: '#e67e22',
            isFollowing: true,
            onFollow: (id, isFollowing) => {
                console.log(`用户 ${id} ${isFollowing ? '已关注' : '取消关注'}`);
            },
        },
        {
            id: 3,
            name: '李四',
            avatar: '李',
            desc: '全栈 · TypeScript · 1.8万粉丝',
            avatarBg: '#16a34a',
            isFollowing: false,
            onFollow: (id, isFollowing) => {
                console.log(`用户 ${id} ${isFollowing ? '已关注' : '取消关注'}`);
            },
        },
        {
            id: 4,
            name: '王五',
            avatar: '王',
            desc: '后端 · Spring · 9.8k粉丝',
            avatarBg: '#8b5cf6',
            isFollowing: false,
            onFollow: (id, isFollowing) => {
                console.log(`用户 ${id} ${isFollowing ? '已关注' : '取消关注'}`);
            },
        },
    ];

    return (
        <div>
            <BlogCard
                author={{
                    name: 'bug菌',
                    avatar: 'bug',
                    level: '码龄8年',
                    avatarBg: '#4f6ef7',
                }}
                title="YOLOv9 核心思想与发展背景"
                summary="该专栏系统梳理全网主流 YOLOv9 改进方法..."
                tags={['人工智能', '计算机视觉']}
                stats={{ views: 8100, likes: 128, comments: 23 }}
                publishDate="2026-08-02"
                coverImage="https://example.com/cover.jpg"
                onClick={() => console.log('跳转')} id={""} />

            <HotArticles articles={hotArticles} />
            <RecommendedAuthors authors={authors} />
        </div>
    );
};
export default TestPage;