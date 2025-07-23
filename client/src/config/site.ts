export const SITE_CONFIG = {
  name: 'Learning Management System',
  description: 'Nền tảng học lập trình 1-1 với mentor',
  url: 'https://your-domain.com',
  ogImage: 'https://your-domain.com/og.png',
  links: {
    twitter: 'https://twitter.com/your-handle',
    github: 'https://github.com/your-repo',
  },
}

export const LOADING_MESSAGES = [
  'Đang tải dữ liệu...',
  'Chờ một chút nhé...',
  'Sắp xong rồi...',
]

export const IMAGE_SIZES = {
  thumbnail: {
    width: 400,
    height: 300,
  },
  preview: {
    width: 600,
    height: 400,
  },
  full: {
    width: 1200,
    height: 800,
  },
}

export const ANIMATION_CONFIG = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: {
    duration: 0.3,
    ease: 'easeInOut',
  },
}
