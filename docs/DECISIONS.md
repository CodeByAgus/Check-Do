# Decisiones de diseño y técnicas

| Decisión | Motivo |
| -------- | ------ |
| Expo + `react-native-web` | Un solo código para Expo Go y navegador. |
| Diseño azul y blanco (antes vidrio) | Se adoptó el formato de una imagen de referencia. Al no usar desenfoque ni degradados se quitaron `expo-blur` y `expo-linear-gradient`: menos dependencias y mejor rendimiento. |
| Dos pantallas con un simple `useState` | No hace falta una librería de navegación para dos pantallas. Las tareas viven en `App.js` para no perderse al cambiar. |
| Filtro por día en la franja | Con fechas de vencimiento (no horas), tocar un día muestra lo que vence ese día. |
| Sin horas de inicio/fin ni menú/campana/avatar | La referencia los traía, pero la app no los usa; mejor no mostrar controles sin función. |
| Reordenar con flechas ▲▼ | Arrastrar requiere librerías extra y falla distinto en web/móvil. Las flechas son simples y funcionan igual en ambos. |
| Calendario propio (`CalendarPicker`) | Un selector de fecha nativo difiere entre móvil y web y las librerías añaden dependencias. Un calendario simple dibujado con la propia app se ve y se comporta igual en ambos, y evita errores de escritura. Los días restantes se calculan desde la fecha elegida, que se muestra como dd/mm/aaaa. |
| El chip tiene 4 vistas | Días, semanas, meses y fecha: el usuario elige cómo ver el plazo con un toque. |
| Unidad guardada por tarea | Cada tarea recuerda si se muestra en días, semanas o meses. |
| Datos guardados con AsyncStorage | Las tareas quedan en el dispositivo y la app no necesita internet. |
| Ancho máximo 560 px | En el navegador la app se ve como en un teléfono. |

## Próximos pasos sugeridos

- Generar un APK instalable para usarla sin PC ni wifi.
- Selector de fecha real.
- Arrastrar y soltar para reordenar.
- Marcar tareas como completadas.
