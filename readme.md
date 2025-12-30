
# YouTube Clone 📹

![GitHub Stars](https://img.shields.io/github/stars/David1DDT/youtube-clone?style=for-the-badge)
![GitHub Forks](https://img.shields.io/github/forks/David1DDT/youtube-clone?style=for-the-badge)
![GitHub Issues](https://img.shields.io/github/issues/David1DDT/youtube-clone?style=for-the-badge)
![TypeScript](https://img.shields.io/badge/TypeScript-4.9+-blue.svg?style=for-the-badge&logo=typescript)
![License: MIT](https://img.shields.io/badge/license-MIT-green.svg?style=for-the-badge)

A full-stack YouTube clone built with modern technologies. This project provides a complete video-sharing platform with user authentication, video uploads, and a responsive UI.

---

## ✨ Features

✅ **Full-Stack Architecture** - Frontend with Next.js and TypeScript, backend with Express and MongoDB

✅ **User Authentication** - Secure login and registration system with JWT

✅ **Video Uploads** - Drag-and-drop video uploads with metadata

✅ **Responsive UI** - Modern, clean interface using Mantine UI components

✅ **Video Streaming** - Efficient video playback with range requests

✅ **Database Integration** - MongoDB with TypeGoose for type-safe schema definition

✅ **Password Hashing** - Secure password storage with Argon2

✅ **Real-time Notifications** - Using Mantine Notifications for user feedback

✅ **Search Functionality** - Coming soon (roadmap)

✅ **Video Recommendations** - Coming soon (roadmap)

---

## 🛠️ Tech Stack

### Frontend

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **UI Library**: Mantine UI (v8)
- **State Management**: React Context API
- **Styling**: CSS
- **Icons**: Tabler Icons

### Backend

- **Framework**: Express.js
- **Database**: MongoDB
- **ORM**: TypeGoose
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: Argon2
- **Validation**: Zod
- **Logging**: Pino

### DevOps

- **Build Tool**: Webpack (via Next.js)
- **Testing**: Coming soon (Jest/React Testing Library)
- **CI/CD**: Coming soon (GitHub Actions)

---

## 📦 Installation

### Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) (local instance or connection string)
- [Yarn](https://yarnpkg.com/) or [npm](https://www.npmjs.com/) (package manager)

### Quick Start

1. **Clone the repository**:

   ```bash
   git clone https://github.com/David1DDT/youtube-clone.git
   cd youtube-clone
   ```

2. **Install dependencies**:

   ```bash
   # Install client dependencies
   cd client
   npm install

   # Install server dependencies
   cd ../server
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in both the `client` and `server` directories with the following variables:

   **Client `.env`**:

   ```env
   NEXT_PUBLIC_API_URL=http://localhost:4000
   ```

   **Server `.env`**:

   ```env
   DB_CONNECTION_STRING=mongodb://localhost:27017/youtube-clone
   JWT_SECRET=your_jwt_secret_here
   CORS_ORIGIN=http://localhost:3000
   ```

4. **Start the development servers**:

   ```bash
   # In a new terminal, start the server
   cd server
   npm dev

   # In another terminal, start the client
   cd ../client
   npm dev
   ```

5. **Access the application**:
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🎯 Usage

### Basic Usage

#### User Authentication

1. **Register a new account**:
   Navigate to `/register` and fill in the registration form.

2. **Login**:
   Use your credentials to log in at `/login`.

3. **Upload a Video**:

   - Log in to access the upload button.
   - Click the upload button in the header.
   - Fill in the video details (title, description, public visibility).
   - Drag and drop or select a video file.

4. **View Videos**:
   - After uploading, your video will appear in the main feed.
   - All public videos will be visible to everyone.

### Example Code Snippets

#### Uploading a Video (Frontend)

```typescript
// Example of how the upload form works in the Upload.tsx component
const submitHandler = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!fileRef.current?.files?.[0]) return;

  const file = fileRef.current.files[0];
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("http://localhost:4000/api/videos", {
    method: "POST",
    body: formData,
    credentials: "include",
  });

  if (!response.ok) throw new Error("Upload failed");

  const data = await response.json();
  console.log("Uploaded video:", data);

  // Update video metadata
  const updateVideoResponse = await fetch(
    `http://localhost:4000/api/videos/${data.videoId}`,
    {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: titleRef.current?.value,
        description: descriptionRef.current?.value,
        published: publicRef.current?.checked,
      }),
    }
  );

  context?.toggle();
  window.location.reload();
};
```

#### Video Streaming (Backend)

```typescript
// Example from video.controller.ts for streaming video chunks
export async function streamVideoHandler(req: Request, res: Response) {
  const { videoId } = req.params;
  const range = req.headers.range;

  if (!videoId)
    return res.status(StatusCodes.BAD_REQUEST).send("Invalid video Id");

  const video = await findVideo(videoId);
  if (!video) {
    return res.status(StatusCodes.NOT_FOUND).send("Video not found");
  }

  const filePath = getPath({
    videoId: video.videoId,
    extension: video.extention,
  });

  const fileSize = fs.statSync(filePath).size;
  const chunkSize = CHUNK_SIZE_IN_BYTES;
  const start = parseInt(range.replace(/\D/g, ""));
  const end = Math.min(start + chunkSize, fileSize - 1);

  res.writeHead(StatusCodes.PARTIAL_CONTENT, {
    "Content-Range": `bytes ${start}-${end}/${fileSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": end - start + 1,
    "Content-Type": "video/mp4",
  });

  const fileStream = fs.createReadStream(filePath, { start, end });
  fileStream.pipe(res);
}
```

---

## 📁 Project Structure

```
youtube-clone/
├── client/                  # Next.js frontend application
│   ├── app/                 # Next.js application routes
│   │   ├── (auth)/          # Authentication routes
│   │   │   ├── login/       # Login page
│   │   │   └── register/    # Register page
│   │   ├── (main)/         # Main application routes
│   │   │   ├── layout.tsx   # Main layout
│   │   │   └── page.tsx     # Home page
│   │   ├── components/      # Reusable components
│   │   │   ├── Header.tsx   # Main header component
│   │   │   ├── Sidebar.tsx  # Sidebar navigation
│   │   │   ├── Upload.tsx   # Video upload modal
│   │   │   └── VideoCard.tsx # Video card component
│   │   ├── globals.css      # Global styles
│   │   └── layout.tsx       # Root layout
│   ├── public/              # Static files
│   ├── package.json         # Client dependencies and scripts
│   └── tsconfig.json        # TypeScript configuration
│
├── server/                  # Express backend application
│   ├── src/                 # Source files
│   │   ├── constants.ts     # Application constants
│   │   ├── helpers/         # Helper functions
│   │   │   └── omit.ts      # Object property omitting utility
│   │   ├── middleware/      # Express middleware
│   │   │   ├── deserializeUser.ts # Deserialize user from JWT
│   │   │   └── requireUser.ts   # Require user to be authenticated
│   │   ├── modules/         # Application modules
│   │   │   ├── auth/        # Authentication module
│   │   │   │   ├── auth.controller.ts # Auth controllers
│   │   │   │   ├── auth.route.ts    # Auth routes
│   │   │   │   ├── auth.schema.ts  # Auth validation schemas
│   │   │   │   └── auth.utils.ts   # Auth utilities
│   │   │   ├── user/        # User module
│   │   │   │   ├── user.controller.ts # User controllers
│   │   │   │   ├── user.model.ts    # User model
│   │   │   │   ├── user.route.ts    # User routes
│   │   │   │   ├── user.schema.ts   # User validation schemas
│   │   │   │   └── user.service.ts  # User service functions
│   │   │   └── videos/      # Video module
│   │   │       ├── video.controller.ts # Video controllers
│   │   │       ├── video.model.ts    # Video model
│   │   │       ├── video.route.ts    # Video routes
│   │   │       ├── video.schema.ts   # Video validation schemas
│   │   │       └── video.service.ts  # Video service functions
│   │   ├── utils/           # Utility functions
│   │   │   ├── database.ts   # Database connection utilities
│   │   │   └── logger.ts     # Logger configuration
│   │   └── main.ts          # Main application entry point
│   ├── package.json         # Server dependencies and scripts
│   └── tsconfig.json        # TypeScript configuration
│
├── .gitignore              # Git ignore rules
└── README.md               # Project documentation
```

---

## 🔧 Configuration

### Environment Variables

| Variable               | Description                                | Default Value                             |
| ---------------------- | ------------------------------------------ | ----------------------------------------- |
| `DB_CONNECTION_STRING` | MongoDB connection string                  | `mongodb://localhost:27017/youtube-clone` |
| `JWT_SECRET`           | Secret key for JWT signing                 | `your_jwt_secret_here`                    |
| `CORS_ORIGIN`          | Allowed origins for CORS (comma-separated) | `http://localhost:3000`                   |
| `PORT`                 | Port for the Express server                | `4000`                                    |

### Customization Options

1. **Change UI Theme**:
   Modify the Mantine theme configuration in `client/app/layout.tsx` to change colors, fonts, and other UI elements.

2. **Add New Features**:

   - Extend the `video.schema.ts` to add new video properties.
   - Add new routes in the respective modules (`auth`, `user`, `videos`).
   - Implement new components in the `client/app/components` directory.

3. **Database Schema**:
   Extend the `User` and `Video` models in their respective `.model.ts` files to add new fields.

---

## 🤝 Contributing

We welcome contributions from the community! Here's how you can contribute to this project:

### Development Setup

1. **Fork the repository**:

   ```bash
   git clone https://github.com/David1DDT/youtube-clone.git
   cd youtube-clone
   ```

2. **Create a new branch**:

   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Install dependencies**:

   ```bash
   # Client
   cd client
   npm install

   # Server
   cd ../server
   npm install
   ```

4. **Start the development servers**:

   ```bash
   # Server
   cd server
   npm dev

   # Client
   cd ../client
   npm dev
   ```

### Code Style Guidelines

- **TypeScript**: Use strict type checking and follow TypeScript best practices.
- **ESLint**: Follow the existing ESLint configuration for consistent code style.
- **Commit Messages**: Use conventional commit messages for better changelog generation.
- **Naming Conventions**:
  - Use `camelCase` for variables and functions.
  - Use `PascalCase` for classes and components.
  - Use `UPPER_CASE` for constants.

### Pull Request Process

1. **Write Tests**: Add tests for new features or bug fixes.
2. **Document**: Update the README or add comments to explain your changes.
3. **Submit PR**: Open a pull request with a clear description of your changes.
4. **Review**: Address any feedback from maintainers.

---

## 📝 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

## 👥 Authors & Contributors

### Maintainers

- [David Dumitru](https://github.com/David1DDT) - Initial work and ongoing maintenance

---

## 🐛 Issues & Support

### Reporting Issues

If you encounter any problems or have feature requests, please open an issue on the [GitHub Issues](https://github.com/David1DDT/youtube-clone/issues) page. Include:

- A clear description of the issue or feature request.
- Steps to reproduce the issue (if applicable).
- Any relevant logs or error messages.
- Your environment details (Node.js version, MongoDB version, etc.).

### FAQ

**Q: Can I use this for commercial purposes?**
A: Yes, this project is licensed under the MIT License, which allows for both personal and commercial use.

**Q: How can I add a new feature?**
A: Start by creating a new branch and adding your feature. Make sure to write tests and update the documentation. Then submit a pull request.

---

## 🗺️ Roadmap

### Planned Features

- **Search Functionality**: Implement a search bar to find videos by title, description, or tags.
- **Video Comments**: Allow users to comment on videos.
- **Video Likes**: Enable users to like videos.
- **User Profiles**: Create detailed user profiles with upload history.
- **Subscriptions**: Allow users to subscribe to channels.
- **Trending Algorithm**: Implement a recommendation algorithm for trending videos.
- **Video Playlists**: Create and manage playlists.
- **Mobile App**: Develop a mobile application using React Native or Flutter.

### Known Issues

- **Video Thumbnails**: Currently, thumbnails are not generated automatically. This will be addressed in a future update.
- **Performance Optimization**: Further optimization of video streaming and database queries is needed for large-scale deployment.
- **Testing**: Comprehensive test coverage is needed for critical components.

### Future Improvements

- **Advanced Analytics**: Add analytics for video views, engagement, and user behavior.
- **Moderation Tools**: Implement tools for content moderation and reporting.
- **Monetization**: Add features for monetizing videos through ads.
- **Multi-language Support**: Enable the application to support multiple languages.
- **Search**: Search videos in the application

---

## 🚀 Get Started Today!

Ready to dive in? Follow the installation steps and start building your own YouTube clone! Whether you're looking to learn new technologies, contribute to an open-source project, or simply explore a full-stack application, this project offers a great starting point.

Join our community, contribute, and let's build something amazing together! 🚀
