import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const navItems = [
  ['About', 'about'],
  ['Focus', 'focus'],
  ['Skills', 'skills'],
  ['Projects', 'projects'],
  ['Experience', 'experience'],
  ['Contact', 'contact'],
];

const careerFocus = [
  {
    title: 'IT Support / Technical Support',
    icon: 'IT',
    points: ['User support', 'Troubleshooting', 'Setup assistance', 'Documentation'],
  },
  {
    title: 'Software / Web / Mobile Development',
    icon: '</>',
    points: ['Practical apps', 'Web interfaces', 'Mobile UI', 'Databases'],
  },
  {
    title: 'QA Testing / Software Testing',
    icon: 'QA',
    points: ['Test execution', 'Bug reporting', 'Issue tracking', 'Quality checks'],
  },
  {
    title: 'Operations / Administrative Support',
    icon: 'OPS',
    points: ['Task coordination', 'Reports', 'Records', 'Workflow support'],
  },
];

const featuredHighlights = [
  {
    title: 'Android Certified Associate Developer',
    label: 'Certification',
    icon: 'AC',
  },
  {
    title: 'Diamond Medal - International Innovation Competition',
    label: 'Award',
    icon: 'DM',
  },
  {
    title: 'Flutter + Firebase Project Exposure',
    label: 'Project Stack',
    icon: 'FF',
  },
  {
    title: 'Open to Entry-Level Tech Roles',
    label: 'Career Ready',
    icon: 'OT',
  },
];

const reasons = [
  {
    title: 'Technical Foundation',
    icon: 'TF',
    text: 'Computer Science background with exposure to web development, mobile applications, databases, Firebase, IoT, and system-based projects.',
  },
  {
    title: 'Communication Confidence',
    icon: 'CC',
    text: 'Experience as an emcee, promoter, and student leader has helped me communicate clearly in different environments.',
  },
  {
    title: 'Adaptability',
    icon: 'AD',
    text: 'Comfortable learning new tools, adjusting to responsibilities, and supporting both technical and non-technical tasks.',
  },
  {
    title: 'Documentation & Organisation',
    icon: 'DO',
    text: 'Understands the value of proper documentation, reporting, task tracking, and organised professional workflows.',
  },
  {
    title: 'Willingness to Learn',
    icon: 'WL',
    text: 'Eager to receive feedback, improve skills, and contribute positively as a fresh graduate entering the workplace.',
  },
];

const skills = {
  'Technical Skills': [
    'Java',
    'HTML',
    'CSS',
    'JavaScript basics',
    'Flutter',
    'Firebase / Firestore',
    'MySQL',
    'Python basics',
    'Database CRUD operations',
    'Basic UI design',
    'Basic troubleshooting',
  ],
  'Tools & Platforms': [
    'VS Code',
    'Android Studio',
    'GitHub',
    'Firebase Console',
    'Microsoft Word',
    'Microsoft PowerPoint',
    'Microsoft Excel',
    'Canva',
    'Google Workspace',
  ],
  'Workplace Strengths': [
    'Communication',
    'Teamwork',
    'Problem-solving',
    'Adaptability',
    'Leadership',
    'Time management',
    'Attention to detail',
    'Documentation and reporting',
    'Public speaking',
    'Task coordination',
  ],
};

const currentlyExploring = [
  'React + Vite',
  'Frontend UI Design',
  'IT Support Workflows',
  'QA Testing Fundamentals',
  'Firebase',
  'Mobile App Development',
];

const selectedCoursework = [
  'Object-Oriented Programming',
  'Database Systems',
  'Web-Based Application Development',
  'Front-End Programming',
  'Internet of Things',
  'Mobile Application Development',
];

