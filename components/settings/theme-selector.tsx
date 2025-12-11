"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Moon, Sun, Monitor } from "lucide-react"

import { useThemeCustomizer } from "@/components/theme-customizer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function ThemeSelector() {
    const { setTheme, theme } = useTheme()
    const { color, setColor } = useThemeCustomizer()

    return (
        <Card>
            <CardHeader>
                <CardTitle>테마 설정</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">

                {/* Mode Selection */}
                <div className="space-y-2">
                    <h3 className="text-sm font-medium">모드 선택</h3>
                    <div className="flex gap-2">
                        <Button
                            variant={theme === "light" ? "default" : "outline"}
                            size="sm"
                            onClick={() => setTheme("light")}
                            className="flex-1"
                        >
                            <Sun className="mr-2 h-4 w-4" />
                            라이트
                        </Button>
                        <Button
                            variant={theme === "dark" ? "default" : "outline"}
                            size="sm"
                            onClick={() => setTheme("dark")}
                            className="flex-1"
                        >
                            <Moon className="mr-2 h-4 w-4" />
                            다크
                        </Button>
                        <Button
                            variant={theme === "system" ? "default" : "outline"}
                            size="sm"
                            onClick={() => setTheme("system")}
                            className="flex-1"
                        >
                            <Monitor className="mr-2 h-4 w-4" />
                            시스템
                        </Button>
                    </div>
                </div>

                {/* Color Theme Selection */}
                <div className="space-y-2">
                    <h3 className="text-sm font-medium">컬러 테마</h3>
                    <div className="grid grid-cols-5 gap-2">
                        {[
                            { name: "default", label: "기본", bg: "bg-[hsl(262,83%,78%)]" },
                            { name: "blue", label: "블루", bg: "bg-[hsl(217,91%,60%)]" },
                            { name: "yellow", label: "옐로우", bg: "bg-[hsl(47,95%,58%)]" },
                            { name: "pink", label: "핑크", bg: "bg-[hsl(340,82%,76%)]" },
                            { name: "green", label: "그린", bg: "bg-[hsl(142,76%,56%)]" },
                        ].map((c) => (
                            <button
                                key={c.name}
                                onClick={() => setColor(c.name as any)}
                                className={cn(
                                    "group relative flex flex-col items-center gap-1 p-2 rounded-lg border-2 transition-all hover:bg-accent",
                                    color === c.name ? "border-primary bg-accent" : "border-transparent"
                                )}
                            >
                                <div className={cn("h-8 w-8 rounded-full shadow-sm", c.bg)} />
                                <span className="text-xs font-medium">{c.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

            </CardContent>
        </Card>
    )
}
