import React from "react";
import { musicList } from "./musicJSON";

const MusicList = ({ song, onSongChange }) => {
	return (
		<div className='list-component'>
			{musicList?.map((musicObj, index) => (
				<div
					key={musicObj.title}
					className={
						song === musicObj?.title
							? "song-component active"
							: "song-component"
					}
					onClick={() => onSongChange("any", index)}
				>
					<img
						src='./music.jpeg'
						height='250'
						className='img-icon'
						alt='not found'
					/>
					<div>
						<h3>{musicObj.title}</h3>
						<p>{musicObj?.artist}</p>
					</div>
				</div>
			))}
		</div>
	);
};

export default MusicList;
