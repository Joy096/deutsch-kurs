<div align="center">

```
                        ██████╗ ███████╗██╗   ██╗████████╗███████╗ ██████╗██╗  ██╗
                        ██╔══██╗██╔════╝██║   ██║╚══██╔══╝██╔════╝██╔════╝██║  ██║
                        ██║  ██║█████╗  ██║   ██║   ██║   ███████╗██║     ███████║
                        ██║  ██║██╔══╝  ██║   ██║   ██║   ╚════██║██║     ██╔══██║
                        ██████╔╝███████╗╚██████╔╝   ██║   ███████║╚██████╗██║  ██║
                        ╚═════╝ ╚══════╝ ╚═════╝    ╚═╝   ╚══════╝ ╚═════╝╚═╝  ╚═╝
                                      ██╗  ██╗██╗   ██╗██████╗ ███████╗
                                      ██║ ██╔╝██║   ██║██╔══██╗██╔════╝
                                      █████╔╝ ██║   ██║██████╔╝███████╗
                                      ██╔═██╗ ██║   ██║██╔══██╗╚════██║
                                      ██║  ██╗╚██████╔╝██║  ██║███████║
                                      ╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝╚══════╝
```

# 🇩🇪 Pluspunkt Deutsch A1

**Интерактивный краткий конспект и тренажёр немецкого языка**

[![React](https://img.shields.io/badge/React-18-61dafb?style=flat-square&logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5-646cff?style=flat-square&logo=vite)](https://vitejs.dev)
[![PWA](https://img.shields.io/badge/PWA-ready-brightgreen?style=flat-square)](https://web.dev/pwa)
[![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)](LICENSE)

---

[🇷🇺 Русский](#ru) · [🇺🇦 Українська](#uk) · [🇬🇧 English](#en)

</div>

---

<a id="ru"></a>
## 🇷🇺 Русский

### О проекте

Персональное веб-приложение для изучения немецкого языка по учебнику **Pluspunkt Deutsch A1**. Краткий конспект каждого урока, словарь и тренажёр в одном месте — для самостоятельной подготовки к занятиям.

### ✨ Возможности

| Раздел | Описание |
|--------|----------|
| 📖 **Теория** | Визуальные объяснения грамматики по каждому уроку |
| 📝 **Квизы** | Проверка знаний с мгновенной обратной связью |
| 💬 **Диалоги** | Вопросы и фразы для разговорной практики (formell / informell) |
| 📚 **Словарь** | 250+ слов с артиклями, множественным числом и фильтрами |
| 🧪 **Großer Test** | Большой тест по каждому уроку: Quiz, Lückentext, Zuordnung, Wortstellung |

### 🚀 Установка и запуск

```bash
git clone https://github.com/Joy096/deutsch-kurs.git
cd deutsch-kurs
npm install
npm run dev
```

Открой [`http://localhost:5173`](http://localhost:5173)

### 📁 Структура проекта

```
deutsch-kurs/
├── src/
│   └── deutsch_kurs_v13.jsx   # Всё приложение
├── public/
│   ├── manifest.json           # PWA манифест
│   └── icon.png
├── index.html
├── vite.config.js
└── CLAUDE.md                   # Инструкции для AI-ассистента
```

### 🤖 AI-разработка

Проект разрабатывается с помощью **Claude** (Anthropic). Правила и соглашения описаны в [`CLAUDE.md`](CLAUDE.md).

---

<a id="uk"></a>
## 🇺🇦 Українська

### Про проєкт

Персональний вебзастосунок для вивчення німецької мови за підручником **Pluspunkt Deutsch A1**. Короткий конспект кожного уроку, словник і тренажер в одному місці — для самостійної підготовки до занять.

### ✨ Можливості

| Розділ | Опис |
|--------|------|
| 📖 **Теорія** | Візуальні пояснення граматики до кожного уроку |
| 📝 **Квізи** | Перевірка знань із миттєвим зворотним зв'язком |
| 💬 **Діалоги** | Запитання та фрази для розмовної практики (formell / informell) |
| 📚 **Словник** | 250+ слів з артиклями, множиною та фільтрами |
| 🧪 **Großer Test** | Великий тест з кожного уроку: Quiz, Lückentext, Zuordnung, Wortstellung |

### 🚀 Встановлення та запуск

```bash
git clone https://github.com/Joy096/deutsch-kurs.git
cd deutsch-kurs
npm install
npm run dev
```

Відкрий [`http://localhost:5173`](http://localhost:5173)

### 🤖 AI-розробка

Проєкт розробляється за допомогою **Claude** (Anthropic). Правила описані у [`CLAUDE.md`](CLAUDE.md).

---

<a id="en"></a>
## 🇬🇧 English

### About

A personal web app for learning German with the **Pluspunkt Deutsch A1** textbook. Concise lesson notes, vocabulary and practice tools — all in one place, optimised for mobile.

### ✨ Features

| Section | Description |
|---------|-------------|
| 📖 **Theory** | Visual grammar explanations for each lesson |
| 📝 **Quizzes** | Knowledge checks with instant feedback |
| 💬 **Dialogues** | Question & phrase cards for speaking practice (formal / informal) |
| 📚 **Dictionary** | 250+ words with articles, plurals and filters |
| 🧪 **Großer Test** | Full-lesson test: Quiz, Gap fill, Matching, Word order |

### 🚀 Getting Started

```bash
git clone https://github.com/Joy096/deutsch-kurs.git
cd deutsch-kurs
npm install
npm run dev
```

Open [`http://localhost:5173`](http://localhost:5173)

### 🛠 Tech Stack

- **React 18** — UI
- **Vite 5** — build tool
- **PWA** — installable on mobile
- **Vanilla CSS-in-JS** — no external UI library

### 🤖 AI Development

Built with **Claude** (Anthropic). Rules and conventions are in [`CLAUDE.md`](CLAUDE.md).

---

<div align="center">

Made with ☕ and 🇩🇪 · Powered by [Claude](https://claude.ai) · [Pluspunkt Deutsch A1](https://www.cornelsen.de)

</div>
