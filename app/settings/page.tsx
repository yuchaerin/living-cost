"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CategoryManager } from "@/components/settings/category-manager"
import { ThemeSelector } from "@/components/settings/theme-selector"
import { useExpenses } from "@/hooks/use-expenses"

export default function SettingsPage() {
    const { categories, addCategory, removeCategory, budget, setBudget, isLoaded } = useExpenses()
    const [newBudget, setNewBudget] = useState("")

    useEffect(() => {
        if (budget) {
            setNewBudget(budget.toString())
        }
    }, [budget])

    const handleBudgetSave = () => {
        const val = parseInt(newBudget)
        if (!isNaN(val) && val > 0) {
            setBudget(val)
            alert("예산이 수정되었습니다.")
        } else {
            alert("올바른 금액을 입력해주세요.")
        }
    }

    if (!isLoaded) {
        return <div className="flex items-center justify-center min-h-screen">데이터 로딩 중...</div>
    }

    return (
        <div className="min-h-screen bg-gray-50/50 p-4 md:p-8">
            <div className="mx-auto max-w-2xl space-y-8">
                <header className="flex items-center gap-4">
                    <Link href="/">
                        <Button variant="ghost" size="icon">
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">설정</h1>
                        <p className="text-muted-foreground">앱 환경을 설정하세요.</p>
                    </div>
                </header>

                <section className="space-y-6">
                    <ThemeSelector />

                    <Card>
                        <CardHeader>
                            <CardTitle>월 예산 설정 (원)</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex gap-2">
                                <Input
                                    type="number"
                                    placeholder="예산을 입력하세요"
                                    value={newBudget}
                                    onChange={(e) => setNewBudget(e.target.value)}
                                />
                                <Button onClick={handleBudgetSave}>저장</Button>
                            </div>
                            <p className="text-sm text-muted-foreground mt-2">
                                * 현재 월 예산: {new Intl.NumberFormat('ko-KR').format(budget)}원
                            </p>
                        </CardContent>
                    </Card>

                    <CategoryManager
                        categories={categories}
                        onAdd={addCategory}
                        onRemove={removeCategory}
                    />
                </section>
            </div>
        </div>
    )
}
