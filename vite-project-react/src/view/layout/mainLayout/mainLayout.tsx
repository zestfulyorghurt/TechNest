import NavMenu from '@/compoent/NavMenu/navMenu';
import '@/view/layout/mainLayout/mainLayout.css';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import Divider from '@mui/material/Divider';

function MainLayout() {
    const [blog, setBlog] = useState([1, 6])
    return (
        <div style={{
            backgroundImage: "url('/background.jpg')",
            overflow: "hidden",
            display: "flex",
            height: "100vh",
            flexDirection: "column",
        }}>
            <div style={{ overflowY: "auto" }}>
                <div className="main-layout">
                    <div className="header-layout" style={{ position: "sticky", top: "0" }}></div>
                    <div style={{
                        display: "flex",
                        alignItems: "flex-end",
                        height: "35vh",
                        position: "relative",
                        overflow: "hidden"
                    }}>
                        {/* 波浪层 */}
                        <div className="wave-bg-container">
                            <div className="wave-bg wave-dark"></div>
                            <div className="wave-bg wave-light"></div>
                        </div>
                    </div>
                    <div className="content-menu-layout"
                    >
                        <div className="menu-layout" style={{ height: "65vh", position: "sticky", top: "70px", display: "flex", flexDirection: "column", gap: "24px" }}>
                            <NavMenu />
                            <div style={{ borderRadius: "10px", display: "flex", flexDirection: "column", gap: "8px", padding: "12px", boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)", userSelect: "none" }}>
                                <div>
                                    <span>搜索</span>
                                </div>
                                <Divider></Divider>
                                <Autocomplete
                                    disablePortal
                                    options={[]}
                                    renderInput={(params) => <TextField {...params} label="Movie" />}
                                />
                            </div>
                        </div>
                        <div className="content-layout">
                            {
                                blog.map((item, index) => {
                                    return (
                                        <div className='card-container'>
                                            <div style={{ border: "1px solid #000000", borderRadius: "20px", display: "flex", justifyContent: "center", alignItems: "center", maxHeight: "100px" }}>
                                                <img className="card-img" src='/favicon.svg' />
                                            </div>
                                            <div style={{ display: 'flex', flexDirection: "column", justifyContent: "space-between", maxHeight: "100px" }}>
                                                <span style={{ fontSize: '20px' }}>博客文章的标题</span>
                                                <span style={{ fontSize: '14px' }}>博客文章的内容博客文章的内容博客文章的内容博客</span>
                                                <div style={{ display: 'flex', flexDirection: "column" }}>
                                                    <div style={{ display: 'flex', flexDirection: "row", gap: "10px" }}>
                                                        <span style={{ fontSize: '12px' }}>发布时间 2021-01-01 17:50</span>
                                                    </div>
                                                    <div style={{ display: 'flex', flexDirection: "row", gap: "10px" }}>
                                                        <div style={{ display: 'flex', flexDirection: "row", alignItems: "center", gap: "3px" }}>
                                                            <span style={{ fontSize: '12px' }}>1000 点赞</span>
                                                            <img style={{ width: "16px", height: "16px" }} src='/agreen_unselect.svg' />
                                                        </div>
                                                        <div style={{ display: 'flex', flexDirection: "row", alignItems: "center", gap: "3px" }}>
                                                            <span style={{ fontSize: '12px' }}>1000 评论</span>
                                                            <img style={{ width: "16px", height: "16px" }} src='/just.svg' />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default MainLayout;