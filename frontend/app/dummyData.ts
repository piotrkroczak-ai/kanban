import { Board } from './types';

export const dummyBoard: Board = {
  columns: [
    {
      id: '1',
      name: 'To Do',
      cards: [
        { id: '1', title: 'Design UI', details: 'Create wireframes for the Kanban board' },
        { id: '2', title: 'Set up project', details: 'Initialize NextJS and dependencies' },
      ]
    },
    {
      id: '2',
      name: 'In Progress',
      cards: [
        { id: '3', title: 'Implement drag-drop', details: 'Add react-dnd for card movement' },
      ]
    },
    {
      id: '3',
      name: 'Review',
      cards: [
        { id: '4', title: 'Code review', details: 'Review the implemented features' },
      ]
    },
    {
      id: '4',
      name: 'Testing',
      cards: [
        { id: '5', title: 'Unit tests', details: 'Write tests for components' },
      ]
    },
    {
      id: '5',
      name: 'Done',
      cards: [
        { id: '6', title: 'Project setup', details: 'Completed initial setup' },
      ]
    },
  ]
};