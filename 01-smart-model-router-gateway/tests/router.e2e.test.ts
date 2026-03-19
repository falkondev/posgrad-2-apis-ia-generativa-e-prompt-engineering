import assert from "node:assert/strict"
import test from "node:test"
import { createServer } from "../src/server.ts"
import { config } from "../src/config.ts"
import { type LLMResponse, OpenRouterService } from "../src/openRouterService.ts"

console.assert(
    process.env.OPENROUTER_API_KEY,
    'OPENROUTER_API_KEY is not set in the env variables'
)

test.todo('routes to cheapest model by default', async () => {
    const customConfig = {
        ...config,
        provider: {
            ...config.provider,
            sort: {
                ...config.provider.sort,
                by: 'price',
            }
        }
    }

    const openRouterService = new OpenRouterService(customConfig);
    const app = createServer(openRouterService);

    const response = await app.inject({
        method: 'POST',
        url: '/chat',
        body: {
            question: 'What is rate limiting?'
        }
    });

    assert.equal(response.statusCode, 200);
    const body = response.json() as LLMResponse;
    assert.equal(body.model, 'arcee-ai/trinity-large-preview:free');
});
test.todo('routes to highest throughput by default', async () => {
    const customConfig = {
        ...config,
        provider: {
            ...config.provider,
            sort: {
                ...config.provider.sort,
                by: 'throughput',
            }
        }
    }

    const openRouterService = new OpenRouterService(customConfig);
    const app = createServer(openRouterService);

    const response = await app.inject({
        method: 'POST',
        url: '/chat',
        body: {
            question: 'What is rate limiting?'
        }
    });

    assert.equal(response.statusCode, 200);
    const body = response.json() as LLMResponse;
    assert.equal(body.model, 'nvidia/nemotron-3-nano-30b-a3b');
});
