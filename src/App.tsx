import React, { useState, useEffect, useMemo, useRef } from 'react';

// Platform & Category definitions with brand icons & colors
interface CategoryItem {
  id: string;
  name: string;
  icon: string;
  color: string;
  bgGrad?: string;
}

const CATEGORIES: CategoryItem[] = [
  { id: 'all', name: 'All Services', icon: 'fas fa-globe', color: 'text-emerald-400' },
  { id: 'instagram', name: 'Instagram', icon: 'fab fa-instagram', color: 'text-pink-500' },
  { id: 'youtube', name: 'YouTube', icon: 'fab fa-youtube', color: 'text-red-500' },
  { id: 'tiktok', name: 'TikTok', icon: 'fab fa-tiktok', color: 'text-white' },
  { id: 'facebook', name: 'Facebook', icon: 'fab fa-facebook', color: 'text-blue-500' },
  { id: 'twitter', name: 'Twitter / X', icon: 'fab fa-twitter', color: 'text-sky-400' },
  { id: 'linkedin', name: 'LinkedIn', icon: 'fab fa-linkedin-in', color: 'text-blue-600' },
  { id: 'spotify', name: 'Spotify', icon: 'fab fa-spotify', color: 'text-green-500' },
  { id: 'telegram', name: 'Telegram', icon: 'fab fa-telegram-plane', color: 'text-sky-400' },
  { id: 'meta_boost', name: 'Meta Boost', icon: 'fas fa-rocket', color: 'text-blue-400' },
  { id: 'voiceover', name: 'Voiceover', icon: 'fas fa-microphone-lines', color: 'text-amber-400' },
  { id: 'ai_tools', name: 'AI & Tools', icon: 'fas fa-wand-magic-sparkles', color: 'text-purple-400' },
  { id: 'others', name: 'Others', icon: 'fas fa-layer-group', color: 'text-teal-400' },
];

interface Testimonial {
  id: string;
  clientName: string;
  handleOrRole: string;
  avatar: string;
  rating: number;
  platform: string;
  platformIcon: string;
  servicePurchased: string;
  resultsMetric: string;
  reviewText: string;
  deliveryTime: string;
  country: string;
  verified: boolean;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    clientName: 'Marcus Sterling',
    handleOrRole: 'E-commerce Brand Lead, UK',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    platform: 'Instagram',
    platformIcon: 'fab fa-instagram text-pink-500',
    servicePurchased: 'Instagram Organic Growth (10k)',
    resultsMetric: '+10,000 Real Followers & 4.8x Engagement',
    reviewText: 'SocialyPro completely transformed our fashion store account. The followers are genuinely active human profiles that comment and view our stories. Order started in 20 minutes with zero drops!',
    deliveryTime: 'Started in 18 mins',
    country: 'United Kingdom 🇬🇧',
    verified: true,
  },
  {
    id: 't-2',
    clientName: 'Tanvir Hossain',
    handleOrRole: 'Tech Content Creator (85K Subs)',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    platform: 'YouTube',
    platformIcon: 'fab fa-youtube text-red-500',
    servicePurchased: '4,000 Watch Hours & Active Subs',
    resultsMetric: 'Channel Monetization Approved in 6 Days',
    reviewText: 'Was struggling to reach the 4,000 watch hours threshold for YouTube YPP. SocialyPro high-retention views did the job cleanly without flags. I paid via bKash, super fast delivery and supportive team on WhatsApp!',
    deliveryTime: 'Delivered in 4 days',
    country: 'Bangladesh 🇧🇩',
    verified: true,
  },
  {
    id: 't-3',
    clientName: 'Chloe Dupont',
    handleOrRole: 'Digital Agency Growth Director',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    platform: 'TikTok',
    platformIcon: 'fab fa-tiktok text-white',
    servicePurchased: 'TikTok FYP Viral Boost (50k Views + Shares)',
    resultsMetric: '3 Videos Hit 500K+ Organic FYP Impressions',
    reviewText: 'We resell social growth to over 40+ client brands. The speed and quality of SocialyPro TikTok & Meta algorithms are unmatched in the wholesale market. Binance Pay payment is instant 0 fee!',
    deliveryTime: 'Instant Dispatch',
    country: 'France 🇫🇷',
    verified: true,
  },
  {
    id: 't-4',
    clientName: 'Alexander Drake',
    handleOrRole: 'Electronic Music Artist & DJ',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    platform: 'Spotify',
    platformIcon: 'fab fa-spotify text-green-500',
    servicePurchased: 'Spotify Editorial Playlist Pitch & Streams',
    resultsMetric: '+85,000 Algorithmic Royalty Streams',
    reviewText: 'Got my latest single on Release Radar and multiple user algorithmic radios. Streams are 100% royalty eligible and monthly listeners shot up from 2K to 45K. Truly legitimate organic service.',
    deliveryTime: 'Started in 30 mins',
    country: 'United States 🇺🇸',
    verified: true,
  },
  {
    id: 't-5',
    clientName: 'Rahim Chowdhury',
    handleOrRole: 'Advertising & Media Agency Owner',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    platform: 'AI Tools & Voiceover',
    platformIcon: 'fas fa-wand-magic-sparkles text-purple-400',
    servicePurchased: 'ChatGPT Plus, Canva Pro & Voiceover Dubbing',
    resultsMetric: 'Activated in 5 mins + Pristine Audio Quality',
    reviewText: 'Got instant private credentials for ChatGPT Plus and Midjourney, plus our commercial bangla/english voiceover was recorded with studio clarity in less than 24 hours. Best one-stop platform for freelancers.',
    deliveryTime: 'Instant Access',
    country: 'Bangladesh 🇧🇩',
    verified: true,
  },
  {
    id: 't-6',
    clientName: 'David K.',
    handleOrRole: 'Crypto Community Manager',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    platform: 'Telegram & X',
    platformIcon: 'fab fa-telegram-plane text-sky-400',
    servicePurchased: 'Telegram Group Growth & X Impressions',
    resultsMetric: '+15,000 Active Crypto Members',
    reviewText: 'Our Web3 token launch needed genuine community hype and active discussions. SocialyPro provided active organic crypto members with fast USDT payment via TRC20.',
    deliveryTime: 'Continuous Feed',
    country: 'Singapore 🇸🇬',
    verified: true,
  },
];

interface Service {
  id: string;
  name: string;
  platform: string;
  category: string;
  badge: string;
  badgeColor: string;
  description: string;
  tags: string[];
  ratePer1k: number;
  icon: string;
  iconGrad: string;
  unitName?: string;
  minQty?: number;
  defaultQty?: number;
}

