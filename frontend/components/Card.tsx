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
      className="card"
      style={{ opacity: isDragging ? 0.5 : 1, cursor: 'move' }}
    >
      {isEditing ? (
        <div>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input"
            style={{ marginBottom: '6px' }}
          />
          <textarea
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            className="input"
            style={{ marginBottom: '6px' }}
          />
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={save} className="btn btn-secondary">Save</button>
            <button onClick={cancel} className="btn btn-ghost">Cancel</button>
          </div>
        </div>
      ) : (
        <div>
          <h3>{card.title}</h3>
          <p>{card.details}</p>
          <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
            <button onClick={() => setIsEditing(true)} className="btn btn-accent">Edit</button>
            <button onClick={onDelete} className="btn btn-primary">Delete</button>
          </div>
        </div>
      )}
    </div>
  );
}