import { Project, Experience, Education, Certification, SkillCategory, SocialLink } from '../types';

export const personalInfo = {
  name: 'Esha Sherry',
  title: 'Sr. Software Engineer, AI',
  company: 'Softchoice',
  tagline: 'AI/ML specialist with 8+ years of experience building intelligent systems that transform how businesses operate.',
  email: 'esha.sherry@gmail.com',
  phone: '+1(647) 712-8164',
  linkedin: 'https://linkedin.com/in/eshasherry',
  github: 'https://github.com/eshasherry',
  resumeUrl: '/EshaSherryResume.pdf',
};

export const stats = [
  { value: '8+', label: 'Years Experience' },
  { value: '$5M+', label: 'Savings Delivered' },
  { value: '4', label: 'Companies' },
];

export const projects: Project[] = [
  {
    title: 'Text to SQL Agent',
    company: 'Softchoice',
    description:
      'Built a conversational Text-to-SQL agent using LangGraph and LangChain, enabling non-technical sales users to query an Amazon Redshift data warehouse using natural language.',
    highlights: [
      'Designed multi-tool agent architecture with FastAPI, SQL Database Toolkit, and Schema Catalog',
      'Implemented prompt engineering strategies including join pattern injection and few-shot SQL examples',
      'Integrated AWS Bedrock (Claude/Nova) with LangGraph for multi-turn conversational state',
    ],
    tags: ['LangGraph', 'LangChain', 'FastAPI', 'AWS Bedrock', 'Streamlit', 'Python'],
    featured: true,
  },
  {
    title: 'AI-Powered Document Automation',
    company: 'Architech',
    description:
      'Led a POC for an AI-powered document automation solution, significantly optimizing contract data extraction for a major logistics firm.',
    highlights: [
      'Built data extraction pipeline using Azure Document Intelligence',
      'Integrated OpenAI models for intelligent parsing of unstructured content',
      'Leveraged RAG techniques for critical data retrieval',
      'Reduced processing from 3–4 hours to 5–6 minutes per document',
      'Enabled projected annual savings of $5 million',
    ],
    tags: ['Azure AI', 'OpenAI', 'RAG', 'Python', 'FastAPI'],
    featured: true,
  },
  {
    title: 'Collections AI',
    company: 'Architech',
    description:
      'Built a Conversational AI collections system using Twilio for automated medical debt recovery calls, drastically reducing manual effort.',
    highlights: [
      'Integrated ElevenLabs for realistic text-to-speech interactions',
      'Implemented semantic retrieval via vector embeddings and graph DB',
      'Deployed microservices to Kubernetes on Azure',
    ],
    tags: ['Twilio', 'ElevenLabs', 'Neo4j', 'Kubernetes', 'Azure'],
  },
  {
    title: 'AI Document Clustering',
    company: 'Architech',
    description:
      'Developed an AI-based document clustering solution for a major telecommunications client to identify and group similar procedural and FAQ documents.',
    highlights: [
      'Built pipeline extracting content, generating embeddings, and computing cosine similarity',
      'Streamlined documentation and eliminated redundancies',
    ],
    tags: ['OpenAI', 'Embeddings', 'NLP', 'Python'],
  },
];

