import React from 'react'
import styles from './sidebar.module.css'
import { AiOutlineHome } from 'react-icons/ai'


interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

function Sidebar({ isOpen = false, onClose }: SidebarProps) {
  const tags = [
    { name: 'AI', count: 1 },
    { name: 'Community', count: 5 },
    { name: 'Compatibility', count: 1 },
    { name: 'CSS', count: 6 },
    { name: 'Design', count: 1 },
    { name: 'Framework', count: 2 },
    { name: 'Git', count: 1 },
    { name: 'HTML', count: 2 },
    { name: 'JavaScript', count: 3 },
    { name: 'Layout', count: 3 },
    { name: 'Learning', count: 6 },
    { name: 'Performance', count: 2 },
  ];

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
              <label key={tag.name} className={styles.tagItem}>
                <input type="checkbox" className={styles.checkbox} />
                <span className={styles.tagName}>{tag.name}</span>
                <span className={styles.tagCount}>{tag.count}</span>
              </label>
            ))}
          </div>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
