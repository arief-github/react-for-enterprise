import clsx from 'clsx';
import React from 'react';
import styles from './Alert.module.css';
import { AlertVariant } from './alert.type';
import {
  SuccessIcon,
  InfoIcon,
  ErrorIcon,
  CloseIcon,
} from './components/icons';

type AlertProps = {
  show: boolean;
  variant: AlertVariant;
  showIcon?: boolean;
  headerText?: string;
  text?: string;
  children?: React.ReactNode;
  onClose?: () => void;
};

const ICONS = {
  success: SuccessIcon,
  info: InfoIcon,
  error: ErrorIcon,
};

const ConfigureAlert = (props: AlertProps) => {
  const {
    children,
    text,
    headerText,
    show,
    variant,
    onClose,
    showIcon = true,
  } = props;

  const Icon = ICONS[variant];

  return show ? (
    <div className={clsx(styles.alert, styles[variant])}>
      {showIcon ? (
        <div className={styles.alertIconBox}>
          <Icon className={clsx(styles.alertIcon, styles[variant])} />
        </div>
      ) : null}
      {onClose ? (
        <button className='absolute top-5 right-5' onClick={onClose}>
          <CloseIcon className={clsx(styles.alertIcon, styles[variant])} />
        </button>
      ) : null}
      <div className={styles.alertContent}>
        {headerText ? (
          <div className={clsx(styles.alertHeader, styles[variant])}>
            {headerText}
          </div>
        ) : null}
        <div className={clsx(styles.alertBody, styles[variant])}>
          {text ? text : children}
        </div>
      </div>
    </div>
  ) : null;
};

export default ConfigureAlert;