const SERVICES: Service[] = [
  {
    id: 'ig-growth',
    name: 'Instagram Organic Growth',
    platform: 'instagram',
    category: 'Followers & Reach',
    badge: '100% Organic Human',
    badgeColor: 'text-emerald-400',
    description: 'High-quality active followers, reel views, targeted likes, story impressions, saves & Meta verification.',
    tags: ['Followers', 'Reel Views', 'Blue Badge'],
    ratePer1k: 2.99,
    icon: 'fab fa-instagram',
    iconGrad: 'from-pink-600 via-purple-600 to-orange-400',
    unitName: 'Followers / Engagements',
    minQty: 500,
    defaultQty: 2000,
  },
  {
    id: 'yt-growth',
    name: 'YouTube Monetization & Watch Time',
    platform: 'youtube',
    category: 'Monetization & Subscribers',
    badge: 'Monetization Ready',
    badgeColor: 'text-emerald-400',
    description: 'Non-drop active subscribers, high-retention 4K views, 4,000 watch hours package & live stream viewers.',
    tags: ['Subscribers', 'Watch Hours', '4K Views'],
    ratePer1k: 4.49,
    icon: 'fab fa-youtube',
    iconGrad: 'from-red-600 to-red-900',
    unitName: 'Subscribers / Views',
    minQty: 500,
    defaultQty: 2500,
  },
  {
    id: 'tt-growth',
    name: 'TikTok Viral Engine',
    platform: 'tiktok',
    category: 'Viral Algorithm Boost',
    badge: 'FYP Algorithm Boost',
    badgeColor: 'text-sky-400',
    description: 'Targeted followers, high-retention video views, video shares, saves, comments & live stream gifts boost.',
    tags: ['FYP Views', 'Followers', 'Live Gifts'],
    ratePer1k: 1.99,
    icon: 'fab fa-tiktok',
    iconGrad: 'from-gray-800 to-black border border-white/10',
    unitName: 'Followers / Views',
    minQty: 1000,
    defaultQty: 5000,
  },
  {
    id: 'fb-growth',
    name: 'Facebook Authority Boost',
    platform: 'facebook',
    category: 'Pages & Groups',
    badge: 'Page & Profile Growth',
    badgeColor: 'text-blue-400',
    description: 'USA/Global page likes, profile followers, reel plays, post shares, group members & video watch time.',
    tags: ['Page Likes', 'Followers', 'Reels'],
    ratePer1k: 2.49,
    icon: 'fab fa-facebook',
    iconGrad: 'from-blue-600 to-blue-800',
    unitName: 'Followers / Likes',
    minQty: 1000,
    defaultQty: 3000,
  },
  {
    id: 'x-growth',
    name: 'Twitter / X Influence Engine',
    platform: 'twitter',
    category: 'Trending & Impressions',
    badge: 'Verified & Active',
    badgeColor: 'text-sky-400',
    description: 'Authentic followers, retweets, quote tweets, bookmark saves & high impressions for ad revenue payout.',
    tags: ['Followers', 'Retweets', 'Impressions'],
    ratePer1k: 3.49,
    icon: 'fab fa-twitter',
    iconGrad: 'from-slate-800 to-black border border-white/10',
    unitName: 'Followers / Impressions',
    minQty: 1000,
    defaultQty: 2500,
  },
  {
    id: 'in-growth',
    name: 'LinkedIn Professional & B2B',
    platform: 'linkedin',
    category: 'Professional & B2B',
    badge: 'B2B High Converting',
    badgeColor: 'text-blue-400',
    description: 'Executive connections, company page followers, post endorsements, reposts & targeted B2B lead acceleration.',
    tags: ['Connections', 'Company Followers', 'B2B Leads'],
    ratePer1k: 8.99,
    icon: 'fab fa-linkedin-in',
    iconGrad: 'from-blue-700 to-sky-800',
    unitName: 'Connections / Followers',
    minQty: 200,
    defaultQty: 1000,
  },
  {
    id: 'meta-boost',
    name: 'Meta Ads & Campaign Boost',
    platform: 'meta_boost',
    category: 'Targeted Advertising',
    badge: 'High ROI Campaign',
    badgeColor: 'text-blue-400',
    description: 'Targeted Meta ads optimization, hyper-targeted demographic reach, pixel tracking & sales funnel setup.',
    tags: ['Meta Ads', 'Targeted Reach', 'ROAS Boost'],
    ratePer1k: 9.99,
    icon: 'fas fa-rocket',
    iconGrad: 'from-blue-600 via-indigo-600 to-cyan-500',
    unitName: 'Targeted Ad Clicks / Reach',
    minQty: 500,
    defaultQty: 2000,
  },
  {
    id: 'voiceover-pro',
    name: 'Studio Voiceover & Audio Dubbing',
    platform: 'voiceover',
    category: 'Creative Audio Production',
    badge: 'Multi-Language Studio',
    badgeColor: 'text-amber-400',
    description: 'Professional human studio voiceovers in English (US/UK), Bangla, Hindi, Arabic, Spanish for ads & videos.',
    tags: ['Studio Audio', 'Commercial Rights', 'Multi-Language'],
    ratePer1k: 12.50,
    icon: 'fas fa-microphone-lines',
    iconGrad: 'from-amber-500 to-orange-700',
    unitName: 'Words / Minutes of Audio',
    minQty: 250,
    defaultQty: 1000,
  },
  {
    id: 'ai-subscriptions',
    name: 'AI & Premium Subscriptions',
    platform: 'ai_tools',
    category: 'Digital Licenses & Tools',
    badge: 'Instant Activation',
    badgeColor: 'text-purple-400',
    description: 'Official shared & private subscriptions for ChatGPT Plus, Canva Pro, Midjourney, Claude Pro, CapCut Pro & Envato.',
    tags: ['ChatGPT Plus', 'Canva Pro', 'Midjourney', 'CapCut'],
    ratePer1k: 14.99,
    icon: 'fas fa-wand-magic-sparkles',
    iconGrad: 'from-purple-600 via-fuchsia-600 to-indigo-700',
    unitName: 'Accounts / Tool Licenses',
    minQty: 1,
    defaultQty: 1000,
  },
  {
    id: 'sp-growth',
    name: 'Spotify Streams & Playlist Pitching',
    platform: 'spotify',
    category: 'Music Monetization',
    badge: 'Royalty Eligible',
    badgeColor: 'text-emerald-400',
    description: 'Algorithmic monthly listeners, organic track plays, playlist saves, followers & editorial playlist pitching.',
    tags: ['Monthly Listeners', 'Streams', 'Saves'],
    ratePer1k: 2.80,
    icon: 'fab fa-spotify',
    iconGrad: 'from-emerald-500 to-green-700',
    unitName: 'Streams / Listeners',
    minQty: 1000,
    defaultQty: 5000,
  },
  {
    id: 'tg-growth',
    name: 'Telegram Crypto & Community Growth',
    platform: 'telegram',
    category: 'Community & Groups',
    badge: 'Active Crypto Members',
    badgeColor: 'text-sky-400',
    description: 'Channel subscribers, group members, post views, emoji reactions & active crypto community outreach.',
    tags: ['Channel Subs', 'Group Members', 'Post Views'],
    ratePer1k: 2.10,
    icon: 'fab fa-telegram-plane',
    iconGrad: 'from-sky-500 to-blue-600',
    unitName: 'Members / Views',
    minQty: 500,
    defaultQty: 2000,
  },
  {
    id: 'other-services',
    name: 'Custom Web & Graphic Design Services',
    platform: 'others',
    category: 'Freelance & Design',
    badge: 'Custom Agency Work',
    badgeColor: 'text-teal-400',
    description: 'Custom UI/UX web landing pages, YouTube thumbnail packs, social media kit design & video editing.',
    tags: ['Web Design', 'Thumbnails', 'Video Editing'],
    ratePer1k: 15.00,
    icon: 'fas fa-layer-group',
    iconGrad: 'from-teal-500 to-cyan-700',
    unitName: 'Design Deliverables / Assets',
    minQty: 1,
    defaultQty: 1000,
  },
];

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  tags: string[];
}

const FAQS: FAQItem[] = [
  {
    id: 'faq-safety',
    question: 'Are SocialyPro services 100% safe and organic for my accounts?',
    answer: 'Yes! All services utilize 100% authentic human organic promotion networks complying strictly with platform terms of service. We NEVER ask for your account password or private login credentials.',
    category: 'Safety & Security',
    tags: ['safe', 'security', 'password', 'ban', 'organic', 'terms', 'risk', 'login'],
  },
  {
    id: 'faq-delivery',
    question: 'How fast does order delivery start after placing an order?',
    answer: 'Delivery begins automatically within 10 to 45 minutes of payment confirmation on WhatsApp (+880 1724-048252) or Telegram (@socialypro). You will receive live milestone tracking.',
    category: 'Delivery Speed',
    tags: ['speed', 'time', 'delivery', 'start', 'fast', 'instant', 'how long', 'duration'],
  },
  {
    id: 'faq-payments',
    question: 'Which payment methods do you accept (Crypto & Bangladesh)?',
    answer: 'We support all major payment channels: Binance Pay, Crypto (BTC, LTC, SOL, ETH), USDT (TRC20/BEP20), TapTap Send, Cryptomus, Airtm, Heleket, and for Bangladesh clients: bKash (Personal & Merchant), Nagad, and Rocket.',
    category: 'Payment Gateways',
    tags: ['payment', 'bkash', 'nagad', 'binance', 'crypto', 'usdt', 'taptap', 'cryptomus', 'airtm', 'heleket', 'rocket', 'bank'],
  },
  {
    id: 'faq-voiceover-ai',
    question: 'How do Voiceover and AI / Subscription Tools work?',
    answer: 'For Voiceover services, our voice artists record and master your script in your desired language and accent within 24 hours. For AI Tools (ChatGPT Plus, Canva Pro, Midjourney, etc.), access details are sent directly to your WhatsApp or Telegram immediately after payment.',
    category: 'Voiceover & AI Tools',
    tags: ['voiceover', 'ai', 'chatgpt', 'canva', 'midjourney', 'tools', 'subscription', 'audio', 'accent', 'script'],
  },
  {
    id: 'faq-refill',
    question: 'Do you offer a non-drop refill guarantee if numbers drop?',
    answer: 'Yes! All our premium organic packages come with a standard 30-day to 365-day free refill warranty. If any drop occurs, simply send your link to our 24/7 WhatsApp or Telegram support for an instant top-up.',
    category: 'Refill Guarantee',
    tags: ['refill', 'drop', 'guarantee', 'warranty', 'loss', 'decrease', 'protection'],
  },
  {
    id: 'faq-custom-agency',
    question: 'Can I get custom bulk wholesale packages or agency resale discounts?',
    answer: 'Absolutely. We partner with over 500+ digital agencies and freelance resellers worldwide. Message our VIP support on WhatsApp or Telegram with your monthly volume for wholesale pricing.',
    category: 'Agency & Wholesale',
    tags: ['agency', 'wholesale', 'reseller', 'discount', 'bulk', 'custom', 'partner', 'volume'],
  },
];

// Payment methods requested by user:
// binance, crypto, USDT, taptap send, cryptomus, airtim, Heleket, then BDT bkash, nagad
const PAYMENT_OPTIONS = [
  { id: 'binance', name: 'Binance Pay (Instant 0 Fee)' },
  { id: 'crypto', name: 'Crypto (BTC / LTC / SOL / ETH)' },
  { id: 'usdt', name: 'USDT (TRC20 / BEP20)' },
  { id: 'taptap', name: 'TapTap Send' },
  { id: 'cryptomus', name: 'Cryptomus' },
  { id: 'airtm', name: 'Airtm' },
  { id: 'heleket', name: 'Heleket' },
  { id: 'bkash', name: 'bKash (Personal / Merchant BD)' },
  { id: 'nagad', name: 'Nagad (BD)' },
  { id: 'rocket', name: 'Rocket / Upay (BD)' },
];

