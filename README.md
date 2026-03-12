# Creative Portfolio

A high-end, editorial-style portfolio for a UI/UX designer featuring bold typography, smooth animations, and a clean minimalist aesthetic.

## Features

- **Project Showcases**: Detailed pages for each project with overview, challenges, and solutions.
- **Interactive Work Archive**: A filterable grid of all past work.
- **Smooth Animations**: Powered by Framer Motion for a premium feel.
- **Contact Integration**: Fully functional contact form integrated with Google Sheets.
- **Dark/Light Mode**: Seamless theme switching for better accessibility.
- **Responsive Design**: Optimized for all screen sizes from mobile to ultra-wide desktops.

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS 4
- **Animations**: Motion (Framer Motion)
- **Icons**: Lucide React
- **Routing**: React Router 7

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd creative-portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add your Google Apps Script URL:
   ```env
   VITE_GOOGLE_APPS_SCRIPT_URL=your_apps_script_url_here
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Build for production:
   ```bash
   npm run build
   ```

## Contact Form Setup (Google Sheets)

To enable the contact form:
1. Create a new Google Sheet.
2. Go to **Extensions > Apps Script**.
3. Paste the provided Apps Script code (found in the project documentation).
4. Deploy as a Web App (set access to "Anyone").
5. Copy the Web App URL and add it to your `.env` file as `VITE_GOOGLE_APPS_SCRIPT_URL`.

## License

This project is licensed under the Apache-2.0 License.
