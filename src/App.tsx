import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AirQualityProvider } from "./contexts/air-quality-context";
import { SearchBar } from "./components/search-bar";
import { CityInfo } from "./components/city-info";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AirQualityProvider>
        <SearchBar />
        <CityInfo />
      </AirQualityProvider>
    </QueryClientProvider>
  );
}

export default App;
