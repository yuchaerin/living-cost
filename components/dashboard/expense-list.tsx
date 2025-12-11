"use client"

import { format } from "date-fns"
import { Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Expense } from "@/hooks/use-expenses"

interface ExpenseListProps {
    expenses: Expense[]
    onDelete: (id: string) => void
}

export function ExpenseList({ expenses, onDelete }: ExpenseListProps) {
    const sortedExpenses = [...expenses].sort((a, b) => b.date.getTime() - a.date.getTime())

    const formatMoney = (amount: number) => {
        return new Intl.NumberFormat("ko-KR", { style: "currency", currency: "KRW" }).format(amount)
    }

    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle>최근 지출 내역</CardTitle>
            </CardHeader>
            <CardContent>
                {expenses.length === 0 ? (
                    <div className="text-center text-muted-foreground py-8">
                        아직 지출 내역이 없어요.
                    </div>
                ) : (
                    <div className="space-y-4">
                        {sortedExpenses.map((expense) => (
                            <div
                                key={expense.id}
                                className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                            >
                                <div className="space-y-1">
                                    <p className="text-sm font-medium leading-none">
                                        {expense.category}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        {format(expense.date, "yyyy-MM-dd")} · {expense.memo || "메모 없음"}
                                    </p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="font-bold">{formatMoney(expense.amount)}</div>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                                        onClick={() => onDelete(expense.id)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                        <span className="sr-only">삭제</span>
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
