import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import TransactionList from "../../components/transactions/TransactionList";
import Loading from "../../components/shared/Loading";
import ErrorBoundary from "../../components/shared/ErrorBoundary";
import { useAccounts } from "../../hooks/useAccounts";
import { useTransactions } from "../../hooks/useTransactions";

const AccountDetailPage = () => {
    const { id } = useParams();
    const { accounts, loading: accountLoading } = useAccounts();
    const { transactions, loading: transactionsLoading, fetchTransactions } = useTransactions();
    const [account, setAccount] = useState(null);
  
    useEffect(() => {
      if (accounts.length > 0) {
        const foundAccount = accounts.find(a => a.id === id);
        setAccount(foundAccount);
      }
    }, [accounts, id]);
  
    useEffect(() => {
      fetchTransactions({ accountId: id });
    }, [fetchTransactions, id]);
  
    if (accountLoading || transactionsLoading) return <Loading />;
    if (!account) return <ErrorBoundary error={{ message: "Account not found" }} />;
  
    const recentTransactions = transactions
      .filter(t => t.accountId === id)
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 10);
  
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">{account.name}</h1>
          <Button variant="outline">Edit Account</Button>
        </div>
  
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Current Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">${account.balance.toFixed(2)}</p>
            </CardContent>
          </Card>
  
          <Card>
            <CardHeader>
              <CardTitle>Account Type</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-medium capitalize">{account.type}</p>
            </CardContent>
          </Card>
  
          <Card>
            <CardHeader>
              <CardTitle>Monthly Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{recentTransactions.length} transactions</p>
            </CardContent>
          </Card>
        </div>
  
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <TransactionList transactions={recentTransactions} />
          </CardContent>
        </Card>
      </div>
    );
  };