import classnames from "classnames"
import styles from "./index.module.scss"
import { SetState } from "~/lib/types"
import { range } from "~/lib/utils"
import Image from "next/image"
import { useState } from "react"

type Props = {
  page: number
  setPage: SetState<number>
  totalPage: number
  className?: string;
}

const Pagination: React.FC<Props> = ({
  page,
  setPage,
  totalPage,
  className = "",
}: Props) => {
  const [displayFirstNumber, setDisplayFirstNumber] = useState(1) // ページネーションの先頭の数
  const displayThreshold = 5 // ページネーションの表示数

  return (
    <section className={classnames(styles.container, className)}>
      {/* 左ボタン */}
      <button 
        className={styles.arrowWrapper}
        onClick={() => {
          if(totalPage <= displayThreshold) return;
          else if(displayFirstNumber === 1) return;
          setDisplayFirstNumber(displayFirstNumber - displayThreshold)
        }}  
      >
        <Image
          src={"/images/arrow-left.svg"}
          alt={"左ボタン"}
          width={20}
          height={20}
          className={styles.arrow}
        />
      </button>

      {/* 数字ボタン */}
      {range(displayFirstNumber, displayFirstNumber + displayThreshold - 1).map((i) => {
        if(i > totalPage) return null

        return (
          <button 
            key={i}
            className={classnames(styles.number, {
              [styles.number__active]: i === page
            })}
            onClick={() => setPage(i)}
          >
            {i}
          </button>
        );
      })}

      {/* 右ボタン */}
      <button
        className={styles.arrowWrapper}
        onClick={() => {
          if (totalPage <= displayThreshold) return
          else if (displayFirstNumber === totalPage - (totalPage % displayThreshold) + 1) return;
          setDisplayFirstNumber(displayFirstNumber + displayThreshold)
        }}
      >
        <Image
          src={"/images/arrow-right.svg"}
          alt={"右ボタン"}
          width={20}
          height={20}
          className={styles.arrow}
        />
      </button>
    </section>
  );
};

export default Pagination