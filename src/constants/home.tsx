import { Ionicons } from '@expo/vector-icons';
import React from 'react';

export const FEATURES = [
  {
    icon: <Ionicons name="bulb" size={24} color="#ff8c00" />,
    title: 'AI-Powered Narratives',
    description:
      'Unique stories generated in real-time, adapting to your choices and playing style.',
  },
  {
    icon: <Ionicons name="book" size={24} color="#ff8c00" />,
    title: 'Rich Interactive Stories',
    description:
      'Manage inventory, track status effects, and make decisions that impact your journey.',
  },
  {
    icon: <Ionicons name="phone-portrait" size={24} color="#ff8c00" />,
    title: 'Cross-Platform',
    description:
      'Available on web and mobile devices - continue your story anywhere.',
  },
  {
    icon: <Ionicons name="person" size={24} color="#ff8c00" />,
    title: 'Personalized Experience',
    description:
      'Every decision shapes your unique narrative path and character development.',
  },
];

export const HOW_IT_WORKS_STEPS = [
  {
    number: '1',
    title: 'Choose your story theme and setting',
    description:
      'Select from various genres like fantasy, sci-fi, mystery, or create your own custom world.',
  },
  {
    number: '2',
    title: 'Create your character',
    description:
      "Customize your protagonist's traits, skills, and background story.",
  },
  {
    number: '3',
    title: 'Make meaningful choices',
    description:
      "Every decision shapes your story and affects your character's journey.",
  },
  {
    number: '4',
    title: 'Experience dynamic storytelling',
    description:
      'Watch as AI adapts the narrative based on your choices and playing style.',
  },
];

export const FEATURED_STORIES = [
  {
    title: 'The Crystal Prophecy',
    description:
      'A fantasy epic where magic and destiny collide in a world on the brink of chaos.',
    image: require('../assets/images/story1.jpg'),
  },
  {
    title: 'Space Colony Zero',
    description:
      "Lead humanity's first interstellar colony and face the unknown challenges of deep space.",
    image: require('../assets/images/story2.jpg'),
  },
  {
    title: "Detective's Dilemma",
    description:
      'Solve complex mysteries and uncover dark secrets in this noir-style thriller.',
    image: require('../assets/images/story3.jpg'),
  },
];
