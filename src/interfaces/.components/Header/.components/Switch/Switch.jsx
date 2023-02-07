import React, { useState } from 'react';

import { IoIosSunny, IoIosMoon } from 'react-icons/io';

import styles from './Switch.module.scss';

export const Switch = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const onToggleIcon = () => setIsDarkTheme(!isDarkTheme);

  return (
    <div className={`${styles.toggle} ${isDarkTheme ? styles.toggleActive : ''}`} onClick={() => onToggleIcon()}>
      <div className={styles.toggleBody}>
        <i className={styles.toggleIcon} data-feather="moon">
          <IoIosMoon />
        </i>
        <i className={styles.toggleIcon} data-feather="sun">
          <IoIosSunny />
        </i>
      </div>
    </div>
  );
};
