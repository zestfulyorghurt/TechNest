// ================================================================
// ProfileEditPage（个人资料编辑页）假数据
// ================================================================

export const provinceOptions = ['北京市', '上海市', '广东省', '浙江省', '江苏省', '四川省', '山东省', '湖北省', '湖南省', '福建省', '其他'];

export const initialProfile = {
    nickname: '张同学',
    birthday: '1995-06-15',
    occupation: '前端工程师',
    province: '广东省',
    bio: '学习，这辈子是不可能学的',
    phone: '138****1234',
    email: 'zhang@tech.com',
    github: 'zhangtongxue',
    tags: ['React', 'TypeScript', 'Spring Boot', 'MySQL'],
};

export const securityItems = [
    { label: '密码', desc: '建议定期更换密码以保障账户安全', status: '已设置', action: '修改密码', danger: false },
    { label: '手机号', desc: '138****1234', status: '已验证', action: '换绑', danger: false },
    { label: '邮箱', desc: 'zhang@tech.com', status: '未验证', action: '验证', danger: false },
    { label: '第三方绑定', desc: '微信 · QQ · GitHub', status: '已绑定 3 个', action: '管理', danger: false },
    { label: '注销账号', desc: '注销后所有数据将被永久删除', status: '', action: '注销账号', danger: true },
];
