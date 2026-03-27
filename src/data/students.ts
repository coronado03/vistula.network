/**
 * VISTULA WEBRING MEMBERS (Inspired by uwaloo.network)
 * 
 * To add yourself to the vistula webring:
 * 1. Fork this repository
 * 2. Add your profile picture to /public/photos/ 
 * 3. Add your entry to the members array below
 * 4. Submit a pull request
 * 5. I accept you!
 * 
 * Required fields:
 * - id: Your name with hyphens (e.g., "john-doe")
 * - name: Your full name (e.g, "Emiliano Ramirez Hernandez")
 * - website: Your personal website URL (required to be part of the webring)
 * 
 * Optional fields:
 * - program: Your program at Vistula
 * - year: Your graduation year
 * - roles: Tags for what you do (e.g., ["engineering", "design", "writer"])
 *          Options: engineering, design, product, growth, ai/ml, research, hardware, quant, software, finance, vc
 * - verticals: Tags for industries you're interested in (e.g., ["fintech", "ai", "climate"])
 *              Options: fintech, ai, climate, healthcare, edtech, marketplaces, robotics, defense, hard tech, saas, consumer, creator tools
 * - profilePic: Path to your photo (see instructions below)
 * - instagram: Full URL to your Instagram profile
 * - twitter: Full URL to your Twitter/X profile
 * - linkedin: Full URL to your LinkedIn profile
 * - connections: Names of friends with hyphens (e.g., ["john-doe", "jane-smith"])
 * 
 * ADDING YOUR PROFILE PICTURE:
 * 1. Use a square image, ideally 400x400 pixels (your Twitter/X profile pic works great!)
 * 2. Save it as: public/photos/your-name.jpg (or .png)
 * 3. Set profilePic to: "/photos/your-name.jpg"
 */

export interface Member {
  id: string;
  name: string;
  website: string;
  program?: string;
  year?: string;
  roles?: string[];
  verticals?: string[];
  profilePic?: string;
  instagram?: string;
  twitter?: string;
  linkedin?: string;
  connections?: string[];
}

export const ROLE_OPTIONS = [
  'engineering', 'design', 'product', 'growth', 'ai/ml', 'research',
  'hardware', 'quant', 'software', 'finance', 'vc',
] as const;

export const VERTICAL_OPTIONS = [
  'fintech', 'ai', 'climate', 'healthcare', 'edtech', 'marketplaces',
  'robotics', 'defense', 'hard tech', 'saas', 'consumer', 'creator tools',
] as const;

// Connection type for the network graph
export interface Connection {
  fromId: string;
  toId: string;
}

export const members: Member[] = [
  // ============================================
  // ADD YOUR ENTRY BELOW THIS LINE
  // ============================================

  // Example entry (copy this as a template):
  // {
  //   id: "john-doe",
  //   name: "John Doe",
  //   website: "https://johndoe.com",
  //   program: "Computer Science",
  //   year: "2026",
  //   // options: engineering, design, product, growth, ai/ml, research, hardware, quant, software, finance, vc
  //   roles: ["engineering", "design"],
  //   // options: fintech, ai, climate, healthcare, edtech, marketplaces, robotics, defense, hard tech, saas, consumer, creator tools
  //   verticals: ["fintech", "ai"],
  //   profilePic: "/photos/john-doe.jpg",
  //   instagram: "https://instagram.com/johndoe",
  //   twitter: "https://x.com/johndoe",
  //   linkedin: "https://linkedin.com/in/johndoe",
  //   connections: ["jane-smith", "bob-wilson"],
  // },

  {
    id: "sebastian-coronado",
    name: "Sebastian Coronado",
    website: "https://logofcoronado.dev/",
    program: "Computer Engineering",
    roles: ["engineering", "software"],
    verticals: [],
    profilePic: "/photos/sebastian-coronado.jpeg",
    linkedin: "https://www.linkedin.com/in/sebasti%C3%A1n-coronado/",
    connections: ["nurtas-alibi"],
  },
  {
    id: "nurtas-alibi",
    name: "Nurtas Alibi",
    website: "https://nurtasalibi.com",
    program: "International Relations",
    roles: [],
    verticals: [],
    profilePic: "/photos/nurtas-alibi.jpeg",
    linkedin: "https://www.linkedin.com/in/nurtas-alibi-45557734a/",
    instagram: "https://www.instagram.com/allibiev_/",
    connections: ["sebastian-coronado"],
  },

  {
    id: "shohijahon-rustamov",
    name: "Shohijahon Rustamov",
    website: "https://rustamovsh.vercel.app/",
    program: "Computer Engineering",
    year: "2027",
    roles: ["engineering", "design"],
    verticals: ["ai", "saas"],
    profilePic: "/photos/shohijahon-rustamov.jpg",
    instagram: "https://www.instagram.com/shkhrustamov/",
    twitter: "https://x.com/shkhrustamov",
    linkedin: "https://www.linkedin.com/in/shohijahon-rustamov-6aa968242/",
  },

  // ============================================
  // ADD YOUR ENTRY ABOVE THIS LINE
{
  id: "yuri-dejoya",                          // hyphens, lowercase
  name: "Yuri Evgeni U. de Joya",
  website: "https:yedyederyedest.com",       // required
  program: "Computer Engineering",          // your program at vistula
  year: "2027",                             // optional: graduation year
  roles: ["engineering", "software", "hardware"],         // what you do — see options below
  verticals: [""],               // industries you care about — see options below
  profilePic: "/photos/YuriDeJoya.jpg",
  linkedin: "https://www.linkedin.com/in/yuri-evgeni-de-joya-7a8094310/",
  instagram: "https://instagram.com/yuridejoya",
  connections: ["sebastian-coronado", "nurtas-alibi"], // ids of people you know on the webring
},
  
{
  id: "regis-Kayumba",
  name: "Regis Igirimbabazi Kayumba",
  website: "https://regiskayumba.vercel.app/",
  program: "Computer Engineering",
  year: "2027",
  roles: ["Jr IT support", "Sales", "Customer support"],
  verticals: ["Cyber security", "Automotive", "AI"],
  profilePic: "/photos/regis-kayumba.jpg",
  linkedin: "https://www.linkedin.com/in/kayumba-regis-4846161b8/",
  instagram: "https://www.instagram.com/_regis21/",
  connections: ["sebastian-coronado", "nurtas-alibi", "yuri-dejoya"],
},
  
  // ============================================
];

// Helper to get all connections for the network graph
export function getConnections(): Connection[] {
  const connections: Connection[] = [];
  
  members.forEach(member => {
    if (member.connections) {
      member.connections.forEach(targetId => {
        // Only add connection if target member exists
        if (members.some(m => m.id === targetId)) {
          connections.push({
            fromId: member.id,
            toId: targetId,
          });
        }
      });
    }
  });
  
  return connections;
}

// Helper to get the next and previous members for webring navigation
export function getWebringNavigation(currentWebsite: string): { prev: Member | null; next: Member | null } {
  const index = members.findIndex(m => m.website === currentWebsite);
  if (index === -1) {
    return { prev: null, next: null };
  }
  
  const prevIndex = (index - 1 + members.length) % members.length;
  const nextIndex = (index + 1) % members.length;
  
  return {
    prev: members[prevIndex],
    next: members[nextIndex],
  };
}

// Get a random member (useful for the webring widget)
export function getRandomMember(): Member {
  return members[Math.floor(Math.random() * members.length)];
}
