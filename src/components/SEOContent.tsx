import React from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: 'What is Brainrot Reflex Test?',
    answer:
      'Brainrot Reflex Test is a free 30-second online reaction game designed to test your visual attention and finger speed. Players receive rapid-fire prompts (such as "TAP THE GREEN GREMLIN" or "FIND THE SUS FACE") and must locate and tap the correct emoji target among chaotic decoys before the clock expires.',
  },
  {
    question: 'How are reaction scores calculated?',
    answer:
      'Every correct target awards 100 base points plus a multiplier based on your active combo streak (+15 per combo level). Tapping targets within 600 milliseconds grants an additional rapid-reflex bonus of 25 points. Tapping the wrong target breaks your combo and subtracts 50 points, while rare golden bonus stars award 250 extra points.',
  },
  {
    question: 'Why does the game get faster and harder as the timer counts down?',
    answer:
      'The reflex test implements dynamic difficulty scaling. In the first 8 seconds, you face 4 targets. Between 22 and 14 seconds remaining, target count increases to 5-6 with subtle jitter. In the final 14 seconds, up to 9 targets clutter the arena and scale down in size, demanding maximum peripheral vision and rapid cognitive inhibition.',
  },
  {
    question: 'Is this game a medical reaction time assessment?',
    answer:
      'No. Brainrot Reflex Test is built strictly for entertainment, casual reflex practice, and friendly competition. While it exercises visual processing speed and motor coordination, scores are influenced by your touch screen hardware, frame rates, and finger dexterity. It is not a clinical or medical neurological test.',
  },
  {
    question: 'Can I play Brainrot Reflex Test on mobile devices?',
    answer:
      'Yes! The game is fully responsive and touch-optimized for Android smartphones, iPhones, iPads, tablets, and desktop browsers. Touch targets are generously sized with zero double-tap delay for instantaneous responsiveness.',
  },
  {
    question: 'Where is my highest score saved?',
    answer:
      'Your high score and sound settings are saved directly in your web browser using HTML5 localStorage. No user accounts, logins, or server tracking are required, keeping the experience 100% private and immediate.',
  },
];

export const SEOContent: React.FC = () => {
  // Structured Data JSON-LD for Search Engines
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Brainrot Reflex Test',
        applicationCategory: 'GameApplication',
        operatingSystem: 'Any',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description:
          'Play Brainrot Reflex Test, a free 30-second reaction game. Tap the right targets, build combos and beat your high score.',
      },
      {
        '@type': 'FAQPage',
        mainEntity: FAQS.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};
