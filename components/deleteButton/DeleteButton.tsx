import React from 'react';
import styles from './deleteButton.module.css';
import { FiTrash2 } from 'react-icons/fi';

interface DeleteButtonProps {
  onClick?: () => void;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ onClick }) => {
  return (
    <div className={styles.container}>
      <button className={styles.deleteBtn} onClick={onClick}>
        <FiTrash2 />
      </button>
    </div>
  );
};

export default DeleteButton;
