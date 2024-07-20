import React, { useEffect, useState } from "react";

const ProgressBar = ({ audioRef, isRepeat, onSongChange }) => {
	const [audioDuration, setAudioDuration] = useState("00:00");
	const [currentTime, setCurrentTime] = useState("00:00");
	const [duration, setDuration] = useState(0); //Store audio duration in seconds for progress bar
	const [runningTime, setRunningTime] = useState(0); //Store current time in seconds for progress bar

	useEffect(() => {
		const audioElement = audioRef.current;

		if (!audioElement) return; // initial render check

		const handleLoadedData = () => {
			const formattedDuration = formatTime(audioElement.duration);
			setDuration(audioElement.duration);
			setAudioDuration(formattedDuration);
		};

		const handleTimeUpdate = () => {
			const formattedCurrentTime = formatTime(audioElement.currentTime);
			setRunningTime(audioElement.currentTime);

			setCurrentTime(formattedCurrentTime);

			if (audioElement.currentTime === audioElement.duration) {
				if (isRepeat) {
					//song is onRepeat mode
					audioRef.current.currentTime = 0;

					onSongChange();
				} else {
					onSongChange("next");
				}
			}
		};

		// Attach event listeners
		audioElement.addEventListener("loadeddata", handleLoadedData);
		audioElement.addEventListener("timeupdate", handleTimeUpdate);

		// Clean up event listeners on unmount
		return () => {
			audioElement.removeEventListener("loadeddata", handleLoadedData);
			audioElement.removeEventListener("timeupdate", handleTimeUpdate);
		};
	}, [audioRef, isRepeat]);

	//Format time given in seconds to mm:ss
	const formatTime = (duration) => {
		const minutes = Math.floor(duration / 60);
		const remainingSeconds = Math.floor(duration % 60);

		const formattedMinutes = minutes.toString().padStart(2, "0");
		const formattedSeconds = remainingSeconds.toString().padStart(2, "0");

		return `${formattedMinutes}:${formattedSeconds}`;
	};

	return (
		<div className='timer'>
			<p>{currentTime}</p>

			<input
				type='range'
				value={runningTime}
				min='0'
				max={duration}
				className='progress-bar'
			/>

			<p>{audioDuration}</p>
		</div>
	);
};

export default ProgressBar;
