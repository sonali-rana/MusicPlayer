import React, { useEffect, useRef, useState } from "react";
import ProgressBar from "./ProgressBar";
import Controls from "./Controls";

import { musicList } from "./musicJSON";
import MusicList from "./MusicList";

const Player = () => {
	const [song, setSong] = useState(musicList[0]);
	const audioRef = useRef(new Audio());
	const [toggle, setToggle] = useState(false);
	const [showMusicList, setShowMusicList] = useState(false);
	const [isRepeat, setIsRepeat] = useState(false);

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

	//Hide/Show Music List on Left Side of Screen
	const onShowMusicList = () => {
		setShowMusicList(!showMusicList);
	};

	//onHandle Song Repeat
	const onRepeat = () => {
		setIsRepeat(!isRepeat);
	};

	//Handle song change
	const onSongChange = (type = "", idx = null) => {
		const index =
			idx ?? musicList.findIndex((obj) => obj?.title === song?.title);

		let updateIndex;

		if (index === -1) return;

		onToggle(false); // Pause previous audio

		if (index > 0 && type === "previous") {
			updateIndex = index - 1;
		} else if (index < musicList.length - 1 && type === "next") {
			updateIndex = index + 1;
		} else if (type === "any") {
			updateIndex = idx;
		}

		if (updateIndex) setSong(musicList[updateIndex]); //updating audio

		setTimeout(() => onToggle(true), 50); //Wait for audio update and then play
	};

	return (
		<>
			<img src='./music-app.jpg' alt='Loading...' className='bg-img' />
			{showMusicList && (
				<MusicList onSongChange={onSongChange} song={song?.title} />
			)}
			<div
				className={showMusicList ? "list-player-component" : "player-component"}
			>
				<h2>{song?.title}</h2>
				<p>{song?.artist}</p>
				<img
					src='./music.jpeg'
					height='250'
					className='music-icon'
					alt='not found'
				/>
				<ProgressBar
					audioRef={audioRef}
					isRepeat={isRepeat}
					onSongChange={onSongChange}
				/>
				<Controls
					toggle={toggle}
					onToggle={onToggle}
					isRepeat={isRepeat}
					showMusicList={showMusicList}
					onShowMusicList={onShowMusicList}
					onRepeat={onRepeat}
					onSongChange={onSongChange}
				/>
			</div>
		</>
	);
};

export default Player;
