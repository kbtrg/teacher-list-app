import classnames from "classnames";
import Image from "next/image";
import { useEffect, useState } from "react";
import ErrorMessage from "~/component/atoms/ErrorMessage";
import Loading from "~/component/atoms/Loading";
import Pagination from "~/component/atoms/Pagination.tsx";
import NoData from "~/component/molecules/NoData";
import { Maybe, Order, Teacher } from "~/lib/types";
import { _axios } from "~/lib/utils";
import styles from "./index.module.scss";

type SortKey = "name" | "loginId"

type CustomBlock = {
  title?: string
  children: React.ReactNode
}

type Props = {
  className?: string;
}

const TeacherList: React.FC<Props> = ({
  className = "",
}: Props) => {
  const [isLoading, setIsLoading] = useState(true) // ローディング
  const [isError, setIsError] = useState(false) // 通信エラー
  const [totalTeachers, setTotalTeachers] = useState(0) // 先生の総数
  const [teachers, setTeachers] = useState<Teacher[]>([]) // 先生のリスト
  const [page, setPage] = useState(1) // ページ番号
  const limit = 20 // 1ページあたりの表示数
  const [sortKey, setSortKey] = useState<Maybe<SortKey>>(undefined) // ソートの種類
  const [order, setOrder] = useState<Maybe<Order>>(undefined) // 並び順
  const [searchText, setSearchText] = useState("") // 部分一致検索テキスト
  const [isReadySearch, setIsReadySearch] = useState(false) // 部分一致検索テキスト

  const totalPage = Math.ceil(totalTeachers / limit) // ページネーションの総数
  
  // 先生の総数を取得（ページネーションの表示を変更するために取得）
  useEffect(() => {
    _axios.get("")
      .then(res => setTotalTeachers(res.data.length))
      .catch(error => {
        console.error(error)
        setIsError(true)
      })
  })
  
  // 条件に合った先生一覧を取得
  useEffect(() => {
    if(isError) return
    setIsLoading(true)

    const query = (() => {
      const pageQuery = page ? `_page=${page}` : ""
      const limitQuery = limit ? `_limit=${limit}` : ""
      const sortKeyQuery = sortKey ? `_sort=${sortKey}` : ""
      const orderQuery = order ? `_order=${order}` : ""
      const searchTextQuery = searchText ? `${sortKey}_like=${searchText}` : ""
      return `?${[pageQuery, limitQuery, sortKeyQuery, orderQuery, searchTextQuery].filter(Boolean).join("&")}`
    })();

    (async () => {
      try {
        await _axios.get(query)
          .then(res => setTeachers(res.data))
          .catch(error => {
            console.error(error)
            setIsError(true)
          })
      } catch(error) {
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    })()
  
    // 部分一致検索のフラグをfalseにする
    if(isReadySearch) {
      setIsReadySearch(false)
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit, sortKey, order, isReadySearch, isError])

  const CustomMainContent: React.FC = () => {
    const TeacherList: React.FC = () => {
      return (
        <>
          <ul className={styles.teacherListWrapper}>
            {teachers.map((teacher, i) => {
              return (
                <li key={i}>
                  <button className={styles.teacherList}>
                    <Image
                      src={"/images/user.svg"}
                      alt={teacher.name}
                      width={40}
                      height={40}
                    />
                    <p className={styles.loginId}>{teacher.loginId}</p>
                    <p>{teacher.name}</p>
                  </button>
                </li>
              )
            })}
          </ul>
        </>
      )
    }

    const MainContent: React.FC = () => {
      if (isError) return <ErrorMessage setIsError={setIsError} />
      else if (!isLoading && teachers.length === 0) return <NoData />
      else return (
        <>
          <TeacherList />
          {!isLoading && (
            <Pagination
              page={page}
              setPage={setPage}
              totalPage={totalPage}
              className={styles.pagination}
            />
          )}
        </>
      )
    }
    
    return <MainContent />
  }
  
  const CustomBlock: React.FC<CustomBlock> = ({
    title,
    children,
  }) => {
    return (
      <div className={styles.customBlock}>
        <p className={styles.title}>{title}</p>
        <div className={styles.children}>
          {children}
        </div>
      </div>
    )
  }

  return (
    <section className={classnames(styles.container, className)}>
      {isLoading && <Loading />}

      <section className={styles.sidebarWrapper}>
        <div className={styles.sidebar}>
          <CustomBlock title="① ソートの種類">
            <select
              value={sortKey}
              onChange={e => setSortKey(e.target.value as Maybe<SortKey>)}
            >
              <option value={undefined}>選択してください</option>
              <option value="name">名前</option>
              <option value="loginId">ログインID</option>
            </select>
          </CustomBlock>
          <CustomBlock title="② 検索方法">
            <div className={styles.subContent}>
              <p className={styles.subContent__title}>並び順</p>
              <select
                value={order}
                onChange={e => setOrder(e.target.value as Maybe<Order>)}
              >
                <option value={undefined}>選択してください</option>
                <option value="ASC">昇順</option>
                <option value="DESC">降順</option>
              </select>
            </div>
            <div className={styles.subContent}>
              <p className={styles.subContent__title}>部分一致テキスト入力</p>
              <input
                type="text"
                value={searchText}
                className={styles.searchText}
                onChange={e => setSearchText(e.target.value)}
              />
              <button
                className={styles.searchButton}
                onClick={() => setIsReadySearch(true)}
              >
                検索
              </button>
            </div>
          </CustomBlock>
          
          {/* エラーを意図的に発生させるボタン */}
          <button
            className={styles.errorButton}
            onClick={() => setIsError(true)}
          >
            エラーを発生させる
          </button>
        </div>
      </section>


      <section className={styles.mainContent}>
        {/* 先生一覧表示 */}
        <CustomMainContent />
      </section>
    </section>
  )
}

export default TeacherList