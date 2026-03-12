# ChatMe - Real-Time Instant Messaging

ChatMe is a brutal, lightning-fast, real-time messaging application that requires zero registration. Create a room, share the ID, and start chatting instantly.

![ChatMe Preview](https://chat-me.cloudvault.cloud/landing)

## 🚀 Key Features

- **Instant Chat Rooms**: Generate unique room IDs and start talking in seconds.
- **No Registration**: No email, no password, no tracking. Pure anonymity.
- **Real-Time Communication**: Powered by Socket.io for low-latency message delivery.
- **Ephemeral Data**: Rooms and messages are transient—once the session ends, the data disappears.
- **Neo-Brutalist UI**: A bold, high-contrast design that stands out.
- **Fully Responsive**: Optimized for every device: very small mobiles, tablets, and large PC displays.
- **Reactions & Replies**: Interactive chat experience with emoji reactions and message replies.
- **Search & Download**: Search through messages and download chat history easily.

## 🛠️ Tech Stack

- **Frontend**: React.js, Tailwind CSS, Lucide React (Icons)
- **Backend**: Node.js, Express, Socket.io
- **Deployment**: GitHub Actions, Cloudflare

## 📦 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/VarunMendre/SocketRoom.git
   cd SocketRoom
   ```

2. Install dependencies for both frontend and backend:
   ```bash
   # Frontend
   cd frontend
   npm install

   # Backend
   cd ../backend
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the `frontend` directory:
     ```
     REACT_APP_SOCKET_URL=http://localhost:3001
     ```
   - Create a `.env` file in the `backend` directory:
     ```
     PORT=3001
     ```

### Running the Application

1. Start the backend:
   ```bash
   cd backend
   npm start
   ```

2. Start the frontend:
   ```bash
   cd frontend
   npm start
   ```

The application will be available at `http://localhost:3000`.

## 📂 Project Structure

- `frontend/`: React application with Neo-Brutalism styling and responsive layouts.
- `backend/`: Node.js/Express server handling Socket.io logic and room management.
- `.github/workflows/`: CI/CD pipelines for automated deployment.

## 📱 Responsive Support

The application is thoroughly tested and optimized for:
- **Mobile (Small & Large)**: Optimized touch targets and stacked layouts.
- **Tablets**: Fluid grid systems and better use of screen real estate.
- **Desktop (upto 4K)**: Limited container width for optimal readability with Neo-Brutalist shadows.

## 👤 Author

**Varun Mendre**
- [GitHub](https://github.com/VarunMendre)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
