import { useState, useCallback } from "react";

const useTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTransactions = useCallback(async (filters = {}) => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams(filters);
      const response = await fetch(`/api/transactions?${queryParams}`);
      const data = await response.json();
      setTransactions(data);
    } catch (error) {
      throw new Error("Failed to fetch transactions: " + error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const addTransaction = useCallback(async (transactionData) => {
    try {
      const response = await fetch("/api/transactions", {
        method: "POST",
        body: JSON.stringify(transactionData),
      });
      const newTransaction = await response.json();
      setTransactions((prev) => [...prev, newTransaction]);
      return newTransaction;
    } catch (error) {
      throw new Error("Failed to add transaction: " + error.message);
    }
  }, []);

  return { transactions, loading, fetchTransactions, addTransaction };
};
module.exports = useTransactions;
