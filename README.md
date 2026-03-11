# Achaia Wood Shop Website - Frontend

This repository contains the frontend React code for the new Achaia Wood Shop website, a digital platform for a local business in Greece. It is built using **React**, **Tailwind CSS**, **Framer Motion**, and **TypeScript**, with the goal of providing a modern, dynamic, and extremely premium user experience.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Local Development](#local-development)
- [Deployment (Free)](#deployment-free)
- [License & Contact](#license--contact)

## Features

- **Dynamic Landing Page**: Smooth, animated landing page built with Framer Motion.
- **Service & Product Showcase**: View real-time woodworking products and supplies.
- **Secure Admin Portal**: Included hidden portal (accessed via the Footer text) that communicates securely with the `achaia-wood-api` backend to **Add, Edit, and Delete** products.
- **Fully Responsive Design**: Mobile-first architecture ensures perfection on phones, tablets, and desktops using Tailwind utility classes.

## Technologies

- **React.js**: A JavaScript library for building user interfaces.
- **TypeScript**: A typed superset of JavaScript that catches errors at compile-time.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI styling.
- **Framer Motion**: Powerful animation library for React that drives the glass-panel aesthetics and smooth transitions.
- **Axios**: A promise-based HTTP client used for connecting to the API backend.
- **React Router**: Client-side routing for navigating pages.
- **Lucide React**: Beautiful scalable vector icons.

## Local Development

1. **Clone the repo**
   ```bash
   git clone https://github.com/kuriakosant/achaia-wood-shop-website-react.git
   cd achaia-wood-shop-website-react
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Environment Variables**
   Create a `.env` file and point it to your local or remote backend:
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   ```
4. **Start the server**
   ```bash
   npm start
   ```

## Deployment (Free)

This application is ready to be hosted for free on **Vercel** or **Cloudflare Pages**.
1. Import this GitHub repository into Vercel.
2. In the Vercel Dashboard, go to Settings -> Environment Variables.
3. Add `REACT_APP_API_URL` and set it to your live Backend API URL (e.g. `https://your-backend-render.com/api`).
4. Click **Deploy**.

## License & Contact

This project is licensed under a Proprietary License - see the [LICENSE](LICENSE) file for details. Commercial use is not permitted without explicit permission.

For any inquiries, please contact:
- **Name:** Kyriakos Antoniadis
- **Email:** kuriakosant2003@gmail.com
- **LinkedIn:** [Kyriakos Antoniadis](https://www.linkedin.com/in/kyriakos-antoniadis-288444326/)