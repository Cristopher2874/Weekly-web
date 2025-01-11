import {
    Calendar, Home, Inbox, Search, Settings, ChevronRightCircle,
    ChevronLeftCircle, LogOut
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

// Menu items.
const items = [
    {
        title: "Home",
        url: "#",
        icon: Home,
    },
    {
        title: "Inbox",
        url: "#",
        icon: Inbox,
    },
    {
        title: "Calendar",
        url: "#",
        icon: Calendar,
    },
    {
        title: "Search",
        url: "#",
        icon: Search,
    },
    {
        title: "Settings",
        url: "#",
        icon: Settings,
    },
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
                                        <a href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
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
                        <SidebarMenuButton className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition-colors">
                            <LogOut className="h-5 w-5 text-gray-500" />
                            <span className="text-gray-700">Log Out</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}