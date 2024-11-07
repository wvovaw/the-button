import Navbar from '@/components/Navbar'
import { Outlet } from 'react-router-dom'

export function BaseLayout() {
  return (
    <>
      <Navbar />
      <main className="container mt-4">
        <Outlet />
      </main>
    </>
  )
}
