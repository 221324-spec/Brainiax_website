// Hiring Configuration
// Change this to true/false to show/hide hiring banner across the website

export const HIRING_CONFIG = {
  // Set to true when actively hiring, false when not
  isHiringOpen: true,
  
  // Customize the banner message
  bannerText: "We're Hiring!",
  
  // Badge text shown in navbar
  badgeText: "Join Us",
  
  // Job openings data
  jobOpenings: [
    {
      id: 1,
      title: 'Customer Service Representative',
      department: 'Inbound Operations',
      location: 'On-site',
      type: 'Full-time',
      salary: 'Competitive',
      description: 'Handle inbound customer calls, resolve inquiries, and provide excellent service. Perfect for freshers with good communication skills.',
      requirements: [
        'Excellent communication skills in English',
        'Basic computer knowledge',
        'Ability to work in shifts',
        'Positive attitude and patience',
        'Intermediate or higher education'
      ],
      benefits: ['Training provided', 'Performance bonuses', 'Health insurance']
    },
    {
      id: 2,
      title: 'Telemarketing Executive',
      department: 'Outbound Sales',
      location: 'On-site',
      type: 'Full-time',
      salary: 'Base + Commission',
      description: 'Make outbound calls to potential customers, generate leads, and close sales. Great earning potential for motivated individuals.',
      requirements: [
        'Strong persuasion and negotiation skills',
        'Target-oriented mindset',
        'Previous sales experience preferred',
        'Fluent in English and Urdu',
        'Comfortable with cold calling'
      ],
      benefits: ['Unlimited commission', 'Sales incentives', 'Career growth']
    },
    {
      id: 3,
      title: 'Team Lead - Customer Support',
      department: 'Operations',
      location: 'On-site',
      type: 'Full-time',
      salary: 'Competitive + Bonus',
      description: 'Lead a team of customer service agents, monitor performance, and ensure quality standards are met.',
      requirements: [
        'Minimum 2 years call center experience',
        'Previous team management experience',
        'Strong leadership and coaching skills',
        'Excellent problem-solving abilities',
        'Knowledge of call center metrics'
      ],
      benefits: ['Leadership training', 'Performance bonus', 'Health coverage']
    },
    {
      id: 4,
      title: 'Quality Analyst',
      department: 'Quality Assurance',
      location: 'On-site',
      type: 'Full-time',
      salary: 'Competitive',
      description: 'Monitor and evaluate call quality, provide feedback to agents, and help improve overall service standards.',
      requirements: [
        'Experience in call center QA',
        'Attention to detail',
        'Strong analytical skills',
        'Excellent written communication',
        'Familiarity with QA tools and metrics'
      ],
      benefits: ['Fixed schedule', 'Professional development', 'Health insurance']
    },
    {
      id: 5,
      title: 'HR Executive',
      department: 'Human Resources',
      location: 'On-site',
      type: 'Full-time',
      salary: 'Competitive',
      description: 'Handle recruitment, onboarding, employee relations, and HR administrative tasks.',
      requirements: [
        'Bachelor\'s degree in HR or related field',
        '1-2 years HR experience',
        'Knowledge of recruitment processes',
        'Good interpersonal skills',
        'MS Office proficiency'
      ],
      benefits: ['Career growth', 'Training opportunities', 'Work-life balance']
    },
    {
      id: 6,
      title: 'IT Support Technician',
      department: 'IT',
      location: 'On-site',
      type: 'Full-time',
      salary: 'Competitive',
      description: 'Provide technical support for call center systems, troubleshoot issues, and maintain IT infrastructure.',
      requirements: [
        'Diploma/Degree in IT or related field',
        'Knowledge of networking and hardware',
        'Experience with VoIP systems preferred',
        'Problem-solving mindset',
        'Ability to work under pressure'
      ],
      benefits: ['Technical certifications', 'Growth opportunities', 'Health coverage']
    }
  ],
  
  // Perks to display
  perks: [
    { icon: 'DollarSign', title: 'Competitive Salary', description: 'Market-competitive pays and Bonuses' },
    { icon: 'Heart', title: 'Paid Annual Leaves', description: 'Generous paid time off policy' },
    { icon: 'GraduationCap', title: 'Training & Growth', description: 'Continuous learning programs' },
    { icon: 'Coffee', title: 'Great Environment', description: 'Modern facility with amenities' },
    { icon: 'Users', title: 'Team Culture', description: 'Supportive and fun workplace' },
    { icon: 'Clock', title: 'Flexible Shifts', description: 'Work from office or Your home' }
  ]
}
