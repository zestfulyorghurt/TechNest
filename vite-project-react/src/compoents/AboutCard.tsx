import PropTypes from 'prop-types';
import '@/styles/AboutCard.css';  // 直接导入，不用 styles 对象

const AboutCard = ({
  title = '🌱 关于 TechNest',
  description = '一个技术记录、分享与交友的社区。在这里，你可以记录学习心得、分享技术见解，通过技术结交志同道合的朋友。',
  stats = {
    posts: 28,
    members: 156,
    interactions: '2.4k',
  },
  className = '',
}) => {
  return (
    <div className={`about-card ${className}`}>
      <div className="card-title">{title}</div>
      <p className="description">{description}</p>
      <div className="stats">
        <span>📝 {stats.posts} 篇文章</span>
        <span>👥 {stats.members} 位成员</span>
        <span>❤️ {stats.interactions} 互动</span>
      </div>
    </div>
  );
};

AboutCard.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  stats: PropTypes.shape({
    posts: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    members: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    interactions: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  className: PropTypes.string,
};

export default AboutCard;