export const experiences: Experience[] = [
  {
    company: 'Softchoice',
    role: 'Sr. Software Engineer, AI',
    period: 'Aug 2025 – Present',
    location: 'Toronto, ON',
    current: true,
    highlights: [
      'Built a conversational Text-to-SQL agent using LangGraph, enabling natural language querying of Amazon Redshift',
      'Designed multi-tool agent architecture with FastAPI, SQL Database Toolkit, and Schema Catalog',
      'Integrated AWS Bedrock (Claude/Nova) with LangGraph for multi-turn conversational state',
    ],
    resumeHighlights: [
      'Built a conversational Text-to-SQL agent using LangGraph and LangChain, enabling non-technical sales users at a packaging company to query an Amazon Redshift data warehouse using natural language.',
      'Designed a multi-tool agent architecture with FastAPI, integrating a SQL Database Toolkit (query executor, validator, schema explorer) and a Schema Catalog of fact/dimension table metadata to generate accurate, context-aware queries.',
      'Implemented prompt engineering strategies including join pattern injection, clarification logic, and few-shot SQL examples to minimize context rot and improve query accuracy.',
      'Integrated AWS Bedrock (Claude/Nova) as the LLM backbone with LangGraph\'s MemorySaver for multi-turn conversational state, served through a Streamlit UI.',
    ],
  },
  {
    company: 'Architech',
    role: 'Technical Lead',
    period: 'Aug 2024 – Aug 2025',
    location: 'Toronto, ON',
    highlights: [
      'Leading AI/ML initiatives including document automation, conversational AI, and document clustering solutions',
      'Reduced manual contract processing from 3–4 hours to 5–6 minutes, enabling $5M annual savings',
      'Deployed scalable microservices to Kubernetes on Azure',
    ],
    resumeHighlights: [
      'Led a Proof-of-Concept (POC) for an AI-powered document automation solution, significantly optimizing contract data extraction for a major logistics firm.',
      'Built a data extraction pipeline using Azure Document Intelligence to efficiently process PDF and Word contracts with diverse layouts, structuring the information sequentially.',
      'Integrated OpenAI models to intelligently parse and extract key details from paragraphs and unstructured notes, generating standardized Excel templates.',
      'Leveraged Retrieval-Augmented Generation (RAG) techniques to accurately retrieve critical data points not located within or near structured tables.',
      'Reduced manual contract processing time from 3–4 hours per document down to 5–6 minutes, delivering substantial operational efficiency.',
      'Enabled projected annual savings of $5 million, demonstrating significant ROI and paving the way for enterprise-wide adoption.',
      'Developed an AI-based document clustering solution for a major telecommunications client to identify and group similar procedural and FAQ documents.',
      'Built a processing pipeline that extracted content from JSON files, summarized them using OpenAI, generated embeddings, and computed cosine similarity to create a similarity matrix.',
      'Enabled the client to streamline documentation, eliminate redundancies, and improve content discoverability.',
      'Built a Conversational AI collections system using Twilio for automated medical debt recovery calls, drastically reducing manual effort and enabling simultaneous call handling.',
      'Integrated ElevenLabs for realistic text-to-speech and speech-to-text interactions, enhancing user engagement.',
      'Implemented semantic retrieval through vector embeddings and graph database queries, with a fallback to LLM for unmatched queries, ensuring robust conversational accuracy.',
      'Deployed microservices to Kubernetes on Azure, leveraging container orchestration for scalability and resilience.',
    ],
  },
  {
    company: 'Jobvite',
    role: 'Senior Software Engineer',
    period: 'Apr 2021 – Aug 2024',
    location: 'Kitchener, ON',
    highlights: [
      'Led development of integration app using Apache Kafka and Apache Camel for real-time CRM data processing',
      'Designed search functionality resulting in 80% increase in team productivity',
      'Mentored junior engineers, boosting team productivity by 20%',
    ],
    resumeHighlights: [
      'Led the development of a high-performance integration application using Apache Kafka and Apache Camel to rapidly process CRM data and share real-time updates on LinkedIn via API calls.',
      'Engineered a Camel-based Kafka consumer to effectively manage incoming CRM data streams, enabling seamless automated postings to LinkedIn.',
      'Collaborated with cross-functional internal teams to design and deliver application features using Java, Spring Framework, Docker, and AWS.',
      'Developed robust RESTful APIs to facilitate efficient data retrieval, manipulation, and seamless integration with frontend and external systems utilizing JSON and XML formats.',
      'Designed and launched a powerful search functionality within the integration application leveraging Java 11, JavaScript, and MySQL, resulting in an 80% increase in internal team productivity.',
      'Mentored junior engineers, boosting overall team productivity by 20%, while consistently promoting adherence to high-quality software design standards and professional practices.',
    ],
  },
  {
    company: 'LoyaltyOne',
    role: 'Software Engineer',
    period: 'Sep 2016 – Apr 2021',
    location: 'Toronto, ON',
    highlights: [
      'Spearheaded migration of legacy applications to AWS cloud infrastructure',
      'Developed high-performance apps processing 500K+ records in real-time via AWS Kinesis',
      'Led implementation of DevOps practices including CI/CD and IaC',
    ],
    resumeHighlights: [
      'Played a key role in the transaction team, spearheading the migration of legacy applications to AWS cloud infrastructure, demonstrating strategic modernization and cloud adoption capabilities.',
      'Led the implementation of DevOps practices including automated testing, continuous delivery, and infrastructure as code (IaC), significantly enhancing software quality and deployment speed.',
      'Developed high-performance Java applications capable of processing over 500,000 data records in real-time from data streams (AWS Kinesis), utilizing Spring Boot and Spring Batch to ensure scalable, robust data handling.',
      'Designed and implemented efficient, scalable REST APIs using Java and Spring Boot, enabling seamless GET and POST operations, improving system interoperability and data management.',
      'Utilized APM tools such as New Relic and Splunk to monitor application performance and troubleshoot production issues, reducing mean time to resolution.',
    ],
  },
];

