import React from "react";

const Controls = (props) => {
	const { toggle, onToggle, onSongChange } = props;

	return (
		<div className='controls'>
			<i
				className='bi bi-chevron-double-left'
				onClick={() => onSongChange("previous")}
			></i>
			{toggle ? (
				<i
					className='bi bi-pause-circle-fill'
					style={{ fontSize: "60px" }}
					onClick={() => onToggle(false)}
				></i>
			) : (
				<i
					className='bi bi-play-circle-fill'
					style={{ fontSize: "60px" }}
					onClick={() => onToggle(true)}
				></i>
			)}

			<i
				className='bi bi-chevron-double-right'
				onClick={() => onSongChange("next")}
			></i>
		</div>
	);
};

export default Controls;
