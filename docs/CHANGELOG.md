# Registro de pasos

## 2026-10-20 — Versión inicial

1. Se definió el diseño: estilo liquid glass, barra de agregar arriba, lista de barras con recuadro de tiempo.
2. Se creó la estructura de carpetas (`screens`, `components`, `hooks`, `utils`, `theme`, `docs`, `assets`).
3. `src/theme/colors.js`: paleta del fondo, vidrio y colores de urgencia.
4. `src/utils/dates.js`: cálculo de días restantes, formato (d / sem / mes) y color por urgencia.
5. `src/hooks/useTasks.js`: estado de tareas, orden por fecha o manual, cambio de unidad.
6. Componentes de vidrio: `GlassBackground`, `GlassCard`, `AddTaskBar`, `TaskRow`.
7. `src/screens/HomeScreen.js`: arma la pantalla única.
8. Documentación inicial (`README.md`, este archivo y `DECISIONS.md`).

## 2026-10-20 — Verificación en web

- `npm install` y `npx expo install --fix`: sin cambios, las versiones ya eran compatibles con Expo SDK 54.
- `npx expo export --platform web`: compila sin errores.
- Probado en el navegador: se ve el efecto de vidrio, el chip cambia 20 d → 3 sem al tocarlo, agregar una tarea la ordena por fecha, y mover con ▼ pasa a "Orden manual".
- Se agregó `.claude/launch.json` para iniciar la vista previa web.

## 2026-10-20 — Guardado local (funciona sin internet)

- Se instaló `@react-native-async-storage/async-storage`.
- `useTasks.js` carga las tareas y el modo de orden al abrir, y los guarda en cada cambio bajo la clave `glass-tasks:v1`.
- Se quitaron las tareas de ejemplo: la app inicia vacía la primera vez.
- Probado en web: tarea agregada con Enter, recarga de página y la tarea sigue ahí.

## Estado

- **No probado en Expo Go (móvil)**: hay que escanear el QR con el teléfono.
- El chip de meses (`mes`) no se vio en pantalla; la lógica está en `src/utils/dates.js`.
- Para abrirla en Expo Go el teléfono y el PC deben compartir red; instalar la app como APK (sin PC ni wifi) queda como paso futuro.

## 2026-10-20 — Web instalable para iPhone (PWA)

- `public/manifest.json`, íconos (`icon-192/512.png`, `apple-touch-icon.png`) y `public/index.html` con ajustes de iPhone.
- `public/sw.js`: service worker que guarda la app en el dispositivo; `App.js` lo registra solo en web.
- `vercel.json`: compila con `npx expo export --platform web` y publica `dist`.
- Probado: tras una visita con conexión, con el servidor apagado la página recargó y mostró la app.
- Repositorio git local creado. La subida a GitHub y el despliegue en Vercel los hace el dueño de la cuenta.
- No probado en un iPhone real: la instalación desde Safari queda por confirmar.
