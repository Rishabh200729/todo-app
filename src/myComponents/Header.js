import React from 'react';
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { AppBar, Tab, Tabs, Toolbar, Typography, Button }  from "@material-ui/core";
import "../App.css";
import { AuthContext } from "../Auth";
import firebase from "../firebase";
import Profile from "./Profile";

const Header = (props) => {
	const { currentUser } = React.useContext(AuthContext);
	return (
		<header>
			<AppBar>
				<Toolbar variant="dense" >
				<Typography variant="h2" style={{"display":"block","textAlign":"center"}}>{props.title}</Typography>
					<Tabs centered>
						<Link to ="/"  style={{"color":"#ffffff"}}><Tab label={props.title} /></Link>
						<Link to="/about"  style={{"color":"#ffffff"}}><Tab label="ABOUT" ></Tab></Link>
						<Link to="/completed"  style={{"color":"#ffffff"}}><Tab label="Completed Todos" ></Tab></Link>
					</Tabs>
					{currentUser ?<>
						<div className="profile-btn">
							<Link to="/profile"><img className="profile-img" src={currentUser.photoURL} /></Link>
							<Button variant="contained" color="secondary" onClick={()=> firebase.auth().signOut()} className="logout-btn" >Log Out</Button>
						</div>
					</>
					:
					<Link to="/login"><Button variant="contained" color="secondary">Login</Button></Link>}
				</Toolbar>
			</AppBar>
        </header>
	)
}
Header.defaultProps = {
	title : "no title was given"
}
Header.propTypes = {
	title : PropTypes.string.isRequired
}
export default Header
