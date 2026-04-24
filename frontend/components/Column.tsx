"use client";

import { useState } from 'react';
import { useDrop } from 'react-dnd';
import { Column as ColumnType } from '../app/types';
import Card from './Card';

interface ColumnProps {
  column: ColumnType;
  onMoveCard: (cardId: string, fromColumnId: string, toColumnId: string) => void;
  onAddCard: (columnId: string, title: string, details: string) => void;
  onDeleteCard: (cardId: string, columnId: string) => void;
  onRenameColumn: (columnId: string, newName: string) => void;
  onUpdateCard: (cardId: string, columnId: string, newTitle: string, newDetails: string) => void;
  editingCardId?: string | null;
  onClearEditing?: () => void;
}

export default function Column({ column, onMoveCard, onAddCard, onDeleteCard, onRenameColumn, onUpdateCard, editingCardId, onClearEditing }: ColumnProps) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'card',
    drop: (item: { cardId: string, fromColumnId: string }) => {
      if (item.fromColumnId !== column.id) {
        onMoveCard(item.cardId, item.fromColumnId, column.id);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAddCard(column.id, title.trim(), details.trim());
      setTitle('');
      setDetails('');
      setShowForm(false);
    }
  };

  const handleRename = () => {
    const newName = prompt('Enter new column name', column.name);
    if (newName && newName !== column.name) {
      onRenameColumn(column.id, newName);
    }
  };

  return (
    <div
      ref={(node) => { drop(node as any); }}
      className="column"
      style={{ backgroundColor: isOver ? 'var(--column-hover-bg)' : undefined }}
    >
      <h2 onClick={handleRename} className="col-title" style={{ cursor: 'pointer' }}>{column.name}</h2>
      <button onClick={() => setShowForm(true)} className="btn btn-secondary" style={{ marginBottom: '10px' }}>Add Card</button>

      {showForm && (
        <form onSubmit={handleSubmit} style={{ marginBottom: '10px' }}>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Card title"
            className="input"
            style={{ marginBottom: '6px' }}
            autoFocus
          />
          <textarea
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            placeholder="Details (optional)"
            className="input"
            style={{ marginBottom: '6px' }}
          />
          <div style={{ display: 'flex', gap: '8px' }}>
            <button type="submit" className="btn btn-primary">Add</button>
            <button type="button" onClick={() => setShowForm(false)} className="btn btn-ghost">Cancel</button>
          </div>
        </form>
      )}

      <div>
        {column.cards.map(card => (
          <Card
            key={card.id}
            card={card}
            columnId={column.id}
            onDelete={() => onDeleteCard(card.id, column.id)}
            onUpdate={onUpdateCard}
            editingCardId={editingCardId}
            onClearEditing={onClearEditing}
          />
        ))}
      </div>
    </div>
  );
}