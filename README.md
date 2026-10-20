# Glass Tasks

App de tareas con estilo **liquid glass** (vidrio translúcido, como en iPhone). Un solo código funciona en **Expo Go (móvil)** y en el **navegador (web)**.

## Qué hace

- **Barra superior** para agregar una tarea: nombre + fecha de vencimiento en formato `dd/mm/aaaa` (las barras se escriben solas). La app calcula cuántos días faltan.
- **Lista de barras horizontales**: nombre de la tarea y, a la derecha, un recuadro de color con el tiempo restante.
- **Tocar el recuadro** cambia la unidad: días → semanas → meses → días.
- **Orden**: por defecto la fecha más próxima primero. Con las flechas ▲▼ se mueve a mano; el texto "volver a fecha" restaura el orden automático.
- **Color del recuadro** según urgencia: rojo (vencida), naranja (0–2 días), amarillo (hasta 7), verde (hasta 30), azul (más de 30).

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
   - **Móvil:** escanear el QR con la app **Expo Go**.
   - **Web:** presionar `w` (o `npm run web`).

## Estructura de carpetas

```
App.js                 Raíz de la app
index.js               Punto de entrada
src/
  screens/             Pantallas completas (HomeScreen)
  components/          Piezas visuales reutilizables (vidrio, barra, fila)
  hooks/               Lógica de datos (useTasks)
  utils/               Funciones puras (cálculo de fechas)
  theme/               Colores en un solo lugar
docs/                  Documentación (cambios, decisiones)
assets/                Imágenes e íconos
```

## Dónde cambiar cosas

| Quiero cambiar…                  | Archivo                          |
| -------------------------------- | -------------------------------- |
| Colores / fondo                  | `src/theme/colors.js`            |
| Efecto de vidrio                 | `src/components/GlassCard.js`    |
| Cómo se agrega una tarea         | `src/components/AddTaskBar.js`   |
| Cómo se ve cada tarea            | `src/components/TaskRow.js`      |
| Reglas de orden y tareas         | `src/hooks/useTasks.js`          |
| Cálculo de días/semanas/meses    | `src/utils/dates.js`             |

Más detalle en [docs/CHANGELOG.md](docs/CHANGELOG.md) y [docs/DECISIONS.md](docs/DECISIONS.md).

## Usarla en iPhone sin wifi (web instalable)

La app se publica como web y se instala en la pantalla de inicio. Después de abrirla **una vez con internet**, funciona sin conexión y guarda las tareas en el teléfono.

1. Subir el proyecto a GitHub (repositorio propio).
2. En [vercel.com](https://vercel.com): *Add New → Project* → elegir el repositorio → *Deploy*. La configuración ya está en `vercel.json`.
3. En el iPhone, abrir la dirección de Vercel en **Safari** → botón Compartir → **Añadir a pantalla de inicio**.
4. Abrirla desde ese ícono. Listo: ya no necesita wifi.

Archivos que lo hacen posible: `public/manifest.json` (nombre e íconos), `public/sw.js` (copia local para modo offline), `public/index.html` (ajustes de iPhone) y `vercel.json` (cómo compilar).

> Las tareas se guardan por dispositivo y por dirección web: no se sincronizan entre teléfono y PC.
