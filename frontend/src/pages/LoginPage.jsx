import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();

    const handleSubmit = (e) => {
        e.preventDefault();
        login(email, password);
    };

    return (
        <div className="container" style={{ maxWidth: '400px' }}>
            <h1>Welcome Back</h1>
            <p className="subtitle">Please enter your details to sign in.</p>
            
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input
                        id="email"
                        type="email"
                        className="form-input"
                        placeholder=" " 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} 
                        required
                    />
                    <label htmlFor="email" className="form-label">Email</label>
                </div>

                <div className="form-group">
                    <input
                        id="password"
                        type="password"
                        className="form-input"
                        placeholder=" "
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <label htmlFor="password" className="form-label">Password</label>
                </div>
                
                
                <button type="submit" className="btn btn-primary">Sign In</button>
            </form>
        </div>
    );
}

export default LoginPage;