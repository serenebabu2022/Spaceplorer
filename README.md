# 🌌 Spaceplorer

A full-stack web application that allows users to explore NASA's space data through a modern and responsive React frontend connected to a Node.js + Express backend. Users can view stunning space imagery, explore asteroid data, and analyze space weather events using interactive visualizations, all powered by NASA’s Open APIs.

## 🚀 Deployment

App deployed at https://spaceplorer-ijto.onrender.com/

Frontend and backend is deployed seperately on [Render](https://render.com/)

## 📦 Features

### 🖼 Astronomy Picture of the Day (APOD)

- View the latest APOD image with its title and explanation.
- Search for APOD images by a specific date or date range.

### 🌠 Asteroids - NeoWs (Near Earth Object Web Service)

- View asteroids approaching Earth over the next 7 days.
- Explore asteroid data from the past or future.
- Search asteroids by their SPK-ID.
- Filter and highlight potentially hazardous asteroids.

### 🌞 Space Weather (DONKI API)

- **Interplanetary Shock Events (IPS)**: Visualize IPS events by year in a bar graph.
- **Solar Energetic Particle Events (SEP)**: View SEP data in an interactive line chart for any given year.

## 🛠️ Tech Stack

### Frontend

- **React** with modern hooks and functional components
- **Tailwind CSS** for responsive and clean UI
- **Recharts** for data visualization
- **Jest** and **React Testing Library** for unit and component testing

### Backend

- **Node.js** with **Express**
- Communicates with NASA APIs and forwards filtered data to the frontend

### APIs Used

- [APOD (Astronomy Picture of the Day)](https://api.nasa.gov/)
- [DONKI (Space Weather Notifications, Knowledge, Information)](https://api.nasa.gov/)
- [Asteroids - NeoWs (Near Earth Object Web Service)](https://api.nasa.gov/)

## ✅ Testing

All components are tested using Jest and React Testing Library

## 🧪 How to Run Locally

1. **Clone the repository**  
   git clone https://github.com/serenebabu2022/Spaceplorer.git

2. **Setup backend**  
   cd backend  
   npm install

3. **Setup frontend**  
   cd ../frontend  
   npm install

4. **Setup NASA_API_KEY**

   - Obtain API_KEY from NASA's website: https://api.nasa.gov/
   - Create a .env file inside the backend/ directory:
   - NASA_API_KEY=your_nasa_api_key

5. **Run backend**  
   cd backend  
   node index.js

6. **Run frontend**  
   cd frontend  
   npm start

7. **Testing**  
   npm test

8. **Test coverage**  
   npm run test:coverage

## Future Works - Data Optimisation

- NASA APIs have a limiation that it only allows 1000 requests per hour, which is not suitable for production
- Implement persistent storage by saving the data in a database such as Amazon DynamoDB for efficient and scalable querying.
- Set up a cloud-based data pipeline to keep the dataset up to date. For example, use a scheduled AWS cron job (CloudWatch Events) to fetch data daily from NASA APIs and store it in an Amazon S3 bucket, creating a reliable data lake.
- Record logs for successful data pulls and errors to maintain visibility into the pipeline’s health and track processing dates.
- Develop an AWS Lambda function to process and store the data from the S3 data lake into DynamoDB, enabling faster and easier queries.
