'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ExternalLink, Github, Eye, Sparkles } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  category: 'Business' | 'E-Learning' | 'Industrial';
  description: string;
  image: string;
  codeUrl: string;
  liveUrl: string;
  tags: string[];
}

const CATEGORIES = ['All', 'Business', 'E-Learning', 'Industrial'] as const;

const projects: Project[] = [
  {
    id: 'okeme',
    title: 'Okeme House Painting & Solar',
    category: 'Business',
    description: 'A high-converting local service website with booking intake and service showcases.',
    image: '/images/work/OKEME-House-Painting-Solar-Installation-05-26-2026_01_20_PM.png',
    codeUrl: 'https://github.com/thecodingmob/okeme_painting_and_solar_installation',
    liveUrl: 'https://thecodingmob.github.io/okeme_painting_and_solar_installation',
    tags: ['Web Design', '7-Day Turnaround', 'Lead Gen'],
  },
  {
    id: 'edurocks',
    title: 'EduRocks Learning Platform',
    category: 'E-Learning',
    description: 'Modern digital skill learning portal built with engaging UI and course catalog layout.',
    image: '/images/work/EduRocks-Learn-Create-and-Achieve-05-26-2026_01_24_PM.png',
    codeUrl: 'https://github.com/thecodingmob/EDUROCKS-LEARN-DIGITAL-SKILLS',
    liveUrl: 'https://edurocks.vercel.app',
    tags: ['E-Learning', 'Interactive UI', 'Responsive'],
  },
  {
    id: 'neoteric',
    title: 'Neoteric Contracting Services',
    category: 'Industrial',
    description: 'Corporate contracting and services landing page with clean corporate branding.',
    image: '/images/work/NEOTERIC-CONTRACTING-SERVICES-LIMITED-06-09-2026_09_06_AM.png',
    codeUrl: 'https://github.com/thecodingmob/NEOTERIC_CONTRACTING_SERVICES_LTD',
    liveUrl: 'https://neoteric-nine.vercel.app',
    tags: ['Corporate', 'Contracting', 'Fast Deployment'],
  },
];

export default function PortfolioGallery() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects =
    activeCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="portfolio" style={{ padding: '6rem 0', background: 'rgba(255, 255, 255, 0.01)' }}>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            Featured <span className="gradient-text-flame">Client Work</span>
          </h2>
          <p className="section-desc">
            Explore recent websites designed, developed, and deployed in 7 days or less.
          </p>


          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.8rem', marginTop: '2rem', flexWrap: 'wrap' }}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '0.5rem 1.25rem',
                  borderRadius: 'var(--radius-full)',
                  background: activeCategory === cat ? 'var(--flame)' : 'black',
                  color: activeCategory === cat ? '#ffffff' : 'var(--text-muted)',
                  border: '1px solid var(--border-color)',
                  fontWeight: '600',
                  fontSize: '0.9rem',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Portfolio Cards Grid is Here*/}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="work-card"
              style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
            >
              {/* Image Preview Container */}
              <div style={{ position: 'relative', height: '240px', width: '100%', overflow: 'hidden', background: '#12131a' }}>
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{ objectFit: 'cover', objectPosition: 'top', transition: 'transform 0.5s ease' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(8, 9, 13, 0.9) 0%, transparent 60%)',
                    display: 'flex',
                    alignItems: 'flex-end',
                    padding: '1.25rem',
                  }}
                >
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {project.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        style={{
                          fontSize: '0.75rem',
                          background: 'rgba(8, 9, 13, 0.8)',
                          backdropFilter: 'blur(8px)',
                          padding: '0.2rem 0.6rem',
                          borderRadius: 'var(--radius-sm)',
                          border: '1px solid var(--border-color)',
                          color: 'var(--text-main)',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Body Content */}
              <div style={{ padding: '1.5rem', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--text-main)', marginBottom: '0.5rem' }}>
                    {project.title}
                  </h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                    {project.description}
                  </p>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                    style={{ padding: '0.55rem 1.1rem', fontSize: '0.85rem', flexGrow: 1 }}
                  >
                    View Live <ExternalLink size={14} />
                  </a>
                  <a
                    href={project.codeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary"
                    style={{ padding: '0.55rem 1.1rem', fontSize: '0.85rem' }}
                  >
                    <Github size={14} /> Code
                  </a>
                  <button
                    type="button"
                    onClick={() => setSelectedProject(project)}
                    className="btn-secondary"
                    style={{ padding: '0.55rem 0.8rem', fontSize: '0.85rem', cursor: 'pointer' }}
                    title="Quick Preview"
                  >
                    <Eye size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for Quick Preview */}
        {selectedProject && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 1000,
              background: 'rgba(0, 0, 0, 0.85)',
              backdropFilter: 'blur(10px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1.5rem',
            }}
            onClick={() => setSelectedProject(null)}
          >
            <div
              className="glass-card"
              style={{ maxWidth: '800px', width: '100%', maxHeight: '90vh', overflowY: 'auto', background: '#0d0e15' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: '700' }}>{selectedProject.title}</h3>
                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  style={{ fontSize: '1.5rem', color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  ✕
                </button>
              </div>

              <div style={{ position: 'relative', width: '100%', height: '360px', borderRadius: 'var(--radius-md)', overflow: 'hidden', marginBottom: '1.5rem' }}>
                <Image src={selectedProject.image} alt={selectedProject.title} fill style={{ objectFit: 'cover', objectPosition: 'top' }} />
              </div>

              <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginBottom: '1.5rem' }}>
                {selectedProject.description}
              </p>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <a href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
                  Open Live Website <ExternalLink size={16} />
                </a>
                <a href={selectedProject.codeUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                  Source Code <Github size={16} />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}