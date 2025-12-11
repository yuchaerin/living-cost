"use client"

import { useMemo, useState } from "react"
import { format } from "date-fns"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Expense } from "@/hooks/use-expenses"

interface MonthComparisonProps {
    expenses: Expense[]
}

export function MonthComparison({ expenses }: MonthComparisonProps) {
    // Get unique months list
    const months = useMemo(() => {
        const uniqueMonths = new Set(expenses.map(e => format(e.date, "yyyy-MM")))
        return Array.from(uniqueMonths).sort().reverse()
    }, [expenses])

    const [monthA, setMonthA] = useState<string>(months[0] || "")
    const [monthB, setMonthB] = useState<string>(months[1] || "")

    const comparisonData = useMemo(() => {
        const totalA = expenses
            .filter(e => format(e.date, "yyyy-MM") === monthA)
            .reduce((sum, e) => sum + e.amount, 0)

        const totalB = expenses
            .filter(e => format(e.date, "yyyy-MM") === monthB)
            .reduce((sum, e) => sum + e.amount, 0)

        return [
            { name: monthA || "A", amount: totalA },
            { name: monthB || "B", amount: totalB }
        ]
    }, [expenses, monthA, monthB])

    const difference = useMemo(() => {
        const valA = comparisonData[0].amount
        const valB = comparisonData[1].amount
        return valA - valB
    }, [comparisonData])

    const formatMoney = (amount: number) => {
        return new Intl.NumberFormat("ko-KR", { style: "currency", currency: "KRW" }).format(amount)
    }

    if (months.length < 2) return null

    return (
        <Card>
            <CardHeader>
                <CardTitle>월별 비교</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex gap-4">
                    <Select value={monthA} onValueChange={setMonthA}>
                        <SelectTrigger>
                            <SelectValue placeholder="기준 월" />
                        </SelectTrigger>
                        <SelectContent>
                            {months.map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}
                        </SelectContent>
                    </Select>
                    <Select value={monthB} onValueChange={setMonthB}>
                        <SelectTrigger>
                            <SelectValue placeholder="비교 월" />
                        </SelectTrigger>
                        <SelectContent>
                            {months.map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}
                        </SelectContent>
                    </Select>
                </div>

                <div className="h-[200px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={comparisonData}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip formatter={(val: number) => formatMoney(val)} />
                            <Bar dataKey="amount" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="text-center text-sm">
                    {difference > 0 ? (
                        <p><span className="font-bold">{monthA}</span>이 <span className="font-bold">{monthB}</span>보다 <span className="text-red-500 font-bold">{formatMoney(difference)}</span> 더 썼습니다.</p>
                    ) : difference < 0 ? (
                        <p><span className="font-bold">{monthA}</span>이 <span className="font-bold">{monthB}</span>보다 <span className="text-green-500 font-bold">{formatMoney(Math.abs(difference))}</span> 덜 썼습니다.</p>
                    ) : (
                        <p>지출액이 같습니다.</p>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
