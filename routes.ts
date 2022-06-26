import { Router, Request, Response } from 'express';
import { z } from 'zod';
import axios, { AxiosError } from 'axios';

import config from 'config';

const RAWG_KEY = config.get<string>('RAWG_KEY');

const router = Router();

router.get('/get', async (req: Request, res: Response) => {
  //Get all games released this year
  console.log('HIT');
  const allGames = await axios.get(
    `https://api.rawg.io/api/games?key=${RAWG_KEY}`
  );

  if (!allGames.data.results) {
    return res.status(500).json({ message: 'Could not fetch games' });
  }

  return res.status(allGames.status).json(allGames.data.results);
});

router.get('/get/:id', async (req: Request, res: Response) => {
  try {
    console.log('GET BY ID');
    const getByIdRequest = z.object({ id: z.string() });

    const { success } = getByIdRequest.safeParse(req.params);

    if (!success) {
      return res.status(400).json({ message: 'Invalid request' });
    }

    const { id } = req.params;

    const game = await axios.get(
      `https://api.rawg.io/api/games/${id}?key=${RAWG_KEY}`
    );

    return res.status(game.status).json(game.data);
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status == 404) {
        return res
          .status(error.response?.status)
          .json({ message: 'Game not found' });
      }
    }
  }
});

export default router;
