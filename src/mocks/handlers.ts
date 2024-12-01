import { rest } from 'msw';
import type { RestRequest, ResponseComposition, RestContext } from 'msw';

export const handlers = [
  rest.post('/api/auth/login', (req: RestRequest, res: ResponseComposition, ctx: RestContext) => {
    const { username, password } = req.body as { username: string; password: string };
    
    if (username === 'testuser' && password === 'password123') {
      return res(
        ctx.status(200),
        ctx.json({
          token: 'fake-jwt-token',
          user: {
            name: 'Test User',
            email: 'testuser@example.com',
          },
        })
      );
    }

    return res(
      ctx.status(401),
      ctx.json({ error: 'Invalid credentials' })
    );
  }),

  rest.get('/login', (req, res, ctx) => {
    console.log(req.body);
    return res(
      ctx.status(200),
      ctx.json({ message: "Mocked /login response" })
    );
  }),
];
