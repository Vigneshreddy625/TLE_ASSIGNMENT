# TLE Assignment

A comprehensive MERN stack application for tracking and managing students' Codeforces competitive programming progress. This application provides detailed analytics, automated data synchronization, and progress monitoring for educational institutions and competitive programming coaches.

## 🚀 Features

### Student Management
- **Complete Student Database**: Manage student information including name, email, phone, and Codeforces handle
- **CRUD Operations**: Add, edit, delete, and view student records
- **CSV Export**: Download complete student dataset for offline analysis
- **Data Validation**: Ensure data integrity with comprehensive validation

### Student Profile Analytics
- **Contest History Tracking**: View detailed contest participation with rating changes and performance metrics
- **Problem Solving Statistics**: Comprehensive analysis of coding activity and progress
- **Interactive Visualizations**: Rating graphs, submission heatmaps, and problem difficulty distribution charts
- **Flexible Time Filtering**: Analyze data for different time periods (7, 30, 90, or 365 days)

### Automated Data Synchronization
- **Daily Cron Jobs**: Automatic Codeforces data fetching and storage
- **Configurable Scheduling**: Customize sync frequency and timing
- **Real-time Updates**: Immediate data refresh when Codeforces handles are updated
- **Data Freshness Tracking**: Monitor when each student's data was last updated

### Inactivity Monitoring
- **Automatic Detection**: Identify inactive students (no submissions in 7 days)
- **Email Notifications**: Automated reminder emails for inactive students
- **Reminder Tracking**: Monitor frequency of reminder emails sent
- **Individual Controls**: Disable notifications for specific students

## 🛠️ Tech Stack

- **Frontend**: React.js with modern hooks and context API
- **Backend**: Node.js with Express.js
- **Database**: MongoDB with Mongoose ODM
- **Scheduling**: Node-cron for automated tasks
- **Email Service**: Nodemailer for automated notifications
- **Charts**: Recharts for data visualization
- **API Integration**: Codeforces API for competitive programming data

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- Node.js (v14.0 or higher)
- MongoDB (v4.0 or higher)
- npm or yarn package manager
- Git

## ⚙️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Vigneshreddy625/TLE_ASSIGNMENT.git
   cd TLE_ASSIGNMENT
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Environment Configuration**
   
   Create a `.env` file in the server directory with the following variables:
   ```env
   # Database
   MONGODB_URI=mongodb://localhost:27017/codeforces_tracker
   
   
   # Email Configuration
   EMAIL_SERVICE=gmail
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASSWORD=your_app_password
   
   # Codeforces API
   CODEFORCES_API_BASE_URL=https://codeforces.com/api
   
   # Server Configuration
   PORT=5000
   NODE_ENV=development
   ```

5. **Database Setup**
   
   Make sure MongoDB is running on your system:

## 🚀 Running the Application

1. **Start the backend server**
   ```bash
   cd backend
   npm run dev
   ```

2. **Start the frontend development server**
   ```bash
   cd frontend
   npm run dev
   ```

3. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000


## 🔌 API Endpoints

### Students
- `GET /api/users` - Get all students
- `POST /api/users` - Create new student
- `PUT /api/users/:id` - Update student
- `DELETE /api/users/:id` - Delete student
- `GET /api/users/:id` - Get student profile with CF data

### Codeforces Data
- `GET /api/history/user/:id` - Get contest history
- - `GET /api/history/user/:id/rating` - Get contest history rating
- `GET /api/problem-stats/user/:id` - Get problem solving data

### Configuration
- `GET /api/cron/schedule` - Get cron configuration
- `PUT /api/cron/schedule` - Update cron settings
- `GET /api/email/:id/settings` - Get email settings
- `PUT /api/email/:id/toggle-email` - Update email settings

## 🔧 Configuration Options

### Cron Job Settings
- **Sync Time**: Configure when daily sync occurs (default: 2 AM)
- **Sync Frequency**: Set sync interval (daily, twice-daily, weekly)
- **Timeout Settings**: Configure API timeout limits

### Email Notification Settings
- **SMTP Configuration**: Email service provider settings
- **Template Customization**: Modify reminder email templates
- **Frequency Controls**: Configure reminder intervals

### Data Retention
- **History Retention**: Set how long to keep historical data
- **Cache Settings**: Configure data caching policies

## 📈 Analytics Features

### Contest Analytics
- Rating progression over time
- Contest participation frequency
- Performance ranking analysis
- Problem-solving efficiency metrics

### Problem Solving Analytics
- Difficulty distribution analysis
- Daily/weekly activity patterns
- Language usage statistics
- Success rate by problem category

### Submission Heatmap
- Visual representation of daily activity
- Color-coded intensity based on submission count
- Interactive date selection and filtering

## 🔒 Security Features

- Input validation and sanitization
- Rate limiting on API endpoints
- Secure environment variable management
- MongoDB injection prevention

## 📚 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🙏 Acknowledgments

- Codeforces API for providing competitive programming data
- React and Node.js communities for excellent documentation
- Contributors and testers who helped improve this project

## 📋 Roadmap

- [ ] Real-time notifications using WebSockets
- [ ] Advanced analytics dashboard
- [ ] Mobile app development
- [ ] Integration with other competitive programming platforms
- [ ] Machine learning-based performance predictions
- [ ] Bulk import from CSV/Excel files
- [ ] Advanced filtering and search capabilities
- [ ] Custom report generation

---

**Made with ❤️ for the competitive programming community**
