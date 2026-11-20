import AppRouter from "./routes/appRoutes"
import { CartProvider } from "./context/CartContext";
import ChatAssistant from "./components/ChatAssistant";


function App() {
  return (
    <CartProvider>
      <AppRouter />
      <ChatAssistant />
    </CartProvider>
  )
}

export default App
