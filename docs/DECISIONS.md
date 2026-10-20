# Decisiones de diseño y técnicas

| Decisión | Motivo |
| -------- | ------ |
| Expo + `react-native-web` | Un solo código para Expo Go y navegador. |
| `expo-blur` + `expo-linear-gradient` | Efecto de vidrio sin código nativo propio; funciona en web. |
| Reordenar con flechas ▲▼ | Arrastrar requiere librerías extra y falla distinto en web/móvil. Las flechas son simples y funcionan igual en ambos. |
| Fecha escrita como dd/mm/aaaa | Un selector de fecha nativo difiere entre móvil y web; un campo de texto con máscara se comporta igual en ambos. Los días restantes se calculan desde esa fecha. |
| Unidad guardada por tarea | Cada tarea recuerda si se muestra en días, semanas o meses. |
| Datos guardados con AsyncStorage | Las tareas quedan en el dispositivo y la app no necesita internet. |
| Ancho máximo 560 px | En el navegador la app se ve como en un teléfono. |

## Próximos pasos sugeridos

- Generar un APK instalable para usarla sin PC ni wifi.
- Selector de fecha real.
- Arrastrar y soltar para reordenar.
- Marcar tareas como completadas.
