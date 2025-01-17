import React, { useState } from "react";
import { Calendar } from "../../components/ui/calendar";
import {Card,CardContent,CardHeader,CardTitle,} from "../../components/ui/card";
import {Table,TableBody,TableCaption,TableCell,TableHead,TableHeader,TableRow,} from "../../components/ui/table";

import {LineChart,Line,BarChart,Bar,XAxis,YAxis,CartesianGrid,Tooltip,Legend,ResponsiveContainer,} from "recharts";

const DashboardPage = () => {
  const [date, setDate] = useState(new Date());

  // Mock data for charts
  const monthlyData = [
    { name: "Jan", income: 4000, expenses: 2400 },
    { name: "Feb", income: 3000, expenses: 1398 },
    { name: "Mar", income: 2000, expenses: 9800 },
    { name: "Apr", income: 2780, expenses: 3908 },
    { name: "May", income: 1890, expenses: 4800 },
    { name: "Jun", income: 2390, expenses: 3800 },
  ];

  const categoryData = [
    { name: "Food", amount: 1200 },
    { name: "Transport", amount: 800 },
    { name: "Shopping", amount: 1500 },
    { name: "Bills", amount: 2000 },
    { name: "Entertainment", amount: 500 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="text-sm text-muted-foreground">
          Last updated: {new Date().toLocaleDateString()}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Summary Cards */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12,890</div>
            <p className="text-xs text-muted-foreground">
              +2.5% from yesterday
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Daily Income
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$5,670</div>
            <p className="text-xs text-muted-foreground">
              +12% from yesterday
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Daily Expenses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$3,450</div>
            <p className="text-xs text-muted-foreground">-5% from yesterday</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Income vs Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="income"
                  stroke="#8884d8"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="expenses"
                  stroke="#82ca9d"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Invoice</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Method</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">INV001</TableCell>
              <TableCell>Paid</TableCell>
              <TableCell>Credit Card</TableCell>
              <TableCell className="text-right">$250.00</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default DashboardPage;
