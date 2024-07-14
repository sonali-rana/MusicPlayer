import React, { useEffect, useRef, useState } from "react";
import ProgressBar from "./ProgressBar";
import Controls from "./Controls";

import { musicList } from "./musicJSON";

const Player = () => {
	const [song, setSong] = useState(musicList[0]);
	const audioRef = useRef(new Audio());
	const [toggle, setToggle] = useState(false);

	useEffect(() => {
		// Handle song change and audio setup
		if (song) {
			audioRef.current.src = song.songSrc; // Set audio source
		}
	}, [song]);

	//Handle Pause and Play functionality
	const onToggle = (toggle) => {
		toggle ? audioRef.current.play() : audioRef.current.pause();
		setToggle(toggle);
	};

	//Handle song change
	const onSongChange = (type) => {
		const index = musicList.findIndex((obj) => obj?.title === song?.title);

		if (index > 0 && type === "previous") {
			onToggle(false); // Pause previous audio
			setSong(musicList[index - 1]);
			setTimeout(() => onToggle(true), 300); //Wait for audio update and then play
		} else if (index < musicList.length - 1 && type === "next") {
			onToggle(false);
			setSong(musicList[index + 1]);
			setTimeout(() => onToggle(true), 300);
		}
	};

	return (
		<div className='player-component'>
			<h2>{song?.title}</h2>
			<p>{song?.artist}</p>
			<img
				src='./music.jpeg'
				height='250'
				className='music-icon'
				alt='not found'
			/>
			<ProgressBar audioRef={audioRef} />
			<Controls
				toggle={toggle}
				onToggle={onToggle}
				onSongChange={onSongChange}
			/>
		</div>
	);
};

export default Player;
