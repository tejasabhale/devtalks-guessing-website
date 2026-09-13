/** Mystery case data — swap speakers/images here for live events */

export const CASE_ID = 'DT-001'
export const CASE_FILE = 'CASE FILE #001'

export const mysterySpeaker = {
  id: 'speaker-a',
  name: 'Aarav Mehta',
  designation: 'Founder & Product Engineer',
  category: 'Product Builder',
  image: '/speakers/speaker-a.svg',
  description:
    'Builder of developer tools and campus-first products. Known for turning student ideas into shipping products.',
  clues: [
    {
      id: 1,
      evidenceLabel: 'EVIDENCE #01',
      text: 'Before becoming known for building products, this speaker started their journey by creating campus tech communities and teaching peers how to ship their first apps.',
      options: [
        { id: 'a', label: 'A. Building websites for local businesses' },
        { id: 'b', label: 'B. Creating campus tech communities' },
        { id: 'c', label: 'C. Working in investment banking' },
        { id: 'd', label: 'D. Competing in esports tournaments' },
      ],
      correctOptionId: 'b',
      hint: 'Their early influence came from organizing people, not writing code alone.',
    },
    {
      id: 2,
      evidenceLabel: 'EVIDENCE #02',
      text: 'This speaker is closely associated with developer tooling and once spoke about reducing the time between idea and first deployment for student builders.',
      options: [
        { id: 'a', label: 'A. Cybersecurity audits' },
        { id: 'b', label: 'B. Hardware robotics kits' },
        { id: 'c', label: 'C. Developer tooling & shipping speed' },
        { id: 'd', label: 'D. Game engine rendering' },
      ],
      correctOptionId: 'c',
      hint: 'Think “from idea to production” — not security or hardware.',
    },
    {
      id: 3,
      evidenceLabel: 'EVIDENCE #03',
      text: 'At previous college tech summits, audiences remember this speaker for an interactive live-build session rather than a traditional slide deck.',
      options: [
        { id: 'a', label: 'A. A 90-slide investor pitch' },
        { id: 'b', label: 'B. A silent code review livestream' },
        { id: 'c', label: 'C. An interactive live-build session' },
        { id: 'd', label: 'D. A panel on academic research only' },
      ],
      correctOptionId: 'c',
      hint: 'Students left having shipped something during the talk.',
    },
    {
      id: 4,
      evidenceLabel: 'EVIDENCE #04',
      text: 'Their public profile often highlights mentoring early-stage student founders and reviewing MVPs before first users.',
      options: [
        { id: 'a', label: 'A. Mentoring student founders & MVPs' },
        { id: 'b', label: 'B. Coaching professional athletes' },
        { id: 'c', label: 'C. Designing fashion campaigns' },
        { id: 'd', label: 'D. Writing fiction novels' },
      ],
      correctOptionId: 'a',
      hint: 'Campus startups and first product versions are the trail.',
    },
    {
      id: 5,
      evidenceLabel: 'EVIDENCE #05',
      text: 'The final piece of evidence: this speaker’s signature line at DevTalks events is about treating every campus project like a real product with real users.',
      options: [
        { id: 'a', label: 'A. “Ship homework, not products.”' },
        { id: 'b', label: 'B. “Every campus project deserves real users.”' },
        { id: 'c', label: 'C. “Avoid shipping until perfect.”' },
        { id: 'd', label: 'D. “Talks matter more than builds.”' },
      ],
      correctOptionId: 'b',
      hint: 'Real users — that is the through-line of their story.',
    },
  ],
}

/** Final guess candidates (include the true speaker) */
export const speakerCandidates = [
  {
    id: 'speaker-a',
    name: 'Aarav Mehta',
    designation: 'Founder & Product Engineer',
    category: 'Product Builder',
    image: '/speakers/speaker-a.svg',
  },
  {
    id: 'speaker-b',
    name: 'Ishaan Kapoor',
    designation: 'Open Source Maintainer',
    category: 'Systems Engineer',
    image: '/speakers/speaker-b.svg',
  },
  {
    id: 'speaker-c',
    name: 'Priya Nair',
    designation: 'AI Research Engineer',
    category: 'Machine Learning',
    image: '/speakers/speaker-c.svg',
  },
  {
    id: 'speaker-d',
    name: 'Rohan Desai',
    designation: 'Startup CTO',
    category: 'Infrastructure',
    image: '/speakers/speaker-d.svg',
  },
]

export const SCORE_RULES = {
  startingScore: 1000,
  correctClue: 100,
  incorrectClue: -50,
  hintCost: -100,
  finalCorrect: 500,
  finalIncorrect: 0,
  maxHints: 2,
}
