import InvestigationBackground from './InvestigationBackground'
import Navbar from './Navbar'
import Footer from './Footer'

export default function Layout({ children }) {
  return (
    <div className="relative flex min-h-svh flex-col overflow-x-hidden">
      <InvestigationBackground />
      <Navbar />
      <main className="relative z-10 flex-1">{children}</main>
      <Footer />
    </div>
  )
}
