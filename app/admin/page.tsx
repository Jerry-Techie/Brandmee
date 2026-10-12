"use client";

import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import Link from "next/link";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import {
  getProjects,
  addProject,
  updateProject,
  deleteProject,
  reorderProjects,
  uploadImage,
  Project,
} from "@/lib/projects";
import {
  getTestimonials,
  addTestimonial,
  updateTestimonial,
  deleteTestimonial,
  Testimonial,
} from "@/lib/testimonials";
import Image from "next/image";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  FolderKanban,
  Globe2,
  LayoutDashboard,
  LogOut,
  MessageSquareQuote,
  Search,
  Star,
  UserCircle,
} from "lucide-react";
import {
  getVisitorEvents,
  VisitorEvent,
} from "@/lib/visitorTracker";

export default function AdminPage() {
   const [isOpen, setIsOpen] = useState(false);

    const closeMenu = () => setIsOpen(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<
    "projects" | "testimonials" | "visitors"
  >(
    "projects",
  );
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Auth state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");

  // Projects state
  const [projects, setProjects] = useState<Project[]>([]);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  // Testimonials state
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [visitors, setVisitors] = useState<VisitorEvent[]>([]);
  const [isTestimonialModalOpen, setIsTestimonialModalOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] =
    useState<Testimonial | null>(null);

  const [submitting, setSubmitting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Project Form fields
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<string>("Business");
  const [description, setDescription] = useState("");
  const [codeUrl, setCodeUrl] = useState("");
  const [liveUrl, setLiveUrl] = useState("");
  const [tags, setTags] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  // Testimonial Form fields
  const [clientName, setClientName] = useState("");
  const [clientRole, setClientRole] = useState("");
  const [clientCompany, setClientCompany] = useState("");
  const [quote, setQuote] = useState("");
  const [rating, setRating] = useState<number>(5);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        fetchProjects();
        fetchTestimonials();
        fetchVisitors();
      } else {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  // Close mobile sidebar when resizing to larger screens
  useEffect(() => {
    function onResize() {
      if (
        typeof window !== "undefined" &&
        window.innerWidth > 1079 &&
        sidebarOpen
      ) {
        setSidebarOpen(false);
      }
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [sidebarOpen]);

  async function fetchProjects() {
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (error) {
      console.error("Failed to load projects:", error);
    } finally {
      setLoading(false);
    }
  }

  async function fetchTestimonials() {
    try {
      const data = await getTestimonials();
      setTestimonials(data);
    } catch (err) {
      console.error("Failed to load testimonials:", err);
    }
  }

  async function fetchVisitors() {
    try {
      setVisitors(await getVisitorEvents());
    } catch (error) {
      console.error("Failed to load visitor events:", error);
    }
  }

  async function handleLogin(e: FormEvent) {
    e.preventDefault();
    setAuthError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      setAuthError(err.message || "Invalid credentials");
    }
  }

  async function handleLogout() {
    await signOut(auth);
  }

  // Project Handlers
  function openAddProjectModal() {
    setEditingProject(null);
    setTitle("");
    setCategory("Business");
    setDescription("");
    setCodeUrl("");
    setLiveUrl("");
    setTags("");
    setImageFile(null);
    setImagePreview("");
    setIsProjectModalOpen(true);
  }

  function openEditProjectModal(project: Project) {
    setEditingProject(project);
    setTitle(project.title);
    setCategory(project.category);
    setDescription(project.description);
    setCodeUrl(project.codeUrl);
    setLiveUrl(project.liveUrl);
    setTags(project.tags ? project.tags.join(", ") : "");
    setImageFile(null);
    setImagePreview(project.image);
    setIsProjectModalOpen(true);
  }

  // Testimonial Handlers
  function openAddTestimonialModal() {
    setEditingTestimonial(null);
    setClientName("");
    setClientRole("");
    setClientCompany("");
    setQuote("");
    setRating(5);
    setAvatarFile(null);
    setAvatarPreview("");
    setIsTestimonialModalOpen(true);
  }

  function openEditTestimonialModal(item: Testimonial) {
    setEditingTestimonial(item);
    setClientName(item.name);
    setClientRole(item.role);
    setClientCompany(item.company || "");
    setQuote(item.quote);
    setRating(item.rating);
    setAvatarFile(null);
    setAvatarPreview(item.avatar || "");
    setIsTestimonialModalOpen(true);
  }

  function handleImageChange(
    e: ChangeEvent<HTMLInputElement>,
    isAvatar = false,
  ) {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (isAvatar) {
        setAvatarFile(file);
        setAvatarPreview(URL.createObjectURL(file));
      } else {
        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
      }
    }
  }

  async function handleProjectSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);

    try {
      let imageUrl = editingProject?.image || "";
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }

      const parsedTags = tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);

      if (editingProject && editingProject.id) {
        await updateProject(editingProject.id, {
          title,
          category,
          description,
          codeUrl,
          liveUrl,
          tags: parsedTags,
          image: imageUrl,
        });
      } else {
        await addProject({
          title,
          category,
          description,
          codeUrl,
          liveUrl,
          tags: parsedTags,
          image: imageUrl,
          order: projects.length,
        });
      }

      setIsProjectModalOpen(false);
      await fetchProjects();
    } catch (error: any) {
      console.error("Error saving project:", error);
      alert(error.message || "Failed to save project.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleTestimonialSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);

    try {
      let avatarUrl = editingTestimonial?.avatar || "";
      if (avatarFile) {
        avatarUrl = await uploadImage(avatarFile);
      }

      const payload: Omit<Testimonial, "id"> = {
        name: clientName,
        role: clientRole,
        company: clientCompany,
        quote,
        rating,
        avatar: avatarUrl,
        order: editingTestimonial
          ? editingTestimonial.order
          : testimonials.length,
      };

      if (editingTestimonial && editingTestimonial.id) {
        await updateTestimonial(editingTestimonial.id, payload);
        setTestimonials((prev) =>
          prev.map((t) =>
            t.id === editingTestimonial.id
              ? { id: editingTestimonial.id, ...payload }
              : t,
          ),
        );
      } else {
        const id = await addTestimonial(payload);
        setTestimonials((prev) => [...prev, { id, ...payload }]);
      }

      setIsTestimonialModalOpen(false);
    } catch (error: any) {
      console.error("Error saving testimonial:", error);
      alert(error.message || "Failed to save testimonial.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDeleteProject(project: Project) {
    if (!project.id || !confirm(`Delete "${project.title}"?`)) return;

    try {
      await deleteProject(project.id);
      await fetchProjects();
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  }

  async function handleDeleteTestimonial(testimonial: Testimonial) {
    if (
      !testimonial.id ||
      !confirm(`Delete testimonial from "${testimonial.name}"?`)
    )
      return;

    try {
      await deleteTestimonial(testimonial.id);
      setTestimonials((prev) => prev.filter((t) => t.id !== testimonial.id));
    } catch (err) {
      console.error("Failed to delete testimonial:", err);
    }
  }

  async function handleMoveProject(index: number, direction: "up" | "down") {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= projects.length) return;

    const reordered = [...projects];
    const [movedItem] = reordered.splice(index, 1);
    reordered.splice(targetIndex, 0, movedItem);

    const updatedProjects = reordered.map((item, idx) => ({
      ...item,
      order: idx,
    }));

    setProjects(updatedProjects);

    const payload = updatedProjects
      .filter((p) => p.id !== undefined)
      .map((p) => ({ id: p.id!, order: p.order }));

    await reorderProjects(payload);
  }

  const filteredProjects = projects.filter((p) => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return true;
    return (
      (p.title || "").toLowerCase().includes(q) ||
      (p.description || "").toLowerCase().includes(q) ||
      (p.tags || []).join(", ").toLowerCase().includes(q)
    );
  });

  const filteredTestimonials = testimonials.filter((t) => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return true;
    return (
      (t.name || "").toLowerCase().includes(q) ||
      (t.quote || "").toLowerCase().includes(q) ||
      (t.company || "").toLowerCase().includes(q) ||
      (t.role || "").toLowerCase().includes(q)
    );
  });

  const filteredVisitors = visitors.filter((visitor) => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return true;
    return [visitor.path, visitor.referrer, visitor.language, visitor.timezone, visitor.sessionId]
      .join(" ")
      .toLowerCase()
      .includes(q);
  });

  const projectsToShow = filteredProjects;
  const testimonialsToShow = filteredTestimonials;
  const visitorsToShow = filteredVisitors;
  const featuredProjects = filteredProjects.slice(0, 3);
  const averageRating =
    filteredTestimonials.length > 0
      ? (
          filteredTestimonials.reduce((sum, item) => sum + item.rating, 0) /
          filteredTestimonials.length
        ).toFixed(1)
      : "0.0";
  const uniqueVisitors = new Set(filteredVisitors.map((visitor) => visitor.sessionId)).size;

  if (loading) {
    return (
      <div className="admin-loading">
        <p>Loading admin panel...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="admin-login-wrapper">
        <div className="login-glow-1" />
        <div className="login-glow-2" />

        <form onSubmit={handleLogin} className="admin-login-card">
          <div className="login-header">
            <div className="login-badge">
              <span>Security Portal</span>
            </div>
            <h1 className="admin-title">Admin Sign In</h1>
            <p className="admin-subtitle">
              Enter your credentials to access the workspace.
            </p>
          </div>

          {authError && <div className="admin-error-box">{authError}</div>}

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              required
              placeholder="admin@brandme.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
            />
          </div>

          <button type="submit" className="admin-btn-primary">
            <span>Sign In</span>
            <ArrowRight size={18} />
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="admin-container admin-dashboard-shell">
      <aside className={`admin-sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="admin-office">
          <div
            className="mt-2.5 flex flex-col gap-1"
          >
            <Link
              href="/admin"
              className="nav-logo"
              aria-label="BrandME admin"
              onClick={closeMenu}
            >
              <div
                className="flex items-center gap-3"
              >
                <Image
                  src="/images/logo/brandmeIcon-logo.svg"
                  alt="BrandME Icon"
                  width={25}
                  height={20}
                  priority
                />
                <Image
                  src="/images/logo/brandme-logo.svg"
                  alt="BrandME"
                  width={100}
                  height={20}
                  priority
                />
              </div>
            </Link>
            <span className="leading-[25px]">Main office</span>
          </div>
        </div>
        <nav className="admin-sidebar-nav" aria-label="Admin sections">
          <button
            className="admin-side-link is-active"
            onClick={() => setSidebarOpen(false)}
            type="button"
          >
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </button>
          <button
            className={`admin-side-link ${activeTab === "projects" ? "is-selected" : ""}`}
            onClick={() => {
              setActiveTab("projects");
              setSidebarOpen(false);
            }}
            type="button"
          >
            <FolderKanban size={18} />
            <span>Projects</span>
          </button>
          <button
            className={`admin-side-link ${activeTab === "testimonials" ? "is-selected" : ""}`}
            onClick={() => {
              setActiveTab("testimonials");
              setSidebarOpen(false);
            }}
            type="button"
          >
            <MessageSquareQuote size={18} />
            <span>Testimonials</span>
          </button>
          <button
            className={`admin-side-link ${activeTab === "visitors" ? "is-selected" : ""}`}
            onClick={() => {
              setActiveTab("visitors");
              setSidebarOpen(false);
            }}
            type="button"
          >
            <Globe2 size={18} />
            <span>Visitors</span>
          </button>
          <a className="admin-side-link" href="/">
            <ArrowRight size={18} />
            <span>View site</span>
          </a>
        </nav>

        <div className="admin-sidebar-card">
          <BarChart3 size={34} />
          <strong>Grow the portfolio</strong>
          <span>
            Add projects and testimonials to keep the public site fresh.
          </span>
          <button
            onClick={
              activeTab === "testimonials"
                ? openAddTestimonialModal
                : openAddProjectModal
            }
            type="button"
          >
            Add content
          </button>
        </div>
      </aside>

      <div className="admin-workspace">
        <header className="admin-topbar">
          <button
            className="mobile-sidebar-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Open menu"
          >
            ☰
          </button>
          <div
            className="admin-search flex items-center gap-2"
          >
            <div
              className="relative flex items-center"
            >
              <Search
                size={18}
                className="absolute left-3 text-[#6b7280] pointer-events-none"
              />
              <input
                type="search"
                placeholder="Search projects, reviews, and visitors"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="form-input admin-search-input"
                aria-label="Search content"
              />
            </div>

            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="admin-btn-icon"
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          <div className="admin-profile">
            <span>{user.email || "Admin user"}</span>
            <button
              onClick={handleLogout}
              className="admin-logout-btn"
              type="button"
              aria-label="Sign out"
            >
              <LogOut size={16} />
              <span>Sign Out</span>
            </button>
          </div>
        </header>

        {sidebarOpen && (
          <div
            className="admin-sidebar-backdrop"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <main className="admin-main admin-dashboard-main">
          <div className="admin-page-heading">
            <div className="admin-head">
              <span className="admin-kicker">Workspace</span>
              <h1>BrandME Control Center</h1>
            </div>
            <div className="admin-range-pill">Portfolio and reviews</div>
          </div>

          <section className="admin-metrics-grid" aria-label="Content overview">
            <div className="admin-metric-card">
              <div className="admin-metric-icon flame">
                <FolderKanban size={24} />
              </div>
              <strong>{projects.length}</strong>
              <span>Projects</span>
              <small>Live case studies</small>
            </div>
            <div className="admin-metric-card">
              <div className="admin-metric-icon gold">
                <MessageSquareQuote size={24} />
              </div>
              <strong>{testimonials.length}</strong>
              <span>Testimonials</span>
              <small>Published feedback</small>
            </div>
            <div className="admin-metric-card">
              <div className="admin-metric-icon green">
                <Star size={24} />
              </div>
              <strong>{averageRating}</strong>
              <span>Average rating</span>
              <small>Client trust score</small>
            </div>
            <div className="admin-metric-card">
              <div className="admin-metric-icon violet">
                <CheckCircle2 size={24} />
              </div>
              <strong>{projects.length + testimonials.length}</strong>
              <span>Total entries</span>
              <small>Site records</small>
            </div>
            <div className="admin-metric-card">
              <div className="admin-metric-icon violet">
                <Globe2 size={24} />
              </div>
              <strong>{uniqueVisitors}</strong>
              <span>Unique visitors</span>
              <small>{visitors.length} page views tracked</small>
            </div>
          </section>

          <section className="admin-content-grid">
            <div className="admin-panel admin-panel-wide">
              {/* Show tab bar only when NOT searching, or show a search header when searching */}
              {searchQuery.trim() === "" ? (
                <div className="admin-tabbar">
                  <button
                    onClick={() => setActiveTab("projects")}
                    className={`admin-tab ${activeTab === "projects" ? "active-tab" : ""}`}
                    type="button"
                  >
                    <FolderKanban size={18} />
                    <span>Projects ({projects.length})</span>
                  </button>
                  <button
                    onClick={() => setActiveTab("testimonials")}
                    className={`admin-tab ${activeTab === "testimonials" ? "active-tab" : ""}`}
                    type="button"
                  >
                    <MessageSquareQuote size={18} />
                    <span>Testimonials ({testimonials.length})</span>
                  </button>
                  <button
                    onClick={() => setActiveTab("visitors")}
                    className={`admin-tab ${activeTab === "visitors" ? "active-tab" : ""}`}
                    type="button"
                  >
                    <Globe2 size={18} />
                    <span>Visitors ({visitors.length})</span>
                  </button>
                </div>
              ) : (
                <div
                  className="admin-dashboard-top py-4"
                >
                  <div>
                    <h2 className="m-0 text-2xl">
                      Search Results for "{searchQuery}"
                    </h2>
                    <p className="admin-subtitle">
                      Found {filteredProjects.length} projects and{" "}
                      {filteredTestimonials.length} testimonials
                    </p>
                  </div>
                  <button
                    onClick={() => setSearchQuery("")}
                    className="btn-secondary w-auto"
                  >
                    Clear Search
                  </button>
                </div>
              )}

              {/* IF SEARCHING: Show both filtered lists together */}
              {searchQuery.trim() !== "" ? (
                <div
                  className="flex flex-col gap-8 mt-4"
                >
                  {/* Projects Search Results */}
                  <div>
                    <h3 className="text-xl mb-3">
                      Matching Projects ({filteredProjects.length})
                    </h3>
                    <div className="table-container">
                      <table className="admin-table">
                        <thead>
                          <tr>
                            <th>Project</th>
                            <th>Category</th>
                            <th className="text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredProjects.length === 0 ? (
                            <tr>
                              <td
                                colSpan={3}
                                className="text-center text-[#6b7280] p-4"
                              >
                                No matching projects found.
                              </td>
                            </tr>
                          ) : (
                            filteredProjects.map((project) => (
                              <tr key={project.id}>
                                <td>
                                  <div className="font-semibold">
                                    {project.title}
                                  </div>
                                  <div
                                    className="text-xs text-[#6b7280]"
                                  >
                                    {project.description}
                                  </div>
                                </td>
                                <td>
                                  <span className="badge">
                                    {project.category}
                                  </span>
                                </td>
                                <td className="text-right">
                                  <button
                                    onClick={() =>
                                      openEditProjectModal(project)
                                    }
                                    className="btn-secondary text-xs py-1 px-2.5"
                                  >
                                    Edit
                                  </button>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Testimonials Search Results */}
                  <div>
                    <h3 className="text-xl mb-3">
                      Matching Testimonials ({filteredTestimonials.length})
                    </h3>
                    <div className="table-container">
                      <table className="admin-table">
                        <thead>
                          <tr>
                            <th>Client</th>
                            <th>Quote</th>
                            <th className="text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredTestimonials.length === 0 ? (
                            <tr>
                              <td
                                colSpan={3}
                                className="text-center text-[#6b7280] p-4"
                              >
                                No matching testimonials found.
                              </td>
                            </tr>
                          ) : (
                            filteredTestimonials.map((item) => (
                              <tr key={item.id}>
                                <td className="font-semibold">{item.name}</td>
                                <td
                                  className="text-[#374151] text-sm"
                                >
                                  "{item.quote}"
                                </td>
                                <td className="text-right">
                                  <button
                                    onClick={() =>
                                      openEditTestimonialModal(item)
                                    }
                                    className="btn-secondary text-xs py-1 px-2.5"
                                  >
                                    Edit
                                  </button>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  {/* NORMAL TABS VIEW */}
                  {activeTab === "projects" && (
                    <>
                      <div className="admin-dashboard-top">
                        <div>
                          <h2 className="m-0 text-2xl">
                            Projects
                          </h2>
                          <p className="admin-subtitle">
                            Manage, edit, upload, and reorder your portfolio
                            items
                          </p>
                        </div>
                        <button
                          onClick={openAddProjectModal}
                          className="btn-primary w-auto"
                        >
                          + Add Project
                        </button>
                      </div>

                      <div className="table-container">
                        <table className="admin-table">
                          <thead>
                            <tr>
                              <th className="w-16">Order</th>
                              <th>Project</th>
                              <th>Category</th>
                              <th>Tags</th>
                              <th className="text-right">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {projectsToShow.map((project, idx) => (
                              <tr key={project.id}>
                                <td>
                                  <div
                                    className="flex gap-1"
                                  >
                                    <button
                                      disabled={idx === 0}
                                      onClick={() =>
                                        handleMoveProject(idx, "up")
                                      }
                                      className="btn-icon"
                                    >
                                      ▲
                                    </button>
                                    <button
                                      disabled={idx === projects.length - 1}
                                      onClick={() =>
                                        handleMoveProject(idx, "down")
                                      }
                                      className="btn-icon"
                                    >
                                      ▼
                                    </button>
                                  </div>
                                </td>
                                <td>
                                  <div
                                    className="flex items-center gap-3"
                                  >
                                    <div>
                                      <div className="font-semibold">
                                        {project.title}
                                      </div>
                                      <div
                                        className="text-xs text-[#6b7280]"
                                      >
                                        {project.description}
                                      </div>
                                    </div>
                                  </div>
                                </td>
                                <td>
                                  <span className="badge">
                                    {project.category}
                                  </span>
                                </td>
                                <td
                                  className="text-xs text-[#6b7280]"
                                >
                                  {project.tags?.join(", ") || "—"}
                                </td>
                                <td className="text-right">
                                  <div
                                    className="flex justify-end gap-2"
                                  >
                                    <button
                                      onClick={() =>
                                        openEditProjectModal(project)
                                      }
                                      className="btn-secondary text-xs py-1 px-2.5"
                                    >
                                      Edit
                                    </button>
                                    <button
                                      onClick={() =>
                                        handleDeleteProject(project)
                                      }
                                      className="btn-danger"
                                    >
                                      Delete
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </>
                  )}

                  {activeTab === "testimonials" && (
                    <>
                      <div className="admin-dashboard-top">
                        <div>
                          <h2 className="m-0 text-2xl">
                            Testimonials
                          </h2>
                          <p className="admin-subtitle">
                            Manage client reviews and feedback
                          </p>
                        </div>
                        <button
                          onClick={openAddTestimonialModal}
                          className="btn-primary w-auto"
                        >
                          + Add Testimonial
                        </button>
                      </div>

                      <div className="table-container">
                        <table className="admin-table">
                          <thead>
                            <tr>
                              <th>Client</th>
                              <th>Role / Company</th>
                              <th>Quote</th>
                              <th>Rating</th>
                              <th className="text-right">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {testimonialsToShow.length === 0 ? (
                              <tr>
                                <td
                                  colSpan={5}
                                  className="text-center text-[#6b7280] p-8"
                                >
                                  No testimonials found.
                                </td>
                              </tr>
                            ) : (
                              testimonialsToShow.map((item) => (
                                <tr key={item.id}>
                                  <td className="font-semibold">
                                    {item.name}
                                  </td>
                                  <td
                                    className="text-[#6b7280] text-sm"
                                  >
                                    {item.role}
                                    {item.company ? ` at ${item.company}` : ""}
                                  </td>
                                  <td
                                    className="text-[#374151] text-sm max-w-80"
                                  >
                                    "{item.quote}"
                                  </td>
                                  <td>⭐ {item.rating}</td>
                                  <td className="text-right">
                                    <div
                                      className="flex justify-end gap-2"
                                    >
                                      <button
                                        onClick={() =>
                                          openEditTestimonialModal(item)
                                        }
                                        className="btn-secondary text-xs py-1 px-2.5"
                                      >
                                        Edit
                                      </button>
                                      <button
                                        onClick={() =>
                                          handleDeleteTestimonial(item)
                                        }
                                        className="btn-danger"
                                      >
                                        Delete
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              ))
                            )}
                          </tbody>
                        </table>
                      </div>
                    </>
                  )}

                  {activeTab === "visitors" && (
                    <>
                      <div className="admin-dashboard-top">
                        <div>
                          <h2 className="m-0 text-2xl">
                            Website Tracker
                          </h2>
                          <p className="admin-subtitle">
                            Anonymous page views and visitor device details from
                            your public website
                          </p>
                        </div>
                        <button
                          onClick={fetchVisitors}
                          className="btn-secondary w-auto"
                        >
                          Refresh
                        </button>
                      </div>
                      <div className="table-container">
                        <table className="admin-table">
                          <thead>
                            <tr>
                              <th>Visited</th>
                              <th>Page</th>
                              <th>Visitor</th>
                              <th>Device</th>
                              <th>Source</th>
                            </tr>
                          </thead>
                          <tbody>
                            {visitorsToShow.length === 0 ? (
                              <tr>
                                <td colSpan={5} className="admin-empty-cell">
                                  No visitor activity found.
                                </td>
                              </tr>
                            ) : (
                              visitorsToShow.map((visitor) => (
                                <tr key={visitor.id}>
                                  <td>
                                    {visitor.visitedAt instanceof Date
                                      ? visitor.visitedAt.toLocaleString()
                                      : "Pending"}
                                  </td>
                                  <td>
                                    <strong>{visitor.path}</strong>
                                  </td>
                                  <td>
                                    <span className="visitor-session">
                                      {visitor.sessionId.slice(0, 8)}...
                                    </span>
                                    <small className="visitor-meta">
                                      {visitor.timezone || "Unknown timezone"}
                                    </small>
                                  </td>
                                  <td>
                                    <span>
                                      {visitor.screen || "Unknown screen"}
                                    </span>
                                    <small className="visitor-meta">
                                      {visitor.language || "Unknown language"}
                                    </small>
                                  </td>
                                  <td>{visitor.referrer || "Direct"}</td>
                                </tr>
                              ))
                            )}
                          </tbody>
                        </table>
                      </div>
                    </>
                  )}
                </>
              )}
            </div>

            <aside className="admin-panel admin-highlight-panel">
              <div>
                <span className="admin-kicker">Recent work</span>
                <h2>Publish-ready assets</h2>
                <p>
                  Track the work and client proof that shape the public BrandME
                  site.
                </p>
              </div>

              <div className="admin-mini-list">
                {featuredProjects.length === 0 ? (
                  <span>No projects yet.</span>
                ) : (
                  featuredProjects.map((project) => (
                    <div
                      className="admin-mini-item"
                      key={project.id ?? project.title}
                    >
                      <span>{project.title}</span>
                      <small>{project.category}</small>
                    </div>
                  ))
                )}
              </div>

              <button
                onClick={
                  activeTab === "testimonials"
                    ? openAddTestimonialModal
                    : openAddProjectModal
                }
                className="admin-highlight-action"
                type="button"
              >
                Add new{" "}
                {activeTab === "testimonials" ? "testimonial" : "project"}
              </button>
            </aside>
          </section>
        </main>

        {/* PROJECT MODAL */}
        {isProjectModalOpen && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3 className="m-0 mb-4 text-xl">
                {editingProject ? "Edit Project" : "Add New Project"}
              </h3>
              <form
                onSubmit={handleProjectSubmit}
                className="flex flex-col gap-4"
              >
                <div className="form-group">
                  <label className="form-label">Title</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="form-select"
                  >
                    <option value="Business">Business</option>
                    <option value="E-Learning">E-Learning</option>
                    <option value="Industrial">Industrial</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Description</label>
                  <textarea
                    rows={3}
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="form-textarea"
                  />
                </div>

                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">Code URL</label>
                    <input
                      type="url"
                      value={codeUrl}
                      onChange={(e) => setCodeUrl(e.target.value)}
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Live URL</label>
                    <input
                      type="url"
                      value={liveUrl}
                      onChange={(e) => setLiveUrl(e.target.value)}
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Tags (Comma Separated)</label>
                  <input
                    type="text"
                    placeholder="React, TypeScript, Tailwind"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Project Screenshot</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, false)}
                    className="form-input p-1"
                  />
                  {imagePreview && (
                    <div
                      className="image-preview-wrapper mt-2"
                    >
                      <Image
                        src={imagePreview}
                        alt="Preview"
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                </div>

                <div className="modal-actions">
                  <button
                    type="button"
                    onClick={() => setIsProjectModalOpen(false)}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-primary w-auto"
                  >
                    {submitting ? "Saving..." : "Save Project"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* TESTIMONIAL MODAL */}
        {isTestimonialModalOpen && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3 className="m-0 mb-4 text-xl">
                {editingTestimonial
                  ? "Edit Testimonial"
                  : "Add New Testimonial"}
              </h3>
              <form
                onSubmit={handleTestimonialSubmit}
                className="flex flex-col gap-4"
              >
                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">Client Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Role / Position</label>
                    <input
                      type="text"
                      required
                      placeholder="CEO"
                      value={clientRole}
                      onChange={(e) => setClientRole(e.target.value)}
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">Company (Optional)</label>
                    <input
                      type="text"
                      placeholder="Acme Corp"
                      value={clientCompany}
                      onChange={(e) => setClientCompany(e.target.value)}
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Rating (1 to 5)</label>
                    <select
                      value={rating}
                      onChange={(e) => setRating(Number(e.target.value))}
                      className="form-select"
                    >
                      <option value={5}>5 Stars</option>
                      <option value={4}>4 Stars</option>
                      <option value={3}>3 Stars</option>
                      <option value={2}>2 Stars</option>
                      <option value={1}>1 Star</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Quote / Feedback</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Enter client testimonial here..."
                    value={quote}
                    onChange={(e) => setQuote(e.target.value)}
                    className="form-textarea"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Client Avatar / Photo</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, true)}
                    className="form-input p-1"
                  />
                  {avatarPreview && (
                    <div
                      className="relative w-16 h-16 mt-2 rounded-full overflow-hidden border border-[#1e293b]"
                    >
                      <Image
                        src={avatarPreview}
                        alt="Avatar preview"
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                </div>

                <div className="modal-actions">
                  <button
                    type="button"
                    onClick={() => setIsTestimonialModalOpen(false)}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-primary w-auto"
                  >
                    {submitting ? "Saving..." : "Save Testimonial"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
