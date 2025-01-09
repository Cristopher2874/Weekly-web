import { Outlet } from "react-router-dom";

const FormLayout = () => {
    return (
        <div className="bg-slate-800 p-4 w-screen h-screen overflow-auto flex justify-between flex-col items-center">
            <header>
                <h1 className="text-white text-x">Form Layout</h1>
            </header>
            <div className="p-2 w-full flex justify-center">
                <Outlet />
            </div>
            <footer>
                <h1>Footer</h1>
            </footer>
        </div>
    );
}

export default FormLayout;