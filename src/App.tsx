import { ErrorBoundary } from "react-error-boundary";
import SportsLeagues from "./SportsLeagues";
import ErrorFallback from "./ErrorFallback";

export default function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <SportsLeagues />
    </ErrorBoundary>
  );
}
