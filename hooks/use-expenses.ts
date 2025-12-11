"use client"

import { useState, useEffect } from "react"

export type Expense = {
    id: string
    date: Date
    category: string
    amount: number
    memo: string
}

const DEFAULT_CATEGORIES = ["식비", "교통비", "쇼핑", "주거/통신", "의료/건강", "기타"]

export function useExpenses() {
    const [expenses, setExpenses] = useState<Expense[]>([])
    const [categories, setCategories] = useState<string[]>([])
    const [budget, setBudget] = useState<number>(1000000)
    const [isLoaded, setIsLoaded] = useState(false)

    // Load from LocalStorage
    useEffect(() => {
        // Load Expenses
        const savedExpenses = localStorage.getItem("expenses")
        if (savedExpenses) {
            try {
                const parsed = JSON.parse(savedExpenses)
                const hydrated = parsed.map((item: any) => ({
                    ...item,
                    date: new Date(item.date),
                }))
                setExpenses(hydrated)
            } catch (e) {
                console.error("Failed to load expenses", e)
            }
        }

        // Load Categories
        const savedCategories = localStorage.getItem("categories")
        if (savedCategories) {
            try {
                setCategories(JSON.parse(savedCategories))
            } catch (e) {
                console.error("Failed to load categories", e)
                setCategories(DEFAULT_CATEGORIES)
            }
        } else {
            setCategories(DEFAULT_CATEGORIES)
        }

        // Load Budget
        const savedBudget = localStorage.getItem("budget")
        if (savedBudget) {
            try {
                setBudget(parseInt(savedBudget))
            } catch (e) {
                console.error("Failed to load budget", e)
            }
        }

        setIsLoaded(true)
    }, [])

    // Save Expenses
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem("expenses", JSON.stringify(expenses))
        }
    }, [expenses, isLoaded])

    // Save Categories
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem("categories", JSON.stringify(categories))
        }
    }, [categories, isLoaded])

    // Save Budget
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem("budget", budget.toString())
        }
    }, [budget, isLoaded])

    const addExpense = (expense: Omit<Expense, "id">) => {
        const newExpense = { ...expense, id: crypto.randomUUID() }
        setExpenses((prev) => [newExpense, ...prev])
    }

    const removeExpense = (id: string) => {
        setExpenses((prev) => prev.filter((item) => item.id !== id))
    }

    const addCategory = (category: string) => {
        if (!categories.includes(category)) {
            setCategories((prev) => [...prev, category])
        }
    }

    const removeCategory = (category: string) => {
        setCategories((prev) => prev.filter((c) => c !== category))
    }

    const totalExpenses = expenses.reduce((sum, item) => sum + item.amount, 0)
    const remainingBudget = budget - totalExpenses

    const generateSampleData = () => {
        const categoriesList = ["식비", "교통비", "쇼핑", "주거/통신", "의료/건강", "기타"]
        const samples: Expense[] = []

        // Generate for last 3 months
        for (let i = 0; i < 3; i++) {
            const date = new Date()
            date.setMonth(date.getMonth() - i)

            // Random expenses per month
            for (let j = 0; j < 5; j++) {
                samples.push({
                    id: crypto.randomUUID(),
                    date: new Date(date.getFullYear(), date.getMonth(), Math.floor(Math.random() * 28) + 1),
                    category: categoriesList[Math.floor(Math.random() * categoriesList.length)],
                    amount: Math.floor(Math.random() * 50) * 1000 + 5000,
                    memo: "샘플 지출 " + (samples.length + 1)
                })
            }
        }

        setExpenses((prev) => [...prev, ...samples])
        alert("샘플 데이터가 생성되었습니다.")
    }

    const exportToCSV = () => {
        if (expenses.length === 0) {
            alert("내보낼 데이터가 없습니다.")
            return
        }

        const headers = ["날짜,카테고리,금액,메모"]
        const csvContent = expenses.map(e =>
            `${e.date.toISOString().split('T')[0]},${e.category},${e.amount},${e.memo}`
        ).join("\n")

        const blob = new Blob(["\uFEFF" + headers + "\n" + csvContent], { type: 'text/csv;charset=utf-8;' })
        const link = document.createElement("a")
        link.href = URL.createObjectURL(blob)
        link.download = `expenses_${new Date().toISOString().slice(0, 10)}.csv`
        link.click()
    }

    return {
        expenses,
        categories,
        budget,
        setBudget,
        addExpense,
        removeExpense,
        addCategory,
        removeCategory,
        totalExpenses,
        monthlyBudget: budget,
        remainingBudget,
        isLoaded,
        generateSampleData,
        exportToCSV
    }
}
