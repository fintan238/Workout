import 'react-native-gesture-handler';
import Wrapper from './src/Navigation/Navigation';
import { Provider } from 'react-redux';
import { store } from './src/app/store';

export default function App() {
  return (
    <Provider store={store}>
      <Wrapper />
    </Provider>
  );
}