const projects = [
  {
    title: 'Flutter Sales Dashboard Application',
    category: 'Mobile Application / Data Visualization',
    type: 'Academic Project',
    description: 'A Flutter mobile dashboard that visualizes sales data using animated charts, Firestore integration, and interactive filtering by month and year.',
    highlights: [
      'Built a dashboard interface using Flutter',
      'Integrated Firestore for sales data',
      'Displayed data through animated charts',
    ],
    tools: ['Flutter', 'Firebase', 'Firestore', 'Dart'],
    filters: ['Mobile'],
    featured: true,
  },
  {
    title: 'Smart IoT-Enabled LED Control and Distance Monitoring System',
    category: 'IoT / Embedded System',
    type: 'Coursework Project',
    description: 'An IoT system using ESP32 for LED control and distance monitoring, combining hardware setup, coding, and system testing.',
    highlights: [
      'Used ESP32 as the main controller',
      'Implemented LED control circuit',
      'Integrated distance monitoring sensor',
    ],
    tools: ['ESP32', 'Python/MicroPython', 'Sensors', 'LED components'],
    filters: ['IoT'],
    featured: true,
  },
  {
    title: 'Customer Relationship Management System',
    category: 'Web-Based Application',
    type: 'Academic Project',
    description: 'A web-based CRM system designed to manage customer information and support organised business record handling.',
    highlights: [
      'Created a web-based system interface',
      'Managed customer records',
      'Supported basic CRUD operations',
    ],
    tools: ['HTML', 'CSS', 'PHP', 'MySQL'],
    filters: ['Web', 'Database'],
    featured: true,
  },
  {
    title: 'Airline Ticket Booking System',
    category: 'Database System',
    type: 'Coursework Project',
    description: 'A database system for managing airline ticket bookings, passenger records, flight data, and structured SQL-based operations.',
    highlights: [
      'Designed database tables and relationships',
      'Managed booking and passenger data',
      'Applied SQL queries for data operations',
    ],
    tools: ['MySQL', 'SQL'],
    filters: ['Database'],
    featured: true,
  },
  {
    title: 'Inspira Mobile Application',
    category: 'Additional Project / Mobile Front-End',
    type: 'Personal Enhancement',
    description: 'A mobile application front-end project focused on screen design, user flow, and mobile interface development.',
    highlights: ['Designed mobile app screens', 'Built front-end components', 'Practiced app layout and navigation'],
    tools: ['Android Studio', 'Java'],
    filters: ['Mobile'],
  },
  {
    title: 'Gorgeous Terengganu',
    category: 'Additional Project / Web Interface',
    type: 'Coursework Project',
    description: 'A tourism-themed web interface project showcasing Terengganu through structured content, clean layout, and front-end design principles.',
    highlights: ['Designed a tourism web interface', 'Organised content for browsing', 'Practiced front-end fundamentals'],
    tools: ['HTML', 'CSS', 'JavaScript basics'],
    filters: ['Web'],
  },
];

const projectFilters = ['All', 'Mobile', 'Web', 'Database', 'IoT'];

const experiences = [
  {
    role: 'IT & Operations Support Intern',
    eyebrow: 'Internship / Practical Training',
    description: 'Supported daily operational, reporting, coordination, and documentation work in a professional office environment.',
    bullets: [
      'Prepared operational reports and documentation',
      'Monitored task progress and updated records',
      'Supported communication between team members and stakeholders',
      'Assisted with issue reporting for workflow improvement',
    ],
  },
  {
    role: 'Promoter',
    eyebrow: 'Hush Puppies, Polo, Crocodile, John Master',
    description: 'Built customer-facing confidence through retail promotion, product explanation, and sales support.',
    bullets: [
      'Explained product details and promotions to customers',
      'Handled customer enquiries with patience and confidence',
      'Supported sales activities and product display arrangement',
    ],
  },
  {
    role: 'Kitchen Helper',
    eyebrow: 'Fast-paced service environment',
    description: 'Developed discipline, teamwork, time management, and reliability in a busy working environment.',
    bullets: [
      'Assisted with kitchen preparation and daily tasks',
      'Maintained cleanliness and organisation',
      'Supported team members during busy working hours',
    ],
  },
];

