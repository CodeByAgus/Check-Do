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

## 2026-10-22 — Rediseño: formato "Mis tareas" azul y blanco

Se reemplazó el estilo de vidrio por un diseño basado en una imagen de referencia (pantalla principal + pantalla de crear tarea).

- **Pantalla principal** (`HomeScreen`): encabezado blanco con esquina curva, título, botón +, fecha de hoy y franja de días; debajo, tarjetas blancas sobre fondo azul con una línea de tiempo a la izquierda.
- **Franja de días** (`DayStrip`): hoy + 13 días, punto en los días con tareas, filtra por día al tocar.
- **Tarjeta** (`TaskCard`): icono de categoría, nombre, descripción; el recuadro de plazo (con color de urgencia) queda en la esquina inferior derecha. Mantiene el ciclo días → semanas → meses → fecha, ▲▼ y ✕.
- **Pantalla Nueva tarea** (`CreateTaskScreen`): nombre, categoría (`CategoryChips`), fecha con el calendario, descripción y botón "Crear tarea". Reemplaza a la barra de arriba.
- **Modelo de tarea**: se agregaron `description` y `category`. Las tareas guardadas antes siguen funcionando (categoría por defecto).
- `App.js` ahora guarda las tareas y alterna entre las dos pantallas (sin librería de navegación).
- `CalendarPicker` y la web instalable (fondo, íconos, nombre **Check-Do**, barra de estado de iPhone) se adaptaron a los colores nuevos.
- Se eliminaron `GlassCard`, `GlassBackground`, `AddTaskBar`, `TaskRow` y las dependencias `expo-blur` y `expo-linear-gradient`.
- No se copiaron del diseño de referencia: menú, campana y avatar (no tendrían función) ni las horas de inicio/fin (la app trabaja con fecha de vencimiento).
- Probado en web con vista de móvil: pantalla principal, crear tarea con categoría, calendario y descripción, filtro por día (30/10 → 1 tarea) y la tarea antigua migrada. La exportación web compila.
- No probado en un teléfono real.

## 2026-10-22 — Calendario y fecha en el chip

- Nuevo `src/components/CalendarPicker.js`: calendario mensual pequeño (lunes primero, mes anterior/siguiente, hoy con borde, día elegido resaltado). Sin librerías, igual en móvil y web.
- `AddTaskBar.js`: se reemplazó el campo de texto por un botón con la fecha (`📅 dd/mm/aaaa`) que abre el calendario; al elegir un día se cierra. Se mantiene el aviso "Faltan N d".
- El chip ahora recorre 4 vistas al tocarlo: días → semanas → meses → **fecha (dd/mm/aaaa)** → días.
- `dates.js`: se eliminaron `maskDMY`, `parseDMY` y `tomorrowDMY` (ya no se escribe la fecha a mano); se agregaron `tomorrow`, `formatChip`, `monthCells` y `MONTH_NAMES`.
- Corrección de diseño: el degradado no llenaba el alto de la pantalla y las burbujas decorativas causaban scroll horizontal (`App.js`, `GlassBackground.js`, `public/index.html`).
- Probado en web: calendario de octubre 2026 correcto, 15/11/2026 da "Faltan 24 d" desde el 22/10, y el chip recorre `24 d → 3 sem → 1 mes → 15/11/2026 → 24 d`.
- No probado en un teléfono real.

## 2026-10-20 — Fecha en formato dd/mm/aaaa

- `src/utils/dates.js`: `maskDMY` (inserta las barras al escribir), `parseDMY` (valida que sea una fecha real, rechaza 31/02), `formatDMY`, `tomorrowDMY`. Se eliminó `addDays`.
- `AddTaskBar.js`: el selector de días cambió por un campo de fecha, con "mañana" como valor inicial y un aviso en vivo ("Faltan 66 d", "Vence hoy", "Vencida hace N d", "Fecha no válida"). Si la fecha no es válida la tarea no se agrega.
- `useTasks.js`: `addTask(title, due)` ahora recibe la fecha ya convertida; los días restantes se calculan siempre desde esa fecha.
- Probado en web: `31/02/2026` se rechaza; `25/12/2026` muestra 66 días y la tarea queda con `66 d`.
- Las tareas guardadas antes de este cambio siguen funcionando: ya guardaban la fecha de vencimiento.

## 2026-10-20 — Web instalable para iPhone (PWA)

- `public/manifest.json`, íconos (`icon-192/512.png`, `apple-touch-icon.png`) y `public/index.html` con ajustes de iPhone.
- `public/sw.js`: service worker que guarda la app en el dispositivo; `App.js` lo registra solo en web.
- `vercel.json`: compila con `npx expo export --platform web` y publica `dist`.
- Probado: tras una visita con conexión, con el servidor apagado la página recargó y mostró la app.
- Repositorio git local creado. La subida a GitHub y el despliegue en Vercel los hace el dueño de la cuenta.
- No probado en un iPhone real: la instalación desde Safari queda por confirmar.
