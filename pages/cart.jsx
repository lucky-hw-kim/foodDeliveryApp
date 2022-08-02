import css from "../styles/Cart.module.css";
import Layout from "../components/Layout";
import { useStore } from "../store/store";
import { urlFor } from "../lib/client";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import OrderModal from "../components/OrderModal";
import { useRouter } from "next/router";



export default function Cart() {
  const [order, setOrder] = useState(
    typeof window  !== 'undefined' && localStorage.getItem('order')
  )
  const Router = useRouter()
  const [paymentMethod, setPaymentMethod] = useState(null)
  const CartData = useStore((state) => state.cart);
  const removePizza = useStore((state) => state.removePizza);
  const total = () =>
    CartData.pizzas.reduce((a, b) => a + b.quantity * b.price, 0);
  const handleRemove = (i) => {
    removePizza(i);
    toast.error("Item Removed");
  };
  const handleOnDelivery = () => {
    setPaymentMethod(0);
    typeof window  !== 'undefined' &&
    localStorage.setItem('total', total())
  }
  const handleCheckout = async() => {
    typeof window  !== 'undefined' && localStorage.setItem('total', total())
    setPaymentMethod(1);
    const response = await fetch('api/stripe', {
      method: "POST",
      headers: {
        'Content-Type': "application/json",
      },
      body: JSON.stringify(CartData.pizzas)
    })  
    if(response.status === 500) return;
    const data = await response.json();
    toast.loading("Redirecting...")
    Router.push(data.url)
  }

  return (
    <Layout>
      {typeof window  !== 'undefined' && (
      <div className={css.container}>
        {/* details */}
        <div className={css.details}>
          <table className={css.table}>
            <thead>
              <th>Pizza</th>
              <th>Name</th>
              <th>Size</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th></th>
            </thead>
            <tbody className={css.tbody}>
              {CartData.pizzas.length > 0 &&
                CartData.pizzas.map((pizza, i) => {
                  const src = urlFor(pizza.image).url();
                  return (
                    <tr key={i}>
                      <td className={css.imageTd}>
                        <Image
                          unoptimized
                          loader={() => src}
                          src={src}
                          alt=""
                          objectFit="cover"
                          width={85}
                          height={85}
                        />
                      </td>
                      <td>{pizza.name}</td>
                      <td>
                        {pizza.size === 0
                          ? "Small"
                          : pizza.size === 1
                          ? "Medium"
                          : "Large"}
                      </td>
                      <td>{pizza.price}</td>
                      <td>{pizza.quantity}</td>
                      <td>{pizza.price * pizza.quantity}</td>
                      <td
                        style={{ color: "var(--themeRed)", cursor: "pointer" }}
                        onClick={() => {
                          handleRemove(i);
                        }}
                      >
                        x
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
        {/* summary */}
        <div className={css.cart}>
          <span>Cart</span>
          <div className={css.CartDetails}>
            <div>
              <span>Items</span>
              <span>{CartData.pizzas.length}</span>
            </div>
            <div>
              <span>Total</span>
              <span>$ {total()}</span>
            </div>
          </div>
          {!order && CartData.pizzas.length > 0 ? (
            
            <div className={css.buttons}>
              <button className="btn" onClick={handleOnDelivery}>
                Pay on Delivery
              </button>
              <button className="btn" onClick={handleCheckout}>Pay Now</button>
            </div>
            ) : <span>Order in process</span>}
          </div>

      </div>
      )}
      <Toaster />
      {/* Modal */}
      <OrderModal
      opened = {paymentMethod === 0}
      setOpened = {setPaymentMethod}
      paymentMethod = {paymentMethod}

      />
       
    </Layout>
  );
}
