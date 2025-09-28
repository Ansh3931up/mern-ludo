const { expect } = require('chai');
const RoomModel = require('../../models/room');
const { getStartPositions } = require('../../utils/functions');
describe('Testing room model methods', function () {
    const room = new RoomModel();

    beforeEach(function () {
        room.players = [];
        room.pawns = getStartPositions();
        // Initialize pawn scores using the schema method
        room.pawns.forEach(pawn => {
            if (!pawn.score) pawn.score = 0;
        });
    });
    it('should correctly beat pawn', function () {
        room.addPlayer('test1', 'red');
        room.addPlayer('test2', 'blue');
        room.pawns.forEach(pawn => {
            pawn.position = pawn.getPositionAfterMove(1);
        });
        room.beatPawns(16, 'green');
        room.pawns.forEach(pawn => {
            if (pawn.color != 'red') {
                expect(pawn.position).to.not.equal(pawn.basePos);
            } else {
                expect(pawn.position).to.equal(pawn.basePos);
            }
        });
    });

    it('should correctly beat multiple pawns', function () {
        room.pawns[0].position = 16;
        room.pawns[1].position = 16;
        room.beatPawns(16, 'green');
        room.pawns.forEach(pawn => {
            expect(pawn.position).to.equal(pawn.basePos);
        });
    });

    it('should correctly change moving player from last to first', function () {
        room.addPlayer('test1', 'red');
        room.addPlayer('test2', 'blue');
        room.players[1].nowMoving = true;
        room.changeMovingPlayer();
        expect(room.players[0].nowMoving).to.equal(true);
    });

    it('should correctly change moving player from first to second', function () {
        room.addPlayer('test1', 'red');
        room.addPlayer('test2', 'blue');
        room.players[0].nowMoving = true;
        room.changeMovingPlayer();
        expect(room.players[1].nowMoving).to.equal(true);
    });

    it('should correctly returns pawns that can move', function () {
        room.addPlayer('test1', 'red');
        room.addPlayer('test2', 'blue');
        room.players[0].nowMoving = true;
        room.pawns[0].position = 16;
        room.rolledNumber = 2;
        const pawnsThatCanMove = room.getPawnsThatCanMove();
        expect(pawnsThatCanMove.length).to.equal(1);
    });

    it('should given rolled 6 correctly returns pawns that can move', function () {
        room.addPlayer('test1', 'red');
        room.addPlayer('test2', 'blue');
        room.players[0].nowMoving = true;
        room.pawns[0].position = 16;
        room.rolledNumber = 6;
        const pawnsThatCanMove = room.getPawnsThatCanMove();
        expect(pawnsThatCanMove.length).to.equal(4);
    });

    // Tests for pawn schema methods - using pawn.get methods instead of duplicating logic
    it('should correctly get pawn score', function () {
        const pawn = room.pawns[0];
        expect(pawn.getScore()).to.equal(0);
    });

    it('should correctly add score to pawn', function () {
        const pawn = room.pawns[0];
        pawn.addScore(10);
        expect(pawn.getScore()).to.equal(10);
    });

    it('should correctly reset pawn score', function () {
        const pawn = room.pawns[0];
        pawn.addScore(15);
        expect(pawn.getScore()).to.equal(15);
        pawn.resetScore();
        expect(pawn.getScore()).to.equal(0);
    });

    it('should correctly check if pawn can move', function () {
        const pawn = room.pawns[0];
        // Pawn at base position should be able to move with 6
        expect(pawn.canMove(6)).to.equal(true);
        // Pawn at base position should not be able to move with 3
        expect(pawn.canMove(3)).to.equal(false);
        
        // Move pawn out of base
        pawn.position = 16;
        // Should be able to move with any number that doesn't exceed finish line
        expect(pawn.canMove(5)).to.equal(true);
    });

    it('should correctly get position after move for red pawn', function () {
        const redPawn = room.pawns.find(pawn => pawn.color === 'red');
        redPawn.position = 0;
        expect(redPawn.getPositionAfterMove(6)).to.equal(16);
        expect(redPawn.getPositionAfterMove(1)).to.equal(16);
    });
});
