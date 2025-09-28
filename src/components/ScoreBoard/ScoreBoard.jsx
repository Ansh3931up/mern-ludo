import React, { useState, useEffect, useContext, useMemo } from 'react';
import { SocketContext } from '../../App';
import styles from './ScoreBoard.module.css';

const ScoreBoard = ({ isMobile = false, isOpen = false, onClose }) => {
    const socket = useContext(SocketContext);
    const [scores, setScores] = useState({});
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        //Changes : Listen for score updates from the backend
        socket.on('game:scores', (scoreData) => {

            setScores(scoreData);
        });

        //Changes : Listen for room data to get player names
        socket.on('room:data', (data) => {
            const roomData = JSON.parse(data);

            if (roomData.players) {
                setPlayers(roomData.players);
            }
        });

        return () => {
            // Unmounting components
            socket.off('game:scores');
            socket.off('room:data');
        };
    }, [socket]);

    //Changes : Create sorted players array with scores using useMemo for optimization
    const sortedPlayers = useMemo(() => {
        const playersWithScores = players.map(player => ({
            ...player,
            score: scores[player.color] || 0
        }));

        return playersWithScores.sort((a, b) => b.score - a.score);
    }, [players, scores]);

    return (
        <div className={`${styles.scoreboard} ${isMobile ? styles.mobile : ''} ${isMobile && isOpen ? styles.mobileOpen : ''}`}>
            <div className={styles.header}>
                <h3>🏆 Leaderboard</h3>
                {/*Changes : Mobile close button */}
                {isMobile && (
                    <button 
                        className={styles.mobileClose}
                        onClick={onClose}
                        aria-label="Close leaderboard"
                    >
                        ✕
                    </button>
                )}
            </div>
            
            <div className={styles.playersList}>
                {sortedPlayers.map((player, index) => (
                    <div 
                        key={player.color || index} 
                        className={`${styles.playerRow} ${styles[player.color] || styles.default}`}
                    >
                        <div className={styles.rank}>
                            {index + 1}
                        </div>
                        <div className={styles.playerInfo}>
                            <div className={styles.playerName}>
                                {player.name || '...'}
                            </div>
                            <div className={styles.playerColor}>
                                {player.color?.toUpperCase() || 'WAITING'}
                            </div>
                        </div>
                        <div className={styles.score}>
                            {scores[player.color] || 0}
                        </div>
                    </div>
                ))}
            </div>

            <div className={styles.footer}>
                <div className={styles.totalPlayers}>
                    Players: {players.length}/4
                </div>
            </div>
        </div>
    );
};

export default ScoreBoard;