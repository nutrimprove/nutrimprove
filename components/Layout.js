import Header from './Header'

const layoutStyle = {
    margin: 20,
    padding: 20,
    border: '1px solid #DDD',
    minWidth: 800,
};

const Layout = props => (
    <div style={layoutStyle}>
        <Header />
        {props.children}
    </div>
);

export default Layout