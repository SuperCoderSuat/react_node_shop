import AddProduct from '../../components/addproduct/AddProduct';
import ListProduct from '../../components/listproduct/ListProduct';
import Sidebar from '../../components/sidebar/Sidebar';
import './Admin.scss'
import { Routes, Route } from 'react-router-dom';

const Admin = () => {
    return (
        <div className="admin">
            <Sidebar />
            <Routes>
                <Route path='/addproduct' element={<AddProduct />}/>
                <Route path='/listproduct' element={<ListProduct />}/>
            </Routes>
        </div>
    );
}
 
export default Admin;