import '@/view/page/login/login.css';
import { useViewLogicState } from '@/view/page/login/logic';

function MainPage() {
    const {
        data,
        mode,
        userNameChange,
        passwordChange,
        handleSubmit,
        toggleMode
    } = useViewLogicState();

    return (
        <div></div>
    );
}

export default MainPage;