/* @refresh reload */
import { render } from 'solid-js/web';

import './index.css';
import './styles/Btn.css';
import './styles/TextFiled.css';
import './styles/SelectType.css';
import './styles/Skeleton.css';
import './styles/Image.css';
import App from './App';
import { ConfigProvider } from './ConfigProvider';
import { MyToast } from './components/Toast';

const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?',
  );
}

render(() =>       <ConfigProvider><App /><MyToast/></ConfigProvider>, root!);
