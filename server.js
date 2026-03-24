import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/api/prompt-sections', async (req, res) => {
  try {
    const sections = await prisma.promptSection.findMany({ orderBy: { order: 'asc' } });
    res.json(sections);
  } catch (error) {
    console.error('Failed to load prompt sections:', error.message);
    res.status(500).json({ error: 'Unable to load prompt sections.' });
  }
});

app.get('/api/prompt-meta', (req, res) => {
  res.json({
    title: 'Via Prompt Atlas',
    subtitle: 'A readable map of the system instructions shaping Via’s coding behavior.',
    highlights: [
      'Autonomous repo-aware coding agent',
      'Strict validation and smoke testing',
      'Opinionated React + Express + Prisma stack',
    ],
  });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

app.listen(process.env.PORT || 3001, () => {
  console.log('Server listening on port 3001');
});
