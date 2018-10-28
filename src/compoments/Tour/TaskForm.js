import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './../../actions/Tour/index';

class TaskForm extends Component {
  constructor(props){
    super(props);
    this.state = {
        id: "",
        free_space: "",
        maximum_people: "",
        name: "",
        price: "",
        status:"",
        vehicle_id:""
    }
  }
  componentWillMount(){
    if(this.props.itemEditing!==null){
    this.setState({
        id: this.props.itemEditing.id,
        free_space: this.props.itemEditing.free_space,
        maximum_people: this.props.itemEditing.maximum_people,
        name: this.props.itemEditing.name,
        price: this.props.itemEditing.price,
        status: this.props.itemEditing.status,
        vehicle_id: this.props.itemEditing.vehicle_id
        });
    }else{
      this.onClear();
    }
  }
  componentWillReceiveProps(nextProps){
    if(nextProps && nextProps.itemEditing){
    this.setState({
        id: nextProps.itemEditing.id,
        free_space: nextProps.itemEditing.free_space,
        maximum_people: nextProps.itemEditing.maximum_people,
        name: nextProps.itemEditing.name,
        price: nextProps.itemEditing.price,
        status: nextProps.itemEditing.status,
        vehicle_id: nextProps.itemEditing.vehicle_id
    });
    }else if(nextProps.itemEditing===null){
      this.setState({
        id: "",
        free_space: "",
        maximum_people: "",
        name: "",
        price: "",
        status:"",
        vehicle_id:""
    });
    }
  }
  onChange =(event)=>{
      var target= event.target;
      var name= target.name;
      var value= target.value;
      this.setState({
        [name]: value
      });
  }
  onSubmit=(event)=>{
    event.preventDefault();
    var {id,free_space,maximum_people,name,price,status,vehicle_id}= this.state;
    var task={id,free_space,maximum_people,name,price,status,vehicle_id}
    this.props.onSave(task);
    this.onClear();
    this.props.onCloseForm()
    }
  onClear=()=>{
    this.setState({
      name: "",
      status: false
    })
  }
  render(){
    if(!this.props.isDisplayForm) return ''; 
    var {id}= this.state;
    return (
      <div className="panel panel-warning">
            <div className="panel-heading">
              <h3 className="panel-title">{id!==""?"Cập Nhập Tour":"Thêm Tour"}
                  <span className="fa fa-times-circle text-right"
                    onClick={this.props.onCloseForm}></span>  
              </h3>
            </div>
            <div className="panel-body">
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label>Free_Space:</label>
                  <input type="text" className="form-control" name="free_space" value={this.state.free_space}
                    onChange={this.onChange}/>
                </div>
                <div className="form-group">
                  <label>Maximum_People:</label>
                  <input type="text" className="form-control" name="maximum_people" value={this.state.maximum_people}
                    onChange={this.onChange}/>
                </div>
                <div className="form-group">
                  <label>Name:</label>
                  <input type="text" className="form-control" name="name" value={this.state.name}
                    onChange={this.onChange}/>
                </div>
                <div className="form-group">
                  <label>Price:</label>
                  <input type="text" className="form-control" name="price" value={this.state.price}
                    onChange={this.onChange}/>
                </div>
                <div className="form-group">
                  <label>Status:</label>
                  <input type="text" className="form-control" name="status" value={this.state.status}
                    onChange={this.onChange}/>
                </div>
                <div className="form-group">
                  <label>Vehicle_ID:</label>
                  <input type="text" className="form-control" name="vehicle_id" value={this.state.vehicle_id}
                    onChange={this.onChange}/>
                </div><br/>
                <button type="submit" className="btn btn-success">
                  <span className="fa fa-plus mr-5"></span>
                  Lưu Lại</button>&nbsp;
                <button type="reset" className="btn btn-danger"
                  onClick={this.onClear}>
                  <span className="fa fa-close mr-5"></span>
                  Hủy Bỏ</button>
              </form>
            </div>
          </div>
    );
  }
}

const mapStateToProps = (state)=>{
  return {
    isDisplayForm: state.isDisplayForm,
    itemEditing: state.itemEditing
  }
};

const mapDispatchToProps= (dispatch,props) => {
  return  {
    onSaveTask: (task) =>{
      dispatch(actions.saveTask(task));
    },
    onCloseForm: () =>{
      dispatch(actions.closeForm());
    },
    onSave : (task) =>{
      dispatch(actions.saveTasksRequest(task));
    },
    fetchAllTasks : () =>{
      dispatch(actions.actFetchTasksRequest());
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(TaskForm);
