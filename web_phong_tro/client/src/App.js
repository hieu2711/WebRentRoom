import {Routes, Route} from 'react-router-dom'
import { Home, Homepage, Login, Rental, DetailPost } from './containers/Public';
import { path } from './utils/constant';

function App() {
  return (
    <div className=' bg-primary'>  
     <Routes>
      <Route path={path.HOME} element={<Home />}>
      <Route path='*' element={<Homepage />} /> {/* nếu route sai thì nó sẽ về home page*/}
      <Route path={path.HOME__PAGE} element={<Homepage />} />
      <Route path={path.LOGIN} element={<Login />}></Route>
      <Route path={path.CHO_THUE_CAN_HO} element={<Rental />} />
      <Route path={path.CHO_THUE_MAT_BANG} element={<Rental />} />
      <Route path={path.CHO_THUE_PHONG_TRO} element={<Rental />} />
      <Route path={path.NHA_CHO_THUE} element={<Rental />} />
      <Route path={path.DETAL_POST__TITLE__POSTID} element={<DetailPost />} />
      <Route path={'chi-tiet/*'} element={<DetailPost />} />
      
      </Route>
      
     </Routes>
    </div>
  );
}

export default App;
