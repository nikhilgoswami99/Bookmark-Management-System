import React, { useEffect, useState } from 'react'
import styles from './sidebar.module.css'
import { AiOutlineHome } from 'react-icons/ai'
import { useRouter ,usePathname, useSearchParams } from 'next/navigation';



interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

function Sidebar({ isOpen = false, onClose }: SidebarProps) {

  const [tags, setTags] = useState<string[]>([]);
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await fetch('/api/tags');
        const data = await response.json();
        setTags(data);
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    };

    fetchTags();
  }, []);

  const handleTags = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tag = e.target.name;
    const isChecked = e.target.checked;
    const params = new URLSearchParams(searchParams.toString());
    
    if (isChecked) {
      params.set('tag', tag);
    } else {
      params.delete('tag');
    }

    router.push(`${pathName}?${params.toString()}`);
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
                <input name={tag} onChange={(e) => handleTags(e)} type="checkbox" className={styles.checkbox} />
                <span className={styles.tagName}>{tag.toUpperCase()}</span>
              </label>
            ))}
          </div>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
