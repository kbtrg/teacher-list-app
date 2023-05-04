import styles from "./index.module.scss"

const Header: React.FC = () => {

  return (
    <div className={styles.container}>
      <p className={styles.title}>先生一覧</p>
    </div>
    );
};

export default Header;