const achievementGroups = [
  {
    group: 'Certifications',
    items: [
      {
        title: 'Android Certified Associate Developer (ACAD)',
        description: 'Demonstrated foundational knowledge in Android development, mobile application concepts, and practical software development skills.',
      },
    ],
  },
  {
    group: 'Awards & Recognition',
    items: [
      {
        title: 'Diamond Medal - Mentorship Kinesis Zone 2024: 1+1 International Innovation Competition',
        description: 'Recognised for innovation, creativity, problem-solving, and project presentation in an international innovation competition.',
      },
      {
        title: '1st Place - Online Video CV Competition',
        description: 'Recognised for creativity, presentation skills, and the ability to communicate personal strengths effectively.',
      },
      {
        title: 'MUET Band 4',
        description: 'Reflects a good command of English communication for academic and professional settings.',
      },
    ],
  },
  {
    group: 'Leadership & Involvement',
    items: [
      {
        title: 'Event Emcee',
        description: 'Strengthened public speaking, confidence, audience engagement, and formal communication skills.',
      },
      {
        title: 'Secretary - Hari Ekspresi Unggul Kesenian dan Warisan Etnik Malaysia',
        description: 'Supported event documentation, coordination, and administrative flow.',
      },
    ],
  },
];

const educationItems = [
  {
    years: 'Oct 2022 - Mar 2026',
    title: 'Bachelor of Computer Science (Mobile Computing) with Honours',
    institution: 'Universiti Malaysia Terengganu (UMT)',
    description: 'Focused on mobile computing, software development fundamentals, database systems, web-based application development, front-end programming, IoT, and project-based learning.',
    featured: true,
  },
  {
    years: 'Aug 2020 - Jul 2022',
    title: 'Matriculation Certificate in Physical Science',
    institution: 'Negeri Sembilan Matriculation College (KMNS)',
    description: 'Completed foundation studies in Physical Science before pursuing a degree in Computer Science.',
  },
  {
    years: 'Jan 2015 - Dec 2019',
    title: 'Sijil Pelajaran Malaysia (SPM)',
    institution: 'Miri Science Secondary School (SAINSri)',
    description: 'Completed secondary education and built an academic foundation before continuing into science and computer science pathways.',
  },
];

function SectionHeader({ eyebrow, title, children }) {
  return (
    <div className="section-header">
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2>{title}</h2>
      {children && <p>{children}</p>}
    </div>
  );
}

function ChipList({ items, compact = false }) {
  return (
    <div className={compact ? 'chips compact' : 'chips'}>
      {items.map((item) => <span key={item}>{item}</span>)}
    </div>
  );
}

