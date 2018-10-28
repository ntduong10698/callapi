import * as types from './../../constatns/Booking/ActionTypes.js';

var initialState= {
	id: "",
	address: "",
	brith_date: "",
	email: "",
	gender: "",
	name:"",
	jhi_password:"",
	phone:""
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