import { Navigate, Route, Routes } from 'react-router-dom'
import { BaseLayout } from './layouts/BaseLayout'
import { AuthCallbackPage } from './pages/AuthCallbackPage'
import { HomePage } from './pages/HomePage'
import { LeaderboardPage } from './pages/LeaderboardPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { PlayerProfilePage } from './pages/PlayerProfilePage'
import { PlayPage } from './pages/PlayPage'
import { SignInPage } from './pages/SignInPage'
import { AuthProvider } from './providers/AuthProvider'
import { RequireAuth } from './providers/RequireAuth'

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<BaseLayout />}>
          <Route index element={<HomePage />} />
          <Route path="signin" element={<SignInPage />} />
          <Route path="auth-callback" element={<AuthCallbackPage />} />
          <Route path="leaderboard" element={<LeaderboardPage />} />
          <Route path="leaders" element={<Navigate to="/leaderboard" replace />} />
          <Route path="players/:id" element={<PlayerProfilePage />} />
          <Route
            path="play"
            element={
              <RequireAuth>
                <PlayPage />
              </RequireAuth>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </AuthProvider>
  )
}

export default App
