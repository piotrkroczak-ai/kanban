"use client";

import { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Board from '../components/Board';
import { dummyBoard } from './dummyData';
import { Board as BoardType, Card } from './types';

export default function Home() {
  const [board, setBoard] = useState<BoardType>(dummyBoard);
  const [editingCardId, setEditingCardId] = useState<string | null>(null);

  const handleMoveCard = (cardId: string, fromColumnId: string, toColumnId: string) => {
    setBoard(prev => {
      const newBoard = { ...prev };
      const fromCol = newBoard.columns.find(c => c.id === fromColumnId);
      const toCol = newBoard.columns.find(c => c.id === toColumnId);
      if (fromCol && toCol) {
        const cardIndex = fromCol.cards.findIndex(c => c.id === cardId);
        if (cardIndex !== -1) {
          const [card] = fromCol.cards.splice(cardIndex, 1);
          toCol.cards.push(card);
        }
      }
      return newBoard;
    });
  };

  const handleAddCard = (columnId: string, title: string, details: string) => {
    const newCard: Card = {
      id: Date.now().toString(),
      title,
      details,
    };
    setBoard(prev => ({
      ...prev,
      columns: prev.columns.map(col =>
        col.id === columnId ? { ...col, cards: [...col.cards, newCard] } : col
      )
    }));
    setEditingCardId(newCard.id);
  };

  const handleDeleteCard = (cardId: string, columnId: string) => {
    setBoard(prev => ({
      ...prev,
      columns: prev.columns.map(col =>
        col.id === columnId ? { ...col, cards: col.cards.filter(c => c.id !== cardId) } : col
      )
    }));
  };

  const handleRenameColumn = (columnId: string, newName: string) => {
    setBoard(prev => ({
      ...prev,
      columns: prev.columns.map(col =>
        col.id === columnId ? { ...col, name: newName } : col
      )
    }));
  };

  const handleUpdateCard = (cardId: string, columnId: string, newTitle: string, newDetails: string) => {
    setBoard(prev => ({
      ...prev,
      columns: prev.columns.map(col =>
        col.id === columnId ? { ...col, cards: col.cards.map(c => c.id === cardId ? { ...c, title: newTitle, details: newDetails } : c) } : col
      )
    }));
    setEditingCardId(null);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ fontFamily: 'Arial, sans-serif' }}>
        <h1 style={{ textAlign: 'center', color: 'var(--navy-dark)' }}>Kanban Board</h1>
        <Board
          board={board}
          onMoveCard={handleMoveCard}
          onAddCard={handleAddCard}
          onDeleteCard={handleDeleteCard}
          onRenameColumn={handleRenameColumn}
          onUpdateCard={handleUpdateCard}
          editingCardId={editingCardId}
          onClearEditing={() => setEditingCardId(null)}
        />
      </div>
    </DndProvider>
  );
}