// SVG Logo Component based on IMG_20260829_231410.png
function BrandLogo({ size = 'default' }: { size?: 'sm' | 'default' | 'lg' }) {
  const iconSize = size === 'sm' ? 26 : size === 'lg' ? 44 : 34;
  return (
    <div className="flex items-center gap-2.5 group select-none">
      <div className="relative flex items-center justify-center p-1 rounded-xl bg-[#070d1d] border border-[#22c55e]/30 shadow-[0_0_20px_rgba(34,197,94,0.25)]">
        <svg
          width={iconSize}
          height={iconSize}
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-transform group-hover:scale-105 duration-200"
        >
          <defs>
            <linearGradient id="facetGreen" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#22c55e" />
              <stop offset="100%" stopColor="#15803d" />
            </linearGradient>
            <linearGradient id="facetBright" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#d1fae5" />
            </linearGradient>
          </defs>
          {/* Outer Diamond Contour */}
          <path d="M100 15 L180 75 L100 185 L20 75 Z" fill="#030712" stroke="#22c55e" strokeWidth="6" />
          {/* Top Diamond Facet Left */}
          <path d="M100 25 L40 75 L100 95 Z" fill="url(#facetGreen)" opacity="0.9" />
          {/* Top Diamond Facet Right */}
          <path d="M100 25 L160 75 L100 95 Z" fill="#22c55e" />
          {/* Center Jewel Core */}
          <path d="M100 45 L135 85 L100 155 L65 85 Z" fill="url(#facetBright)" />
          {/* Bottom Dual Facets */}
          <path d="M65 85 L100 155 L20 75 Z" fill="#15803d" />
          <path d="M135 85 L100 155 L180 75 Z" fill="#166534" />
          {/* Inner Accent Line */}
          <path d="M100 65 L118 90 L100 135 L82 90 Z" fill="#22c55e" />
        </svg>
      </div>
      <div className="flex flex-col">
        <span
          className={`font-black tracking-tight text-white flex items-center ${
            size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'
          }`}
        >
          Socialy<span className="text-[#22c55e]">Pro</span>
        </span>
        <span className="text-[8px] sm:text-[9px] text-gray-400 font-medium tracking-widest uppercase -mt-0.5">
          Global Freelancers & Growth
        </span>
      </div>
    </div>
  );
}

