بالطبع! إليك محتوى ملف `README.md` لتوثيق واجهة التسجيل الخاصة بمشروع **Terhal\_ترحال**:

---

````markdown
# Terhal_ترحال - Register API Documentation

**Terhal** is a discovery platform for personalized travel experiences in Egypt, leveraging GPS and AI to deliver real-time, tailored recommendations for destinations, activities, and events based on user preferences. The platform offers a bilingual interface (Arabic/English) for both local and international travelers.

---

## 📌 Endpoint: Register User

- **URL:** `https://backend-mu-ten-26.vercel.app/auth/register`
- **Method:** `POST`
- **Description:** Register a new user in the Terhal platform.

---

## 📥 Request Body Parameters

| Name         | Type     | Required | Description                                |
|--------------|----------|----------|--------------------------------------------|
| `name`       | `string` | ✅ Yes    | Full name of the user                      |
| `email`      | `string` | ✅ Yes    | Valid email address                        |
| `password`   | `string` | ✅ Yes    | Password (minimum 6 characters)            |
| `mobile`     | `string` | ✅ Yes    | User's mobile phone number                 |
| `nationality`| `string` | ✅ Yes    | User's nationality                         |
| `language`   | `enum`   | ✅ Yes    | Preferred language: `AR` (Arabic) or `EN` (English) |

---

## 🧪 Example Request

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
````

---

## ✅ Success Response

| Status Code | Description                                                 |
| ----------- | ----------------------------------------------------------- |
| `201`       | Registration successful. Please check your email to verify. |

```json
{
  "message": "Registration successful. Please check your email to verify."
}
```

---

## ❌ Error Response

| Status Code | Description           |
| ----------- | --------------------- |
| `500`       | Internal server error |

```json
{
  "error": "Internal Server Error"
}
```

---

## 📝 Notes

* Password must be at least 6 characters long.
* Language must be either `"AR"` or `"EN"`.
* Upon successful registration, a verification link will be sent to the provided email.

---

© 2025 Terhal Platform


https://backend-mu-ten-26.vercel.app/auth/login
parameters 
name   type    required   description
email   strind   yes      
password string  yes

request
{

}
status code
code    description
200     Login successful
500     server error

   ..../forgetPassword
parameters
name   type     required  in     description
email  string    yes       body  
request
{

}
status code
code     description
200       Reset Code sent to your email
400         server error

...../verify-email/:token
name    type    required    in    desc
token   string   yes        path  valid token 
password string  yes         body

request
{

}
statusCode
code     dis


..../admin/auth/login

params
name   type    required    in    desc
email   string    true     bodu   
password string   true     body
 req
 {

 }
 status code
 code    desc
 400     Invalid email or password
200      Login successful
500      Server error

admin routes   must be logedin as admin
....../admin   post 
name      type   required   in   desc
name      string  yes      body
email     string  yes      body   must be email
pasword    string   yes    body     min 6 char
isSuper    boolean  no     body