import { SetState } from "~/lib/types";
import styles from "./index.module.scss";
import classnames from "classnames";

type Props = {
  setIsError: SetState<boolean>
  className?: string;
}

const ErrorMessage: React.FC<Props> = ({
  setIsError,
  className,
}) => {
  return (
    <section className={classnames(styles.error, className)}>
      <p>通信エラーが発生しました。</p>
      <button
        className={styles.retry}
        onClick={() => setIsError(false)}
      >
        リトライ
      </button>
    </section>
  );
};

export default ErrorMessage;
