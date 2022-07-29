import css from "../styles/Hero.module.css";
import Cherry from "../assets/Cherry.png";
import Pizza1 from "../assets/p1.jpg";
import HeroImage from "../assets/HeroImage.png";
import Image from "next/image";
import {UilPhone} from '@iconscout/react-unicons'

const Hero = () => {
  return (
    <div className={css.container}>
      {/* left side */}
      <div className={css.left}>
        <div className={css.cherryDiv}>
          <span>Fast Delivery</span>
          <Image src={Cherry} alt="cherry" height={25} width={40} />
        </div>

        <div className={css.heroText}>
          <span>Be The Fastest</span>
          <span>In Delivering</span>
          <span> Your </span>
          <span style={{ color: "var(--themeRed)" }}>Pizza</span>
        </div>
        <span className={css.miniText}>
          Our mission is to filling your tummy with delicious food and free Delivery
        </span>
        <button className={`btn ${css.btn}`}>
          Get Started
        </button>


      </div>

      {/* right side */}
      <div className={css.right}>
        <div className={css.imageContainer}>
          <Image src={HeroImage} alt="heroimage" layout="intrinsic"/>
        </div>
        <div className={css.ContactUs}>
          <span>Contact Us</span>
          <div>
            <UilPhone color="white"/>
          </div>
        </div>
        <div className={css.Pizza}>
          <div>
            <Image src={Pizza1}alt="" objectFit="cover" layout="intrinsic"/>
          </div>
          <div className={css.details}>
            <span>Italian Pizza</span>
            <span style={{color:"var(--themeRed)"}}>$</span>
            <span>7.99</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
