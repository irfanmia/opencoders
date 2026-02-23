import type { User, Project, Contribution, Launch } from "./api";

// Extended types for mock data
export interface MockUser extends User {
  followers: number;
  following: number;
  skills: { name: string; level: number }[]; // 0-100
  contribution_count: number;
  github_url: string;
}

export const mockUsers: MockUser[] = [
  {
    id: 1, username: "sarah_dev", github_id: "12345",
    bio: "Full-stack developer passionate about open source. Building tools that make developers' lives easier. 🚀",
    portfolio_slug: "sarah", avatar_url: "https://ui-avatars.com/api/?name=Sarah+Chen&background=a3e635&color=000&bold=true&size=128",
    is_bot_verified: true, location: "San Francisco, CA", website: "https://sarah.dev",
    created_at: "2023-06-15T10:00:00Z", updated_at: "2024-01-20T10:00:00Z",
    followers: 842, following: 156,
    skills: [{ name: "TypeScript", level: 95 }, { name: "React", level: 90 }, { name: "Node.js", level: 85 }, { name: "Python", level: 70 }, { name: "PostgreSQL", level: 65 }],
    contribution_count: 347, github_url: "https://github.com/sarahchen",
  },
  {
    id: 2, username: "alex_rust", github_id: "23456",
    bio: "Systems programmer & Rust evangelist. Contributing to the Linux kernel in my spare time. 🦀",
    portfolio_slug: "alex", avatar_url: "https://ui-avatars.com/api/?name=Alex+Rust&background=f472b6&color=000&bold=true&size=128",
    is_bot_verified: true, location: "Berlin, Germany", website: "https://alexrust.dev",
    created_at: "2023-03-10T10:00:00Z", updated_at: "2024-01-18T10:00:00Z",
    followers: 1203, following: 89,
    skills: [{ name: "Rust", level: 98 }, { name: "C", level: 90 }, { name: "Linux", level: 88 }, { name: "Go", level: 72 }, { name: "Assembly", level: 60 }],
    contribution_count: 562, github_url: "https://github.com/alexrust",
  },
  {
    id: 3, username: "ml_ninja", github_id: "34567",
    bio: "ML engineer @ startup. Open source AI tools for everyone. PyTorch contributor.",
    portfolio_slug: "ml-ninja", avatar_url: "https://ui-avatars.com/api/?name=Maya+Lin&background=60a5fa&color=fff&bold=true&size=128",
    is_bot_verified: true, location: "Tokyo, Japan", website: "https://mlninja.io",
    created_at: "2023-08-01T10:00:00Z", updated_at: "2024-01-19T10:00:00Z",
    followers: 2100, following: 210,
    skills: [{ name: "Python", level: 96 }, { name: "PyTorch", level: 92 }, { name: "TensorFlow", level: 85 }, { name: "CUDA", level: 78 }, { name: "Rust", level: 45 }],
    contribution_count: 891, github_url: "https://github.com/mlninja",
  },
  {
    id: 4, username: "go_master", github_id: "45678",
    bio: "Backend architect. Building distributed systems with Go. Kubernetes contributor.",
    portfolio_slug: "gomaster", avatar_url: "https://ui-avatars.com/api/?name=Go+Master&background=facc15&color=000&bold=true&size=128",
    is_bot_verified: false, location: "Austin, TX", website: "https://gomaster.dev",
    created_at: "2023-05-20T10:00:00Z", updated_at: "2024-01-15T10:00:00Z",
    followers: 567, following: 134,
    skills: [{ name: "Go", level: 97 }, { name: "Kubernetes", level: 90 }, { name: "Docker", level: 88 }, { name: "gRPC", level: 82 }, { name: "PostgreSQL", level: 75 }],
    contribution_count: 423, github_url: "https://github.com/gomaster",
  },
  {
    id: 5, username: "frontend_queen", github_id: "56789",
    bio: "Design engineer. Making the web beautiful, one component at a time. Svelte core team. 💅",
    portfolio_slug: "fqueen", avatar_url: "https://ui-avatars.com/api/?name=Priya+Shah&background=fb923c&color=000&bold=true&size=128",
    is_bot_verified: true, location: "London, UK", website: "https://priyashah.design",
    created_at: "2023-04-12T10:00:00Z", updated_at: "2024-01-20T10:00:00Z",
    followers: 1560, following: 320,
    skills: [{ name: "Svelte", level: 95 }, { name: "CSS", level: 93 }, { name: "TypeScript", level: 88 }, { name: "Figma", level: 85 }, { name: "React", level: 80 }],
    contribution_count: 678, github_url: "https://github.com/priyashah",
  },
  {
    id: 6, username: "devops_dan", github_id: "67890",
    bio: "SRE by day, open source contributor by night. Terraform and Ansible wizard. 🧙",
    portfolio_slug: "devopsdan", avatar_url: "https://ui-avatars.com/api/?name=Dan+Ops&background=22d3ee&color=000&bold=true&size=128",
    is_bot_verified: false, location: "Toronto, Canada", website: "https://devopsdan.com",
    created_at: "2023-09-01T10:00:00Z", updated_at: "2024-01-17T10:00:00Z",
    followers: 389, following: 201,
    skills: [{ name: "Terraform", level: 94 }, { name: "Docker", level: 91 }, { name: "Python", level: 80 }, { name: "Bash", level: 88 }, { name: "Go", level: 60 }],
    contribution_count: 234, github_url: "https://github.com/devopsdan",
  },
  {
    id: 7, username: "web3_wizard", github_id: "78901",
    bio: "Solidity dev building the decentralized future. Ethereum core contributor.",
    portfolio_slug: "web3wiz", avatar_url: "https://ui-avatars.com/api/?name=Wei+Zhang&background=a3e635&color=000&bold=true&size=128",
    is_bot_verified: true, location: "Singapore", website: "https://web3wizard.eth",
    created_at: "2023-07-15T10:00:00Z", updated_at: "2024-01-16T10:00:00Z",
    followers: 945, following: 78,
    skills: [{ name: "Solidity", level: 96 }, { name: "TypeScript", level: 85 }, { name: "Rust", level: 75 }, { name: "React", level: 70 }, { name: "Go", level: 55 }],
    contribution_count: 312, github_url: "https://github.com/web3wizard",
  },
  {
    id: 8, username: "data_diana", github_id: "89012",
    bio: "Data scientist turned engineer. Apache Spark contributor. Love crunching numbers at scale.",
    portfolio_slug: "datadiana", avatar_url: "https://ui-avatars.com/api/?name=Diana+Data&background=f472b6&color=000&bold=true&size=128",
    is_bot_verified: true, location: "New York, NY", website: "https://datadiana.io",
    created_at: "2023-02-28T10:00:00Z", updated_at: "2024-01-14T10:00:00Z",
    followers: 1890, following: 145,
    skills: [{ name: "Python", level: 94 }, { name: "Scala", level: 88 }, { name: "SQL", level: 92 }, { name: "Spark", level: 90 }, { name: "R", level: 70 }],
    contribution_count: 756, github_url: "https://github.com/datadiana",
  },
  {
    id: 9, username: "mobile_mike", github_id: "90123",
    bio: "React Native & Flutter developer. Making mobile apps that don't suck.",
    portfolio_slug: "mobilemike", avatar_url: "https://ui-avatars.com/api/?name=Mike+Mobile&background=60a5fa&color=fff&bold=true&size=128",
    is_bot_verified: false, location: "Melbourne, Australia", website: "https://mobilemike.dev",
    created_at: "2023-10-05T10:00:00Z", updated_at: "2024-01-13T10:00:00Z",
    followers: 234, following: 167,
    skills: [{ name: "React Native", level: 93 }, { name: "Flutter", level: 88 }, { name: "TypeScript", level: 85 }, { name: "Swift", level: 72 }, { name: "Kotlin", level: 68 }],
    contribution_count: 189, github_url: "https://github.com/mobilemike",
  },
];