export const education: Education[] = [
  {
    school: 'Humber College',
    degree: 'Post Grad Certificate in Information Technology Solutions',
    year: '2014',
    location: 'Etobicoke, ON',
    coursework: 'SDLC, Android Development, Java, HTML, CSS, JavaScript',
    capstone: 'Data visualization website in collaboration with QuickTap Survey',
  },
  {
    school: 'Punjab University College of Information Technology',
    degree: "Bachelor's Degree in Computer Science",
    year: '2010',
    location: 'Chandigarh, PB',
    coursework: 'CS Fundamentals, Data Structures & Algorithms, Programming Languages',
  },
];

export const certifications: Certification[] = [
  { name: 'AWS Certified Developer', issuer: 'Amazon Web Services', highlighted: true },
  { name: 'ChatGPT Prompt Engineering for Developers', issuer: 'DeepLearning.AI' },
  { name: 'Kafka Essential Training', issuer: 'LinkedIn' },
  { name: 'Problem Solving Certificate', issuer: 'HackerRank' },
];

export const skillCategories: SkillCategory[] = [
  {
    name: 'AI/ML & NLP',
    skills: ['Prompt Engineering', 'Scikit-Learn', 'Embedding Models', 'LLMs', 'LangChain', 'LangGraph', 'N8N'],
  },
  {
    name: 'Languages & Frameworks',
    skills: ['Python', 'Java', 'FastAPI', 'Spring Boot'],
  },
  {
    name: 'Cloud & DevOps',
    skills: ['Azure', 'AWS', 'Kubernetes', 'Docker', 'CI/CD'],
  },
  {
    name: 'Frontend',
    skills: ['React', 'Streamlit', 'HTML', 'CSS', 'JavaScript', 'TypeScript'],
  },
  {
    name: 'Databases',
    skills: ['Cassandra', 'Redis', 'Neo4j', 'ChromaDB', 'Pinecone', 'MySQL'],
  },
  {
    name: 'Messaging & Streaming',
    skills: ['Apache Kafka', 'Apache Camel', 'Azure Service Bus'],
  },
];

export const socialLinks: SocialLink[] = [
  { name: 'LinkedIn', url: 'https://linkedin.com/in/eshasherry', icon: 'linkedin' },
  { name: 'GitHub', url: 'https://github.com/eshasherry', icon: 'github' },
  { name: 'Email', url: 'mailto:esha.sherry@gmail.com', icon: 'email' },
];

export const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
];
