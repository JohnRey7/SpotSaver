
import Sidebar from "../ui/dashboard/sidebar/sidebar"
import styles from "../ui/dashboard/dashboard.module.css"

interface LayoutProps {
  children: React.ReactNode;  
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (

    <div className={styles.container}>
    <div className={styles.menu}>
      <Sidebar/>
    </div>
    <div className={styles.content}>
      
      {children}
      
    </div>
  </div>
  );
}

export default Layout;