import { useTransactions } from "../../hooks/useTransactions";
import { Card, CardContent } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import Loading from "../shared/Loading";
import ErrorBoundary from "../shared/ErrorBoundary";

const TransactionList = () => {
  const { transactions, loading, error } = useTransactions();

  if (loading) return <Loading />;
  if (error) return <ErrorBoundary error={error} />;

  return (
    <div className="space-y-4">
      {transactions.map((transaction) => (
        <Card key={transaction.id}>
          <CardContent className="flex items-center justify-between p-4">
            <div className="space-y-1">
              <p className="font-medium">{transaction.description}</p>
              <p className="text-sm text-muted-foreground">{transaction.category}</p>
            </div>
            <div className="text-right">
              <p className={`text-lg font-bold ${
                transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
              }`}>
                ${transaction.amount.toFixed(2)}
              </p>
              <Badge variant={transaction.type === 'income' ? 'success' : 'destructive'}>
                {transaction.type}
              </Badge>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};