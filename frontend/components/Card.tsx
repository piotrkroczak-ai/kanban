"use client";

import { useState, useEffect } from 'react';
import { useDrag } from 'react-dnd';
import { Card as CardType } from '../app/types';

interface CardProps {
  card: CardType;
  columnId: string;
  onDelete: () => void;
  onUpdate: (cardId: string, columnId: string, newTitle: string, newDetails: string) => void;
  editingCardId?: string | null;
  onClearEditing?: () => void;
}

export default function Card({ card, columnId, onDelete, onUpdate, editingCardId, onClearEditing }: CardProps) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'card',
    item: { cardId: card.id, fromColumnId: columnId },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(card.title);
  const [details, setDetails] = useState(card.details);

  useEffect(() => {
    if (editingCardId && editingCardId === card.id) {
      setIsEditing(true);
    }
  }, [editingCardId, card.id]);

  const save = () => {
    setIsEditing(false);
    if (title !== card.title || details !== card.details) {
      onUpdate(card.id, columnId, title, details);
    }
    if (onClearEditing) onClearEditing();
  };

  const cancel = () => {
    setIsEditing(false);
    setTitle(card.title);
    setDetails(card.details);
    if (onClearEditing) onClearEditing();
  };

  return (
    <div
      ref={(node) => {
        drag(node as any);
      }}
      style={{
        border: '1px solid #ddd',
        padding: '10px',
        margin: '5px 0',
        backgroundColor: 'var(--card-bg)',
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move'
      }}
    >
      {isEditing ? (
        <div>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ width: '100%', marginBottom: '6px', padding: '6px' }}
          />
          <textarea
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            style={{ width: '100%', marginBottom: '6px', padding: '6px' }}
          />
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={save} style={{ backgroundColor: 'var(--purple-secondary)', color: 'white', border: 'none', padding: '6px 10px' }}>Save</button>
            <button onClick={cancel} style={{ padding: '6px 10px' }}>Cancel</button>
          </div>
        </div>
      ) : (
        <div>
          <h3 style={{ color: 'var(--navy-dark)', margin: '0 0 6px 0' }}>{card.title}</h3>
          <p style={{ color: 'var(--gray-text)', margin: 0 }}>{card.details}</p>
          <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
            <button onClick={() => setIsEditing(true)} style={{ background: 'var(--accent-yellow)', border: 'none', padding: '6px 8px' }}>Edit</button>
            <button onClick={onDelete} style={{ backgroundColor: 'var(--blue-primary)', color: 'white', border: 'none', padding: '6px 8px' }}>Delete</button>
          </div>
        </div>
      )}
    </div>
  );
}