export const mockProjects: Project[] = [
  {
    id: 1, name: "Linux Kernel", slug: "linux", is_official: true, owner_org: "torvalds",
    repo_url: "https://github.com/torvalds/linux", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
    description: "The Linux kernel source tree — the heart of millions of servers and devices worldwide.",
    tech_stack: ["C", "Assembly", "Makefile"],
    owner: { id: 2, username: "alex_rust", avatar_url: mockUsers[1].avatar_url, portfolio_slug: "alex" },
    star_count: 182000, created_at: "2023-01-01T00:00:00Z",
  },
  {
    id: 2, name: "React", slug: "react", is_official: true, owner_org: "facebook",
    repo_url: "https://github.com/facebook/react", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    description: "The library for web and native user interfaces. Build declarative UIs with ease.",
    tech_stack: ["JavaScript", "TypeScript", "Flow"],
    owner: { id: 1, username: "sarah_dev", avatar_url: mockUsers[0].avatar_url, portfolio_slug: "sarah" },
    star_count: 225000, created_at: "2023-01-05T00:00:00Z",
  },
  {
    id: 3, name: "Python CPython", slug: "cpython", is_official: true, owner_org: "python",
    repo_url: "https://github.com/python/cpython", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    description: "The Python programming language reference implementation.",
    tech_stack: ["Python", "C", "Assembly"],
    owner: { id: 3, username: "ml_ninja", avatar_url: mockUsers[2].avatar_url, portfolio_slug: "ml-ninja" },
    star_count: 62000, created_at: "2023-01-02T00:00:00Z",
  },
  {
    id: 4, name: "Kubernetes", slug: "kubernetes", is_official: true, owner_org: "kubernetes",
    repo_url: "https://github.com/kubernetes/kubernetes", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg",
    description: "Production-grade container orchestration for automating deployment, scaling, and management.",
    tech_stack: ["Go", "Shell", "Docker"],
    owner: { id: 4, username: "go_master", avatar_url: mockUsers[3].avatar_url, portfolio_slug: "gomaster" },
    star_count: 110000, created_at: "2023-01-03T00:00:00Z",
  },
  {
    id: 5, name: "DevTracker", slug: "devtracker", is_official: false, owner_org: "",
    repo_url: "https://github.com/sarah_dev/devtracker", logo: "https://api.dicebear.com/7.x/shapes/svg?seed=devtracker&backgroundColor=E8F5E9",
    description: "Track your development habits and boost productivity with smart insights.",
    tech_stack: ["React", "Node.js", "PostgreSQL"],
    owner: { id: 1, username: "sarah_dev", avatar_url: mockUsers[0].avatar_url, portfolio_slug: "sarah" },
    star_count: 1240, created_at: "2024-01-15T10:00:00Z",
  },
  {
    id: 6, name: "GitViz", slug: "gitviz", is_official: false, owner_org: "opencoders",
    repo_url: "https://github.com/opencoders/gitviz", logo: "https://api.dicebear.com/7.x/shapes/svg?seed=gitviz&backgroundColor=E8F5E9",
    description: "Beautiful, interactive visualizations for your Git history and contribution patterns.",
    tech_stack: ["TypeScript", "D3.js", "Rust"],
    owner: { id: 2, username: "alex_rust", avatar_url: mockUsers[1].avatar_url, portfolio_slug: "alex" },
    star_count: 3400, created_at: "2024-01-10T10:00:00Z",
  },
  {
    id: 7, name: "CodeReview Bot", slug: "codereview-bot", is_official: false, owner_org: "",
    repo_url: "https://github.com/mlninja/codereview-bot", logo: "https://api.dicebear.com/7.x/shapes/svg?seed=codereview&backgroundColor=E8F5E9",
    description: "AI-powered code review assistant that integrates with GitHub PRs.",
    tech_stack: ["Python", "FastAPI", "OpenAI"],
    owner: { id: 3, username: "ml_ninja", avatar_url: mockUsers[2].avatar_url, portfolio_slug: "ml-ninja" },
    star_count: 2800, created_at: "2024-01-08T10:00:00Z",
  },
  {
    id: 8, name: "SvelteKit Auth", slug: "sveltekit-auth", is_official: false, owner_org: "",
    repo_url: "https://github.com/priyashah/sveltekit-auth", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/svelte/svelte-original.svg",
    description: "Drop-in authentication for SvelteKit apps. OAuth, magic links, and more.",
    tech_stack: ["Svelte", "TypeScript", "Node.js"],
    owner: { id: 5, username: "frontend_queen", avatar_url: mockUsers[4].avatar_url, portfolio_slug: "fqueen" },
    star_count: 890, created_at: "2024-01-05T10:00:00Z",
  },
  {
    id: 9, name: "TerraStack", slug: "terrastack", is_official: false, owner_org: "",
    repo_url: "https://github.com/devopsdan/terrastack", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg",
    description: "Opinionated Terraform modules for production-ready cloud infrastructure.",
    tech_stack: ["Terraform", "Go", "Python"],
    owner: { id: 6, username: "devops_dan", avatar_url: mockUsers[5].avatar_url, portfolio_slug: "devopsdan" },
    star_count: 560, created_at: "2024-01-02T10:00:00Z",
  },
  {
    id: 10, name: "DeFi SDK", slug: "defi-sdk", is_official: false, owner_org: "",
    repo_url: "https://github.com/web3wizard/defi-sdk", logo: "https://api.dicebear.com/7.x/shapes/svg?seed=defisdk&backgroundColor=E8F5E9",
    description: "TypeScript SDK for interacting with major DeFi protocols. Uniswap, Aave, Compound.",
    tech_stack: ["Solidity", "TypeScript", "Ethers.js"],
    owner: { id: 7, username: "web3_wizard", avatar_url: mockUsers[6].avatar_url, portfolio_slug: "web3wiz" },
    star_count: 1670, created_at: "2024-01-12T10:00:00Z",
  },
  {
    id: 11, name: "DataPipe", slug: "datapipe", is_official: false, owner_org: "",
    repo_url: "https://github.com/datadiana/datapipe", logo: "https://api.dicebear.com/7.x/shapes/svg?seed=datapipe&backgroundColor=E8F5E9",
    description: "Stream processing framework built on Apache Spark for real-time data pipelines.",
    tech_stack: ["Scala", "Python", "Spark"],
    owner: { id: 8, username: "data_diana", avatar_url: mockUsers[7].avatar_url, portfolio_slug: "datadiana" },
    star_count: 2100, created_at: "2024-01-06T10:00:00Z",
  },
  {
    id: 12, name: "CrossApp", slug: "crossapp", is_official: false, owner_org: "",
    repo_url: "https://github.com/mobilemike/crossapp", logo: "https://api.dicebear.com/7.x/shapes/svg?seed=crossapp&backgroundColor=E8F5E9",
    description: "Cross-platform UI components that look native on iOS and Android.",
    tech_stack: ["React Native", "TypeScript", "Swift", "Kotlin"],
    owner: { id: 9, username: "mobile_mike", avatar_url: mockUsers[8].avatar_url, portfolio_slug: "mobilemike" },
    star_count: 430, created_at: "2024-01-09T10:00:00Z",
  },
];

