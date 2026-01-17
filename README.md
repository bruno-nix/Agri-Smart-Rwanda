# Agri-Smart Rwanda

Agri-Smart Rwanda is an innovative web application designed to empower local farmers by providing them with the tools to get fair market prices for their produce. By leveraging the power of AI, this application helps bridge the information gap between farmers and the market, fostering a more transparent and equitable agricultural ecosystem in Rwanda.

## What it Does

The core purpose of Agri-Smart Rwanda is to solve a critical problem for farmers: a lack of access to timely and accurate information about crop quality and pricing. Our app provides two main functionalities:

1.  **AI-Powered Crop Analysis:** Farmers can take a photo of their crops (like tomatoes, potatoes, maize, etc.), and the application's AI will instantly analyze the image to determine a quality grade (A, B, or C) and suggest a fair market price per kilogram based on current market data, crop type, and location.

2.  **Digital Marketplace:** After analysis, farmers can choose to list their produce on a public marketplace. This connects them directly with potential buyers, creating more opportunities for sales and reducing reliance on intermediaries.

## Key Features

*   **Instant Crop Grading:** AI-driven analysis of crop photos.
*   **Dynamic Price Suggestions:** Fair market pricing based on quality, type, and location.
*   **Simple Marketplace Listing:** Easily post produce for sale after scanning.
*   **Browse Local Produce:** Buyers can view available fruits and vegetables from local farmers.
*   **Bilingual Interface:** Supports both English and Kinyarwanda to ensure accessibility for all users.

## Tech Stack

*   **Frontend:** [Next.js](https://nextjs.org/) (with App Router), [React](https://react.dev/), [TypeScript](https://www.typescriptlang.org/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/)
*   **Generative AI:** [Genkit](https://firebase.google.com/docs/genkit) (with Google's Gemini models)
*   **State Management:** React Context

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

*   [Node.js](https://nodejs.org/) (version 20 or later recommended)
*   [npm](https://www.npmjs.com/) (usually comes with Node.js)

### Installation

1.  **Clone the repository** (if you're working outside of an integrated environment like Firebase Studio):
    ```sh
    git clone <repository-url>
    cd <repository-name>
    ```

2.  **Install dependencies:**
    Open your terminal in the project root and run:
    ```sh
    npm install
    ```

### Environment Variables

The application uses Google's Gemini model for its AI features, which requires an API key.

1.  Create a new file named `.env` in the root of your project.
2.  Obtain a free API key from [Google AI Studio](https://aistudio.google.com/app/apikey).
3.  Add the key to your `.env` file:
    ```
    GEMINI_API_KEY=YOUR_API_KEY_HERE
    ```

### Running the Application

This project consists of two main parts that need to be run simultaneously in separate terminal windows: the Next.js frontend and the Genkit AI backend.

1.  **Start the Next.js Development Server:**
    ```sh
    npm run dev
    ```
    Your application will be available at [http://localhost:9002](http://localhost:9002).

2.  **Start the Genkit Development Server:**
    In a new terminal window, run:
    ```sh
    npm run genkit:dev
    ```
    This starts the local server that the Next.js app will call for AI-related tasks.

You should now have the full application running locally!
