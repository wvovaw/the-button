import { Outlet } from 'react-router-dom';
import Navigation from '@/modules/Navigation';

export function BaseLayout() {
  return(
    <>
      <Navigation />
      <main>
        <Outlet />
      </main>
    </>
  )
} 