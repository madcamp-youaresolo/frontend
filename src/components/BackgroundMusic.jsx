import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';

const BackgroundMusic = () => {
    const audioRef = useRef(null);
    const [volume, setVolume] = useState(0.5);
    const [muted, setMuted] = useState(false);
    const [play, setPlay] = useState(false);

    useEffect(() => {
        const audio = audioRef.current;

        if (audio) {
            audio.volume = volume;
            audio.muted = muted;

            if (!audio.paused) {
                setPlay(true);
            }
        }
    }, [volume, muted]);

    const handlePlay = () => {
        const audio = audioRef.current;
        if (!audio) return;

        if (play) {
            audio.pause();
            setPlay(false);
        } else {
            audio.play().then(() => {
                setPlay(true);
            }).catch(() => {
                console.log('자동 재생 실패');
            });
        }
    };

    const toggleMute = () => {
        setMuted((prev) => !prev);
    };

    const handleVolumeChange = (e) => {
        setVolume(parseFloat(e.target.value));
    };

    return (
        <>
            <audio ref={audioRef} src="/solo.mp3" autoPlay loop />
            <ControlBox>
                <Button onClick={handlePlay}>
                    {play ? '⏸️' : '▶️'}
                </Button>
                <Button onClick={toggleMute}>
                    {muted ? '🔇' : '🔈'}
                </Button>
                <Volume
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={handleVolumeChange}
                    disabled={muted}
                />
            </ControlBox>
        </>
    );
}

export default React.memo(BackgroundMusic);

const ControlBox = styled.div`
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 999;
    background: none;
    padding: 10px;
    border-radius: 100px;
    display: flex;
    align-items: center;
`;

const Button = styled.button`
    width: clamp(6px, 8vw, 20px);
    height: auto;
    font-size: clamp(8px, 10vw, 14px);
    background: none;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: filter 0.3s ease-in-out;
    cursor: pointer;

    &:hover {
        filter: brightness(0.9);
    }

    &:focus {
        outline: none;
    }
`;

const Volume = styled.input`
    -webkit-appearance: none;
    width: 80px;
    height: 4px;
    background: #E5E5E5;
    border-radius: 4px;
    outline: none;
    transition: background 0.3s ease;

    &:hover {
        background: #DDDDDD;
    }

    &::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: #FF50B9;
        cursor: pointer;
        transition: filter 0.3s ease;
    }

    &::-webkit-slider-thumb:hover {
        filter: brightness(0.9);
    }

    &::-moz-range-thumb {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: #555;
        cursor: pointer;
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;