// ================================================================
// BlogEditPage（博客编辑页）假数据
// ================================================================

export interface ToolItem {
    label: string;
    icon: string;
}

export const toolbarGroups: ToolItem[][] = [
    [
        { label: '撤销', icon: 'undo' },
        { label: '重做', icon: 'redo' },
        { label: '历史', icon: 'history' },
    ],
    [
        { label: '格式', icon: 'heading' },
        { label: '加粗', icon: 'bold' },
        { label: '颜色', icon: 'underline' },
        { label: '背景', icon: 'fill' },
        { label: '其他', icon: 'more' },
    ],
    [
        { label: '列表', icon: 'list' },
        { label: '对齐', icon: 'align' },
        { label: '水平线', icon: 'align' },
        { label: '块引用', icon: 'quote' },
        { label: '代码', icon: 'code' },
        { label: '资源绑定', icon: 'upload' },
        { label: '表格', icon: 'table' },
    ],
    [
        { label: '图像', icon: 'image' },
        { label: '视频', icon: 'video' },
        { label: '公式', icon: 'sigma' },
        { label: '链接', icon: 'link' },
        { label: '模板', icon: 'template' },
        { label: '目录', icon: 'catalog' },
        { label: '投票', icon: 'vote' },
        { label: '宽屏', icon: 'fullscreen' },
    ],
    [
        { label: '使用 MD 编辑器', icon: 'switch' },
    ],
];

export const aiActions = [
    { label: '大纲生成', icon: 'lines' },
    { label: '代码生成', icon: 'code' },
    { label: '学术搜索', icon: 'search' },
];

export const articleTypeOptions = ['原创', '转载', '翻译'];
export const publishScopeOptions = ['公开可见', '粉丝可见', '私密文章'];
export const articleCategoryOptions = ['前端开发', '后端开发', '人工智能', '项目复盘'];
export const articleColumnOptions = ['技术成长笔记', '工程实践', 'AI 应用探索'];

export const tagOptions = ['JavaScript', '前端', 'Vue', '性能优化', '工程化'];
export const declarationOptions = ['允许评论', '展示目录', '同步到社区'];
