import Header from "~/component/templetes/Header";
import type { NextPage } from "next";
import TeacherList from "~/component/molecules/TeacherList";
import styles from "./index.module.scss"

const App: NextPage = () => {

  return (
    <>
      <Header />
      <TeacherList className={styles.teacherList} />
    </>
  );
};

export default App;
