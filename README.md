
# Terhal_ترحال - Register API Documentation

**Terhal** is a discovery platform for personalized travel experiences in Egypt, leveraging GPS and AI to deliver real-time, tailored recommendations for destinations, activities, and events based on user preferences. The platform offers a bilingual interface (Arabic/English) for both local and international travelers.



#  Authentication API Documentation for Terhal\_ترحال

---

##  Endpoint: Register User

* **URL:** `https://backend-mu-ten-26.vercel.app/auth/register`
* **Method:** `POST`
* **Description:** Register a new user in the Terhal platform.

###  Request Body Parameters

| Name          | Type     | Required | Description                                         |
| ------------- | -------- | -------- | --------------------------------------------------- |
| `name`        | `string` |   Yes    | Full name of the user                               |
| `email`       | `string` |   Yes    | Valid email address                                 |
| `password`    | `string` |   Yes    | Password (minimum 6 characters)                     |
| `mobile`      | `string` |   Yes    | User's mobile phone number                          |
| `nationality` | `string` |   Yes    | User's nationality                                  |
| `language`    | `enum`   |   Yes    | Preferred language: `AR` (Arabic) or `EN` (English) |

###  Example Request

```json
POST /auth/register
Content-Type: application/json

{
  "name": "Ali Mostafa",
  "email": "ali@example.com",
  "password": "strongPass123",
  "mobile": "01012345678",
  "nationality": "Egyptian",
  "language": "AR"
}
```

###  Success Response

| Status Code | Description                                                 |
| ----------- | ----------------------------------------------------------- |
| `201`       | Registration successful. Please check your email to verify. |

```json
{
  "message": "Registration successful. Please check your email to verify."
}
```

###  Error Response

| Status Code | Description           |
| ----------- | --------------------- |
| `500`       | Internal server error |

```json
{
  "error": "Internal Server Error"
}
```

---

##   Endpoint: Login User

* **URL:** `https://backend-mu-ten-26.vercel.app/auth/login`
* **Method:** `POST`
* **Description:** Login with registered user credentials.

###  Request Body Parameters

| Name       | Type     | Required | Description      |
| ---------- | -------- | -------- | ---------------- |
| `email`    | `string` |   Yes    | Registered email |
| `password` | `string` |   Yes    | User password    |

###  Example Request

```json
POST /auth/login
Content-Type: application/json

{
  "email": "ali@example.com",
  "password": "strongPass123"
}
```

###  Success Response

| Status Code | Description      |
| ----------- | ---------------- |
| `200`       | Login successful |

```json
{
  "message": "Login successful",
  "token": "JWT_TOKEN_HERE"
}
```

###  Error Response

| Status Code | Description           |
| ----------- | --------------------- |
| `500`       | Internal server error |

---

##  Endpoint: Forgot Password

* **URL:** `https://backend-mu-ten-26.vercel.app/auth/forgetPassword`
* **Method:** `POST`
* **Description:** Request a password reset code to be sent to the user's email.

###   Request Body Parameters

| Name    | Type     | Required | Description      |
| ------- | -------- | -------- | ---------------- |
| `email` | `string` |   Yes    | Registered email |

###  Example Request

```json
POST /auth/forgetPassword
Content-Type: application/json

{
  "email": "ali@example.com"
}
```

###  Success Response

| Status Code | Description                   |
| ----------- | ----------------------------- |
| `200`       | Reset Code sent to your email |

```json
{
  "message": "Reset Code sent to your email"
}
```

###  Error Response

| Status Code | Description                     |
| ----------- | ------------------------------- |
| `400`       | Invalid request or server error |

---

##  Endpoint: Verify Email

* **URL:** `https://backend-mu-ten-26.vercel.app/auth/verify-email/:token`
* **Method:** `POST`
* **Description:** Verify email using token and set a new password.

###  URL Parameters

| Name    | Type     | Required | In   | Description          |
| ------- | -------- | -------- | ---- | -------------------- |
| `token` | `string` |   Yes    | path | Token sent via email |

###  Request Body Parameters

| Name       | Type     | Required | Description          |
| ---------- | -------- | -------- | -------------------- |
| `password` | `string` |   Yes    | New account password |

###  Example Request

```json
POST /auth/verify-email/some-verification-token
Content-Type: application/json

{
  "password": "NewSecurePassword123"
}
```

###  Success Response

| Status Code | Description                                |
| ----------- | ------------------------------------------ |
| `201`       | Registration successful and email verified |

```json
{
  "message": "Registration successful. Please check your email to verify."
}
```

###  Error Response

| Status Code | Description           |
| ----------- | --------------------- |
| `500`       | Internal server error |

---

##  Endpoint: Admin Login

* **URL:** `https://backend-mu-ten-26.vercel.app/admin/auth/login`
* **Method:** `POST`
* **Description:** Login for admin users only.

###  Request Body Parameters

