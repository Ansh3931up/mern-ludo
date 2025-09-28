const { COLORS } = require('./constants');

// Helper function to get start positions (similar to room schema default)
function getStartPositions() {
    const startPositions = [];
    for (let i = 0; i < 16; i++) {
        let pawn = {};
        pawn.basePos = i;
        pawn.position = i;
        pawn.score = 0; // Add score field for new schema
        if (i < 4) pawn.color = COLORS[0];
        else if (i < 8) pawn.color = COLORS[1];
        else if (i < 12) pawn.color = COLORS[2];
        else if (i < 16) pawn.color = COLORS[3];
        startPositions.push(pawn);
    }
    return startPositions;
}

module.exports = {
    getStartPositions
};
//Chages : Added a new function to get the start positions