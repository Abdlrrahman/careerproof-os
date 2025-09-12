import { 
  initialProfile, 
  initialExperiences, 
  initialProjects, 
  initialSkills, 
  initialCredentials, 
  initialAchievements, 
  initialCaseStudies 
} from '@/data/seed-data';

export interface AiResponse {
  answer: string;
  citations: {
    title: string;
    type: 'project' | 'experience' | 'credential' | 'achievement' | 'skill';
    id: string;
    url?: string;
  }[];
  confidence: number;
  isGrounded: boolean;
  providerUsed: 'gemini' | 'openai' | 'local_heuristic';
}

const PORTFOLIO_KNOWLEDGE_BASE = `
IDENTITY:
Name: Abdlrrahman Shibani (Full legal: Abdlrrahman Ali Altahir Shibani)
Title: Founder & Engineering Lead | Software, AI and Digital Transformation
Location: Tripoli, Libya / Doha, Qatar (Focus: Remote / Distributed international work)
Experience: 6+ years professional engineering and technology leadership
Languages: Arabic (Native), English (Fluent)
Education: 
- BSc Computer Engineering (University of Tripoli, 2020)
- BSc Computer Science (University of the People, in progress, 3.86 GPA, 78/120 credits)

EXPERIENCES & ROLES:
1. Technopole (Jan 2023 - Present): Founder & CEO / Principal Software Architect. Led 15 engineers, built GeoFusion AI, multi-tenant ERPs, energy ML pipelines.
2. Nexora Tech LLC (Apr 2025 - Present): Founder & CEO. Applied AI product strategy (BidPilot, ImpactLedger, CipherVault).
3. Omega-Gate Tech (Feb 2024 - Present): Project Manager / ICT Lead. Led 12 engineers, Hyper-V virtual datacenter, Active Directory, Omega ERP & Omega Academy delivery.
4. VNG International (Apr 2022 - Dec 2023): IT Expert & Web Developer. Municipal digitization portals serving 200k+ citizens, trained 150+ staff.
5. Genico (Jun 2021 - Dec 2022): Tech Lead. E-commerce platforms, React/Node microservices, 50k+ MAU.
6. Handicap International (Sep 2020 - Aug 2021): Project Officer / Team Leader. Managed humanitarian logistics, $250k medical supply chain, 15k beneficiaries.
7. Chemonics (2021 - 2023): Master Trainer. Facilitated digital capacity building across 12 municipalities.

KEY PRODUCTION PROJECTS:
- GeoFusion AI: Subsurface geospatial AI platform, Python/FastAPI, PyTorch, GeoBERT, PostGIS. Reduced manual analysis by 40%.
- AI Oil Exploration: Predictive ML models on historical well logs and seismic data with 30% faster exploration screening.
- North Sea Analytics: Open-source spatial GIS pipeline for UK/Norwegian continental shelf infrastructure.
- Omega ERP: Enterprise resource planning system (HR, procurement, double-entry accounting) for 150+ users.
- Omega Academy: Cloud LMS serving 5,000+ students.
- Municipal Governance Portals: Civic digitization reaching 200,000+ citizens with VNG International.

CREDENTIALS:
- Google Cybersecurity Professional Certificate (2025)
- Google Project Management Professional Certificate (2024)
- McKinsey Forward Leadership Program (2024)
- ReBootKamp JavaScript Full-Stack Immersion (2020)
`;