export default function App() {
  const WHATSAPP_PHONE = '8801724048252';
  const WHATSAPP_DIRECT_URL = `https://wa.me/${WHATSAPP_PHONE}`;
  const TELEGRAM_URL = 'https://t.me/socialypro';

  // States
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedServiceId, setSelectedServiceId] = useState<string>('ig-growth');
  const [orderQuantity, setOrderQuantity] = useState<number>(5000);
  const [targetLink, setTargetLink] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<string>('binance');
  const [orderNotes, setOrderNotes] = useState<string>('');
  const [orderModalOpen, setOrderModalOpen] = useState<boolean>(false);
  const [favoritesDrawerOpen, setFavoritesDrawerOpen] = useState<boolean>(false);
  const [openFaqIds, setOpenFaqIds] = useState<string[]>(['faq-safety']);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Testimonials state
  const [activeTestimonialIdx, setActiveTestimonialIdx] = useState<number>(0);
  const [isTestimonialPaused, setIsTestimonialPaused] = useState<boolean>(false);

  // Scroll to top button visibility state
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 350) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Auto-rotate testimonials every 4.5 seconds (pauses on hover)
  useEffect(() => {
    if (isTestimonialPaused) return;
    const interval = setInterval(() => {
      setActiveTestimonialIdx((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isTestimonialPaused]);

  // Favorites stored in localStorage
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('socialypro_favs');
      return saved ? JSON.parse(saved) : ['ig-growth', 'yt-growth'];
    } catch {
      return ['ig-growth', 'yt-growth'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('socialypro_favs', JSON.stringify(favorites));
    } catch (e) {
      console.error(e);
    }
  }, [favorites]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const toggleFavorite = (serviceId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (favorites.includes(serviceId)) {
      setFavorites((prev) => prev.filter((id) => id !== serviceId));
      showToast('Removed from favorites');
    } else {
      setFavorites((prev) => [...prev, serviceId]);
      showToast('Added to favorites ❤️');
    }
  };

  // Scroll reveal setup
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-6');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.scroll-reveal');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Filtered services
  const filteredServices = useMemo(() => {
    return SERVICES.filter((s) => {
      const matchesCat = activeCategory === 'all' || s.platform === activeCategory;
      if (!matchesCat) return false;
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        s.name.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.tags.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [activeCategory, searchQuery]);

  // Filtered FAQs based on search inquiry
  const matchedFaqs = useMemo(() => {
    if (!searchQuery.trim() || searchQuery.trim().length < 2) return [];
    const q = searchQuery.toLowerCase();
    return FAQS.filter(
      (f) =>
        f.question.toLowerCase().includes(q) ||
        f.answer.toLowerCase().includes(q) ||
        f.tags.some((t) => t.toLowerCase().includes(q))
    );
  }, [searchQuery]);

  // Selected Service calculation
  const currentSelectedService = useMemo(() => {
    return SERVICES.find((s) => s.id === selectedServiceId) || SERVICES[0];
  }, [selectedServiceId]);

  const calculatedUSD = useMemo(() => {
    const validQty = Math.max(1, Number(orderQuantity) || 1000);
    return ((validQty / 1000) * currentSelectedService.ratePer1k).toFixed(2);
  }, [orderQuantity, currentSelectedService]);

  const calculatedBDT = useMemo(() => {
    return Math.round(Number(calculatedUSD) * 122).toLocaleString();
  }, [calculatedUSD]);

  const openOrder = (serviceId?: string, defaultQty?: number) => {
    if (serviceId) {
      setSelectedServiceId(serviceId);
      const svc = SERVICES.find((s) => s.id === serviceId);
      if (svc && defaultQty) setOrderQuantity(defaultQty);
      else if (svc && svc.defaultQty) setOrderQuantity(svc.defaultQty);
    }
    setOrderModalOpen(true);
  };

  const toggleFaqAccordion = (id: string) => {
    setOpenFaqIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const jumpToFaq = (faqId: string) => {
    if (!openFaqIds.includes(faqId)) {
      setOpenFaqIds((prev) => [...prev, faqId]);
    }
    const el = document.getElementById(faqId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const buildOrderPayload = () => {
    const payObj = PAYMENT_OPTIONS.find((p) => p.id === paymentMethod) || PAYMENT_OPTIONS[0];
    return `🚀 *New Order & Inquiry via SocialyPro*\n\n• *Service:* ${currentSelectedService.name}\n• *Quantity:* ${Number(orderQuantity).toLocaleString()} units\n• *Calculated Charge:* $${calculatedUSD} USD (~${calculatedBDT} BDT)\n• *Target Link:* ${targetLink || 'Will provide in chat'}\n• *Payment Gateway:* ${payObj.name}\n${orderNotes ? `• *Inquiries / Notes:* ${orderNotes}\n` : ''}\nHello SocialyPro, please confirm order processing and payment address.`;
  };

  const handleWhatsAppSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const text = buildOrderPayload();
    window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(text)}`, '_blank');
    setOrderModalOpen(false);
  };

  const handleTelegramSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const text = buildOrderPayload();
    window.open(`https://t.me/socialypro?text=${encodeURIComponent(text)}`, '_blank');
    setOrderModalOpen(false);
  };

  const copyText = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    showToast(`Copied ${label} to clipboard!`);
  };

  return (
    <div className="min-h-screen bg-[#030712] text-white relative overflow-x-hidden font-sans selection:bg-[#22c55e] selection:text-black">
      {/* Dynamic Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-[99999] bg-[#0a1124] border border-[#22c55e] text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-bounce">
          <i className="fas fa-check-circle text-[#22c55e]"></i>
          <span className="text-xs sm:text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Ambient Radial Lights */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="pulse-glow bg-[#22c55e] top-0 left-[-100px] w-[400px] h-[400px] opacity-20"></div>
        <div className="pulse-glow bg-[#0ea5e9] top-1/3 right-[-100px] w-[380px] h-[380px] opacity-20"></div>
        <div className="pulse-glow bg-[#8b5cf6] bottom-10 left-1/3 w-[350px] h-[350px] opacity-15"></div>
      </div>

      {/* 1. TOP NAVIGATION HEADER */}
      <header className="glass-nav sticky top-0 z-50 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Exact Brand Logo & Name */}
            <a href="#" className="flex items-center">
              <BrandLogo />
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-1 bg-white/[0.03] px-3 py-1.5 rounded-full border border-white/[0.06]">
              <a href="#" className="px-4 py-2 rounded-full text-xs font-semibold bg-white/10 text-white">
                Home
              </a>
              <a
                href="#category-filters"
                className="px-4 py-2 rounded-full text-xs font-medium text-gray-400 hover:text-white hover:bg-white/5 transition"
              >
                Categories
              </a>
              <a
                href="#services"
                className="px-4 py-2 rounded-full text-xs font-medium text-gray-400 hover:text-white hover:bg-white/5 transition"
              >
                Services
              </a>
              <a
                href="#testimonials"
                className="px-4 py-2 rounded-full text-xs font-medium text-gray-400 hover:text-white hover:bg-white/5 transition flex items-center gap-1.5"
              >
                <i className="fas fa-star text-amber-400 text-[10px]"></i> Reviews & Proof
              </a>
              <a
                href="#faq"
                className="px-4 py-2 rounded-full text-xs font-medium text-gray-400 hover:text-white hover:bg-white/5 transition"
              >
                FAQ & Inquiries
              </a>
              <a
                href="#payments"
                className="px-4 py-2 rounded-full text-xs font-medium text-gray-400 hover:text-white hover:bg-white/5 transition"
              >
                Payments
              </a>
            </nav>

            {/* Right Action Controls */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Favorites Drawer Toggle Button with Count */}
              <button
                type="button"
                onClick={() => setFavoritesDrawerOpen(true)}
                className="relative p-2.5 rounded-xl bg-white/5 hover:bg-pink-500/10 border border-white/10 text-pink-500 transition cursor-pointer"
                title="Saved Favorites"
                aria-label="Favorites"
              >
                <i className="fas fa-heart text-base"></i>
                <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-lg">
                  {favorites.length}
                </span>
              </button>

              {/* Direct WhatsApp Top Button */}
              <a
                href={WHATSAPP_DIRECT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center gap-1.5 btn-whatsapp px-3.5 sm:px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold cursor-pointer text-white"
              >
                <i className="fab fa-whatsapp text-base"></i> WhatsApp
              </a>

              {/* Direct Telegram Top Button */}
              <a
                href={TELEGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center gap-1.5 btn-telegram px-3.5 sm:px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold cursor-pointer text-white"
              >
                <i className="fab fa-telegram-plane text-base"></i> Telegram
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* 2. HERO INTRO */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-14 pb-16 w-full">
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center scroll-reveal opacity-0 translate-y-6 transition-all duration-700">
          <div className="text-center lg:text-left z-10">
            <div className="inline-flex items-center gap-2.5 glass-panel px-4 py-2 rounded-full text-xs font-bold text-gray-200 mb-6 border border-[#22c55e]/30 shadow-[0_0_15px_rgba(34,197,94,0.15)]">
              <div className="w-2.5 h-2.5 rounded-full bg-[#22c55e] animate-ping shrink-0"></div>
              <span>Global Verified Freelancers • 100% Organic Human</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.15] mb-6 tracking-tight">
              Scale Globally with <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#22c55e] via-emerald-400 to-[#38bdf8]">
                SocialyPro Growth
              </span>
            </h1>

            <p className="text-gray-400 text-sm sm:text-lg mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed font-light">
              Empowering global agencies, creators, and freelancers with authentic organic engagement across Meta, YouTube, TikTok, Voiceover & AI Tools.
            </p>

            {/* Quick CTAs */}
            <div className="flex flex-col sm:flex-row flex-wrap justify-center lg:justify-start gap-3 sm:gap-4 mb-8">
              <a
                href={WHATSAPP_DIRECT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp flex items-center justify-center gap-2 text-white font-bold px-6 sm:px-7 py-3.5 sm:py-4 rounded-xl text-sm sm:text-base shadow-xl cursor-pointer"
              >
                <i className="fab fa-whatsapp text-xl"></i> Chat on WhatsApp
              </a>
              <a
                href={TELEGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-telegram flex items-center justify-center gap-2 text-white font-bold px-6 sm:px-7 py-3.5 sm:py-4 rounded-xl text-sm sm:text-base shadow-xl cursor-pointer"
              >
                <i className="fab fa-telegram-plane text-xl"></i> Telegram @socialypro
              </a>
              <button
                type="button"
                onClick={() => openOrder('ig-growth')}
                className="btn-dark-modern flex items-center justify-center gap-2 text-white font-semibold px-6 sm:px-7 py-3.5 sm:py-4 rounded-xl text-sm sm:text-base cursor-pointer"
              >
                <i className="fas fa-shopping-bag text-xs text-[#22c55e]"></i> Order Cart
              </button>
            </div>

            {/* Quick Contact Copy */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 text-xs text-gray-400">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-500">
                Direct Contact:
              </span>
              <button
                type="button"
                onClick={() => copyText('+8801724048252', 'WhatsApp Number')}
                className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 flex items-center gap-1.5 transition cursor-pointer"
              >
                <i className="fab fa-whatsapp text-[#22c55e]"></i> +880 1724-048252 <i className="far fa-copy text-[10px] text-gray-500"></i>
              </button>
              <button
                type="button"
                onClick={() => copyText('@socialypro', 'Telegram Username')}
                className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 flex items-center gap-1.5 transition cursor-pointer"
              >
                <i className="fab fa-telegram-plane text-[#24A1DE]"></i> @socialypro <i className="far fa-copy text-[10px] text-gray-500"></i>
              </button>
            </div>
          </div>

          {/* Right Live Hub Card */}
          <div className="w-full max-w-lg mx-auto lg:max-w-full">
            <div className="glass-panel rounded-3xl p-6 sm:p-8 animate-float relative overflow-hidden shadow-2xl">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-white font-bold text-base">SocialyPro Analytics Engine</h3>
                  <p className="text-gray-400 text-xs mt-0.5">Real-time organic performance tracking</p>
                </div>
                <div className="flex items-center gap-1.5 bg-[#22c55e]/10 text-[#22c55e] px-3 py-1 rounded-full text-xs font-bold border border-[#22c55e]/25">
                  <div className="w-2 h-2 bg-[#22c55e] rounded-full animate-ping"></div> Live Sync
                </div>
              </div>

              {/* Glowing SVG Graph */}
              <div className="h-32 w-full mb-6 flex items-end">
                <svg
                  className="w-full h-full drop-shadow-[0_0_20px_rgba(34,197,94,0.35)]"
                  viewBox="0 0 400 100"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient id="chartGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#22c55e" stopOpacity="0.5" />
                      <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M0,85 L40,70 L80,65 L120,55 L160,45 L200,50 L240,30 L280,25 L320,15 L360,20 L400,8 L400,100 L0,100 Z"
                    fill="url(#chartGrad)"
                  />
                  <path
                    d="M0,85 L40,70 L80,65 L120,55 L160,45 L200,50 L240,30 L280,25 L320,15 L360,20 L400,8"
                    fill="none"
                    stroke="#22c55e"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                  <circle cx="160" cy="45" r="4.5" fill="#fff" />
                  <circle cx="280" cy="25" r="4.5" fill="#fff" />
                  <circle cx="400" cy="8" r="5.5" fill="#22c55e" />
                </svg>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="bg-black/40 border border-white/5 rounded-2xl p-3 text-center">
                  <div className="text-[#22c55e] text-sm font-extrabold">+48.2K</div>
                  <div className="text-[10px] text-gray-400">Human Reach</div>
                </div>
                <div className="bg-black/40 border border-white/5 rounded-2xl p-3 text-center">
                  <div className="text-[#38bdf8] text-sm font-extrabold">+215%</div>
                  <div className="text-[10px] text-gray-400">Engagement</div>
                </div>
                <div className="bg-black/40 border border-white/5 rounded-2xl p-3 text-center">
                  <div className="text-purple-400 text-sm font-extrabold">100%</div>
                  <div className="text-[10px] text-gray-400">Safe & Secure</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. CATEGORY ICONS FILTER & INQUIRY SEARCH BAR */}
        <section
          id="category-filters"
          className="mt-20 mb-12 relative w-full scroll-mt-24 scroll-reveal opacity-0 translate-y-6 transition-all duration-700"
        >
          {/* Header Subtitle from reference screenshot */}
          <div className="text-center mb-6">
            <div className="text-[10px] sm:text-xs font-bold tracking-[0.2em] text-gray-400 uppercase mb-2">
              TRUSTED BY ELITE CREATORS & FREELANCERS ACROSS MAJOR ECOSYSTEMS
            </div>
            <h2 className="text-xl sm:text-3xl font-extrabold text-white">
              Filter Services by Platform & Search Inquiries
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1 max-w-xl mx-auto">
              Tap any category to filter services (Instagram, YouTube, TikTok, Meta Boost, AI Tools), or search below for instant FAQ inquiry answers.
            </p>
          </div>

          {/* Compact Category Icons Filter Bar (Smaller icon design as requested) */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-2.5 px-2 max-w-5xl mx-auto mb-7">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`w-[60px] h-[60px] sm:w-[68px] sm:h-[68px] p-1.5 sm:p-2 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all duration-200 cursor-pointer border ${
                    isActive
                      ? 'bg-[#22c55e]/20 border-[#22c55e] scale-105 shadow-[0_0_15px_rgba(34,197,94,0.35)]'
                      : 'bg-[#070d1d]/85 border-white/10 hover:border-white/25 hover:bg-white/5 active:scale-95'
                  }`}
                  title={cat.name}
                >
                  <i
                    className={`${cat.icon} text-base sm:text-lg ${isActive ? 'text-[#22c55e]' : cat.color}`}
                  ></i>
                  <span
                    className={`text-[8.5px] sm:text-[9.5px] font-semibold text-center truncate max-w-full leading-tight ${
                      isActive ? 'text-white font-bold' : 'text-gray-400'
                    }`}
                  >
                    {cat.name}
                  </span>
                  {isActive && <div className="w-1 h-1 rounded-full bg-[#22c55e] -mt-0.5"></div>}
                </button>
              );
            })}
          </div>

          {/* Search Bar for Service or Inquiries */}
          <div className="max-w-2xl mx-auto px-2 relative z-20">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#22c55e]">
                <i className="fas fa-search text-base"></i>
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search services (e.g. Followers, Views, Voiceover) or inquiries (e.g. bKash, delivery, safety)..."
                className="w-full bg-[#070d1d]/95 backdrop-blur-xl border border-white/15 rounded-2xl pl-11 pr-24 py-4 text-white text-xs sm:text-sm placeholder-gray-500 focus:outline-none focus:border-[#22c55e] focus:ring-2 focus:ring-[#22c55e]/20 transition shadow-2xl"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-14 pr-3 flex items-center text-gray-400 hover:text-white cursor-pointer text-xs"
                >
                  <i className="fas fa-times"></i>
                </button>
              )}
              <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 bg-white/10 px-2 py-1 rounded-md">
                  Live
                </span>
              </div>
            </div>

            {/* Matched FAQ Answers Dropdown when searching inquiries */}
            {matchedFaqs.length > 0 && (
              <div className="mt-3 bg-[#0a1124] border border-[#22c55e]/40 rounded-2xl p-4 shadow-2xl animate-fadeIn">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#22c55e]">
                    <i className="fas fa-question-circle"></i>
                    <span>Matched Inquiries from FAQ ({matchedFaqs.length})</span>
                  </div>
                  <a href="#faq" className="text-[11px] text-gray-400 hover:text-white transition">
                    View Full FAQ Section &rarr;
                  </a>
                </div>
                <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
                  {matchedFaqs.map((faq) => (
                    <div
                      key={faq.id}
                      onClick={() => jumpToFaq(faq.id)}
                      className="p-3 bg-black/40 hover:bg-[#22c55e]/10 rounded-xl border border-white/5 hover:border-[#22c55e]/30 transition cursor-pointer"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <h5 className="text-xs font-bold text-white flex items-center gap-1.5">
                          <i className="fas fa-check-circle text-[#22c55e] text-[10px]"></i> {faq.question}
                        </h5>
                        <span className="text-[9px] bg-white/10 px-2 py-0.5 rounded text-gray-400 shrink-0">
                          {faq.category}
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-300 mt-1 line-clamp-2">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* 4. SERVICES CATALOG (WITH LOVE FAVORITE BUTTON ON EACH CARD) */}
        <section
          id="services"
          className="pt-12 w-full scroll-mt-24 scroll-reveal opacity-0 translate-y-6 transition-all duration-700"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4 w-full">
            <div>
              <div className="text-[#22c55e] text-xs font-extrabold mb-1.5 flex items-center gap-2 uppercase tracking-widest">
                <i className="fas fa-sparkles"></i> Elite Services Catalog
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
                42+ Organic Growth & Digital Services
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-2">
                Showing {filteredServices.length} services{' '}
                {activeCategory !== 'all' && `in ${activeCategory}`}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setFavoritesDrawerOpen(true)}
              className="text-xs sm:text-sm text-pink-400 hover:text-white font-bold bg-pink-500/10 hover:bg-pink-500/20 px-4 py-2.5 rounded-xl transition border border-pink-500/25 flex items-center gap-2 cursor-pointer"
            >
              <i className="fas fa-heart"></i> Saved Favorites ({favorites.length})
            </button>
          </div>

          {/* Services Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {filteredServices.map((service) => {
              const isFav = favorites.includes(service.id);
              return (
                <div
                  key={service.id}
                  onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
                    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
                  }}
                  className="service-card-tilt p-6 rounded-3xl flex flex-col h-full group relative cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-4 relative z-10">
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div
                        className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${service.iconGrad} flex items-center justify-center text-white text-2xl shadow-lg shrink-0 group-hover:scale-105 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all duration-300`}
                      >
                        <i className={service.icon}></i>
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-base sm:text-lg font-bold text-white truncate group-hover:text-[#22c55e] transition-colors">
                          {service.name}
                        </h3>
                        <span className={`text-[11px] font-medium ${service.badgeColor}`}>
                          {service.badge}
                        </span>
                      </div>
                    </div>

                    {/* Love Heart Favorite Button (Circled in user attachment) */}
                    <button
                      type="button"
                      onClick={(e) => toggleFavorite(service.id, e)}
                      className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all cursor-pointer shrink-0 ${
                        isFav
                          ? 'bg-pink-500/20 text-pink-500 border border-pink-500/40 shadow-[0_0_15px_rgba(236,72,153,0.35)]'
                          : 'bg-white/5 hover:bg-pink-500/10 text-gray-400 hover:text-pink-400 border border-white/10'
                      }`}
                      title={isFav ? 'Remove from favorites' : 'Save to favorites'}
                    >
                      <i className={`fas fa-heart text-base ${isFav ? 'scale-110' : ''}`}></i>
                    </button>
                  </div>

                  <p className="text-xs text-gray-400 mb-5 leading-relaxed relative z-10">{service.description}</p>

                  <div className="flex flex-wrap gap-2 mb-6 relative z-10">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-semibold text-gray-300 bg-white/10 px-2.5 py-1 rounded-lg border border-white/10"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto flex items-center justify-between border-t border-white/5 pt-4 relative z-10">
                    <div className="text-xs text-gray-400">
                      Starting from{' '}
                      <span className="text-white font-bold text-sm">
                        ${service.ratePer1k.toFixed(2)}
                      </span>{' '}
                      <span className="text-[10px]">/1K</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => openOrder(service.id, service.defaultQty)}
                      className="px-4 py-2 rounded-xl bg-white/5 group-hover:bg-[#22c55e] group-hover:text-black group-hover:shadow-[0_0_15px_rgba(34,197,94,0.4)] text-white text-xs font-bold flex items-center gap-1.5 transition-all duration-300 cursor-pointer"
                    >
                      Order Now <i className="fas fa-arrow-right text-[10px] group-hover:translate-x-0.5 transition-transform"></i>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 5. ROTATING CUSTOMER SUCCESS STORIES & TESTIMONIALS SECTION (STAR RATINGS TO BUILD TRUST) */}
        <section
          id="testimonials"
          className="pt-20 sm:pt-24 w-full scroll-mt-24 scroll-reveal opacity-0 translate-y-6 transition-all duration-700"
        >
          {/* Section Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-amber-500/10 text-amber-400 text-xs font-extrabold px-4 py-1.5 rounded-full border border-amber-500/25 mb-3 uppercase tracking-widest shadow-[0_0_15px_rgba(245,158,11,0.15)]">
              <i className="fas fa-star text-amber-400"></i> Verified Customer Success Stories
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              Trusted by 1,840+ Creators & Agencies Worldwide
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-2 max-w-xl mx-auto">
              See how verified brands, creators, and freelancers scale their reach organically with guaranteed non-drop delivery.
            </p>
          </div>

          {/* Aggregate Trust Metrics Bar */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-5xl mx-auto mb-10">
            <div className="glass-card p-4 rounded-2xl flex items-center gap-3.5 border border-white/10">
              <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-center text-amber-400 text-lg shrink-0">
                <i className="fas fa-star"></i>
              </div>
              <div>
                <div className="flex items-center gap-1 text-white font-extrabold text-base sm:text-lg leading-tight">
                  <span>4.98 / 5.0</span>
                </div>
                <div className="text-[11px] text-gray-400 font-medium">1,840+ Verified Reviews</div>
              </div>
            </div>

            <div className="glass-card p-4 rounded-2xl flex items-center gap-3.5 border border-white/10">
              <div className="w-11 h-11 rounded-xl bg-[#22c55e]/10 border border-[#22c55e]/25 flex items-center justify-center text-[#22c55e] text-lg shrink-0">
                <i className="fas fa-bolt"></i>
              </div>
              <div>
                <div className="text-white font-extrabold text-base sm:text-lg leading-tight">
                  &lt; 25 Mins
                </div>
                <div className="text-[11px] text-gray-400 font-medium">Avg. Start Time</div>
              </div>
            </div>

            <div className="glass-card p-4 rounded-2xl flex items-center gap-3.5 border border-white/10">
              <div className="w-11 h-11 rounded-xl bg-sky-500/10 border border-sky-500/25 flex items-center justify-center text-sky-400 text-lg shrink-0">
                <i className="fas fa-shield-alt"></i>
              </div>
              <div>
                <div className="text-white font-extrabold text-base sm:text-lg leading-tight">
                  100% Non-Drop
                </div>
                <div className="text-[11px] text-gray-400 font-medium">Life-Time Warranty</div>
              </div>
            </div>

            <div className="glass-card p-4 rounded-2xl flex items-center gap-3.5 border border-white/10">
              <div className="w-11 h-11 rounded-xl bg-purple-500/10 border border-purple-500/25 flex items-center justify-center text-purple-400 text-lg shrink-0">
                <i className="fas fa-headset"></i>
              </div>
              <div>
                <div className="text-white font-extrabold text-base sm:text-lg leading-tight">
                  24/7 Priority
                </div>
                <div className="text-[11px] text-gray-400 font-medium">WhatsApp & Telegram</div>
              </div>
            </div>
          </div>

          {/* Featured Rotating Testimonial Showcase Card */}
          <div
            className="max-w-4xl mx-auto glass-card p-6 sm:p-9 rounded-3xl relative border border-white/15 shadow-2xl overflow-hidden group"
            onMouseEnter={() => setIsTestimonialPaused(true)}
            onMouseLeave={() => setIsTestimonialPaused(false)}
          >
            {/* Ambient Corner Glow */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-[#22c55e]/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

            {/* Top Row: Client Info, Rating & Platform */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 relative z-10">
              <div className="flex items-center gap-4">
                <img
                  src={TESTIMONIALS[activeTestimonialIdx].avatar}
                  alt={TESTIMONIALS[activeTestimonialIdx].clientName}
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl object-cover border-2 border-[#22c55e]/40 shadow-lg shrink-0"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base sm:text-lg font-bold text-white">
                      {TESTIMONIALS[activeTestimonialIdx].clientName}
                    </h3>
                    <span className="text-xs text-gray-400">
                      {TESTIMONIALS[activeTestimonialIdx].country}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 font-medium">
                    {TESTIMONIALS[activeTestimonialIdx].handleOrRole}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="inline-flex items-center gap-1 bg-[#22c55e]/15 text-[#22c55e] text-[10px] font-bold px-2 py-0.5 rounded-md border border-[#22c55e]/30">
                      <i className="fas fa-check-circle"></i> Verified Client
                    </span>
                    <span className="text-[10px] text-gray-400">
                      • {TESTIMONIALS[activeTestimonialIdx].deliveryTime}
                    </span>
                  </div>
                </div>
              </div>

              {/* Star Rating Display */}
              <div className="flex flex-col items-start sm:items-end gap-1.5 bg-black/40 px-4 py-2.5 rounded-2xl border border-white/10">
                <div className="flex items-center gap-1 text-amber-400 text-sm">
                  {[...Array(TESTIMONIALS[activeTestimonialIdx].rating)].map((_, i) => (
                    <i key={i} className="fas fa-star drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]"></i>
                  ))}
                  <span className="text-white text-xs font-extrabold ml-1">5.0 / 5.0</span>
                </div>
                <div className="text-[10px] text-gray-400 font-medium flex items-center gap-1">
                  <i className={TESTIMONIALS[activeTestimonialIdx].platformIcon}></i>
                  <span>{TESTIMONIALS[activeTestimonialIdx].platform} Growth</span>
                </div>
              </div>
            </div>

            {/* Results Metric Highlight Pill */}
            <div className="mb-5 relative z-10">
              <div className="inline-flex items-center gap-2 bg-[#22c55e]/10 border border-[#22c55e]/30 px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold text-[#22c55e] shadow-[0_0_15px_rgba(34,197,94,0.15)]">
                <i className="fas fa-chart-line"></i>
                <span>Achieved: {TESTIMONIALS[activeTestimonialIdx].resultsMetric}</span>
              </div>
            </div>

            {/* Review Quotation Narrative */}
            <div className="relative z-10 mb-6">
              <i className="fas fa-quote-left text-white/10 text-3xl sm:text-4xl absolute -top-4 -left-2 pointer-events-none"></i>
              <p className="text-sm sm:text-base text-gray-200 leading-relaxed italic pl-6 relative">
                "{TESTIMONIALS[activeTestimonialIdx].reviewText}"
              </p>
            </div>

            {/* Bottom Row: Service Tag & Carousel Controls */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-4 border-t border-white/10 relative z-10">
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <span>Service Package:</span>
                <span className="text-white font-semibold bg-white/10 px-2.5 py-1 rounded-lg border border-white/10">
                  {TESTIMONIALS[activeTestimonialIdx].servicePurchased}
                </span>
              </div>

              {/* Prev / Next & Pause Info Controls */}
              <div className="flex items-center gap-2 self-end sm:self-auto">
                <button
                  type="button"
                  onClick={() =>
                    setActiveTestimonialIdx((prev) =>
                      prev === 0 ? TESTIMONIALS.length - 1 : prev - 1
                    )
                  }
                  className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-white flex items-center justify-center transition cursor-pointer"
                  title="Previous Story"
                  aria-label="Previous Story"
                >
                  <i className="fas fa-chevron-left text-xs"></i>
                </button>

                {/* Animated Pagination Dots */}
                <div className="flex items-center gap-1.5 px-2">
                  {TESTIMONIALS.map((t, idx) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setActiveTestimonialIdx(idx)}
                      className={`h-2 rounded-full transition-all cursor-pointer ${
                        activeTestimonialIdx === idx
                          ? 'w-6 bg-[#22c55e] shadow-[0_0_10px_rgba(34,197,94,0.6)]'
                          : 'w-2 bg-white/20 hover:bg-white/40'
                      }`}
                      title={t.clientName}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setActiveTestimonialIdx((prev) => (prev + 1) % TESTIMONIALS.length)
                  }
                  className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-white flex items-center justify-center transition cursor-pointer"
                  title="Next Story"
                  aria-label="Next Story"
                >
                  <i className="fas fa-chevron-right text-xs"></i>
                </button>
              </div>
            </div>

            {/* Small subtle Auto-rotation indicator */}
            <div className="mt-3 text-[10px] text-gray-500 flex items-center justify-between">
              <span>
                <i className="fas fa-sync-alt mr-1 animate-spin text-[9px]"></i> Auto-rotating story (Hover to pause)
              </span>
              <span>Story {activeTestimonialIdx + 1} of {TESTIMONIALS.length}</span>
            </div>
          </div>

          {/* Quick Client Selector Chips */}
          <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto mt-6">
            {TESTIMONIALS.map((t, idx) => {
              const isSelected = activeTestimonialIdx === idx;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setActiveTestimonialIdx(idx)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition cursor-pointer text-xs ${
                    isSelected
                      ? 'bg-[#22c55e]/20 border-[#22c55e] text-white font-bold shadow-[0_0_12px_rgba(34,197,94,0.3)]'
                      : 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:border-white/20'
                  }`}
                >
                  <img
                    src={t.avatar}
                    alt={t.clientName}
                    className="w-4 h-4 rounded-full object-cover"
                  />
                  <span>{t.clientName.split(' ')[0]}</span>
                  <i className={`${t.platformIcon} text-[10px]`}></i>
                </button>
              );
            })}
          </div>
        </section>

        {/* 6. FAQ & INQUIRIES SECTION */}
        <section
          id="faq"
          className="pt-20 sm:pt-24 w-full scroll-mt-24 scroll-reveal opacity-0 translate-y-6 transition-all duration-700"
        >
          <div className="text-center mb-12">
            <div className="inline-block bg-[#22c55e]/10 text-[#22c55e] text-xs font-extrabold px-4 py-1.5 rounded-full border border-[#22c55e]/20 mb-3 uppercase tracking-widest">
              FAQ & Inquiries
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              Frequently Asked Questions & Answers
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-2 max-w-lg mx-auto">
              Everything you need to know about safety, payments (Binance, USDT, bKash), delivery speed, voiceovers & AI tools.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {FAQS.map((faq) => {
              const isOpen = openFaqIds.includes(faq.id);
              return (
                <div key={faq.id} id={faq.id} className="glass-card rounded-2xl overflow-hidden">
                  <button
                    type="button"
                    onClick={() => toggleFaqAccordion(faq.id)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-[#22c55e]/10 flex items-center justify-center text-[#22c55e] text-xs shrink-0">
                        <i className="fas fa-question"></i>
                      </div>
                      <h4 className="text-sm sm:text-base font-bold text-white">{faq.question}</h4>
                    </div>
                    <i
                      className={`fas fa-chevron-down text-xs transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[#22c55e]' : 'text-gray-400'
                      }`}
                    ></i>
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-gray-300 leading-relaxed border-t border-white/5">
                      <p>{faq.answer}</p>
                      <div className="mt-4 flex items-center justify-between pt-3 border-t border-white/5">
                        <span className="text-[10px] text-gray-500 uppercase tracking-wider">
                          Category: {faq.category}
                        </span>
                        <a
                          href={WHATSAPP_DIRECT_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] text-[#22c55e] hover:underline font-semibold"
                        >
                          Ask on WhatsApp &rarr;
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* 6. CONTACT & GLOBAL PAYMENTS SECTION */}
        <section
          id="payments"
          className="pt-20 sm:pt-24 pb-12 w-full scroll-reveal opacity-0 translate-y-6 transition-all duration-700"
        >
          <div className="text-center mb-12">
            <div className="inline-block bg-[#22c55e]/10 text-[#22c55e] text-xs font-extrabold px-4 py-1.5 rounded-full border border-[#22c55e]/20 mb-3 uppercase tracking-widest">
              Contact & Payments
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              Get in Touch & Supported Gateways
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {/* WhatsApp Card */}
            <div className="glass-panel p-6 rounded-3xl text-center border-t-4 border-t-[#22c55e]">
              <div className="w-12 h-12 rounded-2xl bg-[#22c55e]/10 text-[#22c55e] flex items-center justify-center text-2xl mx-auto mb-3">
                <i className="fab fa-whatsapp"></i>
              </div>
              <h3 className="text-base font-bold text-white mb-1">WhatsApp 24/7</h3>
              <p className="text-[#22c55e] font-extrabold text-base mb-4">+880 1724-048252</p>
              <a
                href={WHATSAPP_DIRECT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full btn-whatsapp py-3 rounded-xl font-bold text-xs text-white block text-center cursor-pointer"
              >
                Direct WhatsApp Chat
              </a>
            </div>

            {/* Telegram Card */}
            <div className="glass-panel p-6 rounded-3xl text-center border-t-4 border-t-[#24A1DE]">
              <div className="w-12 h-12 rounded-2xl bg-[#24A1DE]/10 text-[#24A1DE] flex items-center justify-center text-2xl mx-auto mb-3">
                <i className="fab fa-telegram-plane"></i>
              </div>
              <h3 className="text-base font-bold text-white mb-1">Telegram Support</h3>
              <p className="text-[#24A1DE] font-extrabold text-base mb-4">@socialypro</p>
              <a
                href={TELEGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full btn-telegram py-3 rounded-xl font-bold text-xs text-white block text-center cursor-pointer"
              >
                Telegram @socialypro
              </a>
            </div>

            {/* International & Crypto */}
            <div className="glass-panel p-6 rounded-3xl">
              <h3 className="text-base font-bold text-white mb-2">🌍 Crypto & International</h3>
              <ul className="text-xs text-gray-300 space-y-2 mb-4">
                <li className="flex justify-between">
                  <span>Binance Pay / USDT</span>
                  <i className="fas fa-check text-[#22c55e]"></i>
                </li>
                <li className="flex justify-between">
                  <span>Cryptomus / Airtm</span>
                  <i className="fas fa-check text-[#22c55e]"></i>
                </li>
                <li className="flex justify-between">
                  <span>TapTap Send / Heleket</span>
                  <i className="fas fa-check text-[#22c55e]"></i>
                </li>
              </ul>
              <button
                type="button"
                onClick={() => openOrder()}
                className="w-full btn-dark-modern py-2.5 rounded-xl font-bold text-xs text-white cursor-pointer"
              >
                Pay via Crypto / Global
              </button>
            </div>

            {/* Bangladesh local */}
            <div className="glass-panel p-6 rounded-3xl">
              <h3 className="text-base font-bold text-white mb-2">🇧🇩 Bangladesh Local</h3>
              <ul className="text-xs text-gray-300 space-y-2 mb-4">
                <li className="flex justify-between">
                  <span>bKash (Personal/Merchant)</span>
                  <i className="fas fa-check text-[#22c55e]"></i>
                </li>
                <li className="flex justify-between">
                  <span>Nagad</span>
                  <i className="fas fa-check text-[#22c55e]"></i>
                </li>
                <li className="flex justify-between">
                  <span>Rocket / Upay / Bank</span>
                  <i className="fas fa-check text-[#22c55e]"></i>
                </li>
              </ul>
              <button
                type="button"
                onClick={() => openOrder()}
                className="w-full btn-dark-modern py-2.5 rounded-xl font-bold text-xs text-white cursor-pointer"
              >
                Pay with BDT (bKash)
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* 7. FOOTER */}
      <footer className="bg-[#02050e] border-t border-white/10 pt-16 pb-12 mt-20 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            <div className="md:col-span-1">
              <BrandLogo />
              <p className="text-xs text-gray-400 leading-relaxed mt-4 mb-6">
                Elite global organic social media growth agency for freelancers, creators, and international digital agencies.
              </p>
              <div className="flex items-center gap-2.5 text-gray-400">
                <a
                  href={WHATSAPP_DIRECT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-[#22c55e]/10 hover:bg-[#22c55e] text-[#22c55e] hover:text-black flex items-center justify-center transition border border-[#22c55e]/20"
                  title="WhatsApp"
                >
                  <i className="fab fa-whatsapp"></i>
                </a>
                <a
                  href={TELEGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-[#24A1DE]/10 hover:bg-[#24A1DE] text-[#24A1DE] hover:text-white flex items-center justify-center transition border border-[#24A1DE]/20"
                  title="Telegram"
                >
                  <i className="fab fa-telegram-plane"></i>
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold text-sm mb-4">Categories</h4>
              <ul className="space-y-2.5 text-xs text-gray-400">
                <li>
                  <a href="#category-filters" className="hover:text-white transition">
                    Instagram & YouTube
                  </a>
                </li>
                <li>
                  <a href="#category-filters" className="hover:text-white transition">
                    TikTok & Facebook
                  </a>
                </li>
                <li>
                  <a href="#category-filters" className="hover:text-white transition">
                    Meta Boost & Ads
                  </a>
                </li>
                <li>
                  <a href="#category-filters" className="hover:text-white transition">
                    Studio Voiceovers
                  </a>
                </li>
                <li>
                  <a href="#category-filters" className="hover:text-white transition">
                    AI & Premium Subscriptions
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold text-sm mb-4">Payment Methods</h4>
              <ul className="space-y-2.5 text-xs text-gray-400">
                <li>Binance Pay / Crypto</li>
                <li>USDT (TRC20 / BEP20)</li>
                <li>TapTap Send & Cryptomus</li>
                <li>Airtm & Heleket</li>
                <li>bKash & Nagad (BDT)</li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold text-sm mb-4">Support & Contact</h4>
              <div className="space-y-2 mb-4">
                <div>
                  <span className="text-[10px] text-gray-400 uppercase tracking-wider block">
                    WhatsApp 24/7:
                  </span>
                  <span className="text-[#22c55e] font-extrabold text-sm">+880 1724-048252</span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 uppercase tracking-wider block">
                    Telegram:
                  </span>
                  <a
                    href={TELEGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#24A1DE] font-extrabold text-sm hover:underline"
                  >
                    @socialypro
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500 gap-4">
            <p>&copy; 2026 SocialyPro. All rights reserved. 100% Organic Growth.</p>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-gray-400 transition">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-gray-400 transition">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* 8. ORDER PLACEMENT CART MODAL (LIVE USD CHARGE AS QUANTITY IS TYPED) */}
      {orderModalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto"
          onClick={(e) => {
            if (e.target === e.currentTarget) setOrderModalOpen(false);
          }}
        >
          <div className="glass-panel border border-[#22c55e]/30 rounded-3xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl my-8">
            <button
              type="button"
              onClick={() => setOrderModalOpen(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-gray-400 hover:text-white flex items-center justify-center transition cursor-pointer text-sm"
            >
              <i className="fas fa-times"></i>
            </button>

            <div className="text-center mb-6">
              <h3 className="text-2xl font-extrabold text-white">Instant Order & Inquiry</h3>
              <p className="text-xs text-gray-400 mt-1">
                Configure your order and connect directly on WhatsApp or Telegram{' '}
                <span className="text-[#24A1DE] font-semibold">@socialypro</span>
              </p>
            </div>

            <form onSubmit={handleWhatsAppSubmit} className="space-y-4">
              {/* Selected Service */}
              <div>
                <label className="block text-[11px] font-bold text-gray-300 uppercase mb-1.5">
                  Selected Service
                </label>
                <select
                  value={selectedServiceId}
                  onChange={(e) => setSelectedServiceId(e.target.value)}
                  className="w-full bg-black/60 border border-white/15 rounded-xl px-3.5 py-3 text-white text-xs sm:text-sm focus:outline-none focus:border-[#22c55e]"
                >
                  {SERVICES.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} (${s.ratePer1k.toFixed(2)} / 1K)
                    </option>
                  ))}
                </select>
              </div>

              {/* Target Link */}
              <div>
                <label className="block text-[11px] font-bold text-gray-300 uppercase mb-1.5">
                  Profile Link / Target URL
                </label>
                <input
                  type="text"
                  value={targetLink}
                  onChange={(e) => setTargetLink(e.target.value)}
                  placeholder="https://instagram.com/yourprofile or video link"
                  className="w-full bg-black/60 border border-white/15 rounded-xl px-3.5 py-3 text-white text-xs sm:text-sm focus:outline-none focus:border-[#22c55e]"
                />
              </div>

              {/* Amount / Quantity & Live USD Charge (Circled in user attachment) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-[11px] font-bold text-gray-300 uppercase">
                      Amount / Quantity
                    </label>
                    <span className="text-xs font-extrabold text-[#22c55e]">
                      ${calculatedUSD} USD
                    </span>
                  </div>
                  <input
                    type="number"
                    min={1}
                    value={orderQuantity}
                    onChange={(e) => setOrderQuantity(Number(e.target.value) || 0)}
                    placeholder="e.g. 5000"
                    className="w-full bg-black/60 border border-white/15 rounded-xl px-3.5 py-3 text-white text-xs sm:text-sm focus:outline-none focus:border-[#22c55e]"
                    required
                  />
                  <div className="text-[10px] text-gray-400 mt-1 flex justify-between">
                    <span>Rate: ${currentSelectedService.ratePer1k.toFixed(2)}/1K</span>
                    <span className="text-emerald-400 font-semibold">~{calculatedBDT} BDT</span>
                  </div>
                </div>

                {/* Payment Method Select */}
                <div>
                  <label className="block text-[11px] font-bold text-gray-300 uppercase mb-1.5">
                    Payment Method
                  </label>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-full bg-black/60 border border-white/15 rounded-xl px-3.5 py-3 text-white text-xs sm:text-sm focus:outline-none focus:border-[#22c55e]"
                  >
                    {PAYMENT_OPTIONS.map((opt) => (
                      <option key={opt.id} value={opt.id}>
                        {opt.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Optional Notes */}
              <div>
                <label className="block text-[11px] font-bold text-gray-300 uppercase mb-1.5">
                  Inquiries / Custom Requirements (Optional)
                </label>
                <textarea
                  rows={2}
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  placeholder="e.g. Voiceover accent, specific country audience, drip feed..."
                  className="w-full bg-black/60 border border-white/15 rounded-xl px-3.5 py-2 text-white text-xs sm:text-sm focus:outline-none focus:border-[#22c55e]"
                ></textarea>
              </div>

              {/* Live Charge Box */}
              <div className="bg-[#22c55e]/10 border border-[#22c55e]/30 rounded-2xl p-4 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-gray-400 uppercase tracking-widest block font-bold">
                    Total Estimated Charge
                  </span>
                  <div className="text-xl font-black text-white">
                    <span className="text-[#22c55e]">${calculatedUSD}</span>{' '}
                    <span className="text-xs text-gray-300">USD</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-gray-400 block font-semibold">Local BDT Rate</span>
                  <span className="text-sm font-bold text-emerald-400">~{calculatedBDT} BDT</span>
                </div>
              </div>

              {/* Ordering Buttons */}
              <div className="pt-2 space-y-2.5">
                <button
                  type="submit"
                  className="w-full btn-whatsapp py-3.5 rounded-xl font-extrabold text-sm flex items-center justify-center gap-2 cursor-pointer text-white shadow-xl"
                >
                  <i className="fab fa-whatsapp text-lg"></i> Continue on WhatsApp
                </button>
                <button
                  type="button"
                  onClick={handleTelegramSubmit}
                  className="w-full btn-telegram py-3.5 rounded-xl font-extrabold text-sm flex items-center justify-center gap-2 cursor-pointer text-white shadow-xl"
                >
                  <i className="fab fa-telegram-plane text-lg"></i> Continue on Telegram @socialypro
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 9. FAVORITES DRAWER */}
      {favoritesDrawerOpen && (
        <div
          className="fixed inset-0 z-[110] flex justify-end bg-black/80 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) setFavoritesDrawerOpen(false);
          }}
        >
          <div className="bg-[#070d1d] border-l border-white/10 w-full max-w-md h-full flex flex-col p-6 shadow-2xl overflow-y-auto">
            <div className="flex justify-between items-center pb-4 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-pink-500/20 text-pink-500 flex items-center justify-center">
                  <i className="fas fa-heart text-base"></i>
                </div>
                <div>
                  <h3 className="font-extrabold text-white text-base">Saved Favorite Services</h3>
                  <p className="text-[11px] text-gray-400">{favorites.length} packages saved</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setFavoritesDrawerOpen(false)}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white flex items-center justify-center cursor-pointer"
              >
                <i className="fas fa-times text-sm"></i>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-4 space-y-3">
              {favorites.length === 0 ? (
                <div className="text-center py-16 text-gray-400 text-xs">
                  <i className="far fa-heart text-3xl text-gray-600 mb-3 block"></i>
                  No favorites saved yet. Click the heart icon on any service card!
                </div>
              ) : (
                SERVICES.filter((s) => favorites.includes(s.id)).map((s) => (
                  <div
                    key={s.id}
                    className="p-4 bg-black/40 rounded-2xl border border-white/10 flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.iconGrad} flex items-center justify-center text-white text-lg shrink-0`}
                      >
                        <i className={s.icon}></i>
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-xs font-bold text-white truncate">{s.name}</h4>
                        <div className="text-[11px] text-[#22c55e] font-semibold">
                          ${s.ratePer1k.toFixed(2)} / 1K
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        type="button"
                        onClick={() => {
                          setFavoritesDrawerOpen(false);
                          openOrder(s.id, s.defaultQty);
                        }}
                        className="px-3 py-1.5 rounded-xl bg-[#22c55e] text-black font-bold text-[11px] cursor-pointer"
                      >
                        Order
                      </button>
                      <button
                        type="button"
                        onClick={() => toggleFavorite(s.id)}
                        className="w-8 h-8 rounded-xl bg-white/5 hover:bg-pink-500/20 text-pink-500 flex items-center justify-center cursor-pointer"
                        title="Remove"
                      >
                        <i className="fas fa-trash text-xs"></i>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="pt-4 border-t border-white/10 space-y-2">
              <a
                href={WHATSAPP_DIRECT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full btn-whatsapp py-3.5 rounded-xl font-bold text-xs text-white flex items-center justify-center gap-2 cursor-pointer"
              >
                <i className="fab fa-whatsapp text-sm"></i> Direct WhatsApp Chat
              </a>
            </div>
          </div>
        </div>
      )}

      {/* 10. GLASS EFFECT MOBILE BOTTOM BAR (REVIEWS REPLACED WITH FAVORITES ❤️ ICON & DIRECT WHATSAPP LINK) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 w-full glass-bottom-menu flex justify-between items-center px-4 sm:px-6 py-2.5 z-50">
        <a href="#" className="flex flex-col items-center gap-1 text-[#22c55e]">
          <i className="fas fa-home text-base"></i>
          <span className="text-[9px] font-bold">Home</span>
        </a>

        <a
          href="#services"
          className="flex flex-col items-center gap-1 text-gray-400 hover:text-white transition-colors"
        >
          <i className="fas fa-th-large text-base"></i>
          <span className="text-[9px] font-medium">Services</span>
        </a>

        {/* Dual Center Floating WhatsApp (Direct link to chat) & Telegram buttons */}
        <div className="flex items-center gap-2 -top-5 relative">
          {/* Middle WhatsApp Button - Sent to DIRECT WhatsApp chat only as requested */}
          <a
            href={WHATSAPP_DIRECT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 bg-[#25D366] rounded-full flex items-center justify-center text-white text-xl shadow-[0_4px_15px_rgba(37,211,102,0.6)] border-[3px] border-[#030712] active:scale-95 transition-transform cursor-pointer"
            aria-label="Direct WhatsApp Chat"
            title="Direct WhatsApp Chat"
          >
            <i className="fab fa-whatsapp"></i>
          </a>

          {/* Middle Telegram Button */}
          <a
            href={TELEGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 bg-[#24A1DE] rounded-full flex items-center justify-center text-white text-xl shadow-[0_4px_15px_rgba(36,161,222,0.6)] border-[3px] border-[#030712] active:scale-95 transition-transform cursor-pointer"
            aria-label="Direct Telegram @socialypro"
            title="Direct Telegram @socialypro"
          >
            <i className="fab fa-telegram-plane"></i>
          </a>
        </div>

        {/* Replaced Reviews with Favorites (Love ❤️ Icon) as circled in attachment */}
        <button
          type="button"
          onClick={() => setFavoritesDrawerOpen(true)}
          className="flex flex-col items-center gap-1 text-pink-400 hover:text-pink-300 transition-colors cursor-pointer"
        >
          <div className="relative">
            <i className="fas fa-heart text-base"></i>
            {favorites.length > 0 && (
              <span className="absolute -top-1 -right-2 bg-pink-500 text-white text-[8px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
                {favorites.length}
              </span>
            )}
          </div>
          <span className="text-[9px] font-medium">Favorites</span>
        </button>

        <a
          href="#faq"
          className="flex flex-col items-center gap-1 text-gray-400 hover:text-white transition-colors"
        >
          <i className="far fa-question-circle text-base"></i>
          <span className="text-[9px] font-medium">FAQ</span>
        </a>
      </div>

      {/* 11. FLOATING SCROLL TO TOP BUTTON */}
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Scroll to top"
        title="Scroll to Top"
        className={`fixed bottom-20 md:bottom-8 right-4 sm:right-7 z-40 btn-scroll-top w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center cursor-pointer group transition-all duration-300 ${
          showScrollTop
            ? 'opacity-100 translate-y-0 pointer-events-auto scale-100'
            : 'opacity-0 translate-y-6 pointer-events-none scale-90'
        }`}
      >
        <i className="fas fa-chevron-up text-sm sm:text-base text-[#22c55e] group-hover:text-white group-hover:-translate-y-0.5 transition-all duration-200"></i>
      </button>
    </div>
  );
}
