import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './../../actions/Vehicle/index';

class TaskForm extends Component {
  constructor(props){
    super(props);
    this.state = {
        id: "",
        container: "",
        name: "",
        status: "",
        vehicle_type_id: ""
    }
  }
  componentWillMount(){
    if(this.props.itemEditing!==null){
    this.setState({
        id: this.props.itemEditing.id,
        container: this.props.itemEditing.container,
        name: this.props.itemEditing.name,
        status: this.props.itemEditing.status,
        vehicle_type_id: this.props.itemEditing.vehicle_type_id
        });
    }else{
      this.onClear();
    }
  }
  componentWillReceiveProps(nextProps){
    if(nextProps && nextProps.itemEditing){
    this.setState({
        id: nextProps.itemEditing.id,
        container: nextProps.itemEditing.container,
        name: nextProps.itemEditing.name,
        status: nextProps.itemEditing.status,
        vehicle_type_id: nextProps.itemEditing.vehicle_type_id
    });
    }else if(nextProps.itemEditing===null){
      this.setState({
        id: "",
        container: "",
        name: "",
        status: "",
        vehicle_type_id: ""
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
    var {id,container,name,status,vehicle_type_id}= this.state;
    var task={id,container,name,status,vehicle_type_id};
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
              <h3 className="panel-title">{id!==""?"Cập Nhập Vehicle":"Thêm Vehicle"}
                  <span className="fa fa-times-circle text-right"
                    onClick={this.props.onCloseForm}></span>  
              </h3>
            </div>
            <div className="panel-body">
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label>Container:</label>
                  <input type="text" className="form-control" name="container" value={this.state.container}
                    onChange={this.onChange}/>
                </div>
                <div className="form-group">
                  <label>name:</label>
                  <input type="text" className="form-control" name="name" value={this.state.name}
                    onChange={this.onChange}/>
                </div>
                <div className="form-group">
                  <label>Status:</label>
                  <input type="text" className="form-control" name="status" value={this.state.status}
                    onChange={this.onChange}/>
                </div>
                <div className="form-group">
                  <label>Vehicle_Type_ID:</label>
                  <input type="text" className="form-control" name="vehicle_type_id" value={this.state.vehicle_type_id}
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
