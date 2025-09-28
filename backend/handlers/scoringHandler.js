// Scoring helper functions for the Ludo game

// As after updating the pawn score this function calls each player and it's all the pawn and update the score of the players
const updatePlayerTotalScore = (room, playerId) => {
    const player = room.getPlayer(playerId);
    if (!player) return 0;
    
    const playerPawns = room.getPlayerPawns(player.color);
    let totalScore = 0;
    
    playerPawns.forEach(pawn => {
        totalScore += pawn.score;
    });
    
    player.totalScore = totalScore;
    return totalScore;
};

// Getting the score of all the player based on there color
const getAllPlayerScores = (room) => {
    const scores = {};
    
    room.players.forEach(player => {
        scores[player.color] = player.totalScore;
    
    });
    

    return scores;
};

const getHighestScorePlayer = (room) => {
    let highestScore = -1;
    let winner = null;
    
    room.players.forEach(player => {
        if (player.totalScore > highestScore) {
            highestScore = player.totalScore;
            winner = player;
        }
    });
    
    return { player: winner, score: highestScore };
};

// Export helper functions for use in other handlers
module.exports = {
    updatePlayerTotalScore,
    getAllPlayerScores,
    getHighestScorePlayer
};
//Changes :