function ProjectCard({ project, secondary = false }) {
  const isSpotlight = project.title === 'Flutter Sales Dashboard Application';

  return (
    <article className={`${secondary ? 'card project-card secondary-project' : 'card project-card'} ${isSpotlight ? 'spotlight-project' : ''}`}>
      <div className="project-visual" aria-hidden="true">
        <span>{project.filters[0]}</span>
      </div>
      <div className="project-topline">
        <p className="project-category">{project.category}</p>
        <div className="project-labels">
          <span>{project.type}</span>
          <span>Completed</span>
          {project.featured && <span>{isSpotlight ? 'Featured' : 'Main Project'}</span>}
        </div>
      </div>
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      <ul>
        {project.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
      </ul>
      <ChipList items={project.tools} compact />
    </article>
  );
}

function App() {
  const navRef = useRef(null);
  const [activeFilter, setActiveFilter] = useState('All');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState(navItems[0][1]);
  const [navIndicator, setNavIndicator] = useState({ left: 0, width: 0, ready: false });

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0);
      setHasScrolled(scrollTop > 80);

      const scrollPosition = scrollTop + 160;
      let currentSection = navItems[0][1];

      navItems.forEach(([, id]) => {
        const section = document.getElementById(id);

        if (section && section.offsetTop <= scrollPosition) {
          currentSection = id;
        }
      });

      setActiveSection(currentSection);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll('.reveal-section');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const updateIndicator = () => {
      const nav = navRef.current;
      const activeLink = nav?.querySelector(`[data-section="${activeSection}"]`);

      if (!nav || !activeLink) return;

      setNavIndicator({
        left: activeLink.offsetLeft,
        width: activeLink.offsetWidth,
        ready: true,
      });

      if (nav.scrollWidth > nav.clientWidth) {
        nav.scrollTo({
          left: activeLink.offsetLeft - (nav.clientWidth - activeLink.offsetWidth) / 2,
          behavior: 'smooth',
        });
      }
    };

    updateIndicator();
    window.addEventListener('resize', updateIndicator);

    if (document.fonts?.ready) {
      document.fonts.ready.then(updateIndicator);
    }

    return () => window.removeEventListener('resize', updateIndicator);
  }, [activeSection]);

  const visibleProjects = useMemo(() => {
    if (activeFilter === 'All') return projects;
    return projects.filter((project) => project.filters.includes(activeFilter));
  }, [activeFilter]);

  const featuredProjects = visibleProjects.filter((project) => project.featured);
  const additionalProjects = visibleProjects.filter((project) => !project.featured);
  const spotlightProject = visibleProjects.find((project) => project.title === 'Flutter Sales Dashboard Application');
  const remainingFeaturedProjects = featuredProjects.filter((project) => project.title !== 'Flutter Sales Dashboard Application');

  return (
    <>
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />
      <header className={hasScrolled ? 'site-header is-scrolled' : 'site-header'}>
        <a className="brand" href="#top" aria-label="Sufyan Akmal home">
          <span>SA</span>
          <strong>Akmal</strong>
        </a>
        <nav className="nav-pill" aria-label="Main navigation" ref={navRef}>
          <span
            className={navIndicator.ready ? 'nav-indicator ready' : 'nav-indicator'}
            style={{
              '--nav-indicator-left': `${navIndicator.left}px`,
              '--nav-indicator-width': `${navIndicator.width}px`,
            }}
            aria-hidden="true"
          />
          {navItems.map(([label, id]) => (
            <a
              aria-current={activeSection === id ? 'page' : undefined}
              className={activeSection === id ? 'active' : ''}
              data-section={id}
              key={id}
              href={`#${id}`}
              onClick={() => setActiveSection(id)}
            >
              {label}
            </a>
          ))}
        </nav>
      </header>

      <main id="top">
        <section className="hero section-band">
          <div className="container hero-grid">
            <div className="hero-copy reveal">
              <p className="eyebrow">Fresh Computer Science Graduate</p>
              <h1>Hi, I&apos;m <span className="gradient-text">Sufyan Akmal.</span></h1>
              <h2>I <span className="gradient-text">build, support, and improve</span> digital solutions.</h2>
              <div className="role-rotator" aria-label="Career interests">
                <span>IT Support</span>
                <span>Software Development</span>
                <span>QA Testing</span>
                <span>Operations Support</span>
              </div>
              <p className="hero-subtitle">A Computer Science graduate blending technical skills, communication confidence, documentation, and real project exposure.</p>
              <div className="button-row">
                <a className="button primary" href="/resume/technical-resume-sufyan-akmal.pdf" download aria-label="Download Sufyan Akmal technical resume">Download Resume</a>
                <a className="button secondary" href="#projects">View Projects</a>
                <a className="button ghost" href="#contact">Contact Me</a>
              </div>
              <div className="hero-highlights" aria-label="Quick highlights">
                <span>Computer Science Graduate</span>
                <span>Mobile Computing</span>
                <span>Open to Entry-Level Roles</span>
              </div>
            </div>
            <aside className="profile-panel reveal" aria-label="Portfolio summary">
              <div className="status-pill">Open to Work</div>
              <div className="portrait-wrap">
                <img className="portrait" src="/profile-akmal.jpg" alt="Professional profile photo of Sufyan Akmal" width="132" height="132" decoding="async" fetchPriority="high" />
              </div>
              <h2>Sufyan Akmal</h2>
              <p>Mobile Computing graduate focused on practical technology, support, documentation, and team-ready communication.</p>
              <ChipList items={['Entry-Level Roles', 'Mobile Computing', 'Documentation', 'Team Support']} />
              <div className="floating-role-chips" aria-label="Target role areas">
                <span>IT Support</span>
                <span>Software</span>
                <span>QA Testing</span>
                <span>Operations</span>
              </div>
              <div className="profile-note">
                <strong>Preferred location</strong>
                <span>Malaysia / Kuala Lumpur & Selangor</span>
              </div>
            </aside>
          </div>
        </section>

        <section className="container highlights-section reveal-section" aria-label="Featured highlights">
          <div className="highlight-grid">
            {featuredHighlights.map((item) => (
              <article className="card highlight-card" key={item.title}>
                <span className="highlight-icon" aria-hidden="true">{item.icon}</span>
                <div>
                  <span>{item.label}</span>
                  <h3>{item.title}</h3>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="about" className="container content-section reveal-section">
          <SectionHeader eyebrow="About Me" title="A practical technical foundation with people-facing confidence" />
          <div className="about-layout">
            <div className="card large-card">
              <p>I am Sufyan Akmal bin Dron, a Computer Science graduate specializing in Mobile Computing from Universiti Malaysia Terengganu. My background combines technical learning, project-based development, documentation, operations support, and communication experience.</p>
              <p>Throughout my studies and practical experience, I have worked on web-based systems, mobile applications, database projects, and IoT-based solutions. I enjoy working on practical systems that solve everyday problems, especially projects involving mobile applications, databases, documentation, and user support.</p>
              <p>I enjoy learning new technologies, solving problems, and supporting teams through clear communication, proper documentation, and a strong willingness to improve.</p>
              <p>I am currently open to entry-level opportunities in IT Support, Technical Support, Software Development, QA Testing, and Operations Support, where I can continue growing while contributing positively to the organisation.</p>
            </div>
            <div className="stats-grid">
              <div className="stat-card"><strong>6</strong><span>Selected projects</span></div>
              <div className="stat-card"><strong>2026</strong><span>Expected graduation</span></div>
              <div className="stat-card"><strong>Band 4</strong><span>MUET English</span></div>
              <div className="stat-card"><strong>Open</strong><span>Entry-level roles</span></div>
            </div>
          </div>
        </section>

        <section id="focus" className="section-band">
          <div className="container content-section reveal-section">
            <SectionHeader eyebrow="Career Focus" title="Open to technical and support-focused graduate roles">
              I am open to entry-level opportunities where I can apply my Computer Science background, technical foundation, communication skills, and willingness to learn in real working environments.
            </SectionHeader>
            <div className="card-grid four">
              {careerFocus.map((item) => (
                <article className="card focus-card" key={item.title}>
                  <span className="icon-mark" aria-hidden="true">{item.icon}</span>
                  <h3>{item.title}</h3>
                  <ChipList items={item.points} compact />
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="container content-section reveal-section">
          <SectionHeader eyebrow="Why Consider Me" title="A reliable fresh graduate who can grow across teams" />
          <div className="card-grid reasons bento-grid">
            {reasons.map((item, index) => (
              <article className="card reason-card" key={item.title}>
                <span className="number">{String(index + 1).padStart(2, '0')}</span>
                <span className="reason-icon" aria-hidden="true">{item.icon}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="skills" className="section-band">
          <div className="container content-section reveal-section">
            <SectionHeader eyebrow="Skills & Strengths" title="Skills organised for quick recruiter review." />
            <div className="skills-layout">
              {Object.entries(skills).map(([group, items]) => (
                <article className="card skill-card" key={group}>
                  <h3><span className="skill-icon" aria-hidden="true">{group === 'Technical Skills' ? 'TS' : group === 'Tools & Platforms' ? 'TP' : 'WS'}</span>{group}</h3>
                  <ChipList items={items} />
                </article>
              ))}
            </div>
            <div className="currently-exploring card">
              <div>
                <p className="eyebrow">Currently Exploring</p>
                <h3>Tools and practices I am actively strengthening</h3>
              </div>
              <ChipList items={currentlyExploring} />
            </div>
          </div>
        </section>

        <section id="projects" className="container content-section reveal-section">
          <SectionHeader eyebrow="Selected Projects" title="Main projects across mobile, IoT, web, and databases">
            A focused look at project work that shows practical development, database thinking, documentation, testing, and problem-solving exposure.
          </SectionHeader>
          <div className="filter-tabs" role="tablist" aria-label="Project filters">
            {projectFilters.map((filter) => (
              <button
                className={activeFilter === filter ? 'active' : ''}
                key={filter}
                type="button"
                role="tab"
                aria-selected={activeFilter === filter}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
          {spotlightProject && (
            <div className="project-results spotlight-wrap" key={`spotlight-${activeFilter}`}>
              <ProjectCard project={spotlightProject} />
            </div>
          )}
          {(remainingFeaturedProjects.length > 0 || additionalProjects.length > 0) && (
            <div className="secondary-project-block">
              <h3>{spotlightProject ? 'More Projects' : 'Projects'}</h3>
              <div className="project-grid secondary-grid project-results" key={`additional-${activeFilter}`}>
                {[...remainingFeaturedProjects, ...additionalProjects].map((project) => <ProjectCard project={project} secondary key={project.title} />)}
              </div>
            </div>
          )}
        </section>

        <section id="experience" className="section-band">
          <div className="container content-section reveal-section">
            <SectionHeader eyebrow="Experience" title="Concise workplace exposure in support, service, and operations" />
            <div className="timeline">
              {experiences.map((item) => (
                <article className="card timeline-card" key={item.role}>
                  <div>
                    <p className="project-category">{item.eyebrow}</p>
                    <h3><span className="experience-icon" aria-hidden="true">{item.role.startsWith('IT') ? 'IT' : item.role === 'Promoter' ? 'CS' : 'TM'}</span>{item.role}</h3>
                    <p>{item.description}</p>
                  </div>
                  <ul>
                    {item.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="education" className="container content-section education-achievements reveal-section">
          <SectionHeader eyebrow="Education" title="Computer Science learning with project-based practice" />
          <div className="education-timeline">
            {educationItems.map((item) => (
              <article className={item.featured ? 'card education-card featured-education' : 'card education-card'} key={item.title}>
                <span className="education-years">{item.years}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p className="project-category">{item.institution}</p>
                  <p>{item.description}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="coursework-card card">
            <div>
              <p className="eyebrow">Selected Coursework</p>
              <h3>Academic areas supporting technical and support roles</h3>
            </div>
            <ChipList items={selectedCoursework} />
          </div>

          <SectionHeader eyebrow="Certifications, Awards & Involvement" title="Recognition earned through learning, innovation, communication, and student activities." />
          <div className="achievement-groups">
            {achievementGroups.map((group) => (
              <article className="card achievement-group" key={group.group}>
                <h3>{group.group}</h3>
                <div className="achievement-items">
                  {group.items.map((item) => (
                    <div className="achievement-item" key={item.title}>
                      <strong>{item.title}</strong>
                      <p>{item.description}</p>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section-band resume-section">
          <div className="container cta-panel resume-panel reveal-section">
            <div>
              <p className="eyebrow">Resume</p>
              <h2>Choose the resume version that fits the role</h2>
              <p>I have prepared resume versions tailored for different career directions. Recruiters and hiring managers may download the version that best matches the role being considered.</p>
            </div>
            <div className="resume-options">
              <div className="resume-option">
                <strong>Technical Resume</strong>
                <span>Best for IT Support, Technical Support, Software, Web, Mobile, and QA roles.</span>
                <div className="resume-actions">
                  <a className="button secondary" href="/resume/technical-resume-sufyan-akmal.pdf" target="_blank" rel="noreferrer" aria-label="View Sufyan Akmal technical resume PDF">View Resume</a>
                  <a className="button primary" href="/resume/technical-resume-sufyan-akmal.pdf" download aria-label="Download Sufyan Akmal technical resume PDF">Download</a>
                </div>
              </div>
              <div className="resume-option">
                <strong>General Resume</strong>
                <span>Best for operations support, administrative support, graduate, and Protege roles.</span>
                <div className="resume-actions">
                  <a className="button secondary" href="/resume/general-resume-sufyan-akmal.pdf" target="_blank" rel="noreferrer" aria-label="View Sufyan Akmal general resume PDF">View Resume</a>
                  <a className="button outline" href="/resume/general-resume-sufyan-akmal.pdf" download aria-label="Download Sufyan Akmal general resume PDF">Download</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="contact-cta">
          <div className="container contact-panel reveal-section">
            <div>
              <p className="eyebrow">Contact</p>
              <h2>Let&apos;s connect about entry-level opportunities.</h2>
              <p>I am currently open to entry-level opportunities, graduate programmes, Protege roles, technical support roles, software-related roles, QA testing, and operations support positions.</p>
              <div className="availability-highlight">
                <span>Availability</span>
                <strong>Open to entry-level roles, graduate programmes, Protege roles, and junior opportunities in Kuala Lumpur, Selangor, or remote/hybrid arrangements.</strong>
              </div>
              <p className="closing-line">Feel free to reach out if my background matches your hiring needs or if you would like to discuss a suitable opportunity.</p>
              <div className="button-row">
                <a className="button primary" href="mailto:sfynkml@gmail.com" aria-label="Email Sufyan Akmal">Email Me</a>
                <a className="button secondary" href="/resume/technical-resume-sufyan-akmal.pdf" download aria-label="Download Sufyan Akmal technical resume">Download Resume</a>
              </div>
            </div>
            <div className="contact-grid">
              <a className="card contact-card" href="mailto:sfynkml@gmail.com">
                <span className="contact-icon" aria-hidden="true">@</span>
                <div className="contact-meta">
                  <span>Email</span>
                  <strong>sfynkml@gmail.com</strong>
                </div>
              </a>
              <a className="card contact-card" href="tel:+601133587244">
                <span className="contact-icon" aria-hidden="true">tel</span>
                <div className="contact-meta">
                  <span>Phone</span>
                  <strong>+601133587244</strong>
                </div>
              </a>
              <div className="card contact-card">
                <span className="contact-icon" aria-hidden="true">loc</span>
                <div className="contact-meta">
                  <span>Location</span>
                  <strong>Malaysia / Kuala Lumpur & Selangor preferred</strong>
                </div>
              </div>
              <a className="card contact-card" href="https://www.linkedin.com/in/sufyan-akmal-dron/" target="_blank" rel="noreferrer" aria-label="View Sufyan Akmal LinkedIn profile">
                <span className="contact-icon" aria-hidden="true">in</span>
                <div className="contact-meta">
                  <span>LinkedIn</span>
                  <strong>View LinkedIn</strong>
                </div>
              </a>
              <a className="card contact-card" href="https://github.com/akmalyeng" target="_blank" rel="noreferrer" aria-label="View Sufyan Akmal GitHub profile">
                <span className="contact-icon" aria-hidden="true">gh</span>
                <div className="contact-meta">
                  <span>GitHub</span>
                  <strong>View GitHub</strong>
                </div>
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <p>&copy; 2026 Sufyan Akmal bin Dron. Built with React + Vite.</p>
      </footer>

      <a className={hasScrolled ? 'back-to-top show' : 'back-to-top'} href="#top" aria-label="Back to top">
        &uarr;
      </a>
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
