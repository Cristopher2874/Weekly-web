import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
} from "@shad/navigation-menu"
import { Button } from '@shad/button';
import { Outlet, Link } from "react-router-dom";

const LogInLayout = () => {
    return (
        <section className="flex flex-col h-screen overflow-auto">
            <header className="bg-black text-white flex justify-between items-center p-4 w-full">
                <div className="flex flex-row space-x-4">
                    <Link to="/">
                        <figure className="flex justify-center items-center mr-5 bg-white rounded">
                            <img src="" alt="Logo" className="w-8 h-auto" />
                        </figure>
                    </Link>
                    <NavigationMenu>
                        <NavigationMenuList className="space-x-5">
                            {/*<NavigationMenuItem>
                            <NavigationMenuTrigger className="bg-black">Features</NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <NavigationMenuLink>Link</NavigationMenuLink>
                            </NavigationMenuContent>
                        </NavigationMenuItem>*/}
                            <NavigationMenuItem>
                                <Button variant="ghost">Home</Button>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <Button variant="ghost">Features</Button>
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

            <main className="flex-grow flex-1 justify-center items-center bg-[url('/assets/login-back.jpg')] bg-cover bg-center">
                <div className="flex justify-center items-center w-full h-full bg-white">
    
                    <Outlet />

                </div>
            </main>

            <footer className="bg-black text-white flex justify-center items-center p-4">
                <p>
                    <Link to="#" className="p-3">Privacy policy</Link>
                    <Link to="#" className="p-3">Code of ethics</Link>
                    <span>&copy; 2024 InCtrl</span>
                </p>
            </footer>
        </section>
    );
}

export default LogInLayout;