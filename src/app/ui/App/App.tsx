import { Routing } from '@/common/routing/Routing.tsx';
import { Header } from '@/widgets/Header/Header.tsx';
import s from './App.module.css';
import { ToastContainer } from 'react-toastify';

export function App() {
  return (
    <>
      <Header />
      <div className={s.layout}>
        <Routing />
      </div>
      <ToastContainer position={'bottom-left'} theme={'colored'} />
    </>
  );
}
