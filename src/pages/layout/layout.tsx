import Footer from "components/layout/footer"
import Header from "components/layout/header"
import { Outlet } from "react-router-dom"

type TFilterType = "all" | "mine"

interface IProps {
  setFilter: (v: TFilterType) => void;
}

function Layout({ setFilter }: IProps) {

  return (
    <div>
      <Header setFilter={setFilter} />
      <Outlet />
      <Footer />
    </div>
  )
}

export default Layout