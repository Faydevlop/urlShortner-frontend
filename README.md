```markdown
# URL Shortener Frontend

This is the **frontend** of the URL Shortener project, built with **React**. The application allows users to create, manage, and track shortened URLs through a user-friendly interface.

---

## 🚀 Features
- 🌐 **Shorten URLs**: Input a long URL to generate a short and shareable link.
- 📊 **Analytics**: View click statistics for each shortened URL.
- 📝 **History**: Keep track of previously shortened URLs.
- 🔗 **Copy to Clipboard**: Easily copy shortened links.
- ⚡ **Responsive Design**: Fully functional on mobile, tablet, and desktop.

---

## 🛠️ Tech Stack
- **React**: Frontend framework for building the UI.
- **Axios**: For making API requests to the backend.
- **React Router**: For routing and navigation.
- **Tailwind CSS**: For styling and responsiveness.
- **Context API**: For state management (optional).
- **Vite**: For fast development builds.
- **Redux**: For efficent state managementn system.

---

## ⚙️ Prerequisites
- **Node.js** (v16 or later)
- **npm** or **yarn**

---

## 📦 Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Faydevlop/urlShortner-frontend
   cd urlshortener-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create an `.env` file in the root directory:
   ```env
   VITE_API_URL=http://localhost:5000
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open your browser and visit:
   ```
   http://localhost:5173
   ```

---

## 🔧 Environment Variables
Make sure the following variables are configured in your `.env` file:
```env
VITE_API_URL=<Backend API URL>
```

---

## 🖼️ Screenshots
### Home Page
![Home Page](https://i.postimg.cc/bwKFjH4r/Screenshot-2024-11-20-121125.png)

### URL Shortening Feature
![URL Shortening](https://i.postimg.cc/V6JCf5k6/Screenshot-2024-11-20-121212.png)

---

## 🛣️ API Endpoints Used
- **POST** `/shortURL` - Shorten a long URL.
- **GET** `/getURLs` - Fetch a list of shortened URLs.
- **GET** `/:shortCode` - Fetch pharams and navigate to its original url.

---

## 🧑‍💻 Developers
- **Fayis Nambiyath** ([GitHub](https://github.com/Faydevlop))

---

## AI Models Used

This project leverages AI models from **OpenAI** and **V0.dev** for reference and model building:

- **OpenAI**: Utilized OpenAI’s models for generating intelligent insights, processing natural language input, and integrating AI-driven features.
- **V0.dev**: Incorporated V0.dev’s AI models to enhance functionality and accelerate development of the URL shortener, focusing on scalability and performance.

Thank you to **OpenAI** and **V0.dev** for their powerful tools and resources.

