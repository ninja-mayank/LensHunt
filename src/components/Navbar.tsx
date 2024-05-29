import'./Navbar.css'
const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-left">
                <h1 className='name'>LensHunter</h1>
            </div>
            <div className="navbar-right">
                <button className="nav-button">Home</button>
            </div>
        </nav>
    );
};
export default Navbar;
