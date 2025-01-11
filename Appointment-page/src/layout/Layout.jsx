import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
} from "@shad/navigation-menu"
import { Button } from '@shad/button';
import { Outlet, Link } from "react-router-dom";

const LogInLayout = () => {
    return (
        <section className="flex flex-col h-full w-full overflow-auto min-h-screen">
            <header className="bg-black text-white flex justify-between items-center p-4 w-full">
                <div className="flex flex-row space-x-4">
                    <Link to="/">
                        <figure className="flex justify-center items-center mr-5 bg-white rounded">
                            <img src="" alt="Logo" className="w-8 h-auto" />
                        </figure>
                    </Link>
                    <NavigationMenu>
                        <NavigationMenuList className="space-x-5">
                            <NavigationMenuItem>
                                <Button variant="ghost">Home</Button>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <Button variant="ghost">Appointments</Button>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <Button variant="ghost">Stories</Button>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
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
            </header>

            <main className="flex-grow flex justify-center items-center w-full h-full bg-white">
                <Outlet />
            </main>

            <footer className="bg-black text-white flex justify-center items-center p-4 mt-auto">
                <p>
                    <Link to="#" className="p-3">Privacy policy</Link>
                    <Link to="#" className="p-3">Code of ethics</Link>
                    <span>&copy; 2024 MyVet</span>
                </p>
            </footer>
        </section>
    );
}

export default LogInLayout;