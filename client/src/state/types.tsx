export interface GetKpisResponse {
  _id: string
  id: string

  totalProfit: number
  totalRevenue: number
  totalExpenses: number
  monthlyData: Array<Month>
  dailyData: Array<Day>
  expensesByCategory: ExpensesByCategory
  __v: number
  createdAt: string
  updatedAt: string
}

export interface Month {
  month: string
  revenue: number
  expenses: number
  operationalExpenses: number
  nonOperattionalExpenses: number
  _id: string
  id: string
}

export interface Day {
  date: string
  revenue: number
  expenses: number
  _id: string
  id: string
}
export interface ExpensesByCategory {
  salaries: number
  supplies: number
  services: number
}
