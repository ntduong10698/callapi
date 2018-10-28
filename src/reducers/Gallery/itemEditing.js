import * as types from './../../constatns/Booking/ActionTypes.js';

var initialState= {
	id: "",
	picture: "",
	picture_content_type: "",
	location_id: ""
};

var myReducer = (state= initialState, action) =>{
	switch(action.type){
		case types.EDIT_TASK:
			return action.task;	
		default: 
			return state;
	}
};

export default myReducer;