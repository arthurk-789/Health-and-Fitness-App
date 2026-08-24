# NutriPanel

A full-stack health and fitness dashboard with practical tools for nutrition lookup, macro planning, meal building, and calories burned estimates.

## Tech Stack

**Frontend:** React, JavaScript, React Router, Vite, Tailwind CSS  
**Backend:** Node.js, Express, Axios, CORS, Dotenv 

## Features

- **Nutrition Lookup**: Search foods by item, quantity, and unit.
- **Macro Calculator**: Estimate daily calories and macro targets.
- **Meal Builder**: Add foods, view meal totals, and remove items.
- **Calories Burned**: Estimate calories burned by activity, weight, and duration.
- **Search Caching**: Reuses recent nutrition results to avoid duplicate API calls.
- **UI States**: Reusable loading, error, empty, and success states.
- **Light/Dark Mode**: Global theme support.

## Experience

- Clean, SaaS-style dashboard interface
- Simple and focused user experience
- Modular tool-based layout
- Responsive design with light/dark mode
- Centralized styling with reusable UI patterns

## Architecture

```txt
client/   React frontend
server/   Express backend
