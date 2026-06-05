# CryptoSpace – Architecture Overview

## Architecture Style
- Monolithic backend
- Background workers for async processing

## Core Components

- **API Server**
  - REST APIs
  - WebSocket server
  - Authentication

- **Background Workers**
  - Fetch crypto prices
  - Evaluate price alerts
  - Trigger notifications

- **PostgreSQL**
  - Users
  - Alerts
  - Alert history
  - Price snapshots

- **Redis**
  - Price caching
  - Job queues (BullMQ)
  - Short-lived locks

## Design Decisions

- Redis used to reduce external API calls
- Workers used to isolate heavy processing
- WebSockets used for real-time notifications
- JWT-based authentication
- Simple monolith to optimize development speed

## alert enginine and realtime notification

Price Worker
    ↓
Redis Cache

Alert Worker
    ↓
alert_history
    ↓
Redis Pub/Sub

API Server
    ↓
Socket.IO

Frontend
    ↓
Realtime Notification

## full-system architecture

CoinGecko
     ↓
Price Worker
     ↓
Redis Cache
     ↓
Postgres Snapshots

Redis Cache
     ↓
Alert Worker
     ↓
alert_history
     ↓
Redis Pub/Sub
     ↓
API Server
     ↓
Socket.IO
     ↓
User Room
     ↓
Frontend