export async function askPortfolioAI(query: string, locale: 'en' | 'ar' = 'en'): Promise<AiResponse> {
  const sanitizedQuery = query.trim().replace(/[<>]/g, '');

  if (!sanitizedQuery) {
    return {
      answer: locale === 'ar' ? 'يرجى كتابة سؤال للاستفسار عن الملف المهني.' : 'Please enter a question about Abdlrrahman\'s portfolio.',
      citations: [],
      confidence: 1.0,
      isGrounded: true,
      providerUsed: 'local_heuristic',
    };
  }

  // Security Check: Block Prompt Injections
  const isPromptInjection = /ignore\s+previous|disregard|system\s+prompt|reveal\s+secret|bypass|dan\s+mode/i.test(sanitizedQuery);
  if (isPromptInjection) {
    return {
      answer: locale === 'ar' 
        ? 'عذراً، هذا المساعد مخصص فقط للإجابة على الأسئلة المتعلقة بالخبرات والمشاريع الهندسية المعتمدة لعبد الرحمن الشيباني.'
        : 'I am restricted to answering questions strictly grounded in Abdlrrahman Shibani\'s verified portfolio, skills, projects, and credentials.',
      citations: [],
      confidence: 1.0,
      isGrounded: true,
      providerUsed: 'local_heuristic',
    };
  }

  // Attempt Google Gemini API if key is present
  const geminiApiKey = process.env.GEMINI_API_KEY;
  if (geminiApiKey) {
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are the grounded portfolio AI assistant for Abdlrrahman Shibani.
Answer the user query strictly using the following knowledge base.
If there is no verified evidence in the knowledge base, state clearly: "I could not find verified evidence for this in Abdlrrahman's portfolio."
Include exact inline citations such as [Project: GeoFusion AI] or [Role: Technopole] or [Credential: Google PM].
Respond in ${locale === 'ar' ? 'Arabic' : 'English'}.

KNOWLEDGE BASE:
${PORTFOLIO_KNOWLEDGE_BASE}

USER QUERY:
${sanitizedQuery}`
            }]
          }]
        })
      });

      if (response.ok) {
        const data = await response.json();
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) {
          const citations = extractCitations(text);
          return {
            answer: text,
            citations,
            confidence: 0.95,
            isGrounded: true,
            providerUsed: 'gemini',
          };
        }
      }
    } catch (e) {
      console.warn('Gemini API call failed, falling back to local heuristic engine:', e);
    }
  }

  // Deterministic Local Grounded Engine (Offline / Zero-Config fallback)
  return runLocalHeuristicPortfolioAssistant(sanitizedQuery, locale);
}

function runLocalHeuristicPortfolioAssistant(query: string, locale: 'en' | 'ar'): AiResponse {
  const q = query.toLowerCase();
  const citations: AiResponse['citations'] = [];

  // Team Leadership / Management Queries
  if (/lead|team|manage|management|size|squad|leadership|قاد|فريق|إدارة|قيادة|أدار|فرق/i.test(q)) {
    citations.push({ title: 'Technopole (Founder & CEO)', type: 'experience', id: 'exp-technopole' });
    citations.push({ title: 'Omega-Gate Tech (ICT Lead)', type: 'experience', id: 'exp-omega-gate' });
    citations.push({ title: 'Google Project Management Certificate', type: 'credential', id: 'cred-google-pm' });

    const answerEn = `Yes, Abdlrrahman has extensive engineering leadership experience:
- **Founder & CEO at Technopole**: Directed a cross-functional squad of 15 software engineers, data scientists, and designers delivering AI platforms and enterprise ERPs. [Role: Technopole]
- **Project Manager & ICT Lead at Omega-Gate Tech**: Managed 12 software and infrastructure engineers delivering Omega ERP and Omega Academy. [Role: Omega-Gate Tech]
- **Team Leader at Handicap International**: Led a 10-person field logistics and humanitarian operations team. [Role: Handicap International]
- Certified in Agile and Scrum leadership via the **Google Project Management Professional Certificate** (2024) and the **McKinsey Forward Leadership Program** (2024). [Credential: Google PM]`;

    const answerAr = `نعم، يمتلك عبد الرحمن خبرة قيادية هندسية واسعة:
- **المؤسس والرئيس التنفيذي في Technopole**: قاد فريقاً هندسياً يضم 15 مطوراً ومهندس ذكاء اصطناعي ومصمماً لتطوير منصات الذكاء الاصطناعي وأنظمة ERP. [الخبرة: Technopole]
- **مدير مشاريع ومسؤول تقنية المعلومات في Omega-Gate Tech**: أدار 12 مهندساً لإطلاق أنظمة Omega ERP وأكاديمية أوميغا. [الخبرة: Omega-Gate Tech]
- **قائد فريق في Handicap International**: أدار فريقاً ميدانياً من 10 أفراد في اللوجستيات الإنسانية. [الخبرة: Handicap International]
- حاصل على **الشهادة الاحترافية في إدارة المشاريع من Google** (2024) وبرنامج **McKinsey Forward للقيادة** (2024). [الشهادة: Google PM]`;

    return {
      answer: locale === 'ar' ? answerAr : answerEn,
      citations,
      confidence: 0.96,
      isGrounded: true,
      providerUsed: 'local_heuristic',
    };
  }

  // Python & AI / Machine Learning Queries (Bilingual keywords)
  if (/python|بايثون|ai|ذكاء|اصطناعي|machine learning|تعلم آلي|ml|geofusion|geobert|data science|model/i.test(q)) {
    citations.push({ title: 'GeoFusion AI', type: 'project', id: 'geofusion-ai' });
    citations.push({ title: 'AI Oil Exploration Prediction System', type: 'project', id: 'ai-oil-exploration' });
    citations.push({ title: 'North Sea Spatial Analytics', type: 'project', id: 'north-sea-analysis' });

    const answerEn = `Abdlrrahman has 6+ years of specialized Python and AI/ML production engineering:
- **GeoFusion AI**: Architected an end-to-end subsurface exploration platform using FastAPI, PyTorch, GeoBERT fine-tuning, and PostGIS, reducing manual geological correlation time by ~40%. [Project: GeoFusion AI]
- **AI Oil Exploration System**: Built predictive neural network pipelines analyzing historical well logs and seismic telemetry to forecast hydrocarbon reservoirs with a 30% speedup in screening. [Project: AI Oil Exploration]
- **North Sea Infrastructure Analytics**: Engineered automated geospatial analysis processing open continental shelf geological and pipeline data with PostGIS and GeoPandas. [Project: North Sea Analytics]`;

    const answerAr = `يمتلك عبد الرحمن خبرة تتجاوز 6 سنوات في لغة بايثون وهندسة الذكاء الاصطناعي والتعلم الآلي:
- **منصة GeoFusion AI**: صمم معمارية استكشاف جيومكانية تعتمد على FastAPI وPyTorch ونماذج GeoBERT وPostGIS، مما خفض وقت التحليل بنسبة 40%. [المشروع: GeoFusion AI]
- **نظام التنبؤ بالاستكشاف النفطي**: طور خطوط تعلم آلي لتحليل سجلات الآبار والبيانات السيزمية وسرّع دورات التقييم بنسبة 30%. [المشروع: AI Oil Exploration]
- **تحليلات بحر الشمال**: بنى خطوط معالجة مكانية لتحليل البنية التحتية والمسوح الجيولوجية باستخدام PostGIS وGeoPandas. [المشروع: North Sea Analytics]`;

    return {
      answer: locale === 'ar' ? answerAr : answerEn,
      citations,
      confidence: 0.98,
      isGrounded: true,
      providerUsed: 'local_heuristic',
    };
  }

  // Energy / Oil & Gas Queries
  if (/energy|oil|gas|petroleum|subsurface|drilling|geological|طاقة|نفط|غاز|بترول|استكشاف/i.test(q)) {
    citations.push({ title: 'GeoFusion AI', type: 'project', id: 'geofusion-ai' });
    citations.push({ title: 'AI Oil Exploration Prediction System', type: 'project', id: 'ai-oil-exploration' });

    const answerEn = `Yes, Abdlrrahman has deep domain expertise in Energy, Oil & Gas technology:
- Developed **GeoFusion AI**, harmonizing seismic SEG-Y, LAS well logs, and GIS mapping. [Project: GeoFusion AI]
- Delivered machine learning models for reservoir anomaly detection and lithology classification resulting in 30-40% operational efficiency gains. [Project: AI Oil Exploration]`;

    const answerAr = `نعم، يمتلك عبد الرحمن خبرة تخصصية عميقة في تكنولوجيا قطاع الطاقة والنفط والغاز:
- طوّر **منصة GeoFusion AI** لدمج البيانات السيزمية وسجلات الآبار والخرائط الجغرافية. [المشروع: GeoFusion AI]
- أنجز نماذج تعلم آلي لتصنيف الطبقات الجيولوجية وخفض زمن التحليل بنسبة 30-40%. [المشروع: AI Oil Exploration]`;

    return {
      answer: locale === 'ar' ? answerAr : answerEn,
      citations,
      confidence: 0.97,
      isGrounded: true,
      providerUsed: 'local_heuristic',
    };
  }

  // Digital Transformation & Public Sector
  if (/digital transformation|public sector|government|municipal|vng|chemonics|تحول رقمي|بلدي|بلديات|حكومة/i.test(q)) {
    citations.push({ title: 'Municipal Digital Governance Platforms', type: 'project', id: 'municipal-platforms' });
    citations.push({ title: 'VNG International Engagement', type: 'experience', id: 'exp-vng' });

    const answerEn = `Abdlrrahman has led major public-sector digital transformation initiatives:
- **VNG International Collaboration**: Deployed municipal governance platforms serving over 200,000 citizens and trained 150+ municipal officers on digital administration. [Project: Municipal Platforms] [Role: VNG International]
- **Chemonics International**: Facilitated digital literacy and information management training across 12 municipalities. [Role: Chemonics]`;

    const answerAr = `قاد عبد الرحمن مبادرات كبرى في التحول الرقمي والحوكمة البلدية:
- **التعاون مع VNG International**: أطلق بوابات الحوكمة البلدية لخدمة أكثر من 200 ألف مواطن، ودرب أكثر من 150 موظفاً بلدياً. [المشروع: Municipal Platforms] [الخبرة: VNG International]
- **برامج Chemonics الدولية**: يسّر ورش تدريبية في إدارة المعلومات الرقمية في 12 بلدية. [الخبرة: Chemonics]`;

    return {
      answer: locale === 'ar' ? answerAr : answerEn,
      citations,
      confidence: 0.95,
      isGrounded: true,
      providerUsed: 'local_heuristic',
    };
  }

  // Fallback for general profile summary
  citations.push({ title: 'Abdlrrahman Shibani Profile', type: 'skill', id: 'python' });
  citations.push({ title: 'Technopole (Founder & CEO)', type: 'experience', id: 'exp-technopole' });

  const defaultEn = `Abdlrrahman Shibani is a Founder and Senior Engineering Lead with 6+ years of experience across software engineering, production AI systems, and technical leadership:
- **Education**: BSc Computer Engineering (Univ of Tripoli, 2020) and BSc Computer Science (Univ of the People, 3.86 GPA).
- **Core Stacks**: Python, TypeScript, React, Next.js, Node.js, FastAPI, PostgreSQL, PostGIS, Docker, Hyper-V, and PyTorch.
- **Leadership**: Led teams of up to 15 engineers across Technopole, Nexora Tech, and Omega-Gate Tech.
- **Availability**: Available for remote, internationally distributed roles with full EMEA/US timezone overlap. [Role: Technopole]`;

  const defaultAr = `عبد الرحمن الشيباني هو مؤسس وقائد هندسي بخبرة تزيد عن 6 سنوات في هندسة البرمجيات، وأنظمة الذكاء الاصطناعي الإنتاجية، والقيادة التقنية:
- **التعليم**: بكالوريوس هندسة الحاسوب (جامعة طرابلس) وبكالوريوس علوم الحاسوب (University of the People بمعدل 3.86).
- **التقنيات**: Python, TypeScript, React, Next.js, Node.js, FastAPI, PostgreSQL, PostGIS, Docker, Hyper-V, PyTorch.
- **القيادة**: قاد فرقاً حتى 15 مهندساً في Technopole وNexora Tech وOmega-Gate Tech.
- **التوفر**: متاح للفرص القيادية والهندسية عن بُعد مع فرق موزعة دولياً. [الخبرة: Technopole]`;

  return {
    answer: locale === 'ar' ? defaultAr : defaultEn,
    citations,
    confidence: 0.90,
    isGrounded: true,
    providerUsed: 'local_heuristic',
  };
}

function extractCitations(text: string): AiResponse['citations'] {
  const citations: AiResponse['citations'] = [];
  const regex = /\[(Project|Role|Credential|Achievement|Skill):\s*([^\]]+)\]/gi;
  let match;
  while ((match = regex.exec(text)) !== null) {
    const type = match[1].toLowerCase() as any;
    const title = match[2].trim();
    citations.push({
      title,
      type: type === 'role' ? 'experience' : type,
      id: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    });
  }
  return citations;
}
