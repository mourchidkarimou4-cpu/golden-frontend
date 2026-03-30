// src/types/index.ts

export interface Project {
  id: number
  title: string
  tagline?: string
  description?: string
  sector: string
  sector_label?: string
  country: string
  status: string
  amount_needed: number
  funding_goal?: number
  funding_percentage?: number
  roi_estimated?: number
  expected_roi?: number
  duration_months?: number
  risk_level?: string
  cover_image?: string
  matching_score?: number
  is_favorite?: boolean
  documents?: Document[]
  created_at?: string
}

export interface Investment {
  id: number
  project: Project
  investor?: User
  amount: number
  status: string
  created_at: string
  updated_at?: string
  roi_expected?: number
}

export interface User {
  id: number
  email: string
  full_name?: string
  role: 'porteur' | 'investisseur' | 'admin'
  is_kyc_verified?: boolean
  is_active?: boolean
  preferred_sectors?: string[]
  preferred_countries?: string[]
  min_investment?: number
  max_investment?: number
  risk_profile?: string
  avatar?: string
}

export interface Thread {
  id: number
  participants: User[]
  last_message?: Message
  unread_count?: number
  created_at?: string
}

export interface Message {
  id: number
  thread: number
  sender: User
  content: string
  created_at: string
  is_read?: boolean
}

export interface Document {
  id: number
  name: string
  file: string
  type?: string
  uploaded_at?: string
}

export interface MonthlyData {
  month: string
  amount: number
}

export interface Analytics {
  monthly_portfolio?: MonthlyData[]
  monthly_funding?: MonthlyData[]
  total_invested?: number
  total_raised?: number
}

export interface Offer {
  id: number
  amount: number
  status: string
  message?: string
  created_at: string
}
