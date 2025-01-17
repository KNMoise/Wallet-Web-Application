import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

const ErrorBoundary = ({ error }) => {
  return (
    <Alert variant="destructive" className="my-4">
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        {error?.message || "An unexpected error occurred"}
      </AlertDescription>
    </Alert>
  );
};