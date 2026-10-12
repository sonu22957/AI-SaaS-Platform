async function startFrontendServer() {
  const { createServer } = await import("vite");
  const server = await createServer();

  await server.listen();
  server.printUrls();
}

startFrontendServer().catch((error) => {
  console.error("Failed to start the frontend development server:", error);
  process.exitCode = 1;
});