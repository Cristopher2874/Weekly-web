import { useState } from 'react';
import { Check, ChevronsUpDown, LogOut } from "lucide-react"
import { Link } from "react-router-dom";
import { useAuthStore } from '@/StateZustand/authStore';
import { cn } from "@/lib/utils"
import { Button } from "@shad/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@shad/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@shad/popover"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@shad/avatar"

const frameworks = [
    {
        value: "next.js",
        label: "Next.js",
    },
    {
        value: "sveltekit",
        label: "SvelteKit",
    },
    {
        value: "nuxt.js",
        label: "Nuxt.js",
    },
    {
        value: "remix",
        label: "Remix",
    },
    {
        value: "astro",
        label: "Astro",
    },
]

export function UserPopOver() {
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState("")
    const setUser = useAuthStore((state) => state.setUser);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <div
                    variant="ghost"
                    role="combobox"
                    className="p-0 w-[14rem] ml-0 flex justify-between items-center"
                >
                    <Avatar className="rounded-sm w-8 h-8">
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    {value
                        ? frameworks.find((framework) => framework.value === value)?.label
                        : "Example"}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </div>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Search framework..." />
                    <CommandList>
                        <CommandEmpty>No framework found.</CommandEmpty>
                        <CommandGroup>
                            {frameworks.map((framework) => (
                                <CommandItem
                                    key={framework.value}
                                    value={framework.value}
                                    onSelect={(currentValue) => {
                                        setValue(currentValue === value ? "" : currentValue)
                                        setOpen(false)
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            value === framework.value ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    {framework.label}
                                </CommandItem>
                            ))}
                            <Link to="/" className="w-full flex items-center shadow border bg-white gap-2 px-4 py-2 hover:bg-gray-100 transition-colors">
                                <LogOut className="h-5 w-5 text-gray-500" />
                                <span className="text-gray-700">Log Out</span>
                            </Link>
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}