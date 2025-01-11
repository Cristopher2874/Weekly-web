import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
} from "@shad/navigation-menu"
import { SidebarProvider, SidebarTrigger } from "@shad/sidebar"
import { AppSidebar } from "@custom/AppSidebar"
import { Outlet, Link } from "react-router-dom";

const LayoutHome = () => {
    return (
        <SidebarProvider defaultOpen={false}>
            <AppSidebar />
            <main className="flex flex-col min-h-screen bg-gray-100 w-full">
                <Outlet />
            <footer className="bg-black text-white flex justify-around items-center p-4">
                <p>
                    <Link to="#" className="p-3">Privacy policy</Link>
                    <Link to="#" className="p-3">Code of ethics</Link>
                    <span>&copy; 2024 MyVet</span>
                </p>
                <NavigationMenu>
                    <NavigationMenuList className="flex justify-around items-center space-x-5">
                        <NavigationMenuItem className="flex justify-center items-center space-x-5">
                            <a href="#"><i className="fab fa-apple"></i></a>
                            <Link to="#"><i className="fab fa-twitter"></i></Link>
                            <Link to="#"><i className="fab fa-facebook-f"></i></Link>
                            <Link to="#"><i className="fab fa-instagram"></i></Link>
                            <Link to="#"><i className="fab fa-youtube"></i></Link>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            </footer>
            </main>
        </SidebarProvider>
    );
}

export default LayoutHome;