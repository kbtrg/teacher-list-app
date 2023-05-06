import { range } from "~/lib/utils";
import styles from "./index.module.scss";

const Loading: React.FC = () => {
  return (
    <div className={styles.skCircleFade}>
      {range(0, 12).map((i) => (
        <span key={i} className={styles.skCircleFadeDot}></span>
      ))}
    </div>
  );
};

export default Loading;
