import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import path from "path";

export default defineConfig({
  plugins: [
    react(),
    tanstackRouter({
      routesDirectory:
        "./src/app/routes",
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@routes": path.resolve(__dirname, "./src/app/routes"),
      "@hooks": path.resolve(__dirname, "./src/presentation/hooks"),
      "@domain-types": path.resolve(__dirname, "./src/domain/types"),
      "@components": path.resolve(__dirname, "./src/presentation/components"),
      "@application-auth": path.resolve(__dirname, "./src/application/auth"),
      "@application-cart": path.resolve(__dirname, "./src/application/cart"),
      "@application-chat": path.resolve(__dirname, "./src/application/chat"),
      "@application-employees": path.resolve(__dirname, "./src/application/empolyees"),
      "@application-favorites": path.resolve(__dirname, "./src/application/favorites"),
      "@application-product": path.resolve(__dirname, "./src/application/product"),
      "@domain-interfaces": path.resolve(__dirname, "./src/domain/interfaces"),
      "@infrastructure-storage": path.resolve(__dirname, "./src/infrastructure/storage"),
      "@pages": path.resolve(__dirname, './src/presentation/pages'),
      "@layouts": path.resolve(__dirname, './src/presentation/layouts'),
    },
  },
})
