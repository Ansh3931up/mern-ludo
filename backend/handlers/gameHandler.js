const { getRoom, updateRoom } = require('../services/roomService');
const { sendToPlayersRolledNumber, sendWinner, sendToPlayersScores } = require('../socket/emits');//Changes :added sendToPlayersScores
const { rollDice, isMoveValid } = require('./handlersFunctions');
const scoringHelpers = require('./scoringHandler');//Changes : added the helper function to make code clean and use the DRY(Don't Repeat Yourself Principle)

module.exports = socket => {
    const req = socket.request;

    const handleMovePawn = async pawnId => {
        const room = await getRoom(req.session.roomId);
        if (room.winner) return;
        const pawn = room.getPawn(pawnId);
        if (isMoveValid(req.session, pawn, room)) {
            //Changes : Add score to the moved pawn
       
            pawn.addScore(room.rolledNumber);
          
            
            const newPositionOfMovedPawn = pawn.getPositionAfterMove(room.rolledNumber);
            room.changePositionOfPawn(pawn, newPositionOfMovedPawn);
            room.beatPawns(newPositionOfMovedPawn, req.session.color, pawn._id.toString());
            
            //Changes : Update player total scores after the pawn score get updated
            room.players.forEach(player => {
                scoringHelpers.updatePlayerTotalScore(room, player._id.toString());
            });
            
            //Changes : Send updated scores to all players after the player score updation
            const scores = scoringHelpers.getAllPlayerScores(room);
     
            sendToPlayersScores(room._id.toString(), scores);
            
            room.changeMovingPlayer();
            const winner = room.getWinner();
            if (winner) {
                room.endGame(winner);
                sendWinner(room._id.toString(), winner);
            }
            await updateRoom(room);
        }
    };

    const handleRollDice = async () => {
        const rolledNumber = rollDice();
        sendToPlayersRolledNumber(req.session.roomId, rolledNumber);
        const room = await updateRoom({ _id: req.session.roomId, rolledNumber: rolledNumber });
        const player = room.getPlayer(req.session.playerId);
        if (!player.canMove(room, rolledNumber)) {
            room.changeMovingPlayer();
            await updateRoom(room);
        }
    };

    socket.on('game:roll', handleRollDice);
    socket.on('game:move', handleMovePawn);
};
