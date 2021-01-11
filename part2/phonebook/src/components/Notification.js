const Notification = ({message}) => {
	const messageStyle = {
		color: 'red',
		background: 'lightgrey',
		fontSize: 20,
		borderStyle: 'solid',
		borderRadius: 5,
		padding: 10,
		marginBottom: 10
	}
	if (message === null)
		return null
	if (message.startsWith('Added ') || message.startsWith('Updated '))
		messageStyle.color = 'green'
	return (
		<div style={messageStyle}>
			{message}
		</div>
	)
}

export default Notification