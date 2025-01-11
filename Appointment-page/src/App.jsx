import { createBrowserRouter } from 'react-router-dom';
import LogInLayout from '@layout/Layout';
import LogInCard from '@custom/LogInCard';
import ProfileForm from '@custom/RegisterForm';
import LayoutHome from '@layout/LayoutHome';
import Dashboard from '@custom/Dashboard';
import UserData from '@custom/UserData';

const App = createBrowserRouter([
  {
    path: '/',
    element: <LogInLayout />,
    children: [
      {
        index: true,
        element: <LogInCard />
      },
      {
        path: 'register',
        element: <ProfileForm />
      }
    ]
  },
  {
    path: '/home',
    element: <LayoutHome />,
    children: [
      {
        index: true,
        element: <Dashboard />
      },
      {
        path: 'patients',
        element: <UserData />
      }
    ]
  }
])

export default App;