export const mockContributions: Contribution[] = [
  { id: 1, user: { id: 1, username: "sarah_dev", avatar_url: mockUsers[0].avatar_url }, project: 2, type: "PR", verification_status: "VERIFIED", url: "https://github.com/facebook/react/pull/28001", title: "Fix concurrent mode race condition in useEffect cleanup", date: "2024-01-19T15:30:00Z" },
  { id: 2, user: { id: 1, username: "sarah_dev", avatar_url: mockUsers[0].avatar_url }, project: 5, type: "COMMIT", verification_status: "VERIFIED", url: "https://github.com/sarah_dev/devtracker/commit/abc123", title: "Add weekly productivity dashboard with charts", date: "2024-01-18T10:00:00Z" },
  { id: 3, user: { id: 1, username: "sarah_dev", avatar_url: mockUsers[0].avatar_url }, project: 2, type: "ISSUE", verification_status: "VERIFIED", url: "https://github.com/facebook/react/issues/28050", title: "RFC: New hooks API for server components", date: "2024-01-17T08:00:00Z" },
  { id: 4, user: { id: 2, username: "alex_rust", avatar_url: mockUsers[1].avatar_url }, project: 1, type: "PR", verification_status: "VERIFIED", url: "https://github.com/torvalds/linux/pull/999", title: "Optimize memory allocator for ARM64 architecture", date: "2024-01-20T09:00:00Z" },
  { id: 5, user: { id: 2, username: "alex_rust", avatar_url: mockUsers[1].avatar_url }, project: 6, type: "COMMIT", verification_status: "VERIFIED", url: "https://github.com/opencoders/gitviz/commit/def456", title: "Add 3D visualization mode for commit history", date: "2024-01-19T14:00:00Z" },
  { id: 6, user: { id: 2, username: "alex_rust", avatar_url: mockUsers[1].avatar_url }, project: 1, type: "PR", verification_status: "VERIFIED", url: "https://github.com/torvalds/linux/pull/998", title: "Fix race condition in filesystem driver", date: "2024-01-18T11:00:00Z" },
  { id: 7, user: { id: 3, username: "ml_ninja", avatar_url: mockUsers[2].avatar_url }, project: 3, type: "PR", verification_status: "VERIFIED", url: "https://github.com/python/cpython/pull/5001", title: "Improve asyncio performance with new event loop", date: "2024-01-20T06:00:00Z" },
  { id: 8, user: { id: 3, username: "ml_ninja", avatar_url: mockUsers[2].avatar_url }, project: 7, type: "COMMIT", verification_status: "VERIFIED", url: "https://github.com/mlninja/codereview-bot/commit/ghi789", title: "Add GPT-4 integration for smarter code reviews", date: "2024-01-19T12:00:00Z" },
  { id: 9, user: { id: 4, username: "go_master", avatar_url: mockUsers[3].avatar_url }, project: 4, type: "PR", verification_status: "VERIFIED", url: "https://github.com/kubernetes/kubernetes/pull/12001", title: "Implement horizontal pod autoscaler v2 improvements", date: "2024-01-18T16:00:00Z" },
  { id: 10, user: { id: 4, username: "go_master", avatar_url: mockUsers[3].avatar_url }, project: 4, type: "ISSUE", verification_status: "PENDING", url: "https://github.com/kubernetes/kubernetes/issues/12050", title: "Proposal: Native sidecar container support", date: "2024-01-17T09:00:00Z" },
  { id: 11, user: { id: 5, username: "frontend_queen", avatar_url: mockUsers[4].avatar_url }, project: 8, type: "COMMIT", verification_status: "VERIFIED", url: "https://github.com/priyashah/sveltekit-auth/commit/jkl012", title: "Add magic link authentication flow", date: "2024-01-20T10:00:00Z" },
  { id: 12, user: { id: 5, username: "frontend_queen", avatar_url: mockUsers[4].avatar_url }, project: 2, type: "PR", verification_status: "VERIFIED", url: "https://github.com/facebook/react/pull/27999", title: "Improve accessibility for Dialog component", date: "2024-01-16T13:00:00Z" },
  { id: 13, user: { id: 6, username: "devops_dan", avatar_url: mockUsers[5].avatar_url }, project: 9, type: "COMMIT", verification_status: "VERIFIED", url: "https://github.com/devopsdan/terrastack/commit/mno345", title: "Add AWS EKS module with Fargate support", date: "2024-01-19T08:00:00Z" },
  { id: 14, user: { id: 6, username: "devops_dan", avatar_url: mockUsers[5].avatar_url }, project: 4, type: "PR", verification_status: "PENDING", url: "https://github.com/kubernetes/kubernetes/pull/12002", title: "Add Terraform provider for K8s custom resources", date: "2024-01-15T11:00:00Z" },
  { id: 15, user: { id: 7, username: "web3_wizard", avatar_url: mockUsers[6].avatar_url }, project: 10, type: "COMMIT", verification_status: "VERIFIED", url: "https://github.com/web3wizard/defi-sdk/commit/pqr678", title: "Add Uniswap V4 hooks integration", date: "2024-01-20T07:00:00Z" },
  { id: 16, user: { id: 7, username: "web3_wizard", avatar_url: mockUsers[6].avatar_url }, project: 10, type: "PR", verification_status: "VERIFIED", url: "https://github.com/web3wizard/defi-sdk/pull/45", title: "Implement flash loan aggregator", date: "2024-01-18T15:00:00Z" },
  { id: 17, user: { id: 8, username: "data_diana", avatar_url: mockUsers[7].avatar_url }, project: 11, type: "COMMIT", verification_status: "VERIFIED", url: "https://github.com/datadiana/datapipe/commit/stu901", title: "Add real-time windowed aggregation support", date: "2024-01-19T16:00:00Z" },
  { id: 18, user: { id: 8, username: "data_diana", avatar_url: mockUsers[7].avatar_url }, project: 3, type: "PR", verification_status: "VERIFIED", url: "https://github.com/python/cpython/pull/5002", title: "Optimize pandas interop in data module", date: "2024-01-17T14:00:00Z" },
  { id: 19, user: { id: 9, username: "mobile_mike", avatar_url: mockUsers[8].avatar_url }, project: 12, type: "COMMIT", verification_status: "VERIFIED", url: "https://github.com/mobilemike/crossapp/commit/vwx234", title: "Add native bottom sheet component for iOS and Android", date: "2024-01-18T09:00:00Z" },
  { id: 20, user: { id: 9, username: "mobile_mike", avatar_url: mockUsers[8].avatar_url }, project: 2, type: "ISSUE", verification_status: "PENDING", url: "https://github.com/facebook/react/issues/28051", title: "Bug: React Native new arch crashes on Android 14", date: "2024-01-16T07:00:00Z" },
  { id: 21, user: { id: 1, username: "sarah_dev", avatar_url: mockUsers[0].avatar_url }, project: 5, type: "PR", verification_status: "VERIFIED", url: "https://github.com/sarah_dev/devtracker/pull/12", title: "Add GitHub integration for automatic tracking", date: "2024-01-15T12:00:00Z" },
  { id: 22, user: { id: 3, username: "ml_ninja", avatar_url: mockUsers[2].avatar_url }, project: 7, type: "PR", verification_status: "VERIFIED", url: "https://github.com/mlninja/codereview-bot/pull/30", title: "Support multi-language code analysis", date: "2024-01-14T10:00:00Z" },
  { id: 23, user: { id: 5, username: "frontend_queen", avatar_url: mockUsers[4].avatar_url }, project: 8, type: "PR", verification_status: "VERIFIED", url: "https://github.com/priyashah/sveltekit-auth/pull/20", title: "Add OAuth2 PKCE flow for SPAs", date: "2024-01-13T14:00:00Z" },
];

