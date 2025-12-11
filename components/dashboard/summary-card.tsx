import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Wallet, PiggyBank } from "lucide-react"

interface SummaryCardProps {
    total: number
    remaining: number
}

export function SummaryCard({ total, remaining }: SummaryCardProps) {
    const formatMoney = (amount: number) => {
        return new Intl.NumberFormat("ko-KR", { style: "currency", currency: "KRW" }).format(amount)
    }

    const isWarning = remaining < 0

    return (
        <div className="grid gap-4 md:grid-cols-2">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">이번 달 총 지출</CardTitle>
                    <Wallet className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{formatMoney(total)}</div>
                    <p className="text-xs text-muted-foreground">
                        아껴쓰면 부자돼요!
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">남은 예산</CardTitle>
                    <PiggyBank className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className={`text-2xl font-bold ${isWarning ? "text-red-500" : "text-green-600"}`}>
                        {formatMoney(remaining)}
                    </div>
                    <p className="text-xs text-muted-foreground">
                        {isWarning ? "예산을 초과했어요!" : "아직 여유가 있어요."}
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}
