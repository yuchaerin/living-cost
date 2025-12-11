"use client"

import Link from "next/link"
import { Settings } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useExpenses } from "@/hooks/use-expenses"
import { SummaryCard } from "@/components/dashboard/summary-card"
import { ExpenseForm } from "@/components/dashboard/expense-form"
import { ExpenseList } from "@/components/dashboard/expense-list"
import { ExpenseChart } from "@/components/dashboard/expense-chart"

export default function DashboardPage() {
  const {
    expenses,
    categories,
    addExpense,
    removeExpense,
    totalExpenses,
    remainingBudget,
    isLoaded
  } = useExpenses()

  if (!isLoaded) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50/50 p-4 md:p-8">
      <div className="mx-auto max-w-5xl space-y-8">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">생활비 지출 관리</h1>
            <p className="text-muted-foreground">매달 지출을 스마트하게 관리하세요.</p>
          </div>
          <Link href="/settings">
            <Button variant="outline" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
          </Link>
        </header>

        <section>
          <SummaryCard total={totalExpenses} remaining={remainingBudget} />
        </section>

        <div className="grid gap-4 md:grid-cols-7">
          <div className="md:col-span-3">
            <ExpenseForm onAdd={addExpense} categories={categories} />
          </div>
          <div className="md:col-span-4">
            <ExpenseChart expenses={expenses} />
          </div>
        </div>

        <section>
          <ExpenseList expenses={expenses} onDelete={removeExpense} />
        </section>
      </div>
    </div>
  )
}
