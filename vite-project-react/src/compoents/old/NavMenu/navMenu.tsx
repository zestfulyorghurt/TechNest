import './navMenu.css';

function NavMenu() {
    return <div className="navMenu"
    >
        <div className="navMenu-logo">
            <img className='navMenu-logo-icon' src='/favicon.svg' />
        </div>
        <div>
            <span>ZY的博客园</span>
        </div>
        <div className="navMenu-fun-btn">
            <div className='navMenu-fun-btn-container'>
                <div style={{ display: 'flex', flexDirection: "column" }}>
                    <span>
                        访问量
                    </span>
                    <span>
                        100
                    </span>
                </div>
                <div style={{ display: 'flex', flexDirection: "column" }}>
                    <span>
                        点赞数
                    </span>
                    <span>
                        100
                    </span>
                </div>
                <div style={{ display: 'flex', flexDirection: "column" }}>
                    <span>
                        博客数
                    </span>
                    <span>
                        100
                    </span>
                </div>
            </div>
        </div>
    </div >;
}

export default NavMenu;
