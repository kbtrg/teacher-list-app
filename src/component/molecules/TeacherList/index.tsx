import classnames from "classnames"
import styles from "./index.module.scss"
import { _axios } from "~/lib/utils";
import { useEffect, useState } from "react";
import { Teacher } from "~/lib/types";

type Props = {
  className?: string;
}

const TeacherList: React.FC<Props> = ({
  className = "",
}: Props) => {
  // 先生一覧を取得
  const [teachers, setTeachers] = useState<Teacher[]>([])
  useEffect(() => {
    _axios.get("")
      .then(res => setTeachers(res.data))
      .catch(err => console.error(err))
  }, [])

  console.log(teachers)

  return (
    <section className={classnames(styles.container, className)}>
      {teachers.map(teacher => {
        return (
          <ul key={teacher.id}>
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