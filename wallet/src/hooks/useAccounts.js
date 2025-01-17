import { useState, useCallback } from "react";
import {Loading} from "../components/shared/Loading";

export const useAccounts = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAccounts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/accounts");
      const data = await response.json();
      setAccounts(data);
    } catch (error) {
      throw new Error("Failed to fetch accounts: " + error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const addAccount = useCallback(async (accountData) => {
    try {
      const response = await fetch("/api/accounts", {
        method: "POST",
        body: JSON.stringify(accountData),
      });
      const newAccount = await response.json();
      setAccounts((prev) => [...prev, newAccount]);
      return newAccount;
    } catch (error) {
      throw new Error("Failed to add account: " + error.message);
    }
  }, []);

  return { accounts, loading, fetchAccounts, addAccount };
};
