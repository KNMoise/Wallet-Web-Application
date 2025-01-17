import { useAccounts } from "../../hooks/useAccounts";
import AccountCard from "./AccountCard";
import Loading from "../shared/Loading";
import ErrorBoundary from "../shared/ErrorBoundary";

const AccountList = () => {
  const { accounts, loading, error } = useAccounts();

  if (loading) return <Loading />;
  if (error) return <ErrorBoundary error={error} />;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {accounts.map((account) => (
        <AccountCard key={account.id} account={account} />
      ))}
    </div>
  );
};

export default AccountList;