# Weather Application with OpenWeather API

## Introduction

This project is a web application that interacts with the OpenWeather API to display weather information. Users can search for weather data by city name and optionally filter the results by a specific date range to view historical weather data. The application is built using **Next.js**, a React framework, and is designed to be responsive and user-friendly.

## Features

- **Search by City**: Enter a city name to retrieve current weather data.
- **Date Range Filter**: Optionally, select a date range to view historical weather data.
- **Responsive Design**: The application works seamlessly across different devices and screen sizes.
- **Error Handling**: Graceful handling of API errors and user-friendly error messages.
- **Optional Enhancements**:
  - Unit conversion between Celsius and Fahrenheit.
  - Caching to reduce API calls and improve performance.
  - Support for multiple languages (localization).
  - Weather forecasts for upcoming days.

---

## Technologies Used

- **Next.js**: A React framework for server-side rendering and static site generation.
- **React**: A JavaScript library for building user interfaces.
- **Tailwind CSS**: A utility-first CSS framework for styling.
- **OpenWeather API**: Provides weather data, including current weather, forecasts, and historical data.

---

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: Download and install from [nodejs.org](https://nodejs.org/).
- **npm**: Comes bundled with Node.js.

---

## Setup and Installation

1. **Clone the Repository**

   ```bash
   https://github.com/gaurav700/openweather.git
   cd openweather

2. **Install Dependencies**

    ```bash
    npm install

3. **Obtain an OpenWeather API Key**

- Sign up at OpenWeather and obtain an API key.

- Create a .env.local file in the root directory of your project and add your API key:

    - ‎OPENWEATHER_API_KEY=your_api_key_here

4. **Run the command**
    ```bash
    npm run dev
The application is available at https://openweather-one.vercel.app/
