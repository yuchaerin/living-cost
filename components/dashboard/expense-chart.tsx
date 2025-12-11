"use client"

import { useMemo } from "react"
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip, Legend } from "recharts"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Expense } from "@/hooks/use-expenses"

interface ExpenseChartProps {
    expenses: Expense[]
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d"]

export function ExpenseChart({ expenses }: ExpenseChartProps) {
    const data = useMemo(() => {
        const categoryTotals: Record<string, number> = {}

        expenses.forEach((expense) => {
            if (categoryTotals[expense.category]) {
                categoryTotals[expense.category] += expense.amount
            } else {
                categoryTotals[expense.category] = expense.amount
            }
        })

        return Object.keys(categoryTotals).map((category) => ({
            name: category,
            value: categoryTotals[category],
        }))
    }, [expenses])

    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle>카테고리별 지출 통계</CardTitle>
            </CardHeader>
            <CardContent>
                {data.length === 0 ? (
                    <div className="flex h-[300px] items-center justify-center text-muted-foreground">
                        데이터가 부족해요.
                    </div>
                ) : (
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={data}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, percent }) => `${name} ${(percent ? percent * 100 : 0).toFixed(0)}%`}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {data.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    formatter={(value: number) =>
                                        new Intl.NumberFormat("ko-KR", { style: "currency", currency: "KRW" }).format(value)
                                    }
                                />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