| Name       | Type     | Required | Description    |
| ---------- | -------- | -------- | -------------- |
| `email`    | `string` |   Yes    | Admin email    |
| `password` | `string` |   Yes    | Admin password |

###  Example Request

```json
POST /admin/auth/login
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "adminPass456"
}
```

###  Success Response

| Status Code | Description      |
| ----------- | ---------------- |
| `200`       | Login successful |

```json
{
  "message": "Login successful",
  "token": "ADMIN_JWT_TOKEN"
}
```

###  Error Responses

| Status Code | Description               |
| ----------- | ------------------------- |
| `400`       | Invalid email or password |
| `500`       | Internal server error     |

---



##  Admin Management (Protected Routes – Require Admin JWT)

###  GET `/admin`

* **Description:** Retrieve list of admins.

####  Success Response

| Status Code | Description           |
| ----------- | --------------------- |
| `200`       | Admins retrieved      |
| `500`       | Internal server error |

---

###  POST `/admin`

* **Description:** Create a new admin.

####  Request Body

| Name       | Type      | Required | Description           |
| ---------- | --------- | -------- | --------------------- |
| `name`     | `string`  |   Yes    | Admin full name       |
| `email`    | `string`  |   Yes    | Must be a valid email |
| `password` | `string`  |   Yes    | Minimum 6 characters  |
| `isSuper`  | `boolean` |   No     | Super admin flag      |

####  Example Request

```json
{
  "name": "Safaa Admin",
  "email": "admin@example.com",
  "password": "adminPass456",
  "isSuper": true
}
```

####  Response

| Status Code | Description             |
| ----------- | ----------------------- |
| `201`       | Admin created           |
| `400`       | Validation/server error |

---

###  PUT `/admin/:id`

* **Description:** Update an admin's details.

####  Parameters

| Name       | Type       | In   | Required | Description           |
| ---------- | ---------- | ---- | -------- | --------------------- |
| `id`       | `ObjectId` | path |   Yes    | Admin ID              |
| `name`     | `string`   | body |   No     | Admin name            |
| `email`    | `string`   | body |   No     | Must be a valid email |
| `password` | `string`   | body |   No     | Minimum 6 characters  |

####  Response

| Status Code | Description   |
| ----------- | ------------- |
| `201`       | Admin updated |
| `400`       | Server error  |

---

###  DELETE `/admin/:id`

* **Description:** Delete an admin.

####  Parameters

| Name | Type       | In   | Required | Description |
| ---- | ---------- | ---- | -------- | ----------- |
| `id` | `ObjectId` | path |   Yes    | Admin ID    |

####  Response

| Status Code | Description                |
| ----------- | -------------------------- |
| `200`       | Admin deleted successfully |
| `400`       | Server error               |

---

##  Place Management (Admin Only)

###  GET `/admin/place`

* **Description:** Get all places.

####  Response

| Status Code | Description  |
| ----------- | ------------ |
| `200`       | Success      |
| `400`       | Server error |

---

###  POST `/admin/place`

* **Description:** Create a new place.

####  Request Body

| Name          | Type     | Required | Description          |
| ------------- | -------- | -------- | -------------------- |
| `name`        | `string` |   Yes    | Name of the place    |
| `location`    | `string` |   Yes    | City or area         |
| `address`     | `string` |   Yes    | Street address       |
| `category`    | `string` |   Yes    | Category of place    |
| `coordinates` | `string` |   Yes    | GPS coordinates      |
| `description` | `string` |   No     | Optional description |
| `image`       | `string` |   No     | Image URL or Base64  |

####  Response

| Status Code | Description  |
| ----------- | ------------ |
| `201`       | Success      |
| `400`       | Server error |

---

###  PUT `/admin/place/:id`

* **Description:** Update an existing place.

####  Parameters

| Name | Type       | In   | Required | Description |
| ---- | ---------- | ---- | -------- | ----------- |
| `id` | `ObjectId` | path |   Yes    | Place ID    |

####  Request Body (All Required Except `description`, `image`)

Same fields as the POST request.

####  Response

| Status Code | Description |
| ----------- | ----------- |
| `200`       | Success     |
| `500`       | Error       |

---

###  PUT `/admin/place/:id/visibility`

* **Description:** Toggle visibility of a place.

####  Parameters

| Name | Type       | In   | Required | Description |
| ---- | ---------- | ---- | -------- | ----------- |
| `id` | `ObjectId` | path |   Yes    | Place ID    |

####  Response

| Status Code | Description        |
| ----------- | ------------------ |
| `200`       | Visibility toggled |
| `500`       | Server error       |

---

##  Events Management

###  POST `/events/`

* **Description:** Create a new event.

####  Request Body

| Name          | Type     | Required | Description       |
| ------------- | -------- | -------- | ----------------- |
| `name`        | `string` |   Yes    | Event name        |
| `description` | `string` |   No     | Event description |
| `location`    | `string` |   Yes    | City or region    |
| `address`     | `string` |   Yes    | Street address    |
| `category`    | `string` |   Yes    | Event category    |
| `coordinates` | `string` |   Yes    | GPS coordinates   |
| `startTime`   | `string` |   Yes    | ISO 8601 format   |
| `endTime`     | `string` |   Yes    | ISO 8601 format   |

