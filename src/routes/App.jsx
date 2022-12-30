import Views from './Views';
import UserContext from '../context/AccountContext';

function App() {

  return (
    <>
    <UserContext>
    <Views></Views>
    </UserContext>
    </>

  );
}

export default App;
