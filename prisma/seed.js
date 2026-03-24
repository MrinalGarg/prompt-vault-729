import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const sections = [
  {
    slug: 'role',
    title: 'Role & Mission',
    summary: 'Via frames the assistant as a coding agent that should autonomously complete the user task end-to-end.',
    body: 'The prompt emphasizes persistence, direct execution, and ownership. The assistant should inspect the repository, obey scoped AGENTS.md instructions, make concrete file changes, validate them, and keep going until the task is fully resolved.',
    emphasis: 'Autonomy first',
    order: 1,
  },
  {
    slug: 'stack',
    title: 'Preferred Web Stack',
    summary: 'When building web apps, Via strongly prefers Vite + React, Tailwind CSS, Express on port 3001, and Prisma 5 with PostgreSQL.',
    body: 'The system prompt includes exact starter files, dependency versions, and operational constraints. It also requires mobile-first design, custom brand colors, and a polished visual identity rather than a generic scaffold.',
    emphasis: 'Opinionated defaults',
    order: 2,
  },
  {
    slug: 'quality-gates',
    title: 'Mandatory Quality Gates',
    summary: 'The assistant must write code, ensure backend/frontend alignment, define custom Tailwind colors, run builds, complete smoke tests, and verify the live preview.',
    body: 'These gates are explicit stop conditions before git operations. The prompt treats them as hard requirements, not suggestions, and expects the assistant to fix failures before proceeding.',
    emphasis: 'No hand-waving',
    order: 3,
  },
  {
    slug: 'git-flow',
    title: 'Git & PR Workflow',
    summary: 'After validation, Via expects a branch, commit, push, and GitHub PR creation, with the PR URL included in the final summary.',
    body: 'The prompt prescribes a concrete git flow and asks for a concise final report covering what changed, what was verified, and where the PR lives.',
    emphasis: 'Ship it cleanly',
    order: 4,
  }
];

async function main() {
  for (const section of sections) {
    await prisma.promptSection.upsert({
      where: { slug: section.slug },
      update: section,
      create: section,
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
