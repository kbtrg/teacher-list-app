import classnames from "classnames"
import styles from "./index.module.scss"
import { _axios } from "~/lib/utils";
import { useEffect, useState } from "react";
import { Maybe, Order, SetState, Teacher } from "~/lib/types";
import { useRouter } from "next/router";

type CustomSort = {
  title: string
  order: Maybe<SortKey> | Maybe<Order>
  setOrder: SetState<Maybe<SortKey>> | SetState<Maybe<Order>>
}

type SortKey = "name" | "loginId"

type Props = {
  className?: string;
}

const TeacherList: React.FC<Props> = ({
  className = "",
}: Props) => {
  const router = useRouter()

  const [teachers, setTeachers] = useState<Teacher[]>([]) // 先生のリスト
  const [page, setPage] = useState(1) // ページ番号
  const [limit, setLimit] = useState(20) // 1ページあたりの表示数
  const [sortKey, setSortKey] = useState<Maybe<SortKey>>(undefined) // ソートの種類
  const [order, setOrder] = useState<Maybe<Order>>(undefined) // 並び順
  const [searchText, setSearchText] = useState("") // 部分一致検索テキスト
  const [isReadySearch, setIsReadySearch] = useState(false) // 部分一致検索テキスト
  
  // 先生一覧を取得
  useEffect(() => {
    const query = (() => {
      const pageQuery = page ? `_page=${page}` : ""
      const limitQuery = limit ? `_limit=${limit}` : ""
      const sortKeyQuery = sortKey ? `_sort=${sortKey}` : ""
      const orderQuery = order ? `_order=${order}` : ""
      const searchTextQuery = searchText ? `${sortKey}_like=${searchText}` : ""
      return `?${[pageQuery, limitQuery, sortKeyQuery, orderQuery, searchTextQuery].filter(Boolean).join("&")}`
    })()

    _axios.get(query)
      .then(res => setTeachers(res.data))
      .catch(err => console.error(err))
  
    // 部分一致検索のフラグをfalseにする
    if(isReadySearch) {
      setIsReadySearch(false)
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit, sortKey, order, isReadySearch])

  // const CustomSelect: React.FC<CustomSort> = ({
  //   title,
  //   order,
  //   setOrder,
  // }) => {

  //   return (
  //     <>
  //       <p>{title}</p>
  //       <select
  //         value={sortKey}
  //         onChange={e => setSortKey(e.target.value as Maybe<SortKey>)}
  //       >
  //         <option value={undefined}>デフォルト</option>
  //         <option value="name">名前</option>
  //         <option value="loginId">ログインID</option>
  //       </select>
  //     </>
  //   )
  // }

  return (
    <section className={classnames(styles.container, className)}>
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
    </section>
  )
}

export default TeacherList