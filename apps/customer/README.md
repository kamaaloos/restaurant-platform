# Customer ordering app

Next.js 15 + React 19 + Tailwind + TanStack Query + Socket.IO + Zustand.

## Run

Backend must be on `http://localhost:3000`.

```bash
cd apps/customer
npm run dev
```

Open [http://localhost:3001](http://localhost:3001) or:

`http://localhost:3001/t/<qrToken>`

Demo token: `c295c2df-cc43-49bd-8bd5-5f7484fa9061`

## Flow

Menu → customize modifiers → cart → place order → live tracking → call waiter / request bill
