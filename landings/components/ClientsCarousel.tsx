import React from "react";
import Image from "next/image";
import styles from "./ClientsCarousel.module.css";

const clientLogos = Array.from(
  { length: 10 },
  (_, i) => `/assets/images/clients-${i + 1}.jpg`
);

const ClientsCarousel = () => {
  return (
    <div className={styles.carousel + " mt-10-responsive-negative"}>
      <div className={styles.track}>
        {clientLogos.map((logo, index) => (
          <div key={index} className={styles.slide}>
            <Image
              src={logo}
              alt={`Client ${index + 1}`}
              width={335}
              height={201}
            />
          </div>
        ))}
        {clientLogos.map((logo, index) => (
          <div key={index + 10} className={styles.slide}>
            <Image
              src={logo}
              alt={`Client ${index + 1}`}
              width={335}
              height={201}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientsCarousel;
