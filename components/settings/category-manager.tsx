"use client"

import { useState } from "react"
import { Trash2, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface CategoryManagerProps {
    categories: string[]
    onAdd: (category: string) => void
    onRemove: (category: string) => void
}

export function CategoryManager({ categories, onAdd, onRemove }: CategoryManagerProps) {
    const [newCategory, setNewCategory] = useState("")

    const handleAdd = () => {
        if (newCategory.trim()) {
            onAdd(newCategory.trim())
            setNewCategory("")
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>카테고리 관리</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex gap-2">
                    <Input
                        placeholder="새 카테고리 이름"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") handleAdd()
                        }}
                    />
                    <Button onClick={handleAdd}>
                        <Plus className="h-4 w-4 mr-2" />
                        추가
                    </Button>
                </div>

                <div className="grid gap-2">
                    {categories.map((category) => (
                        <div
                            key={category}
                            className="flex items-center justify-between p-3 border rounded-lg bg-card text-card-foreground shadow-sm"
                        >
                            <span>{category}</span>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => onRemove(category)}
                                className="h-8 w-8 text-muted-foreground hover:text-red-500"
                            >
                                <Trash2 className="h-4 w-4" />
                                <span className="sr-only">삭제</span>
                            </Button>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
