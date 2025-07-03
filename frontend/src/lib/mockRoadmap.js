import { FolderKanban } from 'lucide-react';

const mockRoadmap = {
  title: 'Web Development Launchpad',
  goalSummary: 'Start from scratch and become a proficient web developer by the end of your first year in college, focusing on HTML, CSS, JavaScript, and building real projects.',
  resumeInsights: {
    identifiedSkills: ['Basic Computer Skills', 'Problem Solving'],
    analysisAndSuggestions: [
      "You have a solid foundation in basic computer usage and problem solving from your high school coursework.",
      "Consider joining coding clubs or online communities to build your network and get peer support.",
      "Start documenting your learning journey in a portfolio website as you progress."
    ]
  },
  weeklyCommitment: '6 Hours',
  timeline: [
    {
      type: 'module',
      week: 1,
      title: 'Getting Started with the Web',
      tasks: [
        { title: 'Course: Introduction to Web Development (freeCodeCamp)', time: '2h', type: 'course', completed: false, reason: 'This course gives you a gentle introduction to how the web works and what web developers do.', url: 'https://www.freecodecamp.org/learn' },
        { title: 'Article: How the Internet Works', time: '1h', type: 'article', completed: false, reason: 'Understanding the basics of the internet is crucial for web development.' },
        { title: 'Practice: Set Up Your First GitHub Account', time: '1h', type: 'project', completed: false, reason: 'Version control is a must-have skill for developers. GitHub is the industry standard.' },
      ]
    },
    {
      type: 'module',
      week: 2,
      title: 'HTML & CSS Fundamentals',
      tasks: [
        { title: 'Course: HTML Basics (MDN Web Docs)', time: '2h', type: 'course', completed: false, reason: 'HTML is the backbone of every web page. MDN is a trusted resource.', url: 'https://developer.mozilla.org/en-US/docs/Learn/HTML' },
        { title: 'Course: CSS Basics (MDN Web Docs)', time: '2h', type: 'course', completed: false, reason: 'CSS lets you style your web pages and make them visually appealing.', url: 'https://developer.mozilla.org/en-US/docs/Learn/CSS' },
        { title: 'Project: Build a Personal Homepage', time: '2h', type: 'project', completed: false, reason: 'Applying your knowledge in a real project cements your learning.' },
      ]
    },
    {
      type: 'milestone',
      week: 3,
      title: 'Milestone: Publish Your First Website',
      description: "Deploy your personal homepage using GitHub Pages. Share the link with friends or on your resume.",
      icon: FolderKanban,
      project: {
        techStack: ['HTML', 'CSS', 'GitHub Pages'],
        requirements: [
          'Responsive design',
          'About Me section',
          'Project showcase',
          'Contact form (optional)'
        ],
        nextSteps: [
          'Share your site on LinkedIn',
          'Add to your resume',
          'Ask for feedback from peers'
        ]
      }
    },
    {
      type: 'module',
      week: 4,
      title: 'JavaScript Essentials',
      tasks: [
        { title: 'Course: JavaScript Basics (Codecademy)', time: '2h', type: 'course', completed: false, reason: 'JavaScript is the language of the web. Start with the basics.', url: 'https://www.codecademy.com/learn/introduction-to-javascript' },
        { title: 'Video: JavaScript in 100 Seconds (Fireship)', time: '0.5h', type: 'video', completed: false, reason: 'Quick, high-level overview to reinforce concepts.', url: 'https://www.youtube.com/watch?v=DHjqpvDnNGE' },
        { title: 'Practice: Simple Calculator App', time: '1.5h', type: 'project', completed: false, reason: 'Building a calculator is a classic beginner project that covers variables, functions, and user input.' },
      ]
    },
    {
      type: 'module',
      week: 5,
      title: 'Responsive Design & Next Steps',
      tasks: [
        { title: 'Course: Responsive Web Design (freeCodeCamp)', time: '2h', type: 'course', completed: false, reason: 'Learn how to make your websites look good on any device.', url: 'https://www.freecodecamp.org/learn/responsive-web-design/' },
        { title: 'Article: What is a Frontend Framework?', time: '1h', type: 'article', completed: false, reason: 'Get a sense of what comes next after the basics.' },
        { title: 'Project: Make Your Homepage Responsive', time: '1.5h', type: 'project', completed: false, reason: 'Apply your new skills to improve your earlier project.' },
      ]
    },
    {
      type: 'milestone',
      week: 6,
      title: 'Milestone: Portfolio Launch',
      description: "Create and deploy a simple portfolio site to showcase your projects and track your progress.",
      icon: FolderKanban,
      project: {
        techStack: ['HTML', 'CSS', 'JavaScript', 'Netlify'],
        requirements: [
          'Multiple project entries',
          'Blog or updates section',
          'Contact/social links',
          'Deployed on Netlify or Vercel'
        ],
        nextSteps: [
          'Apply for internships',
          'Start freelancing on Upwork or Fiverr',
          'Contribute to open source on GitHub'
        ]
      }
    },
    {
      type: 'milestone',
      week: 7,
      title: 'Career Action: Start Freelancing',
      description: "Leverage your new skills to earn real-world experience and income.",
      icon: FolderKanban,
      project: {
        techStack: ['HTML', 'CSS', 'JavaScript'],
        requirements: [
          'Create a profile on Upwork/Fiverr',
          'Bid on beginner web projects',
          'Deliver your first freelance project'
        ],
        nextSteps: [
          'Collect testimonials',
          'Build a freelance portfolio',
          'Increase your rates as you gain experience'
        ]
      }
    },
  ],
  postAnalysis: {
    skillsLearned: [
      'HTML & CSS',
      'Responsive Design',
      'JavaScript Fundamentals',
      'Version Control (Git)',
      'Portfolio Building',
      'Deploying Websites',
      'Freelancing Basics'
    ],
    recommendedNext: [
      'Apply for web development internships',
      'Start freelancing on Upwork/Fiverr',
      'Contribute to open source projects',
      'Build more advanced JavaScript/React projects',
      'Prepare for technical interviews'
    ]
  }
};

export default mockRoadmap; 