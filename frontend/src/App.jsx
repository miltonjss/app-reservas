import MenuLateral from "./components/menu-lateral/MenuLateral";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <>
      <div className="flex">
        <MenuLateral />
        <AppRoutes />
      </div>
    </>
  );
}

export default App;
