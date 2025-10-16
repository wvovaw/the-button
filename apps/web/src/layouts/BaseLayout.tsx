import { Outlet } from 'react-router-dom'
import Navbar from '@/components/Navbar'

export function BaseLayout() {
  return (
    <>
      <Navbar />
      <main className="container mx-auto mt-4">
        <Outlet />
      </main>
    </>
  )
}
