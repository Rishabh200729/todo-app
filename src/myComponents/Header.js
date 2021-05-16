import React from 'react'
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { AppBar, Tab, Tabs, Toolbar, Typography }  from "@material-ui/core";
import "../App.css";
const Header = (props) => {
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