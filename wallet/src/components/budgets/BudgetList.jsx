import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import BudgetProgress from "./BudgetProgress";

const BudgetList = ({ budgets, onEditBudget, onDeleteBudget }) => {
  const getStatusColor = (spent, total) => {
    const percentage = (spent / total) * 100;
    if (percentage >= 90) return "destructive";
    if (percentage >= 75) return "warning";
    return "success";
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {budgets.map((budget) => (
        <Card key={budget.id} className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-bold">{budget.name}</CardTitle>
            <Badge variant={getStatusColor(budget.spent, budget.amount)}>
              {budget.period}
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Category</p>
                <p className="font-medium capitalize">{budget.category}</p>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground mb-2">Progress</p>
                <BudgetProgress spent={budget.spent} total={budget.amount} />
                <div className="flex justify-between mt-2 text-sm">
                  <span>Spent: ${budget.spent.toFixed(2)}</span>
                  <span>of ${budget.amount.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => onEditBudget(budget)}
                >
                  Edit
                </Button>
                <Button 
                  variant="destructive" 
                  size="sm"
                  className="flex-1"
                  onClick={() => onDeleteBudget(budget.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
