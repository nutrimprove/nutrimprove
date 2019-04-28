import Layout from '../components/Layout';
import NavBar from "../components/NavBar";

const layoutStyle = {
    margin: 20,
    padding: 20,
    border: '1px solid #DDD',
    minWidth: 800,
};

const Index = (props) => (
    <div id='app' style={layoutStyle}>
        <Layout/>
        <NavBar/>
    </div>
);

export default Index;
