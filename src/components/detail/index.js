
import React, { useEffect, useState } from 'react'
import { Card, Col, Container, Row, Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { getlistPerID, getlistComment, addCommentAPI} from '../../actions/globalAction';
import Loading from '../loading';

function DetailPage() {
    const { postId } = useParams();
    const location = useLocation();
    const dataParams = location.state;
    const navigasi = useNavigate();
    const {
        getUserPerIDResult, 
        getCommentResult, 
        getCommentLoading, 
        getCommentError, 
        addCommentResult, 
        addCommentLoading, 
        addCommentError } = useSelector((state) => state.GlobalReducer);
    const dispatch = useDispatch();
    const [display, setDisplay] = useState(false);
    const [values,setValues] = useState({name:'',email:'', content:''});
    const [formerrors, setFormErrors] = useState({});

    const handleSubmit = (event) => { 
        if (event) event.preventDefault();
        if (validate(values)) {
            let dataParam = {
                postsId: postId,
                name: values.name,
                email: values.email,
                body: values.content
            }
            dispatch(addCommentAPI(dataParam));
            // setShowMessage(true);
            setValues({name:'', email:'', body:''})
        } else {
            // setShowMessage(false);
        }
    };
    
    const handleChange = (event) => {
        setValues((values) => ({
          ...values,
          [event.target.name]: event.target.value,
        }));
    };

    const validate = () => {
        let errors = {};
        //name field
        if (!values.name) {
          errors.name = "Name is required";
        }

        if (!values.content) {
            errors.content = "Content is required";
          }
        //email field
        if (!values.email) {
          errors.email = "Email address is required";
        } else if (!/\S+@\S+\.\S+/.test(values.email)) {
          errors.email = "Email address is invalid";
        }
        setFormErrors(errors);
        if (Object.keys(errors).length === 0) {
          return true;
        } else {
          return false;
        }
    };
    const addComment = () => {
        setDisplay(true);
    };
    useEffect(() => {    
       if(addCommentResult){
            setDisplay(false);
            // dispatch(getlistComment(postId))
       }
    }, [addCommentResult])

    useEffect(() => {    
    //   dispatch(getlistPerID("posts", postId));
      dispatch(getlistPerID("users", dataParams.userId));
      dispatch(getlistComment(postId));
    }, [dispatch, dataParams.userId, postId])
    

    return (
        <>
            {/* {getPerIDResult ? ( */}
                    <Container className='my-5'>
                        <Row>
                            <Col md={8}>
                                <img className='img-fluid' src={`https://picsum.photos/750/500?random=${dataParams.id}`} alt='img' />
                            </Col>
                            <Col md={4}>
                                <h3 className='my-3'>{dataParams.title}</h3>
                                <p>{dataParams.body}</p>
                                <Row className='mt-5'>
                                    <Col>
                                        <Card className='text-center'>
                                            <Card.Header>
                                                Hire The Author
                                            </Card.Header>
                                            <Card.Body>
                                                <Card.Title>{getUserPerIDResult.name}</Card.Title>
                                                <Card.Text>
                                                    {getUserPerIDResult.email}
                                                </Card.Text>
                                                <Card.Text>
                                                    {getUserPerIDResult.website}
                                                </Card.Text>
                                                <Button className='btn bg-c-lite-green' style={{border:"none"}} onClick={()=> navigasi(`/users/${getUserPerIDResult.id}`, {state: getUserPerIDResult})}>View Profile</Button>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row className='mt-5'>
                            <Col>
                                {!display ? <Button className="btn btn-success float-end" onClick={()=> addComment()}>+ Add Comments</Button> : ""}
                                <h2>Comments</h2>
                                <hr />
                                {!display ? "" : (
                                    <>
                                    
                                    <Row >
                                        <Col md={{ span: 6, offset: 3 }}>
                                            <Form>
                                                <Form.Group className="mb-3" controlId="formBasicName">
                                                    <Form.Label>Name</Form.Label>
                                                    <Form.Control required type="text" name="name" placeholder="Enter name" value={values.name} onChange={handleChange} />
                                                    {formerrors.name && (
                                                        <p className="text-warning">{formerrors.name}</p>
                                                    )}
                                                </Form.Group>

                                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                                    <Form.Label>Email address</Form.Label>
                                                    <Form.Control required type="email" name="email" placeholder="Enter email" value={values.email} onChange={handleChange} />
                                                    <Form.Text className="text-muted">
                                                    We'll never share your email with anyone else.
                                                    </Form.Text>
                                                    {formerrors.email && (
                                                    <p className="text-warning">{formerrors.email}</p>
                                                    )}
                                                </Form.Group>

                                                <Form.Group className="mb-3" controlId="formBasicBody">
                                                    <Form.Label>Comment</Form.Label>
                                                    <Form.Control required as="textarea" name="content" rows={4} value={values.content} onChange={handleChange}/>
                                                    {formerrors.content && (
                                                            <p className="text-warning">{formerrors.content}</p>
                                                        )}
                                                </Form.Group>
                                            
                                                <Button variant="primary" className="mx-1" type="button" onClick={handleSubmit}>
                                                    Submit
                                                </Button>
                                                <Button variant="danger" type="button" onClick={(e) => setDisplay(false)}>
                                                    Cancel
                                                </Button>
                                            </Form>
                                        
                                        </Col>
                                    </Row>
                                    
                                    </>
                                )}
                                
                                <div className="list-group list-group-flush">
                                {addCommentResult ? (postId === addCommentResult.postsId ? <div className="list-group-item list-group-item-action d-flex my-2  align-items-center">
                                            <div className="image-parent">
                                                <img src="https://img.icons8.com/external-bearicons-glyph-bearicons/64/000000/external-User-essential-collection-bearicons-glyph-bearicons.png" className="img-fluid" alt="quixote" />
                                            </div>
                                            
                                            <div className="flex-column mx-5">
                                                <h3>{addCommentResult.name}</h3>
                                                <p><small>{addCommentResult.body}</small></p>
                                                <button className='btn btn-primary'>{addCommentResult.email}</button>
                                                {/* <span className="badge badge-primary" style={{color:"black !important"}}>{cmt.email}</span> */}
                                            </div>
                                        </div>: ""): addCommentLoading ? (<Loading />): addCommentError ? addCommentError : ""}
                                {
                                    // getCommentResult.length == 0 ? (
                                    // <Alert variant="info">
                                    //    <span className='text-center'>no data available</span>
                                    // </Alert> ) : 
                                    getCommentResult ? (getCommentResult.map((cmt) => {
                                  return (
                                      
                                        <div key={cmt.id} className="list-group-item list-group-item-action d-flex my-2  align-items-center">
                                            <div className="image-parent">
                                                <img src="https://img.icons8.com/external-bearicons-glyph-bearicons/64/000000/external-User-essential-collection-bearicons-glyph-bearicons.png" className="img-fluid" alt="quixote" />
                                            </div>
                                            
                                            <div className="flex-column mx-5">
                                                <h3>{cmt.name}</h3>
                                                <p><small>{cmt.body}</small></p>
                                                <button className='btn btn-outline-primary' style={{cursor:'default'}}>{cmt.email}</button>
                                                {/* <span className="badge badge-primary" style={{color:"black !important"}}>{cmt.email}</span> */}
                                            </div>
                                        </div>
                                        
                                      
                                  )  
                                })): getCommentLoading ? (
                                    <Loading />
                                ): (getCommentError ? getCommentError : <p>Data Kosong</p>)}
                                </div>
                            </Col>
                        </Row>
                        
                </Container>
            {/* ): getPerIDLoading ? (
                <Loading />
            ): (<p>{getPerIDError ? getPerIDError : "Data Kosong"}</p>)} */}
        </>
    )
}

export default DetailPage