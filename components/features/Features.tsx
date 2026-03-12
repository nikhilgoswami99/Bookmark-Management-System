import React from 'react';
import styles from './Features.module.css';
import { 
  FiBookmark, 
  FiFolder, 
  FiSearch, 
  FiTag, 
  FiShare2, 
  FiShield, 
  FiSmartphone, 
  FiZap 
} from 'react-icons/fi';

const featuresData = [
  {
    icon: <FiBookmark />,
    title: "Universal Bookmarking",
    description: "Save from Twitter, YouTube, Reddit, GitHub, Instagram, and any website. One place for everything."
  },
  {
    icon: <FiFolder />,
    title: "Smart Collections",
    description: "Organize bookmarks into nested collections. Auto-categorize based on source, topic, or custom rules."
  },
  {
    icon: <FiSearch />,
    title: "Powerful Search",
    description: "Full-text search across all your bookmarks. Find anything instantly with filters and advanced queries."
  },
  {
    icon: <FiTag />,
    title: "Tag System",
    description: "Add tags to any bookmark for flexible organization. Create tag hierarchies and smart tag suggestions."
  },
  {
    icon: <FiShare2 />,
    title: "Share & Collaborate",
    description: "Share collections with teammates or make them public. Collaborate on curated link lists together."
  },
  {
    icon: <FiShield />,
    title: "Private & Secure",
    description: "Your bookmarks are encrypted and private by default. Full control over what you share and with whom."
  },
  {
    icon: <FiSmartphone />,
    title: "Cross-Platform",
    description: "Access from any device with our web app, browser extension, and mobile apps. Always in sync."
  },
  {
    icon: <FiZap />,
    title: "Quick Save",
    description: "Browser extension and keyboard shortcuts for lightning-fast saving. Never lose a link again."
  }
];

const Features = () => {
  return (
    <div className={styles.featuresSection}>
      <h2 className={styles.heading}>Everything you need to manage your bookmarks</h2>
        <p className={styles.subtitle}>
        One place for all your inspiration, knowledge, and research.
        Beautifully organized and instantly searchable.
      </p>
      <div className={styles.featuresGrid}>
        {featuresData.map((feature, index) => (
          <div key={index} className={styles.featureCard}>
            <div className={styles.iconWrapper}>
              {feature.icon}
            </div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
