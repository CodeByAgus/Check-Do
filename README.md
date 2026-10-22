# Check-Do

App de tareas con fechas de vencimiento. Un solo código funciona en **Expo Go (móvil)** y en el **navegador (web)**, y se puede instalar en el iPhone como web y usar **sin internet**.

## Qué hace

**Pantalla principal ("Mis tareas")**
- Encabezado blanco con el título, el botón **+** y la fecha de hoy.
- **Franja de días** (hoy y los 13 siguientes). Un punto marca los días con tareas. Tocar un día muestra solo las tareas que vencen ese día; tocarlo otra vez (o "ver todas") quita el filtro.
- **Tarjetas de tarea** sobre el fondo azul: icono de categoría, nombre, descripción y, en la esquina inferior derecha, un recuadro de color con el plazo.
- **Tocar el recuadro** cambia lo que muestra: días → semanas → meses → fecha (`dd/mm/aaaa`) → días.
- **Color del recuadro** según urgencia: rojo (vencida), naranja (0–2 días), amarillo (hasta 7), verde (hasta 30), azul (más de 30).
- **Orden**: por defecto la fecha más próxima primero. Para ordenar a mano, **arrastra una tarea desde su borde izquierdo (la espiral)**; "volver a fecha" restaura el orden automático. No se puede arrastrar mientras hay un día filtrado.

**Pantalla "Nueva tarea"**
- Nombre, categoría (Trabajo, Personal, Estudio, Hogar), fecha elegida en un **pequeño calendario** y descripción opcional.
- La app calcula cuántos días faltan y lo muestra al elegir la fecha.

## Cómo ejecutarla

1. Instalar [Node.js LTS](https://nodejs.org) (incluye `npm`). Reabrir la terminal.
2. En esta carpeta:

```bash
npm install
npx expo install --fix
npm run start
```

`expo install --fix` ajusta las versiones a la compatible con tu Expo Go.

3. En la terminal que aparece:
   - **Móvil:** escanear el QR con la app **Expo Go** (teléfono y PC en la misma red).
   - **Web:** presionar `w` (o `npm run web`).

## Estructura de carpetas

```
App.js                 Raíz: elige qué pantalla mostrar y guarda las tareas
index.js               Punto de entrada
src/
  screens/             Pantallas completas (HomeScreen, CreateTaskScreen)
  components/          Piezas visuales (DayStrip, TaskCard, SortableList, CategoryChips, CalendarPicker)
  hooks/               Lógica de datos (useTasks)
  utils/               Funciones puras (fechas)
  theme/               Colores y categorías en un solo lugar
public/                Archivos web: manifest, íconos, modo offline
docs/                  Documentación (cambios, decisiones)
assets/                Imágenes
```

## Dónde cambiar cosas

| Quiero cambiar…                       | Archivo                            |
| ------------------------------------- | ---------------------------------- |
| Colores y categorías                  | `src/theme/colors.js`              |
| Pantalla principal                    | `src/screens/HomeScreen.js`        |
| Formulario de nueva tarea             | `src/screens/CreateTaskScreen.js`  |
| Cómo se ve cada tarea y su recuadro   | `src/components/TaskCard.js`       |
| Franja de días                        | `src/components/DayStrip.js`       |
| Arrastrar para ordenar                | `src/components/SortableList.js`   |
| El calendario                         | `src/components/CalendarPicker.js` |
| Reglas de orden, guardado y tareas    | `src/hooks/useTasks.js`            |
| Cálculos y formato de fechas          | `src/utils/dates.js`               |

Más detalle en [docs/CHANGELOG.md](docs/CHANGELOG.md) y [docs/DECISIONS.md](docs/DECISIONS.md).

## Usarla en iPhone sin wifi (web instalable)

La app se publica como web y se instala en la pantalla de inicio. Después de abrirla **una vez con internet**, funciona sin conexión y guarda las tareas en el teléfono.

1. Subir el proyecto a GitHub (repositorio propio).
2. En [vercel.com](https://vercel.com): *Add New → Project* → elegir el repositorio → *Deploy*. La configuración ya está en `vercel.json`.
3. En el iPhone, abrir la dirección de Vercel en **Safari** → botón Compartir → **Añadir a pantalla de inicio**.
4. Abrirla desde ese ícono. Listo: ya no necesita wifi.

Archivos que lo hacen posible: `public/manifest.json` (nombre e íconos), `public/sw.js` (copia local para modo offline), `public/index.html` (ajustes de iPhone) y `vercel.json` (cómo compilar).

> Las tareas se guardan por dispositivo y por dirección web: no se sincronizan entre teléfono y PC.
