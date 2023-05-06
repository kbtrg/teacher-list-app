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
      データがありません
    </section>
  )
}

export default NoData