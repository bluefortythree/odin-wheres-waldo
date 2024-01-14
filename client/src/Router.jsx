import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import App from './App'
import NotFound from './NotFound'
import Leaderboard from './Leaderboard'

const Router = () => {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <App />
        },
        {
            path: '/leaderboard',
            element: <Leaderboard />
        },
        {
            path: '*',
            element: <NotFound />
        }
    ])

    return <RouterProvider router={router} />
}

export default Router