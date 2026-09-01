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
  { id: 'all', name: 'All Services', icon: 'fas fa-globe', color: 'text-emerald-400', bgGrad: 'from-emerald-500 to-teal-700' },
  { id: 'instagram', name: 'Instagram', icon: 'fab fa-instagram', color: 'text-pink-400', bgGrad: 'from-purple-600 via-pink-600 to-orange-500' },
  { id: 'meta_boost', name: 'Meta Boost (7d / 14d)', icon: 'fas fa-rocket', color: 'text-blue-400', bgGrad: 'from-blue-600 via-indigo-600 to-cyan-600' },
  { id: 'monthly_pr', name: '1-Month PR Packages', icon: 'fas fa-crown', color: 'text-amber-300', bgGrad: 'from-amber-500 via-orange-500 to-amber-700' },
  { id: 'youtube', name: 'YouTube', icon: 'fab fa-youtube', color: 'text-red-400', bgGrad: 'from-red-600 to-red-800' },
  { id: 'tiktok', name: 'TikTok', icon: 'fab fa-tiktok', color: 'text-white', bgGrad: 'from-black via-slate-900 to-cyan-600' },
  { id: 'facebook', name: 'Facebook', icon: 'fab fa-facebook', color: 'text-blue-400', bgGrad: 'from-blue-600 to-indigo-700' },
  { id: 'twitter', name: 'Twitter / X', icon: 'fab fa-twitter', color: 'text-sky-400', bgGrad: 'from-slate-800 to-sky-700' },
  { id: 'voiceover', name: 'Voiceover & Reels', icon: 'fas fa-microphone-lines', color: 'text-amber-400', bgGrad: 'from-amber-600 to-yellow-600' },
  { id: 'affiliate', name: 'Affiliate & Airdrop', icon: 'fas fa-coins', color: 'text-emerald-400', bgGrad: 'from-emerald-600 to-cyan-600' },
  { id: 'reviews', name: 'App & Map Reviews', icon: 'fas fa-star', color: 'text-yellow-400', bgGrad: 'from-yellow-500 to-amber-600' },
  { id: 'shopee_snap', name: 'Shopee & Snapchat', icon: 'fas fa-bag-shopping', color: 'text-orange-400', bgGrad: 'from-orange-500 to-yellow-500' },
  { id: 'linkedin', name: 'LinkedIn', icon: 'fab fa-linkedin-in', color: 'text-blue-400', bgGrad: 'from-blue-700 to-blue-900' },
  { id: 'spotify', name: 'Spotify', icon: 'fab fa-spotify', color: 'text-green-400', bgGrad: 'from-green-500 to-emerald-700' },
  { id: 'telegram', name: 'Telegram', icon: 'fab fa-telegram-plane', color: 'text-sky-400', bgGrad: 'from-sky-500 to-blue-600' },
  { id: 'ai_tools', name: 'AI & Tools', icon: 'fas fa-wand-magic-sparkles', color: 'text-purple-400', bgGrad: 'from-purple-600 to-indigo-700' },
  { id: 'others', name: 'Others & Design', icon: 'fas fa-layer-group', color: 'text-teal-400', bgGrad: 'from-teal-600 to-cyan-700' },
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
  serviceNumber: number; // Unique Service ID number for searching
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
  minQty: number; // All services minimum 1k (1000)
  defaultQty?: number;
}

