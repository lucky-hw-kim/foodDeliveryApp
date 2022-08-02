import { Modal, useMantineTheme } from "@mantine/core"
import { useRouter } from "next/router"
import { useState } from "react"
import toast, { Toaster } from "react-hot-toast"
import { createOrder } from "../lib/orderHandler"
import { useStore } from "../store/store"
import css from '../styles/Order.module.css'


function OrderModal({opened, setOpened, paymentMethod}) {
  const router = useRouter()
  const resetCart = useStore((state)=>(state.resetCart))
  const [formData, setFormData] = useState({})
  const handleInput = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = await createOrder({...formData, total, paymentMethod})
    toast.success("Order Placed")
    resetCart()
    {
      typeof window !== 'undefined' && localStorage.setItem('order', id)
    }
    router.push(`order/${id}`)
  }


  const theme = useMantineTheme();
  const total = typeof window !== 'undefined' && localStorage.getItem('total')
  return (
    <Modal
    overlayColor={theme.colorScheme === "dark" ? theme.colors.dark[9] : theme.colors.gray[2]}
    overlayOpacity={0.55}
    overlayBlur={3}
    opened = {opened}
    onClose ={()=>setOpened(null)}
    >
      {/* modal content */}
     <form onSubmit={handleSubmit} className={css.formContainer}>
    <input onChange={handleInput} type="text" name="name" required placeholder="Name" />
    <input onChange={handleInput} type="text" name="phone" required placeholder="Phone Number"/>
    <textarea onChange={handleInput} name="address" rows={3} placeholder="Address"></textarea>
    {paymentMethod===0 ? (
          <span>
          You will pay <span>${total} </span> on delivery.
        </span>
    ): <span>Paid Order</span>}

    <button type="submit" className="btn">Place Order</button>
     </form>
    </Modal>
  )
}

export default OrderModal