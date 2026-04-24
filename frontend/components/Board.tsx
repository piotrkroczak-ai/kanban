import { Board as BoardType } from '../app/types';
import Column from './Column';

interface BoardProps {
  board: BoardType;
  onMoveCard: (cardId: string, fromColumnId: string, toColumnId: string) => void;
  onAddCard: (columnId: string, title: string, details: string) => void;
  onDeleteCard: (cardId: string, columnId: string) => void;
  onRenameColumn: (columnId: string, newName: string) => void;
  onUpdateCard: (cardId: string, columnId: string, newTitle: string, newDetails: string) => void;
  editingCardId?: string | null;
  onClearEditing?: () => void;
}

export default function Board({ board, onMoveCard, onAddCard, onDeleteCard, onRenameColumn, onUpdateCard, editingCardId, onClearEditing }: BoardProps) {
  return (
    <div style={{ display: 'flex', gap: '20px', padding: '20px', overflowX: 'auto' }}>
      {board.columns.map(column => (
        <Column
          key={column.id}
          column={column}
          onMoveCard={onMoveCard}
          onAddCard={onAddCard}
          onDeleteCard={onDeleteCard}
          onRenameColumn={onRenameColumn}
          onUpdateCard={onUpdateCard}
          editingCardId={editingCardId}
          onClearEditing={onClearEditing}
        />
      ))}
    </div>
  );
}