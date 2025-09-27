__all__ = ["PLAYER1", "PLAYER2", "Game"] # __all__ makes it so that only these variables are imported with the * wild card

PLAYER1, PLAYER2 = "X", "O"

class Game:

    def __init__(self):
        self.placedMarks = 0
        self.gameEnded = False
        self.wins = [0,0]

        self.markMap = {
            0 : ['l_c', 't_r', 'l_d'],
            1 : ['m_c', 't_r'],
            2 : ['r_c', 't_r', 'r_d'],

            3 : ['l_c', 'm_r'],
            4 : ['m_c', 'm_r', 'l_d', 'r_d'],
            5 : ['r_c', 'm_r'],

            6 : ['l_c', 'b_r', 'r_d'],
            7 : ['m_c', 'b_r'],
            8 : ['r_c', 'b_r', 'l_d'],
        }
        self.winningWays = {
            'l_c' : 0,
            'm_c' : 0,
            'r_c' : 0,

            't_r' : 0,
            'm_r' : 0,
            'b_r' : 0,

            'l_d' : 0,
            'r_d' : 0
        }

    @property
    def lastPlayer(self):
        return PLAYER1 if self.placedMarks % 2 else PLAYER2
    
    def resetGame(self):
        self.placedMarks = 0
        self.gameEnded = False
        for way in self.winningWays:
            self.winningWays[way] = 0

    def endGame(self, winner):
        self.gameEnded = True
        
        if winner == None:
            return
        
        idx = 0 if winner == PLAYER1 else 1
        self.wins[idx] += 1

    def selectCell(self, cell, player):
        if self.gameEnded:
            raise RuntimeError("Game has ended")
        if player == self.lastPlayer:
            raise RuntimeError("Not your turn")
        
        m = self.markMap[cell]
        val = 1 if player == PLAYER1 else -1
        self.placedMarks += 1
        
        for i in range(len(m)):
            self.winningWays[m[i]] += val
            if self.winningWays[m[i]] == (3 * val):
                return True
        return False