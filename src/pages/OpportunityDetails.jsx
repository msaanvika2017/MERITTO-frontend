import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  MapPin,
  Wallet,
  Send,
  Sparkles,
} from "lucide-react";

const demoOpportunities = [
  {
    id: 1,
    title: "React Website Developer",
    company: "Campus Tech Team",
    category: "Tech & Coding",
    type: "Remote",
    payment: 3000,
    deadline: "20 Oct 2026",
    skills: ["React", "JavaScript", "CSS"],
    description:
      "Build a responsive website for a student-focused project using React.",
    deliverables: [
      "Responsive website interface",
      "Reusable React components",
      "Tested desktop and mobile layouts",
    ],
  },
  {
    id: 2,
    title: "Event Photographer",
    company: "Campus Events",
    category: "Events & Media",
    type: "On-Campus",
    payment: 1500,
    deadline: "18 Oct 2026",
    skills: ["Photography", "Editing", "Creativity"],
    description:
      "Capture memorable moments at a campus event and deliver edited photographs.",
    deliverables: [
      "Event photo collection",
      "Edited high-resolution images",
      "Final digital photo album",
    ],
  },
  {
    id: 3,
    title: "Python Tutor",
    company: "Student Learning Hub",
    category: "Tutoring & STEM",
    type: "Hybrid",
    payment: 500,
    deadline: "25 Oct 2026",
    skills: ["Python", "Communication", "Teaching"],
    description:
      "Help beginners understand Python fundamentals through interactive sessions.",
    deliverables: [
      "Interactive tutoring sessions",
      "Practice questions",
      "Learning progress summary",
    ],
  },
  {
    id: 4,
    title: "UI/UX Design Assistant",
    company: "Creative Studio",
    category: "Design & Creative",
    type: "Remote",
    payment: 2500,
    deadline: "22 Oct 2026",
    skills: ["Figma", "UI Design", "Prototyping"],
    description:
      "Create clean interface designs and interactive prototypes for a web application.",
    deliverables: [
      "Figma interface designs",
      "Clickable prototype",
      "Mobile-responsive layouts",
    ],
  },
  {
    id: 5,
    title: "Student Hackathon Challenge",
    company: "Innovation Community",
    category: "Hackathons",
    type: "Remote",
    payment: 25000,
    deadline: "30 Oct 2026",
    skills: ["Problem Solving", "Teamwork", "Technology"],
    description:
      "Participate in a team challenge and compete for a prize pool.",
    deliverables: [
      "Working project prototype",
      "Project presentation",
      "Final demonstration",
    ],
  },
  {
    id: 6,
    title: "Social Media Content Creator",
    company: "Campus Media Club",
    category: "Events & Media",
    type: "Hybrid",
    payment: 1200,
    deadline: "24 Oct 2026",
    skills: ["Content Creation", "Canva", "Social Media"],
    description:
      "Create engaging social media posts and promotional content for campus activities.",
    deliverables: [
      "Social media graphics",
      "Content calendar",
      "Promotional captions",
    ],
  },
];

