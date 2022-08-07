import Navbar from "./Components/Navbar";
import CartContainer from "./Components/CartContainer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { calculateTotals } from "./features/cart/cartSlice";
import Modal from "./Components/modal";
import { getAllItems } from "./features/cart/cartSlice";
function App() {
  const { cartItems, isLoading } = useSelector((store) => store.cart);
  const { isOpen } = useSelector((store) => store.modal);
  const dispatch = useDispatch();

  // fetching items
  useEffect(() => {
    dispatch(getAllItems());
  }, []);

  useEffect(() => {
    dispatch(calculateTotals());
  }, [cartItems]);

  if (isLoading) {
    return (
      <div className="loading">
        <h1>loading...</h1>
      </div>
    );
  }
  return (
    <main>
      {isOpen && <Modal />}
      <Navbar />
      <CartContainer />
    </main>
  );
}
export default App;
