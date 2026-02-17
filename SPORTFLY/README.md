
# Sportfly - Liga MX Travel App

Aplicación de logística integral para fans de la Liga MX, potenciada por IA (Google Gemini 2.5).

## 🚀 Despliegue Rápido en Vercel

1. **Subir a GitHub**: Sube estos archivos a un repositorio.
2. **Conectar a Vercel**: Importa el repositorio en Vercel.
3. **Configurar Variable de Entorno**: 
   - Ve a `Settings > Environment Variables`.
   - Agrega `API_KEY` con tu llave de [Google AI Studio](https://aistudio.google.com/).
4. **Listo**: Vercel detectará automáticamente que es un proyecto de Vite/React.

## 📱 Compilación Móvil (Capacitor)

Para generar la app de Android/iOS:
```bash
npm install
npm run build
npx cap add android
npx cap copy
npx cap open android
```

## 🛠️ Tecnologías
- **Frontend**: React 19 + Tailwind CSS
- **IA**: Google Gemini 2.5 SDK
- **Móvil**: Capacitor 6
- **Despliegue**: Vercel Edge Network
