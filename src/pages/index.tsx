import type { NextPage } from "next";
import TeacherList from "~/component/molecules/TeacherList";
import Header from "~/component/templetes/Header";

const App: NextPage = () => {

  return (
    <>
      <Header />
      <TeacherList />
    </>
  );
};

export default App;
