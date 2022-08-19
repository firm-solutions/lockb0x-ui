import { Outlet } from "react-router-dom"
import { useState } from "react";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";

const Layout = () => {

    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex mx-auto w-full">

            {/* Sidebar */}
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            {/* Content area */}
            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

                {/*  Site header */}
                <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

                <main>
                    <div className=" px-20 py-20 w-full  mx-auto">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Layout