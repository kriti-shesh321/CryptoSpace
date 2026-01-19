# CryptoSpace

CryptoSpace is a real-time crypto price alert system built to demonstrate
production-style backend architecture including caching, background workers,
and WebSocket-based notifications.


## Tech Stack

**Frontend**
- React
- Tailwind CSS
- Socket.IO client

**Backend**
- Node.js + TypeScript
- Express
- PostgreSQL
- Redis
- BullMQ (background jobs)
- Socket.IO (real-time)

## Architecture (High Level)

- Monolithic backend with background workers
- Redis used for caching and job queues
- PostgreSQL used for persistent storage
- Workers fetch prices and evaluate alerts
- Real-time alerts delivered via WebSockets

## Completed Features

- User authentication back-end module (register, login, JWT middleware)

## Upcoming Features

- Price alerts with cooldown & deduplication
- Background price fetch worker
- Real-time alert notifications
- Basic metrics and monitoring