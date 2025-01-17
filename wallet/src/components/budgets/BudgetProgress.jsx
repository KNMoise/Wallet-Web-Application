import { Progress } from "../../components/ui/progress";

const BudgetProgress = ({ spent, total }) => {
  const percentage = Math.min((spent / total) * 100, 100);
  
  const getProgressColor = (percent) => {
    if (percent >= 90) return "text-red-500";
    if (percent >= 75) return "text-yellow-500";
    return "text-green-500";
  };

  return (
    <div className="space-y-2">
      <Progress 
        value={percentage} 
        className={`h-2 ${getProgressColor(percentage)}`}
      />
      <p className="text-sm text-right">{percentage.toFixed(1)}%</p>
    </div>
  );
};

export default BudgetProgress;