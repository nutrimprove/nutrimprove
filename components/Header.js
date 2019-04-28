import Link from 'next/link'

const linkStyle = {
    marginRight: 15,
    verticalAlign: 'middle',
};

const logo = {
    marginRight: 15,
    textDecoration: 'none',
    fontSize: 20,
    fontWeight: 'bold',
    height: 50,
    width: 50,
    padding: 20
};

const Header = () => (
    <div id='header'>
        <div id="logo">
            <Link href='/'>
                <img style={logo} src='/images/apple_1280.png'/>
            </Link>
        </div>
        <div id='nav'>
            <Link href='/'>
                <a style={linkStyle}>Home</a>
            </Link>
            <Link href='/about'>
                <a style={linkStyle}>About</a>
            </Link>

        </div>
    </div>
);

export default Header