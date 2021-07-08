import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import './App.css';
import io from 'socket.io-client';
let socket = io.connect('http://localhost:4000');

function App() {
    
    const [state, setState] = useState({ fullName: '', username: '', email: '', password: ''});
    const [log, setLog] = useState([]);

    useEffect(() => {
        socket.on('data', ({fullName, username, email, password}) => {
            setLog([...log], {fullName, username, email, password})
        })
    })

    const changeFullName = (e) => {
        setState({[e.target.fullName]: e.target.value});
    }

    const changeUsername = (e) => {
        setState({[e.target.username]: e.target.value});
    }

    const changeEmail = (e) => {
        setState({[e.target.email]: e.target.value});
    }

    const changePassword = (e) => {
        setState({[e.target.password]: e.target.value});
    }

    const renderLog = () => {
        return log.map(({fullName, username, email, password}, index) => (
            <div key={index}>
                <h3>
                    {fullName}: <span>{username}</span> <span>{email}</span> <span>{password}</span>
                </h3>
            </div>
        ))
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const {fullName, username, email, password} = state;

        const registered = {
            fullName: fullName,
            username: username,
            email: email,
            password: password
        }

        socket.emit('data', { fullName, username, email, password })

        axios.post('http://localhost:4000/app/signup', registered)
            .then(response => console.log(response.data))

        setState({
            fullName: '',
            username: '',
            email: '',
            password: ''
        })
    }

    return (
        <div>
            <div className='container'>
                <div className='form-div'>
                    <form onSubmit={e => onSubmit(e)}>
                        <input type='text'
                        placeholder='Full Name'
                        name="fullName"
                        onChange={e => changeFullName(e)}
                        value={state.fullName}
                        className='form-control form-group'
                        />

                        <input type='text'
                        placeholder='User Name'
                        name="username"
                        onChange={e => changeUsername(e)}
                        value={state.username}
                        className='form-control form-group'
                        />

                        <input type='text'
                        placeholder='E-mail'
                        name="email"
                        onChange={e => changeEmail(e)}
                        value={state.email}
                        className='form-control form-group'
                        />

                        <input type='password'
                        placeholder='Password'
                        name="password"
                        onChange={e => changePassword(e)}
                        value={state.password}
                        className='form-control form-group'
                        />

                        <input type='submit' className='btn btn-danger btn-block' width='100%' value='Submit' />
                    </form>
                    <div className="render-data">
                        <h1>Logs</h1>
                        {renderLog()}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App

// constructor() {
//     super();
//     this.state = {
//         fullName: '',
//         username: '',
//         email: '',
//         password: '',
//         // data: ''
//     }
//     this.changeFullName = this.changeFullName.bind(this);
//     this.changeUsername = this.changeUsername.bind(this);
//     this.changeEmail = this.changeEmail.bind(this);
//     this.changePassword = this.changePassword.bind(this);
//     this.onSubmit = this.onSubmit.bind(this);
// }