export const mockLaunches: Launch[] = [
  {
    id: 1, project: 5,
    project_detail: mockProjects[4],
    launched_by: { id: 1, username: "sarah_dev", avatar_url: mockUsers[0].avatar_url },
    launch_date: "2024-01-20T12:00:00Z", upvote_count: 142, seeking_help: true,
    description: "Track your development habits with smart insights. We just shipped v2.0 with AI-powered productivity tips! Looking for contributors who know React and data viz.",
    created_at: "2024-01-20T12:00:00Z",
  },
  {
    id: 2, project: 6,
    project_detail: mockProjects[5],
    launched_by: { id: 2, username: "alex_rust", avatar_url: mockUsers[1].avatar_url },
    launch_date: "2024-01-19T09:00:00Z", upvote_count: 228, seeking_help: false,
    description: "Visualize your Git history like never before. 3D commit graphs, branch timelines, and contributor networks. v1.0 is here! 🎉",
    created_at: "2024-01-19T09:00:00Z",
  },
  {
    id: 3, project: 7,
    project_detail: mockProjects[6],
    launched_by: { id: 3, username: "ml_ninja", avatar_url: mockUsers[2].avatar_url },
    launch_date: "2024-01-18T14:00:00Z", upvote_count: 89, seeking_help: true,
    description: "AI-powered code review bot that actually understands your codebase. Now with GPT-4 and multi-language support. Need help with Go integration!",
    created_at: "2024-01-18T14:00:00Z",
  },
  {
    id: 4, project: 8,
    project_detail: mockProjects[7],
    launched_by: { id: 5, username: "frontend_queen", avatar_url: mockUsers[4].avatar_url },
    launch_date: "2024-01-17T11:00:00Z", upvote_count: 67, seeking_help: false,
    description: "Drop-in auth for SvelteKit. OAuth, magic links, session management — everything you need. Zero config required.",
    created_at: "2024-01-17T11:00:00Z",
  },
  {
    id: 5, project: 10,
    project_detail: mockProjects[9],
    launched_by: { id: 7, username: "web3_wizard", avatar_url: mockUsers[6].avatar_url },
    launch_date: "2024-01-16T08:00:00Z", upvote_count: 156, seeking_help: true,
    description: "TypeScript SDK for DeFi. Swap, lend, borrow across Uniswap, Aave, and Compound with a unified API. Looking for Solidity auditors!",
    created_at: "2024-01-16T08:00:00Z",
  },
  {
    id: 6, project: 11,
    project_detail: mockProjects[10],
    launched_by: { id: 8, username: "data_diana", avatar_url: mockUsers[7].avatar_url },
    launch_date: "2024-01-15T10:00:00Z", upvote_count: 203, seeking_help: false,
    description: "Real-time data pipelines built on Spark. Process millions of events per second with windowed aggregations and exactly-once semantics.",
    created_at: "2024-01-15T10:00:00Z",
  },
  {
    id: 7, project: 9,
    project_detail: mockProjects[8],
    launched_by: { id: 6, username: "devops_dan", avatar_url: mockUsers[5].avatar_url },
    launch_date: "2024-01-14T16:00:00Z", upvote_count: 45, seeking_help: true,
    description: "Production-ready Terraform modules for AWS, GCP, and Azure. EKS, RDS, VPC — all battle-tested. Need contributors for Azure modules!",
    created_at: "2024-01-14T16:00:00Z",
  },
  {
    id: 8, project: 12,
    project_detail: mockProjects[11],
    launched_by: { id: 9, username: "mobile_mike", avatar_url: mockUsers[8].avatar_url },
    launch_date: "2024-01-13T13:00:00Z", upvote_count: 34, seeking_help: true,
    description: "Cross-platform UI components that feel truly native. Bottom sheets, haptics, gestures — all with one API. Need iOS and Android testers!",
    created_at: "2024-01-13T13:00:00Z",
  },
];

