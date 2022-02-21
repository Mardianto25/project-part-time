import React, { useEffect, useState } from 'react'
import { Card, Col, Container, Row, Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import './user.css';
import { getlistAlbums, getlistPhoto} from '../../actions/globalAction';
import { useDispatch, useSelector } from 'react-redux';
import GoogleMapReact from "google-map-react";
import MyMarker from "./Maps";
import Loading from '../loading';

function Users() {
  const location = useLocation();
  const dispatch = useDispatch();
  const users  = location.state;
  const {company, address} = users;
  const [active, setActive] = useState(0);
  const {
    getAlbumsResult, 
    getAlbumsLoading, 
    getAlbumsError,
    getPhotoResult,
    getPhotoLoading,
    getPhotoError
  } = useSelector((state) => state.GlobalReducer);
  const [albumsId, setAlbumsId] = useState(1);

  const distanceToMouse = (pt, mp) => {
    if (pt && mp) {
      // return distance between the marker and mouse pointer
      return Math.sqrt(
        (pt.x - mp.x) * (pt.x - mp.x) + (pt.y - mp.y) * (pt.y - mp.y)
      );
    }
  };
  
  useEffect(() => {
    dispatch(getlistAlbums(users.id));
  }, [dispatch, users.id])

  useEffect(() => {    
    dispatch(getlistPhoto(albumsId));
  }, [dispatch, albumsId])

  return (
    <>
      <Container className='my-2'>
        <Row className='d-flex '>
          <Col md={12} xl={12}>
            <Card className='user-card-full'>
              <Row className='m-l-0 m-r-0'>
                <Col sm={4} className='bg-c-lite-green user-profile'>
                    <div className="card-block text-center text-white">
                        <div className="m-b-25"> 
                        <img src={"https://img.icons8.com/bubbles/100/000000/user.png"}  alt="profile" className="img-radius" /> 
                        </div>
                        <h6 className="f-w-600">{users.name}</h6>
                        <p>{company.name}</p> <i className=" mdi mdi-square-edit-outline feather icon-edit m-t-1 f-16"></i>
                        {/* <p>{company.bs}</p> <i className=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i> */}
                    </div>
                </Col>
                <Col sm={8}>
                  <div className='card-block'>
                    <h6 className="m-b-20 p-b-5 b-b-default f-w-600">Contact Person</h6>
                    <Row className='my-2'>
                      <Col sm={6}>
                        <p className="m-b-10 f-w-600">Username</p>
                        <h6 className="text-muted f-w-400">{users.username}</h6>
                      </Col>
                      <Col sm={6}>
                        <p className="m-b-10 f-w-600">Website</p>
                        <h6 className="text-muted f-w-400">{users.website}</h6>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm={6}>
                        <p className="m-b-10 f-w-600">Email</p>
                        <h6 className="text-muted f-w-400">{users.email}</h6>
                      </Col>
                      <Col sm={6}>
                        <p className="m-b-10 f-w-600">Phone</p>
                        <h6 className="text-muted f-w-400">{users.phone}</h6>
                      </Col>
                    </Row>

                  </div>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>  
      </Container>
      <Container>
        <h4 className='mb-2'>Recent Photos</h4>
        <Row>
          <Col sm={12}>
            {/* <Row> */}
            {getAlbumsResult ? (
              getAlbumsResult.map((alb) => {
                  return(
                      // <Col md={2}>
                        <Button variant={`${active === alb.id ? "primary" : "light"}`} key={alb.id} className='m-1' onClick={() => { setAlbumsId(alb.id); setActive(alb.id) }}><span className='maxLimitTitle'>{alb.title}</span></Button>
                      // </Col>
                  )
                
              })
            ): getAlbumsLoading ? (<Loading />) : (<p>{getAlbumsError ? getAlbumsError : "Data Kosong"}</p>)}
            {/* </Row> */}
            <Card className='user-card-full mt-2'>
              <Row className='my-2 mx-1'>
                {getPhotoResult ? (
                  getPhotoResult.map((ph) => {
                    return(
                    <Col lg={3} md={4} sm={6} className='mb-2 pr-lg-1' key={ph.id}>
                      {/* <p>{ph.title}</p> */}
                      <img src={ph.url} alt="" className="img-fluid rounded shadow-sm" />
                    </Col>

                    )
                  })
                ): getPhotoLoading ? (
                  <Loading />
                ) : (<p>{getPhotoError ? getPhotoError : "Data Kosong"}</p>)}
              </Row>
            </Card>
          </Col>
        </Row>
      </Container>
      <Container>
        {/* <h4>Address</h4> */}
        <Row>
          <Col sm={12}>
            <Card className='user-card-full'>
              <Row>
              <Col sm={12}>
                  <div className='card-block'>
                    <h6 className="m-b-20 p-b-5 b-b-default f-w-600">Address</h6>
                    <Row className='my-2'>
                      <Col sm={4}>
                        <p className="m-b-10 f-w-600">City</p>
                        <h6 className="text-muted f-w-400">{address.city}</h6>
                      </Col>
                      <Col sm={4}>
                        <p className="m-b-10 f-w-600">Street</p>
                        <h6 className="text-muted f-w-400">{address.street}</h6>
                      </Col>
                      <Col sm={4}>
                        <p className="m-b-10 f-w-600">Geo Lat</p>
                        <h6 className="text-muted f-w-400">{address.geo.lat}</h6>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm={4}>
                        <p className="m-b-10 f-w-600">Suite</p>
                        <h6 className="text-muted f-w-400">{address.suite}</h6>
                      </Col>
                      <Col sm={4}>
                        <p className="m-b-10 f-w-600">Zip Code</p>
                        <h6 className="text-muted f-w-400">{address.zipcode}</h6>
                      </Col>
                      <Col sm={4}>
                        <p className="m-b-10 f-w-600">Geo Lng</p>
                        <h6 className="text-muted f-w-400">{address.geo.lng}</h6>
                      </Col>
                    </Row>

                  </div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <GoogleMapReact
                    bootstrapURLKeys={{
                      // remove the key if you want to fork
                      // key: "AIzaSyDiKc4HxX5G7EfneIZBN_Hlk2_luoT_yvo",
                      key: process.env.REACT_APP_GOOGLE_API_KEY,
                      language: "en",
                      region: "US"
                    }}
                    defaultCenter={{ lat: 51.506, lng: -0.169 }}
                    defaultZoom={15}
                    distanceToMouse={distanceToMouse}
                  >
                    <MyMarker key={users.id} lat={address.geo.lat} lng={address.geo.lng} text={users.id} tooltip={address.street} />
                  </GoogleMapReact>
                </Col>
              </Row>
            
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Users