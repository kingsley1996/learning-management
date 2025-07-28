'use client';

import { useReportWebVitals } from 'next/web-vitals';

export function WebVitalsReporter() {
  useReportWebVitals((metric) => {
    const { name, value, id } = metric;
    
    // Gửi dữ liệu đến Google Analytics hoặc công cụ phân tích khác
    console.log(`Web Vital: ${name} - ${value} (ID: ${id})`);
    
    // Ví dụ gửi dữ liệu đến Google Analytics
    if (window.gtag) {
      window.gtag('event', name, {
        event_category: 'Web Vitals',
        event_label: id,
        value: Math.round(name === 'CLS' ? value * 1000 : value),
        non_interaction: true,
      });
    }
  });
  
  return null;
}
