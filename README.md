
# Kanban Project

This project is a **fork** of the original repository  
https://github.com/ed-donner/kanban

The goal of this fork is to build a **Kanban board MVP** while learning and practicing **agent‑based development workflows**.

This work is done in the context of a **course focused on using AI agents and coding assistants**.

---

## Purpose

The purpose of this project is to:
- Create a simple Kanban application (single board)
- Apply modern frontend practices with Next.js
- Experiment with **AI-assisted development** using:
  - Visual Studio Code
  - GitHub Copilot
  - GitHub Desktop

The project emphasizes **human‑in‑the‑loop development**, where specifications guide the coding agent but all actions are explicitly triggered and reviewed.

---

## Scope

- Single Kanban board
- Fixed columns
- Cards with title and description
- Client-side only (no persistence)
- Dummy data on load
- Minimal and clean UI

No additional features beyond the MVP.

---

## Tech Stack

- Next.js (client-rendered)
- React
- Tailwind CSS
- GitHub gpt5mini (coding assistant)
- GitHub Desktop (Git workflow)

---

## Project Structure

The Next.js application is located in the `frontend` directory:

```text
kanban/
└─ frontend/
   ├─ app/
   ├─ components/
   ├─ package.json
   └─ ...
