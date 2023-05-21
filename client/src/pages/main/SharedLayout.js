import { Outlet, Link } from "react-router-dom"
import Wrapper from "../../assets/wrappers/SharedLayout"

const SharedLayout = () => {
  return <Wrapper>
    <nav>
      <Link to="add-adv">add adv</Link>
      <Link to="all-advs">all advs</Link>
      </nav>
      <Outlet />
  </Wrapper>
}

export default SharedLayout