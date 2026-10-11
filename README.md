# Tekno.Dev

Web app de Tekno.Dev. Landing institucional + (próximamente) Mini-CRM multiempresa:
gestión de contactos/clientes, tablero de ventas/pedidos, dashboard de métricas y
autenticación por roles.

## Stack

- **Vite** + **React** + **TypeScript**
- **Tailwind CSS v4** (`@tailwindcss/vite`, sin `postcss.config.js` ni `tailwind.config.js`)
- **Firebase** (Auth + Firestore) — cliente inicializado en `src/lib/firebase.ts`
- **react-router-dom** para el ruteo
- **lucide-react** para iconografía
- Deploy en **Vercel**

## Estructura

```
src/
  components/     # Componentes reutilizables (HeroPresentation.tsx, etc.)
    effects/      # ShaderBackground.tsx: fondo WebGL2 con luces que siguen el cursor
  pages/          # Páginas ruteadas (Home.tsx, y las que vengan: Login, Dashboard...)
  lib/
    firebase.ts   # Inicialización de Firebase (usa variables de entorno)
  App.tsx         # Definición de rutas
  main.tsx        # Entry point (BrowserRouter + StrictMode)
  index.css       # Import de Tailwind + utilidades custom (.glass-card)
```

## Primeros pasos

```bash
# 1. Instalar dependencias
npm install

# 2. Configurar variables de entorno de Firebase
cp .env.example .env.local
# completar .env.local con los valores del proyecto en Firebase Console

# 3. Levantar en desarrollo
npm run dev

# 4. Build de producción
npm run build
```

## Deploy

### 1. Subir a GitHub

```bash
git init -b main          # si todavía no es un repo git
git add .
git commit -m "Scaffold inicial Tekno.Dev"
git remote add origin https://github.com/<tu-usuario>/tekno.git
git push -u origin main
```

(Creá el repo vacío en GitHub primero, sin README/gitignore, para que no choque con el push.)

### 2. Publicar en Netlify

1. En Netlify: **Add new site → Import an existing project → GitHub** y elegí el repo.
2. Netlify va a detectar `netlify.toml` (build `npm run build`, publish `dist`, con el redirect
   para que el ruteo de `react-router-dom` funcione en refresh/deep links).
3. En **Site settings → Environment variables** cargá las mismas `VITE_FIREBASE_*` del `.env.example`.
4. Deploy. Cada push a `main` vuelve a desplegar automáticamente.

### Alternativa: Vercel

También sirve por si en algún momento se usa Vercel en vez de Netlify: `vercel.json` ya está
en el repo con el mismo redirect, e importar el proyecto ahí detecta Vite automáticamente.

## Estado actual

- [x] Landing / Hero con navbar (`HeroPresentation.tsx`)
- [x] Fondo con shader WebGL2 (luces reactivas al cursor, inspirado en recent.design)
- [x] Base del proyecto: Vite + TS + Tailwind v4 + Firebase + router
- [x] Demos de servicios con datos de ejemplo (sin backend, sin login):
  - `/demo/crm` — Mini-CRM: contactos con búsqueda/filtros + historial, tablero de pedidos (Kanban) con botón a WhatsApp, dashboard de métricas
  - `/demo/chatbot` — ChatBot con respuestas simuladas (no conectado a un modelo de IA real)
  - `/demo/turnos` — Turnero: selección de día/horario, reserva y confirmación
- [x] Sección "Proyectos Realizados" en la landing (Clínica Aurora, Hidalgo Gentlemen's Club)
- [x] Contacto real: email, teléfono y WhatsApp (sección "Contacto", footer y botón flotante global en `src/lib/contact.ts`)
- [ ] Login / roles (dueño y empleados)
- [ ] Mini-CRM real conectado a Firebase (multiempresa)
