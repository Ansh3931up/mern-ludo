const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PlayerSchema = new Schema({
    sessionID: String,
    name: String,
    color: String,
    ready: { type: Boolean, default: false },
    nowMoving: { type: Boolean, default: false },
    totalScore: { type: Number, default: 0 },//Changes : added the total score field in this schema
});


// Changes : get player score
PlayerSchema.methods.getScore=function(){
    return this.totalScore;
}

PlayerSchema.methods.changeReadyStatus = function () {
    this.ready = !this.ready;
};

PlayerSchema.methods.canMove = function (room, rolledNumber) {
    const playerPawns = room.getPlayerPawns(this.color);
    for (const pawn of playerPawns) {
        if (pawn.canMove(rolledNumber)) return true;
    }
    return false;
};

// Changes : add points to player score
PlayerSchema.methods.addPoints=function(points){
    this.totalScore += points;
}

// Changes : reset player score
PlayerSchema.methods.resetScore=function(){
    this.totalScore = 0;
}

module.exports = PlayerSchema;
