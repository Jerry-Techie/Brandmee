'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ExternalLink, Github, Eye, Loader2 } from 'lucide-react';
import { getProjects, Project } from '@/lib/projects';

export default function PortfolioGallery() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    async function loadProjects() {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (error) {
        console.error('Failed to fetch projects from Firestore:', error);
      } finally {
        setLoading(false);
      }
    }

    loadProjects();
  }, []);

  const categories = ['All', ...Array.from(new Set(projects.map((p) => p.category)))];

  const filteredProjects =
    activeCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section
      id="portfolio"
      className="py-12 px-4 bg-white/[0.01] w-full max-w-[100vw] box-border overflow-x-hidden"
    >
      <div className="max-w-[1200px] mx-auto w-full box-border">
        <div className="text-center mb-8">
          <h2 className="section-title text-2xl font-extrabold">
            Featured <span className="gradient-text-flame">Client Work</span>
          </h2>
          <p className="section-desc max-w-[600px] mx-auto mt-2 text-mist">
            Explore recent websites designed, developed, and deployed in 7 days or less.
          </p>

          {!loading && categories.length > 1 && (
            <div className="flex justify-center gap-2 mt-6 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-1 rounded-full border font-semibold text-sm cursor-pointer transition-all duration-200 ${
                    activeCategory === cat
                      ? 'bg-flame text-white border-white/10'
                      : 'bg-[#101118] text-mist border-white/10'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>

        {loading ? (
          <div className="grid grid-cols-3 max-lg:grid-cols-2 max-[640px]:grid-cols-1 gap-6 w-full box-border">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="h-[350px] bg-white/[0.03] rounded-xl flex items-center justify-center border border-white/10"
              >
                <Loader2 className="animate-spin text-mist" size={28} />
              </div>
            ))}
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-12 text-mist">
            No projects found in this category.
          </div>
        ) : (
          <div className="grid grid-cols-3 max-lg:grid-cols-2 max-[640px]:grid-cols-1 gap-6 w-full box-border">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-[#0d0e15] rounded-xl border border-white/10 overflow-hidden flex flex-col w-full box-border"
              >
                {/* Image Container */}
                <div className="relative h-50 w-full bg-[#050508] shrink-0">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-contain object-center"
                  />
                  <div
                    className="absolute inset-0 bg-[linear-gradient(to_top,rgba(13,14,21,0.95)_0%,transparent_60%)] flex items-end p-3 pointer-events-none"
                  >
                    <div className="flex gap-[0.35rem] flex-wrap">
                      {project.tags?.map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-[0.7rem] bg-[rgba(0,0,0,0.8)] py-[0.2rem] px-[0.5rem] rounded border border-white/10 text-white"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 grow flex flex-col justify-between">
                  <div>
                    <h3 className="text-[1.15rem] font-bold text-white mb-2 leading-[1.3]">
                      {project.title}
                    </h3>
                    <p className="text-mist text-sm leading-[1.5] mb-5">
                      {project.description}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-row items-center justify-between gap-2 w-full box-border pt-3 border-t border-white/10 max-[420px]:flex-col max-[420px]:items-stretch">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="admin-btn-primary inline-flex items-center justify-center gap-[0.35rem] whitespace-nowrap box-border py-2 px-3 text-[0.8rem] grow basis-auto no-underline max-[420px]:w-full"
                    >
                      View Live <ExternalLink size={13} />
                    </a>
                    {project.codeUrl && (
                      <a
                        href={project.codeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="admin-btn-secondary inline-flex items-center justify-center gap-[0.35rem] whitespace-nowrap box-border py-2 px-3 text-[0.8rem] no-underline max-[420px]:w-full"
                      >
                        <Github size={13} /> <span>Code</span>
                      </a>
                    )}
                    <button
                      type="button"
                      onClick={() => setSelectedProject(project)}
                      className="admin-btn-secondary inline-flex items-center justify-center gap-[0.35rem] whitespace-nowrap box-border py-2 px-2.5 text-[0.8rem] cursor-pointer max-[420px]:w-full"
                      title="Quick Preview"
                    >
                      <Eye size={13} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal Quick Preview */}
        {selectedProject && (
          <div
            className="fixed inset-0 z-[9999] bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <div
              className="max-w-[650px] w-full max-h-[90vh] overflow-y-auto bg-[#0d0e15] border border-white/10 p-5 rounded-xl box-border"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-white">{selectedProject.title}</h3>
                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  className="text-xl text-[#888] bg-transparent border-0 cursor-pointer p-1"
                >
                  ✕
                </button>
              </div>

              <div className="relative w-full h-55 rounded-lg overflow-hidden mb-4 bg-[#050508]">
                <Image
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 650px"
                  className="object-contain object-center"
                />
              </div>

              <p className="text-[#a0a0a0] text-[0.9rem] leading-[1.5] mb-5">
                {selectedProject.description}
              </p>

              <div className="flex gap-3 flex-wrap">
                <a
                  href={selectedProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="admin-btn-primary no-underline py-2.5 px-5 text-[0.85rem]"
                >
                  Open Live Website <ExternalLink size={15} />
                </a>
                {selectedProject.codeUrl && (
                  <a
                    href={selectedProject.codeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="admin-btn-secondary no-underline py-2.5 px-5 text-[0.85rem]"
                  >
                    Source Code <Github size={15} />
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
