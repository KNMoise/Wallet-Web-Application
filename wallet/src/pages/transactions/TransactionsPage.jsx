import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import TransactionList from "../../components/transactions/TransactionList";
import TransactionForm from "../../components/transactions/TransactionForm";
import TransactionFilters from "../../components/transactions/TransactionFilters";
import { useTransactions } from "../../hooks/useTransactions";

const TransactionsPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { addTransaction, fetchTransactions } = useTransactions();

  const handleAddTransaction = async (transactionData) => {
    try {
      await addTransaction(transactionData);
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Failed to add transaction:', error);
    }
  };

  const handleFilter = (filters) => {
    fetchTransactions(filters);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Transactions</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>Add Transaction</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Transaction</DialogTitle>
            </DialogHeader>
            <TransactionForm onSubmit={handleAddTransaction} />
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <TransactionFilters onFilter={handleFilter} />
        </CardContent>
      </Card>

      <TransactionList />
    </div>
  );
};