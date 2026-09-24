/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.mavenadvert.com',
  generateRobotsTxt: true,
  sitemapSize: 5000,
  changefreq: 'monthly',
  priority: 0.7,
  // Exclude admin and api routes from the sitemap and robots.txt
  exclude: ['/admin', '/admin/*', '/api', '/api/*'],
  
  // Custom transform function to set priorities/changefreq based on path
  transform: async (config, path) => {
    // Exclude any raw UUID blog URLs from sitemap (only index canonical human-friendly slugs)
    const uuidRegex = /^\/blogs\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (uuidRegex.test(path)) {
      return null;
    }

    // Custom logic for different paths
    let priority = config.priority;
    let changefreq = config.changefreq;
    
    // Homepage
    if (path === '/') {
        priority = 1.0;
        changefreq = 'weekly';
    } 
    // Core pages
    else if (['/services', '/about', '/casestudies', '/contact'].includes(path)) {
        priority = 0.9;
        changefreq = 'monthly';
    }
    // Deep service pages
    else if (path.startsWith('/services/')) {
        priority = 0.8;
        changefreq = 'monthly';
    }
    // Blog articles
    else if (path.startsWith('/blogs')) {
        priority = 0.8;
        changefreq = 'weekly';
    }
    
    return {
      loc: path,
      changefreq: changefreq,
      priority: priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? [],
    }
  },
  
  // Custom robots.txt options
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api'],
      }
    ],
  },
}
