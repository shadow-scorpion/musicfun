import { Routing } from '@/common/routing/Routing.tsx';
import { Header } from '@/widgets/Header/Header.tsx';
import s from './App.module.css';
import { ToastContainer } from 'react-toastify';
import { LinearProgress } from '@/common/components/LinearProgress/LinearProgress.tsx';
import { useGlobalLoading } from '@/common/hooks/useGlobalLoading.tsx';

export function App() {
  const isGlobalLoading = useGlobalLoading();

  return (
    <>
      <Header />
      {isGlobalLoading && <LinearProgress />}
      <div className={s.layout}>
        <Routing />
      </div>
      <ToastContainer position={'bottom-left'} theme={'colored'} />
    </>
  );
}
