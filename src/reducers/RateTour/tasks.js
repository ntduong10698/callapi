import * as types from './../../constatns/Booking/ActionTypes.js';

var s4 =()=>{
	return Math.floor((1+Math.random())*0x10000).toString(16).substring(1);
}

var randomID=()=>{
	return s4()+s4()+'-'+s4()+'-'+s4()+'-'+
		s4()+'-'+s4()+s4()+s4();
}

var findIndex = (tasks,id)=>{
	var rs= -1;
	tasks.forEach((task,index)=>{
		if(task.id === id){
			rs = index;
		}
	});
	return rs;
}

// var data= JSON.parse(localStorage.getItem('tasks'));
var initialState= [];

var myReducer = (state= initialState, action) =>{
	var id = '';
	var index= -1;
	switch(action.type){
		case types.FETCH_TASKS:
			state = action.tasks;
			return [...state];
		case types.LIST_ALL:
			return state;
		case types.SAVE_TASK:
			var newTask= {
				id: action.task.id,
			    rate: action.task.rate
			};
			if(!newTask.id){
				state.push(newTask);
			}else{
				index= findIndex(state,newTask.id);
				state[index]=newTask;
			}
			localStorage.setItem('tasks', JSON.stringify(state));
			return [...state];
		case types.DELETE_TASK:
			id= action.id;
			index= findIndex(state,id);
			state.splice(index,1);
			return [...state];
		default: 
			return state;
	}
};

export default myReducer;