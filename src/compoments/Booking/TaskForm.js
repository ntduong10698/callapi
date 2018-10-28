import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './../../actions/Booking/index';

class TaskForm extends Component {
  constructor(props){
    super(props);
    this.state = {
        id: "",
        note: "",
        customer: "",
        tour: "",
        customer_id: "",
        tour_id:"",
        category_id:"",
        user_id:""
    }
  }
  componentWillMount(){
    if(this.props.itemEditing!==null){
    this.setState({
        id: this.props.itemEditing.id,
        note: this.props.itemEditing.note,
        customer: this.props.itemEditing.customer,
        tour: this.props.itemEditing.tour,
        customer_id: this.props.itemEditing.customer_id,
        tour_id: this.props.itemEditing.tour_id,
        category_id: this.props.itemEditing.category_id,
        user_id: this.props.itemEditing.tour_id,
        });
    }else{
      this.onClear();
    }
  }
  componentWillReceiveProps(nextProps){
    if(nextProps && nextProps.itemEditing){
    this.setState({
        id: nextProps.itemEditing.id,
        note: nextProps.itemEditing.note,
        customer: nextProps.itemEditing.customer,
        tour: nextProps.itemEditing.tour,
        customer_id: nextProps.itemEditing.customer_id,
        tour_id: nextProps.itemEditing.tour_id,
        category_id: nextProps.itemEditing.category_id,
        user_id: nextProps.itemEditing.user_id,
    });
    }else if(nextProps.itemEditing===null){
      this.setState({
        id: "",
        note: "",
        customer: "",
        tour: "",
        customer_id: "",
        tour_id:"",
        category_id:"",
        user_id:""
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
    var {id,note,customer,tour,customer_id,tour_id,category_id,user_id}= this.state;
    var task={id,note,customer,tour,customer_id,tour_id,category_id,user_id};
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
              <h3 className="panel-title">{id!==""?"Cập Nhập Booking":"Thêm Booking"}
                  <span className="fa fa-times-circle text-right"
                    onClick={this.props.onCloseForm}></span>  
              </h3>
            </div>
            <div className="panel-body">
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label>Note:</label>
                  <input type="text" className="form-control" name="note" value={this.state.note}
                    onChange={this.onChange}/>
                </div>
                <div className="form-group">
                  <label>Customer:</label>
                  <input type="text" className="form-control" name="customer" value={this.state.customer}
                    onChange={this.onChange}/>
                </div>
                <div className="form-group">
                  <label>Tour:</label>
                  <input type="text" className="form-control" name="tour" value={this.state.tour}
                    onChange={this.onChange}/>
                </div>
                <div className="form-group">
                  <label>Customer_ID:</label>
                  <input type="text" className="form-control" name="customer_id" value={this.state.customer_id}
                    onChange={this.onChange}/>
                </div>
                <div className="form-group">
                  <label>Tour_ID:</label>
                  <input type="text" className="form-control" name="tour_id" value={this.state.tour_id}
                    onChange={this.onChange}/>
                </div>
                <div className="form-group">
                  <label>Category_ID:</label>
                  <input type="text" className="form-control" name="category_id" value={this.state.category_id}
                    onChange={this.onChange}/>
                </div>
                <div className="form-group">
                  <label>User_ID:</label>
                  <input type="text" className="form-control" name="user_id" value={this.state.user_id}
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
