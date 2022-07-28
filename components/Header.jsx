import css from "../styles/Header.module.css";
import Logo from '../assets/Logo.png'
import Image from "next/image";
import {UilShoppingBag} from '@iconscout/react-unicons'

const Header = () => {
  return <div className={css.header}>
    {/* logo side */}
    <div className={css.logo}>
      <Image src={Logo} alt="Logo" width="50" height="50"/>
      <span>Fudo</span>
    </div>
    {/* Menu side */}
    <ul className={css.menu}>
      <li>Home</li>
      <li>Menu</li>
      <li>Contact</li>
    </ul>

    {/* Right Side */}
    <div className={css.rightSide}>
      <div className={css.cart}>
        <UilShoppingBag size={35} color="#2E2E2E"/>
        <div className={css.badge}>1</div>
      </div>
    </div>
  </div>;


};



export default Header;
