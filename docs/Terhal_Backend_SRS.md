
# 📌 Terhal_ترحال – Smart Tourism Platform in Egypt

**Terhal** is a bilingual AI-powered travel discovery platform that helps users find personalized destinations and events in Egypt using GPS and real-time data. This document outlines the System Requirements Specification (SRS) for the platform's backend services.

---

## 📖 Table of Contents

1. [Introduction](#introduction)
2. [Scope](#scope)
3. [User Roles](#user-roles)
4. [Functional Requirements](#functional-requirements)
5. [Non-Functional Requirements](#non-functional-requirements)
6. [Data Models](#data-models)
7. [Future Enhancements](#future-enhancements)
8. [Tech Stack & API Base](#tech-stack--api-base)

---

## 📍 Introduction

Terhal_ترحال allows travelers (local and foreign) to explore the best of Egypt based on preferences, location, and interests. Admins can manage places, categories, events, and gain insights from travel data.

---

## 🗺️ Scope

- User registration, login, email verification, and password management
- GPS-based nearby suggestions and top-rated destinations
- Real-time event listings
- Role-based access: User / Admin / Super Admin
- Admin dashboard for managing content and analytics
- Account reactivation and secure payment integration

---

## 👥 User Roles

| Role         | Description                                      |
|--------------|--------------------------------------------------|
| Visitor      | Browses public data (places, events)             |
| Traveller    | Registered user with profile, favorites, AI suggestions |
| Admin        | Manages places, events, and categories           |
| Super Admin  | Manages admin accounts and stats                 |

---

## ✅ Functional Requirements

### 1. **Authentication**

- `POST /auth/register` – Register user
- `POST /auth/login` – Login user
- `POST /auth/verify-email/:token` – Verify email and set password
- `POST /auth/forgetPassword` – Send password reset email
- `POST /user/reactivate-account` – Reactivate user account

### 2. **Profile (Traveller Only)**

- `GET /profile/me` – Get current user
- `PUT /profile/update` – Update profile info or GPS location

### 3. **Places**

#### Public Access:
- `GET /places/`, `/places/search`, `/places/top`, `/places/suggested`
- `GET /places/:id`, `/places/:id/rate`

#### Traveller Access:
- `POST /places/:id/favourite`
- `GET /places/favourites`, `/places/:id/is-favourited`
- `DELETE /places/:id/favourite`, `/places/favourites`
- `GET /places/nearby`

#### Admin Access:
- `GET /admin/place`
- `POST /admin/place`
- `PUT /admin/place/:id`
- `PUT /admin/place/:id/visibility`

### 4. **Events**

- `GET /events`, `/events/:id`, `/events/eventsinHome`
- `POST /events/` (Admin)
- `PUT /events/:id`, `DELETE /events/:id` (Admin)

### 5. **Categories (Admin Only)**

- `POST /categories/`
- `PUT /categories/:id`
- `DELETE /categories/:id`

### 6. **Admin Management**

- `POST /admin/auth/login` – Admin login
- `GET /admin` – List admins
- `POST /admin` – Create new admin (super admin only)
- `PUT /admin/:id`, `DELETE /admin/:id`

### 7. **Admin Stats**

- `GET /admin/stats/overview`
- `GET /admin/stats/nationalities`
- `GET /admin/stats/top-rated`
- `GET /admin/stats/reviews-analysis`

### 8. **Payments**

- `POST /payment/checkout` – Create payment session

---

## 🧪 Non-Functional Requirements

- ⚡ **Performance:** < 500ms average API latency
- 🔐 **Security:** JWT auth, email verification, password encryption
- ⚙️ **Scalability:** Designed for 10k+ concurrent users
- 🌐 **Availability:** Target 99.9% uptime
- 🌍 **Internationalization:** Arabic + English support

---

## 🧾 Data Models

### User
```json
{
  "name": "string",
  "email": "string",
  "password": "hashed",
  "mobile": "string",
  "nationality": "string",
  "language": "AR | EN",
  "role": "traveler | guid",
  "isVerified": true,
  "location": { "lat": "number", "lng": "number" }
}
````

### Place

```json
{
  "name": "string",
  "location": "string",
  "address": "string",
  "category": "string",
  "coordinates": "string",
  "description": "string",
  "image": "string",
  "visible": true
}
```

### Event

```json
{
  "name": "string",
  "location": "string",
  "address": "string",
  "category": "string",
  "coordinates": "string",
  "startTime": "ISO8601",
  "endTime": "ISO8601",
  "description": "string"
}
```

---

## 🚀 Future Enhancements

* 🔮 AI-powered itinerary planner
* 📍 Smart alerts for nearby places/events
* 📊 User behavior analytics for admin dashboard
* 🗣️ Support for additional languages (French, German)
* 🔗 Integration with booking APIs, maps, and calendars

---

## 🛠️ Tech Stack & API Base

* **Backend:** Node.js, Express.js
* **Database:** MongoDB
* **Auth:** JWT
* **Deployment:** Vercel
* **API Base URL:** `https://backend-mu-ten-26.vercel.app`
* **Docs Version:** 1.0

---

> © 2025 Terhal\_ترحال. All rights reserved.