// Weekly trending projects (sorted by upvotes/stars for "Popular This Week")
export const weeklyTrending = [
  mockLaunches[1], // GitViz - 228
  mockLaunches[5], // DataPipe - 203
  mockLaunches[4], // DeFi SDK - 156
  mockLaunches[0], // DevTracker - 142
  mockLaunches[2], // CodeReview Bot - 89
  mockLaunches[3], // SvelteKit Auth - 67
];

// Leaderboard: top contributors sorted by contribution_count
export const leaderboard = [...mockUsers]
  .sort((a, b) => b.contribution_count - a.contribution_count)
  .map((user, index) => ({
    rank: index + 1,
    ...user,
    topLanguages: user.skills.slice(0, 3).map((s) => s.name),
  }));

// Latest projects (most recently created)
export const latestProjects = [...mockProjects]
  .filter((p) => !p.is_official)
  .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
  .slice(0, 6);

// Helper functions
export function getUserByUsername(username: string): MockUser | undefined {
  return mockUsers.find((u) => u.username === username);
}

export function getContributionsByUser(userId: number): Contribution[] {
  return mockContributions.filter((c) => c.user.id === userId);
}

export function getProjectById(id: number): Project | undefined {
  return mockProjects.find((p) => p.id === id);
}

export function getProjectsByUser(userId: number): Project[] {
  return mockProjects.filter((p) => p.owner.id === userId);
}

export function timeAgo(dateStr: string): string {
  const now = new Date();
  const date = new Date(dateStr);
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  return `${months}mo ago`;
}
