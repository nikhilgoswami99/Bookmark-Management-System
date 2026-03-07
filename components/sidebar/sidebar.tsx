import React from 'react'
import styles from './sidebar.module.css'
import { AiOutlineHome } from 'react-icons/ai'


interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

function Sidebar({ isOpen = false, onClose }: SidebarProps) {
  const tags = [
    'AI',
    'Community',
    'Compatibility',
    'CSS',
    'Design',
    'Framework',
    'Git',
    'HTML',
    'JavaScript',
    'Layout',
    'Learning',
    'Performance',
  ];

  const handleTags = (value: any) => {
    console.log(value);
  }

  return (
    <>
      <div 
        className={`${styles.overlay} ${isOpen ? styles.visible : ''}`} 
        onClick={onClose}
      />
      <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
        {/* Navigation Section */}
        <nav className={styles.nav}>
          <a href="#" className={`${styles.navItem} ${styles.active}`}>
            <AiOutlineHome className={styles.navIcon} />
            <span>Home</span>
          </a>

        </nav>

        {/* Tags Section */}
        <div className={styles.tagsSection}>
          <h3 className={styles.tagsHeader}>TAGS</h3>
          <div className={styles.tagsList}>
            {tags.map((tag) => (
              <label key={tag} className={styles.tagItem}>
                <input name={tag} onChange={(e) => handleTags(e.target.name)} type="checkbox" className={styles.checkbox} />
                <span className={styles.tagName}>{tag}</span>
              </label>
            ))}
          </div>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
