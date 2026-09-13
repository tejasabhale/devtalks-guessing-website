import InvestigationBackground from './InvestigationBackground'
import Navbar from './Navbar'
import Footer from './Footer'
import SplashLoader from './SplashLoader'
import { useDocumentVisible } from '../../hooks/useDocumentVisible'

export default function Layout({ children }) {
  useDocumentVisible()

  return (
    <div className="relative flex min-h-svh flex-col overflow-x-hidden">
      <SplashLoader />
      <InvestigationBackground />
      <Navbar />
      <main className="relative z-10 flex-1">{children}</main>
      <Footer />
    </div>
  )
}
