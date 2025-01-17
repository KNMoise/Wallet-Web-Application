import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AccountList from "@/components/accounts/AccountList";
import AccountForm from "@/components/accounts/AccountForm";
import { useAccounts } from "@/hooks/useAccounts";

const AccountsPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { addAccount } = useAccounts();

  const handleAddAccount = async (accountData) => {
    try {
      await addAccount(accountData);
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Failed to add account:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Accounts</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>Add Account</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Account</DialogTitle>
            </DialogHeader>
            <AccountForm onSubmit={handleAddAccount} />
          </DialogContent>
        </Dialog>
      </div>

      <AccountList />
    </div>
  );
};