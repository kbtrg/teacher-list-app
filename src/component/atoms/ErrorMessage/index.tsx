import { SetState } from "~/lib/types";
import styles from "./index.module.scss";
import classnames from "classnames";
import Image from "next/image";

type Props = {
  setIsError: SetState<boolean>
  className?: string;
}

const ErrorMessage: React.FC<Props> = ({
  setIsError,
  className,
}) => {
  return (
    <section className={classnames(styles.container, className)}>
      <div className={styles.dialog}>
        <div className={styles.titleWrapper}>
          <Image
            src="/images/error.svg"
            alt="エラーアイコン"
            width={20}
            height={20}
          />
          <span className={styles.title}>通信エラーが発生しました。</span>
        </div>
        <button
          className={styles.retryButton}
          onClick={() => setIsError(false)}
        >
          リトライ
        </button>
      </div>
    </section>
  );
};

export default ErrorMessage;
