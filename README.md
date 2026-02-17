
<p align="center">
  <img src="https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&q=80&w=200" width="120" alt="Sportfly Logo" style="border-radius: 32px; box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1);"/>
</p>

# ⚽ Sportfly: Tu Pasaporte Elite a la Liga MX

**Sportfly** es la plataforma de logística integral definitiva para el aficionado al fútbol mexicano. No solo vendemos boletos; sincronizamos **vuelos**, **hoteles** y **entradas oficiales** en una sola transacción segura, optimizada por Inteligencia Artificial.

[![Vercel Deployment](https://img.shields.io/badge/Deploy-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com)
[![React 19](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://react.dev)
[![Gemini IA](https://img.shields.io/badge/AI-Google_Gemini-blue?style=for-the-badge&logo=google-gemini)](https://aistudio.google.com)

---

## ✨ Características Principales

- **🛡️ Sincronización Total:** Reserva el combo completo (Vuelo + Estadio + Hotel) sin salir de la app.
- **🤖 Itinerarios Inteligentes:** Generación de planes de viaje personalizados por ciudad usando **Google Gemini 2.5**.
- **🎫 Bóveda Digital (Wallet):** Acceso offline a códigos QR para entradas de estadio y pases de abordar.
- **📈 Radar de Precios:** Monitoreo en tiempo real para detectar bajadas de precio en vuelos de liguilla.
- **💎 Membresía Premium:** Acceso a preventas, 10% de descuento en vuelos y cero comisiones de gestión.

---

## 🛠️ Stack Tecnológico

| Tecnología | Propósito |
| :--- | :--- |
| **React 19** | Interfaz de usuario reactiva y componentes de última generación. |
| **Tailwind CSS** | Estética deportiva "Modern Dark/Light" y diseño responsivo. |
| **Google Gemini SDK** | Motor de búsqueda de paquetes y generación de itinerarios. |
| **Capacitor 6** | Bridge nativo para distribución en Google Play y App Store. |
| **TypeScript** | Arquitectura robusta y tipado estricto para transacciones. |
| **Vite** | Bundler de alto rendimiento para desarrollo instantáneo. |

---

## 🚀 Guía de Inicio Rápido

### Requisitos Previos
- Node.js 18.x o superior.
- API Key de [Google AI Studio](https://aistudio.google.com/).

### Configuración Local

1. **Clonar y Preparar:**
   ```bash
   git clone https://github.com/tu-usuario/sportfly.git
   cd sportfly
   npm install
   ```

2. **Variables de Entorno:**
   Crea un archivo `.env` en la raíz:
   ```env
   VITE_API_KEY=tu_clave_de_gemini
   ```

3. **Lanzar Desarrollo:**
   ```bash
   npm run dev
   ```

---

## 🌍 Despliegue en Vercel (Producción)

Sportfly está optimizado para **Vercel Edge Network**:

1. Sube tu código a GitHub.
2. En Vercel, importa el proyecto.
3. **Configuración Crucial**: Añade la variable `API_KEY` en `Settings > Environment Variables`.
4. El despliegue será automático en cada `push` a la rama principal.

---

## 📱 Compilación para Móvil

Para transformar esta web app en una aplicación nativa:

```bash
# 1. Generar los archivos de distribución
npm run build

# 2. Sincronizar con plataformas nativas
npx cap add android # o ios
npx cap copy
npx cap open android # Abre Android Studio
```

---

## 📐 Estructura del Proyecto

- `/components`: UI Atómica (Headers, Modales, Cards).
- `geminiService.ts`: Lógica de integración con la IA.
- `types.ts`: Contratos de datos (SportEvent, TravelPackage, UserProfile).
- `constants.ts`: Reglas de negocio, comisiones y base de datos de proveedores.

---

## 📄 Licencia y Contacto
© 2026 Sportfly México. Todos los derechos reservados.  
Diseñado para la comunidad futbolera de México. 🇲🇽

<p align="center">
  <b>Hecho con 💙 por el equipo de Sportfly</b>
</p>