####  Response

| Status Code | Description |
| ----------- | ----------- |
| `201`       | Success     |
| `401`       | Login first |
| `400`       | Error       |

---

###  PUT `/events/:id`

* **Description:** Update an event.

####  Parameters + Body (All optional except `id` in path)

Same fields as POST.

####  Response

| Status Code | Description     |
| ----------- | --------------- |
| `200`       | Success         |
| `401`       | Login first     |
| `400`       | Error           |
| `404`       | Event not found |

---

###  DELETE `/events/:id`

| Status Code | Description |
| ----------- | ----------- |
| `200`       | Success     |
| `400`       | Error       |
| `404`       | Not found   |

---

##  Categories Management

###  POST `/categories/`

* **Description:** Create a new category.

####  Request Body

| Name  | Type     | Required | Description    |
| ----- | -------- | -------- | -------------- |
| title | `string` |   Yes    | Must be unique |

####  Response

| Status Code | Description  |
| ----------- | ------------ |
| `201`       | Success      |
| `401`       | Unauthorized |
| `400`       | Error        |

---

###  PUT `/categories/:id`

* **Description:** Update category title.

| Name  | Type     | Required | Description                  |
| ----- | -------- | -------- | ---------------------------- |
| title | `string` |   Yes    | Can be same as current value |

####  Response

| Status Code | Description  |
| ----------- | ------------ |
| `200`       | Success      |
| `401`       | Unauthorized |
| `400`       | Error        |

---

###  DELETE `/categories/:id`

####  Response

| Status Code | Description                       |
| ----------- | --------------------------------- |
| `200`       | Success                           |
| `400`       | Cannot delete – related to places |
| `401`       | Unauthorized                      |
| `500`       | Server error                      |

---

##  Admin Stats

###  GET `/admin/stats/overview`

| Status Code | Description  |
| ----------- | ------------ |
| `200`       | Success      |
| `500`       | Server error |

---

###  GET `/admin/stats/nationalities`

| Status Code | Description  |
| ----------- | ------------ |
| `200`       | Success      |
| `500`       | Server error |

---

###   GET `/admin/stats/top-rated`

| Status Code | Description  |
| ----------- | ------------ |
| `200`       | Success      |
| `500`       | Server error |

---

###   GET `/admin/stats/reviews-analysis`

| Status Code | Description  |
| ----------- | ------------ |
| `200`       | Success      |
| `500`       | Server error |

 


#   Public & User API Endpoints

##   Anonymous User Routes

###   GET `/places/`

- **Description:** Get all available places.

####   Response

| Status Code | Description |
|-------------|-------------|
| `200`       | Success     |
| `400`       | Error       |

---

###   GET `/places/search`

- **Description:** Search places by query.

####   Query Parameters

| Name | Type     | Required | Description         |
|------|----------|----------|---------------------|
| `q`  | `string` |   Yes    | Search query string |

####   Response

| Status Code | Description               |
|-------------|---------------------------|
| `200`       | Success                   |
| `400`       | Search query is required. |
| `500`       | Something went wrong      |

---

###   GET `/places/top`

- **Description:** Get top-rated places.

####   Response

| Status Code | Description          |
|-------------|----------------------|
| `200`       | Success              |
| `500`       | Something went wrong |

---

###   GET `/events/eventsinHome`

- **Description:** Get events for home page.

####   Response

| Status Code | Description |
|-------------|-------------|
| `200`       | Success     |
| `400`       | Error       |

---

###   POST `/user/reactivate-account`

- **Description:** Reactivate a deactivated account.

####   Request Body

| Name       | Type     | Required | Description     |
|------------|----------|----------|-----------------|
| `email`    | `string` |   Yes    | User email      |
| `password` | `string` |   Yes    | User password   |

####   Example

```json
{
  "email": "user@example.com",
  "password": "userPass123"
}
````

####   Response

| Status Code | Description                 |
| ----------- | --------------------------- |
| `200`       | Success                     |
| `400`       | Email and password required |
| `500`       | Server error                |

---

###   POST `/payment/checkout`

* **Description:** Start a payment checkout session.

####   Request Body

| Name     | Type     | Required | Description          |
| -------- | -------- | -------- | -------------------- |
| `amount` | `number` |   Yes    | Payment amount (EGP) |

####   Example

```json
{
  "amount": 250
}
```

####   Response

| Status Code | Description   |
| ----------- | ------------- |
| `200`       | Success       |
| `400`       | Invalid input |
| `500`       | Server error  |

---

##   Anonymous & Logged-In User Route

###   GET `/places/suggested`

* **Description:** Get suggested places.
* **Note:** Results vary based on login status.

####   Response

| Status Code | Description |
| ----------- | ----------- |
| `200`       | Success     |
| `500`       | Error       |

