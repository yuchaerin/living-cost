"use client"

import * as React from "react"

type ThemeColor = "default" | "blue" | "yellow" | "pink" | "green"

interface ThemeCustomizerContextType {
    color: ThemeColor
    setColor: (color: ThemeColor) => void
}

const ThemeCustomizerContext = React.createContext<ThemeCustomizerContextType>({
    color: "default",
    setColor: () => { },
})

export function useThemeCustomizer() {
    return React.useContext(ThemeCustomizerContext)
}

export function ThemeCustomizerProvider({
    children,
}: {
    children: React.ReactNode
}) {
    const [color, setColor] = React.useState<ThemeColor>("default")
    const [mapped, setMapped] = React.useState(false)

    React.useEffect(() => {
        // Load from local storage
        const stored = localStorage.getItem("living-cost-theme-color")
        if (stored) {
            setColor(stored as ThemeColor)
        }
        setMapped(true)
    }, [])

    React.useEffect(() => {
        if (!mapped) return
        localStorage.setItem("living-cost-theme-color", color)

        // Apply dataset attribute to body or root
        const root = document.documentElement
        if (color === "default") {
            root.removeAttribute("data-color-theme")
        } else {
            root.setAttribute("data-color-theme", color)
        }
    }, [color, mapped])

    // Avoid hydration mismatch by rendering children only after mount, 
    // or accept initial flash (preferred to enable server render, but attribute is client side)
    // For styles, CSS variables handle it immediately if attribute is present.

    return (
        <ThemeCustomizerContext.Provider value={{ color, setColor }}>
            {children}
        </ThemeCustomizerContext.Provider>
    )
}
