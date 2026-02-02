import { AdminProvider } from "./context/AdminContext";
import AdminPanel from "./pages/AdminPanel";

function App() {
  return (
    <AdminProvider>
      <AdminPanel />
    </AdminProvider>
  );
}

export default App;