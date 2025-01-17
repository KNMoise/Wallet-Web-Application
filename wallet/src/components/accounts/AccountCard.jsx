import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../../components/ui/card";
import { Button } from "../ui/button";

const AccountCard = ({ account, onSelect }) => {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle>{account.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p className="text-2xl font-bold">${account.balance.toFixed(2)}</p>
          <p className="text-muted-foreground">{account.type}</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={() => onSelect(account)} variant="outline" className="w-full">
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};
