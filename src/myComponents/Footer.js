import React from 'react'

const Footer = () => {
	let footerStyle = {
		position: "relative",
		top:"53vh",
		width:"100%",
		paddingTop:"3px",
		paddingBottom:"10px",
		backgroundColor:"black",
		color:"white",
		textAlign:"center"
	}
	return (
		<footer style={footerStyle}>
			<p>Copyright &copy; MyTodoList</p>
		</footer>
	)
}

export default Footer