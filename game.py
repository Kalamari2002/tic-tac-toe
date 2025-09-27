__all__ = ["PLAYER1", "PLAYER2", "Game"] # __all__ makes it so that only these variables are imported with the * wild card

PLAYER1, PLAYER2 = "X", "O"

class Game:

    def __init__(self):
        self.turn = 0
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
        
    def resetGame(self):
        self.turn = 0
        self.placedMarks = 0
        self.gameEnded = False
        for way in self.winningWays:
            self.winningWays[way] = 0
