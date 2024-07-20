import React from "react";

const Controls = (props) => {
	const {
		toggle,
		onToggle,
		isRepeat,
		showMusicList,
		onRepeat,
		onShowMusicList,
		onSongChange,
	} = props;

	const playIcon = toggle
		? "bi bi-pause-circle-fill"
		: "bi bi-play-circle-fill";

	return (
		<div className='controls'>
			<i
				className={`bi bi-repeat-1 ${isRepeat ? "activeIcon" : "icon"}`}
				onClick={onRepeat}
			></i>
			<i
				className='bi bi-chevron-double-left'
				onClick={() => onSongChange("next")}
			/>
			<i
				className={playIcon}
				style={{ fontSize: "60px" }}
				onClick={() => onToggle(!toggle)} // toggle logic play pause
			></i>
			<i
				className='bi bi-chevron-double-right'
				onClick={() => onSongChange("next")}
			/>
			<i
				className={`bi bi-music-note-list ${
					showMusicList ? "activeIcon" : "icon"
				}`}
				onClick={onShowMusicList}
			></i>
		</div>
	);
};

export default Controls;
