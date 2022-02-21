import { 
    GET_LIST_DATA, 
    GET_LIST_USER, 
    GET_POST_PER_ID, 
    GET_USER_PER_ID, 
    GET_LIST_COMMENT, 
    ADD_COMMENT, 
    ADD_POSTS, 
    GET_LIST_ALBUMS, 
    GET_LIST_PHOTO } from '../../actions/globalAction'

const initialState = {
    getDataResult: false,
    getDataLoading: false,
    getDataError: false,

    getUserResult: false,
    getUserLoading: false,
    getUserError: false,

    getPerIDResult: false,
    getPerIDLoading: false,
    getPerIDError: false,

    getUserPerIDResult: false,
    getUserPerIDLoading: false,
    getUserPerIDError: false,

    getCommentResult: false,
    getCommentLoading: false,
    getCommentError: false,

    addCommentResult: false,
    addCommentLoading: false,
    addCommentError: false,

    addPostsResult: false,
    addPostsLoading: false,
    addPostsError: false,

    getAlbumsResult: false,
    getAlbumsLoading: false,
    getAlbumsError: false,
}

const global = (state = initialState, action) => {
    switch (action.type) {
        case GET_LIST_DATA:
            return{
                ...state,
                getDataResult: action.payload.data,
                getDataLoading: action.payload.loading,
                getDataError: action.payload.errorMessage
            }
        case GET_LIST_USER:
            return{
                ...state,
                getUserResult: action.payload.data,
                getUserLoading: action.payload.loading,
                getUserError: action.payload.errorMessage
            }
        case GET_POST_PER_ID:
            return{
                ...state,
                getPerIDResult: action.payload.data,
                getPerIDLoading: action.payload.loading,
                getPerIDError: action.payload.errorMessage
            }
        case GET_USER_PER_ID:
            return{
                ...state,
                getUserPerIDResult: action.payload.data,
                getUserPerIDLoading: action.payload.loading,
                getUserPerIDError: action.payload.errorMessage
            }
        case GET_LIST_COMMENT:
            return{
                ...state,
                getCommentResult: action.payload.data,
                getCommentLoading: action.payload.loading,
                getCommentError: action.payload.errorMessage
            }
        case ADD_COMMENT:
            return{
                ...state,
                addCommentResult: action.payload.data,
                addCommentLoading: action.payload.loading,
                addCommentError: action.payload.errorMessage
            }
        case ADD_POSTS:
            return{
                ...state,
                addPostsResult: action.payload.data,
                addPostsLoading: action.payload.loading,
                addPostsError: action.payload.errorMessage
            }
        case GET_LIST_ALBUMS:
            return{
                ...state,
                getAlbumsResult: action.payload.data,
                getAlbumsLoading: action.payload.loading,
                getAlbumsError: action.payload.errorMessage
            }
        case GET_LIST_PHOTO:
            return{
                ...state,
                getPhotoResult: action.payload.data,
                getPhotoLoading: action.payload.loading,
                getPhotoError: action.payload.errorMessage
            }
        default:
            return state;
    }
}

export default global;