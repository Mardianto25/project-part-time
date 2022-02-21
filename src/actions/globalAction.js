import axios from 'axios';

export const GET_LIST_DATA = "GET_LIST_DATA";
export const GET_LIST_USER = "GET_LIST_USER";
export const GET_LIST_COMMENT = "GET_LIST_COMMENT";
export const GET_POST_PER_ID = "GET_PER_ID";
export const GET_USER_PER_ID = "GET_USER_PER_ID";
export const ADD_COMMENT = "ADD_COMMENT";
export const ADD_POSTS = "ADD_POSTS";
export const GET_LIST_ALBUMS = "GET_LIST_ALBUMS";
export const GET_LIST_PHOTO = "GET_LIST_PHOTO";

export const getlistData = () => {
    return (dispatch) => {
        dispatch({
            type: GET_LIST_DATA,
            payload: {
                loading: true,
                data: false,
                user: false,
                errorMessage: false
            }
        });

        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API_URL}/posts`,
            timeout:120000
        })
            .then((response) => {
                dispatch({
                    type: GET_LIST_DATA,
                    payload: {
                        loading: false,
                        data: response.data,
                        user: false,
                        errorMessage: false
                    }
                });
            })
            
            .catch((error) => {
                dispatch({
                    type: GET_LIST_DATA,
                    payload: {
                        loading: false,
                        data: false,
                        errorMessage: error.message
                    }
                });
            })

    }
}

export const getlistUser = () => {
    return (dispatch) => {
        dispatch({
            type: GET_LIST_USER,
            payload: {
                loading: true,
                data: false,
                errorMessage: false
            }
        });

        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API_URL}/users`,
            timeout:120000
        })
            .then((response) => {
                dispatch({
                    type: GET_LIST_USER,
                    payload: {
                        loading: false,
                        data: response.data,
                        errorMessage: false
                    }
                });
            })
            
            .catch((error) => {
                dispatch({
                    type: GET_LIST_USER,
                    payload: {
                        loading: false,
                        data: false,
                        errorMessage: error.message
                    }
                });
            })

    }
}

export const getlistPerID = (param,id) => {
    return (dispatch) => {
        dispatch({
            type: param === "posts" ? GET_POST_PER_ID : GET_USER_PER_ID,
            payload: {
                loading: true,
                data: false,
                errorMessage: false
            }
        });

        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API_URL}/${param}/${id}`,
            timeout:120000
        })
            .then((response) => {
                dispatch({
                    type: param === "posts" ? GET_POST_PER_ID : GET_USER_PER_ID,
                    payload: {
                        loading: false,
                        data: response.data,
                        errorMessage: false
                    }
                });
            })
            
            .catch((error) => {
                dispatch({
                    type: param === "posts" ? GET_POST_PER_ID : GET_USER_PER_ID,
                    payload: {
                        loading: false,
                        data: false,
                        errorMessage: error.message
                    }
                });
            })

    }
}

export const getlistComment = (postId) => {
    return (dispatch) => {
        dispatch({
            type: GET_LIST_COMMENT,
            payload: {
                loading: true,
                data: false,
                errorMessage: false
            }
        });

        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API_URL}/posts/${postId}/comments`,
            timeout:120000
        })
            .then((response) => {
                dispatch({
                    type: GET_LIST_COMMENT,
                    payload: {
                        loading: false,
                        data: response.data,
                        errorMessage: false
                    }
                });
            })
            
            .catch((error) => {
                dispatch({
                    type: GET_LIST_COMMENT,
                    payload: {
                        loading: false,
                        data: false,
                        errorMessage: error.message
                    }
                });
            })

    }
}

export const getlistAlbums = (usersId) => {
    return (dispatch) => {
        dispatch({
            type: GET_LIST_ALBUMS,
            payload: {
                loading: true,
                data: false,
                errorMessage: false
            }
        });

        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API_URL}/albums?userId=${usersId}`,
            timeout:120000
        })
            .then((response) => {

                dispatch({
                    type: GET_LIST_ALBUMS,
                    payload: {
                        loading: false,
                        data: response.data,
                        errorMessage: false
                    }
                });
            })
            
            .catch((error) => {
                dispatch({
                    type: GET_LIST_ALBUMS,
                    payload: {
                        loading: false,
                        data: false,
                        errorMessage: error.message
                    }
                });
            })

    }
}

export const getlistPhoto = (albumsId) => {
    return (dispatch) => {
        dispatch({
            type: GET_LIST_PHOTO,
            payload: {
                loading: true,
                data: false,
                errorMessage: false
            }
        });

        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API_URL}/photos?albumId=${albumsId}`,
            timeout:120000
        })
            .then((response) => {
                const pictures = response.data.slice(0, 8);
                dispatch({
                    type: GET_LIST_PHOTO,
                    payload: {
                        loading: false,
                        data: pictures,
                        errorMessage: false
                    }
                });
            })
            
            .catch((error) => {
                dispatch({
                    type: GET_LIST_PHOTO,
                    payload: {
                        loading: false,
                        data: false,
                        errorMessage: error.message
                    }
                });
            })

    }
}

export const addPostsAPI = (data) => {
    return (dispatch) => {
        dispatch({
            type: ADD_POSTS,
            payload: {
                loading: true,
                data: false,
                errorMessage: false
            }
        });
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_API_URL}/posts`,
            data: data,
            timeout:120000
        })
            .then((response) => {
                // getlistComment(data.postId);
                localStorage.setItem("new_posts", JSON.stringify(response.data));
                dispatch({
                    type: ADD_POSTS,
                    payload: {
                        loading: false,
                        data: response.data,
                        errorMessage: false
                    }
                });
            })
            
            .catch((error) => {
                dispatch({
                    type: ADD_POSTS,
                    payload: {
                        loading: false,
                        data: false,
                        errorMessage: error.message
                    }
                });
            })

    }
}

export const addCommentAPI = (data) => {
    return (dispatch) => {
        dispatch({
            type: ADD_COMMENT,
            payload: {
                loading: true,
                data: false,
                errorMessage: false
            }
        });
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_API_URL}/comments`,
            data: data,
            timeout:120000
        })
            .then((response) => {
                // getlistComment(data.postId);
                dispatch({
                    type: ADD_COMMENT,
                    payload: {
                        loading: false,
                        data: response.data,
                        errorMessage: false
                    }
                });
            })
            
            .catch((error) => {
                dispatch({
                    type: ADD_COMMENT,
                    payload: {
                        loading: false,
                        data: false,
                        errorMessage: error.message
                    }
                });
            })

    }
}

