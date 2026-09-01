'use client';

import { Globe, DollarSign, Clock, ShieldCheck } from 'lucide-react';

export default function StatsCounter() {
  const stats = [
    {
      icon: <Globe size={28} color="var(--gold)" />,
      value: '3+',
      label: 'SMEs GLOBALLY',
      subtext: 'Businesses needing high quality online presence',
    },
    {
      icon: <DollarSign size={28} color="var(--flame)" />,
      value: '$150',
      label: 'MARKET SIZE',
      subtext: 'Global small business website & design market',
    },
    {
      icon: <Clock size={28} color="var(--gold)" />,
      value: '7 Days',
      label: 'DELIVERY TIME',
      subtext: 'From brief submission to live launch',
    },
    {
      icon: <ShieldCheck size={28} color="var(--flame)" />,
      value: '99.8%',
      label: 'SATISFACTION RATE',
      subtext: 'On-time delivery and ongoing host maintenance',
    },
  ];

  return (
    <section style={{ padding: '4rem 0', borderBlock: '1px solid var(--border-color)', background: 'rgba(255, 255, 255, 0.02)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2rem' }}>
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="glass-card"
              style={{
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '2rem 1.5rem',
              }}
            >
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  background: 'black',
                  // border: '1px solid var(--border-color)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1rem',
                }}
              >
                {stat.icon}
              </div>
              <strong style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--text-main)', lineHeight: '1.1', marginBottom: '0.4rem' }}>
                {stat.value}
              </strong>
              <span style={{ fontSize: '0.85rem', fontWeight: '700', letterSpacing: '0.05em', color: 'var(--gold)', marginBottom: '0.4rem' }}>
                {stat.label}
              </span>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                {stat.subtext}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
