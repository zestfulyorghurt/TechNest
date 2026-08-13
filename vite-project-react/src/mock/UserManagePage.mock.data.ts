// ================================================================
// UserManagePage（用户管理页）假数据
// ================================================================

export interface ManageUser {
    id: number;
    name: string;
    avatar: string;
    bg: string;
    userId: string;
    phone: string;
    email: string;
    role: 'admin' | 'vip' | 'user';
    roleText: string;
    status: 'active' | 'inactive';
    statusText: string;
    registerTime: string;
}

export const userStats = [
    { label: '👤 总用户', value: '1,284', change: '较上月 +42 人' },
    { label: '活跃用户', value: 892, change: '占比 69.5%', dot: 'active' },
    { label: '已停用', value: 36, change: '较上月 +3 人', dot: 'inactive', negative: true },
    { label: 'VIP 用户', value: 128, change: '较上月 +18 人', dot: 'vip' },
    { label: '管理员', value: 6, change: '—', dot: 'admin' },
];

export const manageUsers: ManageUser[] = [
    { id: 1, name: '赵同学', avatar: '赵', bg: '#4f6ef7', userId: 'ID: 1001', phone: '138****1234', email: 'zhao@tech.com', role: 'admin', roleText: '管理员', status: 'active', statusText: '活跃', registerTime: '2024-06-15' },
    { id: 2, name: 'bug菌', avatar: 'bug', bg: '#f59e0b', userId: 'ID: 1002', phone: '139****5678', email: 'bug@tech.com', role: 'vip', roleText: 'VIP 用户', status: 'active', statusText: '活跃', registerTime: '2024-08-03' },
    { id: 3, name: '张三', avatar: '张', bg: '#16a34a', userId: 'ID: 1003', phone: '136****9012', email: 'zhangsan@mail.com', role: 'user', roleText: '普通用户', status: 'active', statusText: '活跃', registerTime: '2024-11-20' },
    { id: 4, name: '李四', avatar: '李', bg: '#e67e22', userId: 'ID: 1004', phone: '135****3456', email: 'lisi@mail.com', role: 'user', roleText: '普通用户', status: 'inactive', statusText: '已停用', registerTime: '2025-01-12' },
    { id: 5, name: '王五', avatar: '王', bg: '#8b5cf6', userId: 'ID: 1005', phone: '137****7890', email: 'wangwu@mail.com', role: 'vip', roleText: 'VIP 用户', status: 'active', statusText: '活跃', registerTime: '2025-03-08' },
];
