import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';

const menus= [
  {
    name: 'Booking',
    to: '/Booking',
    exact: false
  },
  {
    name: 'Comment',
    to: '/Comment',
    exact: false
  },
  {
    name: 'Customer',
    to: '/Customer',
    exact: false
  },
  {
    name: 'Gallery',
    to: '/Gallery',
    exact: false
  },
  {
    name: 'Hotel',
    to: '/Hotel',
    exact: false
  },
  {
    name: 'Location',
    to: '/Location',
    exact: false
  },
  {
    name: 'Provider',
    to: '/Provider',
    exact: false
  },
  {
    name: 'Rate-Tour',
    to: '/RateTour',
    exact: false
  },
  {
    name: 'Ticket',
    to: '/Ticket',
    exact: false
  },
  {
    name: 'Tour',
    to: '/Tour',
    exact: false
  },
  {
    name: 'Vehicle',
    to: '/Vehicle',
    exact: false
  },
  {
    name: 'Vehicle-Type',
    to: '/VehicleType',
    exact: false
  }
];

const MenuLink= ({label, to ,activeOnlyWhenExact}) =>{
  return(
    <Route 
      path={to}
      exact={activeOnlyWhenExact}
      children={(match)=>{
        var active = match ? 'active' : '';
        return (
          <li className= {active}>
              <Link to={to}>
                {label}
              </Link>
          </li>
        );
      }}
    />
  );
};

class Header extends Component {

  render(){
    return (
      <div>
        <nav className="navbar navbar-default">
          <a className="navbar-brand" href="/">CALL API</a>
          <ul className="nav navbar-nav">
            {this.showMenus(menus)}
          </ul>
        </nav>
      </div>
    );
  }
  showMenus= (menus) =>{
    var rs= null;
    if(menus.length > 0){
      rs = menus.map((menu,index)=>{
        return(
          <MenuLink 
            key={index}
            label={menu.name}
            to={menu.to}
            activeOnlyWhenExact={menu.activeOnlyWhenExact}
          />
        );
      });
    }
    return rs;
  }
}

export default Header;
