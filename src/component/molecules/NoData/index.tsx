import classnames from "classnames"
import styles from "./index.module.scss"

type Props = {
  className?: string;
}

const NoData: React.FC<Props> = ({
  className = "",
}: Props) => {
  return (
    <section className={classnames(styles.container, className)}>
      <div className={styles.wrapper}>
        <p>データが存在しません</p>
        <p>条件を変更して再度検索してください</p>
      </div>
    </section>
  )
}

export default NoData