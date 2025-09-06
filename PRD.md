# Language Learning App (MVP)

A mobile app built with **React Native** (frontend) and **Node.js + Express** (backend) to help English speakers learn **French** or **German**.  
This MVP includes progressive lessons, flashcards with spaced repetition, immersive media content, and user profiles with language preference.

---

## 📌 Project Requirements Document (PRD)

### 1. Overview
This project aims to build a mobile application to help users learn **French** or **German**.  
It includes:
- A **lesson path** with dialogues and grammar tips.  
- **Flashcards** with spaced repetition.  
- **Media immersion** (podcasts, literature, songs, videos).  
- A **user profile** where learners choose their target language.  

The app will be developed using **React Native** for the frontend and **Express/Node.js** for the backend.

---

### 2. Goals & Objectives
- Deliver an MVP with **10 lessons per language**.  
- Provide a **spaced repetition flashcard system** (like Anki).  
- Enable immersive learning through **media content**.  
- Support user personalization via **profiles**.  
- **Users must select a target language (French or German) at signup**.  
  - All content is filtered to that language.  
  - Users can switch languages later in **Settings**, but only one is active at a time.  

---

### 3. Core Features
#### 3.1 Lesson Path
- 10 progressive lessons per language.  
- Each includes a dialogue + grammar tips.  
- Tracked progress.  

#### 3.2 Flashcards
- Create decks & cards.  
- Review via spaced repetition algorithm (SM2-inspired).  
- Store user progress, intervals, ease factors.  

#### 3.3 Media Tab
- Categories: Podcasts, Literature, Songs, Videos.  
- Filtered by selected language.  

#### 3.4 User Profiles
- Username, email, password.  
- Active target language (FR or DE).  
- Editable in settings.  
- Track lesson & flashcard stats.  

---

### 4. Non-Functional Requirements
- Performance: load lessons/media in <2s.  
- Scalability: backend supports more languages later.  
- Security: JWT + bcrypt.  
- Cross-platform: iOS & Android.  

---

### 5. Tech Stack
- **Frontend**: React Native, React Navigation, Redux/Context, RN Paper/NativeBase  
- **Backend**: Node.js, Express, PostgreSQL or MongoDB, JWT Auth  
- **Deployment**: AWS/Heroku/Render, Cloud DB, TestFlight/Play Store  

---

### 6. API Endpoints (High-Level)
- **Auth**: `/auth/register`, `/auth/login`, `/auth/profile`  
- **Lessons**: `/lessons`, `/lessons/:id`  
- **Flashcards**: `/decks`, `/decks/:id/cards`, `/reviews`  
- **Media**: `/media/podcasts`, `/media/literature`, `/media/songs`, `/media/videos`  
- **User**: `/user/:id`, `/user/update`  

---

### 7. MVP Scope
- 10 lessons per language.  
- Flashcard creation + SR review.  
- 5+ media items per category (per language).  
- User login, profile, language preference.  

---

### 8. Future Enhancements
- AI grammar corrections.  
- Community features (forums, chat).  
- More languages.  
- Gamification (badges, leaderboards).  
- Offline mode.  

---

### 9. Milestones
- **Week 1–2:** Backend setup  
- **Week 3–4:** Frontend setup  
- **Week 5–6:** Media + Profile integration  
- **Week 7:** QA + bug fixes  
- **Week 8:** Beta release  

---

## 🏗️ System Design

### High-Level Architecture
```mermaid
flowchart TD
    subgraph Mobile[React Native App (iOS/Android)]
      Nav[React Navigation Tabs\n- Lessons\n- Flashcards\n- Media\n- Profile/Settings]
      SSO[Auth Screen\n(Sign up / Login)]
      LP[Lesson Path\n(Dialogues + Grammar)]
      FC[Flashcards\n(SR Review, Create Deck/Card)]
      MD[Media Tab\n(Podcasts, Literature, Songs, Videos)]
      PR[Profile/Settings\n(Language = FR or DE)]
      Nav --> LP
      Nav --> FC
      Nav --> MD
      Nav --> PR
      SSO --> Nav
    end

    Mobile -->|REST API (HTTPS, JWT)| API[Node.js + Express Backend]

    subgraph Data[Data Layer]
      DB[(PostgreSQL or MongoDB)]
      OBJ[(Object Storage / CDN\n(for audio/video/lyrics))]
    end

    API -->|CRUD: users, lessons,\n decks, cards, reviews, media| DB
    API -->|Signed URLs / direct links| OBJ

    PR -. sets .->|activeLanguage: 'fr' or 'de'| API
    API -->|only returns content where language = activeLanguage| Mobile

SIGNUP + CONTENT Fetch (Sequence)
sequenceDiagram
  autonumber
  participant App as React Native App
  participant API as Express API
  participant DB as DB

  Note over App: User selects "French" or "German" during Sign Up

  App->>API: POST /auth/register { email, password, language }
  API->>DB: Insert User { email, passwordHash, activeLanguage }
  DB-->>API: User(id, activeLanguage='fr'|'de')
  API-->>App: 201 Created { jwt, activeLanguage }

  App->>API: GET /lessons?language=activeLanguage
  API->>DB: SELECT lessons WHERE language=activeLanguage ORDER BY level
  DB-->>API: [Lesson...]
  API-->>App: [Lesson...]

  App->>API: GET /media?language=activeLanguage&category=podcasts
  API->>DB: SELECT media WHERE language=activeLanguage AND category='podcasts'
  DB-->>API: [Media...]
  API-->>App: [Media...]

  App->>API: GET /decks
  API->>DB: SELECT decks WHERE userId=...
  DB-->>API: [Deck...]
  API-->>App: [Deck...]

  Note over App: User changes language in Settings
  App->>API: PATCH /user/preferences { activeLanguage }
  API->>DB: UPDATE user SET activeLanguage=...
  DB-->>API: OK
  API-->>App: 200 OK

Domain Model
classDiagram
  direction LR

  class User {
    +id: UUID
    +email: string
    +passwordHash: string
    +activeLanguage: enum<'fr','de'>
    +createdAt: datetime
    +updatedAt: datetime
  }

  class Lesson {
    +id: UUID
    +language: enum<'fr','de'>
    +level: int
    +title: string
    +dialogue: text
    +grammarTips: text
  }

  class UserLessonProgress {
    +id: UUID
    +userId: UUID
    +lessonId: UUID
    +completed: boolean
    +lastViewedAt: datetime
  }

  class Deck {
    +id: UUID
    +userId: UUID
    +name: string
    +language: enum<'fr','de'>
  }

  class Card {
    +id: UUID
    +deckId: UUID
    +front: text
    +back: text
    +hint: string
  }

  class ReviewLog {
    +id: UUID
    +cardId: UUID
    +userId: UUID
    +lastReviewedAt: datetime
    +easeFactor: float
    +intervalDays: int
    +repetitions: int
    +dueAt: datetime
    +rating: int
  }

  class MediaItem {
    +id: UUID
    +language: enum<'fr','de'>
    +category: enum<'podcast','literature','song','video'>
    +title: string
    +description: text
    +sourceUrl: string
    +transcriptOrLyrics: text
  }

  User "1" -- "many" UserLessonProgress : progresses
  User "1" -- "many" Deck : owns
  Deck "1" -- "many" Card : contains
  Card "1" -- "many" ReviewLog : reviews
  Lesson "1" -- "many" UserLessonProgress : tracked
