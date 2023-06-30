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
  nonOperationalExpenses: number
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

export interface GetProductsResponse {
  id: string
  _id: string
  price: number
  expense: number
  transactions: Array<string>
  __v: number
  createdAt: string
  updatedAt: string
}

export interface GetTransactionsResponse {
  id: string
  _id: string
  buyer: string
  amount: number
  products: Array<string>
  __v: number
  createdAt: string
  updatedAt: string
}
