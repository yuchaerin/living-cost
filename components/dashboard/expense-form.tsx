"use client"

import { useState } from "react"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { ko } from "date-fns/locale"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ExpenseFormProps {
    onAdd: (expense: { date: Date; category: string; amount: number; memo: string }) => void
    categories?: string[]
}

const DEFAULT_CATEGORIES = ["식비", "교통비", "쇼핑", "주거/통신", "의료/건강", "기타"]

export function ExpenseForm({ onAdd, categories = DEFAULT_CATEGORIES }: ExpenseFormProps) {
    const [date, setDate] = useState<Date | undefined>(new Date())
    const [category, setCategory] = useState<string>("")
    const [amount, setAmount] = useState<string>("")
    const [memo, setMemo] = useState<string>("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!date || !category || !amount) return

        onAdd({
            date,
            category,
            amount: parseInt(amount),
            memo,
        })

        // Reset form
        setAmount("")
        setMemo("")
        // keep date and category for convenience? let's reset category maybe
        // setCategory("")
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>지출 기록하기</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid gap-2">
                        <Label htmlFor="date">날짜</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-full justify-start text-left font-normal",
                                        !date && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {date ? format(date, "PPP", { locale: ko }) : <span>날짜 선택</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={setDate}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="category">카테고리</Label>
                        <Select onValueChange={setCategory} value={category}>
                            <SelectTrigger>
                                <SelectValue placeholder="카테고리 선택" />
                            </SelectTrigger>
                            <SelectContent>
                                {categories.map((cat) => (
                                    <SelectItem key={cat} value={cat}>
                                        {cat}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="amount">금액</Label>
                        <Input
                            id="amount"
                            type="number"
                            placeholder="0"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            required
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="memo">메모</Label>
                        <Input
                            id="memo"
                            placeholder="내용 입력 (선택)"
                            value={memo}
                            onChange={(e) => setMemo(e.target.value)}
                        />
                    </div>

                    <Button type="submit" className="w-full">추가하기</Button>
                </form>
            </CardContent>
        </Card>
    )
}