export default function OpportunityDetails() {
  const { id } = useParams();

  const opportunity = demoOpportunities.find(
    (item) => item.id === Number(id)
  );

  const [proposal, setProposal] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [timeframe, setTimeframe] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();

    if (!proposal.trim() || !timeframe) {
      setMessage("Please complete your proposal and timeframe.");
      return;
    }

    if (portfolio.trim()) {
      try {
        const parsedUrl = new URL(portfolio);

        if (!["http:", "https:"].includes(parsedUrl.protocol)) {
          throw new Error("Invalid URL protocol");
        }
      } catch {
        setMessage("Please enter a valid portfolio URL.");
        return;
      }
    }

    const application = {
      id: Date.now(),
      opportunityId: opportunity.id,
      opportunityTitle: opportunity.title,
      company: opportunity.company,
      proposal,
      portfolio,
      timeframe,
      status: "Pending",
      submittedAt: new Date().toISOString(),
    };

    try {
      const previousApplications = JSON.parse(
        localStorage.getItem("meritto_demo_applications") || "[]"
      );

      if (!Array.isArray(previousApplications)) {
        throw new Error("Invalid application data");
      }

      previousApplications.push(application);

      localStorage.setItem(
        "meritto_demo_applications",
        JSON.stringify(previousApplications)
      );

      setSubmitted(true);
      setMessage(
        "Demo application saved in this browser! It has not been sent to a real employer."
      );
    } catch {
      setMessage(
        "Could not save your demo application. Please try again."
      );
    }
  }

  if (!opportunity) {
    return (
      <main className="meritto-page">
        <div className="opportunity-not-found">
          <h1>Opportunity not found 😕</h1>
          <p>This opportunity doesn't exist in our demo dataset.</p>

          <Link to="/opportunities" className="primary-button">
            Browse opportunities
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="meritto-page">
      <section className="details-container">
        <Link to="/opportunities" className="back-link">
          <ArrowLeft size={18} />
          Back to opportunities
        </Link>

        <div className="details-layout">
          <section className="details-main">
            <div className="details-label">
              <Sparkles size={16} />
              {opportunity.category}
            </div>

            <h1>{opportunity.title}</h1>

            <p className="details-company">
              {opportunity.company}
            </p>

            <div className="details-meta">
              <span>
                <MapPin size={17} />
                {opportunity.type}
              </span>

              <span>
                <Clock size={17} />
                Deadline: {opportunity.deadline}
              </span>
            </div>

            <section className="details-section">
              <h2>About this opportunity</h2>
              <p>{opportunity.description}</p>
            </section>

            <section className="details-section">
              <h2>Skills you'll need</h2>

              <div className="opportunity-skills details-skills">
                {opportunity.skills.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>
            </section>

            <section className="details-section">
              <h2>Expected deliverables</h2>

              <ul className="deliverables-list">
                {opportunity.deliverables.map((item) => (
                  <li key={item}>
                    <CheckCircle2 size={18} />
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <p className="demo-disclaimer">
              Demo opportunity: This is illustrative content. The
              organization, compensation, and deadline have not been
              independently verified.
            </p>
          </section>

          <aside className="application-panel">
            <div className="payment-label">
              <Wallet size={19} />
              Demonstration compensation
            </div>

            <div className="details-payment">
              ₹{opportunity.payment.toLocaleString("en-IN")}
            </div>

            <p className="payment-note">
              Illustrative amount, not a guaranteed payment.
            </p>

            {!submitted ? (
              <form onSubmit={handleSubmit}>
                <h2>Apply for this opportunity</h2>

                <label htmlFor="proposal">
                  Why are you a good fit?
                </label>

                <textarea
                  id="proposal"
                  rows="5"
                  value={proposal}
                  onChange={(event) => setProposal(event.target.value)}
                  placeholder="Tell us about your skills and ideas..."
                  required
                />

                <label htmlFor="portfolio">
                  Portfolio or GitHub URL (optional)
                </label>

                <input
                  id="portfolio"
                  type="url"
                  value={portfolio}
                  onChange={(event) => setPortfolio(event.target.value)}
                  placeholder="https://github.com/yourname"
                />

                <label htmlFor="timeframe">
                  Expected completion timeframe
                </label>

                <select
                  id="timeframe"
                  value={timeframe}
                  onChange={(event) => setTimeframe(event.target.value)}
                  required
                >
                  <option value="">Select timeframe</option>
                  <option value="1-3 days">1–3 days</option>
                  <option value="1 week">1 week</option>
                  <option value="2 weeks">2 weeks</option>
                  <option value="1 month">1 month</option>
                </select>

                <button type="submit" className="apply-button">
                  Submit demo application
                  <Send size={17} />
                </button>

                {message && (
                  <p className="form-feedback" role="status">
                    {message}
                  </p>
                )}
              </form>
            ) : (
              <div className="application-success">
                <CheckCircle2 size={42} />

                <h2>Application saved!</h2>

                <p>{message}</p>

                <Link
                  to="/applications"
                  className="primary-button"
                >
                  View my applications
                </Link>
              </div>
            )}
          </aside>
        </div>
      </section>
    </main>
  );
}