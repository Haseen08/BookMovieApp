import React, { useEffect, useState } from 'react';
import './Header.css';
import logo from '../../assets/logo.svg';

import Button from '@material-ui/core/Button';

import Modal from 'react-modal';
import { Grid, Tab, Tabs } from '@material-ui/core';
import Login from '../login/Login';
import Signup from '../signup/Signup';

const Header = () => {
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [value, setValue] = React.useState('1');
    const [bookShow, setBookShow] = useState(false);

    const queryParams = window.location.pathname;

    const matches = queryParams.match('/movie/*')

    useEffect(() => {
        if (matches !== null && matches.length) {
            setBookShow(true)
        }
    }, [matches])



    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        console.log('==opened===')
    }

    function closeModal() {
        setIsOpen(false);
    }

    const login = () => {
        setIsOpen(true);
    }

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            transform: 'translate(-50%, -50%)',
        },
    };
    return (
        <div className="header" >
            <Grid container justifyContent="flex-end">
                <Grid xs={10}>
                    <img src={logo} className='logo' alt='logo'></img>
                </Grid>
                <Grid xs={1}>
                    {bookShow ?
                        <Button variant="contained" onClick={login} color='primary'>
                            BOOKSHOW
                        </Button> :
                        null
                    }
                </Grid>
                <Grid  >
                    <Button variant="contained" onClick={login}>
                        LOGIN
                    </Button>

                </Grid>
            </Grid>

            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <Tabs
                    value={value}
                    onChange={handleChange}
                    textColor="secondary"
                    indicatorColor="secondary"
                    aria-label="secondary tabs example"
                >
                    <Tab value="1" label="LOGIN" />
                    <Tab value="2" label="REGISTER" />
                </Tabs>
                <TabPane1 value={value} index={1} setIsOpen={setIsOpen}>Login</TabPane1>
                <TabPane1 value={value} index={2} setIsOpen={setIsOpen}>Signup</TabPane1>
            </Modal>
        </div>

    )
}

const TabPane1 = (props) => {
    const { children, value, index } = props;
    return (
        <div>
            {value === index.toString() && (children == 'Login' ? <Login {...props} /> : <Signup {...props} />)}
        </div>
    )
}

export default Header;
