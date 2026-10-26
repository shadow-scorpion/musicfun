import { Routing } from '@/common/routing/Routing.tsx';
import { Header } from '@/widgets/Header/Header.tsx';
import s from './App.module.css';
import { ToastContainer } from 'react-toastify';
import { LinearProgress } from '@/common/components/LinearProgress/LinearProgress.tsx';
import { useGlobalLoading } from '@/common/hooks/useGlobalLoading.tsx';
import { Sidebar } from '@/widgets/Sidebar/Sidebar.tsx';

export function App() {
  const isGlobalLoading = useGlobalLoading();

  return (
    <div className={s.appLayout}>
      <Header />
      {isGlobalLoading && <LinearProgress />}
      <div className={s.mainLayout}>
        <Sidebar />
        <div className={`container ${s.mainContent}`}>
          <Routing />
        </div>
      </div>
      <ToastContainer position={'bottom-left'} theme={'colored'} />
    </div>
  );
}
