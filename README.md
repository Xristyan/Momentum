# Momentum: Gamified Productivity Suite

**Momentum** is a high-performance productivity platform designed to bridge the gap between project management and employee engagement. By integrating industry-standard tools like **Jira** and **GitHub** with a custom **XP-based reward system**, Momentum turns daily tasks into an addictive, collaborative experience.

**[Live Demo]()** | **[Report Bug]()**

---

## 🚀 Core Features

### 🏢 Organization & Team Management

* **Multi-Tenant Architecture:** Create and manage distinct organizations.
* **Real-time Collaboration:** Invite colleagues to workspaces and assign tasks dynamically.
* **Unified Dashboard:** A centralized view of all active sprints and deadlines.

### 🎮 Gamification & Progression

* **XP System:** Earn experience points (XP) for every task completed.
* **Leveling System:** Track professional growth through visual milestones.
* **Streaks & Achievements:** Encourages daily consistency through "addictive" progress loops.

### 🔗 Third-Party Integrations

* **GitHub:** Sync pull requests and commits to task completion.
* **Jira:** Import epics and tickets directly into your Momentum workflow.

---

## 🛠 Tech Stack

| Layer | Technologies |
| --- | --- |
| **Frontend** | React, Next.js (App Router), Tailwind CSS, Shadcn/UI, Lucide Icons |
| **Backend** | Node.js, Express.js, PostgreSQL (Prisma ORM) |
| **DevOps** | Docker, AWS Lambda, AWS SQS, Terraform |
| **Language** | TypeScript (Strict Mode) |

---

## 🏗 System Architecture

The project is built with **scalability** in mind:

1. **Serverless Tasks:** Uses **AWS Lambda** for processing heavy background tasks (like syncing Jira data).
2. **Message Queuing:** **AWS SQS** ensures that integration webhooks are processed reliably without slowing down the UI.
3. **Containerization:** Fully **Dockerized** environment for consistent development and deployment.

---

## 🚦 Getting Started

### Prerequisites

* Node.js (v18+)
* Docker & Docker Compose
* PostgreSQL instance

### Installation

1. **Clone the repo**
```bash
git clone https://github.com/Xristyan/Momentum.git

```


2. **Install dependencies**
```bash
npm install

```

4. **Spin up the database**
```bash
docker-compose up -d

```

5. **Run the development server**
```bash
npm run dev

```
someone who doesn't have time to download and run your code.

**Would you like me to help you write a specific "Integration" logic description for how you connect Jira/GitHub to your XP system?**
