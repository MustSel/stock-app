import Charts from "../components/Charts"
import KPICards from "../components/KPICards"
import useStockRequest from "../services/useStockRequest"
import { useEffect } from "react"

const Home = () => {
  const { getDatas } = useStockRequest()

  useEffect(() => {
    getDatas("sales")
    getDatas("purchases")
  }, [])

  return (
    <div>
      <KPICards />
      <Charts />
    </div>
  )
}

export default Home