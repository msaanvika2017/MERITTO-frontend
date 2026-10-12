import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  MapPin,
  Clock,
  Bookmark,
  ArrowUpRight,
  Sparkles,
  Wallet,
} from "lucide-react";

const opportunities = [
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
    color: "purple",
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
    color: "pink",
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
    color: "blue",
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
    color: "orange",
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
    color: "purple",
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
    color: "pink",
  },
];

const categories = [
  "All",
  "Tech & Coding",
  "Design & Creative",
  "Tutoring & STEM",
  "Events & Media",
  "Hackathons",
];

export default function BrowseOpportunities() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [workMode, setWorkMode] = useState("All");
  const [sort, setSort] = useState("latest");
  const [bookmarks, setBookmarks] = useState([]);

  const filteredOpportunities = useMemo(() => {
    let result = opportunities.filter((item) => {
      const text = [
        item.title,
        item.company,
        item.category,
        ...item.skills,
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch = text.includes(search.toLowerCase());

      const matchesCategory =
        category === "All" || item.category === category;

      const matchesMode =
        workMode === "All" || item.type === workMode;

      return matchesSearch && matchesCategory && matchesMode;
    });

    if (sort === "highest") {
      result = [...result].sort((a, b) => b.payment - a.payment);
    }

    return result;
  }, [search, category, workMode, sort]);

  function toggleBookmark(id) {
    setBookmarks((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id]
    );
  }

  return (
    <main className="meritto-page">
      <section className="opportunity-hero">
        <div className="opportunity-eyebrow">
          <Sparkles size={16} />
          YOUR NEXT OPPORTUNITY STARTS HERE
        </div>

        <h1>
          Your skills deserve
          <br />
          <span>to get paid.</span>
        </h1>

        <p>
          Discover paid projects, creative gigs, campus work, and
          challenges that turn your skills into experience.
        </p>

        <div className="opportunity-search">
          <Search size={20} />

          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search opportunities, skills..."
            aria-label="Search opportunities"
          />

          <span>{filteredOpportunities.length} results</span>
        </div>
      </section>

      <section className="opportunity-content">
        <div className="opportunity-toolbar">
          <div>
            <h2>Explore opportunities ✨</h2>
            <p>Find something that matches your skills.</p>
          </div>

          <select
            value={sort}
            onChange={(event) => setSort(event.target.value)}
            aria-label="Sort opportunities"
          >
            <option value="latest">Latest</option>
            <option value="highest">Highest payment</option>
          </select>
        </div>

        <div className="opportunity-filters">
          {categories.map((item) => (
            <button
              key={item}
              className={`filter-pill ${
                category === item ? "active" : ""
              }`}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="work-mode-filter">
          <span>Work mode:</span>

          {["All", "Remote", "On-Campus", "Hybrid"].map((item) => (
            <button
              key={item}
              className={`mode-button ${
                workMode === item ? "active" : ""
              }`}
              onClick={() => setWorkMode(item)}
            >
              {item}
            </button>
          ))}
        </div>

        {filteredOpportunities.length > 0 ? (
          <div className="opportunity-grid">
            {filteredOpportunities.map((item) => (
              <article
                className="opportunity-card"
                key={item.id}
              >
                <div className="opportunity-card-top">
                  <span className={`category-badge ${item.color}`}>
                    {item.category}
                  </span>

                  <button
                    className={`bookmark-button ${
                      bookmarks.includes(item.id) ? "saved" : ""
                    }`}
                    onClick={() => toggleBookmark(item.id)}
                    aria-label={
                      bookmarks.includes(item.id)
                        ? "Remove bookmark"
                        : "Bookmark opportunity"
                    }
                  >
                    <Bookmark
                      size={19}
                      fill={
                        bookmarks.includes(item.id)
                          ? "currentColor"
                          : "none"
                      }
                    />
                  </button>
                </div>

                <h3>{item.title}</h3>

                <p className="opportunity-company">
                  {item.company}
                </p>

                <p className="opportunity-description">
                  {item.description}
                </p>

                <div className="opportunity-meta">
                  <span>
                    <MapPin size={15} />
                    {item.type}
                  </span>

                  <span>
                    <Clock size={15} />
                    {item.deadline}
                  </span>
                </div>

                <div className="opportunity-skills">
                  {item.skills.map((skill) => (
                    <span key={skill}>{skill}</span>
                  ))}
                </div>

                <div className="opportunity-card-bottom">
                  <div className="payment-amount">
                    <Wallet size={17} />
                    <span>
                      ₹{item.payment.toLocaleString("en-IN")}
                    </span>
                  </div>

                  <Link
                    to={`/opportunities/${item.id}`}
                    className="view-opportunity"
                  >
                    View details
                    <ArrowUpRight size={17} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="opportunity-empty">
            <Search size={32} />
            <h3>No opportunities found</h3>
            <p>Try changing your search or filters.</p>

            <button
              onClick={() => {
                setSearch("");
                setCategory("All");
                setWorkMode("All");
              }}
            >
              Clear filters
            </button>
          </div>
        )}

        <p className="demo-disclaimer">
          Demo mode: These opportunities are sample data, not verified
          live job postings. Payments and deadlines are illustrative.
        </p>
      </section>
    </main>
  );
}