import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './../../actions/Gallery/index';

class TaskForm extends Component {
  constructor(props){
    super(props);
    this.state = {
        id: "",
        picture: "",
        picture_content_type: "",
        location_id: ""
    }
  }
  componentWillMount(){
    if(this.props.itemEditing!==null){
    this.setState({
        id: this.props.itemEditing.id,
        picture: this.props.itemEditing.picture,
        picture_content_type: this.props.itemEditing.picture_content_type,
        location_id: this.props.itemEditing.location_id
        });
    }else{
      this.onClear();
    }
  }
  componentWillReceiveProps(nextProps){
    if(nextProps && nextProps.itemEditing){
    this.setState({
        id: nextProps.itemEditing.id,
        picture: nextProps.itemEditing.picture,
        picture_content_type: nextProps.itemEditing.picture_content_type,
        location_id: nextProps.itemEditing.location_id
    });
    }else if(nextProps.itemEditing===null){
      this.setState({
        id: "",
        picture: "",
        picture_content_type: "",
        location_id: ""
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
    var {id,picture,picture_content_type,location_id}= this.state;
    var task={id,picture,picture_content_type,location_id}
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
              <h3 className="panel-title">{id!==""?"Cập Nhập Gallery":"Thêm Gallery"}
                  <span className="fa fa-times-circle text-right"
                    onClick={this.props.onCloseForm}></span>  
              </h3>
            </div>
            <div className="panel-body">
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label>Picture:</label>
                  <input type="text" className="form-control" name="picture" value={this.state.picture}
                    onChange={this.onChange}/>
                </div>
                <div className="form-group">
                  <label>Picture_Content_Type:</label>
                  <input type="text" className="form-control" name="picture_content_type" value={this.state.picture_content_type}
                    onChange={this.onChange}/>
                </div>
                <div className="form-group">
                  <label>Location_id:</label>
                  <input type="text" className="form-control" name="location_id" value={this.state.location_id}
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
