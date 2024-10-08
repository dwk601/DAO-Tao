import "./App.css";
import { Governors } from "./_components/Governors";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider contextSharing={true} client={queryClient}>
      <div className="App">
        <Header />
        <Governors />
      </div>
    </QueryClientProvider>
  );
}

const Header = () => {
  return (
    <div>
      <h1>Tally API Quickstart</h1>
    </div>
  );
};

export default App;
