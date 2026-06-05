import { FastMCP } from "fastmcp";
import { z } from "zod";

const server = new FastMCP({
  name: "Demo Server",
  version: "1.0.0",
});

server.addTool({
  name: "saludar",
  description: "Saluda a una persona por su nombre",
  parameters: z.object({
    nombre: z.string().describe("El nombre de la persona a saludar"),
  }),
  execute: async ({ nombre }) => {
    return `¡Hola, ${nombre}! Bienvenido al servidor MCP.`;
  },
});

server.addTool({
  name: "sumar",
  description: "Suma dos números enteros",
  parameters: z.object({
    a: z.number().describe("Primer número"),
    b: z.number().describe("Segundo número"),
  }),
  execute: async ({ a, b }) => {
    const resultado = a + b;
    return `${a} + ${b} = ${resultado}`;
  },
});

server.addTool({
  name: "eco",
  description: "Devuelve el mismo mensaje recibido (eco)",
  parameters: z.object({
    mensaje: z.string().describe("El mensaje a repetir"),
  }),
  execute: async ({ mensaje }) => {
    return `Has dicho: "${mensaje}"`;
  },
});

await server.start({
  transportType: "httpStream",
  httpStream: {
    port: 3000,
    host: "127.0.0.1",
    stateless: true,
    enableJsonResponse: true,
  },
});
