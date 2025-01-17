import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Loading from "@/components/shared/Loading";
import ErrorBoundary from "@/components/shared/ErrorBoundary";
import { useTransactions } from "@/hooks/useTransactions";

const TransactionDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { transactions, loading } = useTransactions();
  const [transaction, setTransaction] = useState(null);

  useEffect(() => {
    if (transactions.length > 0) {
      const foundTransaction = transactions.find(t => t.id === id);
      setTransaction(foundTransaction);
    }
  }, [transactions, id]);

  if (loading) return <Loading />;
  if (!transaction) return <ErrorBoundary error={{ message: "Transaction not found" }} />;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Transaction Details</h1>
        <div className="space-x-2">
          <Button variant="outline" onClick={() => navigate(-1)}>Back</Button>
          <Button variant="outline">Edit</Button>
          <Button variant="destructive">Delete</Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Description</p>
              <p className="text-lg font-medium">{transaction.description}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Amount</p>
              <p className={`text-lg font-bold ${
                transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
              }`}>
                ${transaction.amount.toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Category</p>
              <p className="text-lg font-medium">{transaction.category}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Additional Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Date</p>
              <p className="text-lg font-medium">
                {new Date(transaction.date).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Type</p>
              <p className="text-lg font-medium capitalize">{transaction.type}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Account</p>
              <p className="text-lg font-medium">{transaction.accountName}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};