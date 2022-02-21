import React, { useState } from 'react';
import {Container, Navbar, Nav, Modal, Button, Form, Alert} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addPostsAPI } from '../../../actions/globalAction';
// import {useDispatch} from 'react-redux';

function NavbarTheme() {
    const navigasi = useNavigate();
    const userId = localStorage.getItem('user');
    const dispatch = useDispatch();
    const HomePage = (e) => {
        navigasi('/');
        localStorage.removeItem('user');
    }
    const [show, setShow] = useState(false);
    const [values,setValues] = useState({title:'',body:''});
    const [formerrors, setFormErrors] = useState({});
    const [showMessage, setShowMessage] = useState(false);


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleSubmit = (event) => {
        if(event) event.preventDefault();
        if (validate(values)) {
            let dataParam = {
                userId: parseInt(userId),
                title: values.title,
                body: values.body
            }
            dispatch(addPostsAPI(dataParam));
            setValues({title:'',body:''})
            setShowMessage(true);
        } else {
            setShowMessage(false);
        }
    };
    const clear = () => {
        localStorage.removeItem('user');
        handleClose();
        setShowMessage(false)
        navigasi('/');
    }
    const handleChange = (event) => {
        setValues((values) => ({
          ...values,
          [event.target.name]: event.target.value,
        }));
    };

    const validate = () => {
        let errors = {};
        if (!values.title) {
          errors.title = "Title is required";
        }

        if (!values.body) {
            errors.body = "Content is required";
          }
        setFormErrors(errors);
        if (Object.keys(errors).length === 0) {
          return true;
        } else {
          return false;
        }
    };
    
    return (
        <>
            <Navbar className='bg-c-lite-green' expand="lg">
                <Container>
                    <Navbar.Brand className="text-white" onClick={(e)=> HomePage(e)}>Project Test</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link className="text-white" onClick={(e)=> HomePage(e)}>Home</Nav.Link>
                    </Nav>
                    {userId === "1" ? <button className='btn btn-outline-light' onClick={handleShow}><span >+New Posts</span></button> : null}
                </Container>
            </Navbar>

            <Modal show={show} onHide={handleClose} backdrop="static"
        keyboard={false}>
                {!showMessage ? <Modal.Header closeButton>
                <Modal.Title>New Posts</Modal.Title>
                </Modal.Header> : null}
                <Modal.Body>
                <Alert variant="success" show={showMessage}>
                <Alert.Heading>Hey, nice to see you</Alert.Heading>
                <p>
                    New post data added successfully
                </p>
                {/* <hr />
                <p className="mb-0">
                    Whenever you need to, be sure to use margin utilities to keep things nice
                    and tidy.
                </p> */}
                </Alert>
                {!showMessage ? <Form>
                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label>Title</Form.Label>
                        <Form.Control required type="text" placeholder="Enter title" name="title" value={values.title} onChange={handleChange} />
                        {formerrors.title && (
                            <p className="text-warning">{formerrors.title}</p>
                        )}
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicBody">
                        <Form.Label>Content</Form.Label>
                        <Form.Control required as="textarea" name="body" rows={4} value={values.body} onChange={handleChange}/>
                        {formerrors.body && (
                            <p className="text-warning">{formerrors.body}</p>
                        )}
                    </Form.Group>
                </Form> : null}
                </Modal.Body>
                <Modal.Footer>
                
                {showMessage ? <Button variant="primary" onClick={clear}>
                    Ok
                </Button> : 
                <>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Save Changes
                    </Button>
                </>
                } 
                </Modal.Footer>
            </Modal>
            
        </>
    );
};

export default NavbarTheme;