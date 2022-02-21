import React, { useEffect } from 'react'
import { getlistData, getlistUser } from '../../actions/globalAction';
import { useDispatch, useSelector } from "react-redux";
import { Card, Col, Row, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import Loading from '../loading';


function Home() {
  const { getDataResult, getDataLoading, getDataError, getUserResult } = useSelector((state) => state.GlobalReducer)
  const dispatch = useDispatch();
  const navigasi = useNavigate();
  const dataNew = JSON.parse(localStorage.getItem("new_posts"));

  useEffect(() => {
      dispatch(getlistData());
      dispatch(getlistUser());
      localStorage.removeItem("user");
  }, [dispatch])

  const detailPage = (userId,postId, title, body) =>{
    localStorage.setItem("user", userId);
    navigasi(`/detail/${postId}`, {state: { id:postId, userId:userId, title:title, body:body}});
  }
  return (
    <>
      <Row className='mt-2'>
        {dataNew ? (
          <Col md={3} key={dataNew.id} >
          <Card className='my-2 text-center'>
            <Card.Img variant="top" src={`https://picsum.photos/200/200?random=${dataNew.id}`} />
            <Card.Body>
              <Card.Title className='text-center maxLimitTitle'>{dataNew.title}</Card.Title>
              <Card.Text className='text-start maxLimit'>{dataNew.body}</Card.Text>
              <Button  className='text-center btn bg-c-lite-green'  style={{border:'none'}} onClick={(e) => detailPage(dataNew.userId, dataNew.id, dataNew.title,dataNew.body)}>View</Button>
              
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">Leanne Graham</small>
              </Card.Footer>
          </Card>
          </Col>
        ):null}
        {getDataResult ? (
          getDataResult.map((res) => {
            // var cekData = false;
            // if(res.userId === 1){
            //   cekData = true;
            // }
            return (
                <Col md={3} key={res.id} >
                  <Card className='my-2 text-center'>
                    <Card.Img variant="top" src={`https://picsum.photos/200/200?random=${res.id}`} alt='img'/>
                    <Card.Body>
                      <Card.Title className='text-center maxLimitTitle'>{res.title}</Card.Title>
                      <Card.Text className='text-start maxLimit'>{res.body}</Card.Text>
                      <Button className='text-center btn bg-c-lite-green' style={{border:'none'}} onClick={(e) => detailPage(res.userId, res.id, res.title, res.body)}>View</Button>
                      {/* {cekData ? <Button className='text-center btn btn-primary mx-2'>Add</Button>: ""} */}
                      
                      </Card.Body>
                      {getUserResult && (getUserResult.map((user) => {
                        if(user.id === res.userId){
                          return(
                            <div key={user.id}>
                              <Card.Footer>
                                <small className="text-muted">{user.name}</small>
                                {/* <Card.Text>{user.name}</Card.Text> */}
                              </Card.Footer>
                            </div>
                          )
                        }else{
                          return null
                        }
                      }))}
                   
                    
                  </Card>
                  
                </Col>
            )
          })
        ): getDataLoading ? (
            <Loading />
        ): ( <p>{getDataError ? getDataError : "Data Kosong"}</p>)}
      </Row>
      
    </>
  )
}

export default Home