const SERVICES: Service[] = [
  {
    id: 'ig-growth',
    serviceNumber: 1,
    name: 'Instagram Organic Growth',
    platform: 'instagram',
    category: 'Followers & Reach',
    badge: '100% Organic Human',
    badgeColor: 'text-emerald-400',
    description: 'High-quality active followers, reel views, targeted likes, story impressions, saves & Meta verification.',
    tags: ['Followers', 'Reel Views', 'Blue Badge'],
    ratePer1k: 9.50,
    icon: 'fab fa-instagram',
    iconGrad: 'from-pink-600 via-purple-600 to-orange-400',
    unitName: 'Followers / Engagements',
    minQty: 1000,
    defaultQty: 2000,
  },
  {
    id: 'yt-growth',
    serviceNumber: 2,
    name: 'YouTube Monetization & Watch Time',
    platform: 'youtube',
    category: 'Monetization & Subscribers',
    badge: 'Monetization Ready',
    badgeColor: 'text-emerald-400',
    description: 'Non-drop active subscribers, high-retention 4K views, 4,000 watch hours package & live stream viewers.',
    tags: ['Subscribers', 'Watch Hours', '4K Views'],
    ratePer1k: 14.50,
    icon: 'fab fa-youtube',
    iconGrad: 'from-red-600 to-red-900',
    unitName: 'Subscribers / Views',
    minQty: 1000,
    defaultQty: 2500,
  },
  {
    id: 'tt-growth',
    serviceNumber: 3,
    name: 'TikTok Viral Engine',
    platform: 'tiktok',
    category: 'Viral Algorithm Boost',
    badge: 'FYP Algorithm Boost',
    badgeColor: 'text-sky-400',
    description: 'Targeted followers, high-retention video views, video shares, saves, comments & live stream gifts boost.',
    tags: ['FYP Views', 'Followers', 'Live Gifts'],
    ratePer1k: 9.30,
    icon: 'fab fa-tiktok',
    iconGrad: 'from-gray-800 to-black border border-white/10',
    unitName: 'Followers / Views',
    minQty: 1000,
    defaultQty: 5000,
  },
  {
    id: 'fb-growth',
    serviceNumber: 4,
    name: 'Facebook Authority Boost',
    platform: 'facebook',
    category: 'Pages & Groups',
    badge: 'Page & Profile Growth',
    badgeColor: 'text-blue-400',
    description: 'USA/Global page likes, profile followers, reel plays, post shares, group members & video watch time.',
    tags: ['Page Likes', 'Followers', 'Reels'],
    ratePer1k: 9.80,
    icon: 'fab fa-facebook',
    iconGrad: 'from-blue-600 to-blue-800',
    unitName: 'Followers / Likes',
    minQty: 1000,
    defaultQty: 3000,
  },
  {
    id: 'x-growth',
    serviceNumber: 5,
    name: 'Twitter / X Influence Engine',
    platform: 'twitter',
    category: 'Trending & Impressions',
    badge: 'Verified & Active',
    badgeColor: 'text-sky-400',
    description: 'Authentic followers, retweets, quote tweets, bookmark saves & high impressions for ad revenue payout.',
    tags: ['Followers', 'Retweets', 'Impressions'],
    ratePer1k: 14.90,
    icon: 'fab fa-twitter',
    iconGrad: 'from-slate-800 to-black border border-white/10',
    unitName: 'Followers / Impressions',
    minQty: 1000,
    defaultQty: 2500,
  },
  {
    id: 'in-growth',
    serviceNumber: 6,
    name: 'LinkedIn Professional & B2B Leads',
    platform: 'linkedin',
    category: 'Professional & B2B',
    badge: 'B2B High Converting',
    badgeColor: 'text-blue-400',
    description: 'Executive connections, company page followers, post endorsements, reposts & targeted B2B lead acceleration.',
    tags: ['Connections', 'Company Followers', 'B2B Leads'],
    ratePer1k: 28.50,
    icon: 'fab fa-linkedin-in',
    iconGrad: 'from-blue-700 to-sky-800',
    unitName: 'Connections / Followers',
    minQty: 1000,
    defaultQty: 1000,
  },
  {
    id: 'sp-growth',
    serviceNumber: 7,
    name: 'Spotify Streams & Playlist Pitching',
    platform: 'spotify',
    category: 'Music Monetization',
    badge: 'Royalty Eligible',
    badgeColor: 'text-emerald-400',
    description: 'Algorithmic monthly listeners, organic track plays, playlist saves, followers & editorial playlist pitching.',
    tags: ['Monthly Listeners', 'Streams', 'Saves'],
    ratePer1k: 11.50,
    icon: 'fab fa-spotify',
    iconGrad: 'from-emerald-500 to-green-700',
    unitName: 'Streams / Listeners',
    minQty: 1000,
    defaultQty: 5000,
  },
  {
    id: 'tg-growth',
    serviceNumber: 8,
    name: 'Telegram Crypto & Community Growth',
    platform: 'telegram',
    category: 'Community & Groups',
    badge: 'Active Crypto Members',
    badgeColor: 'text-sky-400',
    description: 'Channel subscribers, group members, post views, emoji reactions & active crypto community outreach.',
    tags: ['Channel Subs', 'Group Members', 'Post Views'],
    ratePer1k: 9.90,
    icon: 'fab fa-telegram-plane',
    iconGrad: 'from-sky-500 to-blue-600',
    unitName: 'Members / Views',
    minQty: 1000,
    defaultQty: 2000,
  },
  {
    id: 'meta-boost-7d',
    serviceNumber: 9,
    name: 'Meta Boost Package (Day 7 / 7d Targeted Boost)',
    platform: 'meta_boost',
    category: 'Meta Advertising',
    badge: 'Day 7 (7d) Boost from $29',
    badgeColor: 'text-blue-400',
    description: 'Day 7 (7d) continuous targeted Instagram & Facebook algorithm boost, niche audience discovery & engagement scaling.',
    tags: ['Day 7 Boost', '7d Campaign', 'Meta Boost $29', 'Reach Scaling'],
    ratePer1k: 29.00,
    icon: 'fas fa-rocket',
    iconGrad: 'from-blue-600 via-indigo-600 to-cyan-500',
    unitName: 'Campaign Units / Reach (1K Base)',
    minQty: 1000,
    defaultQty: 1000,
  },
  {
    id: 'meta-boost-14d',
    serviceNumber: 10,
    name: 'Meta Boost Package (Day 14 / 14d Targeted Boost)',
    platform: 'meta_boost',
    category: 'Meta Advertising',
    badge: 'Day 14 (14d) Boost from $59',
    badgeColor: 'text-indigo-400',
    description: 'Day 14 (14d) extended Meta ads & organic algorithmic optimization, conversion tracking, retargeting & followers flow.',
    tags: ['Day 14 Boost', '14d Campaign', 'Meta Boost $59', 'Pixel Scaling'],
    ratePer1k: 59.00,
    icon: 'fas fa-fire',
    iconGrad: 'from-indigo-600 via-purple-600 to-pink-600',
    unitName: 'Campaign Units / Reach (1K Base)',
    minQty: 1000,
    defaultQty: 1000,
  },
  {
    id: 'meta-boost-28d',
    serviceNumber: 11,
    name: 'Meta Boost Package (Day 28 / 28d Full Month Boost)',
    platform: 'meta_boost',
    category: 'Meta Advertising',
    badge: 'Day 28 (28d) Boost from $99',
    badgeColor: 'text-purple-400',
    description: 'Day 28 (28d) enterprise monthly Meta growth powerhouse. Continuous viral feeds, story interactions & organic sales funnels.',
    tags: ['Day 28 Boost', '28d Campaign', 'Meta Boost $99', 'Full Month Viral'],
    ratePer1k: 99.00,
    icon: 'fas fa-bolt',
    iconGrad: 'from-purple-700 via-pink-600 to-amber-500',
    unitName: 'Campaign Units / Reach (1K Base)',
    minQty: 1000,
    defaultQty: 1000,
  },
  {
    id: 'voiceover-standard',
    serviceNumber: 12,
    name: 'Studio Voiceover Dubbing (Standard Script)',
    platform: 'voiceover',
    category: 'Studio Voiceover',
    badge: 'Starts from $90',
    badgeColor: 'text-amber-400',
    description: 'Professional human studio voiceovers recorded in broadcast-grade acoustics. Multi-language (US/UK, Bangla, Hindi, Arabic, Spanish).',
    tags: ['Studio Voiceover $90', 'Commercial Rights', '24h Delivery'],
    ratePer1k: 90.00,
    icon: 'fas fa-microphone-lines',
    iconGrad: 'from-amber-500 to-orange-700',
    unitName: 'Words / 1K Units Script',
    minQty: 1000,
    defaultQty: 1000,
  },
  {
    id: 'voiceover-ads-reels',
    serviceNumber: 13,
    name: 'Ads & Reels Voiceover Dubbing (+ Free Original Music)',
    platform: 'voiceover',
    category: 'Studio Voiceover',
    badge: 'From $190 + Free Music',
    badgeColor: 'text-amber-300',
    description: 'High-converting commercial Voiceover for TikTok, Reels & Meta Ads. Includes 100% Free Original Royalty-Free Background Music & Studio Mastering.',
    tags: ['Ads Voiceover $190+', 'Free Original Music', 'High Converting'],
    ratePer1k: 190.00,
    icon: 'fas fa-headphones',
    iconGrad: 'from-yellow-500 via-amber-600 to-red-600',
    unitName: 'Words / 1K Units Master Script',
    minQty: 1000,
    defaultQty: 1000,
  },
  {
    id: 'affiliate-services',
    serviceNumber: 14,
    name: 'Affiliate & Referral Signups | Airdrop / Telegram Bot Join ᴺᴱᵂ',
    platform: 'affiliate',
    category: 'Affiliate & Airdrop Growth',
    badge: 'Min $190/K Real Users',
    badgeColor: 'text-emerald-400',
    description: 'Website referral signups, Web3 crypto airdrop bot join, Telegram task completions, bounty registration & CPA affiliate conversions.',
    tags: ['Airdrop Join', 'Referral Signups', 'Bot Tasks', 'Min $190/K'],
    ratePer1k: 190.00,
    icon: 'fas fa-coins',
    iconGrad: 'from-emerald-600 via-teal-600 to-cyan-700',
    unitName: 'Referral Signups / Bot Joins',
    minQty: 1000,
    defaultQty: 1000,
  },
  {
    id: 'shopee-services',
    serviceNumber: 15,
    name: 'Shopee Services ᴺᴱᵂ',
    platform: 'shopee_snap',
    category: 'E-commerce & Store Reach',
    badge: '100% Real Store Visitors',
    badgeColor: 'text-orange-400',
    description: 'Shopee store followers, item likes, product wishlist saves, real store visitors & live stream audience engagement.',
    tags: ['Shopee Followers', 'Store Likes', 'Wishlists', 'Live Views'],
    ratePer1k: 16.50,
    icon: 'fas fa-bag-shopping',
    iconGrad: 'from-orange-500 to-red-600',
    unitName: 'Followers / Likes / Wishlists',
    minQty: 1000,
    defaultQty: 1000,
  },
  {
    id: 'snapchat-growth',
    serviceNumber: 16,
    name: 'Snapchat - Followers/Likes | 100% Real Users ᴺᴱᵂ',
    platform: 'shopee_snap',
    category: 'Snapchat Growth',
    badge: '100% Real Users',
    badgeColor: 'text-yellow-400',
    description: 'Snapchat Spotlight views, public profile subscribers, story views, swipe-ups, friend adds & Snap score booster.',
    tags: ['Spotlight Views', 'Subscribers', 'Story Views', '100% Real'],
    ratePer1k: 22.50,
    icon: 'fab fa-snapchat',
    iconGrad: 'from-yellow-400 to-amber-600 text-black',
    unitName: 'Subscribers / Views',
    minQty: 1000,
    defaultQty: 1000,
  },
  {
    id: 'playstore-reviews',
    serviceNumber: 17,
    name: 'Android App Reviews - Google Play Store ᴺᴱᵂ',
    platform: 'reviews',
    category: 'App Store Optimization',
    badge: 'Verified 5-Star Reviews',
    badgeColor: 'text-emerald-400',
    description: '5-Star Google Play Store ratings & organic keyword-targeted reviews. Real Android devices with app install & retention.',
    tags: ['5-Star Rating', 'Play Store ASO', 'Organic Installs'],
    ratePer1k: 145.00,
    icon: 'fab fa-google-play',
    iconGrad: 'from-cyan-600 via-teal-600 to-green-600',
    unitName: 'Ratings & Reviews Units',
    minQty: 1000,
    defaultQty: 1000,
  },
  {
    id: 'gmaps-reviews',
    serviceNumber: 18,
    name: '𝗚𝗼𝗼𝗴𝗹𝗲 𝗠𝗮𝗽 𝗥𝗲𝘃𝗶𝗲𝘄𝘀 | 𝟓 𝐒𝐭𝐚𝐫 𝗥𝗮𝘁𝗶𝗻𝗴 ⭐ |𝟏𝟎𝟎% 𝐎𝐫𝗴𝗮𝗻𝗶𝐜 𝐑𝐞𝐚𝐥 𝐔𝐬𝐞𝐫𝐬',
    platform: 'reviews',
    category: 'Google My Business / Local SEO',
    badge: '5-Star Google Maps ⭐',
    badgeColor: 'text-yellow-400',
    description: 'High-authority Google Maps 5-Star reviews with custom local content, geographic targeting & real human photo uploads for local business ranking.',
    tags: ['Google Maps 5-Star', 'Local SEO', '100% Organic Real'],
    ratePer1k: 165.00,
    icon: 'fas fa-map-location-dot',
    iconGrad: 'from-blue-600 via-emerald-600 to-amber-500',
    unitName: '5-Star Reviews Units',
    minQty: 1000,
    defaultQty: 1000,
  },
  {
    id: 'ai-subscriptions',
    serviceNumber: 19,
    name: 'AI & Premium Subscriptions (ChatGPT Plus, Canva Pro, Midjourney)',
    platform: 'ai_tools',
    category: 'Digital Licenses & AI Tools',
    badge: 'Instant Activation',
    badgeColor: 'text-purple-400',
    description: 'Official shared & private subscriptions for ChatGPT Plus, Canva Pro, Midjourney, Claude Pro, CapCut Pro & Envato Elements.',
    tags: ['ChatGPT Plus', 'Canva Pro', 'Midjourney', 'CapCut Pro'],
    ratePer1k: 19.90,
    icon: 'fas fa-wand-magic-sparkles',
    iconGrad: 'from-purple-600 via-fuchsia-600 to-indigo-700',
    unitName: 'Licenses / Tool Subscriptions',
    minQty: 1000,
    defaultQty: 1000,
  },
  {
    id: 'pr-team-starter',
    serviceNumber: 20,
    name: 'PR Team 1-Month Omnichannel Growth (Starter Package)',
    platform: 'monthly_pr',
    category: 'Dedicated Agency PR Team',
    badge: '$499 / Month (Top 10)',
    badgeColor: 'text-amber-400',
    description: 'Dedicated PR & Growth Manager for 30 days. Simultaneous managed promotion across all Top 10 Social Media Platforms (IG, YT, TT, FB, X, LinkedIn, Spotify, Telegram, Snapchat, Pinterest).',
    tags: ['1-Month PR $499', 'Top 10 Platforms', 'PR Team Managed'],
    ratePer1k: 499.00,
    icon: 'fas fa-crown',
    iconGrad: 'from-amber-600 via-yellow-500 to-orange-600',
    unitName: '1-Month PR Package Units',
    minQty: 1000,
    defaultQty: 1000,
  },
  {
    id: 'pr-team-pro',
    serviceNumber: 21,
    name: 'PR Team 1-Month Omnichannel Growth (Pro Viral Package)',
    platform: 'monthly_pr',
    category: 'Dedicated Agency PR Team',
    badge: '$749 / Month (Top 10)',
    badgeColor: 'text-amber-300',
    description: 'Aggressive 30-day viral amplification on all Top 10 Social Networks. Includes dedicated PR strategist, weekly press releases, cross-platform influencer outreach & 24/7 VIP priority manager.',
    tags: ['1-Month PR $749', 'Influencer PR', 'Top 10 Platforms'],
    ratePer1k: 749.00,
    icon: 'fas fa-gem',
    iconGrad: 'from-fuchsia-600 via-purple-600 to-indigo-700',
    unitName: '1-Month PR Package Units',
    minQty: 1000,
    defaultQty: 1000,
  },
  {
    id: 'pr-team-vip',
    serviceNumber: 22,
    name: 'PR Team 1-Month Omnichannel Growth (VIP Enterprise Package)',
    platform: 'monthly_pr',
    category: 'Dedicated Agency PR Team',
    badge: '$999 / Month (Top 10 VIP)',
    badgeColor: 'text-emerald-400',
    description: 'Ultimate 30-day celebrity-tier PR & growth management across all Top 10 Social Media Networks. Algorithmic trending takeovers, guaranteed verification assistance, media features & direct executive war room.',
    tags: ['1-Month PR $999', 'Celebrity PR', 'War Room VIP'],
    ratePer1k: 999.00,
    icon: 'fas fa-trophy',
    iconGrad: 'from-yellow-400 via-emerald-500 to-cyan-600',
    unitName: '1-Month PR Package Units',
    minQty: 1000,
    defaultQty: 1000,
  },
  {
    id: 'other-services',
    serviceNumber: 23,
    name: 'Custom Web & Graphic Design Deliverables',
    platform: 'others',
    category: 'Freelance & Agency Design',
    badge: 'Custom Deliverables',
    badgeColor: 'text-teal-400',
    description: 'Custom UI/UX web landing pages, YouTube thumbnail packs, social media branding kits, video editing & bespoke agency creative assets.',
    tags: ['Web Design', 'Thumbnails', 'Branding Kits'],
    ratePer1k: 35.00,
    icon: 'fas fa-layer-group',
    iconGrad: 'from-teal-500 to-cyan-700',
    unitName: 'Design Deliverables / Assets',
    minQty: 1000,
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

// Global Multi-Country Currency Definitions with Realistic Exchange Rates
export interface CurrencyInfo {
  code: string;
  name: string;
  symbol: string;
  flag: string;
  rateAgainstUSD: number; // 1 USD = rate * currency
  country: string;
  decimals?: number;
  popular?: boolean;
}

export const TOP_CURRENCIES: CurrencyInfo[] = [
  { code: 'USD', name: 'US Dollar', symbol: '$', flag: '🇺🇸', rateAgainstUSD: 1.0, country: 'United States', decimals: 2, popular: true },
  { code: 'EUR', name: 'Euro', symbol: '€', flag: '🇪🇺', rateAgainstUSD: 0.92, country: 'European Union', decimals: 2, popular: true },
  { code: 'GBP', name: 'British Pound', symbol: '£', flag: '🇬🇧', rateAgainstUSD: 0.79, country: 'United Kingdom', decimals: 2, popular: true },
  { code: 'BDT', name: 'Bangladeshi Taka', symbol: '৳', flag: '🇧🇩', rateAgainstUSD: 122.0, country: 'Bangladesh', decimals: 0, popular: true },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹', flag: '🇮🇳', rateAgainstUSD: 86.5, country: 'India', decimals: 2, popular: true },
  { code: 'AED', name: 'UAE Dirham', symbol: 'د.إ', flag: '🇦🇪', rateAgainstUSD: 3.67, country: 'United Arab Emirates', decimals: 2, popular: true },
  { code: 'BRL', name: 'Brazilian Real', symbol: 'R$', flag: '🇧🇷', rateAgainstUSD: 5.45, country: 'Brazil', decimals: 2 },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥', flag: '🇨🇳', rateAgainstUSD: 7.24, country: 'China', decimals: 2 },
  { code: 'EGP', name: 'Egyptian Pound', symbol: '£', flag: '🇪🇬', rateAgainstUSD: 49.2, country: 'Egypt', decimals: 2 },
  { code: 'KRW', name: 'South Korean Won', symbol: '₩', flag: '🇰🇷', rateAgainstUSD: 1380.0, country: 'South Korea', decimals: 0 },
  { code: 'KWD', name: 'Kuwaiti Dinar', symbol: 'KD', flag: '🇰🇼', rateAgainstUSD: 0.31, country: 'Kuwait', decimals: 3 },
  { code: 'NGN', name: 'Nigerian Naira', symbol: '₦', flag: '🇳🇬', rateAgainstUSD: 1620.0, country: 'Nigeria', decimals: 0 },
  { code: 'PHP', name: 'Philippine Peso', symbol: '₱', flag: '🇵🇭', rateAgainstUSD: 57.8, country: 'Philippines', decimals: 2 },
  { code: 'PKR', name: 'Pakistani Rupee', symbol: 'Rs', flag: '🇵🇰', rateAgainstUSD: 278.5, country: 'Pakistan', decimals: 0 },
  { code: 'RUB', name: 'Russian Ruble', symbol: '₽', flag: '🇷🇺', rateAgainstUSD: 91.5, country: 'Russia', decimals: 2 },
  { code: 'SAR', name: 'Saudi Riyal', symbol: 'ر.س', flag: '🇸🇦', rateAgainstUSD: 3.75, country: 'Saudi Arabia', decimals: 2 },
  { code: 'THB', name: 'Thai Baht', symbol: '฿', flag: '🇹🇭', rateAgainstUSD: 34.8, country: 'Thailand', decimals: 2 },
  { code: 'TRY', name: 'Turkish Lira', symbol: '₺', flag: '🇹🇷', rateAgainstUSD: 34.2, country: 'Turkey', decimals: 2 },
  { code: 'VND', name: 'Vietnamese Dong', symbol: '₫', flag: '🇻🇳', rateAgainstUSD: 25400.0, country: 'Vietnam', decimals: 0 },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'CA$', flag: '🇨🇦', rateAgainstUSD: 1.38, country: 'Canada', decimals: 2 },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'AU$', flag: '🇦🇺', rateAgainstUSD: 1.54, country: 'Australia', decimals: 2 },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥', flag: '🇯🇵', rateAgainstUSD: 152.0, country: 'Japan', decimals: 0 },
  { code: 'MYR', name: 'Malaysian Ringgit', symbol: 'RM', flag: '🇲🇾', rateAgainstUSD: 4.42, country: 'Malaysia', decimals: 2 },
  { code: 'IDR', name: 'Indonesian Rupiah', symbol: 'Rp', flag: '🇮🇩', rateAgainstUSD: 15800.0, country: 'Indonesia', decimals: 0 },
  { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$', flag: '🇸🇬', rateAgainstUSD: 1.33, country: 'Singapore', decimals: 2 },
  { code: 'ZAR', name: 'South African Rand', symbol: 'R', flag: '🇿🇦', rateAgainstUSD: 17.9, country: 'South Africa', decimals: 2 },
  { code: 'MXN', name: 'Mexican Peso', symbol: 'Mex$', flag: '🇲🇽', rateAgainstUSD: 19.8, country: 'Mexico', decimals: 2 },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF', flag: '🇨🇭', rateAgainstUSD: 0.88, country: 'Switzerland', decimals: 2 },
];

export function getCurrencyInfo(code: string): CurrencyInfo {
  return TOP_CURRENCIES.find((c) => c.code === code) || TOP_CURRENCIES[0];
}

export function formatServicePrice(usdRate: number, selectedCurrencyCode: string) {
  const curr = getCurrencyInfo(selectedCurrencyCode);
  const converted = usdRate * curr.rateAgainstUSD;
  const decimals = curr.decimals !== undefined ? curr.decimals : 2;
  const formattedVal = decimals === 0 ? Math.round(converted).toLocaleString() : converted.toFixed(decimals);

  return {
    primaryText: `${curr.symbol}${formattedVal} ${curr.code}`,
    rawConverted: converted,
    currency: curr,
    usdText: `$${usdRate.toFixed(2)} USD`,
    bdtText: `~৳${Math.round(usdRate * 122).toLocaleString()} BDT`,
    isUSD: curr.code === 'USD',
  };
}

export function formatOrderTotal(usdTotal: number, selectedCurrencyCode: string) {
  const curr = getCurrencyInfo(selectedCurrencyCode);
  const converted = usdTotal * curr.rateAgainstUSD;
  const decimals = curr.decimals !== undefined ? curr.decimals : 2;
  const formattedVal = decimals === 0 ? Math.round(converted).toLocaleString() : converted.toFixed(decimals);

  return {
    primaryText: `${curr.symbol}${formattedVal}`,
    code: curr.code,
    symbol: curr.symbol,
    currency: curr,
    usdEquivalent: `$${usdTotal.toFixed(2)} USD`,
    bdtEquivalent: `~৳${Math.round(usdTotal * 122).toLocaleString()} BDT`,
    exchangeRateNote: `1 USD = ${curr.symbol}${curr.rateAgainstUSD.toLocaleString()} ${curr.code}`,
    isUSD: curr.code === 'USD',
  };
}

// SVG Logo Component based on IMG_20260829_231410.png
function BrandLogo({ size = 'default', theme = 'dark' }: { size?: 'sm' | 'default' | 'lg'; theme?: 'light' | 'dark' }) {
  const iconSize = size === 'sm' ? 26 : size === 'lg' ? 44 : 34;
  return (
    <div className="flex items-center gap-2.5 group select-none">
      <div className={`relative flex items-center justify-center p-1 rounded-xl border transition-all duration-200 ${
        theme === 'light'
          ? 'bg-white border-[#22c55e]/40 shadow-[0_2px_10px_rgba(34,197,94,0.15)]'
          : 'bg-[#070d1d] border-[#22c55e]/30 shadow-[0_0_20px_rgba(34,197,94,0.25)]'
      }`}>
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
          <path d="M100 15 L180 75 L100 185 L20 75 Z" fill={theme === 'light' ? '#ffffff' : '#030712'} stroke="#22c55e" strokeWidth="6" />
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
          className={`font-black tracking-tight flex items-center ${
            theme === 'light' ? 'text-[#0b132b]' : 'text-white'
          } ${size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'}`}
        >
          Socialy<span className="text-[#22c55e]">Pro</span>
        </span>
      </div>
    </div>
  );
}

export default function App() {
  const WHATSAPP_PHONE = '8801724048252';
  const WHATSAPP_DIRECT_URL = `https://wa.me/${WHATSAPP_PHONE}`;
  const TELEGRAM_URL = 'https://t.me/socialypro';
  const SOCIALMAESTRO_PAY_URL = 'https://socialmaestro.netlify.app/';

  // Theme state with localStorage persistence
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    try {
      const saved = localStorage.getItem('socialypro_theme');
      return saved === 'light' || saved === 'dark' ? saved : 'dark';
    } catch {
      return 'dark';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('socialypro_theme', theme);
      if (theme === 'light') {
        document.documentElement.classList.add('light');
        document.documentElement.classList.remove('dark');
      } else {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
      }
    } catch (e) {
      console.error(e);
    }
  }, [theme]);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    showToast(`Switched to ${next === 'dark' ? 'Dark' : 'Light'} Mode ${next === 'dark' ? '🌙' : '☀️'}`);
  };

  // Live Analytics Engine Simulation (matches real-time trust metrics and growth counters)
  const [humanReachCount, setHumanReachCount] = useState<number>(48526);
  const [ordersInQueue, setOrdersInQueue] = useState<number>(310);
  const [isNumberPopping, setIsNumberPopping] = useState<boolean>(false);
  const [liveClock, setLiveClock] = useState<string>('21:28:44');

  useEffect(() => {
    // Clock ticker (format: HH:MM:SS)
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      setLiveClock(`${hours}:${minutes}:${seconds}`);
    };
    updateTime();
    const clockInterval = setInterval(updateTime, 1000);
    return () => clearInterval(clockInterval);
  }, []);

  useEffect(() => {
    // 3.8s sync cycle for live organic reach & queue simulation
    const syncInterval = setInterval(() => {
      const increment = Math.floor(Math.random() * 5) + 2;
      setHumanReachCount((prev) => prev + increment);
      setIsNumberPopping(true);
      setTimeout(() => setIsNumberPopping(false), 800);

      // Subtle queue variation (between 306 and 318)
      setOrdersInQueue((prev) => {
        const delta = Math.floor(Math.random() * 3) - 1;
        const next = prev + delta;
        return Math.max(306, Math.min(318, next));
      });
    }, 3800);
    return () => clearInterval(syncInterval);
  }, []);

  // States
  const [currency, setCurrency] = useState<string>(() => {
    try {
      const saved = localStorage.getItem('socialypro_currency');
      return saved && TOP_CURRENCIES.some((c) => c.code === saved) ? saved : 'USD';
    } catch {
      return 'USD';
    }
  });
  const [currencyModalOpen, setCurrencyModalOpen] = useState<boolean>(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState<boolean>(false);
  const [currencySearchQuery, setCurrencySearchQuery] = useState<string>('');

  useEffect(() => {
    try {
      localStorage.setItem('socialypro_currency', currency);
    } catch (e) {
      console.error(e);
    }
  }, [currency]);

  const selectCurrency = (newCurrencyCode: string) => {
    setCurrency(newCurrencyCode);
    const curr = getCurrencyInfo(newCurrencyCode);
    setCurrencyModalOpen(false);
    setCurrencyDropdownOpen(false);
    showToast(`Currency updated to ${curr.name} (${curr.symbol}${curr.code})`);
  };

  const activeCurrencyInfo = useMemo(() => {
    return getCurrencyInfo(currency);
  }, [currency]);

  const filteredCurrencies = useMemo(() => {
    if (!currencySearchQuery.trim()) return TOP_CURRENCIES;
    const q = currencySearchQuery.toLowerCase().trim();
    return TOP_CURRENCIES.filter(
      (c) =>
        c.code.toLowerCase().includes(q) ||
        c.name.toLowerCase().includes(q) ||
        c.country.toLowerCase().includes(q) ||
        c.symbol.toLowerCase().includes(q)
    );
  }, [currencySearchQuery]);

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

  // Scroll to top button visibility & Sticky Navbar scroll state
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      setIsScrolled(scrollY > 15);
      if (scrollY > 300) {
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

  // Filtered services with Service ID Number matching
  const filteredServices = useMemo(() => {
    return SERVICES.filter((s) => {
      const matchesCat =
        activeCategory === 'all' ||
        s.platform === activeCategory ||
        (activeCategory === 'meta_boost' && s.platform === 'meta_boost') ||
        (activeCategory === 'monthly_pr' && s.platform === 'monthly_pr') ||
        (activeCategory === 'voiceover' && s.platform === 'voiceover') ||
        (activeCategory === 'affiliate' && s.platform === 'affiliate') ||
        (activeCategory === 'reviews' && s.platform === 'reviews') ||
        (activeCategory === 'shopee_snap' && s.platform === 'shopee_snap');

      if (!matchesCat) return false;
      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase().trim();
      const numStr = s.serviceNumber.toString();
      
      // Match by exact or partial ID number (e.g. "1", "2", "#1", "#14", "id 1", "service 1")
      const matchesNumber =
        numStr === q ||
        `#${numStr}` === q ||
        `service ${numStr}` === q ||
        `id ${numStr}` === q ||
        `#${numStr}`.includes(q) ||
        numStr.includes(q);

      return (
        matchesNumber ||
        s.name.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.tags.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [activeCategory, searchQuery]);

  // Scroll reveal setup with smooth in/out animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0', 'revealed');
            entry.target.classList.remove('opacity-0', 'translate-y-6');
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    const elements = document.querySelectorAll('.scroll-reveal');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [activeCategory, filteredServices.length]);

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

  const calculatedTotal = useMemo(() => {
    const validQty = Math.max(1, Number(orderQuantity) || 1000);
    const usdAmount = (validQty / 1000) * currentSelectedService.ratePer1k;
    return formatOrderTotal(usdAmount, currency);
  }, [orderQuantity, currentSelectedService, currency]);

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
    const chargeSummary = calculatedTotal.isUSD
      ? `$${calculatedUSD} USD (${calculatedTotal.bdtEquivalent})`
      : `${calculatedTotal.primaryText} ${calculatedTotal.code} (Base: $${calculatedUSD} USD • ${calculatedTotal.bdtEquivalent})`;

    return `🚀 *New Order & Inquiry via SocialyPro*\n\n• *Service:* ${currentSelectedService.name}\n• *Quantity:* ${Number(orderQuantity).toLocaleString()} units\n• *Calculated Charge:* ${chargeSummary}\n• *Selected Currency:* ${calculatedTotal.currency.name} (${calculatedTotal.symbol}${calculatedTotal.code})\n• *Exchange Rate Applied:* ${calculatedTotal.exchangeRateNote}\n• *Target Link:* ${targetLink || 'Will provide in chat'}\n• *Payment Gateway:* ${payObj.name}\n${orderNotes ? `• *Inquiries / Notes:* ${orderNotes}\n` : ''}\nHello SocialyPro, please confirm order processing and payment address.`;
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
    <div className={`min-h-screen relative overflow-x-clip font-sans transition-colors duration-300 ${
      theme === 'light'
        ? 'bg-[#f8fafc] text-[#0f172a] selection:bg-[#22c55e] selection:text-black light'
        : 'bg-[#030712] text-white selection:bg-[#22c55e] selection:text-black dark'
    }`}>
      {/* Dynamic Toast Notification */}
      {toastMessage && (
        <div className={`fixed top-5 right-5 z-[99999] border border-[#22c55e] px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-bounce ${
          theme === 'light' ? 'bg-white text-slate-900 shadow-xl' : 'bg-[#0a1124] text-white'
        }`}>
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

      {/* 1. TOP NAVIGATION HEADER: FULLY STICKY 3D FLOATING CAPSULE */}
      <header className="sticky top-0 z-[100] w-full pt-2 sm:pt-3 pb-2 px-2.5 sm:px-4 max-w-7xl mx-auto transition-all duration-300 pointer-events-auto">
        <div className={`navbar-3d px-3 sm:px-5 py-2 sm:py-2.5 flex justify-between items-center relative transition-all ${
          isScrolled ? 'is-scrolled shadow-2xl' : ''
        } ${
          theme === 'light' ? 'bg-white/95 text-slate-900 border-slate-200/90 shadow-[0_10px_35px_rgba(0,0,0,0.06)]' : 'text-white'
        }`}>
          {/* Exact Brand Logo & Name */}
          <a href="#" className="flex items-center">
            <BrandLogo theme={theme} />
          </a>

          {/* Desktop Navigation Links */}
          <nav className={`hidden lg:flex items-center space-x-1 px-3 py-1.5 rounded-full border ${
            theme === 'light'
              ? 'bg-slate-100/90 border-slate-200/90 shadow-inner'
              : 'bg-white/[0.04] border-white/[0.08]'
          }`}>
            <a href="#" className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition ${
              theme === 'light' ? 'bg-white text-[#0b132b] shadow-sm' : 'bg-white/15 text-white'
            }`}>
              Home
            </a>
            <a
              href="#category-filters"
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition ${
                theme === 'light' ? 'text-slate-700 hover:text-[#0b132b] hover:bg-white/80' : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              Categories
            </a>
            <a
              href="#services"
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition ${
                theme === 'light' ? 'text-slate-700 hover:text-[#0b132b] hover:bg-white/80' : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              Services
            </a>
            <a
              href="#testimonials"
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition flex items-center gap-1.5 ${
                theme === 'light' ? 'text-slate-700 hover:text-[#0b132b] hover:bg-white/80' : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <i className="fas fa-star text-amber-400 text-[10px]"></i> Reviews
            </a>
            <a
              href="#faq"
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition ${
                theme === 'light' ? 'text-slate-700 hover:text-[#0b132b] hover:bg-white/80' : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              FAQ
            </a>
            <a
              href="#payments"
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition ${
                theme === 'light' ? 'text-slate-700 hover:text-[#0b132b] hover:bg-white/80' : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              Payments
            </a>
            <a
              href={SOCIALMAESTRO_PAY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-sm hover:opacity-95 transition flex items-center gap-1 cursor-pointer"
              title="Direct Online Payment Portal"
            >
              <i className="fas fa-credit-card text-[10px]"></i>
              <span>Pay Online</span>
            </a>
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Global Currency Converter Dropdown & Quick Toggles (Screenshot 5 Style) */}
            <div className="relative">
              {/* Quick Dropdown Trigger Button */}
              <button
                type="button"
                onClick={() => setCurrencyDropdownOpen((prev) => !prev)}
                className={`px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl border transition cursor-pointer flex items-center gap-1.5 text-xs font-bold ${
                  theme === 'light'
                    ? 'bg-slate-100/90 border-slate-200 text-slate-900 hover:bg-slate-200 shadow-sm'
                    : 'bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-[#22c55e]/30'
                }`}
                title={`Currency: ${activeCurrencyInfo.name} (${activeCurrencyInfo.symbol}${activeCurrencyInfo.code}). Click to change.`}
                aria-label="Select Currency"
              >
                <i className="fas fa-coins text-[#22c55e] text-xs"></i>
                <span className="font-extrabold text-[#22c55e]">{activeCurrencyInfo.code} ({activeCurrencyInfo.symbol})</span>
                <i className={`fas fa-chevron-down text-[9px] text-gray-400 ml-0.5 transition-transform duration-200 ${
                  currencyDropdownOpen ? 'rotate-180' : ''
                }`}></i>
              </button>

              {/* Dropdown Popover Menu */}
              {currencyDropdownOpen && (
                <>
                  {/* Backdrop overlay to close when clicking outside */}
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setCurrencyDropdownOpen(false)}
                  ></div>
                  <div className={`absolute right-0 top-full mt-2 w-64 sm:w-72 rounded-2xl border shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150 ${
                    theme === 'light'
                      ? 'bg-white border-slate-200 text-slate-900 shadow-2xl'
                      : 'bg-[#0a1124] border-white/15 text-white'
                  }`}>
                    {/* Search box in dropdown */}
                    <div className="p-2.5 border-b border-gray-200 dark:border-white/10">
                      <div className="relative">
                        <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs"></i>
                        <input
                          type="text"
                          value={currencySearchQuery}
                          onChange={(e) => setCurrencySearchQuery(e.target.value)}
                          placeholder="Search currency (USD, BDT, EUR...)"
                          className={`w-full border rounded-xl pl-8 pr-3 py-1.5 text-xs focus:outline-none focus:border-[#22c55e] transition ${
                            theme === 'light'
                              ? 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-gray-400'
                              : 'bg-black/50 border-white/10 text-white placeholder:text-gray-500'
                          }`}
                          autoFocus
                        />
                      </div>
                    </div>

                    {/* Currencies list */}
                    <div className="max-h-64 overflow-y-auto p-1.5 space-y-0.5 custom-scrollbar">
                      {filteredCurrencies.map((c) => {
                        const isSelected = currency === c.code;
                        return (
                          <button
                            key={c.code}
                            type="button"
                            onClick={() => selectCurrency(c.code)}
                            className={`w-full px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition cursor-pointer ${
                              isSelected
                                ? 'bg-[#22c55e] text-black font-extrabold shadow-sm'
                                : theme === 'light'
                                  ? 'hover:bg-slate-100 text-slate-800'
                                  : 'hover:bg-white/10 text-gray-200'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <div className="text-left">
                                <span className="font-extrabold">{c.code}</span>
                                <span className="text-[11px] opacity-75 ml-1">({c.symbol})</span>
                              </div>
                            </div>
                            <span className={`text-[10px] font-medium ${isSelected ? 'text-black/80' : 'text-gray-400'}`}>
                              {c.name}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Bottom Modal Full Converter Trigger */}
                    <div className={`p-2 text-center border-t text-[11px] font-bold ${
                      theme === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-white/5 border-white/10'
                    }`}>
                      <button
                        type="button"
                        onClick={() => {
                          setCurrencyDropdownOpen(false);
                          setCurrencyModalOpen(true);
                        }}
                        className="text-[#22c55e] hover:underline flex items-center justify-center gap-1 mx-auto"
                      >
                        <i className="fas fa-calculator text-[10px]"></i> Open Full Currency Converter (28+)
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Dark Mode Toggle Button: Simple Half Moon 🌙 as requested */}
            <button
              type="button"
              onClick={toggleTheme}
              className={`p-2 sm:px-2.5 sm:py-2 rounded-xl border transition cursor-pointer flex items-center justify-center gap-1 text-xs font-bold ${
                theme === 'light'
                  ? 'bg-slate-100/90 border-slate-200 text-slate-800 hover:bg-slate-200 shadow-sm'
                  : 'bg-white/5 border-white/10 text-yellow-300 hover:bg-white/10 hover:border-yellow-400/30'
              }`}
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label="Toggle Dark Mode (Half Moon 🌙)"
            >
              <span className="text-sm leading-none select-none">🌙</span>
              <span className="hidden xl:inline text-[11px] font-bold">
                {theme === 'dark' ? 'Dark' : 'Day'}
              </span>
            </button>

            {/* Favorites Drawer Toggle Button with Count */}
            <button
              type="button"
              onClick={() => setFavoritesDrawerOpen(true)}
              className={`relative p-2 sm:p-2.5 rounded-xl border transition cursor-pointer ${
                theme === 'light'
                  ? 'bg-pink-50/90 border-pink-200 text-pink-500 hover:bg-pink-100 shadow-sm'
                  : 'bg-white/5 hover:bg-pink-500/10 border-white/10 text-pink-500'
              }`}
              title="Saved Favorites"
              aria-label="Favorites"
            >
              <i className="fas fa-heart text-sm sm:text-base"></i>
              <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-lg">
                {favorites.length}
              </span>
            </button>

            {/* Direct Pay Online Button (Desktop / Tablet) */}
            <a
              href={SOCIALMAESTRO_PAY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-pay-online hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold cursor-pointer text-white shadow-lg whitespace-nowrap"
              title="Pay Online"
            >
              <i className="fas fa-credit-card text-xs"></i>
              <span>Pay Online</span>
            </a>

            {/* Direct WhatsApp Top Button */}
            <a
              href={WHATSAPP_DIRECT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-1.5 btn-whatsapp px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold cursor-pointer text-white shadow-md"
            >
              <i className="fab fa-whatsapp text-sm"></i> WhatsApp
            </a>

            {/* Direct Telegram Top Button */}
            <a
              href={TELEGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex items-center gap-1.5 btn-telegram px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold cursor-pointer text-white shadow-md"
            >
              <i className="fab fa-telegram-plane text-sm"></i> Telegram
            </a>
          </div>
        </div>
      </header>

      {/* 2. HERO INTRO */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-14 pb-16 w-full">
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center scroll-reveal opacity-0 translate-y-6 transition-all duration-700">
          <div className="text-center lg:text-left z-10">
            <div className={`inline-flex items-center gap-2.5 glass-panel px-4 py-2 rounded-full text-xs font-bold mb-6 border border-[#22c55e]/30 shadow-[0_0_15px_rgba(34,197,94,0.15)] ${
              theme === 'light' ? 'text-slate-800' : 'text-gray-200'
            }`}>
              <div className="w-2.5 h-2.5 rounded-full bg-[#22c55e] animate-ping shrink-0"></div>
              <span>Global Verified Freelancers • 100% Organic Human</span>
            </div>

            <h1 className={`text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.15] mb-6 tracking-tight ${
              theme === 'light' ? 'text-slate-900' : 'text-white'
            }`}>
              Scale Globally with <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#22c55e] via-emerald-400 to-[#38bdf8]">
                SocialyPro Growth
              </span>
            </h1>

            <p className={`text-sm sm:text-lg mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed font-light ${
              theme === 'light' ? 'text-slate-600' : 'text-gray-400'
            }`}>
              Empowering global agencies, creators, and freelancers with authentic organic engagement across Meta, YouTube, TikTok, Voiceover & AI Tools.
            </p>

            {/* Quick CTAs */}
            <div className="flex flex-col sm:flex-row flex-wrap justify-center lg:justify-start gap-3 sm:gap-4 mb-8">
              {/* Pay Online Button */}
              <a
                href={SOCIALMAESTRO_PAY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-pay-online flex items-center justify-center gap-2 text-white font-bold px-6 sm:px-7 py-3.5 sm:py-4 rounded-xl text-sm sm:text-base shadow-xl cursor-pointer"
              >
                <i className="fas fa-credit-card text-lg"></i> Pay Online
              </a>
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
                className="btn-dark-modern flex items-center justify-center gap-2 font-semibold px-6 sm:px-7 py-3.5 sm:py-4 rounded-xl text-sm sm:text-base cursor-pointer"
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

          {/* Right Live Hub Card (Matches Screenshot Trust & Live Performance Engine) */}
          <div className="w-full max-w-lg mx-auto lg:max-w-full">
            <div className="glass-panel rounded-3xl p-6 sm:p-7 relative overflow-hidden shadow-2xl border border-white/10">
              {/* Card Header matching screenshot */}
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#22c55e] animate-pulse"></div>
                  <span className="text-[11px] sm:text-xs font-black tracking-widest text-gray-300 uppercase">
                    SOCIALYPRO / ANALYTICS ENGINE
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-[#22c55e]/15 text-[#22c55e] px-2.5 py-1 rounded-full text-[11px] font-bold border border-[#22c55e]/30">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22c55e] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22c55e]"></span>
                  </span>
                  <span>• LIVE</span>
                </div>
              </div>

              {/* Four Core Metric Rows matching screenshot */}
              <div className="space-y-3.5 mb-6">
                {/* Row 1: Human reach delivered */}
                <div className={`flex items-center justify-between p-3 rounded-2xl border transition ${
                  theme === 'light' ? 'bg-slate-50/90 border-slate-200 hover:border-emerald-500/40 shadow-sm' : 'bg-black/30 border-white/5 hover:border-[#22c55e]/30'
                }`}>
                  <div className="flex items-center gap-2.5">
                    <div className="icon-badge-3d w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center text-xs shadow-md">
                      <i className="fas fa-users"></i>
                    </div>
                    <div>
                      <div className={`text-xs font-semibold ${theme === 'light' ? 'text-slate-800' : 'text-gray-300'}`}>Human reach delivered - 24h</div>
                      <div className={`text-[10px] ${theme === 'light' ? 'text-slate-500' : 'text-gray-500'}`}>100% Real human interaction</div>
                    </div>
                  </div>
                  <div className={`text-base sm:text-lg font-black text-emerald-500 dark:text-emerald-400 tabular-nums transition-all ${isNumberPopping ? 'animate-number-pop text-cyan-500' : ''}`}>
                    {humanReachCount.toLocaleString()}
                  </div>
                </div>

                {/* Row 2: Avg. engagement lift */}
                <div className={`flex items-center justify-between p-3 rounded-2xl border transition ${
                  theme === 'light' ? 'bg-slate-50/90 border-slate-200 hover:border-sky-500/40 shadow-sm' : 'bg-black/30 border-white/5 hover:border-sky-500/30'
                }`}>
                  <div className="flex items-center gap-2.5">
                    <div className="icon-badge-3d w-9 h-9 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 text-white flex items-center justify-center text-xs shadow-md">
                      <i className="fas fa-chart-line"></i>
                    </div>
                    <div>
                      <div className={`text-xs font-semibold ${theme === 'light' ? 'text-slate-800' : 'text-gray-300'}`}>Avg. engagement lift</div>
                      <div className={`text-[10px] ${theme === 'light' ? 'text-slate-500' : 'text-gray-500'}`}>Organic algorithm trigger</div>
                    </div>
                  </div>
                  <div className="text-base sm:text-lg font-black text-sky-500 dark:text-[#38bdf8] flex items-center gap-1">
                    <i className="fas fa-arrow-up text-xs animate-bounce"></i> +215%
                  </div>
                </div>

                {/* Row 3: Account safety score */}
                <div className={`flex items-center justify-between p-3 rounded-2xl border transition ${
                  theme === 'light' ? 'bg-slate-50/90 border-slate-200 hover:border-purple-500/40 shadow-sm' : 'bg-black/30 border-white/5 hover:border-purple-500/30'
                }`}>
                  <div className="flex items-center gap-2.5">
                    <div className="icon-badge-3d w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 text-white flex items-center justify-center text-xs shadow-md">
                      <i className="fas fa-shield-check"></i>
                    </div>
                    <div>
                      <div className={`text-xs font-semibold ${theme === 'light' ? 'text-slate-800' : 'text-gray-300'}`}>Account safety score</div>
                      <div className={`text-[10px] ${theme === 'light' ? 'text-slate-500' : 'text-gray-500'}`}>Zero password requirement</div>
                    </div>
                  </div>
                  <div className="text-base sm:text-lg font-black text-purple-600 dark:text-purple-300 flex items-center gap-1.5">
                    <i className="fas fa-check-circle text-[#22c55e] text-sm"></i> 100%
                  </div>
                </div>

                {/* Row 4: Orders in queue */}
                <div className={`flex items-center justify-between p-3 rounded-2xl border transition ${
                  theme === 'light' ? 'bg-slate-50/90 border-slate-200 hover:border-amber-500/40 shadow-sm' : 'bg-black/30 border-white/5 hover:border-amber-500/30'
                }`}>
                  <div className="flex items-center gap-2.5">
                    <div className="icon-badge-3d w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-white flex items-center justify-center text-xs shadow-md">
                      <i className="fas fa-sync-alt animate-spin"></i>
                    </div>
                    <div>
                      <div className={`text-xs font-semibold ${theme === 'light' ? 'text-slate-800' : 'text-gray-300'}`}>Orders in queue right now</div>
                      <div className={`text-[10px] ${theme === 'light' ? 'text-slate-500' : 'text-gray-500'}`}>Auto-distributed to verified nodes</div>
                    </div>
                  </div>
                  <div className="text-base sm:text-lg font-black text-amber-500 dark:text-amber-400 tabular-nums">
                    {ordersInQueue}
                  </div>
                </div>
              </div>

              {/* Interactive Live Growth Wave Visualizer */}
              <div className="mb-4 bg-black/40 rounded-2xl p-3 border border-white/5 relative overflow-hidden">
                <div className="flex items-center justify-between text-[10px] text-gray-400 mb-1.5">
                  <span className="font-semibold uppercase tracking-wider text-emerald-400 flex items-center gap-1">
                    <i className="fas fa-wave-pulse"></i> Real-time Traffic Wave
                  </span>
                  <span className="text-[9px] bg-emerald-500/15 text-emerald-300 px-2 py-0.5 rounded-full font-bold">
                    Peak Load
                  </span>
                </div>
                <div className="h-16 w-full flex items-end">
                  <svg
                    className="w-full h-full drop-shadow-[0_0_15px_rgba(34,197,94,0.4)]"
                    viewBox="0 0 400 70"
                    preserveAspectRatio="none"
                  >
                    <defs>
                      <linearGradient id="chartGradLive" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#22c55e" stopOpacity="0.45" />
                        <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.05" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M0,55 Q50,40 100,48 T200,30 T300,18 T400,8 L400,70 L0,70 Z"
                      fill="url(#chartGradLive)"
                    />
                    <path
                      d="M0,55 Q50,40 100,48 T200,30 T300,18 T400,8"
                      fill="none"
                      stroke="#22c55e"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                    <circle cx="100" cy="48" r="3.5" fill="#38bdf8" />
                    <circle cx="200" cy="30" r="3.5" fill="#38bdf8" />
                    <circle cx="300" cy="18" r="3.5" fill="#fff" />
                    <circle cx="400" cy="8" r="4.5" fill="#22c55e" className="animate-ping" />
                  </svg>
                </div>
              </div>

              {/* Card Footer matching screenshot: Syncing every 4s & Live Time */}
              <div className="flex items-center justify-between text-[11px] text-gray-400 font-mono pt-2 border-t border-white/10">
                <div className="flex items-center gap-1.5 text-gray-400">
                  <i className="fas fa-circle-notch animate-spin text-[10px] text-[#22c55e]"></i>
                  <span>Syncing every 4s</span>
                </div>
                <div className="flex items-center gap-1 text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                  <i className="far fa-clock text-[10px]"></i>
                  <span>{liveClock}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* LIVE SOCIAL MEDIA GROWTH INCREASING MARQUEE TICKER */}
        <section className="mt-8 mb-4 overflow-hidden rounded-2xl border border-white/10 bg-[#070d1d]/80 backdrop-blur-xl p-3 shadow-lg relative">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 shrink-0 bg-[#22c55e] text-black px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider shadow-[0_0_15px_rgba(34,197,94,0.4)]">
              <i className="fas fa-bolt"></i> Live Growth Stream
            </div>
            
            <div className="overflow-hidden relative w-full flex items-center">
              <div className="animate-marquee whitespace-nowrap flex items-center gap-8 text-xs font-medium text-gray-300">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-ping"></span>
                  <i className="fab fa-instagram text-pink-400"></i> <strong className="text-white">@lifestyle_mode</strong> gained <span className="text-emerald-400 font-bold">+5,000 Real IG Followers</span> (Delivery in progress)
                </span>
                <span className="text-gray-600">•</span>
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-ping"></span>
                  <i className="fab fa-youtube text-red-500"></i> <strong className="text-white">TechReviewPro</strong> unlocked <span className="text-cyan-400 font-bold">+4,000 Monetization Watch Hours</span>
                </span>
                <span className="text-gray-600">•</span>
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-ping"></span>
                  <i className="fab fa-tiktok text-cyan-300"></i> <strong className="text-white">@viral_beats</strong> boosted <span className="text-pink-400 font-bold">+45,000 FYP Views & Likes</span>
                </span>
                <span className="text-gray-600">•</span>
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-ping"></span>
                  <i className="fas fa-microphone-alt text-amber-400"></i> <strong className="text-white">Commercial Script</strong> 24h Studio Voiceover Master Delivered
                </span>
                <span className="text-gray-600">•</span>
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-ping"></span>
                  <i className="fab fa-spotify text-green-500"></i> <strong className="text-white">Indie Wave</strong> pushed to <span className="text-emerald-400 font-bold">+18,000 Algorithmic Royalty Streams</span>
                </span>
                <span className="text-gray-600">•</span>
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-ping"></span>
                  <i className="fab fa-facebook text-blue-400"></i> <strong className="text-white">Global Brand Page</strong> reached <span className="text-blue-300 font-bold">+10,000 Targeted Followers</span>
                </span>
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

          {/* Compact Category Icons Filter Bar (3D Tactile Icons & Crisp Contrast) */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-2.5 px-2 max-w-5xl mx-auto mb-7">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`cat-btn-3d w-[64px] h-[64px] sm:w-[72px] sm:h-[72px] p-1.5 sm:p-2 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all duration-200 cursor-pointer border ${
                    isActive
                      ? theme === 'light'
                        ? 'bg-emerald-50 border-[#22c55e] scale-105 shadow-[0_4px_16px_rgba(34,197,94,0.3)] ring-2 ring-[#22c55e]'
                        : 'bg-[#22c55e]/20 border-[#22c55e] scale-105 shadow-[0_0_20px_rgba(34,197,94,0.4)] ring-1 ring-[#22c55e]'
                      : theme === 'light'
                        ? 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700 shadow-sm hover:shadow'
                        : 'bg-[#070d1d]/85 border-white/10 hover:border-white/25 hover:bg-white/5 text-gray-300'
                  }`}
                  title={cat.name}
                >
                  <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center text-xs sm:text-sm transition-transform ${
                    isActive 
                      ? 'bg-gradient-to-br ' + (cat.bgGrad || 'from-emerald-500 to-teal-600') + ' text-white icon-badge-3d scale-110 shadow-md'
                      : theme === 'light'
                        ? 'bg-slate-100 text-slate-800'
                        : 'bg-white/5 ' + cat.color
                  }`}>
                    <i className={cat.icon}></i>
                  </div>
                  <span
                    className={`text-[8px] sm:text-[9px] font-bold text-center truncate max-w-full leading-tight ${
                      isActive 
                        ? theme === 'light' ? 'text-emerald-700 font-extrabold' : 'text-white font-black'
                        : theme === 'light' ? 'text-slate-700' : 'text-gray-300'
                    }`}
                  >
                    {cat.name}
                  </span>
                  {isActive && <div className="w-1.5 h-1.5 rounded-full bg-[#22c55e] -mt-0.5 shadow-[0_0_6px_#22c55e]"></div>}
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
                placeholder="Search by Service Number (e.g. 1, 9, 13, 20) or Name (Followers, Meta Boost, Voiceover, PR Team)..."
                className={`w-full backdrop-blur-xl border rounded-2xl pl-11 pr-24 py-4 text-xs sm:text-sm focus:outline-none focus:border-[#22c55e] focus:ring-2 focus:ring-[#22c55e]/20 transition shadow-2xl ${
                  theme === 'light'
                    ? 'bg-white/95 border-slate-300 text-slate-900 placeholder-slate-400'
                    : 'bg-[#070d1d]/95 border-white/15 text-white placeholder-gray-500'
                }`}
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
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-[#22c55e]/15 border border-[#22c55e]/30 px-2 py-1 rounded-md">
                  Live Sync
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

        {/* 4. FEATURED HIGH-CONVERTING GROWTH BUNDLES & MONTHLY PR PACKAGES */}
        <section className="mb-14 w-full scroll-reveal opacity-0 translate-y-6 transition-all duration-700">
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#0a1226]/90 via-[#070d1d]/90 to-[#040814]/95 border border-[#22c55e]/25 relative overflow-hidden shadow-2xl">
            {/* Ambient Background Accents */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#22c55e]/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6 pb-5 border-b border-white/10">
              <div>
                <div className="inline-flex items-center gap-2 bg-amber-500/15 text-amber-400 text-xs font-extrabold px-3.5 py-1 rounded-full border border-amber-500/30 uppercase tracking-widest mb-2">
                  <i className="fas fa-crown"></i> High-Tier Monthly Growth & Dedicated PR
                </div>
                <h3 className="text-xl sm:text-3xl font-extrabold text-white">
                  Exclusive PR & Omnichannel Growth Packages
                </h3>
                <p className="text-xs sm:text-sm text-gray-400 mt-1">
                  1-Month dedicated management across Top 10 Social Networks, Meta Boost (7d/14d/28d), and Studio Voiceover with Free Music.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400 font-semibold">Min 1,000 Units Base:</span>
                <span className="bg-[#22c55e] text-black font-extrabold text-xs px-3 py-1 rounded-lg shadow-sm">
                  100% Guaranteed Non-Drop
                </span>
              </div>
            </div>

            {/* Featured Cards 3-Column Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 relative z-10">
              {/* Card 1: 1-Month PR Team Omnichannel */}
              <div className="p-5 rounded-2xl bg-black/40 border border-amber-500/30 flex flex-col justify-between hover:border-amber-400 transition group shadow-lg">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2.5 py-0.5 rounded-md bg-amber-500/20 text-amber-400 border border-amber-500/30 font-mono text-[11px] font-extrabold">
                      #20, #21, #22 • PR Team
                    </span>
                    <span className="text-[11px] font-bold text-emerald-400">$499 – $999 / mo</span>
                  </div>
                  <h4 className="text-base font-bold text-white group-hover:text-amber-400 transition">
                    1-Month Dedicated PR Team (Top 10 Platforms)
                  </h4>
                  <p className="text-xs text-gray-300 mt-2 leading-relaxed">
                    Full 30-day managed agency promotion on Instagram, YouTube, TikTok, Facebook, Twitter/X, LinkedIn, Spotify, Telegram, Snapchat & Pinterest.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-gray-300">Starter: $499</span>
                    <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-gray-300">Viral: $749</span>
                    <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded font-bold">VIP: $999</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => openOrder('pr-team-starter', 1000)}
                  className="mt-5 w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-black font-extrabold text-xs flex items-center justify-center gap-1.5 transition shadow-lg cursor-pointer"
                >
                  Order PR Team Package <i className="fas fa-arrow-right text-[10px]"></i>
                </button>
              </div>

              {/* Card 2: Meta Boost Package 7d / 14d / 28d */}
              <div className="p-5 rounded-2xl bg-black/40 border border-blue-500/30 flex flex-col justify-between hover:border-blue-400 transition group shadow-lg">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2.5 py-0.5 rounded-md bg-blue-500/20 text-blue-400 border border-blue-500/30 font-mono text-[11px] font-extrabold">
                      #9, #10, #11 • Meta Boost
                    </span>
                    <span className="text-[11px] font-bold text-blue-400">$29, $59, $99</span>
                  </div>
                  <h4 className="text-base font-bold text-white group-hover:text-blue-400 transition">
                    Meta Boost Package (7d / 14d / 28d)
                  </h4>
                  <p className="text-xs text-gray-300 mt-2 leading-relaxed">
                    Targeted Meta algorithmic acceleration for Instagram & Facebook. Continuous daily feeds, story interactions, profile views & active reach.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-gray-300">7 Days: $29</span>
                    <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-gray-300">14 Days: $59</span>
                    <span className="text-[10px] bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded font-bold">28 Days: $99</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => openOrder('meta-boost-7d', 1000)}
                  className="mt-5 w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 transition shadow-lg cursor-pointer"
                >
                  Order Meta Boost ($29–$99) <i className="fas fa-arrow-right text-[10px]"></i>
                </button>
              </div>

              {/* Card 3: Voiceovers & Audio Dubbing */}
              <div className="p-5 rounded-2xl bg-black/40 border border-emerald-500/30 flex flex-col justify-between hover:border-emerald-400 transition group shadow-lg">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-mono text-[11px] font-extrabold">
                      #12, #13 • Voiceover + Music
                    </span>
                    <span className="text-[11px] font-bold text-emerald-400">$90 & $190+</span>
                  </div>
                  <h4 className="text-base font-bold text-white group-hover:text-emerald-400 transition">
                    Studio Voiceovers & Ads Reels (+ Free Original Music)
                  </h4>
                  <p className="text-xs text-gray-300 mt-2 leading-relaxed">
                    Broadcast-grade human voiceover dubbing in English, Bangla, Hindi & Arabic. Commercial Ads/Reels package includes 100% Free Original Music!
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-gray-300">Standard: $90</span>
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-bold">Ads/Reels: $190 + Free Music</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => openOrder('voiceover-ads-reels', 1000)}
                  className="mt-5 w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-black font-extrabold text-xs flex items-center justify-center gap-1.5 transition shadow-lg cursor-pointer"
                >
                  Order Voiceover ($90 / $190+) <i className="fas fa-arrow-right text-[10px]"></i>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 5. SERVICES CATALOG (WITH SERVICE #ID SYSTEM & FAVORITES) */}
        <section
          id="services"
          className="pt-4 w-full scroll-mt-24 scroll-reveal opacity-0 translate-y-6 transition-all duration-700"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4 w-full">
            <div>
              <div className="text-[#22c55e] text-xs font-extrabold mb-1.5 flex items-center gap-2 uppercase tracking-widest">
                <i className="fas fa-sparkles"></i> Elite Services Catalog (Min 1K Base)
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
                All 23+ Verified Organic Growth Services
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-2">
                Showing {filteredServices.length} services with unique Service ID # for instant lookup{' '}
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
                        className={`icon-3d-box w-12 h-12 rounded-2xl bg-gradient-to-br ${service.iconGrad} flex items-center justify-center text-white text-2xl shadow-lg shrink-0 group-hover:scale-110 transition-all duration-300`}
                      >
                        <i className={service.icon}></i>
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <span className="px-2 py-0.5 rounded-md bg-[#22c55e]/15 text-[#22c55e] border border-[#22c55e]/30 font-mono text-[10px] font-extrabold shrink-0">
                            #{service.serviceNumber}
                          </span>
                          <span className={`text-[11px] font-bold truncate ${service.badgeColor}`}>
                            {service.badge}
                          </span>
                        </div>
                        <h3 className="text-base sm:text-lg font-bold text-white truncate group-hover:text-[#22c55e] transition-colors">
                          {service.name}
                        </h3>
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

                  <div className="mt-auto flex items-center justify-between border-t border-white/5 pt-4 relative z-10 gap-2">
                    {(() => {
                      const pInfo = formatServicePrice(service.ratePer1k, currency);
                      return (
                        <div className="text-xs min-w-0">
                          <div className="text-[10px] text-gray-400 font-medium">Starting from (Min 1K)</div>
                          <div className="flex items-baseline gap-1 flex-wrap">
                            <span className="text-[#22c55e] font-extrabold text-sm sm:text-base tracking-tight">
                              {pInfo.primaryText}
                            </span>
                            <span className="text-[10px] text-gray-400">/ 1K</span>
                          </div>
                          {/* Always display USD rate alongside if selected currency is not USD, and always show USD base */}
                          <div className="text-[10px] text-gray-400 mt-0.5 flex items-center gap-1 font-mono">
                            <span className="text-emerald-400 font-semibold">{pInfo.usdText}</span>
                            {!pInfo.isUSD && (
                              <span className="text-gray-500">• {pInfo.bdtText}</span>
                            )}
                            {pInfo.isUSD && (
                              <span className="text-gray-400">• {pInfo.bdtText}</span>
                            )}
                          </div>
                        </div>
                      );
                    })()}
                    <button
                      type="button"
                      onClick={() => openOrder(service.id, service.defaultQty || 1000)}
                      className="px-3.5 sm:px-4 py-2 rounded-xl bg-white/5 group-hover:bg-[#22c55e] group-hover:text-black group-hover:shadow-[0_0_15px_rgba(34,197,94,0.4)] text-white text-xs font-bold flex items-center gap-1.5 transition-all duration-300 cursor-pointer shrink-0 whitespace-nowrap"
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 max-w-7xl mx-auto">
            {/* Direct Pay Online Card */}
            <div className="glass-panel p-6 rounded-3xl text-center border-2 border-indigo-500/50 shadow-[0_0_20px_rgba(99,102,241,0.2)] flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-2 right-2 bg-gradient-to-r from-indigo-500 to-pink-500 text-white text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">
                Instant Gateway
              </div>
              <div>
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center text-2xl mx-auto mb-3">
                  <i className="fas fa-credit-card"></i>
                </div>
                <h3 className="text-base font-bold text-white mb-1">Pay Online</h3>
                <p className="text-xs text-gray-300 mb-4">Direct Card, Wallet & Online Checkout Portal</p>
              </div>
              <a
                href={SOCIALMAESTRO_PAY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full btn-pay-online py-3 rounded-xl font-bold text-xs text-white block text-center cursor-pointer shadow-lg"
              >
                Pay Online Now &rarr;
              </a>
            </div>

            {/* WhatsApp Card */}
            <div className="glass-panel p-6 rounded-3xl text-center border-t-4 border-t-[#22c55e] flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#22c55e]/10 text-[#22c55e] flex items-center justify-center text-2xl mx-auto mb-3">
                  <i className="fab fa-whatsapp"></i>
                </div>
                <h3 className="text-base font-bold text-white mb-1">WhatsApp 24/7</h3>
                <p className="text-[#22c55e] font-extrabold text-base mb-4">+880 1724-048252</p>
              </div>
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
            <div className="glass-panel p-6 rounded-3xl text-center border-t-4 border-t-[#24A1DE] flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#24A1DE]/10 text-[#24A1DE] flex items-center justify-center text-2xl mx-auto mb-3">
                  <i className="fab fa-telegram-plane"></i>
                </div>
                <h3 className="text-base font-bold text-white mb-1">Telegram Support</h3>
                <p className="text-[#24A1DE] font-extrabold text-base mb-4">@socialypro</p>
              </div>
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
            <div className="glass-panel p-6 rounded-3xl flex flex-col justify-between">
              <div>
                <h3 className="text-base font-bold text-white mb-2">🌍 Crypto & Global</h3>
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
              </div>
              <button
                type="button"
                onClick={() => openOrder()}
                className="w-full btn-dark-modern py-2.5 rounded-xl font-bold text-xs text-white cursor-pointer"
              >
                Pay via Crypto / Global
              </button>
            </div>

            {/* Bangladesh local */}
            <div className="glass-panel p-6 rounded-3xl flex flex-col justify-between">
              <div>
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
              </div>
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

      {/* 8. ORDER PLACEMENT CART MODAL (MOBILE & DESKTOP FRIENDLY COMPACT LAYOUT) */}
      {orderModalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto"
          onClick={(e) => {
            if (e.target === e.currentTarget) setOrderModalOpen(false);
          }}
        >
          <div className={`glass-panel border rounded-3xl max-w-lg w-full max-h-[92vh] overflow-y-auto p-4 sm:p-6 relative shadow-2xl my-auto transition-all ${
            theme === 'light' ? 'bg-white border-slate-200 text-slate-900 shadow-2xl' : 'border-[#22c55e]/30 text-white'
          }`}>
            {/* Top Close Cross Button */}
            <button
              type="button"
              onClick={() => setOrderModalOpen(false)}
              className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 w-9 h-9 rounded-full bg-slate-200/80 hover:bg-slate-300 dark:bg-white/10 dark:hover:bg-white/20 text-slate-700 dark:text-white flex items-center justify-center transition cursor-pointer text-base z-10 shadow-sm"
              aria-label="Close modal"
            >
              <i className="fas fa-times"></i>
            </button>

            {/* Modal Header */}
            <div className="text-left mb-4 pr-10">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#22c55e] animate-ping"></span>
                <h3 className={`text-lg sm:text-xl font-black tracking-tight ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>
                  Instant Order & Inquiry
                </h3>
              </div>
              <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">
                Configure your order and connect directly on WhatsApp or Telegram @socialypro
              </p>
            </div>

            <form onSubmit={handleWhatsAppSubmit} className="space-y-3 sm:space-y-3.5">
              {/* 1. Service Selection Dropdown with Service #ID */}
              <div>
                <label className={`block text-[11px] font-bold uppercase tracking-wider mb-1 ${theme === 'light' ? 'text-slate-700' : 'text-gray-300'}`}>
                  Selected Service Package
                </label>
                <select
                  value={selectedServiceId}
                  onChange={(e) => {
                    const newId = e.target.value;
                    setSelectedServiceId(newId);
                    const svc = SERVICES.find((s) => s.id === newId);
                    if (svc && svc.defaultQty) {
                      setOrderQuantity(svc.defaultQty);
                    } else if (svc && svc.minQty) {
                      setOrderQuantity(svc.minQty);
                    }
                  }}
                  className={`w-full border rounded-xl px-3 py-2 text-xs sm:text-sm font-semibold focus:outline-none focus:border-[#22c55e] transition cursor-pointer ${
                    theme === 'light'
                      ? 'bg-slate-50 border-slate-300 text-slate-900'
                      : 'bg-black/60 border-white/15 text-white'
                  }`}
                >
                  {SERVICES.map((s) => {
                    const p = formatServicePrice(s.ratePer1k, currency);
                    return (
                      <option key={s.id} value={s.id} className="bg-gray-900 text-white">
                        #{s.serviceNumber} — {s.name} • {p.primaryText} / 1K ({p.usdText})
                      </option>
                    );
                  })}
                </select>
              </div>

              {/* 2. Target URL / Profile Link with Mandatory Public Account Note */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className={`text-[11px] font-bold uppercase tracking-wider ${theme === 'light' ? 'text-slate-700' : 'text-gray-300'}`}>
                    Profile Link / Target URL
                  </label>
                  <span className="text-[10px] font-bold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                    Must Be Public
                  </span>
                </div>
                <div className="relative">
                  <i className="fas fa-link absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs"></i>
                  <input
                    type="text"
                    value={targetLink}
                    onChange={(e) => setTargetLink(e.target.value)}
                    placeholder="https://instagram.com/yourprofile or post/video link"
                    className={`w-full border rounded-xl pl-8 pr-3 py-2 text-xs sm:text-sm focus:outline-none focus:border-[#22c55e] transition ${
                      theme === 'light'
                        ? 'bg-slate-50 border-slate-300 text-slate-900 placeholder:text-gray-400'
                        : 'bg-black/60 border-white/15 text-white placeholder:text-gray-500'
                    }`}
                  />
                </div>
                {/* Highlighted Warning Note as requested by user */}
                <div className="mt-1.5 p-2 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-center gap-2 text-amber-600 dark:text-amber-400 text-[11px] font-semibold">
                  <i className="fas fa-exclamation-circle text-amber-500 text-xs shrink-0"></i>
                  <span><strong>Important:</strong> Your Account / Profile / Video link <u>must be public</u> for delivery to start.</span>
                </div>
              </div>

              {/* 3. Amount / Quantity (All services min 1,000) */}
              <div className={`p-3 rounded-xl border transition ${
                theme === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-black/40 border-white/10'
              }`}>
                <div className="flex justify-between items-center mb-1.5">
                  <label className={`text-[11px] font-bold uppercase tracking-wider ${theme === 'light' ? 'text-slate-700' : 'text-gray-300'}`}>
                    Order Quantity (Min 1,000)
                  </label>
                  <span className="text-xs font-bold text-[#22c55e]">
                    {calculatedTotal.primaryText} {calculatedTotal.code}
                  </span>
                </div>

                <div className="relative mb-2">
                  <input
                    type="number"
                    min={currentSelectedService.minQty || 1000}
                    step={100}
                    value={orderQuantity || ''}
                    onChange={(e) => setOrderQuantity(Math.max(0, Number(e.target.value)))}
                    placeholder="e.g. 1000"
                    className={`w-full border rounded-lg px-3 py-1.5 text-sm sm:text-base font-bold focus:outline-none focus:border-[#22c55e] transition ${
                      theme === 'light'
                        ? 'bg-white border-slate-300 text-slate-900'
                        : 'bg-black/80 border-white/20 text-white'
                    }`}
                    required
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400 pointer-events-none">
                    Units
                  </div>
                </div>

                {/* Sub row with Rate & BDT */}
                <div className="flex justify-between items-center text-[10px] text-gray-500 dark:text-gray-400 font-medium mb-2">
                  <span>Rate: {formatServicePrice(currentSelectedService.ratePer1k, currency).primaryText} / 1K</span>
                  <span>Bangladesh: <strong className="text-emerald-500 font-bold">{calculatedTotal.bdtEquivalent}</strong></span>
                </div>

                {/* Quick Quantity Preset Chips: 1K, 2.5K, 5K, 10K, 25K */}
                <div className="flex flex-wrap items-center gap-1.5">
                  {[1000, 2500, 5000, 10000, 25000].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setOrderQuantity(preset)}
                      className={`text-[10px] font-bold px-2.5 py-1 rounded-md border transition cursor-pointer ${
                        orderQuantity === preset
                          ? 'bg-[#22c55e] text-black border-[#22c55e] shadow-sm'
                          : theme === 'light'
                            ? 'bg-white hover:bg-slate-200 text-slate-700 border-slate-200'
                            : 'bg-white/5 hover:bg-white/10 text-gray-300 border-white/10'
                      }`}
                    >
                      {preset >= 1000 ? `${preset / 1000}K Units` : `${preset} Units`}
                    </button>
                  ))}
                </div>
              </div>

              {/* 4. Preferred Payment Gateway */}
              <div>
                <label className={`block text-[11px] font-bold uppercase tracking-wider mb-1 ${theme === 'light' ? 'text-slate-700' : 'text-gray-300'}`}>
                  Payment Method
                </label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className={`w-full border rounded-xl px-3 py-2 text-xs sm:text-sm font-semibold focus:outline-none focus:border-[#22c55e] transition cursor-pointer ${
                    theme === 'light'
                      ? 'bg-slate-50 border-slate-300 text-slate-900'
                      : 'bg-black/60 border-white/15 text-white'
                  }`}
                >
                  {PAYMENT_OPTIONS.map((opt) => (
                    <option key={opt.id} value={opt.id} className="bg-gray-900 text-white">
                      {opt.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* 5. Custom Requirements (Optional) */}
              <div>
                <label className={`block text-[11px] font-bold uppercase tracking-wider mb-1 ${theme === 'light' ? 'text-slate-700' : 'text-gray-300'}`}>
                  Inquiries / Custom Requirements (Optional)
                </label>
                <textarea
                  rows={2}
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  placeholder="e.g. Voiceover accent, specific country audience, drip feed..."
                  className={`w-full border rounded-xl px-3 py-1.5 text-xs sm:text-sm focus:outline-none focus:border-[#22c55e] transition resize-none ${
                    theme === 'light'
                      ? 'bg-slate-50 border-slate-300 text-slate-900 placeholder:text-gray-400'
                      : 'bg-black/60 border-white/15 text-white placeholder:text-gray-500'
                  }`}
                ></textarea>
              </div>

              {/* 6. Total Estimated Charge Card (Screenshot 1 Match) */}
              <div className="bg-[#22c55e]/10 dark:bg-[#22c55e]/15 border border-[#22c55e]/40 rounded-xl p-3 sm:p-3.5 flex items-center justify-between shadow-sm">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-600 dark:text-[#22c55e] block">
                    Total Estimated Charge
                  </span>
                  <div className="text-xl sm:text-2xl font-black text-[#22c55e] leading-none mt-0.5">
                    {calculatedTotal.primaryText}{' '}
                    <span className="text-xs font-bold text-gray-500 dark:text-gray-300">{calculatedTotal.code}</span>
                  </div>
                  <span className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5 block">
                    Base: {calculatedTotal.usdEquivalent}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase block">
                    Local BDT Rate
                  </span>
                  <span className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white">
                    {calculatedTotal.bdtEquivalent}
                  </span>
                </div>
              </div>

              {/* 7. Action CTA Buttons */}
              <div className="pt-1 space-y-2">
                <button
                  type="submit"
                  className="w-full btn-whatsapp py-3 rounded-xl font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer text-white shadow-lg"
                >
                  <i className="fab fa-whatsapp text-base"></i> Continue on WhatsApp
                </button>
                <button
                  type="button"
                  onClick={handleTelegramSubmit}
                  className="w-full btn-telegram py-3 rounded-xl font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer text-white shadow-lg"
                >
                  <i className="fab fa-telegram-plane text-base"></i> Continue on Telegram @socialypro
                </button>
                <a
                  href={SOCIALMAESTRO_PAY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full btn-pay-online py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 cursor-pointer text-white shadow-sm"
                >
                  <i className="fas fa-credit-card text-xs"></i> Direct Online Card / Gateway Checkout
                </a>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 9. GLOBAL CURRENCY SELECTOR MODAL (24+ TOP COUNTRY CURRENCIES) */}
      {currencyModalOpen && (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto"
          onClick={(e) => {
            if (e.target === e.currentTarget) setCurrencyModalOpen(false);
          }}
        >
          <div className={`glass-panel border rounded-3xl max-w-2xl w-full p-5 sm:p-7 relative shadow-2xl my-6 transition-all ${
            theme === 'light' ? 'bg-white/95 border-slate-200 text-slate-900 shadow-2xl' : 'border-[#22c55e]/30 text-white'
          }`}>
            {/* Modal Close Button */}
            <button
              type="button"
              onClick={() => setCurrencyModalOpen(false)}
              className="absolute top-4 right-4 sm:top-5 sm:right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-gray-400 hover:text-white flex items-center justify-center transition cursor-pointer text-sm z-10"
              aria-label="Close currency selector"
            >
              <i className="fas fa-times"></i>
            </button>

            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-[#22c55e]/20 text-[#22c55e] flex items-center justify-center text-lg shadow-md shrink-0">
                <i className="fas fa-globe"></i>
              </div>
              <div>
                <h3 className={`text-lg sm:text-xl font-black ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>
                  Select Your Local Currency
                </h3>
                <p className="text-xs text-gray-400">
                  Real-time live dynamic pricing converted from USD wholesale rates
                </p>
              </div>
            </div>

            {/* Search Input */}
            <div className="relative mb-4">
              <i className="fas fa-search absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs"></i>
              <input
                type="text"
                value={currencySearchQuery}
                onChange={(e) => setCurrencySearchQuery(e.target.value)}
                placeholder="Search country, currency name, or code (e.g. Euro, INR, BDT, GBP, Dirham)..."
                className={`w-full border rounded-xl pl-9 pr-8 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-[#22c55e] transition ${
                  theme === 'light'
                    ? 'bg-slate-50 border-slate-300 text-slate-900 placeholder:text-gray-400'
                    : 'bg-black/60 border-white/15 text-white placeholder:text-gray-500'
                }`}
                autoFocus
              />
              {currencySearchQuery && (
                <button
                  type="button"
                  onClick={() => setCurrencySearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white text-xs cursor-pointer"
                >
                  <i className="fas fa-times-circle"></i>
                </button>
              )}
            </div>

            {/* Popular Currencies Quick Filter Bar */}
            <div className="mb-4">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5">
                Popular Global Currencies:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {TOP_CURRENCIES.filter((c) => c.popular).map((c) => {
                  const isSel = currency === c.code;
                  return (
                    <button
                      key={c.code}
                      type="button"
                      onClick={() => selectCurrency(c.code)}
                      className={`text-xs px-2.5 py-1.5 rounded-xl border font-bold flex items-center gap-1.5 transition cursor-pointer ${
                        isSel
                          ? 'bg-[#22c55e] text-black border-[#22c55e] shadow-md scale-105'
                          : theme === 'light'
                            ? 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700'
                            : 'bg-white/5 hover:bg-white/10 border-white/10 text-gray-300'
                      }`}
                    >
                      <span>{c.code} ({c.symbol})</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* All Currencies Grid */}
            <div className="max-h-[340px] overflow-y-auto pr-1 space-y-2 border-t border-white/10 pt-3">
              {filteredCurrencies.length === 0 ? (
                <div className="text-center py-10 text-gray-400 text-xs">
                  <i className="fas fa-search text-2xl text-gray-500 mb-2 block"></i>
                  No currencies match &quot;{currencySearchQuery}&quot;. Try searching &quot;USD&quot;, &quot;Euro&quot;, or &quot;Pound&quot;.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {filteredCurrencies.map((c) => {
                    const isSel = currency === c.code;
                    return (
                      <button
                        key={c.code}
                        type="button"
                        onClick={() => selectCurrency(c.code)}
                        className={`p-3 rounded-2xl border text-left flex items-center justify-between gap-3 transition cursor-pointer ${
                          isSel
                            ? 'bg-[#22c55e]/15 border-[#22c55e] shadow-[0_0_15px_rgba(34,197,94,0.2)] ring-1 ring-[#22c55e]'
                            : theme === 'light'
                              ? 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800'
                              : 'bg-white/5 hover:bg-white/10 border-white/10 text-gray-200'
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-xs shrink-0 ${
                            isSel
                              ? 'bg-[#22c55e] text-black shadow-sm'
                              : theme === 'light'
                                ? 'bg-slate-100 text-slate-800 border border-slate-200'
                                : 'bg-white/10 text-white border border-white/10'
                          }`}>
                            {c.symbol}
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="font-extrabold text-sm">{c.code}</span>
                              <span className="text-xs text-[#22c55e] font-bold">({c.symbol})</span>
                            </div>
                            <div className="text-[11px] text-gray-400 truncate">
                              {c.name} • <span className="opacity-75">{c.country}</span>
                            </div>
                            <div className="text-[10px] text-gray-400 mt-0.5 font-mono">
                              1 USD = {c.symbol}{c.rateAgainstUSD.toLocaleString()} {c.code}
                            </div>
                          </div>
                        </div>

                        {isSel && (
                          <div className="w-6 h-6 rounded-full bg-[#22c55e] text-black flex items-center justify-center text-xs shrink-0 shadow-md">
                            <i className="fas fa-check"></i>
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Bottom info note */}
            <div className={`mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-gray-400`}>
              <span>Selected: <strong className="text-[#22c55e] font-bold">{activeCurrencyInfo.name} ({activeCurrencyInfo.code})</strong></span>
              <span className="font-mono text-gray-400">Default: USD ($)</span>
            </div>
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
                        {(() => {
                          const favP = formatServicePrice(s.ratePer1k, currency);
                          return (
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="text-[11px] text-[#22c55e] font-bold">
                                {favP.primaryText} / 1K
                              </span>
                              {!favP.isUSD && (
                                <span className="text-[10px] text-gray-400 font-mono">
                                  ({favP.usdText})
                                </span>
                              )}
                            </div>
                          );
                        })()}
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
