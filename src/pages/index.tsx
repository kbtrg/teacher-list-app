import Header from "~/component/templetes/Header";
import type { NextPage } from "next";
import TeacherList from "~/component/molecules/TeacherList";

const App: NextPage = () => {

  return (
    <>
      <Header />
      <TeacherList />
    </>
  );
};

export default App;
