"use client"

import { Download, Database } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useExpenses } from "@/hooks/use-expenses"
import { MonthlyHistory } from "@/components/statistics/monthly-history"
import { MonthComparison } from "@/components/statistics/month-comparison"

export default function StatisticsPage() {
    const { expenses, budget, generateSampleData, exportToCSV, isLoaded } = useExpenses()

    if (!isLoaded) {
        return <div className="flex items-center justify-center min-h-screen">Loading...</div>
    }

    return (
        <div className="min-h-screen bg-gray-50/50 p-4 md:p-8">
            <div className="mx-auto max-w-5xl space-y-8">
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">통계 및 분석</h1>
                        <p className="text-muted-foreground">지출 흐름을 분석하고 인사이트를 얻으세요.</p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" onClick={generateSampleData}>
                            <Database className="mr-2 h-4 w-4" />
                            샘플 데이터
                        </Button>
                        <Button onClick={exportToCSV}>
                            <Download className="mr-2 h-4 w-4" />
                            CSV 다운로드
                        </Button>
                    </div>
                </header>

                <div className="grid gap-4 md:grid-cols-2">
                    <div className="md:col-span-1">
                        <MonthlyHistory expenses={expenses} budget={budget} />
                    </div>
                    <div className="md:col-span-1">
                        <MonthComparison expenses={expenses} />
                    </div>
                </div>
            </div>
        </div>
    )
}
