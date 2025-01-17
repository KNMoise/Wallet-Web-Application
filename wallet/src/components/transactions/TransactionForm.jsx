import { useState } from "react";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../../components/ui/select";
import { useAccounts } from "@/hooks/useAccounts";

const TransactionForm = ({ onSubmit, initialData = {} }) => {
  const { accounts } = useAccounts();
  const [formData, setFormData] = useState({
    accountId: initialData.accountId || "",
    amount: initialData.amount || "",
    type: initialData.type || "expense",
    category: initialData.category || "",
    description: initialData.description || "",
    date: initialData.date || new Date().toISOString().split("T")[0],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      amount: parseFloat(formData.amount),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="account">Account</label>
        <Select
          value={formData.accountId}
          onValueChange={(value) =>
            setFormData((prev) => ({ ...prev, accountId: value }))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select account" />
          </SelectTrigger>
          <SelectContent>
            {accounts.map((account) => (
              <SelectItem key={account.id} value={account.id}>
                {account.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label htmlFor="type">Transaction Type</label>
        <Select
          value={formData.type}
          onValueChange={(value) =>
            setFormData((prev) => ({ ...prev, type: value }))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="income">Income</SelectItem>
            <SelectItem value="expense">Expense</SelectItem>
            <SelectItem value="transfer">Transfer</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label htmlFor="amount">Amount</label>
        <Input
          id="amount"
          type="number"
          step="0.01"
          value={formData.amount}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, amount: e.target.value }))
          }
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="category">Category</label>
        <Input
          id="category"
          value={formData.category}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, category: e.target.value }))
          }
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="description">Description</label>
        <Input
          id="description"
          value={formData.description}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, description: e.target.value }))
          }
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="date">Date</label>
        <Input
          id="date"
          type="date"
          value={formData.date}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, date: e.target.value }))
          }
          required
        />
      </div>

      <Button type="submit" className="w-full">
        {initialData.id ? "Update Transaction" : "Create Transaction"}
      </Button>
    </form>
  );
};
