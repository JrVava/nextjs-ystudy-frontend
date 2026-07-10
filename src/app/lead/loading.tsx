import React from 'react';

export default function Loading() {
  return (
    <div className="site-page-loader" style={{ background: 'transparent', backdropFilter: 'none' }}>
      <div className="loader-content">
        <img src="/assets/ystudy-logo.png" alt="YStudy Logo" className="loader-logo animate-pulse" />
        <div className="loader-spinner"></div>
      </div>
    </div>
  );
}
