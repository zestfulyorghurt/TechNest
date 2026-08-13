import { useG0001Store } from "@/store/g0001";
import { useCallback, useEffect, useState } from "react";

export function useViewLogicState() {
    /**************************************************
     * 1.获取全局的数据
     * zustore/sessionStorage/localStorage
     **************************************************/
    const {
        /** 全局的静态文本 */
        staticLabel
    } = useG0001Store()

    /**************************************************
     * 2.画面所需数据定义
     * 画面中所有的数据
     **************************************************/
    const [data, setData] = useState<dataInterface>({
        singUpTitle: staticLabel.l00003,
        singInTitle: staticLabel.l00001,
        singInOther: staticLabel.l00002,
        userName: "",
        password: "",
        isFinshed: false
    })
    // 1. 定义视图模式: 'login' | 'register'
    const [mode, setMode] = useState<'login' | 'register'>('login');


    /**************************************************
     * 3.API 画面中的API数据获取
     * 异步获取数据
     **************************************************/
    useEffect(() => {
    }, [])

    /**************************************************
     * 4.画面的事件,用户交互
     * 画面让数据发生变化时的操作
     **************************************************/
    const userNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
        e.preventDefault();
        setData((prev) => {
            return { ...prev, userName: e.target.value }
        })
    }, [])
    const passwordChange = useCallback((e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
        e.preventDefault();
        setData((prev) => {
            return { ...prev, password: e.target.value }
        })
    }, [])
    const handleSubmit = useCallback((e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
    }, [data.password, data.userName])
    const toggleMode = useCallback(() => {
        setMode(prev => prev === 'login' ? 'register' : 'login');
        // 可选：切换时清空表单
        setData(prev => ({ ...prev, userName: '', password: '' }));
    }, []);

    /**************************************************
     * 5.画面的返回
     **************************************************/
    return {
        data,
        mode,
        setData,
        userNameChange,
        passwordChange,
        handleSubmit,
        toggleMode
    }
}

export interface dataInterface {
    singUpTitle: string;
    singInTitle: string;
    singInOther: string;
    userName: string;
    password: string;
    isFinshed: boolean;
}

