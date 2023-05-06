import classnames from "classnames"
import styles from "./index.module.scss"
import { _axios } from "~/lib/utils";
import { SetStateAction, useEffect, useState } from "react";
import { Maybe, Order, Teacher } from "~/lib/types";
import Pagination from "~/component/atoms/Pagination.tsx";
import NoData from "~/component/molecules/NoData";
import Loading from "~/component/atoms/Loading";
import ErrorMessage from "~/component/atoms/ErrorMessage";

type SortKey = "name" | "loginId"

type Props = {
  className?: string;
}

/**
 * 4. 通信エラーが発生した場合
 * 5. デザイン作り
 */

const TeacherList: React.FC<Props> = ({
  className = "",
}: Props) => {
  const [isLoading, setIsLoading] = useState(false) // ローディング
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
  }, [page, limit, sortKey, order, isReadySearch])

  const CustomMainContent: React.FC = () => {
    const MainContent = (() => {
      if (isError) return <ErrorMessage setIsError={setIsError} />
      else if (!isLoading && teachers.length === 0) return <Loading />
      else return (
        <>
          {teachers.map((teacher, i) => {
            return (
              <ul key={i}>
                <li>
                  <p>{teacher.name}</p>
                  <p>{teacher.loginId}</p>
                </li>
              </ul>
            )
          })}
        </>
      )
    })()
    
    return MainContent
  }

  return (
    <section className={classnames(styles.container, className)}>
      {/* ローディング */}
      {isLoading && <Loading />}

      {/* エラーを意図的に発生させるボタン */}
      <button onClick={() => setIsError(true)}>エラーを発生させる</button>

      {/* ソートの種類 */}
      <p>ソートの種類</p>
      <select
        value={sortKey}
        onChange={e => setSortKey(e.target.value as Maybe<SortKey>)}
      >
        <option value={undefined}>選択してください</option>
        <option value="name">名前</option>
        <option value="loginId">ログインID</option>
      </select>

      {/* 並び順 */}
      <p>並び順</p>
      <select
        value={order}
        onChange={e => setOrder(e.target.value as Maybe<Order>)}
      >
        <option value={undefined}>選択してください</option>
        <option value="ASC">昇順</option>
        <option value="DESC">降順</option>
      </select>
      
      {/* 部分一致テキスト入力 */}
      <p>部分一致テキスト入力</p>
      <input
        type="text"
        value={searchText}
        onChange={e => setSearchText(e.target.value)}
      />
      <button onClick={() => setIsReadySearch(true)}>
        検索
      </button>

      {/* 先生一覧表示 */}
      <CustomMainContent />

      {/* ページネーション */}
      <Pagination page={page} setPage={setPage} totalPage={totalPage}/>
    </section>
  )
}

export default TeacherList