import { useState, useEffect } from "react";
import { useToast } from "../../components/ui/use-toast";

const useBudgets = (initialBudgets = []) => {
  const [budgets, setBudgets] = useState(initialBudgets);
  const [expenses, setExpenses] = useState([]);
  const { toast } = useToast();

  // Calculate total spent for a specific budget category
  const calculateTotalSpent = (categoryId) => {
    return expenses
      .filter((expense) => expense.categoryId === categoryId)
      .reduce((total, expense) => total + expense.amount, 0);
  };

  // Check if adding an expense would exceed the budget
  const wouldExceedBudget = (categoryId, amount) => {
    const budget = budgets.find((b) => b.id === categoryId);
    if (!budget) return false;

    const currentTotal = calculateTotalSpent(categoryId);
    return currentTotal + amount > budget.limit;
  };

  // Add a new expense
  const addExpense = (categoryId, amount, description) => {
    if (wouldExceedBudget(categoryId, amount)) {
      // Show warning notification
      toast({
        title: "Budget Limit Exceeded!",
        description: "This expense would put you over your budget limit.",
        variant: "destructive",
      });
      return false;
    }

    const newExpense = {
      id: Date.now(),
      categoryId,
      amount,
      description,
      date: new Date(),
    };

    setExpenses((prev) => [...prev, newExpense]);

    // Check if this brings us close to the limit (80% threshold)
    const budget = budgets.find((b) => b.id === categoryId);
    const newTotal = calculateTotalSpent(categoryId) + amount;
    if (newTotal >= budget.limit * 0.8 && newTotal < budget.limit) {
      toast({
        title: "Approaching Budget Limit",
        description: `You've used ${Math.round(
          (newTotal / budget.limit) * 100
        )}% of your ${budget.name} budget.`,
        variant: "warning",
      });
    }

    return true;
  };

  // Add a new budget category
  const addBudget = (name, limit) => {
    const newBudget = {
      id: Date.now(),
      name,
      limit,
    };
    setBudgets((prev) => [...prev, newBudget]);
  };

  // Update a budget limit
  const updateBudgetLimit = (budgetId, newLimit) => {
    setBudgets((prev) =>
      prev.map((budget) =>
        budget.id === budgetId ? { ...budget, limit: newLimit } : budget
      )
    );
  };

  // Get remaining budget for a category
  const getRemainingBudget = (categoryId) => {
    const budget = budgets.find((b) => b.id === categoryId);
    if (!budget) return 0;

    const spent = calculateTotalSpent(categoryId);
    return budget.limit - spent;
  };

  // Get budget utilization percentage
  const getBudgetUtilization = (categoryId) => {
    const budget = budgets.find((b) => b.id === categoryId);
    if (!budget) return 0;

    const spent = calculateTotalSpent(categoryId);
    return (spent / budget.limit) * 100;
  };

  return {
    budgets,
    expenses,
    addExpense,
    addBudget,
    updateBudgetLimit,
    getRemainingBudget,
    getBudgetUtilization,
    calculateTotalSpent,
  };
};

export default useBudgets;
