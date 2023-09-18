import chess

board = chess.Board()

str_board = str(board)

move = ""
for moves in board.legal_moves:
    move = move + str(moves) + "\t" 



#print("we here")
