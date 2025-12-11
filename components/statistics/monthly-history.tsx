"use client"

import { useMemo } from "react"
import { format } from "date-fns"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Expense } from "@/hooks/use-expenses"

interface MonthlyHistoryProps {
    expenses: Expense[]
    budget: number
}

export function MonthlyHistory({ expenses, budget }: MonthlyHistoryProps) {
    const monthlyData = useMemo(() => {
        const grouped: Record<string, number> = {}

        expenses.forEach((expense) => {
            const monthKey = format(expense.date, "yyyy-MM")
            grouped[monthKey] = (grouped[monthKey] || 0) + expense.amount
        })

        return Object.entries(grouped)
            .sort((a, b) => b[0].localeCompare(a[0])) // Sort descending by month
            .map(([month, total]) => ({ month, total }))
    }, [expenses])

    const formatMoney = (amount: number) => {
        return new Intl.NumberFormat("ko-KR", { style: "currency", currency: "KRW" }).format(amount)
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>월별 지출 이력</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {monthlyData.length === 0 ? (
                    <p className="text-muted-foreground text-center py-4">지출 내역이 없습니다.</p>
                ) : (
                    monthlyData.map(({ month, total }) => (
                        <div key={month} className="space-y-2">
                            <div className="flex justify-between items-center">
                                <span className="font-semibold">{month}</span>
                                <span className="font-bold">{formatMoney(total)}</span>
                            </div>
                            <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-primary"
                                    style={{ width: `${Math.min((total / budget) * 100, 100)}%` }}
                                />
                            </div>
                            <p className="text-xs text-muted-foreground text-right">
                                예산 대비 {((total / budget) * 100).toFixed(1)}% 사용
                            </p>
                        </div>
                    ))
                )}
            </CardContent>
        </Card>
    )
}
