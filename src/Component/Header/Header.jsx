import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div>
            <nav className='text-center'>
                <Link className='me-3' to='/'>Home</Link>
                <Link className='me-3' to='/register'>Register</Link>
                <Link to='/login'>Login</Link>
            </nav>
        </div>
    );
};

export default Header;