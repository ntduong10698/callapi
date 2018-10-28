import * as types from './../../constatns/Booking/ActionTypes.js';

var initialState= {
	id: "",
	container: "",
	name: "",
	status: "",
	vehicle_type_id: ""
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