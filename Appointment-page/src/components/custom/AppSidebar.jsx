import {
    Calendar, Home, Book, Settings, ChevronRightCircle,
    ChevronLeftCircle, LogOut, Cat
} from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarFooter,
    SidebarHeader,
    SidebarSeparator,
    useSidebar,
} from "@shad/sidebar"

import { Link } from "react-router-dom";
import { useAuthStore } from "@/StateZustand/authStore";
import { UserPopOver } from "./PopOver";

// Menu items.
const items = [
    {
        title: "Home",
        url: "/home",
        icon: Home,
    },
    {
        title: "New Pet",
        url: "./new-pet",
        icon: Cat,
    },
    {
        title: "My Pets",
        url: "./pets",
        icon: Book,
    }
]

export function AppSidebar() {

    const { toggleSidebar, open } = useSidebar();
    return (
        <Sidebar collapsible="icon">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton onClick={toggleSidebar} className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition-colors">
                            {open ? (
                                <div className="flex flex-row items-center justify-start gap-3 transition-all duration-300">
                                    <ChevronLeftCircle className="ml-auto text-gray-500" />
                                </div>
                            ) : (
                                <div className="flex flex-row items-center justify-center transition-all duration-300">
                                    <ChevronRightCircle className="ml-auto text-gray-500" />
                                </div>
                            )}
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarSeparator />
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Application</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link to={`${item.url}`}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarSeparator />
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton>
                            {open ? (
                                <div className="flex flex-row items-center justify-start gap-3 transition-all duration-300">
                                    <UserPopOver />
                                </div>
                            ) : (
                                <div className="flex flex-row items-center justify-center transition-all duration-300">
                                    <UserPopOver />
                                </div>
                            )}
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}