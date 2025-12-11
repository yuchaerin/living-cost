"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, BarChart2, Settings } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export function Navbar() {
    const pathname = usePathname()

    const routes = [
        {
            href: "/",
            label: "대시보드",
            icon: Home,
            active: pathname === "/",
        },
        {
            href: "/statistics",
            label: "통계",
            icon: BarChart2,
            active: pathname === "/statistics",
        },
        {
            href: "/settings",
            label: "설정",
            icon: Settings,
            active: pathname === "/settings",
        },
    ]

    return (
        <nav className="border-b bg-card text-card-foreground shadow-sm">
            <div className="flex h-16 items-center px-4 md:px-8 max-w-5xl mx-auto">
                <div className="mr-8 hidden md:flex">
                    <Link href="/" className="font-bold text-lg text-primary">
                        Living Cost
                    </Link>
                </div>
                <div className="flex items-center space-x-2 md:space-x-4">
                    {routes.map((route) => (
                        <Link
                            key={route.href}
                            href={route.href}
                            className={cn(
                                "flex items-center text-sm font-medium transition-colors hover:text-primary",
                                route.active ? "text-primary" : "text-muted-foreground"
                            )}
                        >
                            <Button variant={route.active ? "secondary" : "ghost"} size="sm" className="gap-2">
                                <route.icon className="h-4 w-4" />
                                <span>{route.label}</span>
                            </Button>
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    )
}
