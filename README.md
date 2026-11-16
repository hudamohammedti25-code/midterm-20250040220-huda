# Coffee Shop Menu API

- **Name:** Huda Mohammed Shueai Gamil Mohammed
- **NIM:** 20250040220
- **Theme:** Coffee shop menu (`/menus`)

## How to run
```bash
npm install
npm run dev
```
Server runs on http://localhost:3000

## Routes
| Method | Path | Description | Success |
|--------|------|-------------|---------|
| GET | / | Welcome message | 200 |
| GET | /menus | List all items | 200 |
| GET | /menus/:id | Get one item (404 if not found) | 200 |
| POST | /menus | Add item (400 if a field is missing) | 201 |
| PUT | /menus/:id | Update item (404 if not found) | 200 |
| DELETE | /menus/:id | Delete item, needs header `x-auth-token: secret123` (else 401) | 200 |
| GET | /menus/category{/:name} | Filter by category, no name shows all | 200 |
| GET | /files/*path | Shows the wildcard path as a