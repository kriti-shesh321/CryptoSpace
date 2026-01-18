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

## Future Improvements

- Email notification provider integration
- Advanced alert types
- Service separation if scale increases