import React from 'react';
import hero from './hero.svg';
import styles from './hero.module.scss';

const Hero = () => {
  return (
    <a href="/" className={styles.hero}>
      <img src={hero} alt="Site logo" width="33" height="53" className={styles.logo} />
    </a>
  );
};

export default Hero;
