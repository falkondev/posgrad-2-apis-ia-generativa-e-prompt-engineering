import { createServer } from "./server.ts";
import { OpenRouterService } from "./openRouterService.ts";

const routerService = new OpenRouterService()
const app = createServer(routerService);

await app.listen({ port: 3000, host: '0.0.0.0' });
console.log('Server is running on http://localhost:3000');

// app.inject({
//     method: 'POST',
//     url: '/chat',
//     payload: {
//         question: 'What is rate limiting?'
//     }
// }).then(response => {
//     console.log('Status code:', response.statusCode);
//     console.log('Response from /chat:', response.payload);
// })